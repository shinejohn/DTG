import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { AdminSidebar } from '../../components/admin/Sidebar';
import { UserManagement } from '../../components/admin/UserManagement';
import { BusinessManagement } from '../../components/admin/BusinessManagement';
import { ContentModeration } from '../../components/admin/ContentModeration';
import { Analytics } from '../../components/admin/Analytics';
import { SystemHealth } from '../../components/admin/SystemHealth';
import { BrandConfiguration } from '../../components/admin/BrandConfiguration';
export function AdminDashboard() {
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
          {activePanel === 'users' && <UserManagement />}
          {activePanel === 'businesses' && <BusinessManagement />}
          {activePanel === 'brands' && <BrandConfiguration />}
          {activePanel === 'content' && <ContentModeration />}
          {activePanel === 'analytics' && <Analytics />}
          {activePanel === 'system' && <SystemHealth />}
        </main>
      </div>
      <Footer />
    </div>;
}