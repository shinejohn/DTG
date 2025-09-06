import { Outlet } from 'react-router';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import type { Route } from '~/types/app/routes/home/account/+types/layout';

// DTG/Magic Patterns components
import { Header } from '~/components/dtg/Header';
import { Footer } from '~/components/dtg/Footer';
import { BrandProvider } from '~/components/dtg/contexts/BrandContext';
import { useState } from 'react';
import { Menu, X, Users, Settings, CreditCard, Shield, BarChart, Store } from 'lucide-react';

import { loadTeamWorkspace } from './_lib/team-account-workspace-loader.server';

export const loader = async (args: Route.LoaderArgs) => {
  const accountSlug = args.params.account as string;

  const client = getSupabaseServerClient(args.request);

  const workspace = await loadTeamWorkspace({
    accountSlug,
    client,
  });

  return {
    workspace,
    accountSlug,
  };
};

// DTG Team Account Sidebar Navigation Component
function DTGTeamSidebar({ isOpen, onClose, accountName }: { isOpen: boolean; onClose: () => void; accountName: string }) {
  const navigationItems = [
    { href: `/home/${accountName}`, label: 'Dashboard', icon: BarChart },
    { href: `/home/${accountName}/settings`, label: 'Settings', icon: Settings },
    { href: `/home/${accountName}/members`, label: 'Team Members', icon: Users },
    { href: `/home/${accountName}/billing`, label: 'Billing', icon: CreditCard },
    { href: `/home/${accountName}/security`, label: 'Security', icon: Shield },
    { href: `/dtg/business/dashboard`, label: 'Business Dashboard', icon: Store },
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
            <div>
              <h2 className="text-xl font-semibold">Team Workspace</h2>
              <p className="text-sm text-gray-600 mt-1">{accountName}</p>
            </div>
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
          </nav>
        </div>
      </div>
    </>
  );
}

export default function TeamWorkspaceLayout(props: Route.ComponentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { workspace, accountSlug } = props.loaderData;
  const accountName = workspace.account.name;

  return (
    <BrandProvider>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header 
          siteName={`DTG - ${accountName}`} 
          showHero={false}
        />
        
        <div className="flex flex-1">
          {/* Sidebar */}
          <DTGTeamSidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
            accountName={accountSlug}
          />
          
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
