import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Explore } from './pages/Explore';
import { Search } from './pages/Search';
import { BusinessProfile } from './pages/business/[slug]';
import { BusinessHomepage } from './pages/business/homepage';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { VerifyEmail } from './pages/VerifyEmail';
import { UserProfile } from './pages/profile/[username]';
import { EditProfile } from './pages/profile/edit';
import { Settings } from './pages/Settings';
import { WriteReview } from './pages/review/[businessId]';
import { Favorites } from './pages/Favorites';
import { BusinessDashboard } from './pages/business/dashboard';
import { BusinessProfileEditor } from './pages/business/profile/edit';
import { BusinessAnalytics } from './pages/business/analytics';
import { BusinessPromotions } from './pages/business/promotions';
import { BusinessIntegrations } from './pages/business/integrations';
import { BusinessEvents } from './pages/business/events';
import { BusinessCoupons } from './pages/business/coupons';
import { BusinessLoyalty } from './pages/business/loyalty';
import { Pricing } from './pages/Pricing';
import { Billing } from './pages/Billing';
import { AdminDashboard } from './pages/admin/index';
import { ContentModerationPage } from './pages/admin/moderation';
import { Rewards } from './pages/Rewards';
import { Deals } from './pages/Deals';
import { DealDetail } from './pages/DealDetail';
import { Achievements } from './pages/Achievements';
import { Leaderboards } from './pages/Leaderboards';
import { Challenges } from './pages/Challenges';
import { Referrals } from './pages/Referrals';
import { Language } from './pages/account/Language';
import { DeactivateAccount } from './pages/account/Deactivate';
import { ChangePassword } from './pages/security/ChangePassword';
import { TwoFactorAuth } from './pages/security/TwoFactorAuth';
import { ActiveSessions } from './pages/security/ActiveSessions';
import { AddPaymentMethod } from './pages/billing/AddPaymentMethod';
import { Trending } from './pages/Trending';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { Events } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { BrandConfigPage } from './pages/admin/brand-config';
import { AdminNotificationsPage } from './pages/admin/notifications';
import { BrandPreview } from './components/BrandPreview';
import { BrandProvider } from './contexts/BrandContext';
import { AppProvider } from './contexts/AppContext';
export function App() {
  useEffect(() => {
    // Add global error handlers
    const handleError = (event: ErrorEvent) => {
      // Prevent the default "Script error" message
      event.preventDefault();
      console.error('Global error:', event.error);
    };
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Prevent unhandled promise rejection errors
      event.preventDefault();
      console.error('Unhandled promise rejection:', event.reason);
    };
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
  return <ErrorBoundary>
      <AppProvider>
        <BrandProvider>
          <div className="w-full min-h-screen bg-white">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/search" element={<Search />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/business/:slug" element={<BusinessProfile />} />
                <Route path="/business/homepage" element={<BusinessHomepage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/verify-email/:token" element={<VerifyEmail />} />
                <Route path="/profile/:username" element={<UserProfile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/account/language" element={<Language />} />
                <Route path="/account/deactivate" element={<DeactivateAccount />} />
                <Route path="/security/password" element={<ChangePassword />} />
                <Route path="/security/2fa" element={<TwoFactorAuth />} />
                <Route path="/security/sessions" element={<ActiveSessions />} />
                <Route path="/billing/add-payment-method" element={<AddPaymentMethod />} />
                <Route path="/review/:businessId" element={<WriteReview />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/business/dashboard" element={<BusinessDashboard />} />
                <Route path="/business/profile/edit" element={<BusinessProfileEditor />} />
                <Route path="/business/analytics" element={<BusinessAnalytics />} />
                <Route path="/business/promotions" element={<BusinessPromotions />} />
                <Route path="/business/integrations" element={<BusinessIntegrations />} />
                <Route path="/business/events" element={<BusinessEvents />} />
                <Route path="/business/coupons" element={<BusinessCoupons />} />
                <Route path="/business/loyalty" element={<BusinessLoyalty />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/moderation" element={<ContentModerationPage />} />
                <Route path="/admin/brand-config" element={<BrandConfigPage />} />
                <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/deals/:id" element={<DealDetail />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/leaderboards" element={<Leaderboards />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/referrals" element={<Referrals />} />
                {/* Brand Preview Route */}
                <Route path="/preview/brand/:brandId" element={<BrandPreview />} />
                {/* Add more routes as they are created */}
              </Routes>
            </BrowserRouter>
          </div>
        </BrandProvider>
      </AppProvider>
    </ErrorBoundary>;
}