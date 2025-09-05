import React, { useState } from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { Header } from '../../../components/dtg/Header';
import { Footer } from '../../../components/dtg/Footer';
import { AdminSidebar } from '../../../components/dtg/admin/Sidebar';
import { UserManagement } from '../../../components/dtg/admin/UserManagement';
import { BusinessManagement } from '../../../components/dtg/admin/BusinessManagement';
import { ContentModeration } from '../../../components/dtg/admin/ContentModeration';
import { Analytics } from '../../../components/dtg/admin/Analytics';
import { SystemHealth } from '../../../components/dtg/admin/SystemHealth';
import BrandConfiguration from '../../../components/dtg/admin/BrandConfiguration';
export default function AdminDashboard() {
  const [activePanel, setActivePanel] = useState<'users' | 'businesses' | 'content' | 'analytics' | 'system' | 'brands'>('users');
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow flex">
        <AdminSidebar activePanel={activePanel} setActivePanel={setActivePanel} />
        <main className="flex-grow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">
              Manage users, businesses, and content across the platform
            </p>
          </div>
          {activePanel === 'users' && <UserManagement />} {activePanel === 'businesses' && <BusinessManagement />} {activePanel === 'brands' && <BrandConfiguration />} {activePanel === 'content' && <ContentModeration />} {activePanel === 'analytics' && <Analytics />} {activePanel === 'system' && <SystemHealth />}
        </main>
      </div>
      <Footer />
    </div>;
}
