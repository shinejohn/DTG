#!/usr/bin/env node

/**
 * Mock Data Removal Script
 * This script will help identify and remove mock data from all files
 */

const fs = require('fs');
const path = require('path');

const MOCK_PATTERNS = [
  /const\s+mock[A-Za-z]*\s*=\s*[\[\{]/g,
  /const\s+MOCK_[A-Z_]*\s*=\s*[\[\{]/g,
  /const\s+fake[A-Za-z]*\s*=\s*[\[\{]/g,
  /const\s+dummy[A-Za-z]*\s*=\s*[\[\{]/g,
  /const\s+sample[A-Za-z]*\s*=\s*[\[\{]/g,
  /const\s+test[A-Za-z]*Data\s*=\s*[\[\{]/g,
];

function findMockData(content) {
  const mocks = [];
  let lineNum = 0;
  
  content.split('\n').forEach((line, index) => {
    lineNum = index + 1;
    MOCK_PATTERNS.forEach(pattern => {
      if (pattern.test(line)) {
        // Find the end of this mock data block
        let endLine = findClosingBracket(content.split('\n'), index);
        mocks.push({
          line: lineNum,
          endLine: endLine + 1,
          content: line.trim().substring(0, 50) + '...'
        });
      }
    });
  });
  
  return mocks;
}

function findClosingBracket(lines, startIndex) {
  let depth = 0;
  let inString = false;
  let stringChar = null;
  
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      const prevChar = j > 0 ? line[j - 1] : '';
      
      // Handle strings
      if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
          stringChar = null;
        }
      }
      
      if (!inString) {
        if (char === '{' || char === '[') depth++;
        if (char === '}' || char === ']') depth--;
        
        if (depth === 0 && i > startIndex) {
          return i;
        }
      }
    }
  }
  
  return startIndex;
}

function scanDirectory(dirPath) {
  const results = {};
  
  function scan(currentPath) {
    const files = fs.readdirSync(currentPath);
    
    files.forEach(file => {
      const filePath = path.join(currentPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scan(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const mocks = findMockData(content);
        
        if (mocks.length > 0) {
          results[filePath] = mocks;
        }
      }
    });
  }
  
  scan(dirPath);
  return results;
}

// Main execution
const srcPath = path.join(__dirname, '../magic/src');
console.log('Scanning for mock data in:', srcPath);

const results = scanDirectory(srcPath);
const fileCount = Object.keys(results).length;
let totalMocks = 0;
let totalLines = 0;

// Generate report
console.log('\n=== Mock Data Report ===\n');

Object.entries(results)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([file, mocks]) => {
    const relPath = path.relative(srcPath, file);
    console.log(`\n${relPath}: ${mocks.length} mock data blocks`);
    mocks.forEach(mock => {
      console.log(`  Line ${mock.line}-${mock.endLine}: ${mock.content}`);
      totalLines += (mock.endLine - mock.line + 1);
    });
    totalMocks += mocks.length;
  });

console.log('\n=== Summary ===');
console.log(`Total files with mock data: ${fileCount}`);
console.log(`Total mock data blocks: ${totalMocks}`);
console.log(`Estimated lines of mock data: ${totalLines}`);
console.log(`\nTo remove mock data, run: npm run clean-mocks`);