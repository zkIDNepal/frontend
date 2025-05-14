import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, ensureUserExists } from '@/lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          navigate('/');
          return;
        }

        if (!session) {
          console.error('No session found');
          navigate('/');
          return;
        }

        // Ensure user exists in our database
        const userData = await ensureUserExists(session.user.id, session.user.email);

        // Redirect based on KYC status
        if (!userData.has_completed_kyc) {
          navigate('/kyc-verification');
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error in callback:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
} 