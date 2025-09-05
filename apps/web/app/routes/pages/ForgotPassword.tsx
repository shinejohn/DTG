import { Link } from "react-router";
import React, { useState } from 'react';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '@/components/dtg/Header';
import { Footer } from '@/components/dtg/Footer';
import { MailIcon, CheckIcon, ArrowLeftIcon } from 'lucide-react';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    // Clear any previous errors
    setError('');
    // In a real app, this would call your API to send a reset email
    console.log('Password reset requested for:', email);
    // Show success state
    setIsSubmitted(true);
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
          {isSubmitted ?
        // Success state
        <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckIcon className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Check your email
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to{' '}
                <span className="font-medium">{email}</span>. The link will
                expire in 1 hour.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                If you don't see the email, check your spam folder or
                <button onClick={() => setIsSubmitted(false)} className="text-blue-600 hover:text-blue-500 ml-1">
                  try again with a different email
                </button>
              </p>
              <Link to="/login" className="inline-flex items-center text-blue-600 hover:text-blue-500">
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Back to login
              </Link>
            </div> :
        // Request form
        <>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  Forgot your password?
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Enter your email address and we'll send you a link to reset
                  your password
                </p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit} >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className={`block w-full pl-10 pr-3 py-2 border ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} rounded-md focus:outline-none`} placeholder="you@example.com" />
                  </div>
                  {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>
                <div>
                  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Send reset link
                  </button>
                </div>
              </form>
              <div className="mt-6 text-center text-sm">
                <Link to="/login" className="inline-flex items-center text-blue-600 hover:text-blue-500">
                  <ArrowLeftIcon className="h-4 w-4 mr-1" />
                  Back to login
                </Link>
              </div>
            </>}
        </div>
      </main>
      <Footer />
    </div>;
}
