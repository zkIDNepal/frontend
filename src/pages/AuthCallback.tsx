import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, ensureUserExists } from '@/lib/supabase';
import { toast } from 'sonner';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('Starting OAuth callback handling...');
        
        // Handle the URL hash for OAuth callback
        const hash = window.location.hash;
        if (hash) {
          console.log('Found URL hash, processing OAuth callback...');
          const { error: hashError } = await supabase.auth.getSession();
          if (hashError) {
            console.error('Error processing URL hash:', hashError);
            toast.error('Authentication failed: ' + hashError.message);
            navigate('/');
            return;
          }
        }

        // First, handle the OAuth callback
        const { data: { session: callbackSession }, error: callbackError } = await supabase.auth.getSession();
        console.log('Callback session:', callbackSession);
        
        if (callbackError) {
          console.error('Error in callback:', callbackError);
          toast.error('Authentication failed: ' + callbackError.message);
          navigate('/');
          return;
        }

        // If no session from callback, try to get the current session
        if (!callbackSession) {
          console.log('No callback session, checking current session...');
          const { data: { session: currentSession }, error: currentError } = await supabase.auth.getSession();
          
          if (currentError) {
            console.error('Error getting current session:', currentError);
            toast.error('Session error: ' + currentError.message);
            navigate('/');
            return;
          }

          if (!currentSession) {
            console.error('No session found');
            toast.error('No session found. Please try signing in again.');
            navigate('/');
            return;
          }

          console.log('Current session found:', currentSession.user.email);
          
          // Ensure user exists in our database
          console.log('Ensuring user exists in database...');
          const userData = await ensureUserExists(currentSession.user.id, currentSession.user.email);
          console.log('User data:', userData);

          // Redirect based on KYC status
          if (!userData.has_completed_kyc) {
            console.log('User has not completed KYC, redirecting to verification...');
            navigate('/kyc-verification');
          } else {
            console.log('User has completed KYC, redirecting to dashboard...');
            navigate('/dashboard');
          }
        } else {
          console.log('Callback session found:', callbackSession.user.email);
          
          // Ensure user exists in our database
          console.log('Ensuring user exists in database...');
          const userData = await ensureUserExists(callbackSession.user.id, callbackSession.user.email);
          console.log('User data:', userData);

          // Redirect based on KYC status
          if (!userData.has_completed_kyc) {
            console.log('User has not completed KYC, redirecting to verification...');
            navigate('/kyc-verification');
          } else {
            console.log('User has completed KYC, redirecting to dashboard...');
            navigate('/dashboard');
          }
        }
      } catch (error) {
        console.error('Error in callback:', error);
        toast.error('An error occurred during authentication. Please try again.');
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="text-sm text-gray-500">Processing authentication...</p>
    </div>
  );
} 