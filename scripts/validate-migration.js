#!/usr/bin/env node

/**
 * React Router 7 Migration Validation Scanner
 * 
 * This script validates that a migrated file meets all requirements:
 * - No mock data remains
 * - React Router 7 patterns correctly implemented
 * - Supabase integration properly done
 * - TypeScript types are correct
 * - All required exports exist
 * 
 * Run with: node validate-migration.js <filepath>
 */

const fs = require('fs');
const path = require('path');

class MigrationValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = [];
    this.stats = {
      totalChecks: 0,
      passed: 0,
      failed: 0,
      warnings: 0
    };
  }

  /**
   * Main validation function
   */
  async validate(filePath) {
    console.log(`\n🔍 Validating React Router 7 Migration`);
    console.log(`📄 File: ${path.basename(filePath)}`);
    console.log('='.repeat(60));

    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);

    // Run all validation checks
    this.checkNoMockData(content);
    this.checkReactRouter7Imports(content);
    this.checkLoaderFunction(content);
    this.checkSupabaseIntegration(content);
    this.checkTypeScriptTypes(content);
    this.checkComponentStructure(content);
    this.checkErrorHandling(content);
    this.checkDataUsage(content);
    this.checkNoClientSideDataFetching(content);
    this.checkExports(content);
    this.checkBestPractices(content);

    // Generate report
    this.generateReport(fileName);

    return this.errors.length === 0;
  }

  /**
   * Check 1: No mock data remains (with detailed extraction)
   */
  checkNoMockData(content) {
    console.log('\n📋 Checking for mock data...');
    
    const mockPatterns = [
      { pattern: /const\s+mock[A-Za-z]*\s*=\s*[\[\{`"']/gi, type: 'mock' },
      { pattern: /const\s+MOCK_[A-Z_]*\s*=\s*[\[\{`"']/gi, type: 'MOCK' },
      { pattern: /const\s+fake[A-Za-z]*\s*=\s*[\[\{`"']/gi, type: 'fake' },
      { pattern: /const\s+dummy[A-Za-z]*\s*=\s*[\[\{`"']/gi, type: 'dummy' },
      { pattern: /const\s+sample[A-Za-z]*\s*=\s*[\[\{`"']/gi, type: 'sample' },
      { pattern: /const\s+test[A-Za-z]*Data\s*=\s*[\[\{`"']/gi, type: 'testData' }
    ];

    const imagePatterns = [
      /https:\/\/images\.unsplash\.com[^\s'"`;]*/g,
      /https:\/\/randomuser\.me[^\s'"`;]*/g,
      /https:\/\/placeholder\.com[^\s'"`;]*/g,
      /https:\/\/picsum\.photos[^\s'"`;]*/g,
      /https:\/\/placehold\.it[^\s'"`;]*/g,
      /https:\/\/i\.pravatar\.cc[^\s'"`;]*/g
    ];

    let mockDataFound = [];
    let hardcodedImages = [];

    // Extract mock data with line numbers and content
    mockPatterns.forEach(({ pattern, type }) => {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);
      while ((match = regex.exec(content)) !== null) {
        const lineNum = content.substring(0, match.index).split('\n').length;
        const variableName = this.extractVariableName(match[0]);
        const mockContent = this.extractMockContent(content, match.index);
        
        // Skip if it's in a comment or TODO
        const lineStart = content.lastIndexOf('\n', match.index) + 1;
        const lineEnd = content.indexOf('\n', match.index);
        const line = content.substring(lineStart, lineEnd);
        
        if (!line.includes('//') || line.indexOf('//') > match.index - lineStart) {
          mockDataFound.push({
            type,
            line: lineNum,
            variable: variableName,
            preview: mockContent.substring(0, 100) + '...',
            fullMatch: match[0]
          });
        }
      }
    });

    // Extract hardcoded images with context
    imagePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const lineNum = content.substring(0, match.index).split('\n').length;
        const url = match[0];
        const context = this.getImageContext(content, match.index);
        
        hardcodedImages.push({
          url,
          line: lineNum,
          context: context.substring(0, 50) + '...',
          source: this.getImageSource(url)
        });
      }
    });

    // Check for hardcoded data in useState
    const useStatePattern = /useState\s*\(\s*(\[[\s\S]*?\]|\{[\s\S]*?\})\s*\)/g;
    let match;
    while ((match = useStatePattern.exec(content)) !== null) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      const initialValue = match[1];
      
      // Check if it's not just empty array/object
      if (initialValue.length > 4 && !initialValue.match(/^\[\s*\]$|^\{\s*\}$/)) {
        mockDataFound.push({
          type: 'useState with data',
          line: lineNum,
          variable: 'useState initial value',
          preview: initialValue.substring(0, 50) + '...',
          fullMatch: match[0].substring(0, 80) + '...'
        });
      }
    }

    // Report findings
    if (mockDataFound.length > 0) {
      console.log('\n❌ Mock Data Found:');
      mockDataFound.forEach(item => {
        console.log(`   Line ${item.line}: ${item.type} - ${item.variable}`);
        console.log(`     Preview: ${item.preview}`);
      });
      mockDataFound.forEach(item => {
        this.addError(`Mock data at line ${item.line}: ${item.variable} (${item.type})`);
      });
    }

    if (hardcodedImages.length > 0) {
      console.log('\n⚠️  Hardcoded Images Found:');
      hardcodedImages.forEach(item => {
        console.log(`   Line ${item.line}: ${item.source} - ${item.url}`);
      });
      hardcodedImages.forEach(item => {
        this.addWarning(`Hardcoded image at line ${item.line}: ${item.source}`);
      });
    }

    if (mockDataFound.length === 0 && hardcodedImages.length === 0) {
      this.addPassed('No mock data found');
    }

    // Store detailed findings for report
    this.mockDataDetails = {
      mockData: mockDataFound,
      hardcodedImages: hardcodedImages
    };
  }

  /**
   * Helper: Extract variable name from declaration
   */
  extractVariableName(declaration) {
    const match = declaration.match(/const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/);
    return match ? match[1] : 'unknown';
  }

  /**
   * Helper: Extract mock content
   */
  extractMockContent(content, startIndex) {
    let depth = 0;
    let inString = false;
    let stringChar = null;
    let endIndex = startIndex;

    for (let i = startIndex; i < content.length && i < startIndex + 500; i++) {
      const char = content[i];
      const prevChar = i > 0 ? content[i - 1] : '';

      // Handle strings
      if (!inString && (char === '"' || char === "'" || char === '`')) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar && prevChar !== '\\') {
        inString = false;
      }

      // Count brackets when not in string
      if (!inString) {
        if (char === '{' || char === '[') depth++;
        if (char === '}' || char === ']') depth--;
        if (depth === 0 && char === ';') {
          endIndex = i;
          break;
        }
      }
    }

    return content.substring(startIndex, endIndex + 1);
  }

  /**
   * Helper: Get image context
   */
  getImageContext(content, index) {
    const start = Math.max(0, index - 30);
    const end = Math.min(content.length, index + 50);
    return content.substring(start, end).replace(/\n/g, ' ');
  }

  /**
   * Helper: Get image source name
   */
  getImageSource(url) {
    if (url.includes('unsplash')) return 'Unsplash';
    if (url.includes('randomuser')) return 'RandomUser';
    if (url.includes('pravatar')) return 'Pravatar';
    if (url.includes('placeholder')) return 'Placeholder';
    if (url.includes('picsum')) return 'Picsum';
    return 'Other';
  }

  /**
   * Check 2: React Router 7 imports
   */
  checkReactRouter7Imports(content) {
    console.log('\n📋 Checking React Router 7 imports...');

    const requiredImports = [
      { pattern: /import.*\{.*useLoaderData.*\}.*from\s+['"]react-router['"]/, name: 'useLoaderData' },
      { pattern: /import.*type.*\{.*Route.*\}.*from/, name: 'Route types' }
    ];

    const optionalImports = [
      { pattern: /import.*\{.*json.*\}.*from\s+['"]react-router['"]/, name: 'json helper' },
      { pattern: /import.*\{.*useNavigate.*\}.*from\s+['"]react-router['"]/, name: 'useNavigate' },
      { pattern: /import.*\{.*Link.*\}.*from\s+['"]react-router['"]/, name: 'Link component' }
    ];

    requiredImports.forEach(imp => {
      if (imp.pattern.test(content)) {
        this.addPassed(`Required import found: ${imp.name}`);
      } else {
        this.addError(`Missing required import: ${imp.name}`);
      }
    });

    optionalImports.forEach(imp => {
      if (!imp.pattern.test(content)) {
        this.addWarning(`Consider importing: ${imp.name}`);
      }
    });
  }

  /**
   * Check 3: Loader function
   */
  checkLoaderFunction(content) {
    console.log('\n📋 Checking loader function...');

    // Check if loader exists
    const loaderPattern = /export\s+async\s+function\s+loader/;
    if (!loaderPattern.test(content)) {
      this.addError('Missing loader function export');
      return;
    }

    this.addPassed('Loader function found');

    // Check loader parameters
    const loaderParamsPattern = /loader\s*\(\s*\{[^}]*?(params|request)[^}]*?\}\s*:\s*Route\.(LoaderArgs|args)/;
    if (loaderParamsPattern.test(content)) {
      this.addPassed('Loader has correct parameters');
    } else {
      this.addError('Loader missing proper Route.LoaderArgs parameter');
    }

    // Check if loader returns data
    const returnPattern = /return\s+(json\(|{)/;
    if (returnPattern.test(content)) {
      this.addPassed('Loader returns data');
    } else {
      this.addWarning('Loader might not be returning data properly');
    }

    // Check for headers in response
    const headersPattern = /\{\s*headers\s*\}/;
    if (headersPattern.test(content)) {
      this.addPassed('Loader includes headers in response');
    }
  }

  /**
   * Check 4: Supabase integration
   */
  checkSupabaseIntegration(content) {
    console.log('\n📋 Checking Supabase integration...');

    // Check for Supabase client import
    const supabaseImportPattern = /import.*getSupabaseServerClient.*from/;
    if (!supabaseImportPattern.test(content)) {
      this.addWarning('Missing Supabase server client import');
      return;
    }

    this.addPassed('Supabase client import found');

    // Check for Supabase client usage
    const supabaseClientPattern = /getSupabaseServerClient\s*\(/;
    if (supabaseClientPattern.test(content)) {
      this.addPassed('Supabase client initialized');
    } else {
      this.addError('Supabase client not being used in loader');
    }

    // Check for actual queries
    const queryPatterns = [
      /supabase\s*\.from\s*\(/,
      /\.select\s*\(/,
      /\.insert\s*\(/,
      /\.update\s*\(/,
      /\.delete\s*\(/
    ];

    let hasQueries = false;
    queryPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        hasQueries = true;
      }
    });

    if (hasQueries) {
      this.addPassed('Supabase queries found');
    } else {
      this.addWarning('No Supabase queries found - ensure data is being fetched');
    }

    // Check for error handling
    const errorHandlingPattern = /\{\s*data[^,]*,\s*error[^}]*\}/;
    if (errorHandlingPattern.test(content)) {
      this.addPassed('Supabase error handling present');
    } else {
      this.addWarning('Consider destructuring error from Supabase queries');
    }
  }

  /**
   * Check 5: TypeScript types
   */
  checkTypeScriptTypes(content) {
    console.log('\n📋 Checking TypeScript types...');

    // Check for interface definitions
    const interfacePattern = /interface\s+\w+\s*{/g;
    const typePattern = /type\s+\w+\s*=/g;
    
    const interfaces = content.match(interfacePattern) || [];
    const types = content.match(typePattern) || [];

    if (interfaces.length > 0 || types.length > 0) {
      this.addPassed(`Found ${interfaces.length} interfaces and ${types.length} type definitions`);
    } else {
      this.addWarning('No TypeScript interfaces or types defined');
    }

    // Check for typed loader
    const typedLoaderPattern = /useLoaderData<typeof\s+loader>/;
    if (typedLoaderPattern.test(content)) {
      this.addPassed('useLoaderData is properly typed');
    } else {
      this.addWarning('Consider typing useLoaderData with <typeof loader>');
    }

    // Check for any 'any' types
    const anyPattern = /:\s*any(?:\s|;|,|\))/g;
    const anyMatches = content.match(anyPattern) || [];
    if (anyMatches.length > 0) {
      this.addWarning(`Found ${anyMatches.length} uses of 'any' type - consider using specific types`);
    }
  }

  /**
   * Check 6: Component structure
   */
  checkComponentStructure(content) {
    console.log('\n📋 Checking component structure...');

    // Check for default export or named component
    const defaultExportPattern = /export\s+default\s+function\s+\w+/;
    const namedExportPattern = /export\s+function\s+\w+/;

    if (defaultExportPattern.test(content) || namedExportPattern.test(content)) {
      this.addPassed('Component properly exported');
    } else {
      this.addError('No component export found');
    }

    // Check if component uses loader data
    const loaderDataUsagePattern = /useLoaderData\s*\(/;
    if (loaderDataUsagePattern.test(content)) {
      this.addPassed('Component uses loader data');
    } else {
      this.addError('Component not using useLoaderData hook');
    }
  }

  /**
   * Check 7: Error handling
   */
  checkErrorHandling(content) {
    console.log('\n📋 Checking error handling...');

    // Check for try-catch in loader
    const tryCatchPattern = /try\s*{[\s\S]*?}\s*catch/;
    if (tryCatchPattern.test(content)) {
      this.addPassed('Try-catch error handling found');
    } else {
      this.addWarning('Consider adding try-catch error handling in loader');
    }

    // Check for error boundary export
    const errorBoundaryPattern = /export\s+function\s+ErrorBoundary/;
    if (errorBoundaryPattern.test(content)) {
      this.addPassed('ErrorBoundary component exported');
    } else {
      this.addWarning('Consider adding ErrorBoundary export for better error handling');
    }

    // Check for loading states
    const loadingPattern = /loading|isLoading|pending/i;
    if (loadingPattern.test(content)) {
      this.addPassed('Loading state handling found');
    }
  }

  /**
   * Check 8: Data usage patterns
   */
  checkDataUsage(content) {
    console.log('\n📋 Checking data usage patterns...');

    // Check for proper destructuring of loader data
    const destructuringPattern = /const\s*\{[^}]+\}\s*=\s*useLoaderData/;
    if (destructuringPattern.test(content)) {
      this.addPassed('Loader data properly destructured');
    }

    // Check for null/undefined checks
    const nullCheckPatterns = [
      /\?\./g,  // Optional chaining
      /\|\|/g,  // OR operator
      /\?\?/g   // Nullish coalescing
    ];

    let hasNullChecks = false;
    nullCheckPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        hasNullChecks = true;
      }
    });

    if (hasNullChecks) {
      this.addPassed('Null/undefined safety checks found');
    } else {
      this.addWarning('Consider adding null/undefined checks for data');
    }
  }

  /**
   * Check 9: No client-side data fetching
   */
  checkNoClientSideDataFetching(content) {
    console.log('\n📋 Checking for client-side data fetching...');

    // Check for useEffect with fetch
    const useEffectFetchPattern = /useEffect\s*\([^)]*\s*(fetch|axios|supabase)/;
    if (useEffectFetchPattern.test(content)) {
      this.addError('Client-side data fetching found in useEffect - move to loader');
    }

    // Check for useState with empty initial state (often used for fetched data)
    const suspiciousUseStatePattern = /useState\s*\(\s*(null|undefined|\[\]|\{\})\s*\)/g;
    const matches = content.match(suspiciousUseStatePattern) || [];
    if (matches.length > 2) {
      this.addWarning(`Found ${matches.length} useState with empty initial values - verify these aren't for server data`);
    }

    if (!useEffectFetchPattern.test(content)) {
      this.addPassed('No client-side data fetching detected');
    }
  }

  /**
   * Check 10: Required exports
   */
  checkExports(content) {
    console.log('\n📋 Checking exports...');

    const exports = {
      'loader': /export\s+(async\s+)?function\s+loader/,
      'Component': /export\s+(default\s+)?function\s+\w+/,
      'action': /export\s+(async\s+)?function\s+action/,
      'meta': /export\s+function\s+meta/
    };

    let hasRequiredExports = false;
    Object.entries(exports).forEach(([name, pattern]) => {
      if (pattern.test(content)) {
        this.addPassed(`${name} export found`);
        if (name === 'loader' || name === 'Component') {
          hasRequiredExports = true;
        }
      } else if (name === 'loader' || name === 'Component') {
        this.addError(`Missing required export: ${name}`);
      }
    });

    if (!hasRequiredExports) {
      this.addError('Missing required exports (loader and/or component)');
    }
  }

  /**
   * Check 11: Best practices
   */
  checkBestPractices(content) {
    console.log('\n📋 Checking best practices...');

    // Check for console.log statements
    const consoleLogPattern = /console\.(log|error|warn)/g;
    const consoleLogs = content.match(consoleLogPattern) || [];
    if (consoleLogs.length > 0) {
      this.addWarning(`Found ${consoleLogs.length} console statements - consider removing for production`);
    }

    // Check for TODO comments
    const todoPattern = /\/\/\s*TODO|\/\*\s*TODO/gi;
    const todos = content.match(todoPattern) || [];
    if (todos.length > 0) {
      this.addWarning(`Found ${todos.length} TODO comments - complete before production`);
    }

    // Check for proper imports organization
    const importLines = content.split('\n').filter(line => line.trim().startsWith('import'));
    if (importLines.length > 0) {
      this.addPassed('Imports are organized');
    }
  }

  /**
   * Helper methods
   */
  addError(message) {
    this.errors.push(message);
    this.stats.totalChecks++;
    this.stats.failed++;
  }

  addWarning(message) {
    this.warnings.push(message);
    this.stats.totalChecks++;
    this.stats.warnings++;
  }

  addPassed(message) {
    this.passed.push(message);
    this.stats.totalChecks++;
    this.stats.passed++;
  }

  /**
   * Generate final report
   */
  generateReport(fileName) {
    console.log('\n' + '='.repeat(60));
    console.log('📊 VALIDATION REPORT');
    console.log('='.repeat(60));

    if (this.passed.length > 0) {
      console.log('\n✅ PASSED CHECKS:');
      this.passed.forEach(msg => console.log(`   ✓ ${msg}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(msg => console.log(`   ⚠ ${msg}`));
    }

    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errors.forEach(msg => console.log(`   ✗ ${msg}`));
    }

    console.log('\n📈 SUMMARY:');
    console.log(`   Total Checks: ${this.stats.totalChecks}`);
    console.log(`   Passed: ${this.stats.passed} (${Math.round(this.stats.passed/this.stats.totalChecks*100)}%)`);
    console.log(`   Warnings: ${this.stats.warnings}`);
    console.log(`   Errors: ${this.stats.failed}`);

    console.log('\n🏁 RESULT:');
    if (this.errors.length === 0) {
      console.log('   ✅ VALIDATION PASSED! File is ready for production.');
    } else {
      console.log('   ❌ VALIDATION FAILED! Fix errors before proceeding.');
    }
    console.log('='.repeat(60) + '\n');

    // Save detailed report
    const reportPath = path.join(process.cwd(), 'migration-pipeline', 'validation-report.json');
    const report = {
      file: fileName,
      timestamp: new Date().toISOString(),
      stats: this.stats,
      passed: this.passed,
      warnings: this.warnings,
      errors: this.errors,
      status: this.errors.length === 0 ? 'PASSED' : 'FAILED'
    };

    try {
      fs.mkdirSync(path.dirname(reportPath), { recursive: true });
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`💾 Detailed report saved to: ${reportPath}\n`);
    } catch (error) {
      console.error(`Failed to save report: ${error.message}`);
    }
  }
}

// CLI execution
if (require.main === module) {
  const filePath = process.argv[2];

  if (!filePath) {
    console.log('Usage: node validate-migration.js <filepath>');
    console.log('Example: node validate-migration.js migration-pipeline/staging/components/BrandPreview.tsx');
    process.exit(1);
  }

  const validator = new MigrationValidator();
  validator.validate(filePath).then(isValid => {
    process.exit(isValid ? 0 : 1);
  });
}

module.exports = MigrationValidator;