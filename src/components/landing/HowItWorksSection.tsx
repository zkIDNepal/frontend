
import { Shield, UserCheck, CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="container mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How zkIDNepal Works</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">Our privacy-preserving KYC solution uses zero-knowledge proofs and blockchain technology to keep your data secure while enabling verification.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="zk-card p-6 relative">
          <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <UserCheck className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">1. One-Time KYC</h3>
          <p className="text-slate-300">Upload your citizenship document once. Our system securely processes it without storing raw data.</p>
        </div>

        <div className="zk-card p-6 relative">
          <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">2. ZKP Generation</h3>
          <p className="text-slate-300">We generate zero-knowledge proofs that allow you to verify your identity without revealing personal details.</p>
        </div>

        <div className="zk-card p-6 relative">
          <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">3. Verify Anywhere</h3>
          <p className="text-slate-300">Use your zkID to securely verify your identity across apps and services without redoing KYC processes.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
