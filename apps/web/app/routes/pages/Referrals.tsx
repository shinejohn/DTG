import { Link } from "react-router";
import React, { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/dtg/Header';
import { Footer } from '@/components/dtg/Footer';

import {
  UsersIcon,
  UserPlusIcon,
  LinkIcon,
  CopyIcon,
  CheckIcon,
  MailIcon,
  PhoneIcon,
  ZapIcon,
  ShareIcon,
  ClockIcon,
  XIcon,
  ChevronRightIcon,
  AlertCircleIcon,
  GiftIcon,
  TagIcon,
  AwardIcon,
  RefreshCwIcon,
  TrendingUpIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  MessageSquareIcon,
  SendIcon,
} from 'lucide-react'
// Types
interface Referral {
  id: string
  email: string
  name?: string
  status: 'pending' | 'registered' | 'active' | 'expired'
  invitedAt: string
  registeredAt?: string
  pointsEarned?: number
}
interface ReferralStats {
  totalInvites: number
  successfulReferrals: number
  pendingReferrals: number
  totalPointsEarned: number
  referralCode: string
  referralLink: string
  referralBonus: number
}
interface ReferralCampaign {
  id: string
  title: string
  description: string
  bonus: number
  regularBonus: number
  expiresAt: string
  isActive: boolean
}

const mockReferrals: Referral[] = [
  {
    id: 'r1',
    email: 'john.smith@example.com',
    name: 'John Smith',
    status: 'active',
    invitedAt: '2023-07-15T10:30:00Z',
    registeredAt: '2023-07-16T14:45:00Z',
    pointsEarned: 150,
  },
  {
    id: 'r2',
    email: 'lisa.wong@example.com',
    name: 'Lisa Wong',
    status: 'active',
    invitedAt: '2023-07-20T09:15:00Z',
    registeredAt: '2023-07-22T11:30:00Z',
    pointsEarned: 150,
  },
  {
    id: 'r3',
    email: 'mike.johnson@example.com',
    status: 'pending',
    invitedAt: '2023-08-01T15:45:00Z',
  },
  {
    id: 'r4',
    email: 'alex.rodriguez@example.com',
    status: 'pending',
    invitedAt: '2023-08-05T11:20:00Z',
  },
  {
    id: 'r5',
    email: 'taylor.brown@example.com',
    name: 'Taylor Brown',
    status: 'registered',
    invitedAt: '2023-07-25T14:10:00Z',
    registeredAt: '2023-07-26T09:30:00Z',
  },
  {
    id: 'r6',
    email: 'jamie.lee@example.com',
    status: 'expired',
    invitedAt: '2023-06-10T08:30:00Z',
  },
]
const mockReferralStats: ReferralStats = {
  totalInvites: 6,
  successfulReferrals: 3,
  pendingReferrals: 2,
  totalPointsEarned: 300,
  referralCode: 'SARAH25',
  referralLink: 'https://example.com/ref/SARAH25',
  referralBonus: 150,
}
const mockCampaigns: ReferralCampaign[] = [
  {
    id: 'c1',
    title: 'Summer Referral Bonus',
    description: 'Get 200 points for each friend who joins before August 31st',
    bonus: 200,
    regularBonus: 150,
    expiresAt: '2023-08-31T23:59:59Z',
    isActive: true,
  },
  {
    id: 'c2',
    title: 'Refer 3, Get VIP',
    description:
      'Refer 3 friends and get a free upgrade to VIP status for 3 months',
    bonus: 150,
    regularBonus: 150,
    expiresAt: '2023-09-30T23:59:59Z',
    isActive: true,
  },
]
export default function Referrals() {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [stats, setStats] = useState<ReferralStats | null>(null)
  const [campaigns, setCampaigns] = useState<ReferralCampaign[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'successful'>(
    'all',
  )
  const [showShareModal, setShowShareModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteMessage, setInviteMessage] = useState(
    "I've been using this app to discover and review local businesses. Join me and get started with bonus points!",
  )
  const [copied, setCopied] = useState(false)
  const referralCodeRef = useRef<HTMLInputElement>(null)
  // Fetch referral data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use the mock data
    setLoading(true)
    setTimeout(() => {
      setReferrals(mockReferrals)
      setStats(mockReferralStats)
      setCampaigns(mockCampaigns)
      setLoading(false)
    }, 500)
  }, [])
  const filteredReferrals = () => {
    switch (activeTab) {
      case 'pending':
        return referrals.filter((r) => r.status === 'pending')
      case 'successful':
        return referrals.filter(
          (r) => r.status === 'active' || r.status === 'registered',
        )
      default:
        return referrals
    }
  }
  const copyReferralCode = () => {
    if (referralCodeRef.current) {
      referralCodeRef.current.select()
      document.execCommand('copy')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  const copyReferralLink = () => {
    if (stats) {
      navigator.clipboard.writeText(stats.referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  const openShareModal = (e) => {
    if (e) e.stopPropagation()
    setShowShareModal(true)
  }
  const closeShareModal = () => {
    setShowShareModal(false)
  }
  const openInviteModal = (e) => {
    if (e) e.stopPropagation()
    setShowInviteModal(true)
  }
  const closeInviteModal = () => {
    setShowInviteModal(false)
  }
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send an invitation
    console.log(`Inviting ${inviteEmail} with message: ${inviteMessage}`)
    // For the demo, we'll add a new pending referral
    const newReferral: Referral = {
      id: `r${referrals.length + 1}`,
      email: inviteEmail,
      status: 'pending',
      invitedAt: new Date().toISOString(),
    }
    setReferrals([newReferral, ...referrals])
    // Update stats
    if (stats) {
      setStats({
        ...stats,
        totalInvites: stats.totalInvites + 1,
        pendingReferrals: stats.pendingReferrals + 1,
      })
    }
    // Reset form and close modal
    setInviteEmail('')
    setShowInviteModal(false)
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  const getTimeRemaining = (dateString: string) => {
    const now = new Date()
    const expiryDate = new Date(dateString)
    const diffTime = expiryDate.getTime() - now.getTime()
    if (diffTime <= 0) return 'Expired'
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} left`
    }
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} left`
  }
  const getReferralStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="w-3 h-3 mr-1" />
            Pending
          </span>
        )
      case 'registered':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <UserIcon className="w-3 h-3 mr-1" />
            Registered
          </span>
        )
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckIcon className="w-3 h-3 mr-1" />
            Active
          </span>
        )
      case 'expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <XIcon className="w-3 h-3 mr-1" />
            Expired
          </span>
        )
      default:
        return null
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading referrals...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  if (!stats) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Referral Data Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              We couldn't find your referral information. Please try again
              later.
            </p>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Return to Home
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
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Refer Friends
              </h1>
              <p className="text-gray-600 mt-1">
                Invite friends and earn rewards when they join
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={openInviteModal} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              >
                <UserPlusIcon className="w-5 h-5 mr-1.5" />
                Invite Friends
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Content */}
            <div className="md:w-2/3">
              {/* Referral Stats Card */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Your Referral Stats
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-700">
                        {stats.totalInvites}
                      </div>
                      <div className="text-sm text-blue-600">Total Invites</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-700">
                        {stats.successfulReferrals}
                      </div>
                      <div className="text-sm text-green-600">Successful</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-700">
                        {stats.pendingReferrals}
                      </div>
                      <div className="text-sm text-yellow-600">Pending</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-700">
                        {stats.totalPointsEarned}
                      </div>
                      <div className="text-sm text-purple-600">
                        Points Earned
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-medium text-gray-900 mb-1">
                        Your Referral Code
                      </h3>
                      <div className="flex items-center">
                        <input
                          ref={referralCodeRef} type="text"
                          value={stats.referralCode}
                          readOnly
                          className="bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={copyReferralCode} className="ml-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md p-2"
                          title="Copy referral code"
                        >
                          {copied ? (
                            <CheckIcon className="w-5 h-5 text-green-600" />
                          ) : (
                            <CopyIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        Current Bonus
                      </h3>
                      <div className="flex items-center text-green-600 font-bold">
                        <ZapIcon className="w-5 h-5 mr-1" />
                        {stats.referralBonus} points per referral
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-6">
                    <button
                      onClick={openShareModal} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
                    >
                      <ShareIcon className="w-4 h-4 mr-1.5" />
                      Share Your Link
                    </button>
                    <button
                      onClick={openInviteModal} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
                    >
                      <MailIcon className="w-4 h-4 mr-1.5" />
                      Send Invites
                    </button>
                  </div>
                </div>
              </div>
              {/* Referrals Tab Navigation */}
              <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                <div className="border-b">
                  <nav className="flex">
                    <button
                      onClick={() => setActiveTab('all')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                        activeTab === 'all'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <UsersIcon className="w-4 h-4 inline-block mr-1" />
                      All Referrals
                    </button>
                    <button
                      onClick={() => setActiveTab('pending')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                        activeTab === 'pending'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <ClockIcon className="w-4 h-4 inline-block mr-1" />
                      Pending
                    </button>
                    <button
                      onClick={() => setActiveTab('successful')} className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                        activeTab === 'successful'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <CheckIcon className="w-4 h-4 inline-block mr-1" />
                      Successful
                    </button>
                  </nav>
                </div>
              </div>
              {/* Referrals List */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">
                    {activeTab === 'all' && 'All Referrals'} {activeTab === 'pending' && 'Pending Referrals'} {activeTab === 'successful' && 'Successful Referrals'}
                  </h2>
                  <button
                    onClick={() => setShowInviteModal(true)} className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <UserPlusIcon className="w-4 h-4 mr-1" />
                    Invite
                  </button>
                </div>
                {filteredReferrals().length === 0 ? (
                  <div className="p-8 text-center">
                    <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-700 mb-1">
                      No referrals found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {activeTab === 'all'
                        ? "You haven't invited anyone yet."
                        : activeTab === 'pending'
                          ? "You don't have any pending referrals."
                          : "You don't have any successful referrals yet."}
                    </p>
                    <button
                      onClick={() => setShowInviteModal(true)} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                    >
                      <UserPlusIcon className="w-4 h-4 mr-1.5" />
                      Invite Friends
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredReferrals().map((referral) => (
                      <div key={referral.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
                              <UserIcon className="w-5 h-5" />
                            </div>
                            <div className="ml-3">
                              <div className="font-medium text-gray-900">
                                {referral.name || referral.email}
                              </div>
                              {referral.name && (
                                <div className="text-sm text-gray-600">
                                  {referral.email}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="mb-1">
                              {getReferralStatusLabel(referral.status)}
                            </div>
                            <div className="text-xs text-gray-500">
                              Invited on {formatDate(referral.invitedAt)}
                            </div>
                          </div>
                        </div>
                        {referral.status === 'active' &&
                          referral.pointsEarned && (
                            <div className="mt-2 flex items-center text-green-600 text-sm">
                              <ZapIcon className="w-4 h-4 mr-1" />
                              <span>
                                You earned {referral.pointsEarned} points from
                                this referral
                              </span>
                            </div>
                          )} {referral.status === 'pending' && (
                          <div className="mt-2 flex justify-end">
                            <button
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                              onClick={() => {
                                // In a real app, this would send a reminder
                                alert(`Reminder sent to ${referral.email} `)
                              }}
                            >
                              <RefreshCwIcon className="w-3.5 h-3.5 mr-1" />
                              Send Reminder
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Sidebar */}
            <div className="md:w-1/3 space-y-6">
              {/* How it Works */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-bold text-gray-900">How It Works</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 mr-3">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Invite Your Friends
                        </p>
                        <p className="text-sm text-gray-600">
                          Share your referral code or send invites directly via
                          email
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 mr-3">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Friends Join
                        </p>
                        <p className="text-sm text-gray-600">
                          When your friends sign up using your referral code
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 mr-3">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Both Get Rewarded
                        </p>
                        <p className="text-sm text-gray-600">
                          You earn {stats.referralBonus} points and they get a
                          welcome bonus
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Special Campaigns */} {campaigns.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b">
                    <h2 className="font-bold text-gray-900">
                      Special Promotions
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="p-4">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600 mr-3">
                            <GiftIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium text-gray-900">
                                {campaign.title}
                              </h3>
                              <span className="text-xs text-orange-600 font-medium">
                                {getTimeRemaining(campaign.expiresAt)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {campaign.description}
                            </p>
                            {campaign.bonus > campaign.regularBonus && (
                              <div className="flex items-center text-green-600 text-sm">
                                <TrendingUpIcon className="w-4 h-4 mr-1" />
                                <span>
                                  <span className="font-medium">
                                    {campaign.bonus - campaign.regularBonus}
                                  </span>{' '}
                                  bonus points on top of regular rewards!
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )} {/* Tips for Success */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-bold text-gray-900">Tips for Success</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 mr-3">
                        <CheckIcon className="w-4 h-4" />
                      </div>
                      <p className="text-sm text-gray-700">
                        Personalize your invitation message to make it more
                        effective
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 mr-3">
                        <CheckIcon className="w-4 h-4" />
                      </div>
                      <p className="text-sm text-gray-700">
                        Share your positive experiences with the platform
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 mr-3">
                        <CheckIcon className="w-4 h-4" />
                      </div>
                      <p className="text-sm text-gray-700">
                        Follow up with your invitees to see if they have
                        questions
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 mr-3">
                        <CheckIcon className="w-4 h-4" />
                      </div>
                      <p className="text-sm text-gray-700">
                        Highlight the benefits they'll get when joining
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Share Modal */} {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()} >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Share Your Referral Link
                </h3>
                <button
                  onClick={closeShareModal} className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-700 mb-4">
                Share your unique referral link with friends and earn{' '} {stats.referralBonus} points for each successful referral.
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Referral Link
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={stats.referralLink} readOnly
                    className="flex-grow bg-gray-100 border border-gray-300 rounded-l-md py-2 px-3 text-gray-900 text-sm focus:outline-none"
                  />
                  <button
                    onClick={copyReferralLink} className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-r-md border border-l-0 border-gray-300"
                    title="Copy referral link"
                  >
                    {copied ? (
                      <CheckIcon className="w-5 h-5 text-green-600" />
                    ) : (
                      <CopyIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Share via</h4>
                <div className="grid grid-cols-4 gap-2">
                  <button className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <FacebookIcon className="w-6 h-6 text-[#1877F2] mb-1" />
                    <span className="text-xs text-gray-700">Facebook</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <TwitterIcon className="w-6 h-6 text-[#1DA1F2] mb-1" />
                    <span className="text-xs text-gray-700">Twitter</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <LinkedinIcon className="w-6 h-6 text-[#0A66C2] mb-1" />
                    <span className="text-xs text-gray-700">LinkedIn</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <MessageSquareIcon className="w-6 h-6 text-[#25D366] mb-1" />
                    <span className="text-xs text-gray-700">WhatsApp</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    closeShareModal()
                    openInviteModal()
                  } }
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Send email invites instead
                </button>
                <button
                  onClick={closeShareModal} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )} {/* Invite Modal */} {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()} >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Invite Friends
                </h3>
                <button
                  onClick={closeInviteModal} className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleInvite} >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Friend's Email
                  </label>
                  <input
                    type="email"
                    value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter your friend's email"
                    required
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    value={inviteMessage} onChange={(e) => setInviteMessage(e.target.value)}
                    placeholder="Add a personal message"
                    rows={3} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <div className="mb-4 bg-blue-50 rounded-md p-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <GiftIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-blue-800">
                        Referral Bonus
                      </h4>
                      <p className="text-xs text-blue-700 mt-1">
                        You'll earn {stats.referralBonus} points when your
                        friend joins and becomes active. They'll also receive
                        bonus points when signing up!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      closeInviteModal()
                      openShareModal()
                    } }
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Share link instead
                  </button>
                  <div>
                    <button
                      type="button"
                      onClick={closeInviteModal} className="mr-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!inviteEmail} className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium ${!inviteEmail ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Send Invite
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

