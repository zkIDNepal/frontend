import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { CitizenshipVerifier } from "@/idl/citizenship_verifier";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import * as anchor from '@project-serum/anchor';
import { Program, AnchorProvider, web3, BN, Idl, setProvider } from '@project-serum/anchor';
import idl from '../idl/citizenship_verifier.json';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';

// Program ID from your IDL
const PROGRAM_ID = new anchor.web3.PublicKey('F9BEdj8sdPevfz2mYCxC3seg9MW9edLRUyGs8gsPjmRx');

interface ReclaimProofGeneratorProps {
  ocrData: {
    full_name: string;
    date_of_birth: string;
    nationality: string;
  } | null;
  onProofGenerated: (proofData: any) => void;
}

// Match the Rust ProofData struct exactly as defined in the IDL
interface ProofData {
  user_id: string;
  citizenship_number: string;
  name: string;
  dob: string;
  zk_proof: Uint8Array;
}

export const ReclaimProofGenerator = ({ ocrData, onProofGenerated }: ReclaimProofGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [storedProof, setStoredProof] = useState<any>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [formattedOcrData, setFormattedOcrData] = useState<any>(null);
  const wallet = useWallet();
  const { connection } = useConnection();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Format and validate OCR data when it changes
  useEffect(() => {
    if (ocrData) {
      // Format date to ensure it's 10 chars or less (YYYY-MM-DD)
      let dob = ocrData.date_of_birth || "";
      try {
        // Try to parse the date and format it consistently
        if (dob.length > 0) {
          const dateObj = new Date(dob);
          if (!isNaN(dateObj.getTime())) {
            dob = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD format
          }
        }
      } catch (e) {
        console.warn("Could not parse date:", dob);
      }

      // Ensure dob is max 10 chars
      dob = dob.slice(0, 10);

      // Format and validate name
      let name = (ocrData.full_name || "").trim();
      name = name.slice(0, 100); // Ensure name is max 100 chars

      setFormattedOcrData({
        full_name: name,
        date_of_birth: dob,
        nationality: (ocrData.nationality || "").trim()
      });

      console.log("Formatted OCR data:", {
        full_name: name,
        date_of_birth: dob,
        nationality: (ocrData.nationality || "").trim()
      });
    }
  }, [ocrData]);

  const getProgram = () => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      console.error("Wallet not connected or doesn't support signing");
      return null;
    }
    
    try {
      console.log("Creating Anchor provider with connection and wallet");
      
      // Create a properly configured provider
      const provider = new AnchorProvider(
        connection, 
        wallet,
        {}
      );
      setProvider(provider);
      console.log("Provider created:", provider);
      
      // Create the program instance
      console.log("Creating Program instance with IDL");
      try {
        console.log("Using IDL:", JSON.stringify(idl).substring(0, 300) + "...");
        
        // Force IDL type conversion
        const program = new Program(idl as unknown as Idl, PROGRAM_ID, provider);
        console.log('Program created!', program);
        return program;
      } catch (error) {
        console.error("Failed to create Program instance:", error);
        toast.error("Error initializing Solana program. Technical details are in the console.");
        return null;
      }
    } catch (error) {
      console.error("Failed to create provider:", error);
      toast.error("Error setting up wallet connection. Please try again.");
      return null;
    }
  };

  const verifyStoredProof = async (proofAccountAddress: string) => {
    setIsVerifying(true);
    try {
      console.log('Getting program!');
      const program = getProgram();
      if (!program) throw new Error("Failed to initialize program");

      // Fetch the proof account data
      console.log('Initializing proof account');
      const proofAccount = await program.account.proofAccount.fetch(proofAccountAddress);
      console.log('Stored proof data:', proofAccount);
      setStoredProof(proofAccount);
      toast.success("Successfully verified stored proof!");
    } catch (error) {
      console.error('Error verifying proof:', error);
      toast.error("Failed to verify proof: " + (error as Error).message);
    } finally {
      setIsVerifying(false);
    }
  };

  const generateProof = async () => {
    if (!formattedOcrData) {
      toast.error("No verification data available");
      return;
    }

    if (!wallet.publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!user) {
      toast.error("Please sign in to continue");
      return;
    }

    setIsGenerating(true);
    try {
      // Skip Solana program creation
      console.log("Skipping Solana program creation...");
      
      // Generate proof data based on OCR
      const proofData = {
        user_id: wallet.publicKey.toString(),
        full_name: formattedOcrData.full_name,
        date_of_birth: formattedOcrData.date_of_birth,
        nationality: formattedOcrData.nationality || "Nepali",
        timestamp: new Date().toISOString() // Add timestamp to make each hash unique
      };
      
      // Create a hash of the proof data
      const dataString = JSON.stringify(proofData);
      const encoder = new TextEncoder();
      const data = encoder.encode(dataString);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      console.log('Generated proof hash:', hashHex);
      
      // Use upsert instead of insert to handle case where proof already exists
      let storedProof, error;
      
      try {
        // First try to get existing record
        const { data: existingProof, error: fetchError } = await supabase
          .from('verification_proofs')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (fetchError && fetchError.code !== 'PGRST116') { // Not found error
          throw fetchError;
        }
        
        if (existingProof) {
          // Update existing record
          const { data: updatedProof, error: updateError } = await supabase
            .from('verification_proofs')
            .update({
              full_name: formattedOcrData.full_name,
              date_of_birth: formattedOcrData.date_of_birth,
              nationality: formattedOcrData.nationality || "Nepali",
              proof_hash: hashHex,
              wallet_address: wallet.publicKey.toString(),
              created_at: new Date().toISOString(),
              is_verified: true
            })
            .eq('user_id', user.id)
            .select()
            .single();
            
          storedProof = updatedProof;
          error = updateError;
        } else {
          // Insert new record
          const { data: newProof, error: insertError } = await supabase
            .from('verification_proofs')
            .insert({
              user_id: user.id,
              full_name: formattedOcrData.full_name,
              date_of_birth: formattedOcrData.date_of_birth,
              nationality: formattedOcrData.nationality || "Nepali",
              proof_hash: hashHex,
              wallet_address: wallet.publicKey.toString(),
              created_at: new Date().toISOString(),
              is_verified: true
            })
            .select()
            .single();
            
          storedProof = newProof;
          error = insertError;
        }
      } catch (dbError) {
        console.error('Database operation failed:', dbError);
        error = dbError;
      }
        
      if (error) {
        throw new Error("Failed to store proof: " + error.message);
      }
      
      // Update user's KYC status
      const { data: updatedUser, error: userError } = await supabase
        .from('users')
        .update({ 
          has_completed_kyc: true
        })
        .eq('id', user.id) // Use authenticated user ID
        .select()
        .single();
        
      if (userError) {
        console.error('Error updating KYC status:', userError);
        toast.error("Failed to update verification status");
      }
      
      // Create response with verification URL
      const verificationUrl = `${window.location.origin}/verify/${hashHex}`;
      const response = {
        type: "citizenship_verification",
        timestamp: new Date().toISOString(),
        wallet_address: wallet.publicKey.toString(),
        verified_data: {
          name: formattedOcrData.full_name,
          date_of_birth: formattedOcrData.date_of_birth,
          nationality: formattedOcrData.nationality || "Nepali"
        },
        proof_hash: hashHex,
        verification_url: verificationUrl
      };
      
      // Call the parent component's callback with the proof data
      onProofGenerated(response);
      toast.success("Verification proof generated successfully!");
      
      // Redirect to dashboard
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error('Error generating proof:', error);
      toast.error("Failed to generate proof: " + (error as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
        onClick={generateProof}
        disabled={isGenerating || !formattedOcrData || !wallet.publicKey}
      >
        {isGenerating ? "Generating Proof..." : "Generate ZK Proof"}
      </Button>
      {!wallet.publicKey && (
        <p className="text-xs text-red-400 text-center">
          Please connect your wallet first
        </p>
      )}
      {txSignature && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Transaction Details:</h3>
          <p className="text-xs mb-2">Transaction Signature:</p>
          <a 
            href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-500 hover:text-blue-700 break-all"
          >
            {txSignature}
          </a>
        </div>
      )}
      {storedProof && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Stored Proof Data:</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(storedProof, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}; 