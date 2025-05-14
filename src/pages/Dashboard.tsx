import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ZKIDLogo from "@/components/ZKIDLogo";
import { toast } from "sonner";
import { QrCode, Check, Calendar, Users, Shield, ChevronRight, Bell, Settings, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { fetchPolls, castVote, checkEligibility } from "@/lib/polls-service";
import { PollWithVotes } from "@/lib/supabase-types";

interface VerificationDetails {
  full_name: string;
  date_of_birth: string;
  nationality: string;
  verified_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("zkid");
  const [verificationDetails, setVerificationDetails] = useState<VerificationDetails | null>(null);
  const { user } = useAuth();
  const [polls, setPolls] = useState<PollWithVotes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerificationDetails = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('verification_details')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching verification details:', error);
        return;
      }

      setVerificationDetails(data);
    };

    fetchVerificationDetails();
  }, [user]);

  useEffect(() => {
    const loadPolls = async () => {
      if (!user) return;
      setLoading(true);
      const pollsData = await fetchPolls(user.id);
      setPolls(pollsData);
      setLoading(false);
    };

    loadPolls();
  }, [user]);

  const handleShareQR = () => {
    toast.success("QR code copied to clipboard!");
  };

  const handleVoteInPoll = async (pollId: string, optionId: string) => {
    if (!user) {
      toast.error("Please sign in to vote");
      return;
    }

    // Check eligibility
    const isEligible = await checkEligibility(user.id, pollId);
    if (!isEligible) {
      toast.error("You are not eligible to vote in this poll");
      return;
    }

    // Cast vote
    const success = await castVote(user.id, pollId, optionId);
    if (success) {
      // Refresh polls data
      const updatedPolls = await fetchPolls(user.id);
      setPolls(updatedPolls);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculatePercentage = (votes: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 backdrop-blur-md bg-slate-900/80 z-10">
        <div className="container mx-auto py-4">
          <div className="flex justify-between items-center">
            <ZKIDLogo />
            <div className="flex items-center gap-2 md:gap-4">
              <button className="relative p-2 text-slate-300 hover:text-white">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
              </button>
              <span className="text-sm text-slate-300 hidden md:inline-block">
                Connected as: {verificationDetails?.full_name || 'Loading...'}
              </span>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/20 text-white bg-blue hover:bg-white/10  hover:text-white ml-2"
                onClick={() => navigate("/")}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            {/* Sidebar */}
            <div className="md:w-64 shrink-0">
              <div className="sticky top-24">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-6">
                  <div className="flex flex-col items-center p-4">
                    <div className="relative mb-4">
                      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur"></div>
                      <div className="relative h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-medium text-white">{verificationDetails?.full_name || 'Loading...'}</h3>
                    <p className="text-xs text-slate-300 mb-3">Verified Citizen</p>
                    <div className="flex items-center justify-center gap-1 bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                      <Check className="h-3 w-3" />
                      <span>Verified</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
                    <button className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-white/10 text-left">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-primary mr-3" />
                        <span className="text-sm">Security</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </button>
                    <button className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-white/10 text-left">
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 text-primary mr-3" />
                        <span className="text-sm">Settings</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                  <h3 className="text-sm font-medium text-white mb-3">Verification Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Identity</span>
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Age</span>
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Voter Status</span>
                      <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">Pending</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Residency</span>
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="flex-1">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Your zkID Dashboard</h1>
                <p className="text-slate-400">Manage your verifiable credentials and participate in secure polls</p>
              </div>
              
              <Tabs 
                defaultValue="zkid" 
                className="w-full"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="w-full grid grid-cols-2 mb-6 bg-white/5 p-1 rounded-lg">
                  <TabsTrigger value="zkid" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md py-2.5">
                    <QrCode className="mr-2 h-4 w-4" />
                    My zkID
                  </TabsTrigger>
                  <TabsTrigger value="polls" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md py-2.5">
                    <Calendar className="mr-2 h-4 w-4" />
                    Polls
                  </TabsTrigger>
                </TabsList>
                
                {/* My zkID Tab */}
                <TabsContent value="zkid" className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                    <div className="bg-white/5 px-6 py-4 border-b border-white/10">
                      <h2 className="text-lg font-medium text-white">Zero-Knowledge Identity</h2>
                    </div>
                    
                    <div className="p-6 flex flex-col md:flex-row gap-8">
                      <div className="md:w-2/5 flex flex-col items-center">
                        {/* QR Code Display */}
                        <div className="relative">
                          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-75 blur"></div>
                          <div className="relative bg-white p-4 rounded-xl">
                            <div className="aspect-square w-48 h-48 md:w-56 md:h-56 bg-black flex items-center justify-center">
                              <QrCode className="w-3/4 h-3/4 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              <span>Valid</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          className="mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                          onClick={handleShareQR}
                        >
                          Share QR Code
                        </Button>
                        
                        <div className="mt-4 text-xs text-slate-400 text-center">
                          <p>Validity: <span className="text-white">30 days</span></p>
                          <p>Last updated: <span className="text-white">May 12, 2025</span></p>
                        </div>
                      </div>
                      
                      <div className="md:w-3/5 space-y-6">
                        <h2 className="text-xl font-semibold">Your Verifiable Credentials</h2>
                        
                        <div className="space-y-4">
                          <div className="bg-white/5 border border-white/10 hover:border-primary/50 transition-colors rounded-lg p-4 flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                <Check className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium group-hover:text-primary transition-colors">Nepali Citizenship</h3>
                                <p className="text-xs text-slate-400">
                                  Verified on {verificationDetails ? formatDate(verificationDetails.verified_at) : 'Loading...'}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Active</span>
                          </div>
                          
                          <div className="bg-white/5 border border-white/10 hover:border-primary/50 transition-colors rounded-lg p-4 flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                <Check className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium group-hover:text-primary transition-colors">Adult Age Verification</h3>
                                <p className="text-xs text-slate-400">
                                  Date of Birth: {verificationDetails?.date_of_birth || 'Loading...'}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Active</span>
                          </div>
                          
                          <div className="bg-white/5 border border-white/10 hover:border-primary/50 transition-colors rounded-lg p-4 flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                <Check className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium group-hover:text-primary transition-colors">Nationality</h3>
                                <p className="text-xs text-slate-400">
                                  {verificationDetails?.nationality || 'Loading...'}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Active</span>
                          </div>
                        </div>
                        
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <p className="text-sm text-slate-300">
                            <span className="font-semibold text-primary">Instructions:</span> Present this QR code to verify your identity securely. No personal data is shared during verification.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                    <div className="bg-white/5 px-6 py-4 border-b border-white/10">
                      <h2 className="text-lg font-medium text-white">Recent Activity</h2>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                              <Shield className="h-4 w-4 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm">Identity verified with Nepal Telecom</p>
                              <p className="text-xs text-slate-400">May 10, 2025</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                              <Check className="h-4 w-4 text-green-400" />
                            </div>
                            <div>
                              <p className="text-sm">Age verification completed</p>
                              <p className="text-xs text-slate-400">May 8, 2025</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                              <Calendar className="h-4 w-4 text-purple-400" />
                            </div>
                            <div>
                              <p className="text-sm">Voted in National Education Reform poll</p>
                              <p className="text-xs text-slate-400">May 5, 2025</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Polls Tab */}
                <TabsContent value="polls" className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                    <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <h2 className="text-lg font-medium text-white">Available Polls</h2>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      {loading ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                          <p className="text-slate-400 mt-4">Loading polls...</p>
                        </div>
                      ) : polls.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-slate-400">No active polls available</p>
                        </div>
                      ) : (
                        polls.map((poll) => (
                          <div key={poll.id} className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-primary/50 rounded-lg overflow-hidden">
                            <div className="p-5 border-b border-white/10">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-medium">{poll.title}</h3>
                                  <p className="text-xs text-slate-400 mt-1">{poll.description}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                                  poll.user_vote 
                                    ? 'bg-green-500/20 text-green-300'
                                    : 'bg-yellow-500/20 text-yellow-300'
                                }`}>
                                  {poll.user_vote ? 'Voted' : 'Eligible'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="p-5">
                              <div className="space-y-4">
                                {poll.options.map((option) => (
                                  <div key={option.id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <input
                                          type="radio"
                                          id={`option-${option.id}`}
                                          name={`poll-${poll.id}`}
                                          className="h-4 w-4 text-primary accent-primary"
                                          checked={option.has_voted}
                                          onChange={() => handleVoteInPoll(poll.id, option.id)}
                                          disabled={!!poll.user_vote}
                                        />
                                        <label htmlFor={`option-${option.id}`} className="ml-2 text-sm">
                                          {option.text}
                                        </label>
                                      </div>
                                      <span className="text-xs text-slate-400">
                                        {calculatePercentage(option.vote_count, poll.total_votes)}%
                                      </span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-primary transition-all duration-500"
                                        style={{
                                          width: `${calculatePercentage(option.vote_count, poll.total_votes)}%`
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="px-5 py-4 bg-white/5 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${
                                  new Date(poll.end_date) > new Date() ? 'bg-green-400' : 'bg-red-400'
                                }`}></div>
                                <span className="text-xs text-slate-300">
                                  {new Date(poll.end_date) > new Date()
                                    ? `Ends in ${Math.ceil((new Date(poll.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`
                                    : 'Ended'}
                                </span>
                              </div>
                              <div className="text-xs text-slate-400">
                                Total votes: {poll.total_votes}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 bg-slate-900/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            © 2025 zkIDNepal • Privacy-Preserving Digital Identity
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-slate-400 hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-400 hover:text-primary">Terms of Service</a>
            <a href="#" className="text-sm text-slate-400 hover:text-primary">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;