import React, { useState } from 'react';
import { MessageSquareIcon, ImageIcon, FlagIcon, AlertCircleIcon, CheckCircleIcon, XCircleIcon, SearchIcon, FilterIcon, ChevronDownIcon, CheckIcon, UserIcon, BuildingIcon, EyeIcon, XIcon } from 'lucide-react';

interface ModerationItem {
  id: string;
  type: 'review' | 'photo' | 'comment' | 'business' | 'report';
  content: string;
  user: string;
  userAvatar?: string;
  business?: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  flagReason?: string;
  image?: string;
}
export default function ContentModeration() {
  const [items, setItems] = useState<ModerationItem[]>([{
    id: 'm1',
    type: 'review',
    content: 'This place is absolutely terrible! The staff was rude and the food was inedible. AVOID AT ALL COSTS!!!',
    user: 'Sarah Johnson',
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    business: 'Urban Bites Café',
    date: '2023-07-15T10:30:00Z',
    status: 'pending',
    flagReason: 'Potentially abusive language'
  }, {
    id: 'm2',
    type: 'photo',
    content: 'Photo of Downtown Fitness',
    user: 'Mike Peterson',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    business: 'Downtown Fitness',
    date: '2023-07-14T15:45:00Z',
    status: 'pending',
    flagReason: 'Potentially inappropriate content',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  }, {
    id: 'm3',
    type: 'comment',
    content: "You clearly don't know what you're talking about. This review is garbage and so are you.",
    user: 'Alex Wong',
    userAvatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    business: 'Riverside Bookstore',
    date: '2023-07-13T09:15:00Z',
    status: 'pending',
    flagReason: 'Harassment'
  }, {
    id: 'm4',
    type: 'business',
    content: 'New business verification: Harmony Wellness Spa',
    user: 'Lisa Chen',
    userAvatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    business: 'Harmony Wellness Spa',
    date: '2023-07-12T11:20:00Z',
    status: 'pending'
  }, {
    id: 'm5',
    type: 'report',
    content: 'User reported: Fake reviews and spam content',
    user: 'David Kim',
    userAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    business: 'Tech Wizards Repair',
    date: '2023-07-11T14:30:00Z',
    status: 'pending',
    flagReason: 'Fake content'
  }]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>('pending');
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(null);
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
  // Filter items based on search term and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = searchTerm === '' || item.content.toLowerCase().includes(searchTerm.toLowerCase()) || item.user.toLowerCase().includes(searchTerm.toLowerCase()) || item.business && item.business.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === null || item.type === typeFilter;
    const matchesStatus = statusFilter === null || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });
  const handleApprove = (id: string) => {
    setItems(items.map(item => item.id === id ? {
      ...item,
      status: 'approved'
    } : item));
  };
  const handleReject = (id: string) => {
    setItems(items.map(item => item.id === id ? {
      ...item,
      status: 'rejected'
    } : item));
  };
  const handleViewDetails = (item: ModerationItem) => {
    setSelectedItem(item);
    setIsItemDetailsOpen(true);
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'review':
        return <MessageSquareIcon className="w-5 h-5 text-blue-500" />;
      case 'photo':
        return <ImageIcon className="w-5 h-5 text-green-500" />;
      case 'comment':
        return <MessageSquareIcon className="w-5 h-5 text-purple-500" />;
      case 'business':
        return <BuildingIcon className="w-5 h-5 text-yellow-500" />;
      case 'report':
        return <FlagIcon className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircleIcon className="w-5 h-5 text-gray-500" />;
    }
  };
  return <div>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="relative w-full md:w-64">
            <input type="text" placeholder="Search content..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full" />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <button className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium flex items-center">
                <FilterIcon className="w-4 h-4 mr-1" />
                Content Type
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setTypeFilter(null)}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {typeFilter === null && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">All Types</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setTypeFilter('review')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {typeFilter === 'review' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Reviews</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setTypeFilter('photo')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {typeFilter === 'photo' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Photos</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setTypeFilter('comment')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {typeFilter === 'comment' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Comments</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setTypeFilter('business')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {typeFilter === 'business' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Businesses</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setTypeFilter('report')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {typeFilter === 'report' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Reports</span>
                </div>
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
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setStatusFilter('pending')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {statusFilter === 'pending' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Pending</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setStatusFilter('approved')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {statusFilter === 'approved' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Approved</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setStatusFilter('rejected')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {statusFilter === 'rejected' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Rejected</span>
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
                  Content
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.length === 0 ? <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="text-center">
                      <CheckCircleIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No items to moderate
                      </h3>
                      <p className="text-gray-600">
                        {searchTerm || typeFilter || statusFilter !== 'pending' ? 'Try adjusting your filters' : 'The moderation queue is empty'}
                      </p>
                    </div>
                  </td>
                </tr> : filteredItems.map(item => <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className="ml-2">
                          <div className="text-sm text-gray-900 line-clamp-2">
                            {item.type === 'photo' ? <div className="flex items-center">
                                <div className="w-10 h-10 rounded overflow-hidden mr-2">
                                  {item.image && <img src={item.image} alt="Content" className="w-full h-full object-cover" />}
                                </div>
                                <span>{item.content}</span>
                              </div> : item.content}
                          </div>
                          {item.business && <div className="text-xs text-gray-500 mt-1">
                              Business: {item.business}
                            </div>}
                          {item.flagReason && <div className="text-xs text-red-600 mt-1 flex items-center">
                              <FlagIcon className="w-3 h-3 mr-1" />
                              {item.flagReason}
                            </div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTypeIcon(item.type)}
                        <span className="ml-2 text-sm font-medium capitalize">
                          {item.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          {item.userAvatar ? <img className="h-8 w-8 rounded-full" src={item.userAvatar} alt={item.user} /> : <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <UserIcon className="h-4 w-4 text-gray-500" />
                            </div>}
                        </div>
                        <div className="ml-2 text-sm font-medium text-gray-900">
                          {item.user}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'approved' ? 'bg-green-100 text-green-800' : item.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => handleViewDetails(item)} className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="w-5 h-5" />
                        </button>
                        {item.status === 'pending' && <>
                            <button onClick={() => handleReject(item.id)} className="text-red-600 hover:text-red-900">
                              <XCircleIcon className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleApprove(item.id)} className="text-green-600 hover:text-green-900">
                              <CheckCircleIcon className="w-5 h-5" />
                            </button>
                          </>}
                      </div>
                    </td>
                  </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircleIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">Moderation Guidelines</h4>
            <p className="text-sm text-blue-700 mt-1">
              All content should be reviewed according to our community
              guidelines. For more detailed moderation policies, please refer to
              the
              <Link to="/admin/moderation-guidelines" className="underline ml-1">
                moderation handbook
              </Link>
              .
            </p>
            <div className="mt-2">
              <Link to="/admin/moderation" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View full moderation queue
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Item Details Modal */}
      {isItemDetailsOpen && selectedItem && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Content Details</h3>
              <button onClick={() => setIsItemDetailsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-gray-100 rounded-lg mr-3">
                {getTypeIcon(selectedItem.type)}
              </div>
              <div>
                <h4 className="font-medium capitalize">{selectedItem.type}</h4>
                <div className="text-sm text-gray-600">
                  {new Date(selectedItem.date).toLocaleDateString()}
                </div>
              </div>
              <div className="ml-auto">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedItem.status === 'approved' ? 'bg-green-100 text-green-800' : selectedItem.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="flex-shrink-0 h-8 w-8 mr-2">
                  {selectedItem.userAvatar ? <img className="h-8 w-8 rounded-full" src={selectedItem.userAvatar} alt={selectedItem.user} /> : <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-gray-500" />
                    </div>}
                </div>
                <div>
                  <div className="text-sm font-medium">{selectedItem.user}</div>
                  {selectedItem.business && <div className="text-xs text-gray-600">
                      Business: {selectedItem.business}
                    </div>}
                </div>
              </div>
              {selectedItem.flagReason && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-md mb-4">
                  <div className="font-medium">Flagged Reason:</div>
                  <div>{selectedItem.flagReason}</div>
                </div>}
              {selectedItem.type === 'photo' && selectedItem.image ? <div className="mb-4">
                  <div className="font-medium mb-2">Image:</div>
                  <img src={selectedItem.image} alt="Content" className="w-full max-h-80 object-contain rounded-md border" />
                </div> : <div className="mb-4">
                  <div className="font-medium mb-2">Content:</div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    {selectedItem.content}
                  </div>
                </div>}
            </div>
            <div className="flex justify-between">
              {selectedItem.status === 'pending' ? <div className="space-x-2">
                  <button onClick={() => {
              handleReject(selectedItem.id);
              setIsItemDetailsOpen(false);
            }} className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700">
                    Reject Content
                  </button>
                  <button onClick={() => {
              handleApprove(selectedItem.id);
              setIsItemDetailsOpen(false);
            }} className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">
                    Approve Content
                  </button>
                </div> : <div>
                  {selectedItem.status === 'approved' ? <div className="text-green-600 flex items-center">
                      <CheckCircleIcon className="w-5 h-5 mr-1" />
                      Content has been approved
                    </div> : <div className="text-red-600 flex items-center">
                      <XCircleIcon className="w-5 h-5 mr-1" />
                      Content has been rejected
                    </div>}
                </div>}
              <button onClick={() => setIsItemDetailsOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                Close
              </button>
            </div>
          </div>
        </div>}
    </div>;
}
