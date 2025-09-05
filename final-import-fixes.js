const fs = require('fs');
const path = require('path');
const glob = require('glob');

const pagesDir = '/Users/johnshine/Dropbox/Fibonacco/downtown-guide/Code/DTG/apps/web/app/routes/pages';

// Disable files that are trying to create custom routing
const filesToDisable = ['_app.tsx', '_document.tsx'];
filesToDisable.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath) && !fs.existsSync(`${filePath}.disabled`)) {
    fs.renameSync(filePath, `${filePath}.disabled`);
    console.log(`Disabled ${file}`);
  }
});

// Fix any remaining admin component imports
const adminFiles = glob.sync(`${pagesDir}/admin/**/*.tsx`);
adminFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Fix AdminSidebar import
  if (content.includes('AdminSidebar')) {
    content = content.replace(
      /import { AdminSidebar } from '\.\.\/\.\.\/components\/admin\/Sidebar'/g,
      "import { AdminSidebar } from '../../components/dtg/admin/Sidebar'"
    );
    changed = true;
  }

  // Fix other admin imports
  const adminComponents = [
    'UserManagement', 'BusinessManagement', 'ContentModeration',
    'Analytics', 'SystemHealth', 'BrandConfiguration'
  ];
  
  adminComponents.forEach(comp => {
    if (content.includes(comp)) {
      const pattern = new RegExp(`import { ${comp} } from '\\.\\.\\/\\.\\.\\/components\\/admin\\/${comp}'`, 'g');
      const replacement = `import { ${comp} } from '../../components/dtg/admin/${comp}'`;
      content = content.replace(pattern, replacement);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Fixed admin imports in ${path.basename(file)}`);
  }
});

// Fix layout.tsx if it exists
const layoutFile = path.join(pagesDir, 'layout.tsx');
if (fs.existsSync(layoutFile)) {
  let content = fs.readFileSync(layoutFile, 'utf8');
  
  // Add Outlet import if missing
  if (content.includes('<Outlet') && !content.includes('import { Outlet }')) {
    content = content.replace(
      /import type { Route } from '.\/\+types\/route';/,
      "import type { Route } from './+types/route';\nimport { Outlet } from 'react-router';"
    );
    fs.writeFileSync(layoutFile, content);
    console.log('Fixed layout.tsx');
  }
}

console.log('Final import fixes completed!');