import { Link } from "react-router";
import React, { useEffect, useState } from 'react';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import Header from '@/components/dtg/Header';
import Footer from '@/components/dtg/Footer';
import { LockIcon, EyeIcon, EyeOffIcon, CheckIcon, XIcon } from 'lucide-react';
export default function ResetPassword() {
  const {
    token
  } = useParams<{
    token: string;
  }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  // Validate token on component mount
  useEffect(() => {
    // In a real app, this would verify the token with your API
    // For demo purposes, we'll simulate token validation
    const validateToken = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // For demo, we'll consider tokens that are exactly 20 characters as valid
        const isValid = token && token.length === 20;
        setIsTokenValid(isValid);
        if (!isValid) {
          setError('This password reset link is invalid or has expired.');
        }
      } catch (err) {
        setIsTokenValid(false);
        setError('An error occurred while validating your request.');
      } finally {
        setIsLoading(false);
      }
    };
    validateToken();
  }, [token]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate passwords
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
      setError('Password must include a number and a symbol');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setError('');
      // In a real app, this would call your API to reset the password
      console.log('Resetting password with token:', token);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('An error occurred while resetting your password.');
    }
  };
  // Show loading state
  if (isLoading) {
    return <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full text-center">
            <p className="text-gray-600">Validating your request...</p>
          </div>
        </main>
        <Footer />
      </div>;
  }
  // Show error state for invalid token
  if (isTokenValid === false) {
    return <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <XIcon className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Invalid or expired link
            </h2>
            <p className="text-gray-600 mb-6">
              {error || 'This password reset link is invalid or has expired.'}
            </p>
            <Link to="/forgot-password" className="inline-block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Request a new password reset link
            </Link>
          </div>
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
          {isSuccess ?
        // Success state
        <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckIcon className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Password reset successful
              </h2>
              <p className="text-gray-600 mb-6">
                Your password has been successfully changed. You'll be
                redirected to the login page in a few seconds.
              </p>
              <Link to="/login" className="inline-block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Go to Login
              </Link>
            </div> :
        // Reset password form
        <>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  Reset your password
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Enter a new password for your DowntownGuide account
                </p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit} >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      New password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500">
                          {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Must be at least 8 characters and include a number and a
                      symbol
                    </p>
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm new password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input id="confirm-password" name="confirm-password" type={showPassword ? 'text' : 'password'} required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
                    </div>
                  </div>
                </div>
                {error && <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <XIcon className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>}
                <div>
                  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Reset password
                  </button>
                </div>
              </form>
            </>}
        </div>
      </main>
      <Footer />
    </div>;
}
