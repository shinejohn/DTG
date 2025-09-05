import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { useBrand } from '../contexts/BrandContext';
interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}
export default function PageLayout({
  children,
  title,
  description,
  showHeader = true,
  showFooter = true,
  className = ''
}: PageLayoutProps) {
  const {
    currentBrand
  } = useBrand();
  return <div className="min-h-screen flex flex-col bg-gray-50">
      {showHeader && <Header siteName={currentBrand?.name || 'Downtown Guide'} />}
      <main className={`flex-grow container mx-auto px-4 py-6 ${className}`}>
        {title && <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && <p className="text-gray-600 mt-1">{description}</p>}
          </div>}
        {children}
      </main>
      {showFooter && <Footer />}
    </div>;
}
