import { Link, redirect, useNavigate } from 'react-router';
import React, { useState } from 'react';
import { requireUser } from '@kit/supabase/require-user';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '@/components/dtg/Header';
import { Footer } from '@/components/dtg/Footer';
import { UserIcon } from 'lucide-react';
import { Button } from '@/components/dtg/ui/Button';
import { useSupabase } from '@kit/supabase/hooks/use-supabase';
import pathsConfig from '~/config/paths.config';
import type { LoaderFunctionArgs } from 'react-router';

// Use MakerKit's backend auth logic
export async function loader({ request }: LoaderFunctionArgs) {
  const client = getSupabaseServerClient(request);
  const { data: user } = await requireUser(client);

  if (user) {
    throw redirect(pathsConfig.app.home);
  }

  return null;
}

export default function DTGPasswordReset() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const supabase = useSupabase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Use Supabase auth method directly
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/update-password',
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      // Show success message
      setSuccess(true);
      setIsLoading(false);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Reset your password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>
          
          {!success ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Send reset link
                </Button>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Remember your password?{' '}
                  <Link to="/auth/sign-in" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in
                  </Link>
                </p>
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/auth/sign-up" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <div className="mt-8 text-center">
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
              <p className="mt-2 text-sm text-gray-600">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Please check your email and click the link to reset your password.
              </p>
              
              <div className="mt-6">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/auth/sign-in')}
                >
                  Back to sign in
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}