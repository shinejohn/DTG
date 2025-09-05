import type { Route } from './+types/route';
import React, { useState } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CreditCardIcon, ArrowLeftIcon, CheckIcon, XIcon, AlertCircleIcon } from 'lucide-react';
export default function AddPaymentMethod() {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState<'card' | 'paypal'>('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [isDefault, setIsDefault] = useState(true);
  // PayPal form state
  const [paypalEmail, setPaypalEmail] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Validate form
    if (paymentType === 'card') {
      if (!cardNumber.trim() || !cardName.trim() || !expiryDate.trim() || !cvc.trim()) {
        setError('Please fill in all card details');
        setLoading(false);
        return;
      }
      // Basic validation
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        setError('Please enter a valid 16-digit card number');
        setLoading(false);
        return;
      }
      if (!/^\d{3,4}$/.test(cvc)) {
        setError('Please enter a valid CVC code (3-4 digits)');
        setLoading(false);
        return;
      }
      const [month, year] = expiryDate.split('/');
      if (!month || !year || !/^\d{2}$/.test(month) || !/^\d{2}$/.test(year)) {
        setError('Please enter a valid expiry date (MM/YY)');
        setLoading(false);
        return;
      }
    } else {
      if (!paypalEmail.trim()) {
        setError('Please enter your PayPal email');
        setLoading(false);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }
    }
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Redirect after success
      setTimeout(() => {
        navigate('/settings#billing');
      }, 1500);
    }, 1000);
  };
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCardNumber(formatCardNumber(value));
  };
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 2) {
      setExpiryDate(value);
    } else {
      setExpiryDate(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
    }
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Link to="/settings#billing" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back to Billing Settings
              </Link>
              <h1 className="text-2xl font-bold mt-2">Add Payment Method</h1>
              <p className="text-gray-600">
                Add a new card or PayPal account to your billing settings
              </p>
            </div>
            {/* Success message */} {success && <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
                <CheckIcon className="w-5 h-5 mr-2" />
                <span>Payment method added successfully! Redirecting...</span>
              </div>} {/* Error message */} {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                <XIcon className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                {/* Payment Type Tabs */}
                <div className="flex border-b mb-6">
                  <button onClick={() => setPaymentType('card')} className={`px-4 py-2 font-medium ${paymentType === 'card' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                    Credit Card
                  </button>
                  <button onClick={() => setPaymentType('paypal')} className={`px-4 py-2 font-medium ${paymentType === 'paypal' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                    PayPal
                  </button>
                </div>
                {/* Credit Card Form */} {paymentType === 'card' && <form onSubmit={handleSubmit} >
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input type="text" id="card-number" value={cardNumber} onChange={handleCardNumberChange} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CreditCardIcon className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input type="text" id="card-name" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="John Smith" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input type="text" id="expiry" value={expiryDate} onChange={handleExpiryDateChange} placeholder="MM/YY" maxLength={5} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                            CVC
                          </label>
                          <input type="text" id="cvc" value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, ''))} placeholder="123" maxLength={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <input type="checkbox" id="default-payment" checked={isDefault} onChange={() => setIsDefault(!isDefault)} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <label htmlFor="default-payment" className="ml-2 text-sm text-gray-700">
                          Set as default payment method
                        </label>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <Link to="/settings#billing" className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                        Cancel
                      </Link>
                      <button type="submit" disabled={loading} className={`px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 flex items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        {loading ? <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Processing...
                          </> : 'Add Card'}
                      </button>
                    </div>
                  </form>} {/* PayPal Form */} {paymentType === 'paypal' && <form onSubmit={handleSubmit} >
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                        <div className="flex">
                          <AlertCircleIcon className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-800 mb-1">
                              About PayPal Integration
                            </h4>
                            <p className="text-sm text-blue-700">
                              When you add a PayPal account, you'll be
                              redirected to PayPal to authorize the connection.
                              You'll then be returned to complete the setup.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="paypal-email" className="block text-sm font-medium text-gray-700 mb-1">
                          PayPal Email
                        </label>
                        <input type="email" id="paypal-email" value={paypalEmail} onChange={e => setPaypalEmail(e.target.value)} placeholder="your-email@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      <div className="flex items-center mt-2">
                        <input type="checkbox" id="default-payment-paypal" checked={isDefault} onChange={() => setIsDefault(!isDefault)} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <label htmlFor="default-payment-paypal" className="ml-2 text-sm text-gray-700">
                          Set as default payment method
                        </label>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <Link to="/settings#billing" className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                        Cancel
                      </Link>
                      <button type="submit" disabled={loading} className={`px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 flex items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        {loading ? <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Processing...
                          </> : 'Connect PayPal'}
                      </button>
                    </div>
                  </form>}
              </div>
            </div>
            <div className="mt-6 bg-gray-100 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircleIcon className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-700 mb-1">
                    Secure Payment Processing
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your payment information is encrypted and securely
                    processed. We do not store your full card details on our
                    servers.
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
