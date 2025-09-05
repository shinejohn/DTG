import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AdminSidebar } from '../admin/Sidebar';
interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}
export default function AdminLayout({
  children,
  title,
  subtitle
}: AdminLayoutProps) {
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow flex">
        <AdminSidebar />
        <main className="flex-grow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          {children}
        </main>
      </div>
      <Footer />
    </div>;
}
