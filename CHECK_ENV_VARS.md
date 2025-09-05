# Environment Variables Checklist for Railway

## CRITICAL - Must be set with actual values (not empty):

1. **VITE_LANGUAGE_PRIORITY** - Set to: `application`
   - Current issue: Empty string causing crash
   - Valid values: `user` or `application`

## Required Variables (verify these are set):

### Core Site Configuration:
- VITE_SITE_URL=https://dtg.up.railway.app
- VITE_PRODUCT_NAME=DTG
- VITE_SITE_TITLE=Downtown Guide - Your Local Business Guide
- VITE_SITE_DESCRIPTION=Discover local businesses, events, and deals in your downtown area

### Supabase (must have actual values, not placeholders):
- VITE_SUPABASE_URL=(your actual Supabase URL)
- VITE_SUPABASE_ANON_KEY=(your actual anon key)
- SUPABASE_SECRET_KEY=(your actual service role key)

### Other Required Variables:
- VITE_DEFAULT_LOCALE=en
- VITE_DEFAULT_THEME_MODE=light
- VITE_THEME_COLOR=#ffffff
- VITE_THEME_COLOR_DARK=#0a0a0a

## Fix Instructions:

1. In Railway dashboard, find the variable `VITE_LANGUAGE_PRIORITY`
2. Make sure it's set to `application` (not empty!)
3. Save and redeploy

The app is crashing because `VITE_LANGUAGE_PRIORITY` is an empty string ("") instead of "application".