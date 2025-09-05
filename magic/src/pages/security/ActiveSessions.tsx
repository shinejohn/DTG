import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { SmartphoneIcon, LaptopIcon, TabletIcon, MonitorIcon, LogOutIcon, CheckCircleIcon, AlertCircleIcon, MapPinIcon, ClockIcon, ArrowLeftIcon } from 'lucide-react';
interface Session {
  id: string;
  device: {
    type: 'mobile' | 'desktop' | 'tablet' | 'other';
    name: string;
    browser: string;
    os: string;
  };
  location: {
    city: string;
    country: string;
    ip: string;
  };
  lastActive: string;
  isCurrentSession: boolean;
}
export function ActiveSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Fetch active sessions
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use mock data
    setLoading(true);
    setTimeout(() => {
      setSessions([{
        id: 's1',
        device: {
          type: 'desktop',
          name: 'MacBook Pro',
          browser: 'Chrome 91.0.4472.124',
          os: 'macOS 11.4'
        },
        location: {
          city: 'San Francisco',
          country: 'United States',
          ip: '192.168.1.1'
        },
        lastActive: new Date().toISOString(),
        isCurrentSession: true
      }, {
        id: 's2',
        device: {
          type: 'mobile',
          name: 'iPhone 12',
          browser: 'Safari 14.1.1',
          os: 'iOS 14.6'
        },
        location: {
          city: 'San Francisco',
          country: 'United States',
          ip: '192.168.1.2'
        },
        lastActive: new Date(Date.now() - 3600000).toISOString(),
        isCurrentSession: false
      }, {
        id: 's3',
        device: {
          type: 'tablet',
          name: 'iPad Pro',
          browser: 'Safari 14.1',
          os: 'iPadOS 14.6'
        },
        location: {
          city: 'Los Angeles',
          country: 'United States',
          ip: '192.168.1.3'
        },
        lastActive: new Date(Date.now() - 86400000).toISOString(),
        isCurrentSession: false
      }]);
      setLoading(false);
    }, 800);
  }, []);
  const terminateSession = (sessionId: string) => {
    // In a real app, this would send a request to the API
    // For now, we'll just update the local state
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  const terminateAllOtherSessions = () => {
    // In a real app, this would send a request to the API
    // For now, we'll just update the local state
    setSessions(prev => prev.filter(session => session.isCurrentSession));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <SmartphoneIcon className="w-6 h-6 text-blue-500" />;
      case 'desktop':
        return <LaptopIcon className="w-6 h-6 text-green-500" />;
      case 'tablet':
        return <TabletIcon className="w-6 h-6 text-purple-500" />;
      default:
        return <MonitorIcon className="w-6 h-6 text-gray-500" />;
    }
  };
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading active sessions...</p>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link to="/settings#security" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back to Security Settings
              </Link>
              <h1 className="text-2xl font-bold mt-2">Active Sessions</h1>
              <p className="text-gray-600">
                Manage devices where you're currently logged in
              </p>
            </div>
            {/* Success message */}
            {success && <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                <span>Session terminated successfully</span>
              </div>}
            {/* Error message */}
            {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                <AlertCircleIcon className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="font-semibold">Your Active Sessions</h2>
                </div>
                <button onClick={terminateAllOtherSessions} className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center" disabled={sessions.length <= 1}>
                  <LogOutIcon className="w-4 h-4 mr-1" />
                  Sign out all other devices
                </button>
              </div>
              <div className="divide-y">
                {sessions.length === 0 ? <div className="p-6 text-center">
                    <div className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No active sessions
                    </h3>
                    <p className="text-gray-500">
                      You are not currently logged in on any devices
                    </p>
                  </div> : sessions.map(session => <div key={session.id} className="p-4">
                      <div className="flex items-start">
                        <div className="mr-3">
                          {getDeviceIcon(session.device.type)}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center mb-1">
                            <h3 className="font-medium text-gray-900 mr-2">
                              {session.device.name}
                            </h3>
                            {session.isCurrentSession && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                Current Session
                              </span>}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {session.device.browser} on {session.device.os}
                          </div>
                          <div className="flex flex-wrap text-xs text-gray-500 gap-3 mb-2">
                            <div className="flex items-center">
                              <MapPinIcon className="w-3.5 h-3.5 mr-1" />
                              {session.location.city},{' '}
                              {session.location.country}
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="w-3.5 h-3.5 mr-1" />
                              Last active: {formatDate(session.lastActive)}
                            </div>
                          </div>
                        </div>
                        {!session.isCurrentSession && <button onClick={() => terminateSession(session.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">
                            Sign out
                          </button>}
                      </div>
                    </div>)}
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircleIcon className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800 mb-1">
                    Security Tip
                  </h3>
                  <p className="text-sm text-blue-700">
                    If you notice any suspicious activity, sign out of all
                    devices immediately and change your password.
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