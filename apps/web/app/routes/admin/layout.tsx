import { Outlet } from 'react-router';

// DTG/Magic Patterns components
import { Header } from '~/components/dtg/Header';
import { Footer } from '~/components/dtg/Footer';
import { BrandProvider } from '~/components/dtg/contexts/BrandContext';
import { useState } from 'react';
import { Menu, X, BarChart, Users, Shield, Bell, Settings, Cog, Database } from 'lucide-react';

export const meta = () => [
  {
    title: `DTG Admin`,
  },
];

// DTG Admin Sidebar Navigation Component
function DTGAdminSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigationItems = [
    { href: '/admin', label: 'Dashboard', icon: BarChart },
    { href: '/admin/accounts', label: 'User Accounts', icon: Users },
    { href: '/admin/dtg', label: 'DTG Management', icon: Cog },
    { href: '/admin/dtg/brand-config', label: 'Brand Config', icon: Shield },
    { href: '/admin/dtg/moderation', label: 'Moderation', icon: Shield },
    { href: '/admin/dtg/notifications', label: 'Notifications', icon: Bell },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
    { href: '/admin/database', label: 'Database', icon: Database },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gray-900 text-white shadow-xl z-50 transition-transform duration-300 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none
        w-64
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold">DTG Admin</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrandProvider>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header 
          siteName="DTG Admin" 
          showHero={false}
        />
        
        <div className="flex flex-1">
          {/* Sidebar */}
          <DTGAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          {/* Main Content */}
          <main className="flex-1 px-4 py-8 lg:px-8">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mb-4 p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Outlet />
          </main>
        </div>
        
        <Footer />
      </div>
    </BrandProvider>
  );
}
