# Railway Environment Variables

Add these environment variables to your Railway project:

## Quick Copy Format

Copy and paste this into Railway's Raw Editor in the Variables tab:

```
VITE_SITE_URL=https://dtg.up.railway.app
VITE_PRODUCT_NAME=DTG
VITE_SITE_TITLE=Downtown Guide - Your Local Business Guide
VITE_SITE_DESCRIPTION=Discover local businesses, events, and deals in your downtown area
VITE_DEFAULT_LOCALE=en
VITE_DEFAULT_THEME_MODE=light
VITE_THEME_COLOR=#ffffff
VITE_THEME_COLOR_DARK=#0a0a0a
VITE_AUTH_PASSWORD=true
VITE_AUTH_MAGIC_LINK=false
VITE_DISPLAY_TERMS_AND_CONDITIONS_CHECKBOX=false
VITE_BILLING_PROVIDER=stripe
VITE_CMS_CLIENT=keystatic
VITE_KEYSTATIC_CONTENT_PATH=./content
VITE_LOCALES_PATH=apps/web/public/locales
VITE_ENABLE_THEME_TOGGLE=true
VITE_ENABLE_PERSONAL_ACCOUNT_DELETION=false
VITE_ENABLE_PERSONAL_ACCOUNT_BILLING=false
VITE_ENABLE_TEAM_ACCOUNTS_DELETION=false
VITE_ENABLE_TEAM_ACCOUNTS_BILLING=false
VITE_ENABLE_TEAM_ACCOUNTS=true
VITE_ENABLE_TEAM_ACCOUNTS_CREATION=true
VITE_LANGUAGE_PRIORITY=application
VITE_ENABLE_SIDEBAR_TRIGGER=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_REALTIME_NOTIFICATIONS=false
VITE_ENABLE_VERSION_UPDATER=false
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SECRET_KEY=your-supabase-service-role-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_DB_WEBHOOK_SECRET=your-webhook-secret
EMAIL_SENDER=noreply@dtg.com
EMAIL_PORT=587
EMAIL_HOST=smtp.example.com
EMAIL_TLS=true
EMAIL_USER=your-email-user
EMAIL_PASSWORD=your-email-password
CONTACT_EMAIL=contact@dtg.com
MAILER_PROVIDER=nodemailer
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
```

## How to add to Railway

1. Go to your Railway project dashboard
2. Click on your service
3. Go to the "Variables" tab
4. Click "Raw Editor"
5. Paste all the variables above
6. Update the Supabase and email values with your actual credentials
7. Save the changes

Railway will automatically redeploy with the new environment variables.