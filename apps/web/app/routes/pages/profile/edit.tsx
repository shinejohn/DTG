import React, { useEffect, useState } from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '../../../components/dtg/Header';
import { Footer } from '../../../components/dtg/Footer';
import { UserIcon, MapPinIcon, AtSignIcon, ImageIcon, SaveIcon, XIcon, AlertCircleIcon, CheckIcon, HomeIcon, BuildingIcon, MapIcon, PhoneIcon } from 'lucide-react';
interface UserProfileData {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  location: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  memberSince: string;
  isVerified: boolean;
}
export default function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<UserProfileData>({
    id: 'u1',
    username: 'sarahjohnson',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    coverPhoto: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    bio: 'Food enthusiast and coffee addict. Always on the lookout for the best local spots!',
    location: 'Downtown, CA',
    streetAddress: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    phone: '(555) 123-4567',
    memberSince: '2021-03-15',
    isVerified: true
  });
  // Fetch user profile data
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    // Simulate API call to save profile data
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      // In a real app, you would make an API call here
      console.log('Profile data saved:', profileData);
    }, 1000);
  };
  const handleCancel = () => {
    navigate(`/profile/${profileData.username}`);
  };
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Loading profile data...</p>
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
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h1 className="text-2xl font-bold">Edit Profile</h1>
                <p className="text-gray-600 mt-1">
                  Update your personal information and profile settings
                </p>
              </div>
              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
                {/* Success message */} {success && <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
                    <CheckIcon className="w-5 h-5 mr-2" />
                    <span>Profile updated successfully!</span>
                  </div>} {/* Error message */} {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                    <AlertCircleIcon className="w-5 h-5 mr-2" />
                    <span>{error}</span>
                  </div>}
                <div className="space-y-6">
                  {/* Profile Pictures Section */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold border-b pb-2">
                      Profile Pictures
                    </h2>
                    {/* Avatar */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-1/3">
                        <label className="block text-sm font-medium text-gray-700">
                          Profile Photo
                        </label>
                      </div>
                      <div className="md:w-2/3 flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden">
                          <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <button type="button" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
                            <ImageIcon className="w-4 h-4 mr-1.5" />
                            Change Photo
                          </button>
                          <p className="text-xs text-gray-500 mt-1">
                            JPG, PNG or GIF. 5MB max.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Cover Photo */}
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="md:w-1/3">
                        <label className="block text-sm font-medium text-gray-700">
                          Cover Photo
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <div className="h-32 rounded-md overflow-hidden mb-2">
                          <img src={profileData.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                        </div>
                        <button type="button" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
                          <ImageIcon className="w-4 h-4 mr-1.5" />
                          Change Cover Photo
                        </button>
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended size: 1280 x 400 pixels
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Personal Information Section */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold border-b pb-2">
                      Personal Information
                    </h2>
                    {/* Name */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-1/3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input type="text" name="name" id="name" value={profileData.name} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your full name" />
                        </div>
                      </div>
                    </div>
                    {/* Username */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-1/3">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          Username
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <AtSignIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input type="text" name="username" id="username" value={profileData.username} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your username" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          This will be used in your profile URL:
                          yoursite.com/profile/{profileData.username}
                        </p>
                      </div>
                    </div>
                    {/* Bio */}
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="md:w-1/3">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                          Bio
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <textarea name="bio" id="bio" rows={4} value={profileData.bio} onChange={handleInputChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Tell us about yourself..." />
                        <p className="text-xs text-gray-500 mt-1">
                          Brief description for your profile. Maximum 160
                          characters.
                        </p>
                      </div>
                    </div>
                    {/* Location */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-1/3">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                          Location
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPinIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input type="text" name="location" id="location" value={profileData.location} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your location" />
                        </div>
                      </div>
                    </div>
                    {/* Street Address */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-1/3">
                        <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                          Street Address
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HomeIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input type="text" name="streetAddress" id="streetAddress" value={profileData.streetAddress} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your street address" />
                        </div>
                      </div>
                    </div>
                    {/* City */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-1/3">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BuildingIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input type="text" name="city" id="city" value={profileData.city} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your city" />
                        </div>
                      </div>
                    </div>
                    {/* State */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-1/3">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                          State
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input type="text" name="state" id="state" value={profileData.state} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your state" />
                        </div>
                      </div>
                    </div>
                    {/* Zip Code */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-1/3">
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                          Zip Code
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HomeIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input type="text" name="zipCode" id="zipCode" value={profileData.zipCode} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your zip code" />
                        </div>
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-1/3">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <PhoneIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input type="tel" name="phone" id="phone" value={profileData.phone} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your phone number" />
                        </div>
                      </div>
                    </div>
                    {/* Email */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-1/3">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input type="email" name="email" id="email" value={profileData.email} onChange={handleInputChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your email address" />
                        <p className="text-xs text-gray-500 mt-1">
                          Your email is not shown publicly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Form Actions */}
                <div className="mt-8 pt-5 border-t flex justify-end space-x-3">
                  <button type="button" onClick={handleCancel} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-sm">
                    <XIcon className="w-4 h-4 inline-block mr-1.5" />
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm flex items-center ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {saving ? <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                      </> : <>
                        <SaveIcon className="w-4 h-4 mr-1.5" />
                        Save Changes
                      </>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}
