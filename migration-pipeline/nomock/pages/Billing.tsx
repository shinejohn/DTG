import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import {
  CreditCardIcon,
  ChevronRightIcon,
  DownloadIcon,
  PlusIcon,
  CheckIcon,
  XIcon,
  AlertCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  BarChart2Icon,
  CalendarIcon,
  ImageIcon,
  MessageSquareIcon,
  TagIcon,
  UsersIcon,
  EyeIcon,
  BellIcon,
  ClockIcon,
  SettingsIcon,
  LogOutIcon,
  HelpCircleIcon,
  UserIcon,
  ShieldIcon,
  FileTextIcon,
  PenToolIcon,
  TrashIcon,
  RefreshCwIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
// Types
interface User {
  id: string
  name: string
  email: string
  avatar?: string
}
interface Subscription {
  id: string
  planId: string
  planName: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  trialEnd?: string
  billingCycle: 'monthly' | 'annual'
  amount: number
}
interface PaymentMethod {
  id: string
  type: 'card' | 'paypal'
  isDefault: boolean
  details: {
    brand?: string
    last4?: string
    expMonth?: number
    expYear?: number
    email?: string
  }
}
interface Invoice {
  id: string
  number: string
  date: string
  amount: number
  status: 'paid' | 'open' | 'draft' | 'void' | 'uncollectible'
  description: string
  downloadUrl: string
}
interface UsageMetric {
  name: string
  used: number
  limit: number
  unit: string
  icon: React.ReactNode
}
interface Plan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  annualPrice: number
  features: string[]
  popular?: boolean
}
// Mock data
const mockUser: User = {
  id: 'u1',
  name: 'John Smith',
  email: 'john@urbanbites.com',
  avatar: '/images/placeholder.jpg',
}
const mockSubscription: Subscription = {
  id: 'sub_123456',
  planId: 'premium',
  planName: 'Premium',
  status: 'active',
  currentPeriodStart: '2023-07-01',
  currentPeriodEnd: '2023-08-01',
  cancelAtPeriodEnd: false,
  billingCycle: 'monthly',
  amount: 79,
}
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm_1',
    type: 'card',
    isDefault: true,
    details: {
      brand: 'Visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2024,
    },
  },
  {
    id: 'pm_2',
    type: 'card',
    isDefault: false,
    details: {
      brand: 'Mastercard',
      last4: '5555',
      expMonth: 8,
      expYear: 2025,
    },
  },
  {
    id: 'pm_3',
    type: 'paypal',
    isDefault: false,
    details: {
      email: 'john@urbanbites.com',
    },
  },
]
const mockInvoices: Invoice[] = [
  {
    id: 'in_1',
    number: 'INV-001',
    date: '2023-07-01',
    amount: 79,
    status: 'paid',
    description: 'Premium Plan - Monthly',
    downloadUrl: '#',
  },
  {
    id: 'in_2',
    number: 'INV-002',
    date: '2023-06-01',
    amount: 79,
    status: 'paid',
    description: 'Premium Plan - Monthly',
    downloadUrl: '#',
  },
  {
    id: 'in_3',
    number: 'INV-003',
    date: '2023-05-01',
    amount: 79,
    status: 'paid',
    description: 'Premium Plan - Monthly',
    downloadUrl: '#',
  },
  {
    id: 'in_4',
    number: 'INV-004',
    date: '2023-04-01',
    amount: 79,
    status: 'paid',
    description: 'Premium Plan - Monthly',
    downloadUrl: '#',
  },
  {
    id: 'in_5',
    number: 'INV-005',
    date: '2023-03-01',
    amount: 79,
    status: 'paid',
    description: 'Premium Plan - Monthly',
    downloadUrl: '#',
  },
]
const mockUsageMetrics: UsageMetric[] = [
  {
    name: 'Business Photos',
    used: 15,
    limit: 0,
    unit: 'photos',
    icon: <ImageIcon className="w-5 h-5 text-blue-500" />,
  },
  {
    name: 'Active Promotions',
    used: 3,
    limit: 5,
    unit: 'promotions',
    icon: <TagIcon className="w-5 h-5 text-green-500" />,
  },
  {
    name: 'Monthly Events',
    used: 6,
    limit: 0,
    unit: 'events',
    icon: <CalendarIcon className="w-5 h-5 text-purple-500" />,
  },
  {
    name: 'Review Responses',
    used: 23,
    limit: 0,
    unit: 'responses',
    icon: <MessageSquareIcon className="w-5 h-5 text-yellow-500" />,
  },
  {
    name: 'API Requests',
    used: 1250,
    limit: 5000,
    unit: 'requests',
    icon: <RefreshCwIcon className="w-5 h-5 text-indigo-500" />,
  },
]
const mockPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'For individuals and small businesses just getting started',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Basic business profile',
      'Up to 5 business photos',
      'Customer reviews',
      'Basic analytics',
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    description:
      'For growing businesses looking to expand their online presence',
    monthlyPrice: 29,
    annualPrice: 290,
    features: [
      'Enhanced business profile',
      'Up to 20 business photos',
      'Customer reviews with response tools',
      'Advanced analytics',
      'Community events listing (3 per month)',
      'Basic promotional tools',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For established businesses wanting maximum visibility',
    monthlyPrice: 79,
    annualPrice: 790,
    features: [
      'Premium business profile',
      'Unlimited business photos',
      'Customer reviews with advanced management',
      'Comprehensive analytics & insights',
      'Unlimited community events',
      'Premium placement in search',
      'Advanced promotional tools',
      'Platform integrations',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For multi-location businesses and large organizations',
    monthlyPrice: 299,
    annualPrice: 2990,
    features: [
      'Custom business profile',
      'Unlimited business photos',
      'Customer reviews with advanced management',
      'Enterprise analytics & reporting',
      'Unlimited community events',
      'Premium placement in search',
      'Enterprise promotional tools',
      'Advanced platform integrations',
      'Dedicated account manager',
    ],
  },
]
export function Billing() {
  const [user, setUser] = useState<User | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [usageMetrics, setUsageMetrics] = useState<UsageMetric[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    'monthly',
  )
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false)
  const [showConfirmCancellation, setShowConfirmCancellation] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [activeSection, setActiveSection] = useState<
    'subscription' | 'payment' | 'history' | 'usage'
  >('subscription')
  // Fetch user and billing data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true)
    setTimeout(() => {
      setUser(mockUser)
      setSubscription(mockSubscription)
      setPaymentMethods(mockPaymentMethods)
      setInvoices(mockInvoices)
      setUsageMetrics(mockUsageMetrics)
      setSelectedPlan(mockSubscription.planId)
      setBillingCycle(mockSubscription.billingCycle)
      setLoading(false)
    }, 500)
  }, [])
  // Handle plan selection
  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId)
    setShowUpgradeModal(true)
  }
  // Handle payment method removal
  const handleRemovePaymentMethod = (id: string) => {
    // In a real app, this would call an API to remove the payment method
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }
  // Handle setting default payment method
  const handleSetDefaultPaymentMethod = (id: string) => {
    // In a real app, this would call an API to set the default payment method
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }
  // Handle subscription cancellation
  const handleCancelSubscription = () => {
    // In a real app, this would call an API to cancel the subscription
    if (subscription) {
      setSubscription({
        ...subscription,
        cancelAtPeriodEnd: true,
      })
      setShowConfirmCancellation(false)
    }
  }
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount)
  }
  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading billing information...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  if (!user || !subscription) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Subscription Found
            </h2>
            <p className="text-gray-600 mb-4">
              It looks like you don't have an active subscription.
            </p>
            <Link
              to="/pricing"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View Pricing Plans
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Billing & Subscription
            </h1>
            <p className="text-gray-600">
              Manage your subscription, payment methods, and billing history
            </p>
          </div>
          {/* Mobile Section Navigation */}
          <div className="block md:hidden mb-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setActiveSection('subscription')}
                className={`w-full text-left px-4 py-3 font-medium flex justify-between items-center ${activeSection === 'subscription' ? 'border-l-4 border-blue-600' : ''}`}
              >
                <span>Current Subscription</span>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => setActiveSection('payment')}
                className={`w-full text-left px-4 py-3 font-medium flex justify-between items-center ${activeSection === 'payment' ? 'border-l-4 border-blue-600' : ''}`}
              >
                <span>Payment Methods</span>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => setActiveSection('history')}
                className={`w-full text-left px-4 py-3 font-medium flex justify-between items-center ${activeSection === 'history' ? 'border-l-4 border-blue-600' : ''}`}
              >
                <span>Billing History</span>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => setActiveSection('usage')}
                className={`w-full text-left px-4 py-3 font-medium flex justify-between items-center ${activeSection === 'usage' ? 'border-l-4 border-blue-600' : ''}`}
              >
                <span>Usage & Limits</span>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="col-span-2 space-y-6">
              {/* Current Subscription */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold">
                    Current Subscription
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-bold text-gray-900">
                          {subscription.planName} Plan
                        </h3>
                        {subscription.status === 'active' && (
                          <span className="ml-2 px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Active
                          </span>
                        )}
                        {subscription.status === 'trialing' && (
                          <span className="ml-2 px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            Trial
                          </span>
                        )}
                        {subscription.status === 'past_due' && (
                          <span className="ml-2 px-2.5 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            Past Due
                          </span>
                        )}
                        {subscription.status === 'canceled' && (
                          <span className="ml-2 px-2.5 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                            Canceled
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">
                        {formatCurrency(subscription.amount)} /{' '}
                        {subscription.billingCycle === 'monthly'
                          ? 'month'
                          : 'year'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Current period</p>
                      <p className="font-medium">
                        {formatDate(subscription.currentPeriodStart)} -{' '}
                        {formatDate(subscription.currentPeriodEnd)}
                      </p>
                    </div>
                  </div>
                  {/* Plan Features */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Plan Features:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mockPlans
                        .find((plan) => plan.id === subscription.planId)
                        ?.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  {/* Subscription Status Information */}
                  {subscription.cancelAtPeriodEnd && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <div className="flex">
                        <AlertCircleIcon className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-yellow-800">
                            Subscription Cancellation Scheduled
                          </h4>
                          <p className="text-yellow-700 text-sm mt-1">
                            Your subscription will be canceled on{' '}
                            {formatDate(subscription.currentPeriodEnd)}. You'll
                            still have access to all features until this date.
                          </p>
                          <button
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                            onClick={() => {
                              // In a real app, this would call an API to resume the subscription
                              setSubscription({
                                ...subscription,
                                cancelAtPeriodEnd: false,
                              })
                            }}
                          >
                            Resume Subscription
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {subscription.trialEnd &&
                    new Date(subscription.trialEnd) > new Date() && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                          <AlertCircleIcon className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-blue-800">
                              Trial Period Active
                            </h4>
                            <p className="text-blue-700 text-sm mt-1">
                              Your trial ends on{' '}
                              {formatDate(subscription.trialEnd)}. After this
                              date, you'll be automatically billed at the
                              regular rate.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/pricing"
                      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                    >
                      Upgrade Plan
                    </Link>
                    {!subscription.cancelAtPeriodEnd && (
                      <button
                        onClick={() => setShowConfirmCancellation(true)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
                      >
                        Cancel Subscription
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setBillingCycle(
                          billingCycle === 'monthly' ? 'annual' : 'monthly',
                        )
                      }
                      className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
                    >
                      Switch to{' '}
                      {billingCycle === 'monthly' ? 'Annual' : 'Monthly'}{' '}
                      Billing
                    </button>
                  </div>
                </div>
              </div>
              {/* Payment Methods */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold">Payment Methods</h2>
                </div>
                <div className="p-6">
                  {paymentMethods.length === 0 ? (
                    <div className="text-center py-8">
                      <CreditCardIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No payment methods
                      </h3>
                      <p className="text-gray-600 mb-4">
                        You haven't added any payment methods yet.
                      </p>
                      <button
                        onClick={() => setShowAddPaymentMethod(true)}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                      >
                        Add Payment Method
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="space-y-4 mb-6">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`border rounded-lg p-4 ${method.isDefault ? 'border-blue-500 bg-blue-50' : ''}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {method.type === 'card' ? (
                                  <>
                                    {method.details.brand === 'Visa' && (
                                      <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center mr-3">
                                        VISA
                                      </div>
                                    )}
                                    {method.details.brand === 'Mastercard' && (
                                      <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded text-white text-xs font-bold flex items-center justify-center mr-3">
                                        MC
                                      </div>
                                    )}
                                    <div>
                                      <div className="font-medium">
                                        {method.details.brand} ••••{' '}
                                        {method.details.last4}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        Expires {method.details.expMonth}/
                                        {method.details.expYear}
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center mr-3">
                                      PP
                                    </div>
                                    <div>
                                      <div className="font-medium">PayPal</div>
                                      <div className="text-sm text-gray-600">
                                        {method.details.email}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center">
                                {method.isDefault && (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-2">
                                    Default
                                  </span>
                                )}
                                <div className="relative">
                                  <button
                                    className="p-1 rounded-full hover:bg-gray-100"
                                    onClick={() => {
                                      // Toggle dropdown
                                    }}
                                  >
                                    <MoreIcon className="w-5 h-5 text-gray-500" />
                                  </button>
                                  {/* Dropdown menu would go here */}
                                </div>
                              </div>
                            </div>
                            {!method.isDefault && (
                              <div className="mt-3 flex justify-end space-x-2">
                                <button
                                  onClick={() =>
                                    handleSetDefaultPaymentMethod(method.id)
                                  }
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                  Set as Default
                                </button>
                                <button
                                  onClick={() =>
                                    handleRemovePaymentMethod(method.id)
                                  }
                                  className="text-sm text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setShowAddPaymentMethod(true)}
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Add Payment Method
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* Billing History */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold">Billing History</h2>
                </div>
                <div className="p-6">
                  {invoices.length === 0 ? (
                    <div className="text-center py-8">
                      <FileTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No invoices yet
                      </h3>
                      <p className="text-gray-600">
                        Your billing history will appear here once you've been
                        charged.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Invoice
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">
                                  {invoice.number}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {invoice.description}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {formatDate(invoice.date)}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {formatCurrency(invoice.amount)}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    invoice.status === 'paid'
                                      ? 'bg-green-100 text-green-800'
                                      : invoice.status === 'open'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {invoice.status.charAt(0).toUpperCase() +
                                    invoice.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a
                                  href={invoice.downloadUrl}
                                  className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                                >
                                  <DownloadIcon className="w-4 h-4 mr-1" />
                                  PDF
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-6">
              {/* Usage & Limits */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold">Usage & Limits</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {usageMetrics.map((metric) => (
                      <div key={metric.name}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="p-2 bg-gray-100 rounded-lg mr-2">
                              {metric.icon}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {metric.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {metric.used} /{' '}
                                {metric.limit === 0
                                  ? 'Unlimited'
                                  : metric.limit}{' '}
                                {metric.unit}
                              </p>
                            </div>
                          </div>
                        </div>
                        {metric.limit > 0 && (
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${
                                metric.used / metric.limit > 0.9
                                  ? 'bg-red-600'
                                  : metric.used / metric.limit > 0.7
                                    ? 'bg-yellow-600'
                                    : 'bg-green-600'
                              }`}
                              style={{
                                width: `${Math.min((metric.used / metric.limit) * 100, 100)}%`,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Account Information */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold">Account Information</h2>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-full mr-4 object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <UserIcon className="w-8 h-8 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Link
                      to="/account/profile"
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <UserIcon className="w-5 h-5 text-gray-500 mr-3" />
                        <span>Edit Profile</span>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    </Link>
                    <Link
                      to="/account/security"
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <ShieldIcon className="w-5 h-5 text-gray-500 mr-3" />
                        <span>Security Settings</span>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    </Link>
                    <Link
                      to="/account/notifications"
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <BellIcon className="w-5 h-5 text-gray-500 mr-3" />
                        <span>Notification Preferences</span>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* Help & Support */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold">Help & Support</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <Link
                      to="/help/billing"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <HelpCircleIcon className="w-5 h-5 mr-2" />
                      Billing FAQ
                    </Link>
                    <Link
                      to="/contact"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <MessageSquareIcon className="w-5 h-5 mr-2" />
                      Contact Support
                    </Link>
                    <div className="text-sm text-gray-600 mt-4">
                      <p>Have questions about your bill?</p>
                      <p className="mt-1">
                        Email us at{' '}
                        <a
                          href="mailto:billing@downtownguide.com"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          billing@downtownguide.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Content */}
          <div className="md:hidden">
            {activeSection === 'subscription' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold">
                    Current Subscription
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-bold text-gray-900">
                          {subscription.planName} Plan
                        </h3>
                        {subscription.status === 'active' && (
                          <span className="ml-2 px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">
                        {formatCurrency(subscription.amount)} /{' '}
                        {subscription.billingCycle === 'monthly'
                          ? 'month'
                          : 'year'}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Current period</p>
                    <p className="font-medium">
                      {formatDate(subscription.currentPeriodStart)} -{' '}
                      {formatDate(subscription.currentPeriodEnd)}
                    </p>
                  </div>
                  {/* Plan Features */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Plan Features:
                    </h4>
                    <div className="space-y-2">
                      {mockPlans
                        .find((plan) => plan.id === subscription.planId)
                        ?.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  {/* Subscription Status Information */}
                  {subscription.cancelAtPeriodEnd && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <div className="flex">
                        <AlertCircleIcon className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-yellow-800">
                            Subscription Cancellation Scheduled
                          </h4>
                          <p className="text-yellow-700 text-sm mt-1">
                            Your subscription will be canceled on{' '}
                            {formatDate(subscription.currentPeriodEnd)}.
                          </p>
                          <button
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                            onClick={() => {
                              // In a real app, this would call an API to resume the subscription
                              setSubscription({
                                ...subscription,
                                cancelAtPeriodEnd: false,
                              })
                            }}
                          >
                            Resume Subscription
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Actions */}
                  <div className="space-y-3">
                    <Link
                      to="/pricing"
                      className="block w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 text-center"
                    >
                      Upgrade Plan
                    </Link>
                    {!subscription.cancelAtPeriodEnd && (
                      <button
                        onClick={() => setShowConfirmCancellation(true)}
                        className="block w-full px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 text-center"
                      >
                        Cancel Subscription
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setBillingCycle(
                          billingCycle === 'monthly' ? 'annual' : 'monthly',
                        )
                      }
                      className="block w-full px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 text-center"
                    >
                      Switch to{' '}
                      {billingCycle === 'monthly' ? 'Annual' : 'Monthly'}{' '}
                      Billing
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'payment' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold">Payment Methods</h2>
                </div>
                <div className="p-6">
                  {paymentMethods.length === 0 ? (
                    <div className="text-center py-8">
                      <CreditCardIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No payment methods
                      </h3>
                      <p className="text-gray-600 mb-4">
                        You haven't added any payment methods yet.
                      </p>
                      <button
                        onClick={() => setShowAddPaymentMethod(true)}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                      >
                        Add Payment Method
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="space-y-4 mb-6">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`border rounded-lg p-4 ${method.isDefault ? 'border-blue-500 bg-blue-50' : ''}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {method.type === 'card' ? (
                                  <>
                                    {method.details.brand === 'Visa' && (
                                      <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center mr-3">
                                        VISA
                                      </div>
                                    )}
                                    {method.details.brand === 'Mastercard' && (
                                      <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded text-white text-xs font-bold flex items-center justify-center mr-3">
                                        MC
                                      </div>
                                    )}
                                    <div>
                                      <div className="font-medium">
                                        {method.details.brand} ••••{' '}
                                        {method.details.last4}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        Expires {method.details.expMonth}/
                                        {method.details.expYear}
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center mr-3">
                                      PP
                                    </div>
                                    <div>
                                      <div className="font-medium">PayPal</div>
                                      <div className="text-sm text-gray-600">
                                        {method.details.email}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              {method.isDefault && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            {!method.isDefault && (
                              <div className="mt-3 flex justify-end space-x-2">
                                <button
                                  onClick={() =>
                                    handleSetDefaultPaymentMethod(method.id)
                                  }
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                  Set as Default
                                </button>
                                <button
                                  onClick={() =>
                                    handleRemovePaymentMethod(method.id)
                                  }
                                  className="text-sm text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setShowAddPaymentMethod(true)}
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Add Payment Method
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeSection === 'history' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold">Billing History</h2>
                </div>
                <div className="p-6">
                  {invoices.length === 0 ? (
                    <div className="text-center py-8">
                      <FileTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No invoices yet
                      </h3>
                      <p className="text-gray-600">
                        Your billing history will appear here once you've been
                        charged.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {invoices.map((invoice) => (
                        <div key={invoice.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">{invoice.number}</div>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                invoice.status === 'paid'
                                  ? 'bg-green-100 text-green-800'
                                  : invoice.status === 'open'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {invoice.status.charAt(0).toUpperCase() +
                                invoice.status.slice(1)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {invoice.description}
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm text-gray-600">
                              {formatDate(invoice.date)}
                            </div>
                            <div className="font-medium">
                              {formatCurrency(invoice.amount)}
                            </div>
                          </div>
                          <div className="mt-3 text-right">
                            <a
                              href={invoice.downloadUrl}
                              className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm"
                            >
                              <DownloadIcon className="w-4 h-4 mr-1" />
                              Download PDF
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeSection === 'usage' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold">Usage & Limits</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {usageMetrics.map((metric) => (
                      <div key={metric.name}>
                        <div className="flex items-center mb-2">
                          <div className="p-2 bg-gray-100 rounded-lg mr-2">
                            {metric.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {metric.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {metric.used} /{' '}
                              {metric.limit === 0 ? 'Unlimited' : metric.limit}{' '}
                              {metric.unit}
                            </p>
                          </div>
                        </div>
                        {metric.limit > 0 && (
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${
                                metric.used / metric.limit > 0.9
                                  ? 'bg-red-600'
                                  : metric.used / metric.limit > 0.7
                                    ? 'bg-yellow-600'
                                    : 'bg-green-600'
                              }`}
                              style={{
                                width: `${Math.min((metric.used / metric.limit) * 100, 100)}%`,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      {/* Modals */}
      {/* Add Payment Method Modal */}
      {showAddPaymentMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Add Payment Method
                </h3>
                <button
                  onClick={() => setShowAddPaymentMethod(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex border-b">
                  <button className="px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600">
                    Credit Card
                  </button>
                  <button className="px-4 py-2 font-medium text-gray-600">
                    PayPal
                  </button>
                </div>
                <div>
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiry"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Smith"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="default-payment"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="default-payment"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Set as default payment method
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddPaymentMethod(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // In a real app, this would validate and process the payment method
                    setShowAddPaymentMethod(false)
                    // Add the new payment method to the list
                    const newMethod: PaymentMethod = {
                      id: `pm_${Math.random().toString(36).substr(2, 9)}`,
                      type: 'card',
                      isDefault: paymentMethods.length === 0,
                      details: {
                        brand: 'Visa',
                        last4: '4242',
                        expMonth: 12,
                        expYear: 2025,
                      },
                    }
                    setPaymentMethods([...paymentMethods, newMethod])
                  }}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                >
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Confirm Cancellation Modal */}
      {showConfirmCancellation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Cancel Subscription
                </h3>
                <button
                  onClick={() => setShowConfirmCancellation(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Are you sure you want to cancel your subscription? You'll
                  still have access to all features until the end of your
                  current billing period on{' '}
                  {formatDate(subscription.currentPeriodEnd)}.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <AlertCircleIcon className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                    <p className="text-yellow-700 text-sm">
                      After cancellation, your account will revert to the Free
                      plan and you'll lose access to Premium features.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmCancellation(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleCancelSubscription}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700"
                >
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Plan Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedPlan === subscription.planId
                    ? 'Change Billing Cycle'
                    : selectedPlan === 'free'
                      ? 'Downgrade to Free Plan'
                      : `Upgrade to ${mockPlans.find((p) => p.id === selectedPlan)?.name} Plan`}
                </h3>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-6">
                {selectedPlan === subscription.planId ? (
                  <p className="text-gray-600 mb-4">
                    You're changing your billing cycle from{' '}
                    {subscription.billingCycle} to {billingCycle}.
                    {billingCycle === 'annual' &&
                      " You'll save approximately 17% compared to monthly billing."}
                  </p>
                ) : selectedPlan === 'free' ? (
                  <div className="mb-4">
                    <p className="text-gray-600 mb-4">
                      You're downgrading from the {subscription.planName} Plan
                      to the Free Plan. This will take effect at the end of your
                      current billing period on{' '}
                      {formatDate(subscription.currentPeriodEnd)}.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex">
                        <AlertCircleIcon className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-yellow-800">
                            What you'll lose:
                          </h4>
                          <ul className="mt-2 space-y-1 text-yellow-700 text-sm">
                            {mockPlans
                              .find((p) => p.id === subscription.planId)
                              ?.features.map((feature, index) => {
                                if (
                                  !mockPlans
                                    .find((p) => p.id === 'free')
                                    ?.features.includes(feature)
                                ) {
                                  return (
                                    <li
                                      key={index}
                                      className="flex items-start"
                                    >
                                      <XIcon className="w-4 h-4 text-red-500 mr-1 flex-shrink-0 mt-0.5" />
                                      <span>{feature}</span>
                                    </li>
                                  )
                                }
                                return null
                              })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <p className="text-gray-600 mb-4">
                      You're upgrading from the {subscription.planName} Plan to
                      the {mockPlans.find((p) => p.id === selectedPlan)?.name}{' '}
                      Plan. Your new plan will be effective immediately.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-green-800">
                            What you'll gain:
                          </h4>
                          <ul className="mt-2 space-y-1 text-green-700 text-sm">
                            {mockPlans
                              .find((p) => p.id === selectedPlan)
                              ?.features.map((feature, index) => {
                                if (
                                  !mockPlans
                                    .find((p) => p.id === subscription.planId)
                                    ?.features.includes(feature)
                                ) {
                                  return (
                                    <li
                                      key={index}
                                      className="flex items-start"
                                    >
                                      <CheckIcon className="w-4 h-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                                      <span>{feature}</span>
                                    </li>
                                  )
                                }
                                return null
                              })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">New plan:</span>
                      <span className="font-medium">
                        {mockPlans.find((p) => p.id === selectedPlan)?.name}{' '}
                        Plan
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Billing cycle:</span>
                      <span className="font-medium">
                        {billingCycle === 'monthly' ? 'Monthly' : 'Annual'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">
                        {billingCycle === 'monthly'
                          ? formatCurrency(
                              mockPlans.find((p) => p.id === selectedPlan)
                                ?.monthlyPrice || 0,
                            )
                          : formatCurrency(
                              mockPlans.find((p) => p.id === selectedPlan)
                                ?.annualPrice || 0,
                            )}{' '}
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {selectedPlan !== 'free' && billingCycle === 'annual' && (
                      <div className="flex justify-between text-green-600">
                        <span>Annual savings:</span>
                        <span>
                          {formatCurrency(
                            (mockPlans.find((p) => p.id === selectedPlan)
                              ?.monthlyPrice || 0) *
                              12 -
                              (mockPlans.find((p) => p.id === selectedPlan)
                                ?.annualPrice || 0),
                          )}
                        </span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Next payment:</span>
                        <span>
                          {selectedPlan === 'free'
                            ? 'Free'
                            : billingCycle === 'monthly'
                              ? formatCurrency(
                                  mockPlans.find((p) => p.id === selectedPlan)
                                    ?.monthlyPrice || 0,
                                )
                              : formatCurrency(
                                  mockPlans.find((p) => p.id === selectedPlan)
                                    ?.annualPrice || 0,
                                )}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 text-right">
                        {selectedPlan !== 'free' &&
                          (selectedPlan === subscription.planId
                            ? `Next billing date: ${formatDate(subscription.currentPeriodEnd)}`
                            : 'Will be charged today')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // In a real app, this would call an API to change the subscription
                    setSubscription({
                      ...subscription,
                      planId: selectedPlan,
                      planName:
                        mockPlans.find((p) => p.id === selectedPlan)?.name ||
                        '',
                      billingCycle,
                      amount:
                        billingCycle === 'monthly'
                          ? mockPlans.find((p) => p.id === selectedPlan)
                              ?.monthlyPrice || 0
                          : (mockPlans.find((p) => p.id === selectedPlan)
                              ?.annualPrice || 0) / 12,
                      cancelAtPeriodEnd: selectedPlan === 'free',
                    })
                    setShowUpgradeModal(false)
                  }}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                >
                  {selectedPlan === subscription.planId
                    ? 'Change Billing Cycle'
                    : selectedPlan === 'free'
                      ? 'Downgrade to Free'
                      : `Upgrade to ${mockPlans.find((p) => p.id === selectedPlan)?.name}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
function MoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}
function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}
function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}
function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}
