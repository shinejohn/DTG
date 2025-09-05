import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { json, useLoaderData } from 'react-router';
import type { Route } from './+types/route';
import React, { useState, Component } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { AdminSidebar } from '../../components/admin/Sidebar';
import { ListIcon, BuildingIcon, ImageIcon, FlagIcon, HistoryIcon } from 'lucide-react';
export function ContentModerationPage() {
  const [activeQueue, setActiveQueue] = useState<'reviews' | 'businesses' | 'photos' | 'reports' | 'history'>('reviews');
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow flex">
        <AdminSidebar />
        <main className="flex-grow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Content Moderation</h1>
            <p className="text-gray-600">
              Review and moderate user-generated content
            </p>
          </div>
          {/* Queue Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b">
              <div className="flex overflow-x-auto">
                <button onClick={() => setActiveQueue('reviews')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeQueue === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <ListIcon className="w-5 h-5 inline-block mr-1" />
                  Review Queue
                </button>
                <button onClick={() => setActiveQueue('businesses')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeQueue === 'businesses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <BuildingIcon className="w-5 h-5 inline-block mr-1" />
                  Business Verification
                </button>
                <button onClick={() => setActiveQueue('photos')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeQueue === 'photos' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <ImageIcon className="w-5 h-5 inline-block mr-1" />
                  Photo Moderation
                </button>
                <button onClick={() => setActiveQueue('reports')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeQueue === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <FlagIcon className="w-5 h-5 inline-block mr-1" />
                  Report Management
                </button>
                <button onClick={() => setActiveQueue('history')} className={`px-6 py-3 font-medium whitespace-nowrap ${activeQueue === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  <HistoryIcon className="w-5 h-5 inline-block mr-1" />
                  Moderation History
                </button>
              </div>
            </div>
            {/* Queue Content */}
            <div className="p-4">
              {activeQueue === 'reviews' && <ReviewQueue />}
              {activeQueue === 'businesses' && <BusinessVerificationQueue />}
              {activeQueue === 'photos' && <PhotoModerationQueue />}
              {activeQueue === 'reports' && <ReportManagementQueue />}
              {activeQueue === 'history' && <ModerationHistory />}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>;
}
// Queue Components
function ReviewQueue() {
  // Removed useState - using loaderData instead
  const handleApprove = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
  };
  const handleReject = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
  };
  return <div>
      <h2 className="text-lg font-semibold mb-4">Flagged Review Queue</h2>
      <p className="text-sm text-gray-600 mb-4">
        Reviews that have been flagged for potential policy violations
      </p>
      {reviews.length === 0 ? <div className="text-center py-8">
          <ListIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Queue is empty</h3>
          <p className="text-gray-600">No reviews waiting for moderation</p>
        </div> : <div className="space-y-4">
          {reviews.map(review => <div key={review.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{review.user}</span>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-sm text-gray-700">
                  Business: <strong>{review.business}</strong>
                </span>
              </div>
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>)}
                </div>
              </div>
              <p className="text-gray-800 mb-3">{review.content}</p>
              <div className="bg-red-50 text-red-700 text-sm p-2 rounded-md mb-4">
                <strong>Flagged:</strong> {review.flaggedReason}
              </div>
              <div className="flex justify-end space-x-2">
                <button onClick={() => handleReject(review.id)} className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700">
                  Remove Review
                </button>
                <button onClick={() => handleApprove(review.id)} className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">
                  Approve Review
                </button>
              </div>
            </div>)}
        </div>}
    </div>;
}
function BusinessVerificationQueue() {
  // Removed useState - using loaderData instead
 123-4567',
    email: 'contact@harmonywellness.com',
    website: 'www.harmonywellness.com',
    submittedDate: '2023-07-14T10:30:00Z',
    documents: ['business_license.pdf', 'tax_id.pdf']
  }, {
    id: 'b2',
    name: 'Tech Wizards Repair',
    owner: 'David Kim',
    category: 'Technology',
    address: '456 Oak Ave, Downtown',
    phone: '(555) 987-6543',
    email: 'info@techwizards.com',
    website: 'www.techwizards.com',
    submittedDate: '2023-07-13T15:45:00Z',
    documents: ['business_license.pdf']
  }, {
    id: 'b3',
    name: 'Green Thumb Garden Center',
    owner: 'Maria Rodriguez',
    category: 'Home & Garden',
    address: '789 Pine St, Downtown',
    phone: '(555) 456-7890',
    email: 'hello@greenthumb.com',
    website: 'www.greenthumb.com',
    submittedDate: '2023-07-12T09:15:00Z',
    documents: ['business_license.pdf', 'tax_id.pdf', 'insurance.pdf']
  }]);
  const handleApprove = (id: string) => {
    setBusinesses(businesses.filter(business => business.id !== id));
  };
  const handleReject = (id: string) => {
    setBusinesses(businesses.filter(business => business.id !== id));
  };
  return <div>
      <h2 className="text-lg font-semibold mb-4">
        Business Verification Queue
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        New businesses waiting for verification and approval
      </p>
      {businesses.length === 0 ? <div className="text-center py-8">
          <BuildingIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Queue is empty</h3>
          <p className="text-gray-600">
            No businesses waiting for verification
          </p>
        </div> : <div className="space-y-4">
          {businesses.map(business => <div key={business.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">{business.name}</h3>
                <span className="text-sm text-gray-500">
                  Submitted:{' '}
                  {new Date(business.submittedDate).toLocaleDateString()}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm">
                    <strong>Owner:</strong> {business.owner}
                  </p>
                  <p className="text-sm">
                    <strong>Category:</strong> {business.category}
                  </p>
                  <p className="text-sm">
                    <strong>Address:</strong> {business.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    <strong>Phone:</strong> {business.phone}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> {business.email}
                  </p>
                  <p className="text-sm">
                    <strong>Website:</strong> {business.website}
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">
                  Verification Documents:
                </p>
                <div className="flex flex-wrap gap-2">
                  {business.documents.map((doc, index) => <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center">
                      {doc}
                    </div>)}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button onClick={() => handleReject(business.id)} className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700">
                  Reject
                </button>
                <button onClick={() => handleApprove(business.id)} className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">
                  Verify & Approve
                </button>
              </div>
            </div>)}
        </div>}
    </div>;
}
function PhotoModerationQueue() {
  // Removed useState - using loaderData instead
'
  }, {
    id: 'p3',
    user: 'Chris Taylor',
    business: 'Riverside Bookstore',
    uploadDate: '2023-07-13T09:15:00Z',
    imageUrl: '/images/placeholder.jpg',
    flaggedReason: 'Automatic flag - quality concerns'
  }]);
  const handleApprove = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };
  const handleReject = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };
  return <div>
      <h2 className="text-lg font-semibold mb-4">Photo Moderation Queue</h2>
      <p className="text-sm text-gray-600 mb-4">
        User-uploaded photos flagged for review
      </p>
      {photos.length === 0 ? <div className="text-center py-8">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Queue is empty</h3>
          <p className="text-gray-600">No photos waiting for moderation</p>
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map(photo => <div key={photo.id} className="border rounded-lg overflow-hidden bg-white">
              <img src={photo.imageUrl} alt="User uploaded content" className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{photo.user}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(photo.uploadDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Business: <strong>{photo.business}</strong>
                </p>
                <div className="bg-red-50 text-red-700 text-sm p-2 rounded-md mb-4">
                  <strong>Flagged:</strong> {photo.flaggedReason}
                </div>
                <div className="flex justify-between">
                  <button onClick={() => handleReject(photo.id)} className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700">
                    Remove
                  </button>
                  <button onClick={() => handleApprove(photo.id)} className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
                    Approve
                  </button>
                </div>
              </div>
            </div>)}
        </div>}
    </div>;
}
function ReportManagementQueue() {
  // Removed useState - using loaderData instead
  const handleResolve = (id: string) => {
    setReports(reports.filter(report => report.id !== id));
  };
  const handleEscalate = (id: string) => {
    setReports(reports.map(report => report.id === id ? {
      ...report,
      status: 'escalated'
    } : report));
  };
  return <div>
      <h2 className="text-lg font-semibold mb-4">Report Management Queue</h2>
      <p className="text-sm text-gray-600 mb-4">
        User-reported content and issues
      </p>
      {reports.length === 0 ? <div className="text-center py-8">
          <FlagIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Queue is empty</h3>
          <p className="text-gray-600">No reports waiting for review</p>
        </div> : <div className="space-y-4">
          {reports.map(report => <div key={report.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between mb-2">
                <div>
                  <span className="text-sm font-medium">
                    Reported by: {report.reporter}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(report.date).toLocaleDateString()}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-sm text-gray-700">
                  Against: <strong>{report.reportedUser}</strong>
                </span>
              </div>
              <div className="mb-2">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${report.type === 'comment' ? 'bg-blue-100 text-blue-800' : report.type === 'business' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                </span>
                <span className={`ml-2 inline-block px-2 py-1 text-xs font-medium rounded-full ${report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : report.status === 'escalated' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-800 mb-4 p-3 bg-gray-50 rounded-md">
                {report.content}
              </p>
              <div className="flex justify-end space-x-2">
                <button onClick={() => handleEscalate(report.id)} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                  Escalate
                </button>
                <button onClick={() => handleResolve(report.id)} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                  Resolve
                </button>
              </div>
            </div>)}
        </div>}
    </div>;
}
function ModerationHistory() {
  // Removed useState - using loaderData instead
  return <div>
      <h2 className="text-lg font-semibold mb-4">Moderation History</h2>
      <p className="text-sm text-gray-600 mb-4">
        Record of past moderation decisions and appeals
      </p>
      {history.length === 0 ? <div className="text-center py-8">
          <HistoryIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No history found</h3>
          <p className="text-gray-600">
            No moderation actions have been taken yet
          </p>
        </div> : <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Moderator
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Appeal Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {history.map(item => <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.contentType === 'review' ? 'bg-blue-100 text-blue-800' : item.contentType === 'business' ? 'bg-purple-100 text-purple-800' : item.contentType === 'photo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item.contentType.charAt(0).toUpperCase() + item.contentType.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.action === 'removed' ? 'bg-red-100 text-red-800' : item.action === 'approved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {item.action.charAt(0).toUpperCase() + item.action.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.moderator}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.appealed ? <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.appealStatus === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        Appeal {item.appealStatus}
                      </span> : <span className="text-sm text-gray-500">No appeal</span>}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>}
    </div>;
}

// React Router 7 loader function
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {
    // Get generic data - customize based on page needs
    const { data: items, error } = await supabase
      .from('businesses') // Change table as needed
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching data:', error);
    }

    const transformedData = {
      // Transform data to match component interface
      items: businesses || events || items || []
    };

    return json(transformedData, { headers });
  } catch (error) {
    console.error('Loader error:', error);
    // Return empty data on error
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