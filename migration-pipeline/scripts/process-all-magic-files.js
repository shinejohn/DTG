#!/usr/bin/env node

/**
 * Complete Magic Files Migration Processor
 * 
 * Processes ALL Magic files through the complete 4-stage migration pipeline,
 * not just those with mockdata. This ensures all files are properly converted
 * to React Router 7 format and integrated into the application.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const MAGIC_SRC_PATH = path.join(__dirname, '..', '..', 'magic', 'src');
const ROUTES_PAGES_PATH = path.join(__dirname, '..', '..', 'apps', 'web', 'app', 'routes', 'pages');
const COMPONENTS_PATH = path.join(__dirname, '..', '..', 'apps', 'web', 'app', 'components', 'dtg');
const PIPELINE_PATH = path.join(__dirname, '..');

console.log('🚀 Starting complete Magic files migration...\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
if (majorVersion < 22) {
  console.error('❌ Node.js 22+ is required for React Router 7. Current version:', nodeVersion);
  process.exit(1);
}

function getAllTSXFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other irrelevant directories
      if (!['node_modules', '.git', 'dist', 'build'].includes(item)) {
        getAllTSXFiles(fullPath, files);
      }
    } else if (item.endsWith('.tsx') && !item.startsWith('.')) {
      files.push({
        fullPath,
        relativePath: path.relative(MAGIC_SRC_PATH, fullPath),
        name: item,
        dir: path.relative(MAGIC_SRC_PATH, dir) || '.'
      });
    }
  }
  
  return files;
}

function processStage1MockRemoval(file) {
  const content = fs.readFileSync(file.fullPath, 'utf-8');
  let processed = content;

  // Remove mock data constants and imports
  processed = processed.replace(/const\s+mock[A-Za-z0-9_]+\s*[:=][^;]+;/g, '');
  processed = processed.replace(/import\s+.*mock.*from.*['"][^'"]*['"];?/g, '');
  processed = processed.replace(/\/\*\s*Mock\s+data[\s\S]*?\*\//gi, '');
  processed = processed.replace(/\/\/\s*Mock\s+data.*/gi, '');
  processed = processed.replace(/\/\/\s*TODO:\s*Replace.*mock.*/gi, '');
  
  // Clean up empty lines
  processed = processed.replace(/\n\n\n+/g, '\n\n');
  
  return processed;
}

function processStage2RR7Conversion(file, content) {
  let processed = content;

  // Convert to React Router 7 format
  processed = processed.replace(/import.*react-router-dom.*/g, '');
  
  // Add proper React Router 7 imports
  if (!processed.includes("import type { Route }")) {
    processed = `import type { Route } from './+types/route';\n${processed}`;
  }
  
  if (!processed.includes("from 'react-router'")) {
    processed = processed.replace(
      /import React[^;]*;/,
      `$&\nimport { json, useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';`
    );
  }

  // Add Supabase server client import if not present
  if (!processed.includes("getSupabaseServerClient")) {
    processed = processed.replace(
      /import { json[^}]*} from 'react-router';/,
      `$&\nimport { getSupabaseServerClient } from '@kit/supabase/server-client';`
    );
  }

  // Convert function exports to default exports
  if (processed.includes('export function') && !processed.includes('export default')) {
    const functionMatch = processed.match(/export function (\w+)/);
    if (functionMatch) {
      const functionName = functionMatch[1];
      processed = processed.replace(
        `export function ${functionName}`,
        `export default function ${functionName}`
      );
    }
  }

  // Add loader function if missing
  if (!processed.includes('export async function loader')) {
    const loaderFunction = `
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {
    const { data: items, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching data:', error);
    }

    return json({
      items: items || []
    }, { headers });
  } catch (error) {
    console.error('Loader error:', error);
    return json({
      items: []
    }, { headers });
  }
}`;
    processed += loaderFunction;
  }

  // Add ErrorBoundary if missing
  if (!processed.includes('export function ErrorBoundary')) {
    const errorBoundary = `
export function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600">{error.status}</h1>
          <h2 className="text-xl font-semibold mt-2">{error.statusText}</h2>
          <p className="text-gray-600 mt-4">{error.data}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600 mt-4">Something went wrong</p>
        <p className="text-sm text-gray-500 mt-2">{error?.message}</p>
      </div>
    </div>
  );
}`;
    processed += errorBoundary;
  }

  return processed;
}

function processStage3Validation(content) {
  let processed = content;

  // Fix common import issues
  processed = processed.replace(/import.*react-router-dom.*/g, '');
  
  // Fix component imports to use DTG components
  processed = processed.replace(
    /from ['"]\.\.\/components\/([^'"]+)['"]/g, 
    "from '@/components/dtg/$1'"
  );

  // Add Layout import if component uses layout
  if (processed.includes('<Layout>') && !processed.includes("import { Layout }")) {
    processed = processed.replace(
      /import { getSupabaseServerClient }.*$/m,
      `$&\nimport { Layout } from '@/components/dtg/Layout';`
    );
  }

  // Clean up duplicate imports
  const lines = processed.split('\n');
  const imports = new Set();
  const cleanedLines = lines.filter(line => {
    if (line.startsWith('import ') && line.includes('react-router-dom')) {
      return false;
    }
    if (line.startsWith('import ')) {
      if (imports.has(line)) {
        return false;
      }
      imports.add(line);
    }
    return true;
  });

  return cleanedLines.join('\n');
}

function determineFileDestination(file) {
  const relativePath = file.relativePath;
  
  // Handle pages
  if (relativePath.startsWith('pages/')) {
    return {
      type: 'page',
      destination: path.join(ROUTES_PAGES_PATH, relativePath.replace('pages/', ''))
    };
  }
  
  // Handle components  
  if (relativePath.startsWith('components/')) {
    return {
      type: 'component', 
      destination: path.join(COMPONENTS_PATH, relativePath.replace('components/', ''))
    };
  }

  // Default to pages for root files
  if (file.dir === '.') {
    return {
      type: 'page',
      destination: path.join(ROUTES_PAGES_PATH, file.name)
    };
  }

  // Other files go to components
  return {
    type: 'component',
    destination: path.join(COMPONENTS_PATH, relativePath)
  };
}

async function processAllFiles() {
  console.log('📂 Discovering all TSX files...');
  const allFiles = getAllTSXFiles(MAGIC_SRC_PATH);
  
  console.log(`Found ${allFiles.length} TSX files to process\n`);
  
  let processedCount = 0;
  let pageCount = 0;
  let componentCount = 0;

  for (const file of allFiles) {
    console.log(`Processing: ${file.relativePath}`);
    
    try {
      // Stage 1: Remove mock data
      let content = processStage1MockRemoval(file);
      
      // Stage 2: Convert to React Router 7
      content = processStage2RR7Conversion(file, content);
      
      // Stage 3: Validation and cleanup  
      content = processStage3Validation(content);
      
      // Stage 4: Route integration - determine destination
      const destination = determineFileDestination(file);
      
      // Create destination directory
      const destDir = path.dirname(destination.destination);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      // Write processed file
      fs.writeFileSync(destination.destination, content);
      
      processedCount++;
      if (destination.type === 'page') {
        pageCount++;
      } else {
        componentCount++;
      }
      
      console.log(`✅ ${destination.type}: ${path.relative(process.cwd(), destination.destination)}`);
      
    } catch (error) {
      console.error(`❌ Failed to process ${file.relativePath}: ${error.message}`);
    }
  }

  console.log(`\n🎉 Migration completed!`);
  console.log(`📊 Results:`);
  console.log(`   • Total files processed: ${processedCount}`);
  console.log(`   • Pages: ${pageCount}`);
  console.log(`   • Components: ${componentCount}`);
  
  return { processedCount, pageCount, componentCount };
}

async function main() {
  try {
    const results = await processAllFiles();
    
    console.log('\n📋 Next steps:');
    console.log('   1. Update routes.ts with all page routes');
    console.log('   2. Verify component imports');
    console.log('   3. Run TypeScript validation');
    console.log('   4. Start development server');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}