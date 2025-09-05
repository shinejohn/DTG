import React, { useState } from 'react';
import { BuildingIcon, SearchIcon, FilterIcon, ChevronDownIcon, CheckIcon, XIcon, AlertTriangleIcon, CheckCircleIcon, MapPinIcon, PhoneIcon, MailIcon, GlobeIcon, CalendarIcon, MoreHorizontalIcon, EyeIcon, ShieldIcon, AlertCircleIcon } from 'lucide-react';
interface Business {
  id: string;
  name: string;
  owner: string;
  category: string;
  subcategory?: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  verified: boolean;
  featured: boolean;
  createdDate: string;
  logo?: string;
}
export function BusinessManagement() {
  const [businesses, setBusinesses] = useState<Business[]>([{
    id: 'b1',
    name: 'Urban Bites Café',
    owner: 'Mike Peterson',
    category: 'Restaurants',
    subcategory: 'Café',
    address: '123 Main St, Downtown',
    phone: '(555) 123-4567',
    email: 'contact@urbanbites.com',
    website: 'www.urbanbites.com',
    status: 'active',
    verified: true,
    featured: true,
    createdDate: '2023-02-15T10:30:00Z',
    logo: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FmZSUyMGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60'
  }, {
    id: 'b2',
    name: 'Downtown Fitness',
    owner: 'Sarah Johnson',
    category: 'Health & Fitness',
    subcategory: 'Gym',
    address: '456 Oak Ave, Downtown',
    phone: '(555) 987-6543',
    email: 'info@downtownfitness.com',
    website: 'www.downtownfitness.com',
    status: 'active',
    verified: true,
    featured: false,
    createdDate: '2023-03-20T15:45:00Z',
    logo: 'https://images.unsplash.com/photo-1554344728-77cf90d9ed26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltJTIwbG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=100&q=60'
  }, {
    id: 'b3',
    name: 'Riverside Bookstore',
    owner: 'Alex Wong',
    category: 'Retail',
    subcategory: 'Books',
    address: '789 Pine St, Downtown',
    phone: '(555) 456-7890',
    email: 'hello@riversidebooks.com',
    website: 'www.riversidebooks.com',
    status: 'suspended',
    verified: true,
    featured: false,
    createdDate: '2023-01-10T09:15:00Z',
    logo: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60'
  }, {
    id: 'b4',
    name: 'Harmony Wellness Spa',
    owner: 'Lisa Chen',
    category: 'Health & Wellness',
    subcategory: 'Spa',
    address: '101 Elm St, Downtown',
    phone: '(555) 234-5678',
    email: 'contact@harmonywellness.com',
    website: 'www.harmonywellness.com',
    status: 'pending',
    verified: false,
    featured: false,
    createdDate: '2023-07-05T11:20:00Z',
    logo: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3BhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=100&q=60'
  }, {
    id: 'b5',
    name: 'Tech Wizards Repair',
    owner: 'David Kim',
    category: 'Technology',
    subcategory: 'Repair Services',
    address: '202 Maple Dr, Downtown',
    phone: '(555) 876-5432',
    email: 'support@techwizards.com',
    website: 'www.techwizards.com',
    status: 'pending',
    verified: false,
    featured: false,
    createdDate: '2023-07-10T14:30:00Z',
    logo: 'https://images.unsplash.com/photo-1563770660941-10a2b3654e41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=100&q=60'
  }, {
    id: 'b6',
    name: 'Green Thumb Garden Center',
    owner: 'Maria Rodriguez',
    category: 'Home & Garden',
    subcategory: 'Garden Center',
    address: '303 Cedar Ln, Downtown',
    phone: '(555) 345-6789',
    email: 'hello@greenthumb.com',
    website: 'www.greenthumb.com',
    status: 'rejected',
    verified: false,
    featured: false,
    createdDate: '2023-06-15T09:45:00Z',
    logo: 'https://images.unsplash.com/photo-1599685315640-4edc6b148d7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z2FyZGVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=100&q=60'
  }]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [verificationFilter, setVerificationFilter] = useState<boolean | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isBusinessDetailsOpen, setIsBusinessDetailsOpen] = useState(false);
  // Filter businesses based on search term and filters
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = searchTerm === '' || business.name.toLowerCase().includes(searchTerm.toLowerCase()) || business.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === null || business.category === categoryFilter;
    const matchesStatus = statusFilter === null || business.status === statusFilter;
    const matchesVerification = verificationFilter === null || business.verified === verificationFilter;
    return matchesSearch && matchesCategory && matchesStatus && matchesVerification;
  });
  const handleBusinessAction = (action: string, businessId: string) => {
    if (action === 'suspend') {
      setBusinesses(businesses.map(business => business.id === businessId ? {
        ...business,
        status: 'suspended'
      } : business));
    } else if (action === 'activate') {
      setBusinesses(businesses.map(business => business.id === businessId ? {
        ...business,
        status: 'active'
      } : business));
    } else if (action === 'verify') {
      setBusinesses(businesses.map(business => business.id === businessId ? {
        ...business,
        verified: true
      } : business));
    } else if (action === 'feature') {
      setBusinesses(businesses.map(business => business.id === businessId ? {
        ...business,
        featured: true
      } : business));
    } else if (action === 'unfeature') {
      setBusinesses(businesses.map(business => business.id === businessId ? {
        ...business,
        featured: false
      } : business));
    }
  };
  const handleViewBusinessDetails = (business: Business) => {
    setSelectedBusiness(business);
    setIsBusinessDetailsOpen(true);
  };
  const categories = ['Restaurants', 'Health & Fitness', 'Retail', 'Health & Wellness', 'Technology', 'Home & Garden'];
  return <div>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="relative w-full md:w-64">
            <input type="text" placeholder="Search businesses..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full" />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <button className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium flex items-center">
                <FilterIcon className="w-4 h-4 mr-1" />
                Category
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setCategoryFilter(null)}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {categoryFilter === null && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">All Categories</span>
                </div>
                {categories.map(category => <div key={category} className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setCategoryFilter(category)}>
                    <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                      {categoryFilter === category && <CheckIcon className="w-3 h-3 text-blue-600" />}
                    </div>
                    <span className="text-sm">{category}</span>
                  </div>)}
              </div>
            </div>
            <div className="relative">
              <button className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium flex items-center">
                <FilterIcon className="w-4 h-4 mr-1" />
                Status
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setStatusFilter(null)}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {statusFilter === null && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">All Statuses</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setStatusFilter('active')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {statusFilter === 'active' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Active</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setStatusFilter('pending')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {statusFilter === 'pending' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Pending</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setStatusFilter('suspended')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {statusFilter === 'suspended' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Suspended</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setStatusFilter('rejected')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {statusFilter === 'rejected' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Rejected</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <button className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium flex items-center">
                <FilterIcon className="w-4 h-4 mr-1" />
                Verification
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setVerificationFilter(null)}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {verificationFilter === null && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">All</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setVerificationFilter(true)}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {verificationFilter === true && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Verified</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setVerificationFilter(false)}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {verificationFilter === false && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Unverified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBusinesses.map(business => <tr key={business.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {business.logo ? <img className="h-10 w-10 rounded-full object-cover" src={business.logo} alt={business.name} /> : <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <BuildingIcon className="h-6 w-6 text-gray-500" />
                          </div>}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {business.name}
                          {business.featured && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              Featured
                            </span>}
                        </div>
                        <div className="text-sm text-gray-500">
                          Owner: {business.owner}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {business.category}
                    </div>
                    {business.subcategory && <div className="text-sm text-gray-500">
                        {business.subcategory}
                      </div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${business.status === 'active' ? 'bg-green-100 text-green-800' : business.status === 'pending' ? 'bg-blue-100 text-blue-800' : business.status === 'suspended' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {business.verified ? <span className="inline-flex items-center text-green-600">
                        <CheckCircleIcon className="w-5 h-5 mr-1" />
                        Verified
                      </span> : <span className="inline-flex items-center text-gray-500">
                        <AlertCircleIcon className="w-5 h-5 mr-1" />
                        Unverified
                      </span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(business.createdDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => handleViewBusinessDetails(business)} className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <div className="relative group">
                        <button className="text-gray-500 hover:text-gray-700">
                          <MoreHorizontalIcon className="w-5 h-5" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 hidden group-hover:block">
                          <div className="py-1">
                            {business.status !== 'active' && <button onClick={() => handleBusinessAction('activate', business.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <CheckCircleIcon className="w-4 h-4 inline-block mr-2" />
                                Activate Business
                              </button>}
                            {business.status !== 'suspended' && <button onClick={() => handleBusinessAction('suspend', business.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <AlertTriangleIcon className="w-4 h-4 inline-block mr-2" />
                                Suspend Business
                              </button>}
                            {!business.verified && <button onClick={() => handleBusinessAction('verify', business.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <ShieldIcon className="w-4 h-4 inline-block mr-2" />
                                Verify Business
                              </button>}
                            {!business.featured ? <button onClick={() => handleBusinessAction('feature', business.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <ShieldIcon className="w-4 h-4 inline-block mr-2" />
                                Feature Business
                              </button> : <button onClick={() => handleBusinessAction('unfeature', business.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <ShieldIcon className="w-4 h-4 inline-block mr-2" />
                                Unfeature Business
                              </button>}
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <MailIcon className="w-4 h-4 inline-block mr-2" />
                              Contact Business
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* Business Details Modal */}
      {isBusinessDetailsOpen && selectedBusiness && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Business Details</h3>
              <button onClick={() => setIsBusinessDetailsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center mb-6">
              {selectedBusiness.logo ? <img className="h-16 w-16 rounded-full object-cover mr-4" src={selectedBusiness.logo} alt={selectedBusiness.name} /> : <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <BuildingIcon className="h-8 w-8 text-gray-500" />
                </div>}
              <div>
                <h4 className="text-xl font-medium">{selectedBusiness.name}</h4>
                <div className="text-gray-600">
                  {selectedBusiness.category}{' '}
                  {selectedBusiness.subcategory && `- ${selectedBusiness.subcategory}`}
                </div>
                <div className="flex items-center mt-2">
                  <span className={`px-2 py-1 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedBusiness.status === 'active' ? 'bg-green-100 text-green-800' : selectedBusiness.status === 'pending' ? 'bg-blue-100 text-blue-800' : selectedBusiness.status === 'suspended' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedBusiness.status.charAt(0).toUpperCase() + selectedBusiness.status.slice(1)}
                  </span>
                  {selectedBusiness.verified && <span className="px-2 py-1 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Verified
                    </span>}
                  {selectedBusiness.featured && <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      Featured
                    </span>}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h5 className="font-medium mb-2">Contact Information</h5>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPinIcon className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                    <div>{selectedBusiness.address}</div>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="w-5 h-5 text-gray-500 mr-2" />
                    <div>{selectedBusiness.phone}</div>
                  </div>
                  <div className="flex items-center">
                    <MailIcon className="w-5 h-5 text-gray-500 mr-2" />
                    <div>{selectedBusiness.email}</div>
                  </div>
                  {selectedBusiness.website && <div className="flex items-center">
                      <GlobeIcon className="w-5 h-5 text-gray-500 mr-2" />
                      <div>{selectedBusiness.website}</div>
                    </div>}
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-2">Business Information</h5>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
                    <div>
                      <span className="text-gray-600">Created: </span>
                      {new Date(selectedBusiness.createdDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <UserIcon className="w-5 h-5 text-gray-500 mr-2" />
                    <div>
                      <span className="text-gray-600">Owner: </span>
                      {selectedBusiness.owner}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Business ID: </span>
                    {selectedBusiness.id}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h5 className="font-medium mb-2">Activity Summary</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-2xl font-semibold">24</div>
                  <div className="text-gray-600">Reviews</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-2xl font-semibold">4.2</div>
                  <div className="text-gray-600">Average Rating</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-2xl font-semibold">1,245</div>
                  <div className="text-gray-600">Monthly Views</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="space-x-2">
                {selectedBusiness.status !== 'active' && <button onClick={() => {
              handleBusinessAction('activate', selectedBusiness.id);
              setIsBusinessDetailsOpen(false);
            }} className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">
                    Activate Business
                  </button>}
                {selectedBusiness.status !== 'suspended' && <button onClick={() => {
              handleBusinessAction('suspend', selectedBusiness.id);
              setIsBusinessDetailsOpen(false);
            }} className="px-4 py-2 bg-yellow-600 text-white font-medium rounded-md hover:bg-yellow-700">
                    Suspend Business
                  </button>}
                {!selectedBusiness.verified && <button onClick={() => {
              handleBusinessAction('verify', selectedBusiness.id);
              setIsBusinessDetailsOpen(false);
            }} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                    Verify Business
                  </button>}
              </div>
              <button onClick={() => setIsBusinessDetailsOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                Close
              </button>
            </div>
          </div>
        </div>}
    </div>;
}
