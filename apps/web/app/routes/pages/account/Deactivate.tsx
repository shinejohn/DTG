import type { Route } from './+types/route';
import React, { useState } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { AlertTriangleIcon, ArrowLeftIcon, CheckIcon, UserIcon, XIcon } from 'lucide-react';
export default function DeactivateAccount() {
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const reasons = ['I have another account', 'I want to create a new account', 'Privacy concerns', 'Too many emails/notifications', "I don't find this service useful", "I'm receiving unwanted contact", 'Temporary break', 'Other'];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      setError('Please select a reason for deactivating your account');
      return;
    }
    if (!password) {
      setError('Please enter your password to confirm');
      return;
    }
    setError(null);
    setShowConfirmation(true);
  };
  const handleConfirmDeactivation = () => {
    if (confirmText !== 'deactivate') {
      setError('Please type "deactivate" to confirm');
      return;
    }
    setLoading(true);
    setError(null);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Redirect to login page after successful deactivation
      navigate('/login', {
        state: {
          message: 'Your account has been deactivated. You can reactivate it by logging in within the next 30 days.'
        }
      });
    }, 2000);
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Link to="/settings#account" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back to Account Settings
              </Link>
              <h1 className="text-2xl font-bold mt-2">Deactivate Account</h1>
              <p className="text-gray-600">Temporarily disable your account</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              {!showConfirmation ? <form onSubmit={handleSubmit} className="p-6">
                  <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <AlertTriangleIcon className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-yellow-800 mb-1">
                          Before you deactivate
                        </h3>
                        <ul className="text-sm text-yellow-700 space-y-1 list-disc pl-5">
                          <li>
                            Your profile and content will be hidden from other
                            users
                          </li>
                          <li>
                            You can reactivate your account by logging in within
                            30 days
                          </li>
                          <li>
                            After 30 days, your account may be permanently
                            deleted
                          </li>
                          <li>
                            Your username will be reserved for you during this
                            period
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                      <XIcon className="w-5 h-5 mr-2" />
                      <span>{error}</span>
                    </div>}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Why are you deactivating your account?
                    </label>
                    <select value={reason} onChange={e => setReason(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                      <option value="">Select a reason</option>
                      {reasons.map(r => <option key={r} value={r}>
                          {r}
                        </option>)}
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter your password to confirm
                    </label>
                    <div className="relative">
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Your current password" required />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-8">
                    <Link to="/settings#account" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-sm">
                      Cancel
                    </Link>
                    <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium text-sm">
                      Continue
                    </button>
                  </div>
                </form> : <div className="p-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-6">
                    <div className="flex">
                      <AlertTriangleIcon className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-red-700 mb-2 text-lg">
                          Final Confirmation
                        </h3>
                        <p className="text-red-700 mb-3">
                          This action will deactivate your account and hide your
                          profile. You can reactivate within 30 days by logging
                          in again.
                        </p>
                        <p className="text-red-700 font-medium">
                          Type "deactivate" below to confirm:
                        </p>
                      </div>
                    </div>
                  </div>
                  {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                      <XIcon className="w-5 h-5 mr-2" />
                      <span>{error}</span>
                    </div>}
                  <div className="mb-6">
                    <input type="text" value={confirmText} onChange={e => setConfirmText(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder='Type "deactivate" to confirm' />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button type="button" onClick={() => setShowConfirmation(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-sm">
                      Go Back
                    </button>
                    <button type="button" onClick={handleConfirmDeactivation} disabled={loading || confirmText !== 'deactivate'} className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium text-sm flex items-center ${loading || confirmText !== 'deactivate' ? 'opacity-70 cursor-not-allowed' : ''}`}>
                      {loading ? <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </> : 'Deactivate Account'}
                    </button>
                  </div>
                </div>}
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-start">
                <UserIcon className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-700 mb-1">
                    Need help instead?
                  </h3>
                  <p className="text-sm text-gray-600">
                    If you're experiencing issues with your account, our support
                    team is here to help.
                    <a href="#" className="text-blue-600 hover:text-blue-800 ml-1">
                      Contact Support
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
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
