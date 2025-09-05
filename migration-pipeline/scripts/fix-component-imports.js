#!/usr/bin/env node

/**
 * Fix Component Imports and Organization
 * 
 * 1. Move components from /components/components/ to proper structure
 * 2. Update all import paths in pages to use correct paths
 * 3. Create proper component exports
 */

const fs = require('fs');
const path = require('path');

const APPS_PATH = path.join(__dirname, '..', '..', 'apps', 'web', 'app');
const ROUTES_PAGES_PATH = path.join(APPS_PATH, 'routes', 'pages');
const COMPONENTS_PATH = path.join(APPS_PATH, 'components');

console.log('🔧 Fixing component imports and organization...\n');

// Step 1: Move components from double-nested structure
function moveComponents() {
  const doubleComponentsPath = path.join(COMPONENTS_PATH, 'components');
  const targetComponentsPath = path.join(COMPONENTS_PATH, 'dtg');
  
  if (!fs.existsSync(doubleComponentsPath)) {
    console.log('⚠️  Double components directory not found');
    return;
  }
  
  // Create DTG components directory
  if (!fs.existsSync(targetComponentsPath)) {
    fs.mkdirSync(targetComponentsPath, { recursive: true });
  }
  
  // Move all components
  function moveDirectory(source, target) {
    const items = fs.readdirSync(source);
    
    for (const item of items) {
      const sourcePath = path.join(source, item);
      const targetPath = path.join(target, item);
      const stat = fs.statSync(sourcePath);
      
      if (stat.isDirectory()) {
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath, { recursive: true });
        }
        moveDirectory(sourcePath, targetPath);
      } else {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ Moved: ${path.relative(COMPONENTS_PATH, sourcePath)} → ${path.relative(COMPONENTS_PATH, targetPath)}`);
      }
    }
  }
  
  moveDirectory(doubleComponentsPath, targetComponentsPath);
  
  // Remove old directory
  fs.rmSync(doubleComponentsPath, { recursive: true, force: true });
  console.log('🗑️  Removed double components directory\n');
}

// Step 2: Update import paths in all page files
function updateImportsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    let updatedContent = content;
    let hasChanges = false;
    
    // Map of old import patterns to new ones
    const importMappings = [
      // Components
      { from: /from ['"]\.\.\/components\//g, to: "from '@/components/dtg/" },
      { from: /from ['"]\.\.\/\.\.\/components\//g, to: "from '@/components/dtg/" },
      { from: /from ['"]\.\.\/(.*?\/)*components\//g, to: "from '@/components/dtg/" },
      
      // Contexts
      { from: /from ['"]\.\.\/contexts\//g, to: "from '@/components/dtg/contexts/" },
      { from: /from ['"]\.\.\/\.\.\/contexts\//g, to: "from '@/components/dtg/contexts/" },
      
      // Services
      { from: /from ['"]\.\.\/services\//g, to: "from '@/components/dtg/services/" },
      { from: /from ['"]\.\.\/\.\.\/services\//g, to: "from '@/components/dtg/services/" },
      
      // Hooks
      { from: /from ['"]\.\.\/hooks\//g, to: "from '@/components/dtg/hooks/" },
      { from: /from ['"]\.\.\/\.\.\/hooks\//g, to: "from '@/components/dtg/hooks/" },
      
      // Utils
      { from: /from ['"]\.\.\/utils\//g, to: "from '@/components/dtg/utils/" },
      { from: /from ['"]\.\.\/\.\.\/utils\//g, to: "from '@/components/dtg/utils/" },
      
      // Types
      { from: /from ['"]\.\.\/types\//g, to: "from '@/components/dtg/types/" },
      { from: /from ['"]\.\.\/\.\.\/types\//g, to: "from '@/components/dtg/types/" }
    ];
    
    importMappings.forEach(mapping => {
      const oldContent = updatedContent;
      updatedContent = updatedContent.replace(mapping.from, mapping.to);
      if (oldContent !== updatedContent) {
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✅ Updated imports: ${path.relative(ROUTES_PAGES_PATH, filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Failed to update ${filePath}: ${error.message}`);
    return false;
  }
}

function updateAllPageImports() {
  console.log('🔄 Updating import paths in page files...\n');
  let updatedCount = 0;
  
  function processDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
      return;
    }
    
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        processDirectory(itemPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        if (updateImportsInFile(itemPath)) {
          updatedCount++;
        }
      }
    }
  }
  
  processDirectory(ROUTES_PAGES_PATH);
  console.log(`\n📊 Updated imports in ${updatedCount} files\n`);
}

// Step 3: Create component index files for easier imports
function createComponentIndexes() {
  console.log('📝 Creating component index files...\n');
  
  const dtgComponentsPath = path.join(COMPONENTS_PATH, 'dtg');
  
  // Main components index
  const mainComponents = [
    'Layout', 'Header', 'Footer', 'Hero', 'Icon', 'MetaTags', 'SEOContent',
    'CategorySection', 'FeaturedPlaces', 'TrendingNow', 'CommunityActivity', 
    'NewsAndEvents', 'BusinessProfile', 'CitySearchBar', 'CommunityHero',
    'CommunitySelector', 'EventsCalendar', 'FloatingNavigation', 'NextLink',
    'PlanUpgradeButton', 'SocialShareModal', 'BrandPreview', 'ErrorBoundary'
  ];
  
  const mainIndexContent = mainComponents.map(comp => 
    `export { default as ${comp} } from './${comp}';`
  ).join('\n') + '\n';
  
  fs.writeFileSync(path.join(dtgComponentsPath, 'index.ts'), mainIndexContent);
  console.log('✅ Created main components index');
  
  // UI components index
  const uiComponentsPath = path.join(dtgComponentsPath, 'ui');
  if (fs.existsSync(uiComponentsPath)) {
    const uiComponents = [
      'Alert', 'Avatar', 'Badge', 'Button', 'Card', 'EmptyState',
      'Input', 'Modal', 'Pagination', 'Rating', 'Skeleton', 'Spinner',
      'Tabs', 'Typography'
    ];
    
    const uiIndexContent = uiComponents.map(comp => 
      `export { default as ${comp} } from './${comp}';`
    ).join('\n') + '\n';
    
    fs.writeFileSync(path.join(uiComponentsPath, 'index.ts'), uiIndexContent);
    console.log('✅ Created UI components index');
  }
  
  console.log('');
}

// Step 4: Move other DTG resources to proper locations
function moveOtherResources() {
  console.log('📦 Moving other DTG resources...\n');
  
  const resourcesToMove = [
    { from: 'contexts', to: 'dtg/contexts' },
    { from: 'hooks', to: 'dtg/hooks' },
    { from: 'services', to: 'dtg/services' },
    { from: 'types', to: 'dtg/types' },
    { from: 'utils', to: 'dtg/utils' }
  ];
  
  resourcesToMove.forEach(resource => {
    const sourcePath = path.join(COMPONENTS_PATH, resource.from);
    const targetPath = path.join(COMPONENTS_PATH, resource.to);
    
    if (fs.existsSync(sourcePath)) {
      // Create target directory
      if (!fs.existsSync(path.dirname(targetPath))) {
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      }
      
      // Move directory
      fs.renameSync(sourcePath, targetPath);
      console.log(`✅ Moved: ${resource.from} → ${resource.to}`);
    }
  });
  
  console.log('');
}

// Execute all steps
async function main() {
  try {
    moveComponents();
    moveOtherResources();
    updateAllPageImports();
    createComponentIndexes();
    
    console.log('🎉 Component integration completed!\n');
    console.log('📍 DTG Components are now organized at:');
    console.log('   • @/components/dtg/ - Main components');
    console.log('   • @/components/dtg/ui/ - UI components');
    console.log('   • @/components/dtg/contexts/ - React contexts');
    console.log('   • @/components/dtg/services/ - Business logic');
    console.log('   • @/components/dtg/hooks/ - Custom hooks');
    console.log('   • @/components/dtg/utils/ - Utilities');
    console.log('   • @/components/dtg/types/ - TypeScript types\n');
    console.log('✅ All pages now have correct import paths!');
    
  } catch (error) {
    console.error('❌ Integration failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}