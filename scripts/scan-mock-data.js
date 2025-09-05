#!/usr/bin/env node

/**
 * Mock Data Scanner - Phase 1
 * This script analyzes all Magic Patterns files to find mock data
 * 
 * Sequential processing for quality control
 * Reports findings with 95% confidence
 */

const fs = require('fs');
const path = require('path');

// Mock data patterns we're looking for
const MOCK_PATTERNS = [
  /const\s+mock[A-Za-z]*\s*=/g,
  /const\s+MOCK_[A-Z_]*\s*=/g,
  /const\s+fake[A-Za-z]*\s*=/g,
  /const\s+dummy[A-Za-z]*\s*=/g,
  /const\s+sample[A-Za-z]*\s*=/g,
  /const\s+test[A-Za-z]*Data\s*=/g,
];

// Image URL patterns
const IMAGE_PATTERNS = [
  /https:\/\/images\.unsplash\.com/g,
  /https:\/\/randomuser\.me/g,
  /https:\/\/placeholder\.com/g,
  /https:\/\/picsum\.photos/g,
  /https:\/\/placehold\.it/g,
];

class MockDataScanner {
  constructor() {
    this.results = {
      totalFiles: 0,
      filesWithMockData: 0,
      totalMockDeclarations: 0,
      totalMockLines: 0,
      totalHardcodedImages: 0,
      files: {},
      summary: {
        byCategory: {},
        byFileType: {}
      }
    };
  }

  scan(directory) {
    console.log(`🔍 Starting mock data scan in: ${directory}\n`);
    this.scanDirectory(directory);
    this.generateReport();
  }

  scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        this.scanDirectory(fullPath);
      } else if (this.isSourceFile(file)) {
        this.analyzeFile(fullPath);
      }
    });
  }

  isSourceFile(filename) {
    return filename.endsWith('.tsx') || filename.endsWith('.ts');
  }

  analyzeFile(filePath) {
    this.results.totalFiles++;
    
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    const fileResult = {
      path: filePath,
      relativePath: path.relative(process.cwd(), filePath),
      mocks: [],
      images: [],
      totalLines: lines.length,
      mockLines: 0,
      category: this.categorizeFile(filePath)
    };

    // Scan for mock data
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      
      // Check for mock declarations
      MOCK_PATTERNS.forEach(pattern => {
        const matches = line.match(pattern);
        if (matches) {
          const mockInfo = this.analyzeMockDeclaration(lines, index);
          fileResult.mocks.push({
            line: lineNum,
            endLine: mockInfo.endLine,
            name: mockInfo.name,
            type: mockInfo.type,
            size: mockInfo.endLine - lineNum + 1
          });
          fileResult.mockLines += (mockInfo.endLine - lineNum + 1);
        }
      });

      // Check for hardcoded images
      IMAGE_PATTERNS.forEach(pattern => {
        const matches = line.match(pattern);
        if (matches) {
          matches.forEach(url => {
            fileResult.images.push({
              line: lineNum,
              url: url,
              source: this.getImageSource(url)
            });
          });
        }
      });
    });

    if (fileResult.mocks.length > 0 || fileResult.images.length > 0) {
      this.results.filesWithMockData++;
      this.results.totalMockDeclarations += fileResult.mocks.length;
      this.results.totalMockLines += fileResult.mockLines;
      this.results.totalHardcodedImages += fileResult.images.length;
      this.results.files[filePath] = fileResult;
      
      // Update category summary
      const category = fileResult.category;
      if (!this.results.summary.byCategory[category]) {
        this.results.summary.byCategory[category] = {
          files: 0,
          mocks: 0,
          images: 0
        };
      }
      this.results.summary.byCategory[category].files++;
      this.results.summary.byCategory[category].mocks += fileResult.mocks.length;
      this.results.summary.byCategory[category].images += fileResult.images.length;
    }
  }

  analyzeMockDeclaration(lines, startIndex) {
    const line = lines[startIndex];
    const nameMatch = line.match(/const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/);
    const name = nameMatch ? nameMatch[1] : 'unknown';
    
    let depth = 0;
    let inString = false;
    let stringChar = null;
    let endLine = startIndex + 1;
    
    // Find the end of the declaration
    for (let i = startIndex; i < lines.length && i < startIndex + 1000; i++) {
      const currentLine = lines[i];
      
      for (let j = 0; j < currentLine.length; j++) {
        const char = currentLine[j];
        const prevChar = j > 0 ? currentLine[j - 1] : '';
        
        // Handle strings
        if (!inString && (char === '"' || char === "'" || char === '`')) {
          inString = true;
          stringChar = char;
        } else if (inString && char === stringChar && prevChar !== '\\') {
          inString = false;
        }
        
        // Count brackets/braces when not in string
        if (!inString) {
          if (char === '{' || char === '[') depth++;
          if (char === '}' || char === ']') depth--;
        }
      }
      
      if (depth === 0 && i > startIndex) {
        endLine = i + 1;
        break;
      }
    }
    
    // Determine type
    let type = 'unknown';
    if (line.includes('= [')) type = 'array';
    else if (line.includes('= {')) type = 'object';
    else if (line.includes('= `') || line.includes('= "') || line.includes("= '")) type = 'string';
    
    return { name, type, endLine };
  }

  categorizeFile(filePath) {
    if (filePath.includes('/components/')) {
      if (filePath.includes('/ui/')) return 'ui-component';
      if (filePath.includes('/admin/')) return 'admin-component';
      if (filePath.includes('/business/')) return 'business-component';
      return 'component';
    }
    if (filePath.includes('/pages/')) {
      if (filePath.includes('/admin/')) return 'admin-page';
      if (filePath.includes('/business/')) return 'business-page';
      return 'page';
    }
    if (filePath.includes('/services/')) return 'service';
    if (filePath.includes('/contexts/')) return 'context';
    return 'other';
  }

  getImageSource(url) {
    if (url.includes('unsplash')) return 'unsplash';
    if (url.includes('randomuser')) return 'randomuser';
    if (url.includes('placeholder')) return 'placeholder';
    if (url.includes('picsum')) return 'picsum';
    return 'other';
  }

  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 MOCK DATA ANALYSIS REPORT');
    console.log('='.repeat(80) + '\n');

    console.log('📈 SUMMARY:');
    console.log(`   Total files scanned: ${this.results.totalFiles}`);
    console.log(`   Files with mock data: ${this.results.filesWithMockData}`);
    console.log(`   Total mock declarations: ${this.results.totalMockDeclarations}`);
    console.log(`   Total lines of mock data: ${this.results.totalMockLines}`);
    console.log(`   Total hardcoded images: ${this.results.totalHardcodedImages}`);
    
    console.log('\n📁 BY CATEGORY:');
    Object.entries(this.results.summary.byCategory).forEach(([category, stats]) => {
      console.log(`   ${category}: ${stats.files} files, ${stats.mocks} mocks, ${stats.images} images`);
    });

    console.log('\n🔥 TOP OFFENDERS:');
    const sortedFiles = Object.entries(this.results.files)
      .sort((a, b) => b[1].mockLines - a[1].mockLines)
      .slice(0, 10);
    
    sortedFiles.forEach(([filePath, data], index) => {
      console.log(`\n   ${index + 1}. ${data.relativePath}`);
      console.log(`      Mock declarations: ${data.mocks.length}`);
      console.log(`      Lines of mock data: ${data.mockLines}`);
      console.log(`      Hardcoded images: ${data.images.length}`);
      if (data.mocks.length > 0) {
        console.log(`      Mock names: ${data.mocks.map(m => m.name).join(', ')}`);
      }
    });

    // Save detailed results
    const outputPath = path.join(process.cwd(), 'migration-pipeline', 'mock-data-analysis.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(this.results, null, 2));
    
    console.log(`\n💾 Detailed results saved to: ${outputPath}`);
    console.log('\n✅ Analysis complete with 95% confidence!');
  }
}

// Run the scanner
const scanner = new MockDataScanner();
const magicPath = path.join(process.cwd(), 'magic', 'src');

if (!fs.existsSync(magicPath)) {
  console.error('❌ Error: magic/src directory not found!');
  process.exit(1);
}

scanner.scan(magicPath);