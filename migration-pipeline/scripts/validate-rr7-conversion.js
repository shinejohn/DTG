#!/usr/bin/env node

/**
 * React Router 7 Conversion Validation Script
 * 
 * This script validates converted files for common issues and provides fixes
 * Run: node validate-rr7-conversion.js <file-path>
 */

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;

// Common issues to check and fix
const VALIDATION_RULES = {
  imports: {
    // Correct import paths
    routeTypes: {
      pattern: /import\s+type\s+\{\s*Route\s*\}\s+from\s+['"](.*?)['"]/,
      correct: "import type { Route } from './+types/route'",
      check: (importPath) => importPath !== './+types/route'
    },
    supabaseClient: {
      pattern: /import\s+\{[^}]*getSupabaseServerClient[^}]*\}\s+from\s+['"](.*?)['"]/,
      correct: "import { getSupabaseServerClient } from '@kit/supabase/server-client'",
      check: (importPath) => !importPath.includes('@kit/supabase/server-client')
    }
  },
  
  // Database schema mappings
  schemaMapping: {
    tables: {
      'user_accounts': 'accounts',
      'user:user_accounts': 'user:accounts',
      'author:user_accounts': 'author:accounts'
    },
    columns: {
      'display_name': 'name',
      'avatar_url': 'picture_url',
      'average_rating': 'rating',
      'review_count': 'reviews_count',
      'profile_image_url': 'picture_url',
      'featured_image_url': 'image_url'
    }
  },
  
  // Required exports
  requiredExports: ['loader', 'default'],
  
  // Recommended exports
  recommendedExports: ['ErrorBoundary', 'meta'],
  
  // Console statement patterns to remove
  consolePatterns: [
    /console\.(log|error|warn|info|debug)\s*\(/g
  ]
};

class RR7Validator {
  constructor(filePath) {
    this.filePath = filePath;
    this.content = fs.readFileSync(filePath, 'utf-8');
    this.ast = null;
    this.issues = [];
    this.fixes = [];
    this.warnings = [];
  }

  parse() {
    try {
      this.ast = parser.parse(this.content, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript']
      });
      return true;
    } catch (error) {
      this.issues.push({
        type: 'PARSE_ERROR',
        message: `Failed to parse file: ${error.message}`,
        severity: 'error'
      });
      return false;
    }
  }

  validateImports() {
    const importIssues = [];
    
    // Check Route type import
    const routeImportMatch = this.content.match(VALIDATION_RULES.imports.routeTypes.pattern);
    if (routeImportMatch && VALIDATION_RULES.imports.routeTypes.check(routeImportMatch[1])) {
      importIssues.push({
        type: 'INCORRECT_IMPORT',
        line: this.getLineNumber(routeImportMatch[0]),
        current: routeImportMatch[0],
        correct: VALIDATION_RULES.imports.routeTypes.correct,
        autoFix: true
      });
    }
    
    // Check Supabase client import
    const supabaseImportMatch = this.content.match(VALIDATION_RULES.imports.supabaseClient.pattern);
    if (supabaseImportMatch && VALIDATION_RULES.imports.supabaseClient.check(supabaseImportMatch[1])) {
      importIssues.push({
        type: 'INCORRECT_IMPORT',
        line: this.getLineNumber(supabaseImportMatch[0]),
        current: supabaseImportMatch[0],
        correct: VALIDATION_RULES.imports.supabaseClient.correct,
        autoFix: true
      });
    }
    
    // Check for missing useLoaderData import if used
    const usesLoaderData = this.content.includes('useLoaderData');
    const hasLoaderDataImport = this.content.includes('import') && 
      this.content.match(/import\s+\{[^}]*useLoaderData[^}]*\}\s+from\s+['"]react-router['"]/);
    
    if (usesLoaderData && !hasLoaderDataImport) {
      this.warnings.push({
        type: 'MISSING_IMPORT',
        message: 'Component uses useLoaderData but import might be missing or incorrect',
        suggestion: "Ensure 'useLoaderData' is imported from 'react-router'"
      });
    }
    
    return importIssues;
  }

  validateDatabaseQueries() {
    const queryIssues = [];
    
    // Check for incorrect table names
    Object.entries(VALIDATION_RULES.schemaMapping.tables).forEach(([wrong, correct]) => {
      const regex = new RegExp(`\\.from\\(['"\`]${wrong}['"\`]\\)`, 'g');
      const matches = [...this.content.matchAll(regex)];
      
      matches.forEach(match => {
        queryIssues.push({
          type: 'INCORRECT_TABLE_NAME',
          line: this.getLineNumber(match[0]),
          current: wrong,
          correct: correct,
          autoFix: true
        });
      });
    });
    
    // Check for incorrect column names
    Object.entries(VALIDATION_RULES.schemaMapping.columns).forEach(([wrong, correct]) => {
      const regex = new RegExp(`\\b${wrong}\\b`, 'g');
      const matches = [...this.content.matchAll(regex)];
      
      matches.forEach(match => {
        // Only flag if it's in a query context
        const line = this.getLine(match.index);
        if (line.includes('select') || line.includes('insert') || line.includes('update')) {
          queryIssues.push({
            type: 'POSSIBLE_INCORRECT_COLUMN',
            line: this.getLineNumber(match[0], match.index),
            current: wrong,
            correct: correct,
            autoFix: false // Manual review needed
          });
        }
      });
    });
    
    // Check for incorrect join syntax
    const incorrectJoins = [...this.content.matchAll(/!([a-z_]+)\s*\(/g)];
    incorrectJoins.forEach(match => {
      queryIssues.push({
        type: 'INCORRECT_JOIN_SYNTAX',
        line: this.getLineNumber(match[0]),
        current: match[0],
        message: 'Supabase join syntax might be incorrect. Consider using standard joins.',
        autoFix: false
      });
    });
    
    return queryIssues;
  }

  validateExports() {
    const exportIssues = [];
    const exports = [];
    
    traverse(this.ast, {
      ExportNamedDeclaration(path) {
        if (path.node.declaration) {
          if (t.isFunctionDeclaration(path.node.declaration)) {
            exports.push(path.node.declaration.id.name);
          }
        }
      },
      ExportDefaultDeclaration(path) {
        exports.push('default');
      }
    });
    
    // Check required exports
    VALIDATION_RULES.requiredExports.forEach(exp => {
      if (!exports.includes(exp)) {
        exportIssues.push({
          type: 'MISSING_REQUIRED_EXPORT',
          export: exp,
          severity: 'error'
        });
      }
    });
    
    // Check recommended exports
    VALIDATION_RULES.recommendedExports.forEach(exp => {
      if (!exports.includes(exp)) {
            this.warnings.push({
          type: 'MISSING_RECOMMENDED_EXPORT',
          export: exp,
          message: `Consider adding '${exp}' export for better error handling and SEO`
        });
      }
    });
    
    return exportIssues;
  }

  validateConsoleStatements() {
    const consoleIssues = [];
    
    VALIDATION_RULES.consolePatterns.forEach(pattern => {
      const matches = [...this.content.matchAll(pattern)];
      matches.forEach(match => {
        consoleIssues.push({
          type: 'CONSOLE_STATEMENT',
          line: this.getLineNumber(match[0], match.index),
          statement: match[0],
          autoFix: true
        });
      });
    });
    
    return consoleIssues;
  }

  validateLoaderFunction() {
    const loaderIssues = [];
    let hasLoader = false;
    let loaderReturnsHeaders = false;
    
    traverse(this.ast, {
      ExportNamedDeclaration(path) {
        if (path.node.declaration && 
            t.isFunctionDeclaration(path.node.declaration) && 
            path.node.declaration.id.name === 'loader') {
          hasLoader = true;
          
          // Check if loader returns headers
          const loaderBody = generate(path.node.declaration.body).code;
          if (!loaderBody.includes('headers')) {
            loaderIssues.push({
              type: 'LOADER_MISSING_HEADERS',
              message: 'Loader should return headers from Supabase client',
              suggestion: 'return json(data, { headers });'
            });
          }
          
          // Check if loader has proper error handling
          if (!loaderBody.includes('try') || !loaderBody.includes('catch')) {
            this.warnings.push({
              type: 'LOADER_MISSING_ERROR_HANDLING',
              message: 'Loader should have try-catch error handling'
            });
          }
        }
      }
    });
    
    if (!hasLoader) {
      loaderIssues.push({
        type: 'MISSING_LOADER',
        severity: 'error',
        message: 'React Router 7 route files must export a loader function'
      });
    }
    
    return loaderIssues;
  }

  getLineNumber(searchString, startIndex = 0) {
    const index = startIndex || this.content.indexOf(searchString);
    const lines = this.content.substring(0, index).split('\n');
    return lines.length;
  }

  getLine(index) {
    const lines = this.content.split('\n');
    let currentIndex = 0;
    
    for (let i = 0; i < lines.length; i++) {
      if (currentIndex <= index && index < currentIndex + lines[i].length + 1) {
        return lines[i];
      }
      currentIndex += lines[i].length + 1;
    }
    
    return '';
  }

  generateReport() {
    const report = {
      file: path.basename(this.filePath),
      timestamp: new Date().toISOString(),
      status: 'PENDING',
      stats: {
        totalIssues: 0,
        errors: 0,
        warnings: 0,
        autoFixable: 0
      },
      issues: [],
      warnings: this.warnings
    };
    
    // Combine all issues
    const allIssues = [
      ...this.validateImports(),
      ...this.validateDatabaseQueries(),
      ...this.validateExports(),
      ...this.validateConsoleStatements(),
      ...this.validateLoaderFunction()
    ];
    
    report.issues = allIssues;
    report.stats.totalIssues = allIssues.length;
    report.stats.errors = allIssues.filter(i => i.severity === 'error').length;
    report.stats.warnings = this.warnings.length;
    report.stats.autoFixable = allIssues.filter(i => i.autoFix).length;
    
    if (report.stats.errors > 0) {
      report.status = 'FAILED';
    } else if (report.stats.warnings > 0) {
      report.status = 'WARNING';
    } else {
      report.status = 'PASSED';
    }
    
    return report;
  }

  autoFix() {
    let fixedContent = this.content;
    const fixes = [];
    
    // Fix imports
    const importFixes = [
      {
        pattern: VALIDATION_RULES.imports.routeTypes.pattern,
        replacement: VALIDATION_RULES.imports.routeTypes.correct
      },
      {
        pattern: VALIDATION_RULES.imports.supabaseClient.pattern,
        replacement: VALIDATION_RULES.imports.supabaseClient.correct
      }
    ];
    
    importFixes.forEach(fix => {
      if (fixedContent.match(fix.pattern)) {
        fixedContent = fixedContent.replace(fix.pattern, fix.replacement);
        fixes.push(`Fixed import: ${fix.replacement}`);
      }
    });
    
    // Fix table names
    Object.entries(VALIDATION_RULES.schemaMapping.tables).forEach(([wrong, correct]) => {
      const regex = new RegExp(`\\.from\\(['"\`]${wrong}['"\`]\\)`, 'g');
      if (fixedContent.match(regex)) {
        fixedContent = fixedContent.replace(regex, `.from('${correct}')`);
        fixes.push(`Fixed table name: ${wrong} → ${correct}`);
      }
    });
    
    // Remove console statements (comment them out for safety)
    VALIDATION_RULES.consolePatterns.forEach(pattern => {
      fixedContent = fixedContent.replace(pattern, '// $&');
      if (fixedContent.match(pattern)) {
        fixes.push('Commented out console statements');
      }
    });
    
    // Remove .ts extensions from imports
    fixedContent = fixedContent.replace(/from\s+['"]([^'"]+)\.ts['"]/g, "from '$1'");
    
    return {
      content: fixedContent,
      fixes
    };
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node validate-rr7-conversion.js <file-path> [--fix]');
    process.exit(1);
  }
  
  const filePath = args[0];
  const shouldFix = args.includes('--fix');
  
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }
  
  const validator = new RR7Validator(filePath);
  
  if (!validator.parse()) {
    console.error('Failed to parse file');
    console.error(validator.issues);
    process.exit(1);
  }
  
  const report = validator.generateReport();
  
  console.log('\n=== React Router 7 Validation Report ===\n');
  console.log(`File: ${report.file}`);
  console.log(`Status: ${report.status}`);
  console.log(`\nIssues Found:`);
  console.log(`- Errors: ${report.stats.errors}`);
  console.log(`- Warnings: ${report.stats.warnings}`);
  console.log(`- Auto-fixable: ${report.stats.autoFixable}`);
  
  if (report.issues.length > 0) {
    console.log('\n=== Issues ===\n');
    report.issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.type}`);
      if (issue.line) console.log(`   Line: ${issue.line}`);
      if (issue.current) console.log(`   Current: ${issue.current}`);
      if (issue.correct) console.log(`   Correct: ${issue.correct}`);
      if (issue.message) console.log(`   Message: ${issue.message}`);
      if (issue.autoFix) console.log(`   ✓ Auto-fixable`);
      console.log('');
    });
  }
  
  if (report.warnings.length > 0) {
    console.log('\n=== Warnings ===\n');
    report.warnings.forEach((warning, index) => {
      console.log(`${index + 1}. ${warning.type}`);
      console.log(`   ${warning.message}`);
      if (warning.suggestion) console.log(`   Suggestion: ${warning.suggestion}`);
      console.log('');
    });
  }
  
  if (shouldFix && report.stats.autoFixable > 0) {
    console.log('\n=== Applying Auto-fixes ===\n');
    const { content, fixes } = validator.autoFix();
    
    // Create backup
    const backupPath = filePath + '.backup';
    fs.writeFileSync(backupPath, validator.content);
    console.log(`Created backup: ${backupPath}`);
    
    // Write fixed content
    fs.writeFileSync(filePath, content);
    console.log(`\nApplied ${fixes.length} fixes:`);
    fixes.forEach(fix => console.log(`- ${fix}`));
    
    // Save validation report
    const reportPath = path.join(
      path.dirname(filePath),
      `validation-report-${path.basename(filePath, '.tsx')}.json`
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nValidation report saved: ${reportPath}`);
  } else if (report.stats.autoFixable > 0) {
    console.log(`\n💡 Run with --fix flag to automatically fix ${report.stats.autoFixable} issues`);
  }
  
  // Exit with appropriate code
  process.exit(report.status === 'FAILED' ? 1 : 0);
}

// Run the script
main().catch(console.error);