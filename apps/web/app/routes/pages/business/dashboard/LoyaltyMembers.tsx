import type { Route } from './+types/route';
import React, { useState } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { UsersIcon, SearchIcon, FilterIcon, SortAscIcon, DownloadIcon, MailIcon, MessageSquareIcon, BellIcon, CheckSquareIcon, PercentIcon, StarIcon, CrownIcon, CalendarIcon, ChevronDownIcon, ChevronUpIcon, XIcon, SendIcon, CheckIcon } from 'lucide-react';

// Mock data - replace with actual data from your backend
const mockLoyaltyMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    tier: 'Gold',
    points: 2500,
    totalSpent: 1250,
    lastVisit: '2024-01-15',
    checkIns: 45,
    couponsUsed: 12,
    achievements: 8
  },
  // Add more mock members as needed
];

const mockProgramMetrics = {
  totalMembers: 1234,
  activeMembers: 892,
  newMembersThisMonth: 45,
  averagePointsPerMember: 756,
  redemptionRate: 65,
  topTiers: [
    { name: 'Bronze', percentage: 45 },
    { name: 'Silver', percentage: 35 },
    { name: 'Gold', percentage: 20 }
  ]
};
export default function LoyaltyMembers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationType, setNotificationType] = useState<'email' | 'sms' | 'push'>('email');
  const [notificationSubject, setNotificationSubject] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  const filteredMembers = mockLoyaltyMembers.filter(member => member.name.toLowerCase().includes(searchQuery.toLowerCase()) || member.email.toLowerCase().includes(searchQuery.toLowerCase()) || member.tier.toLowerCase().includes(searchQuery.toLowerCase()));
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (!sortField) return 0;
    let valueA, valueB;
    switch (sortField) {
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'tier':
        valueA = a.tier;
        valueB = b.tier;
        break;
      case 'points':
        valueA = a.points;
        valueB = b.points;
        break;
      case 'spent':
        valueA = a.totalSpent;
        valueB = b.totalSpent;
        break;
      case 'lastVisit':
        valueA = new Date(a.lastVisit).getTime();
        valueB = new Date(b.lastVisit).getTime();
        break;
      case 'checkIns':
        valueA = a.checkIns;
        valueB = b.checkIns;
        break;
      default:
        return 0;
    }
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  const toggleSelectMember = (memberId: string) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };
  const selectAllMembers = () => {
    if (selectedMembers.length === sortedMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(sortedMembers.map(member => member.id));
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze':
        return 'bg-amber-100 text-amber-800';
      case 'Silver':
        return 'bg-gray-100 text-gray-800';
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  const handleSendNotification = () => {
    // In a real app, this would send the notification to the selected members
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowNotificationModal(false);
      setNotificationSubject('');
      setNotificationMessage('');
    }, 2000);
  };
  return <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Loyalty Program Members
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your loyalty program members and send targeted communications
        </p>
      </div>
      {/* Program Metrics */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Program Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-700 mb-1">Total Members</div>
            <div className="text-2xl font-bold text-blue-900">
              {mockProgramMetrics.totalMembers}
            </div>
            <div className="text-xs text-blue-600 mt-1">
              {mockProgramMetrics.newMembersThisMonth} new this month
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm text-green-700 mb-1">Active Members</div>
            <div className="text-2xl font-bold text-green-900">
              {mockProgramMetrics.activeMembers}
            </div>
            <div className="text-xs text-green-600 mt-1">
              {Math.round(mockProgramMetrics.activeMembers / mockProgramMetrics.totalMembers * 100)}
              % of total members
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-sm text-purple-700 mb-1">
              Avg. Points per Member
            </div>
            <div className="text-2xl font-bold text-purple-900">
              {mockProgramMetrics.averagePointsPerMember}
            </div>
            <div className="text-xs text-purple-600 mt-1">
              {mockProgramMetrics.redemptionRate}% redemption rate
            </div>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="text-sm text-amber-700 mb-1">Membership Tiers</div>
            <div className="flex items-center space-x-2">
              {mockProgramMetrics.topTiers.map(tier => <div key={tier.name} className="text-center">
                  <div className="text-xs font-medium">{tier.name}</div>
                  <div className="text-lg font-bold">{tier.percentage}%</div>
                </div>)}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2 flex overflow-hidden">
              {mockProgramMetrics.topTiers.map(tier => <div key={tier.name} className={`h-full ${tier.name === 'Bronze' ? 'bg-amber-500' : tier.name === 'Silver' ? 'bg-gray-400' : 'bg-yellow-500'}`} style={{
              width: `${tier.percentage}%`
            }}></div>)}
            </div>
          </div>
        </div>
      </div>
      {/* Members Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search members by name, email, or tier" className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 flex items-center hover:bg-gray-50">
                <FilterIcon className="w-4 h-4 mr-1.5" />
                Filter
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 flex items-center hover:bg-gray-50">
                <DownloadIcon className="w-4 h-4 mr-1.5" />
                Export
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" checked={selectedMembers.length === sortedMembers.length && sortedMembers.length > 0} onChange={selectAllMembers} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-700">
                {selectedMembers.length} selected
              </span>
            </div>
            {selectedMembers.length > 0 && <div className="flex items-center space-x-2">
                <button onClick={() => {
              setNotificationType('email');
              setShowNotificationModal(true);
            } } className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 flex items-center">
                  <MailIcon className="w-4 h-4 mr-1.5" />
                  Email
                </button>
                <button onClick={() => {
              setNotificationType('sms');
              setShowNotificationModal(true);
            } } className="px-3 py-1.5 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 flex items-center">
                  <MessageSquareIcon className="w-4 h-4 mr-1.5" />
                  SMS
                </button>
                <button onClick={() => {
              setNotificationType('push');
              setShowNotificationModal(true);
            } } className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm font-medium hover:bg-purple-700 flex items-center">
                  <BellIcon className="w-4 h-4 mr-1.5" />
                  Push
                </button>
              </div>}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="sr-only">Select</span>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')} >
                  <div className="flex items-center">
                    Member
                    {sortField === 'name' && (sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('tier')} >
                  <div className="flex items-center">
                    Tier
                    {sortField === 'tier' && (sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('points')} >
                  <div className="flex items-center">
                    Points
                    {sortField === 'points' && (sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('spent')} >
                  <div className="flex items-center">
                    Total Spent
                    {sortField === 'spent' && (sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('lastVisit')} >
                  <div className="flex items-center">
                    Last Visit
                    {sortField === 'lastVisit' && (sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('checkIns')} >
                  <div className="flex items-center">
                    Activity
                    {sortField === 'checkIns' && (sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedMembers.map(member => <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" checked={selectedMembers.includes(member.id)} onChange={() => toggleSelectMember(member.id)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={member.avatar} alt={member.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTierColor(member.tier)} `}>
                      {member.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.points.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${member.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(member.lastVisit)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <CheckSquareIcon className="w-3 h-3 mr-1 text-blue-500" />
                        {member.checkIns}
                      </div>
                      <div className="flex items-center">
                        <PercentIcon className="w-3 h-3 mr-1 text-green-500" />
                        {member.couponsUsed}
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="w-3 h-3 mr-1 text-purple-500" />
                        {member.achievements}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => {
                    setSelectedMembers([member.id]);
                    setNotificationType('email');
                    setShowNotificationModal(true);
                  } } className="text-blue-600 hover:text-blue-900">
                        <MailIcon className="w-4 h-4" />
                      </button>
                      <Link to={`/profile/${member.id} `} className="text-gray-600 hover:text-gray-900">
                        <UsersIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        {sortedMembers.length === 0 && <div className="text-center py-12">
            <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No members found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>}
        <div className="px-6 py-4 bg-gray-50 border-t text-sm text-gray-700">
          Showing {sortedMembers.length} of {mockLoyaltyMembers.length} members
        </div>
      </div>
      {/* Notification Modal */} {showNotificationModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Send{' '} {notificationType === 'email' ? 'Email' : notificationType === 'sms' ? 'SMS' : 'Push Notification'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    To {selectedMembers.length} selected{' '} {selectedMembers.length === 1 ? 'member' : 'members'}
                  </p>
                </div>
                <button onClick={() => setShowNotificationModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              {showSuccessMessage ? <div className="text-center py-6">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900">
                    Notification sent successfully!
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Your{' '} {notificationType === 'email' ? 'email' : notificationType === 'sms' ? 'SMS' : 'push notification'} {' '}
                    has been sent to {selectedMembers.length} {' '} {selectedMembers.length === 1 ? 'member' : 'members'}.
                  </p>
                </div> : <div>
                  <div className="space-y-4 mb-6">
                    {notificationType === 'email' && <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <input type="text" id="subject" value={notificationSubject} onChange={e => setNotificationSubject(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter email subject" />
                      </div>}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea id="message" value={notificationMessage} onChange={e => setNotificationMessage(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder={`Enter your ${notificationType === 'email' ? 'email' : notificationType === 'sms' ? 'SMS' : 'push notification'} message`}></textarea>
                    </div>
                    {/* Template Buttons */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quick Templates
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => {
                    setNotificationSubject('Special Offer Just for You!');
                    setNotificationMessage("We appreciate your loyalty! Here's a special discount just for our valued members.");
                  } } className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm hover:bg-blue-100">
                          Special Offer
                        </button>
                        <button onClick={() => {
                    setNotificationSubject('New Rewards Available');
                    setNotificationMessage("Check out the new rewards we've added to our loyalty program!");
                  } } className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-md text-sm hover:bg-purple-100">
                          New Rewards
                        </button>
                        <button onClick={() => {
                    setNotificationSubject('Your Points Update');
                    setNotificationMessage('Just a reminder that you have points waiting to be redeemed!');
                  } } className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-md text-sm hover:bg-amber-100">
                          Points Reminder
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button onClick={() => setShowNotificationModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                      Cancel
                    </button>
                    <button onClick={handleSendNotification} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center" disabled={!notificationMessage || notificationType === 'email' && !notificationSubject}>
                      <SendIcon className="w-4 h-4 mr-1.5" />
                      Send{' '} {notificationType === 'email' ? 'Email' : notificationType === 'sms' ? 'SMS' : 'Notification'}
                    </button>
                  </div>
                </div>}
            </div>
          </div>
        </div>}
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
