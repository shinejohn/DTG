// This script can be run with: node scripts/analyze-bundle.js
const fs = require('fs');
const path = require('path');
// Simple function to count imports in a file
function countImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const importLines = content.split('\n').filter(line => line.trim().startsWith('import') && !line.includes('./') && !line.includes('../'));
    return {
      filePath: filePath.replace(process.cwd(), ''),
      externalImports: importLines.length,
      importLines
    };
  } catch (error) {
    return {
      filePath,
      externalImports: 0,
      importLines: []
    };
  }
}
// Function to walk directory and find all .js/.ts/.jsx/.tsx files
function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !file.startsWith('node_modules') && !file.startsWith('.')) {
      fileList = walkDir(filePath, fileList);
    } else if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx'))) {
      fileList.push(filePath);
    }
  });
  return fileList;
}
// Main function
function analyzeProject() {
  const sourceFiles = walkDir(process.cwd());
  const results = sourceFiles.map(countImports);
  // Sort by number of external imports
  results.sort((a, b) => b.externalImports - a.externalImports);
  console.log('\n=== Files with most external dependencies ===\n');
  results.slice(0, 10).forEach(result => {
    console.log(`${result.filePath}: ${result.externalImports} external imports`);
    result.importLines.forEach(line => console.log(`  ${line.trim()}`));
    console.log('');
  });
  // Count total external imports
  const totalImports = results.reduce((sum, result) => sum + result.externalImports, 0);
  console.log(`Total external imports across project: ${totalImports}`);
}
analyzeProject();