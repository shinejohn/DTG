import { Outlet } from 'react-router';

import { requireUserLoader } from '~/lib/require-user-loader';
import { loadUserWorkspace } from '~/routes/home/user/_lib/load-user-workspace.server';
import type { Route } from '~/types/app/routes/home/user/+types/layout';

// DTG/Magic Patterns components
import { Header } from '~/components/dtg/Header';
import { Footer } from '~/components/dtg/Footer';
import { BrandProvider } from '~/components/dtg/contexts/BrandContext';
import { useState } from 'react';
import { Menu, X, User, Settings, CreditCard, LogOut, Trophy, Gift, Users, Shield } from 'lucide-react';

export async function loader(args: Route.LoaderArgs) {
  const request = args.request;
  const user = await requireUserLoader(request);

  const workspace = await loadUserWorkspace(request);

  return {
    workspace: {
      ...workspace,
      user,
    },
  };
}

// DTG Sidebar Navigation Component
function DTGSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigationItems = [
    { href: '/home', label: 'Dashboard', icon: User },
    { href: '/home/achievements', label: 'Achievements', icon: Trophy },
    { href: '/home/rewards', label: 'Rewards', icon: Gift },
    { href: '/home/referrals', label: 'Referrals', icon: Users },
    { href: '/home/settings', label: 'Settings', icon: Settings },
    { href: '/home/billing', label: 'Billing', icon: CreditCard },
    { href: '/home/security/two-factor', label: 'Security', icon: Shield },
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
        fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none lg:border-r
        w-64
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold">My Account</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
            
            <div className="pt-4 mt-4 border-t">
              <a
                href="/auth/sign-out"
                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default function UserHomeLayout(props: Route.ComponentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { workspace } = props.loaderData;

  return (
    <BrandProvider>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header 
          siteName="Downtown Guide" 
          showHero={false}
        />
        
        <div className="flex flex-1">
          {/* Sidebar */}
          <DTGSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
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
