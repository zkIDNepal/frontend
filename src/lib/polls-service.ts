import { supabase } from "./supabase";
import { Poll, PollWithVotes, Vote } from "./supabase-types";
import { toast } from "sonner";

export const fetchPolls = async (userId: string): Promise<PollWithVotes[]> => {
  try {
    // Fetch all active polls
    const { data: polls, error: pollsError } = await supabase
      .from('polls')
      .select(`
        *,
        poll_options(*)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (pollsError) throw pollsError;

    // Fetch user's votes for these polls
    const { data: votes, error: votesError } = await supabase
      .from('votes')
      .select('*')
      .eq('user_id', userId)
      .in('poll_id', polls.map(poll => poll.id));

    if (votesError) throw votesError;

    // Combine the data
    return polls.map(poll => {
      const userVote = votes?.find(vote => vote.poll_id === poll.id);
      const totalVotes = poll.poll_options.reduce((sum, option) => sum + option.vote_count, 0);

      return {
        ...poll,
        options: poll.poll_options.map(option => ({
          ...option,
          has_voted: userVote?.option_id === option.id
        })),
        total_votes: totalVotes,
        user_vote: userVote?.option_id
      };
    });
  } catch (error) {
    console.error('Error fetching polls:', error);
    toast.error("Failed to fetch polls");
    return [];
  }
};

export const castVote = async (
  userId: string,
  pollId: string,
  optionId: string
): Promise<boolean> => {
  try {
    // Start a transaction
    const { error: voteError } = await supabase
      .from('votes')
      .upsert({
        user_id: userId,
        poll_id: pollId,
        option_id: optionId,
        voted_at: new Date().toISOString()
      });

    if (voteError) throw voteError;

    // Update vote count
    const { error: updateError } = await supabase.rpc('increment_vote_count', {
      p_option_id: optionId
    });

    if (updateError) throw updateError;

    toast.success("Vote cast successfully!");
    return true;
  } catch (error) {
    console.error('Error casting vote:', error);
    toast.error("Failed to cast vote");
    return false;
  }
};

export const checkEligibility = async (userId: string, pollId: string): Promise<boolean> => {
  try {
    // Get user's nationality from verification_details
    const { data: verificationDetails, error: verificationError } = await supabase
      .from('verification_details')
      .select('nationality')
      .eq('user_id', userId)
      .single();

    if (verificationError) throw verificationError;

    // Get poll details
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .select('is_national')
      .eq('id', pollId)
      .single();

    if (pollError) throw pollError;

    // Check if user has already voted
    const { data: existingVote, error: voteError } = await supabase
      .from('votes')
      .select('id')
      .eq('user_id', userId)
      .eq('poll_id', pollId)
      .single();

    if (voteError && voteError.code !== 'PGRST116') throw voteError; // PGRST116 is "no rows returned"

    // User is eligible if:
    // 1. They are Nepali
    // 2. They haven't voted yet
    // 3. The poll is either national or regional (we can add more conditions here)
    return (
      verificationDetails.nationality.toLowerCase() === 'nepali' &&
      !existingVote &&
      poll.is_national
    );
  } catch (error) {
    console.error('Error checking eligibility:', error);
    return false;
  }
}; 