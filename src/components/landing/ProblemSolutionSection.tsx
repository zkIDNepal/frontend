
import { CheckCircle } from "lucide-react";

const ProblemSolutionSection = () => {
  return (
    <section className="container mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="zk-card p-8">
          <h3 className="text-2xl font-bold text-gradient mb-6">The Problem</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                <span className="text-red-500">✕</span>
              </div>
              <p className="text-slate-300">Users must repeatedly complete KYC with every institution they work with</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                <span className="text-red-500">✕</span>
              </div>
              <p className="text-slate-300">Personal identity data is exposed multiple times across systems</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                <span className="text-red-500">✕</span>
              </div>
              <p className="text-slate-300">Institutions waste resources on redundant verification processes</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                <span className="text-red-500">✕</span>
              </div>
              <p className="text-slate-300">Costly and inefficient processes require dedicated staff just for verification</p>
            </li>
          </ul>
        </div>
        
        <div className="zk-card p-8">
          <h3 className="text-2xl font-bold text-gradient mb-6">Our Solution</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-green-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-slate-300">One-time verification with trusted institutions</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-green-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-slate-300">Zero-knowledge proofs allow verification without data exposure</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-green-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-slate-300">Blockchain-based commitments ensure security and auditability</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-green-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-slate-300">Proof can be used across platforms within or outside the ecosystem</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
