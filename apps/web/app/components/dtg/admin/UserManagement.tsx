import React, { useState } from 'react';
import { UserIcon, SearchIcon, FilterIcon, ChevronDownIcon, MoreHorizontalIcon, CheckIcon, XIcon, AlertTriangleIcon, UserCheckIcon, UserXIcon, ShieldIcon, MailIcon, EyeIcon, LockIcon } from 'lucide-react';
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'business' | 'moderator' | 'admin';
  status: 'active' | 'suspended' | 'pending' | 'banned';
  joinDate: string;
  lastActive: string;
  profileImage?: string;
}
export function UserManagement() {
  const [users, setUsers] = useState<User[]>([{
    id: 'u1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'user',
    status: 'active',
    joinDate: '2023-01-15T10:30:00Z',
    lastActive: '2023-07-15T14:30:00Z',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
  }, {
    id: 'u2',
    name: 'Mike Peterson',
    email: 'mike.p@example.com',
    role: 'business',
    status: 'active',
    joinDate: '2023-02-20T15:45:00Z',
    lastActive: '2023-07-14T09:15:00Z',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  }, {
    id: 'u3',
    name: 'Alex Wong',
    email: 'alex.w@example.com',
    role: 'user',
    status: 'suspended',
    joinDate: '2023-03-10T09:15:00Z',
    lastActive: '2023-06-30T16:45:00Z',
    profileImage: 'https://randomuser.me/api/portraits/men/68.jpg'
  }, {
    id: 'u4',
    name: 'Lisa Chen',
    email: 'lisa.c@example.com',
    role: 'business',
    status: 'pending',
    joinDate: '2023-07-05T11:20:00Z',
    lastActive: '2023-07-05T11:20:00Z',
    profileImage: 'https://randomuser.me/api/portraits/women/65.jpg'
  }, {
    id: 'u5',
    name: 'David Kim',
    email: 'david.k@example.com',
    role: 'moderator',
    status: 'active',
    joinDate: '2022-11-15T10:30:00Z',
    lastActive: '2023-07-15T10:30:00Z',
    profileImage: 'https://randomuser.me/api/portraits/men/22.jpg'
  }, {
    id: 'u6',
    name: 'Emily Wilson',
    email: 'emily.w@example.com',
    role: 'user',
    status: 'banned',
    joinDate: '2023-04-20T15:45:00Z',
    lastActive: '2023-06-15T09:15:00Z',
    profileImage: 'https://randomuser.me/api/portraits/women/17.jpg'
  }, {
    id: 'u7',
    name: 'Admin User',
    email: 'admin@downtownguide.com',
    role: 'admin',
    status: 'active',
    joinDate: '2022-01-01T00:00:00Z',
    lastActive: '2023-07-15T16:45:00Z',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
  }]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === null || user.role === roleFilter;
    const matchesStatus = statusFilter === null || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });
  const handleUserAction = (action: string, userId: string) => {
    if (action === 'suspend') {
      setUsers(users.map(user => user.id === userId ? {
        ...user,
        status: 'suspended'
      } : user));
    } else if (action === 'activate') {
      setUsers(users.map(user => user.id === userId ? {
        ...user,
        status: 'active'
      } : user));
    } else if (action === 'ban') {
      setUsers(users.map(user => user.id === userId ? {
        ...user,
        status: 'banned'
      } : user));
    }
  };
  const handleViewUserDetails = (user: User) => {
    setSelectedUser(user);
    setIsUserDetailsOpen(true);
  };
  return <div>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="relative w-full md:w-64">
            <input type="text" placeholder="Search users..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full" />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <button className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium flex items-center">
                <FilterIcon className="w-4 h-4 mr-1" />
                Role
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setRoleFilter(null)}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {roleFilter === null && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">All Roles</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setRoleFilter('user')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {roleFilter === 'user' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Users</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setRoleFilter('business')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {roleFilter === 'business' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Businesses</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setRoleFilter('moderator')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {roleFilter === 'moderator' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Moderators</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setRoleFilter('admin')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {roleFilter === 'admin' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Admins</span>
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
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setStatusFilter('active')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {statusFilter === 'active' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Active</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setStatusFilter('suspended')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {statusFilter === 'suspended' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Suspended</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setStatusFilter('pending')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {statusFilter === 'pending' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Pending</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setStatusFilter('banned')}>
                  <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                    {statusFilter === 'banned' && <CheckIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                  <span className="text-sm">Banned</span>
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
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.profileImage ? <img className="h-10 w-10 rounded-full" src={user.profileImage} alt={user.name} /> : <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-gray-500" />
                          </div>}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : user.role === 'moderator' ? 'bg-blue-100 text-blue-800' : user.role === 'business' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : user.status === 'suspended' ? 'bg-yellow-100 text-yellow-800' : user.status === 'pending' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastActive).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => handleViewUserDetails(user)} className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <div className="relative group">
                        <button className="text-gray-500 hover:text-gray-700">
                          <MoreHorizontalIcon className="w-5 h-5" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 hidden group-hover:block">
                          <div className="py-1">
                            {user.status !== 'active' && <button onClick={() => handleUserAction('activate', user.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <UserCheckIcon className="w-4 h-4 inline-block mr-2" />
                                Activate User
                              </button>}
                            {user.status !== 'suspended' && <button onClick={() => handleUserAction('suspend', user.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <AlertTriangleIcon className="w-4 h-4 inline-block mr-2" />
                                Suspend User
                              </button>}
                            {user.status !== 'banned' && <button onClick={() => handleUserAction('ban', user.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <UserXIcon className="w-4 h-4 inline-block mr-2" />
                                Ban User
                              </button>}
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <MailIcon className="w-4 h-4 inline-block mr-2" />
                              Email User
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <LockIcon className="w-4 h-4 inline-block mr-2" />
                              Reset Password
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
      {/* User Details Modal */}
      {isUserDetailsOpen && selectedUser && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">User Details</h3>
              <button onClick={() => setIsUserDetailsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center mb-6">
              {selectedUser.profileImage ? <img className="h-16 w-16 rounded-full mr-4" src={selectedUser.profileImage} alt={selectedUser.name} /> : <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <UserIcon className="h-8 w-8 text-gray-500" />
                </div>}
              <div>
                <h4 className="text-xl font-medium">{selectedUser.name}</h4>
                <div className="text-gray-600">{selectedUser.email}</div>
                <div className="flex items-center mt-2">
                  <span className={`px-2 py-1 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedUser.role === 'admin' ? 'bg-purple-100 text-purple-800' : selectedUser.role === 'moderator' ? 'bg-blue-100 text-blue-800' : selectedUser.role === 'business' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                  </span>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedUser.status === 'active' ? 'bg-green-100 text-green-800' : selectedUser.status === 'suspended' ? 'bg-yellow-100 text-yellow-800' : selectedUser.status === 'pending' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h5 className="font-medium mb-2">Account Information</h5>
                <div className="space-y-2">
                  <div>
                    <div className="text-sm text-gray-500">Joined</div>
                    <div>
                      {new Date(selectedUser.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Last Active</div>
                    <div>
                      {new Date(selectedUser.lastActive).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">User ID</div>
                    <div>{selectedUser.id}</div>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-2">Activity Summary</h5>
                <div className="space-y-2">
                  <div>
                    <div className="text-sm text-gray-500">Reviews</div>
                    <div>12 reviews posted</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Comments</div>
                    <div>48 comments</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Reports</div>
                    <div>2 reports received</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h5 className="font-medium mb-2">Administrative Actions</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <div className="font-medium">Account Suspended</div>
                    <div className="text-sm text-gray-500">
                      June 30, 2023 by Admin User
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Reason: Violation of community guidelines
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <div className="font-medium">Warning Issued</div>
                    <div className="text-sm text-gray-500">
                      June 15, 2023 by Moderator
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Reason: Inappropriate comments
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="space-x-2">
                {selectedUser.status !== 'active' && <button onClick={() => {
              handleUserAction('activate', selectedUser.id);
              setIsUserDetailsOpen(false);
            }} className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">
                    Activate User
                  </button>}
                {selectedUser.status !== 'suspended' && <button onClick={() => {
              handleUserAction('suspend', selectedUser.id);
              setIsUserDetailsOpen(false);
            }} className="px-4 py-2 bg-yellow-600 text-white font-medium rounded-md hover:bg-yellow-700">
                    Suspend User
                  </button>}
                {selectedUser.status !== 'banned' && <button onClick={() => {
              handleUserAction('ban', selectedUser.id);
              setIsUserDetailsOpen(false);
            }} className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700">
                    Ban User
                  </button>}
              </div>
              <button onClick={() => setIsUserDetailsOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
                Close
              </button>
            </div>
          </div>
        </div>}
    </div>;
}
