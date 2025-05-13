
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ZKIDLogo from "@/components/ZKIDLogo";
import { toast } from "sonner";
import { Upload, Check, AlertCircle } from "lucide-react";

const KYCVerification = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [stage, setStage] = useState<"upload" | "processing" | "proof">("upload");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a document to upload");
      return;
    }
    
    // Start processing
    setStage("processing");
    
    // Simulate processing with progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setStage("proof");
        toast.success("Document successfully processed!");
      }
    }, 200);
  };

  const handleGenerateProof = () => {
    toast.success("Zero-knowledge proof generated successfully!");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="container mx-auto py-6">
        <div className="flex justify-between items-center">
          <ZKIDLogo />
          <Button 
            variant="outline" 
            className="border-white/20 text-white bg-blue hover:text-white hover:bg-white/10"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Verify Your Identity</h1>
            <p className="text-xl text-slate-300">
              Please upload a clear image of your Nepali citizenship certificate
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between mb-2">
              <div className="flex flex-col items-center space-y-2">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${stage === "upload" ? "bg-primary" : "bg-primary/70"}`}>
                  <Upload className="h-5 w-5" />
                </div>
                <span className="text-sm">Upload</span>
              </div>
              
              <div className="flex-1 flex items-center px-4">
                <div className="h-1 w-full bg-white/20 rounded">
                  <div className={`h-full bg-primary rounded ${stage !== "upload" ? "w-full" : "w-0"} transition-all duration-500`}></div>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${stage === "processing" ? "bg-primary" : stage === "proof" ? "bg-primary/70" : "bg-white/20"}`}>
                  {stage === "processing" ? (
                    <span className="animate-pulse">{progress}%</span>
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                </div>
                <span className="text-sm">Processing</span>
              </div>
              
              <div className="flex-1 flex items-center px-4">
                <div className="h-1 w-full bg-white/20 rounded">
                  <div className={`h-full bg-primary rounded ${stage === "proof" ? "w-full" : "w-0"} transition-all duration-500`}></div>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${stage === "proof" ? "bg-primary" : "bg-white/20"}`}>
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-sm">Proof Generation</span>
              </div>
            </div>
          </div>
          
          {/* Upload Area */}
          {stage === "upload" && (
            <div 
              className={`zk-card p-8 flex flex-col items-center justify-center cursor-pointer ${preview ? 'border-primary/50' : 'border-dashed'}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden"
                accept="image/*"
              />
              
              {preview ? (
                <div className="space-y-4 w-full">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/20">
                    <img 
                      src={preview} 
                      alt="Document preview" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm truncate max-w-[250px]">{file?.name}</span>
                    <Button 
                      variant="outline" 
                      className="border-white/20 text-white bg-blue hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setPreview(null);
                      }}
                    >
                      Change
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Drag & Drop your document</h3>
                  <p className="text-slate-300 mb-4 text-center max-w-md">
                    Upload a clear image of your Nepali citizenship certificate or click to browse
                  </p>
                </>
              )}
            </div>
          )}
          
          {/* Processing Area */}
          {stage === "processing" && (
            <div className="zk-card p-8 space-y-8">
              <h3 className="text-xl font-semibold text-center">Processing Your Document</h3>
              
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Extracting data</span>
                  <span>{progress}%</span>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-sm text-slate-300 mb-2">
                  <span className="font-semibold">What's happening?</span>
                </p>
                <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                  <li>Extracting identity information from your document</li>
                  <li>Validating document authenticity</li>
                  <li>Creating zero-knowledge proof of your citizenship</li>
                  <li>No personal data is stored or transmitted</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Proof Generation Area */}
          {stage === "proof" && (
            <div className="zk-card p-8 space-y-6 text-center">
              <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Check className="h-10 w-10 text-primary" />
              </div>
              
              <h3 className="text-2xl font-semibold">Document Successfully Processed!</h3>
              
              <p className="text-slate-300 max-w-md mx-auto">
                Your document has been verified. We're ready to generate your zero-knowledge proof.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-left">
                <p className="text-sm font-semibold mb-2">What is a zero-knowledge proof?</p>
                <p className="text-xs text-slate-300">
                  A zero-knowledge proof allows you to prove you possess certain information without revealing the information itself. In this case, you can prove you're a Nepali citizen without sharing your personal details.
                </p>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-center mt-8">
            {stage === "upload" && (
              <Button 
                className="btn-gradient text-lg py-6 px-8"
                size="lg"
                onClick={handleUpload}
                disabled={!file}
              >
                Continue
              </Button>
            )}
            
            {stage === "proof" && (
              <Button 
                className="btn-gradient text-lg py-6 px-8"
                size="lg"
                onClick={handleGenerateProof}
              >
                Generate My zkID
              </Button>
            )}
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

export default KYCVerification;
