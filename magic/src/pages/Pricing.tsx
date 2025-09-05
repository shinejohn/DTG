import React, { useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import {
  CheckIcon,
  XIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  HelpCircleIcon,
  BuildingIcon,
  UserIcon,
  BarChart2Icon,
  MessageSquareIcon,
  CalendarIcon,
  GlobeIcon,
  TagIcon,
  BellIcon,
  Link2Icon,
  MapPinIcon,
  ImageIcon,
  SearchIcon,
  PhoneIcon,
  MailIcon,
  ArrowRightIcon,
  StarIcon,
  AwardIcon,
  TrendingUpIcon,
  ZapIcon,
  ShieldIcon,
  HeartIcon,
  LayersIcon,
  UsersIcon,
  ServerIcon,
  DatabaseIcon,
  RefreshCwIcon,
  FolderIcon,
  BriefcaseIcon,
  PieChartIcon,
  PlusIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
// Types
interface PricingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number | null
  annualPrice: number | null
  features: {
    name: string
    included: boolean | string
    highlight?: boolean
  }[]
  popular?: boolean
  buttonText: string
  buttonLink: string
  featureCategories?: {
    name: string
    features: {
      name: string
      included: boolean | string
    }[]
  }[]
}
interface FAQ {
  question: string
  answer: string
}
// Mock data
const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Basic presence for businesses testing the platform',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      {
        name: 'Basic Business Profile',
        included: true,
      },
      {
        name: 'Customer Review Collection',
        included: true,
      },
      {
        name: 'Basic Contact Information',
        included: true,
      },
      {
        name: 'Email Support (72-hour response)',
        included: true,
      },
      {
        name: 'Photos or Media Gallery',
        included: false,
      },
      {
        name: 'Product/Service Listings',
        included: false,
      },
      {
        name: 'Analytics or Insights',
        included: false,
      },
      {
        name: 'Coupons or Promotions',
        included: false,
      },
    ],
    featureCategories: [
      {
        name: 'Core Features',
        features: [
          {
            name: 'Basic Business Profile with business name, address, phone, hours',
            included: true,
          },
          {
            name: 'Customer Review Collection and display',
            included: true,
          },
          {
            name: 'Basic Contact Information listing',
            included: true,
          },
          {
            name: 'Email Support (72-hour response)',
            included: true,
          },
        ],
      },
      {
        name: 'Limited Features',
        features: [
          {
            name: 'Photos or media gallery',
            included: false,
          },
          {
            name: 'Product/service listings',
            included: false,
          },
          {
            name: 'Analytics or insights',
            included: false,
          },
          {
            name: 'Coupons or promotions',
            included: false,
          },
          {
            name: 'AI features',
            included: false,
          },
          {
            name: 'Community features',
            included: false,
          },
          {
            name: 'Gamification tools',
            included: false,
          },
        ],
      },
    ],
    buttonText: 'Get Started Free',
    buttonLink: '/register?plan=starter',
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'Essential tools for serious local businesses',
    monthlyPrice: 10,
    annualPrice: 99,
    features: [
      {
        name: 'Complete Business Profile with unlimited photos',
        included: true,
        highlight: true,
      },
      {
        name: 'Up to 25 Product/Service Listings',
        included: true,
        highlight: true,
      },
      {
        name: 'Basic Analytics Dashboard',
        included: true,
      },
      {
        name: '10 Coupons per Month',
        included: true,
      },
      {
        name: 'Community Badge Participation',
        included: true,
      },
      {
        name: 'Basic AI Recommendations',
        included: true,
      },
      {
        name: 'Event Creation (2 per month)',
        included: true,
      },
      {
        name: 'Cross-Platform Integration',
        included: true,
      },
    ],
    featureCategories: [
      {
        name: 'Everything in Starter, Plus',
        features: [
          {
            name: 'Complete Business Profile with unlimited photos',
            included: true,
          },
          {
            name: 'Up to 25 Product/Service Listings with descriptions',
            included: true,
          },
          {
            name: 'Basic Analytics Dashboard with key metrics',
            included: true,
          },
          {
            name: '10 Coupons per Month with standard targeting',
            included: true,
          },
          {
            name: 'Community Badge Participation and achievements',
            included: true,
          },
          {
            name: 'Basic AI Recommendations for content improvement',
            included: true,
          },
          {
            name: 'Event Creation (2 per month)',
            included: true,
          },
          {
            name: 'Cross-Platform Integration with Day.News & WhensTheFun',
            included: true,
          },
          {
            name: 'Email Support (48-hour response)',
            included: true,
          },
        ],
      },
      {
        name: 'Gamification & Rewards',
        features: [
          {
            name: 'User Points System for customer engagement',
            included: true,
          },
          {
            name: 'Basic Achievement Tracking for customers',
            included: true,
          },
          {
            name: 'Simple Loyalty Program (single tier)',
            included: true,
          },
          {
            name: 'Coupon Redemption Platform for customers',
            included: true,
          },
        ],
      },
    ],
    buttonText: 'Subscribe Now',
    buttonLink: '/register?plan=basic',
  },
  {
    id: 'professional',
    name: 'Professional',
    description:
      'Ideal for growing businesses wanting more visibility and automation',
    monthlyPrice: 29,
    annualPrice: 290,
    features: [
      {
        name: 'Unlimited Product/Service Listings',
        included: true,
        highlight: true,
      },
      {
        name: 'Unlimited Coupons with advanced targeting',
        included: true,
        highlight: true,
      },
      {
        name: 'Priority Search Placement',
        included: true,
        highlight: true,
      },
      {
        name: 'Advanced Analytics with competitor insights',
        included: true,
      },
      {
        name: 'AI-Powered Customer Segmentation',
        included: true,
      },
      {
        name: 'Unlimited Event Creation',
        included: true,
      },
      {
        name: 'Social Media Integration',
        included: true,
      },
      {
        name: 'Phone & Chat Support (24-hour response)',
        included: true,
      },
    ],
    popular: true,
    featureCategories: [
      {
        name: 'Everything in Basic, Plus',
        features: [
          {
            name: 'Unlimited Product/Service Listings with rich descriptions',
            included: true,
          },
          {
            name: 'Unlimited Coupons with advanced targeting options',
            included: true,
          },
          {
            name: 'Priority Search Placement in local results',
            included: true,
          },
          {
            name: 'Advanced Analytics with competitor insights',
            included: true,
          },
          {
            name: 'AI-Powered Customer Segmentation and targeting',
            included: true,
          },
          {
            name: 'Unlimited Event Creation and promotion',
            included: true,
          },
          {
            name: 'Social Media Integration and auto-posting',
            included: true,
          },
          {
            name: 'Custom Business Hours and holiday schedules',
            included: true,
          },
          {
            name: 'Advanced Review Management tools and responses',
            included: true,
          },
          {
            name: 'Phone & Chat Support (24-hour response)',
            included: true,
          },
          {
            name: 'Integration with 3 External Platforms',
            included: true,
          },
        ],
      },
      {
        name: 'Enhanced Gamification & Rewards',
        features: [
          {
            name: 'Multi-Tier Loyalty Program (up to 5 tiers)',
            included: true,
          },
          {
            name: 'Custom Achievement Creation for customers',
            included: true,
          },
          {
            name: 'Advanced Coupon Builder with audience targeting',
            included: true,
          },
          {
            name: 'Customer Engagement Analytics and insights',
            included: true,
          },
          {
            name: 'Referral Program Management for customer acquisition',
            included: true,
          },
          {
            name: 'Challenge Creation for community engagement',
            included: true,
          },
        ],
      },
    ],
    buttonText: 'Subscribe Now',
    buttonLink: '/register?plan=professional',
  },
  {
    id: 'premium',
    name: 'Premium',
    description:
      'Perfect for established businesses with multiple locations or complex needs',
    monthlyPrice: 79,
    annualPrice: 790,
    features: [
      {
        name: 'Multi-Location Management (up to 10 locations)',
        included: true,
        highlight: true,
      },
      {
        name: 'Advanced AI Automation workflows',
        included: true,
        highlight: true,
      },
      {
        name: 'Detailed Customer Journey Analytics',
        included: true,
      },
      {
        name: 'Competitor Analysis and benchmarking',
        included: true,
      },
      {
        name: 'Custom Badge Creation',
        included: true,
      },
      {
        name: 'Priority Customer Support',
        included: true,
      },
      {
        name: 'White-Label Customization options',
        included: true,
      },
      {
        name: 'Advanced Integration with 10+ platforms',
        included: true,
      },
    ],
    featureCategories: [
      {
        name: 'Everything in Professional, Plus',
        features: [
          {
            name: 'Multi-Location Management dashboard (up to 10 locations)',
            included: true,
          },
          {
            name: 'Advanced AI Automation workflows and customer journeys',
            included: true,
          },
          {
            name: 'Detailed Customer Journey Analytics and behavior tracking',
            included: true,
          },
          {
            name: 'Competitor Analysis and benchmarking tools',
            included: true,
          },
          {
            name: 'Custom Badge Creation and community campaigns',
            included: true,
          },
          {
            name: 'Priority Customer Support with dedicated representative',
            included: true,
          },
          {
            name: 'White-Label Customization options for branding',
            included: true,
          },
          {
            name: 'Advanced Integration with 10+ external platforms',
            included: true,
          },
          {
            name: 'Custom Reporting and data export capabilities',
            included: true,
          },
          {
            name: 'Beta Feature Early Access to new platform features',
            included: true,
          },
        ],
      },
      {
        name: 'Advanced Gamification & Rewards',
        features: [
          {
            name: 'Enterprise Loyalty Programs with unlimited tiers',
            included: true,
          },
          {
            name: 'Cross-Business Partnerships and joint campaigns',
            included: true,
          },
          {
            name: 'Advanced Customer Segmentation with AI insights',
            included: true,
          },
          {
            name: 'Automated Reward Campaigns based on customer behavior',
            included: true,
          },
          {
            name: 'VIP Customer Management with special recognition',
            included: true,
          },
          {
            name: 'Community Challenge Hosting for local engagement',
            included: true,
          },
          {
            name: 'Performance-Based Rewards and dynamic pricing',
            included: true,
          },
        ],
      },
    ],
    buttonText: 'Subscribe Now',
    buttonLink: '/register?plan=premium',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description:
      'Comprehensive solution for large businesses, franchises, and organizations',
    monthlyPrice: 199,
    annualPrice: 1990,
    features: [
      {
        name: 'Unlimited Multi-Location Management',
        included: true,
        highlight: true,
      },
      {
        name: 'Custom API Integrations',
        included: true,
        highlight: true,
      },
      {
        name: 'Dedicated Account Manager',
        included: true,
        highlight: true,
      },
      {
        name: 'Custom Workflow Automation',
        included: true,
      },
      {
        name: 'Advanced Data Analytics',
        included: true,
      },
      {
        name: 'White-Label Platform Customization',
        included: true,
      },
      {
        name: 'Priority Platform Development Input',
        included: true,
      },
      {
        name: '24/7 Phone Support',
        included: true,
      },
    ],
    featureCategories: [
      {
        name: 'Everything in Premium, Plus',
        features: [
          {
            name: 'Unlimited Multi-Location Management (no location limits)',
            included: true,
          },
          {
            name: 'Custom API Integrations and development support',
            included: true,
          },
          {
            name: 'Dedicated Account Manager and onboarding specialist',
            included: true,
          },
          {
            name: 'Custom Workflow Automation tailored to business needs',
            included: true,
          },
          {
            name: 'Advanced Data Analytics and business intelligence',
            included: true,
          },
          {
            name: 'White-Label Platform Customization with full branding',
            included: true,
          },
          {
            name: 'Priority Platform Development Input for feature requests',
            included: true,
          },
          {
            name: '24/7 Phone Support with dedicated support team',
            included: true,
          },
          {
            name: 'Custom Contract Terms and service level agreements',
            included: true,
          },
          {
            name: 'Advanced Security and compliance features',
            included: true,
          },
        ],
      },
      {
        name: 'Enterprise Gamification & Rewards',
        features: [
          {
            name: 'Custom Loyalty Platform Development unique to business',
            included: true,
          },
          {
            name: 'Advanced AI Personalization for individual customers',
            included: true,
          },
          {
            name: 'Enterprise-Wide Challenge Systems across all locations',
            included: true,
          },
          {
            name: 'Custom Achievement Frameworks aligned with business goals',
            included: true,
          },
          {
            name: 'Advanced Analytics Suite with predictive insights',
            included: true,
          },
          {
            name: 'White-Label Rewards Platform for customer-facing apps',
            included: true,
          },
          {
            name: 'Integration with Enterprise Systems (CRM, POS, ERP)',
            included: true,
          },
        ],
      },
    ],
    buttonText: 'Contact Sales',
    buttonLink: '#enterprise-contact',
  },
]
const faqs: FAQ[] = [
  {
    question: 'How do I choose the right plan for my business?',
    answer:
      'Consider your business size, goals, and budget. The Starter plan is great for small businesses just getting started. As you grow and need more features like promotional tools and enhanced visibility, you might want to upgrade to Basic or Professional. For multi-location businesses or those needing custom solutions, Premium or Enterprise is the best choice.',
  },
  {
    question: 'Can I upgrade or downgrade my plan later?',
    answer:
      'Yes, you can upgrade your plan at any time, and the new features will be immediately available. If you need to downgrade, you can do so at the end of your current billing cycle. Your account will continue with the current plan until that time.',
  },
  {
    question: 'Is there a contract or commitment period?',
    answer:
      'There is no long-term contract required. Monthly plans are billed month-to-month and can be canceled anytime. Annual plans are paid upfront for the year and provide a discount compared to monthly billing.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer:
      'Yes, we offer significant discounts when you choose annual billing compared to paying monthly. For example, the Basic plan is $10/month or $99/year (saving $21), and the Professional plan is $29/month or $290/year (saving $58).',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept major credit cards (Visa, Mastercard, American Express, Discover) and PayPal. For Enterprise plans, we can also accommodate invoicing and other payment methods - please contact our sales team to discuss options.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'We offer a 14-day free trial of our Professional plan for new users. No credit card is required to start the trial. You can also use our Starter plan indefinitely with basic features.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer:
      'You can cancel your subscription at any time from your account billing page. After cancellation, your account will remain active until the end of your current billing period, then automatically downgrade to the Starter plan.',
  },
  {
    question: 'What happens to my data if I cancel my paid subscription?',
    answer:
      'If you cancel a paid subscription, your account will revert to the Starter plan. Your basic business information will remain, but you may lose access to premium features and any data associated exclusively with those features.',
  },
]
function BookIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}
export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>(
    'monthly',
  )
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })
  const toggleFeature = (featureId: string) => {
    if (expandedFeature === featureId) {
      setExpandedFeature(null)
    } else {
      setExpandedFeature(featureId)
    }
  }
  const toggleFAQ = (questionId: string) => {
    if (expandedFAQ === questionId) {
      setExpandedFAQ(null)
    } else {
      setExpandedFAQ(questionId)
    }
  }
  const togglePlan = (planId: string) => {
    if (expandedPlan === planId) {
      setExpandedPlan(null)
    } else {
      setExpandedPlan(planId)
    }
  }
  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the form data to an API
    console.log('Contact form submitted:', contactForm)
    // Reset form
    setContactForm({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
    })
    // Show success message
    alert(
      'Thank you for your interest! Our sales team will contact you shortly.',
    )
  }
  // Function to get the appropriate icon for feature categories
  const getCategoryIcon = (categoryName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Core Features': <CheckCircleIcon className="w-5 h-5 text-green-500" />,
      'Limited Features': <XIcon className="w-5 h-5 text-red-500" />,
      'Everything in Starter, Plus': (
        <PlusIcon className="w-5 h-5 text-blue-500" />
      ),
      'Everything in Basic, Plus': (
        <PlusIcon className="w-5 h-5 text-blue-500" />
      ),
      'Everything in Professional, Plus': (
        <PlusIcon className="w-5 h-5 text-blue-500" />
      ),
      'Everything in Premium, Plus': (
        <PlusIcon className="w-5 h-5 text-blue-500" />
      ),
      'Gamification & Rewards': (
        <AwardIcon className="w-5 h-5 text-purple-500" />
      ),
      'Enhanced Gamification & Rewards': (
        <AwardIcon className="w-5 h-5 text-purple-500" />
      ),
      'Advanced Gamification & Rewards': (
        <AwardIcon className="w-5 h-5 text-purple-500" />
      ),
      'Enterprise Gamification & Rewards': (
        <AwardIcon className="w-5 h-5 text-purple-500" />
      ),
    }
    return (
      iconMap[categoryName] || <TagIcon className="w-5 h-5 text-gray-500" />
    )
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find the Perfect Plan for Your Business
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From local startups to established enterprises, we have pricing
              options to help your business thrive in the downtown community.
            </p>
            <div className="inline-flex items-center justify-center p-1 bg-gray-100 rounded-lg mb-12">
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium ${billingPeriod === 'monthly' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly Billing
              </button>
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium ${billingPeriod === 'annual' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setBillingPeriod('annual')}
              >
                Annual Billing
                <span className="ml-1 text-xs font-normal text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                  Save up to 17%
                </span>
              </button>
            </div>
          </div>
        </section>
        {/* Pricing Cards */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-xl shadow-sm border overflow-hidden relative ${plan.popular ? 'ring-2 ring-blue-500' : ''} flex flex-col`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 min-h-[40px]">
                      {plan.description}
                    </p>
                    <div className="mb-6">
                      {plan.monthlyPrice === 0 ? (
                        <p className="text-3xl font-bold text-gray-900">
                          Free
                          <span className="text-sm font-normal text-gray-600 ml-1">
                            forever
                          </span>
                        </p>
                      ) : (
                        <>
                          <p className="text-3xl font-bold text-gray-900">
                            $
                            {billingPeriod === 'monthly'
                              ? plan.monthlyPrice
                              : (plan.annualPrice! / 12).toFixed(0)}
                            <span className="text-sm font-normal text-gray-600">
                              /mo
                            </span>
                          </p>
                          {billingPeriod === 'annual' && plan.annualPrice && (
                            <p className="text-sm text-gray-600">
                              ${plan.annualPrice} billed annually
                              {plan.monthlyPrice &&
                                plan.annualPrice < plan.monthlyPrice * 12 && (
                                  <span className="text-green-600 ml-1">
                                    (Save $
                                    {(
                                      plan.monthlyPrice * 12 -
                                      plan.annualPrice
                                    ).toFixed(0)}
                                    )
                                  </span>
                                )}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    <Link
                      to={plan.buttonLink}
                      className={`block w-full py-2 px-4 rounded-md text-center font-medium ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : plan.id === 'starter' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'}`}
                    >
                      {plan.buttonText}
                    </Link>
                  </div>
                  <div className="border-t mt-auto">
                    <div className="p-6">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center justify-between">
                        <span>Key Features:</span>
                        <button
                          onClick={() => togglePlan(plan.id)}
                          className="text-blue-600 text-sm flex items-center"
                        >
                          {expandedPlan === plan.id ? 'Less' : 'More'} details
                          <ChevronDownIcon
                            className={`w-4 h-4 ml-1 transition-transform ${expandedPlan === plan.id ? 'transform rotate-180' : ''}`}
                          />
                        </button>
                      </h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            {typeof feature.included === 'boolean' ? (
                              feature.included ? (
                                <CheckIcon
                                  className={`w-5 h-5 flex-shrink-0 mr-2 ${feature.highlight ? 'text-blue-500' : 'text-green-500'}`}
                                />
                              ) : (
                                <XIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mr-2" />
                              )
                            ) : (
                              <CheckIcon
                                className={`w-5 h-5 flex-shrink-0 mr-2 ${feature.highlight ? 'text-blue-500' : 'text-green-500'}`}
                              />
                            )}
                            <span
                              className={`text-gray-700 text-sm ${feature.highlight ? 'font-medium' : ''}`}
                            >
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {/* Expanded plan details */}
                      {expandedPlan === plan.id && plan.featureCategories && (
                        <div className="mt-6 pt-4 border-t">
                          {plan.featureCategories.map(
                            (category, categoryIndex) => (
                              <div key={categoryIndex} className="mb-4">
                                <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                                  {getCategoryIcon(category.name)}
                                  <span className="ml-2">{category.name}</span>
                                </h5>
                                <ul className="space-y-2 ml-7">
                                  {category.features.map(
                                    (feature, featureIndex) => (
                                      <li
                                        key={featureIndex}
                                        className="flex items-start"
                                      >
                                        {typeof feature.included ===
                                        'boolean' ? (
                                          feature.included ? (
                                            <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0 mr-2" />
                                          ) : (
                                            <XIcon className="w-4 h-4 text-red-500 flex-shrink-0 mr-2" />
                                          )
                                        ) : (
                                          <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0 mr-2" />
                                        )}
                                        <span className="text-gray-600 text-sm">
                                          {feature.name}
                                        </span>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Plan Comparison */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Plan Comparison
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Compare our plans to find the perfect fit for your business
                needs
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Starter
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Basic
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50">
                      Professional
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Premium
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Price (Monthly)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Free
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      $10/mo
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-blue-50">
                      $29/mo
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      $79/mo
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      $199/mo
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Price (Annual)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Free
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      $99/yr
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-blue-50">
                      $290/yr
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      $790/yr
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      $1990/yr
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Business Profile
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Basic
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Complete
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-blue-50">
                      Enhanced
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Premium
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Custom
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Photo Gallery
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Unlimited
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-blue-50">
                      Unlimited
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Unlimited
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Unlimited
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Product/Service Listings
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Up to 25
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-blue-50">
                      Unlimited
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Unlimited
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Unlimited
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Analytics
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Basic
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-blue-50">
                      Advanced
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Detailed
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Custom
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Coupons & Promotions
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      10 per month
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-blue-50">
                      Unlimited
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Unlimited
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Unlimited
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Events
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      2 per month
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-blue-50">
                      Unlimited
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Unlimited
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Unlimited
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      AI Features
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Basic
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-blue-50">
                      Advanced
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Premium
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Custom
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Multi-Location Support
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-blue-50">
                      Up to 3
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Up to 10
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Unlimited
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Support
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Email (72h)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Email (48h)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center bg-blue-50">
                      Phone & Chat (24h)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Priority
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Dedicated
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      White Labeling
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center bg-blue-50">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Basic
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Full
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      API Access
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center bg-blue-50">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Limited
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      Full
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Link
                        to="/register?plan=starter"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        Get Started
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Link
                        to="/register?plan=basic"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                      >
                        Subscribe
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center bg-blue-50">
                      <Link
                        to="/register?plan=professional"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Subscribe
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Link
                        to="/register?plan=premium"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                      >
                        Subscribe
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <a
                        href="#enterprise-contact"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                      >
                        Contact Sales
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {/* Enterprise Contact Form */}
        <section id="enterprise-contact" className="py-16 px-4 bg-blue-600">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Need a Custom Solution?
                </h2>
                <p className="text-blue-100 text-lg mb-6">
                  Our Enterprise plan is perfect for multi-location businesses
                  and large organizations with specific needs. Contact our sales
                  team to discuss your requirements.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-blue-200 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-white">
                        Unlimited Multi-Location Management
                      </h3>
                      <p className="text-blue-100">
                        Manage all your business locations from a single
                        dashboard
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-blue-200 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-white">
                        Dedicated Account Manager
                      </h3>
                      <p className="text-blue-100">
                        Personal support from our experienced team
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-blue-200 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-white">
                        Custom API Integrations
                      </h3>
                      <p className="text-blue-100">
                        Connect with your existing systems and workflows
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-blue-200 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-white">
                        Enterprise Loyalty Programs
                      </h3>
                      <p className="text-blue-100">
                        Custom loyalty platform development unique to your
                        business
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Contact Our Sales Team
                </h3>
                <form onSubmit={handleContactSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Business Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={contactForm.company}
                        onChange={handleContactChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleContactChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        How can we help?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                      >
                        Contact Sales
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to our{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Have questions about our pricing or features? Find answers to
                common questions below.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left font-medium focus:outline-none"
                    onClick={() => toggleFAQ(`faq-${index}`)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-gray-500 transition-transform ${expandedFAQ === `faq-${index}` ? 'transform rotate-180' : ''}`}
                    />
                  </button>
                  {expandedFAQ === `faq-${index}` && (
                    <div className="p-4 bg-gray-50 border-t">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Still have questions? We're here to help.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              >
                Contact Support
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Grow Your Business with Downtown Guide?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of businesses that use Downtown Guide to connect
              with their local community and grow their customer base.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              >
                Get Started for Free
              </Link>
              <Link
                to="/demo"
                className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
// Helper function to render feature value
function renderFeatureValue(value: boolean | string | number) {
  if (typeof value === 'boolean') {
    return value ? (
      <CheckIcon className="w-5 h-5 text-green-500" />
    ) : (
      <XIcon className="w-5 h-5 text-gray-300" />
    )
  } else if (value) {
    return <span className="text-sm text-gray-600">{value}</span>
  } else {
    return <XIcon className="w-5 h-5 text-gray-300" />
  }
}
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}
