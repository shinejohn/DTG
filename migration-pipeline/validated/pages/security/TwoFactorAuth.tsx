import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { json, useLoaderData, Link } from 'react-router';
import type { Route } from './+types/route';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ShieldIcon, SmartphoneIcon, MailIcon, CheckIcon, ArrowLeftIcon, LockIcon, AlertCircleIcon, InfoIcon, XIcon, ClipboardIcon, RefreshCwIcon } from 'lucide-react';
export function TwoFactorAuth() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [method, setMethod] = useState<'app' | 'sms' | 'email'>('app');
  const [step, setStep] = useState<'overview' | 'setup' | 'verify'>('overview');
  // Removed useState - using loaderData instead
  // Removed useState - using loaderData instead
  // Removed useState - using loaderData instead
 123-4567');
  // Removed useState - using loaderData instead
  // Removed useState - using loaderData instead
  // Removed useState - using loaderData instead
  // Mock backup codes
  const backupCodes = ['ABCD-EFGH-IJKL', 'MNOP-QRST-UVWX', 'YZAB-CDEF-GHIJ', 'KLMN-OPQR-STUV', 'WXYZ-ABCD-EFGH', 'IJKL-MNOP-QRST', 'UVWX-YZAB-CDEF', 'GHIJ-KLMN-OPQR', 'STUV-WXYZ-ABCD', 'EFGH-IJKL-MNOP'];
  // Mock verification code for the authenticator app
  const mockQRCode = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/DowntownGuide:sarah.johnson@example.com?secret=JBSWY3DPEHPK3PXP&issuer=DowntownGuide';
  const mockSecret = 'JBSWY3DPEHPK3PXP';
  const handleMethodChange = (newMethod: 'app' | 'sms' | 'email') => {
    setMethod(newMethod);
  };
  const startSetup = () => {
    setStep('setup');
  };
  const proceedToVerify = () => {
    setStep('verify');
  };
  const handleVerification = () => {
    // In a real app, this would validate the code against the server
    if (verificationCode.length === 6) {
      setSetupSuccess(true);
      setIs2FAEnabled(true);
    }
  };
  const handleDisable2FA = () => {
    setIs2FAEnabled(false);
    setShowDisableModal(false);
    setStep('overview');
    setSetupSuccess(false);
  };
  const resetSetup = () => {
    setStep('overview');
    setVerificationCode('');
    setSetupSuccess(false);
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link to="/settings#security" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back to Settings
              </Link>
              <h1 className="text-2xl font-bold mt-2">
                Two-Factor Authentication
              </h1>
              <p className="text-gray-600">
                Add an extra layer of security to your account
              </p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Status Banner */}
              <div className={`px-6 py-4 ${is2FAEnabled ? 'bg-green-50' : 'bg-yellow-50'} border-b`}>
                <div className="flex items-center">
                  {is2FAEnabled ? <>
                      <ShieldIcon className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <h2 className="font-medium text-green-800">
                          Two-factor authentication is enabled
                        </h2>
                        <p className="text-green-700 text-sm">
                          Your account has an extra layer of security.
                        </p>
                      </div>
                    </> : <>
                      <AlertCircleIcon className="w-5 h-5 text-yellow-600 mr-3" />
                      <div>
                        <h2 className="font-medium text-yellow-800">
                          Two-factor authentication is not enabled
                        </h2>
                        <p className="text-yellow-700 text-sm">
                          Enable 2FA to protect your account from unauthorized
                          access.
                        </p>
                      </div>
                    </>}
                </div>
              </div>

              {/* Overview Step */}
              {step === 'overview' && <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">How it works</h2>
                    <p className="text-gray-600 mb-4">
                      Two-factor authentication adds an extra layer of security
                      to your account by requiring a verification code in
                      addition to your password when you sign in.
                    </p>
                    <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex items-start">
                      <InfoIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-700">
                        Even if someone has your password, they won't be able to
                        access your account without the verification code.
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">
                      Choose a verification method
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={`border rounded-lg p-4 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors ${method === 'app' ? 'border-blue-500 bg-blue-50' : ''}`} onClick={() => handleMethodChange('app')}>
                        <div className="flex justify-center mb-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <LockIcon className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                        <h3 className="font-medium text-center mb-1">
                          Authenticator App
                        </h3>
                        <p className="text-sm text-gray-600 text-center">
                          Use an app like Google Authenticator to generate codes
                        </p>
                        {method === 'app' && <div className="mt-2 flex justify-center">
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                              Recommended
                            </span>
                          </div>}
                      </div>

                      <div className={`border rounded-lg p-4 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors ${method === 'sms' ? 'border-blue-500 bg-blue-50' : ''}`} onClick={() => handleMethodChange('sms')}>
                        <div className="flex justify-center mb-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <SmartphoneIcon className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                        <h3 className="font-medium text-center mb-1">
                          Text Message (SMS)
                        </h3>
                        <p className="text-sm text-gray-600 text-center">
                          Receive verification codes via text message
                        </p>
                      </div>

                      <div className={`border rounded-lg p-4 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors ${method === 'email' ? 'border-blue-500 bg-blue-50' : ''}`} onClick={() => handleMethodChange('email')}>
                        <div className="flex justify-center mb-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <MailIcon className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                        <h3 className="font-medium text-center mb-1">Email</h3>
                        <p className="text-sm text-gray-600 text-center">
                          Receive verification codes via email
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6 flex justify-between">
                    {is2FAEnabled ? <>
                        <button onClick={() => setShowDisableModal(true)} className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50">
                          Disable Two-Factor Authentication
                        </button>
                        <button onClick={() => setShowBackupCodes(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                          View Backup Codes
                        </button>
                      </> : <>
                        <Link to="/settings#security" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                          Cancel
                        </Link>
                        <button onClick={startSetup} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                          Continue
                        </button>
                      </>}
                  </div>
                </div>}

              {/* Setup Step */}
              {step === 'setup' && <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">
                      {method === 'app' ? 'Set up authenticator app' : method === 'sms' ? 'Set up SMS verification' : 'Set up email verification'}
                    </h2>
                    {method === 'app' && <div>
                        <p className="text-gray-600 mb-4">
                          Use an authenticator app like Google Authenticator,
                          Authy, or Microsoft Authenticator to scan the QR code
                          below.
                        </p>
                        <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                          <div className="md:w-1/2">
                            <div className="bg-white border rounded-lg p-4 flex justify-center mb-3">
                              <img src={mockQRCode} alt="QR Code for authenticator app" className="w-48 h-48" />
                            </div>
                            <p className="text-sm text-gray-500 text-center">
                              Scan this QR code with your authenticator app
                            </p>
                          </div>
                          <div className="md:w-1/2">
                            <h3 className="font-medium mb-2">
                              Can't scan the QR code?
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                              Enter this setup key manually in your
                              authenticator app:
                            </p>
                            <div className="flex items-center mb-4">
                              <div className="bg-gray-100 px-3 py-2 rounded-md font-mono text-sm flex-grow">
                                {mockSecret}
                              </div>
                              <button onClick={() => copyToClipboard(mockSecret)} className="ml-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                                <ClipboardIcon className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3 flex items-start">
                              <AlertCircleIcon className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-yellow-700">
                                Keep this key secret. Anyone with this key can
                                generate codes for your account.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>}
                    {method === 'sms' && <div>
                        <p className="text-gray-600 mb-4">
                          We'll send a verification code to your phone number
                          when you sign in.
                        </p>
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder="+1 (555) 123-4567" />
                          <p className="mt-1 text-sm text-gray-500">
                            Standard messaging rates may apply
                          </p>
                        </div>
                      </div>}
                    {method === 'email' && <div>
                        <p className="text-gray-600 mb-4">
                          We'll send a verification code to your email address
                          when you sign in.
                        </p>
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder="your.email@example.com" />
                          <p className="mt-1 text-sm text-gray-500">
                            Make sure you have access to this email
                          </p>
                        </div>
                      </div>}
                  </div>
                  <div className="border-t pt-6 flex justify-between">
                    <button onClick={resetSetup} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                      Back
                    </button>
                    <button onClick={proceedToVerify} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Continue
                    </button>
                  </div>
                </div>}

              {/* Verify Step */}
              {step === 'verify' && <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">
                      Verify your{' '}
                      {method === 'app' ? 'authenticator app' : method === 'sms' ? 'phone number' : 'email'}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {method === 'app' ? "Enter the 6-digit code from your authenticator app to verify it's set up correctly." : method === 'sms' ? `We've sent a verification code to ${phoneNumber}. Enter it below.` : `We've sent a verification code to ${email}. Enter it below.`}
                    </p>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Verification Code
                      </label>
                      <input type="text" value={verificationCode} onChange={e => setVerificationCode(e.target.value.replace(/[^0-9]/g, '').substring(0, 6))} className="w-full px-3 py-2 border rounded-md text-center text-lg tracking-widest font-mono" placeholder="000000" maxLength={6} />
                    </div>
                    {(method === 'sms' || method === 'email') && <div className="flex items-center justify-center mb-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center" onClick={proceedToVerify} // This would resend the code in a real app
                  >
                          <RefreshCwIcon className="w-4 h-4 mr-1" />
                          Resend Code
                        </button>
                      </div>}
                    {setupSuccess && <div className="bg-green-50 border border-green-100 rounded-md p-4 flex items-start mb-6">
                        <CheckIcon className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-green-800 mb-1">
                            Two-factor authentication enabled
                          </h3>
                          <p className="text-sm text-green-700">
                            Your account is now protected with an extra layer of
                            security.
                          </p>
                        </div>
                      </div>}
                  </div>
                  <div className="border-t pt-6 flex justify-between">
                    <button onClick={() => setStep('setup')} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50" disabled={setupSuccess}>
                      Back
                    </button>
                    {setupSuccess ? <button onClick={() => setStep('overview')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Done
                      </button> : <button onClick={handleVerification} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" disabled={verificationCode.length !== 6}>
                        Verify
                      </button>}
                  </div>
                </div>}
            </div>

            {/* Backup Codes Modal */}
            {showBackupCodes && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        Backup Codes
                      </h3>
                      <button onClick={() => setShowBackupCodes(false)} className="text-gray-400 hover:text-gray-600">
                        <XIcon className="w-6 h-6" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Use these backup codes to sign in if you lose access to
                      your authentication device. Each code can only be used
                      once.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <div className="grid grid-cols-2 gap-2">
                        {backupCodes.map((code, index) => <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                            <span className="font-mono text-sm">{code}</span>
                            <button onClick={() => copyToClipboard(code)} className="text-gray-500 hover:text-gray-700" title="Copy code">
                              <ClipboardIcon className="w-4 h-4" />
                            </button>
                          </div>)}
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-md p-3 flex items-start mb-6">
                      <AlertCircleIcon className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-700">
                        Keep these codes in a safe place. Anyone with these
                        codes can access your account.
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <button onClick={() => setShowBackupCodes(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                        Close
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Download Codes
                      </button>
                    </div>
                  </div>
                </div>
              </div>}

            {/* Disable 2FA Modal */}
            {showDisableModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        Disable Two-Factor Authentication?
                      </h3>
                      <button onClick={() => setShowDisableModal(false)} className="text-gray-400 hover:text-gray-600">
                        <XIcon className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-md p-4 flex items-start mb-6">
                      <AlertCircleIcon className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-red-800 mb-1">
                          Warning: Reduced Security
                        </h3>
                        <p className="text-sm text-red-700">
                          Disabling two-factor authentication will make your
                          account less secure. Anyone with your password will be
                          able to sign in.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button onClick={() => setShowDisableModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                        Cancel
                      </button>
                      <button onClick={handleDisable2FA} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        Disable Two-Factor Authentication
                      </button>
                    </div>
                  </div>
                </div>
              </div>}
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