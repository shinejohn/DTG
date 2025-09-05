import type { Route } from './+types/route';
import React, { useEffect, useState } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '@/components/dtg/Header';
import { Footer } from '@/components/dtg/Footer';
import { CheckIcon, ArrowRightIcon, ZapIcon } from 'lucide-react';
export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  // Get plan from URL query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const planParam = searchParams.get('plan');
    if (planParam) {
      setSelectedPlan(planParam);
    }
  }, [location]);
  const plans = [{
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    description: 'Basic presence for businesses testing the platform',
    popular: false
  }, {
    id: 'basic',
    name: 'Basic',
    price: '$10/mo',
    description: 'Essential tools for serious local businesses',
    popular: false
  }, {
    id: 'professional',
    name: 'Professional',
    price: '$29/mo',
    description: 'Ideal for growing businesses wanting more visibility',
    popular: true
  }, {
    id: 'premium',
    name: 'Premium',
    price: '$79/mo',
    description: 'Perfect for established businesses with multiple locations',
    popular: false
  }];
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = 'Email is required';else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!name) newErrors.name = 'Name is required';
    if (step === 2 && !businessName) newErrors.businessName = 'Business name is required';
    if (!agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // In a real app, this would create a user account and then redirect
        navigate('/business/dashboard');
      }, 1500);
    }
  };
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep(2);
    }
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Business Account
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Join thousands of businesses connecting with their local community
            </p>
          </div>
          {step === 1 && <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  <h2 className="text-xl font-bold mb-6">Choose Your Plan</h2>
                  <div className="space-y-4">
                    {plans.map(plan => <div key={plan.id} className={`border rounded-lg p-4 cursor-pointer relative transition-all ${selectedPlan === plan.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'} ${plan.popular ? 'ring-2 ring-blue-500' : ''}`} onClick={() => setSelectedPlan(plan.id)}>
                        {plan.popular && <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                            Most Popular
                          </span>}
                        <div className="flex items-start">
                          <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${selectedPlan === plan.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'} `}>
                            {selectedPlan === plan.id && <CheckIcon className="w-3 h-3 text-white" />}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className="font-medium">{plan.name}</h3>
                              <span className="font-bold">{plan.price}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {plan.description}
                            </p>
                          </div>
                        </div>
                      </div>)}
                    <div className="text-center mt-6">
                      <Link to="/pricing" className="text-blue-600 text-sm font-medium hover:text-blue-800">
                        Compare all features
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 bg-gray-50 p-8 border-t md:border-t-0 md:border-l">
                  <h2 className="text-xl font-bold mb-6">
                    Account Information
                  </h2>
                  <form onSubmit={handleNextStep} >
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'} `} />
                        {errors.name && <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                          </p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} `} />
                        {errors.email && <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                          </p>}
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'} `} />
                        {errors.password && <p className="mt-1 text-sm text-red-600">
                            {errors.password}
                          </p>}
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={`w-full px-3 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} `} />
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">
                            {errors.confirmPassword}
                          </p>}
                      </div>
                      <div className="flex items-start">
                        <input type="checkbox" id="agreeTerms" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                          I agree to the{' '}
                          <a href="#" className="text-blue-600 hover:text-blue-800">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-blue-600 hover:text-blue-800">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                      {errors.agreeTerms && <p className="text-sm text-red-600">
                          {errors.agreeTerms}
                        </p>}
                      <div>
                        <button type="submit" className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-medium">
                          Continue
                          <ArrowRightIcon className="ml-2 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>} {step === 2 && <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Business Information</h2>
                  <div className="flex items-center">
                    <ZapIcon className="w-5 h-5 text-blue-600 mr-1" />
                    <span className="font-medium">
                      {selectedPlan ? plans.find(p => p.id === selectedPlan)?.name : 'Starter'} {' '}
                      Plan
                    </span>
                  </div>
                </div>
                <form onSubmit={handleSubmit} >
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Name
                      </label>
                      <input type="text" id="businessName" value={businessName} onChange={e => setBusinessName(e.target.value)} className={`w-full px-3 py-2 border rounded-md ${errors.businessName ? 'border-red-500' : 'border-gray-300'} `} />
                      {errors.businessName && <p className="mt-1 text-sm text-red-600">
                          {errors.businessName}
                        </p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700 mb-1">
                          Business Category
                        </label>
                        <select id="businessCategory" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="">Select a category</option>
                          <option value="restaurants">
                            Restaurants & Cafés
                          </option>
                          <option value="retail">Retail & Shopping</option>
                          <option value="services">
                            Professional Services
                          </option>
                          <option value="health">Health & Wellness</option>
                          <option value="entertainment">
                            Entertainment & Nightlife
                          </option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="businessPhone" className="block text-sm font-medium text-gray-700 mb-1">
                          Business Phone
                        </label>
                        <input type="tel" id="businessPhone" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Address
                      </label>
                      <input type="text" id="businessAddress" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Street Address" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <input type="text" id="businessCity" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="City" />
                      </div>
                      <div>
                        <input type="text" id="businessState" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="State/Province" />
                      </div>
                      <div>
                        <input type="text" id="businessZip" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="ZIP/Postal Code" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Description
                      </label>
                      <textarea id="businessDescription" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Tell us about your business..."></textarea>
                    </div>
                    <div className="flex justify-between pt-4">
                      <button type="button" onClick={() => setStep(1)} className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium">
                        Back
                      </button>
                      <button type="submit" className="py-2 px-6 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-medium flex items-center" disabled={isLoading} >
                        {isLoading ? <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Account...
                          </> : 'Create Account'}
                      </button>
                    </div>
                  </div>
                </form>
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
