import { forwardRef, useState } from 'react';
import { Link } from 'react-router';
import { BellIcon, SearchIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react';

import { cn } from '@kit/ui/utils';
import { useBrand } from './contexts/BrandContext';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  siteName?: string;
  title?: string;
  subtitle?: string;
  showHero?: boolean;
  backgroundImage?: string;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  function DTGHeaderComponent(
    { 
      className, 
      siteName = 'Downtown Guide',
      title,
      subtitle,
      showHero = false,
      backgroundImage,
      ...props 
    },
    ref,
  ) {
    const { currentBrand } = useBrand();
    const primaryColor = currentBrand?.primaryColor || '#3B82F6';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
      <div
        ref={ref}
        className={cn('site-header', className)}
        {...props}
      >
        {/* Navigation Bar */}
        <nav 
          className="py-4 px-6 flex items-center justify-between sticky top-0 z-10"
          style={{ backgroundColor: primaryColor }}
        >
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/dtg-logo.jpg" 
                alt="Downtown Guide" 
                className="h-8 w-8 rounded-full object-cover border-2 border-white" 
              />
              <span className="hidden md:block text-white font-bold">
                {siteName}
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-6">
            <Link to="/dtg/category/food" className="text-white hover:text-white hover:opacity-80">
              Food
            </Link>
            <Link to="/dtg/category/fun" className="text-white hover:text-white hover:opacity-80">
              Fun
            </Link>
            <Link to="/dtg/category/nightlife" className="text-white hover:text-white hover:opacity-80">
              Nightlife
            </Link>
            <Link to="/dtg/category/self" className="text-white hover:text-white hover:opacity-80">
              Self
            </Link>
            <Link to="/dtg/category/shop" className="text-white hover:text-white hover:opacity-80">
              Shop
            </Link>
            <Link to="/dtg/events" className="text-white hover:text-white hover:opacity-80">
              Event
            </Link>
            <Link to="/dtg/category/entertainment" className="text-white hover:text-white hover:opacity-80">
              Entertainment
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Quick search..." 
                className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-75 border-none focus:outline-none focus:ring-0 text-sm rounded-full py-1 pl-10 pr-3 hidden md:block w-40" 
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none hidden md:flex">
                <SearchIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <Link to="/dtg/notifications" className="text-white p-1 rounded-full hover:bg-white hover:bg-opacity-20">
              <BellIcon className="w-5 h-5" />
            </Link>
            <Link to="/home" className="text-white p-1 rounded-full hover:bg-white hover:bg-opacity-20">
              <UserIcon className="w-5 h-5" />
            </Link>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                className="text-white p-1 rounded-full hover:bg-white hover:bg-opacity-20" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
        
        {/* Submenu */}
        <div className="bg-gray-100 border-b">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center py-2 space-x-6">
              <Link to="/auth/sign-up" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
                Sign-up
              </Link>
              <Link to="/rewards" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
                Rewards
              </Link>
              <Link to="/deals" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
                Coupons
              </Link>
              <Link to="/dtg/business/register" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
                Business Sign-up
              </Link>
              <Link to="/dtg/events/add" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
                Add Event
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b shadow-sm">
            <div className="px-4 py-3 space-y-2">
              <h3 className="text-sm font-semibold text-gray-600 px-3 pb-2">Categories</h3>
              <Link 
                to="/dtg/category/food" 
                className="block px-3 py-2 rounded-md hover:bg-gray-100" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Food
              </Link>
              <Link 
                to="/dtg/category/fun" 
                className="block px-3 py-2 rounded-md hover:bg-gray-100" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Fun
              </Link>
              <Link 
                to="/dtg/category/nightlife" 
                className="block px-3 py-2 rounded-md hover:bg-gray-100" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Nightlife
              </Link>
              <Link 
                to="/dtg/category/self" 
                className="block px-3 py-2 rounded-md hover:bg-gray-100" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Self
              </Link>
              <Link 
                to="/dtg/category/shop" 
                className="block px-3 py-2 rounded-md hover:bg-gray-100" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/dtg/events" 
                className="block px-3 py-2 rounded-md hover:bg-gray-100" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Event
              </Link>
              <Link 
                to="/dtg/category/entertainment" 
                className="block px-3 py-2 rounded-md hover:bg-gray-100" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Entertainment
              </Link>
              <hr className="my-3 border-gray-200" />
              <h3 className="text-sm font-semibold text-gray-600 px-3 pb-2">Quick Links</h3>
              <Link 
                to="/auth/sign-up" 
                className="block px-3 py-2 rounded-md hover:bg-gray-100" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign-up
              </Link>
              <Link 
                to="/rewards" 
                className="block px-3 py-2 rounded-md hover:bg-gray-100" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Rewards
              </Link>
              <Link 
                to="/deals" 
                className="block px-3 py-2 rounded-md hover:bg-gray-100" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Coupons
              </Link>
              <Link 
                to="/dtg/business/register" 
                className="block px-3 py-2 rounded-md hover:bg-gray-100" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Business Sign-up
              </Link>
              <Link 
                to="/dtg/events/add" 
                className="block px-3 py-2 rounded-md hover:bg-gray-100" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Add Event
              </Link>
            </div>
          </div>
        )}

        {/* Hero Section */}
        {showHero && (
          <div 
            className="relative bg-cover bg-center py-16 md:py-24"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`
            }}
          >
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg md:text-xl text-white opacity-90 max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);