import React from 'react';
import { Link } from 'react-router-dom';
import { UsersIcon, BuildingIcon, MessageSquareIcon, BarChart2Icon, ServerIcon, ShieldIcon, SettingsIcon, HomeIcon, BellIcon, FlagIcon, ImageIcon, ListIcon, HistoryIcon, GlobeIcon, PaletteIcon } from 'lucide-react';
interface AdminSidebarProps {
  activePanel?: string;
  setActivePanel?: (panel: any) => void;
}
export function AdminSidebar({
  activePanel,
  setActivePanel
}: AdminSidebarProps) {
  return <aside className="w-64 bg-white shadow-sm hidden md:block">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <ShieldIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">Admin Dashboard</h2>
            <div className="text-xs text-gray-500">System Management</div>
          </div>
        </div>
      </div>
      <nav className="p-2">
        <div className="mb-4">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
            Main
          </div>
          <ul className="space-y-1">
            <li>
              <Link to="/admin" className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${!activePanel ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                <HomeIcon className={`w-5 h-5 mr-3 ${!activePanel ? 'text-blue-500' : 'text-gray-500'}`} />
                Dashboard
              </Link>
            </li>
            {setActivePanel && <>
                <li>
                  <button onClick={() => setActivePanel('users')} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left ${activePanel === 'users' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <UsersIcon className={`w-5 h-5 mr-3 ${activePanel === 'users' ? 'text-blue-500' : 'text-gray-500'}`} />
                    User Management
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePanel('businesses')} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left ${activePanel === 'businesses' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <BuildingIcon className={`w-5 h-5 mr-3 ${activePanel === 'businesses' ? 'text-blue-500' : 'text-gray-500'}`} />
                    Business Management
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePanel('brands')} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left ${activePanel === 'brands' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <PaletteIcon className={`w-5 h-5 mr-3 ${activePanel === 'brands' ? 'text-blue-500' : 'text-gray-500'}`} />
                    Brand Configuration
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePanel('content')} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left ${activePanel === 'content' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <MessageSquareIcon className={`w-5 h-5 mr-3 ${activePanel === 'content' ? 'text-blue-500' : 'text-gray-500'}`} />
                    Content Moderation
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePanel('analytics')} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left ${activePanel === 'analytics' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <BarChart2Icon className={`w-5 h-5 mr-3 ${activePanel === 'analytics' ? 'text-blue-500' : 'text-gray-500'}`} />
                    Analytics
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePanel('system')} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left ${activePanel === 'system' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <ServerIcon className={`w-5 h-5 mr-3 ${activePanel === 'system' ? 'text-blue-500' : 'text-gray-500'}`} />
                    System Health
                  </button>
                </li>
              </>}
          </ul>
        </div>
        <div className="mb-4">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
            Moderation
          </div>
          <ul className="space-y-1">
            <li>
              <Link to="/admin/moderation" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                <FlagIcon className="w-5 h-5 mr-3 text-gray-500" />
                Content Moderation
              </Link>
            </li>
            <li>
              <Link to="/admin/moderation" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                <BuildingIcon className="w-5 h-5 mr-3 text-gray-500" />
                Business Verification
              </Link>
            </li>
            <li>
              <Link to="/admin/moderation" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                <ImageIcon className="w-5 h-5 mr-3 text-gray-500" />
                Photo Moderation
              </Link>
            </li>
            <li>
              <Link to="/admin/moderation" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                <ListIcon className="w-5 h-5 mr-3 text-gray-500" />
                Report Management
              </Link>
            </li>
            <li>
              <Link to="/admin/moderation" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                <HistoryIcon className="w-5 h-5 mr-3 text-gray-500" />
                Moderation History
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
            Settings
          </div>
          <ul className="space-y-1">
            <li>
              <Link to="/admin/settings" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                <SettingsIcon className="w-5 h-5 mr-3 text-gray-500" />
                Admin Settings
              </Link>
            </li>
            <li>
              <Link to="/admin/brand-config" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                <GlobeIcon className="w-5 h-5 mr-3 text-gray-500" />
                Brand Settings
              </Link>
            </li>
            <li>
              <Link to="/admin/notifications" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                <BellIcon className="w-5 h-5 mr-3 text-gray-500" />
                Admin Notifications
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>;
}