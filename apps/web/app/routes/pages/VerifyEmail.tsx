import type { Route } from './+types/route';
import React, { useEffect, useState } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '@/components/dtg/Header';
import { Footer } from '@/components/dtg/Footer';
import { CheckIcon, XIcon, RefreshCwIcon } from 'lucide-react';
export default function VerifyEmail() {
  const {
    token
  } = useParams<{
    token: string;
  }>();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');
  // Verify email token on component mount
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // In a real app, this would call your API to verify the email token
        console.log('Verifying email with token:', token);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        // For demo, we'll consider tokens that are exactly 20 characters as valid
        if (token && token.length === 20) {
          setVerificationStatus('success');
        } else {
          setVerificationStatus('error');
          setError('This verification link is invalid or has expired.');
        }
      } catch (err) {
        setVerificationStatus('error');
        setError('An error occurred while verifying your email.');
      }
    };
    verifyEmail();
  }, [token]);
  // Handle resend verification email
  const handleResendVerification = async () => {
    try {
      // In a real app, this would call your API to resend the verification email
      console.log('Resending verification email');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('A new verification email has been sent. Please check your inbox.');
    } catch (err) {
      alert('An error occurred while sending the verification email.');
    }
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md text-center">
          {verificationStatus === 'loading' && <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <RefreshCwIcon className="h-6 w-6 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verifying your email
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </div>} {verificationStatus === 'success' && <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckIcon className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Email verified!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for verifying your email address. Your account is now
                fully activated.
              </p>
              <div className="space-y-4">
                <Link to="/login" className="inline-block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Sign in to your account
                </Link>
                <Link to="/" className="inline-block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Go to homepage
                </Link>
              </div>
            </div>} {verificationStatus === 'error' && <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <XIcon className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verification failed
              </h2>
              <p className="text-gray-600 mb-6">
                {error || 'This verification link is invalid or has expired.'}
              </p>
              <div className="space-y-4">
                <button onClick={handleResendVerification} className="inline-block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Resend verification email
                </button>
                <Link to="/login" className="inline-block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Back to login
                </Link>
              </div>
            </div>}
        </div>
      </main>
      <Footer />
    </div>;
}
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {
    const { data: items, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching data:', error);
    }

    return json({
      items: items || []
    }, { headers });
  } catch (error) {
    console.error('Loader error:', error);
    return json({
      items: []
    }, { headers });
  }
}
export function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600">{error.status}</h1>
          <h2 className="text-xl font-semibold mt-2">{error.statusText}</h2>
          <p className="text-gray-600 mt-4">{error.data}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600 mt-4">Something went wrong</p>
        <p className="text-sm text-gray-500 mt-2">{error?.message}</p>
      </div>
    </div>
  );
}
