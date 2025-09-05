#!/usr/bin/env node

/**
 * React Router 7 Route Structure Fixer
 * 
 * Moves files from /routes/pages/ to proper React Router 7 route structure
 * and renames them according to RR7 conventions
 */

const fs = require('fs');
const path = require('path');

const ROUTES_PATH = path.join(__dirname, '..', '..', 'apps', 'web', 'app', 'routes');
const PAGES_PATH = path.join(ROUTES_PATH, 'pages');

// Mapping from Magic pattern page names to React Router 7 route names
const ROUTE_MAPPINGS = {
  // Main app pages - go to DTG subdirectory
  'Home.tsx': 'dtg/index.tsx',
  'Search.tsx': 'dtg/search.tsx',
  'Explore.tsx': 'dtg/explore.tsx',
  'Deals.tsx': 'dtg/deals.tsx',
  'DealDetail.tsx': 'dtg/deals.$id.tsx',
  'Events.tsx': 'dtg/events.tsx',
  'EventDetail.tsx': 'dtg/events.$id.tsx',
  'News.tsx': 'dtg/news.tsx',
  'NewsDetail.tsx': 'dtg/news.$id.tsx',
  'Trending.tsx': 'dtg/trending.tsx',
  'Favorites.tsx': 'dtg/favorites.tsx',
  
  // Auth pages - integrate with existing auth structure
  'Login.tsx': 'auth/sign-in-dtg.tsx',
  'Register.tsx': 'auth/sign-up-dtg.tsx',
  'ForgotPassword.tsx': 'auth/forgot-password.tsx',
  'ResetPassword.tsx': 'auth/reset-password.tsx',
  'VerifyEmail.tsx': 'auth/verify-email.tsx',
  
  // User account pages - integrate with existing home structure
  'Settings.tsx': 'home/user/settings-dtg.tsx',
  'Billing.tsx': 'home/user/billing-dtg.tsx',
  'Achievements.tsx': 'home/user/achievements.tsx',
  'Challenges.tsx': 'home/user/challenges.tsx',
  'Rewards.tsx': 'home/user/rewards.tsx',
  'Leaderboards.tsx': 'home/user/leaderboards.tsx',
  'Referrals.tsx': 'home/user/referrals.tsx',
  
  // Business pages - new business section
  'business/[slug].tsx': 'dtg/business.$slug.tsx',
  'business/analytics.tsx': 'dtg/business/analytics.tsx',
  'business/dashboard.tsx': 'dtg/business/dashboard.tsx',
  'business/coupons.tsx': 'dtg/business/coupons.tsx',
  'business/events.tsx': 'dtg/business/events.tsx',
  'business/homepage.tsx': 'dtg/business/homepage.tsx',
  'business/integrations.tsx': 'dtg/business/integrations.tsx',
  'business/loyalty.tsx': 'dtg/business/loyalty.tsx',
  'business/promotions.tsx': 'dtg/business/promotions.tsx',
  'business/profile/edit.tsx': 'dtg/business/profile/edit.tsx',
  'business/dashboard/LoyaltyMembers.tsx': 'dtg/business/loyalty-members.tsx',
  
  // Profile pages
  'profile/[username].tsx': 'dtg/profile.$username.tsx',
  'profile/edit.tsx': 'dtg/profile/edit.tsx',
  'profile/Rewards.tsx': 'dtg/profile/rewards.tsx',
  
  // Review pages
  'review/[businessId].tsx': 'dtg/review.$businessId.tsx',
  
  // Account pages
  'account/Deactivate.tsx': 'home/user/account/deactivate.tsx',
  'account/Language.tsx': 'home/user/account/language.tsx',
  
  // Security pages
  'security/ActiveSessions.tsx': 'home/user/security/sessions.tsx',
  'security/ChangePassword.tsx': 'home/user/security/password.tsx',
  'security/TwoFactorAuth.tsx': 'home/user/security/two-factor.tsx',
  
  // Admin pages - integrate with existing admin structure
  'admin/index.tsx': 'admin/dtg/index.tsx',
  'admin/brand-config.tsx': 'admin/dtg/brand-config.tsx',
  'admin/moderation.tsx': 'admin/dtg/moderation.tsx',
  'admin/notifications.tsx': 'admin/dtg/notifications.tsx',
  
  // Billing pages
  'billing/AddPaymentMethod.tsx': 'home/user/billing/payment-method.tsx',
  
  // Marketing pricing - avoid conflict with existing
  'Pricing.tsx': 'marketing/pricing-dtg.tsx'
};

console.log('🔧 Fixing React Router 7 route structure...\n');

function moveFile(sourcePath, targetPath) {
  try {
    // Create target directory if it doesn't exist
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`📁 Created directory: ${path.relative(ROUTES_PATH, targetDir)}`);
    }
    
    // Read source file
    const content = fs.readFileSync(sourcePath, 'utf-8');
    
    // Update import paths to be relative to new location
    let updatedContent = content;
    
    // Fix relative imports that are now broken due to new location
    updatedContent = updatedContent.replace(/from ['"]\.\.\/components\//g, "from '@/components/dtg/");
    updatedContent = updatedContent.replace(/from ['"]\.\.\/contexts\//g, "from '@/contexts/dtg/");
    updatedContent = updatedContent.replace(/from ['"]\.\.\/services\//g, "from '@/services/dtg/");
    updatedContent = updatedContent.replace(/from ['"]\.\.\/hooks\//g, "from '@/hooks/dtg/");
    updatedContent = updatedContent.replace(/from ['"]\.\.\/utils\//g, "from '@/utils/dtg/");
    updatedContent = updatedContent.replace(/from ['"]\.\.\/types\//g, "from '@/types/dtg/");
    
    // Write to target location
    fs.writeFileSync(targetPath, updatedContent);
    console.log(`✅ Moved: ${path.relative(ROUTES_PATH, sourcePath)} → ${path.relative(ROUTES_PATH, targetPath)}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to move ${sourcePath}: ${error.message}`);
    return false;
  }
}

function processDirectory(sourceDir, basePath = '') {
  if (!fs.existsSync(sourceDir)) {
    console.log(`⚠️  Directory not found: ${sourceDir}`);
    return;
  }
  
  const items = fs.readdirSync(sourceDir);
  let movedCount = 0;
  let skippedCount = 0;
  
  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const relativePath = path.join(basePath, item);
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(sourcePath, relativePath);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      // Process TypeScript files
      const mapping = ROUTE_MAPPINGS[relativePath];
      
      if (mapping) {
        const targetPath = path.join(ROUTES_PATH, mapping);
        if (moveFile(sourcePath, targetPath)) {
          movedCount++;
        } else {
          skippedCount++;
        }
      } else if (item !== 'index.tsx' && item !== '_app.tsx' && item !== '_document.tsx') {
        // Skip common files but warn about unmapped ones
        console.log(`⚠️  No mapping for: ${relativePath}`);
        skippedCount++;
      }
    }
  }
  
  return { movedCount, skippedCount };
}

// Process all files in the pages directory
console.log('📂 Processing pages directory...\n');
const results = processDirectory(PAGES_PATH);

// Create DTG layout and route structure
console.log('\n🏗️  Creating DTG route structure...\n');

// Create DTG layout file
const dtgLayoutPath = path.join(ROUTES_PATH, 'dtg', 'layout.tsx');
const dtgLayoutContent = `import type { Route } from './+types/layout';
import { Outlet } from 'react-router';
import { Layout } from '@/components/dtg/Layout';

export default function DTGLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600 mt-4">Something went wrong with the Downtown Guide</p>
      </div>
    </div>
  );
}`;

if (!fs.existsSync(path.dirname(dtgLayoutPath))) {
  fs.mkdirSync(path.dirname(dtgLayoutPath), { recursive: true });
}
fs.writeFileSync(dtgLayoutPath, dtgLayoutContent);
console.log(`✅ Created: ${path.relative(ROUTES_PATH, dtgLayoutPath)}`);

// Clean up empty pages directory
try {
  const remainingFiles = fs.readdirSync(PAGES_PATH);
  if (remainingFiles.length === 0) {
    fs.rmdirSync(PAGES_PATH);
    console.log('🗑️  Removed empty pages directory');
  } else {
    console.log(`📁 Pages directory still contains: ${remainingFiles.join(', ')}`);
  }
} catch (error) {
  // Directory might already be cleaned up
}

console.log('\n🎉 Route structure fix completed!');
console.log(`📊 Results: ${results?.movedCount || 0} files moved, ${results?.skippedCount || 0} skipped`);
console.log('\n📍 Your DTG routes are now available at:');
console.log('   • /dtg/ - Main Downtown Guide app');
console.log('   • /dtg/business/ - Business management');
console.log('   • /home/user/ - User account features');
console.log('   • /admin/dtg/ - Admin features');