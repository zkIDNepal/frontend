export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  start_date: string;
  end_date: string;
  is_national: boolean;
  created_at: string;
  status: 'active' | 'ended' | 'upcoming';
}

export interface PollOption {
  id: string;
  poll_id: string;
  text: string;
  vote_count: number;
}

export interface Vote {
  id: string;
  user_id: string;
  poll_id: string;
  option_id: string;
  voted_at: string;
}

export interface PollWithVotes extends Poll {
  options: (PollOption & { has_voted: boolean })[];
  total_votes: number;
  user_vote?: string; // option_id of user's vote
} 