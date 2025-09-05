#!/usr/bin/env node

/**
 * Fix TypeScript Syntax Errors in Migrated Files
 * 
 * This script fixes common TypeScript syntax errors that occurred during migration:
 * - Missing semicolons
 * - Incorrect JSX formatting
 * - Import statement issues
 * - Function declaration problems
 * - Missing React imports
 */

const fs = require('fs');
const path = require('path');

const ROUTES_PAGES_PATH = path.join(__dirname, '..', '..', 'apps', 'web', 'app', 'routes', 'pages');

console.log('🔧 Fixing TypeScript syntax errors...\n');

function fixTypeScriptFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    let fixed = content;
    let hasChanges = false;

    // Fix 1: Add missing React imports
    if (!fixed.includes('import React') && (fixed.includes('useState') || fixed.includes('useEffect') || fixed.includes('<'))) {
      fixed = `import React from 'react';\n${fixed}`;
      hasChanges = true;
    }

    // Fix 2: Add missing import for router functions
    if (!fixed.includes('useRouteError') && fixed.includes('useRouteError')) {
      fixed = fixed.replace('import { json, useLoaderData } from \'react-router\';', 
        'import { json, useLoaderData, useRouteError, isRouteErrorResponse } from \'react-router\';');
      hasChanges = true;
    }

    // Fix 3: Fix JSX syntax issues - remove broken JSX closing tags
    fixed = fixed.replace(/>\s*{[^}]*}\s*</g, (match) => {
      // If it looks like broken JSX, try to fix it
      if (match.includes('undefined') || match.includes('null')) {
        return '>';
      }
      return match;
    });

    // Fix 4: Fix missing semicolons after import statements
    fixed = fixed.replace(/^(import .+)$/gm, '$1;');

    // Fix 5: Fix broken function declarations
    fixed = fixed.replace(/export\s+default\s+function\s+(\w+)\s*\(\s*\)\s*\{/g, 
      'export default function $1() {');

    // Fix 6: Fix incomplete JSX elements
    fixed = fixed.replace(/(<\w+[^>]*>)\s*{[^}]*undefined[^}]*}\s*(<\/\w+>)/g, '$1$2');

    // Fix 7: Remove duplicate React imports
    const lines = fixed.split('\n');
    const uniqueImports = new Set();
    const filteredLines = lines.filter(line => {
      if (line.startsWith('import React')) {
        if (uniqueImports.has('react')) {
          return false;
        }
        uniqueImports.add('react');
      }
      return true;
    });
    fixed = filteredLines.join('\n');

    // Fix 8: Fix broken JSX attribute syntax
    fixed = fixed.replace(/(\w+)=\s*{([^}]+)}\s*([^>]*>)/g, '$1={$2} $3');

    // Fix 9: Clean up malformed JSX
    fixed = fixed.replace(/}\s*{\s*/g, '} {');

    // Fix 10: Fix missing return statement wrapping
    if (fixed.includes('export default function') && !fixed.includes('return (')) {
      // Look for JSX without return statement
      fixed = fixed.replace(
        /(export default function \w+\([^)]*\)\s*{[^{]*?)\s*(<[^<]*>[\s\S]*?<\/[^>]*>)/,
        '$1\n  return (\n    $2\n  );'
      );
      hasChanges = true;
    }

    // Fix 11: Add missing loader and ErrorBoundary imports if they're used but not imported
    if ((fixed.includes('useLoaderData') || fixed.includes('export async function loader')) && 
        !fixed.includes('import type { Route }')) {
      fixed = `import type { Route } from './+types/route';\n${fixed}`;
      hasChanges = true;
    }

    // Fix 12: Ensure proper function exports
    fixed = fixed.replace(/export\s+function\s+(\w+)\s*\(\s*\)\s*{/g, 'export function $1() {');

    // Fix 13: Clean up any remaining syntax issues
    fixed = fixed.replace(/;;\s*$/gm, ';');
    fixed = fixed.replace(/\n\n\n+/g, '\n\n');
    
    // Fix 14: Ensure file ends with newline
    if (!fixed.endsWith('\n')) {
      fixed += '\n';
      hasChanges = true;
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, fixed);
      console.log(`✅ Fixed: ${path.relative(ROUTES_PAGES_PATH, filePath)}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}: ${error.message}`);
    return false;
  }
}

// Process all TypeScript/TSX files
function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️  Directory not found: ${dirPath}`);
    return { fixed: 0, skipped: 0 };
  }

  let fixedCount = 0;
  let skippedCount = 0;

  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      const subResults = processDirectory(itemPath);
      fixedCount += subResults.fixed;
      skippedCount += subResults.skipped;
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      if (fixTypeScriptFile(itemPath)) {
        fixedCount++;
      } else {
        skippedCount++;
      }
    }
  }

  return { fixed: fixedCount, skipped: skippedCount };
}

// Main execution
async function main() {
  try {
    console.log('📂 Processing TypeScript files in pages directory...\n');
    
    const results = processDirectory(ROUTES_PAGES_PATH);
    
    console.log('\n🎉 TypeScript syntax fixing completed!');
    console.log(`📊 Results: ${results.fixed} files fixed, ${results.skipped} files skipped`);
    
    // Run a quick validation
    console.log('\n🔍 Running quick validation...');
    
    // Test a sample file
    const testFile = path.join(ROUTES_PAGES_PATH, 'Home.tsx');
    if (fs.existsSync(testFile)) {
      const content = fs.readFileSync(testFile, 'utf-8');
      if (content.includes('import React') && content.includes('export default function')) {
        console.log('✅ Sample validation passed');
      } else {
        console.log('⚠️  Sample validation shows potential issues');
      }
    }
    
    console.log('\n📋 Next steps:');
    console.log('   1. Run: pnpm typecheck');
    console.log('   2. If issues remain, run this script again');
    console.log('   3. Start development server: pnpm dev');
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}