#!/bin/bash

# Downtown Guide Migration Pipeline Runner
# Processes all 130 Magic Pattern files through the 4-stage pipeline

set -e  # Exit on error

echo "🚀 Downtown Guide Migration Pipeline"
echo "==================================="
echo ""

# Check Node.js version (React Router 7 requires Node.js 22+)
echo "🔍 Checking Node.js version..."
NODE_VERSION=$(node --version | cut -c 2-)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d. -f1)

if [ "$NODE_MAJOR" -lt 22 ]; then
    echo "❌ Error: React Router 7 requires Node.js 22 or higher"
    echo "   Current version: v$NODE_VERSION"
    echo "   Please install Node.js 22+ from:"
    echo "   - https://nodejs.org/"
    echo "   - Or use nvm: nvm install 22 && nvm use 22"
    exit 1
else
    echo "✅ Node.js v$NODE_VERSION (compatible with React Router 7)"
fi
echo ""

# Check if we're in the right directory
if [ ! -f "scripts/process-all-files.js" ]; then
    echo "❌ Error: Must run from migration-pipeline directory"
    echo "   cd /path/to/DTG/migration-pipeline"
    exit 1
fi

# Check if source files exist
if [ ! -d "../magic/src" ]; then
    echo "❌ Error: Magic source directory not found"
    echo "   Expected: ../magic/src"
    exit 1
fi

# Install dependencies
echo "📦 Installing migration script dependencies..."
cd scripts
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

# Show current status
echo ""
echo "📋 Current Status:"
echo "=================="
SOURCE_FILES=$(find ../magic/src -name "*.tsx" -o -name "*.ts" | wc -l)
NOMOCK_FILES=$(find nomock -name "*.tsx" 2>/dev/null | wc -l || echo "0")
STAGING_FILES=$(find staging -name "*.tsx" 2>/dev/null | wc -l || echo "0")
VALIDATED_FILES=$(find validated -name "*.tsx" 2>/dev/null | wc -l || echo "0")

echo "Source files (Magic):     $SOURCE_FILES"
echo "Stage 1 (nomock):         $NOMOCK_FILES"
echo "Stage 2 (staging):        $STAGING_FILES"
echo "Stage 3 (validated):      $VALIDATED_FILES"
echo ""

# Confirm with user
echo "⚠️  This will process ALL $SOURCE_FILES files through the migration pipeline"
echo "   This may take 10-30 minutes depending on your system"
echo ""
read -p "Continue? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Migration cancelled"
    exit 0
fi

# Create log directory
mkdir -p logs

# Run the migration
echo ""
echo "🔄 Starting migration pipeline..."
echo "================================"
echo "Processing $SOURCE_FILES files..."
echo "Log file: logs/migration.log"
echo ""

# Run with timestamp
START_TIME=$(date +%s)
node scripts/process-all-files.js

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
MINUTES=$((DURATION / 60))
SECONDS=$((DURATION % 60))

echo ""
echo "✅ Migration completed in ${MINUTES}m ${SECONDS}s"
echo ""

# Show final status
echo "📊 Final Status:"
echo "==============="
FINAL_NOMOCK=$(find nomock -name "*.tsx" 2>/dev/null | wc -l || echo "0")
FINAL_STAGING=$(find staging -name "*.tsx" 2>/dev/null | wc -l || echo "0")
FINAL_VALIDATED=$(find validated -name "*.tsx" 2>/dev/null | wc -l || echo "0")

echo "Stage 1 (nomock):         $FINAL_NOMOCK"
echo "Stage 2 (staging):        $FINAL_STAGING"  
echo "Stage 3 (validated):      $FINAL_VALIDATED"
echo ""

# Check for errors
if [ -f "logs/migration.log" ]; then
    ERROR_COUNT=$(grep -c "ERROR" logs/migration.log || echo "0")
    WARN_COUNT=$(grep -c "WARN" logs/migration.log || echo "0")
    
    if [ "$ERROR_COUNT" -gt 0 ]; then
        echo "⚠️  $ERROR_COUNT errors occurred - check logs/migration.log"
    fi
    
    if [ "$WARN_COUNT" -gt 0 ]; then
        echo "ℹ️  $WARN_COUNT warnings - see logs/migration.log"
    fi
fi

# Show next steps
echo ""
echo "🎯 Next Steps:"
echo "============="
echo "1. Review validation reports in logs/"
echo "2. Test converted files in development"
echo "3. Fix any remaining manual issues"
echo "4. Deploy validated files to production"
echo ""
echo "📂 File locations:"
echo "   Original:   ../magic/src/"
echo "   No mock:    migration-pipeline/nomock/"
echo "   RR7:        migration-pipeline/staging/"
echo "   Validated:  migration-pipeline/validated/"
echo "   Routes:     ../apps/web/app/routes/"