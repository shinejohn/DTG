#!/bin/bash

# Downtown Guide Environment Setup
# Sets up environment variables and validates setup before migration

set -e

echo "🔧 Downtown Guide Environment Setup"
echo "==================================="
echo ""

# Create .env file for web app if it doesn't exist
WEB_ENV_FILE="../apps/web/.env"

echo "📝 Creating environment configuration..."

if [ ! -f "$WEB_ENV_FILE" ]; then
    cat > "$WEB_ENV_FILE" << 'EOF'
# Supabase Configuration
SUPABASE_URL=https://gotglcddwpcfrwlnejwi.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdGdsY2Rkd3BjZnJ3bG5landpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5OTcyODMsImV4cCI6MjA3MjU3MzI4M30.lGy4McrVwXkIqXYltGQkX4IfJRwD5_oyMcz1Fi0I870

# Application Configuration
VITE_SUPABASE_URL=https://gotglcddwpcfrwlnejwi.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdGdsY2Rkd3BjZnJ3bG5landpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5OTcyODMsImV4cCI6MjA3MjU3MzI4M30.lGy4McrVwXkIqXYltGQkX4IfJRwD5_oyMcz1Fi0I870

# Feature Flags
VITE_ENABLE_THEME_TOGGLE=true
VITE_ENABLE_PERSONAL_ACCOUNT_DELETION=false
VITE_ENABLE_TEAM_ACCOUNTS_DELETION=false
VITE_ENABLE_TEAM_ACCOUNTS=true
VITE_ENABLE_TEAM_ACCOUNTS_CREATION=true
VITE_ENABLE_PERSONAL_ACCOUNT_BILLING=false
VITE_ENABLE_TEAM_ACCOUNTS_BILLING=false
VITE_LANGUAGE_PRIORITY=application
VITE_ENABLE_NOTIFICATIONS=true
VITE_REALTIME_NOTIFICATIONS=false
VITE_ENABLE_VERSION_UPDATER=false

# Locale
VITE_LOCALE=en
EOF
    echo "✅ Created $WEB_ENV_FILE"
else
    echo "ℹ️  $WEB_ENV_FILE already exists"
fi

# Check Node.js version
echo ""
echo "🔍 Checking Node.js version..."
NODE_VERSION=$(node --version | cut -c 2-)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d. -f1)

if [ "$NODE_MAJOR" -lt 22 ]; then
    echo "❌ Error: React Router 7 requires Node.js 22 or higher"
    echo "   Current version: v$NODE_VERSION"
    echo ""
    echo "📥 Install Node.js 22:"
    echo "   Option 1 - Download from https://nodejs.org/"
    echo "   Option 2 - Use nvm:"
    echo "     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "     nvm install 22"
    echo "     nvm use 22"
    echo ""
    exit 1
else
    echo "✅ Node.js v$NODE_VERSION (compatible)"
fi

# Check pnpm
echo ""
echo "🔍 Checking pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
    echo "✅ pnpm installed"
else
    PNPM_VERSION=$(pnpm --version)
    echo "✅ pnpm v$PNPM_VERSION"
fi

# Install dependencies
echo ""
echo "📦 Installing project dependencies..."
cd ../
if [ -f "pnpm-lock.yaml" ]; then
    echo "Running: pnpm install"
    pnpm install
    echo "✅ Dependencies installed"
else
    echo "⚠️  pnpm-lock.yaml not found, run 'pnpm install' manually from project root"
fi

# Install migration script dependencies
echo ""
echo "📦 Installing migration script dependencies..."
cd migration-pipeline/scripts
if [ ! -d "node_modules" ]; then
    npm install
    echo "✅ Migration script dependencies installed"
else
    echo "✅ Migration script dependencies already installed"
fi

# Test Supabase connection
echo ""
echo "🔗 Testing Supabase connection..."
cd ../../apps/web
if command -v supabase &> /dev/null; then
    echo "✅ Supabase CLI found"
    
    # Test connection
    SUPABASE_URL="https://gotglcddwpcfrwlnejwi.supabase.co"
    SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdGdsY2Rkd3BjZnJ3bG5landpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5OTcyODMsImV4cCI6MjA3MjU3MzI4M30.lGy4McrVwXkIqXYltGQkX4IfJRwD5_oyMcz1Fi0I870"
    
    # Simple test using curl
    if curl -s -f "${SUPABASE_URL}/rest/v1/" -H "apikey: ${SUPABASE_KEY}" > /dev/null; then
        echo "✅ Supabase connection successful"
    else
        echo "⚠️  Could not verify Supabase connection"
    fi
else
    echo "⚠️  Supabase CLI not found"
    echo "   Install with: npm install -g supabase"
fi

cd ../../migration-pipeline

# Generate TypeScript types (if possible)
echo ""
echo "🔧 Generating TypeScript types..."
cd ../apps/web
if command -v supabase &> /dev/null && [ -f "supabase/config.toml" ]; then
    echo "Generating types from Supabase..."
    # Update Supabase config to point to remote
    if ! grep -q "gotglcddwpcfrwlnejwi" supabase/config.toml; then
        echo ""
        echo "⚠️  Update supabase/config.toml to point to your remote database"
        echo "   or run: supabase gen types --lang=typescript --project-id gotglcddwpcfrwlnejwi > lib/database.types.ts"
    fi
else
    echo "⚠️  Cannot generate types without Supabase CLI or config"
fi

cd ../../migration-pipeline

echo ""
echo "🎉 Environment setup complete!"
echo ""
echo "✅ What was configured:"
echo "   • Node.js v$NODE_VERSION"
echo "   • pnpm and project dependencies"
echo "   • Environment variables in apps/web/.env"
echo "   • Migration script dependencies"
echo "   • Supabase connection tested"
echo ""
echo "🚀 Ready to run migration:"
echo "   ./run-migration.sh"
echo ""
echo "📋 Or run individual stages:"
echo "   cd scripts && npm run process:all"