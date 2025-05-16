import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ZKIDLogo from '@/components/ZKIDLogo';
import { Check } from 'lucide-react';

export default function VerifyProof() {
  const [loading, setLoading] = useState(true);
  const { hash } = useParams<{ hash: string }>();
  
  // Simulated verification data
  const mockProofData = {
    full_name: "Demo User",
    date_of_birth: "2000-01-01",
    nationality: "Nepal",
    created_at: new Date().toISOString()
  };
  
  useEffect(() => {
    // Just log the hash for debugging purposes
    console.log('Verification request received for hash:', hash);
    
    // Simulate a short loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [hash]);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="container mx-auto py-6">
        <div className="flex justify-center items-center">
          <ZKIDLogo />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
              <p className="text-slate-300">Verifying identity proof...</p>
            </div>
          ) : (
            <div className="zk-card p-8 text-center">
              <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-green-500">Identity Verified</h2>
              <p className="text-slate-300 mb-6">
                This is a verified citizen of Nepal.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-left mt-8">
                <h3 className="text-sm font-semibold mb-4">Verified Information:</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <p><span className="font-medium">Nationality:</span> {mockProofData.nationality}</p>
                  <p><span className="font-medium">Verified On:</span> {new Date(mockProofData.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
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
}

