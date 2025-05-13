
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CTASection = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      // This would normally be a real Google authentication
      setTimeout(() => {
        toast.success("Successfully authenticated with Google");
        navigate("/kyc-verification");
      }, 1500);
    } catch (error) {
      toast.error("Authentication failed. Please try again.");
    }
  };

  return (
    <section className="container mx-auto py-16">
      <div className="zk-card p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 blur-xl"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to transform your identity verification?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join zkIDNepal today and experience the future of privacy-preserving KYC.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              className="btn-gradient text-lg py-6 px-8" 
              size="lg"
              onClick={handleGoogleSignIn}
            >
              Get Started Now
            </Button>
            
            <Button variant="outline" className="border-white/20 text-white bg-blue hover:bg-white/10 py-6 px-8">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
