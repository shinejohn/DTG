import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { json, useLoaderData, Link, useNavigate } from 'react-router';
import type { Route } from './+types/route';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ChevronLeftIcon, LockIcon, EyeIcon, EyeOffIcon, CheckIcon, XIcon, AlertCircleIcon } from 'lucide-react';
export function ChangePassword() {
  const navigate = useNavigate();
  // Removed useState - using loaderData instead
  // Removed useState - using loaderData instead
  // Removed useState - using loaderData instead
  // Removed useState - using loaderData instead
  // Removed useState - using loaderData instead
  // Removed useState - using loaderData instead
  const [error, setError] = useState<string | null>(null);
  // Removed useState - using loaderData instead
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Clear previous errors
    setError(null);
    // Validate password
    if (!currentPassword) {
      setError('Please enter your current password');
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }
    if (!/(?=.*[0-9])/.test(newPassword)) {
      setError('New password must include at least one number');
      return;
    }
    if (!/(?=.*[!@#$%^&*])/.test(newPassword)) {
      setError('New password must include at least one special character');
      return;
    }
    if (newPassword === currentPassword) {
      setError('New password must be different from your current password');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }
    // In a real app, this would call an API to change the password
    console.log('Changing password:', {
      currentPassword,
      newPassword
    });
    // Show success message
    setSuccess(true);
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    // In a real app, you might redirect after a delay
    setTimeout(() => {
      navigate('/settings#security');
    }, 3000);
  };
  const goBack = () => {
    navigate('/settings#security');
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="flex items-center mb-6">
              <button onClick={goBack} className="mr-4 p-2 rounded-full hover:bg-gray-100">
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold">Change Password</h1>
            </div>
            {success && <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
                <CheckIcon className="w-5 h-5 mr-2" />
                <span>Password changed successfully! Redirecting...</span>
              </div>}
            {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                <AlertCircleIcon className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center">
                <LockIcon className="w-5 h-5 text-blue-600 mr-3" />
                <h2 className="text-lg font-semibold">Update Your Password</h2>
              </div>
              <form onSubmit={handleSubmit} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input id="current-password" name="current-password" type={showCurrentPassword ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="text-gray-400 hover:text-gray-500">
                          {showCurrentPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input id="new-password" name="new-password" type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="text-gray-400 hover:text-gray-500">
                          {showNewPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Must be at least 8 characters and include a number and a
                      symbol
                    </p>
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input id="confirm-password" name="confirm-password" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-gray-400 hover:text-gray-500">
                          {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Update Password
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}

// React Router 7 loader function
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {
    // Get generic data - customize based on page needs
    const { data: items, error } = await supabase
      .from('businesses') // Change table as needed
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching data:', error);
    }

    const transformedData = {
      // Transform data to match component interface
      items: businesses || events || items || []
    };

    return json(transformedData, { headers });
  } catch (error) {
    console.error('Loader error:', error);
    // Return empty data on error
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