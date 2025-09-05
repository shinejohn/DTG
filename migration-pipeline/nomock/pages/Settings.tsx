import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BellIcon, LockIcon, GlobeIcon, CreditCardIcon, UserIcon, TrashIcon, ShieldIcon, ToggleLeftIcon, ToggleRightIcon, ChevronRightIcon, LogOutIcon, AlertCircleIcon, CheckIcon } from 'lucide-react';
interface SettingsSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  id: string;
}
const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  icon,
  children,
  id
}) => {
  return <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6" id={id}>
      <div className="p-4 border-b flex items-center">
        <div className="mr-3">{icon}</div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </div>;
};
interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
  label: string;
  description?: string;
}
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  enabled,
  onChange,
  label,
  description
}) => {
  return <div className="flex items-center justify-between py-3">
      <div>
        <h3 className="text-sm font-medium text-gray-900">{label}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button type="button" className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} onClick={onChange}>
        <span className="sr-only">Enable {label}</span>
        <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
      </button>
    </div>;
};
export function Settings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newFollowers: true,
    newMessages: true,
    newReviews: false,
    marketingEmails: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showActivity: true,
    showReviews: true,
    showLocation: false
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('notifications');
  const location = useLocation();
  // Handle hash changes in URL
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && ['notifications', 'privacy', 'account', 'security', 'billing'].includes(hash)) {
      setActiveTab(hash);
      // Scroll to the section
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  }, [location]);
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // Scroll to the section
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const togglePrivacy = (key: keyof typeof privacy) => {
    if (typeof privacy[key] === 'boolean') {
      setPrivacy(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };
  const handleProfileVisibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrivacy(prev => ({
      ...prev,
      profileVisibility: e.target.value
    }));
  };
  const handleSaveSettings = () => {
    // Simulate API call to save settings
    setSuccess(true);
    // In a real app, you would make an API call here
    console.log('Saved notification settings:', notifications);
    console.log('Saved privacy settings:', privacy);
    // Reset success message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Settings</h1>
              <div className="flex space-x-3">
                <Link to="/profile/sarahjohnson" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-sm">
                  Cancel
                </Link>
                <button onClick={handleSaveSettings} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm">
                  Save Changes
                </button>
              </div>
            </div>
            {/* Success message */}
            {success && <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
                <CheckIcon className="w-5 h-5 mr-2" />
                <span>Settings saved successfully!</span>
              </div>}
            {/* Error message */}
            {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                <AlertCircleIcon className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Sidebar Navigation */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-6">
                  <nav className="space-y-1">
                    <a href="#notifications" onClick={() => handleTabClick('notifications')} className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'notifications' ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}>
                      <BellIcon className="w-5 h-5 mr-3" />
                      Notifications
                    </a>
                    <a href="#privacy" onClick={() => handleTabClick('privacy')} className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'privacy' ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}>
                      <ShieldIcon className="w-5 h-5 mr-3" />
                      Privacy
                    </a>
                    <a href="#account" onClick={() => handleTabClick('account')} className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'account' ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}>
                      <UserIcon className="w-5 h-5 mr-3" />
                      Account
                    </a>
                    <a href="#security" onClick={() => handleTabClick('security')} className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'security' ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}>
                      <LockIcon className="w-5 h-5 mr-3" />
                      Security
                    </a>
                    <a href="#billing" onClick={() => handleTabClick('billing')} className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'billing' ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}>
                      <CreditCardIcon className="w-5 h-5 mr-3" />
                      Billing
                    </a>
                  </nav>
                </div>
              </div>
              {/* Main Content */}
              <div className="md:col-span-3 space-y-6">
                {/* Notifications Section */}
                <SettingsSection title="Notifications" icon={<BellIcon className="w-5 h-5 text-blue-600" />} id="notifications">
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Email Notifications
                      </h3>
                      <ToggleSwitch enabled={notifications.emailNotifications} onChange={() => toggleNotification('emailNotifications')} label="Enable Email Notifications" description="Receive updates and alerts via email" />
                      <ToggleSwitch enabled={notifications.marketingEmails} onChange={() => toggleNotification('marketingEmails')} label="Marketing Emails" description="Receive promotional offers and updates" />
                    </div>
                    <div className="border-b pb-3">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Push Notifications
                      </h3>
                      <ToggleSwitch enabled={notifications.pushNotifications} onChange={() => toggleNotification('pushNotifications')} label="Enable Push Notifications" description="Receive alerts on your device" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Notification Preferences
                      </h3>
                      <ToggleSwitch enabled={notifications.newFollowers} onChange={() => toggleNotification('newFollowers')} label="New Followers" description="When someone follows your profile" />
                      <ToggleSwitch enabled={notifications.newMessages} onChange={() => toggleNotification('newMessages')} label="New Messages" description="When you receive a new message" />
                      <ToggleSwitch enabled={notifications.newReviews} onChange={() => toggleNotification('newReviews')} label="Review Activity" description="When someone interacts with your reviews" />
                    </div>
                  </div>
                </SettingsSection>
                {/* Privacy Section */}
                <SettingsSection title="Privacy" icon={<ShieldIcon className="w-5 h-5 text-blue-600" />} id="privacy">
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Profile Visibility
                      </h3>
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            Who can see your profile
                          </h3>
                          <p className="text-sm text-gray-500">
                            Control who can view your profile information
                          </p>
                        </div>
                        <select value={privacy.profileVisibility} onChange={handleProfileVisibilityChange} className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                          <option value="public">Public</option>
                          <option value="friends">Friends Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Activity Privacy
                      </h3>
                      <ToggleSwitch enabled={privacy.showActivity} onChange={() => togglePrivacy('showActivity')} label="Show Activity" description="Allow others to see your recent activity" />
                      <ToggleSwitch enabled={privacy.showReviews} onChange={() => togglePrivacy('showReviews')} label="Show Reviews" description="Make your reviews visible to others" />
                      <ToggleSwitch enabled={privacy.showLocation} onChange={() => togglePrivacy('showLocation')} label="Show Location" description="Display your current location" />
                    </div>
                  </div>
                </SettingsSection>
                {/* Account Section */}
                <SettingsSection title="Account" icon={<UserIcon className="w-5 h-5 text-blue-600" />} id="account">
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <Link to="/profile/edit" className="flex items-center justify-between py-2 text-sm hover:bg-gray-50 px-2 rounded">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Edit Profile
                          </h3>
                          <p className="text-gray-500">
                            Update your personal information
                          </p>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                      </Link>
                    </div>
                    <div className="border-b pb-4">
                      <Link to="/account/language" className="flex items-center justify-between py-2 text-sm hover:bg-gray-50 px-2 rounded">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Language
                          </h3>
                          <p className="text-gray-500">
                            Change your preferred language
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">
                            English (US)
                          </span>
                          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </div>
                      </Link>
                    </div>
                    <div>
                      <Link to="/account/deactivate" className="flex items-center justify-between py-2 text-sm hover:bg-gray-50 px-2 rounded text-red-600">
                        <div className="flex items-center">
                          <TrashIcon className="w-5 h-5 mr-2" />
                          <div>
                            <h3 className="font-medium">Deactivate Account</h3>
                            <p className="text-gray-500">
                              Temporarily disable your account
                            </p>
                          </div>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                      </Link>
                    </div>
                  </div>
                </SettingsSection>
                {/* Security Section */}
                <SettingsSection title="Security" icon={<LockIcon className="w-5 h-5 text-blue-600" />} id="security">
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <Link to="/security/password" className="flex items-center justify-between py-2 text-sm hover:bg-gray-50 px-2 rounded">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Change Password
                          </h3>
                          <p className="text-gray-500">
                            Update your password regularly
                          </p>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                      </Link>
                    </div>
                    <div className="border-b pb-4">
                      <Link to="/security/2fa" className="flex items-center justify-between py-2 text-sm hover:bg-gray-50 px-2 rounded">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Two-Factor Authentication
                          </h3>
                          <p className="text-gray-500">
                            Add an extra layer of security
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded-full mr-2">
                            Enabled
                          </span>
                          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </div>
                      </Link>
                    </div>
                    <div>
                      <Link to="/security/sessions" className="flex items-center justify-between py-2 text-sm hover:bg-gray-50 px-2 rounded">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Active Sessions
                          </h3>
                          <p className="text-gray-500">
                            Manage devices where you're logged in
                          </p>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <button className="flex items-center text-red-600 hover:text-red-800 font-medium">
                      <LogOutIcon className="w-4 h-4 mr-2" />
                      Sign out of all devices
                    </button>
                  </div>
                </SettingsSection>
                {/* Billing Section */}
                <SettingsSection title="Billing" icon={<CreditCardIcon className="w-5 h-5 text-blue-600" />} id="billing">
                  <div className="text-center py-6">
                    <div className="bg-gray-50 inline-block p-4 rounded-full mb-3">
                      <CreditCardIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No Payment Methods
                    </h3>
                    <p className="text-gray-500 mb-4">
                      You haven't added any payment methods yet
                    </p>
                    <Link to="/billing/add-payment-method" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm">
                      Add Payment Method
                    </Link>
                  </div>
                </SettingsSection>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}