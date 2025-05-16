import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireKyc?: boolean;
  requireWallet?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requireKyc = false,
  requireWallet = false 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const wallet = useAnchorWallet();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Only check for wallet if it's required for this route
  if (requireWallet && !wallet) {
    toast.error("Please connect your wallet to continue");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireKyc && !user.has_completed_kyc) {
    return <Navigate to="/kyc-verification" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 
