import type { Route } from './+types/route';
import React, { useState } from 'react';
import { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '../../../components/dtg/Header';
import { Footer } from '../../../components/dtg/Footer';
import { AdminSidebar } from '../../../components/dtg/admin/Sidebar';
import { BellIcon, CheckIcon, XIcon, EyeIcon, SettingsIcon, AlertTriangleIcon, UserIcon, BuildingIcon, FlagIcon, ShieldIcon, ServerIcon } from 'lucide-react';
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'system' | 'user' | 'business' | 'security' | 'moderation';
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  date: string;
}
export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([{
    id: 'n1',
    title: 'System Update Required',
    message: 'A new security update is available for the system.',
    type: 'system',
    priority: 'high',
    read: false,
    date: '2023-07-15T10:30:00Z'
  }, {
    id: 'n2',
    title: 'New Business Registration',
    message: 'Urban Bites Café has registered and requires verification.',
    type: 'business',
    priority: 'medium',
    read: false,
    date: '2023-07-14T15:45:00Z'
  }, {
    id: 'n3',
    title: 'Content Report Threshold Reached',
    message: 'A user review has received multiple reports and requires attention.',
    type: 'moderation',
    priority: 'high',
    read: true,
    date: '2023-07-13T09:15:00Z'
  }, {
    id: 'n4',
    title: 'Database Backup Completed',
    message: 'Weekly database backup has been completed successfully.',
    type: 'system',
    priority: 'low',
    read: true,
    date: '2023-07-12T14:20:00Z'
  }, {
    id: 'n5',
    title: 'User Account Issue',
    message: 'Multiple failed login attempts detected for user sarah.j@example.com.',
    type: 'security',
    priority: 'medium',
    read: false,
    date: '2023-07-11T11:30:00Z'
  }, {
    id: 'n6',
    title: 'New User Registration',
    message: 'User David Kim has completed registration and email verification.',
    type: 'user',
    priority: 'low',
    read: true,
    date: '2023-07-10T16:45:00Z'
  }]);
  const [filter, setFilter] = useState<string | null>(null);
  const [showRead, setShowRead] = useState(true);
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === null || notification.type === filter;
    const matchesReadStatus = showRead || !notification.read;
    return matchesFilter && matchesReadStatus;
  });
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => notification.id === id ? {
      ...notification,
      read: true
    } : notification));
  };
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <ServerIcon className="w-5 h-5 text-blue-500" />;
      case 'user':
        return <UserIcon className="w-5 h-5 text-green-500" />;
      case 'business':
        return <BuildingIcon className="w-5 h-5 text-purple-500" />;
      case 'security':
        return <ShieldIcon className="w-5 h-5 text-red-500" />;
      case 'moderation':
        return <FlagIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <BellIcon className="w-5 h-5 text-gray-500" />;
    }
  };
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow flex">
        <AdminSidebar />
        <main className="flex-grow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Admin Notifications</h1>
            <p className="text-gray-600">
              System alerts and notifications for administrators
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                <button onClick={() => setFilter(null)} className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === null ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  All
                </button>
                <button onClick={() => setFilter('system')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === 'system' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <ServerIcon className="w-4 h-4 inline-block mr-1" />
                  System
                </button>
                <button onClick={() => setFilter('security')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === 'security' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <ShieldIcon className="w-4 h-4 inline-block mr-1" />
                  Security
                </button>
                <button onClick={() => setFilter('moderation')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === 'moderation' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <FlagIcon className="w-4 h-4 inline-block mr-1" />
                  Moderation
                </button>
                <button onClick={() => setFilter('user')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === 'user' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <UserIcon className="w-4 h-4 inline-block mr-1" />
                  User
                </button>
                <button onClick={() => setFilter('business')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === 'business' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <BuildingIcon className="w-4 h-4 inline-block mr-1" />
                  Business
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input type="checkbox" id="showRead" checked={showRead} onChange={() => setShowRead(!showRead)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="showRead" className="ml-2 text-sm text-gray-700">
                    Show Read
                  </label>
                </div>
                <button onClick={markAllAsRead} className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  Mark All Read
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  <SettingsIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredNotifications.length === 0 ? <div className="py-8 text-center">
                  <BellIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">
                    No notifications
                  </h3>
                  <p className="text-gray-500 mt-1">
                    {filter ? 'No notifications match your filter' : "You're all caught up!"}
                  </p>
                </div> : filteredNotifications.map(notification => <div key={notification.id} className={`p-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-sm font-medium ${notification.read ? 'text-gray-900' : 'text-blue-900'} `}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {new Date(notification.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {notification.message}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClass(notification.priority)} `}>
                              {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} {' '}
                              Priority
                            </span>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800`} >
                              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            {!notification.read && <button onClick={() => markAsRead(notification.id)} className="p-1 rounded-full text-blue-600 hover:bg-blue-100" title="Mark as read">
                                <CheckIcon className="w-4 h-4" />
                              </button>}
                            <button onClick={() => deleteNotification(notification.id)} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500" title="Delete notification">
                              <XIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>)}
            </div>
          </div>
        </main>
      </div>
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
