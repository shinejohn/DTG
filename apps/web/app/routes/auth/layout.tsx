import { Outlet } from 'react-router';

// DTG/Magic Patterns components
import { Header } from '~/components/dtg/Header';
import { Footer } from '~/components/dtg/Footer';
import { BrandProvider } from '~/components/dtg/contexts/BrandContext';

export default function AuthLayout() {
  return (
    <BrandProvider>
      <div className={'flex min-h-[100vh] flex-col bg-white'}>
        <Header 
          siteName="Downtown Guide" 
          showHero={false}
        />
        <main className="flex-grow flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </BrandProvider>
  );
}
