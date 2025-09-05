import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingNavigation } from './FloatingNavigation';
import { useBrand } from './contexts/BrandContext';

interface LayoutProps {
  children: React.ReactNode;
  showHero?: boolean;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  hideFooter?: boolean;
}

export function Layout({
  children,
  showHero = false,
  title,
  subtitle,
  backgroundImage,
  hideFooter = false
}: LayoutProps) {
  const {
    currentBrand
  } = useBrand();
  return <div className="min-h-screen flex flex-col bg-white">
      <Header siteName={currentBrand?.name || 'Downtown Guide'} showHero={showHero} title={title} subtitle={subtitle} backgroundImage={backgroundImage} />
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
      <FloatingNavigation />
    </div>;
}
