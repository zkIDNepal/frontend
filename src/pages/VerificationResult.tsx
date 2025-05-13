
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ZKIDLogo from "@/components/ZKIDLogo";
import { Check, Clock, ShieldCheck } from "lucide-react";

const VerificationResult = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="container mx-auto py-6">
        <div className="flex justify-between items-center">
          <ZKIDLogo />
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="zk-card p-8 space-y-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                <Check className="h-12 w-12" />
              </div>
              
              <h1 className="text-3xl font-bold">Identity Verified</h1>
              <p className="text-slate-300 mt-2">
                The zero-knowledge proof has been successfully verified
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/20 rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-semibold">Verified Attributes</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5" />
                    </div>
                    <span>Nepali Citizenship</span>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Verified</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5" />
                    </div>
                    <span>Adult Age (18+)</span>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Verified</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5" />
                    </div>
                    <span>Kathmandu Resident</span>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Verified</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Verification Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-sm text-slate-300">Verification ID</span>
                </div>
                <span className="text-sm font-mono bg-white/5 px-3 py-1 rounded">zk84729174829174</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm text-slate-300">Timestamp</span>
                </div>
                <span className="text-sm font-mono bg-white/5 px-3 py-1 rounded">2025-05-12 14:32:47 UTC</span>
              </div>
            </div>
            
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-center text-slate-300">
                <strong className="text-primary">Privacy Notice:</strong> Only the above attributes were verified. No personal information or identity details were shared or stored during this verification process.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              onClick={() => navigate("/")}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Close Verification
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto py-8 text-center">
        <p className="text-sm text-slate-400">
          © 2025 zkIDNepal • Privacy-Preserving Digital Identity
        </p>
      </footer>
    </div>
  );
};

export default VerificationResult;
