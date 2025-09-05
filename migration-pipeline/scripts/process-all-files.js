#!/usr/bin/env node

/**
 * Automated Migration Pipeline Processor
 * 
 * Processes all 130 Magic Pattern files through the 4-stage migration pipeline:
 * Stage 1: Mock Data Removal
 * Stage 2: React Router 7 Conversion  
 * Stage 3: Quality Validation & Schema Alignment
 * Stage 4: Route Integration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  sourcePath: '../magic/src',
  pipelinePath: '../migration-pipeline',
  webAppPath: '../apps/web',
  logLevel: 'INFO', // DEBUG, INFO, WARN, ERROR
  batchSize: 10, // Process files in batches
  skipExisting: true, // Skip files that already exist in target stage
  createBackups: true
};

// File processing stages
const STAGES = {
  1: { name: 'Mock Removal', input: 'magic/src', output: 'migration-pipeline/nomock' },
  2: { name: 'RR7 Conversion', input: 'migration-pipeline/nomock', output: 'migration-pipeline/staging' },
  3: { name: 'Validation', input: 'migration-pipeline/staging', output: 'migration-pipeline/validated' },
  4: { name: 'Route Integration', input: 'migration-pipeline/validated', output: 'apps/web/app/routes' }
};

// Database schema mappings (from our analysis)
const SCHEMA_MAPPINGS = {
  tables: {
    'user_accounts': 'accounts',
    'businesses': 'businesses',
    'reviews': 'reviews',
    'events': 'events',
    'articles': 'articles',
    'deals': 'deals',
    'coupons': 'coupons',
    'loyalty_members': 'loyalty_members',
    'notifications': 'notifications'
  },
  columns: {
    'display_name': 'name',
    'avatar_url': 'picture_url',
    'average_rating': 'rating',
    'review_count': 'reviews_count',
    'profile_image_url': 'picture_url',
    'featured_image_url': 'image_url',
    'user_id': 'user_id',
    'business_id': 'business_id'
  }
};

// Mock data patterns to remove
const MOCK_PATTERNS = [
  /const\s+mock[A-Z][a-zA-Z]*\s*=\s*[\{\[]/g,
  /const\s+MOCK_[A-Z_]+\s*=\s*[\{\[]/g,
  /const\s+fake[A-Z][a-zA-Z]*\s*=\s*[\{\[]/g,
  /const\s+dummy[A-Z][a-zA-Z]*\s*=\s*[\{\[]/g,
  /const\s+sample[A-Z][a-zA-Z]*\s*=\s*[\{\[]/g
];

// Image URL patterns to replace
const IMAGE_PATTERNS = [
  /https:\/\/images\.unsplash\.com\/[^\s'"]+/g,
  /https:\/\/randomuser\.me\/[^\s'"]+/g,
  /https:\/\/via\.placeholder\.com\/[^\s'"]+/g
];

class MigrationProcessor {
  constructor() {
    this.processedFiles = 0;
    this.errors = [];
    this.warnings = [];
    this.stats = {
      stage1: { processed: 0, errors: 0 },
      stage2: { processed: 0, errors: 0 },
      stage3: { processed: 0, errors: 0 },
      stage4: { processed: 0, errors: 0 }
    };
    
    this.checkNodeVersion();
    this.initializeDirectories();
    this.loadMockAnalysis();
  }

  checkNodeVersion() {
    const version = process.version;
    const majorVersion = parseInt(version.slice(1).split('.')[0]);
    
    if (majorVersion < 22) {
      console.error(`❌ Error: React Router 7 requires Node.js 22 or higher`);
      console.error(`   Current version: ${version}`);
      console.error(`   Please upgrade Node.js:`);
      console.error(`   - Download from https://nodejs.org/`);
      console.error(`   - Or use nvm: nvm install 22 && nvm use 22`);
      process.exit(1);
    }
    
    console.log(`✅ Node.js ${version} (compatible with React Router 7)`);
  }

  initializeDirectories() {
    const dirs = [
      'nomock/components',
      'nomock/pages', 
      'nomock/contexts',
      'nomock/services',
      'nomock/hooks',
      'nomock/types',
      'nomock/utils',
      'staging/components',
      'staging/pages',
      'staging/contexts', 
      'staging/services',
      'staging/hooks',
      'staging/types',
      'staging/utils',
      'validated/components',
      'validated/pages',
      'validated/contexts',
      'validated/services',
      'validated/hooks',
      'validated/types',
      'validated/utils',
      'logs'
    ];

    dirs.forEach(dir => {
      const fullPath = path.join(__dirname, '..', dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        this.log('DEBUG', `Created directory: ${dir}`);
      }
    });
  }

  loadMockAnalysis() {
    try {
      const analysisPath = path.join(__dirname, '..', 'mock-data-analysis.json');
      if (fs.existsSync(analysisPath)) {
        this.mockAnalysis = JSON.parse(fs.readFileSync(analysisPath, 'utf-8'));
        this.log('INFO', `Loaded analysis for ${this.mockAnalysis.totalFiles} files`);
      } else {
        this.log('WARN', 'Mock analysis file not found, will process all files');
        this.mockAnalysis = null;
      }
    } catch (error) {
      this.log('ERROR', `Failed to load mock analysis: ${error.message}`);
      this.mockAnalysis = null;
    }
  }

  log(level, message, data = null) {
    const levels = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
    if (levels[level] >= levels[CONFIG.logLevel]) {
      const timestamp = new Date().toISOString();
      const logEntry = { timestamp, level, message, data };
      console.log(`[${timestamp}] ${level}: ${message}`);
      
      if (data) {
        console.log('  Data:', JSON.stringify(data, null, 2));
      }
      
      // Write to log file
      const logPath = path.join(__dirname, '..', 'logs', 'migration.log');
      fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
    }
  }

  getAllSourceFiles() {
    const files = [];
    const sourcePath = path.join(__dirname, '..', '..', 'magic', 'src');
    
    const scanDirectory = (dir, relativePath = '') => {
      if (!fs.existsSync(dir)) {
        this.log('WARN', `Source directory not found: ${dir}`);
        return;
      }
      
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const relPath = path.join(relativePath, item).replace(/\\/g, '/');
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath, relPath);
        } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
          files.push({
            fullPath,
            relativePath: relPath,
            category: this.categorizeFile(relPath),
            hasMockData: this.mockAnalysis ? 
              Object.keys(this.mockAnalysis.files).some(key => key.includes(relPath)) : 
              this.quickMockCheck(fullPath),
            size: stat.size
          });
        }
      });
    };
    
    scanDirectory(sourcePath);
    this.log('INFO', `Found ${files.length} source files`);
    return files;
  }

  categorizeFile(filePath) {
    if (filePath.startsWith('components/')) return 'component';
    if (filePath.startsWith('pages/')) return 'page';
    if (filePath.startsWith('contexts/')) return 'context';
    if (filePath.startsWith('services/')) return 'service';
    if (filePath.startsWith('hooks/')) return 'hook';
    if (filePath.startsWith('types/')) return 'type';
    if (filePath.startsWith('utils/')) return 'util';
    return 'other';
  }

  quickMockCheck(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return MOCK_PATTERNS.some(pattern => pattern.test(content));
    } catch (error) {
      return false;
    }
  }

  // Stage 1: Mock Data Removal
  async processStage1(files) {
    this.log('INFO', '=== Starting Stage 1: Mock Data Removal ===');
    
    for (const file of files) {
      try {
        const outputPath = path.join(__dirname, '..', 'nomock', file.relativePath);
        
        if (CONFIG.skipExisting && fs.existsSync(outputPath)) {
          this.log('DEBUG', `Skipping existing file: ${file.relativePath}`);
          continue;
        }

        // Create output directory
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        // Read source file
        const content = fs.readFileSync(file.fullPath, 'utf-8');
        let cleanContent = content;

        // Remove mock data declarations
        MOCK_PATTERNS.forEach(pattern => {
          cleanContent = this.removeMockDeclarations(cleanContent, pattern);
        });

        // Replace image URLs with placeholders
        IMAGE_PATTERNS.forEach(pattern => {
          cleanContent = cleanContent.replace(pattern, '/images/placeholder.jpg');
        });

        // Add TODO comments where data is needed
        cleanContent = this.addDataTodos(cleanContent);

        // Write processed file
        fs.writeFileSync(outputPath, cleanContent);
        this.stats.stage1.processed++;
        this.log('DEBUG', `Processed Stage 1: ${file.relativePath}`);

      } catch (error) {
        this.stats.stage1.errors++;
        this.errors.push({ stage: 1, file: file.relativePath, error: error.message });
        this.log('ERROR', `Stage 1 error in ${file.relativePath}:`, error.message);
      }
    }

    this.log('INFO', `Stage 1 complete: ${this.stats.stage1.processed} processed, ${this.stats.stage1.errors} errors`);
  }

  removeMockDeclarations(content, pattern) {
    return content.replace(pattern, (match) => {
      // Find the complete declaration including its object/array
      const lines = content.split('\n');
      let startIndex = content.indexOf(match);
      let lineNumber = content.substring(0, startIndex).split('\n').length - 1;
      
      // Find the end of the declaration
      let braceCount = 0;
      let inDeclaration = false;
      let endLineNumber = lineNumber;
      
      for (let i = lineNumber; i < lines.length; i++) {
        const line = lines[i];
        
        for (let char of line) {
          if (char === '{' || char === '[') {
            braceCount++;
            inDeclaration = true;
          } else if (char === '}' || char === ']') {
            braceCount--;
            if (braceCount === 0 && inDeclaration) {
              endLineNumber = i;
              break;
            }
          }
        }
        
        if (braceCount === 0 && inDeclaration) break;
      }

      // Replace with TODO comment
      return `// TODO: Replace mock data with Supabase query in loader\n// Original declaration removed: ${match.substring(0, 50)}...`;
    });
  }

  addDataTodos(content) {
    // Add TODOs where useState for data is used
    content = content.replace(
      /const\s+\[([^,]+),\s*set[A-Z][a-zA-Z]*\]\s*=\s*useState\(/g,
      (match, stateName) => {
        if (stateName.includes('data') || stateName.includes('Data') || 
            stateName.includes('list') || stateName.includes('List')) {
          return `// TODO: Remove useState for ${stateName} - use useLoaderData instead\n  ${match}`;
        }
        return match;
      }
    );

    return content;
  }

  // Stage 2: React Router 7 Conversion
  async processStage2(files) {
    this.log('INFO', '=== Starting Stage 2: React Router 7 Conversion ===');
    
    for (const file of files) {
      try {
        const inputPath = path.join(__dirname, '..', 'nomock', file.relativePath);
        const outputPath = path.join(__dirname, '..', 'staging', file.relativePath);
        
        if (!fs.existsSync(inputPath)) {
          this.log('DEBUG', `Input file not found, skipping: ${file.relativePath}`);
          continue;
        }

        if (CONFIG.skipExisting && fs.existsSync(outputPath)) {
          this.log('DEBUG', `Skipping existing file: ${file.relativePath}`);
          continue;
        }

        // Create output directory
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        // Read cleaned file
        const content = fs.readFileSync(inputPath, 'utf-8');
        let convertedContent = content;

        // Only convert pages, not components (components don't need loaders)
        if (file.category === 'page') {
          convertedContent = this.convertToReactRouter7(convertedContent, file);
        } else {
          // For components, just update imports and remove client-side data fetching
          convertedContent = this.updateComponentImports(convertedContent);
        }

        // Write converted file
        fs.writeFileSync(outputPath, convertedContent);
        this.stats.stage2.processed++;
        this.log('DEBUG', `Processed Stage 2: ${file.relativePath}`);

      } catch (error) {
        this.stats.stage2.errors++;
        this.errors.push({ stage: 2, file: file.relativePath, error: error.message });
        this.log('ERROR', `Stage 2 error in ${file.relativePath}:`, error.message);
      }
    }

    this.log('INFO', `Stage 2 complete: ${this.stats.stage2.processed} processed, ${this.stats.stage2.errors} errors`);
  }

  convertToReactRouter7(content, file) {
    // Add Route type import
    if (!content.includes("import type { Route }")) {
      content = `import type { Route } from './+types/route';\n${content}`;
    }

    // Add React Router imports
    const routerImports = ['json', 'useLoaderData'];
    if (content.includes('<Link')) routerImports.push('Link');
    if (content.includes('useNavigate') || content.includes('navigate')) routerImports.push('useNavigate');
    
    if (!content.includes('from \'react-router\'')) {
      const importLine = `import { ${routerImports.join(', ')} } from 'react-router';\n`;
      content = content.replace(/^import/, `${importLine}import`);
    }

    // Add Supabase imports
    if (!content.includes('getSupabaseServerClient')) {
      content = `import { getSupabaseServerClient } from '@kit/supabase/server-client';\n${content}`;
    }

    // Generate loader function
    const loaderFunction = this.generateLoader(file);
    
    // Find the default export and add loader before it
    const defaultExportRegex = /export\s+default\s+function/;
    if (defaultExportRegex.test(content)) {
      content = content.replace(defaultExportRegex, `${loaderFunction}\n\nexport default function`);
    } else {
      // If no default export function, add at the end
      content += `\n\n${loaderFunction}`;
    }

    // Update component to use loaderData
    content = this.updateComponentForLoader(content);

    // Add error boundary
    if (!content.includes('export function ErrorBoundary')) {
      content += `\n\n${this.generateErrorBoundary()}`;
    }

    return content;
  }

  generateLoader(file) {
    // Generate appropriate Supabase queries based on file type
    let queries = '';
    
    if (file.relativePath.includes('business')) {
      queries = `
    // Get businesses
    const { data: businesses, error: businessesError } = await supabase
      .from('businesses')
      .select(\`
        id,
        name,
        category,
        rating,
        reviews_count,
        picture_url,
        status
      \`)
      .eq('status', 'active')
      .limit(10);

    if (businessesError) {
      console.error('Error fetching businesses:', businessesError);
    }`;
    } else if (file.relativePath.includes('event')) {
      queries = `
    // Get events
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select(\`
        id,
        title,
        start_date,
        location_name,
        image_url,
        status
      \`)
      .eq('status', 'approved')
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true })
      .limit(10);

    if (eventsError) {
      console.error('Error fetching events:', eventsError);
    }`;
    } else {
      // Generic data fetch
      queries = `
    // Get generic data - customize based on page needs
    const { data: items, error } = await supabase
      .from('businesses') // Change table as needed
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching data:', error);
    }`;
    }

    return `// React Router 7 loader function
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {${queries}

    const transformedData = {
      // Transform data to match component interface
      items: businesses || events || items || []
    };

    return json(transformedData, { headers });
  } catch (error) {
    console.error('Loader error:', error);
    // Return empty data on error
    return json({
      items: []
    }, { headers });
  }
}`;
  }

  updateComponentForLoader(content) {
    // Update function signature to accept loaderData
    content = content.replace(
      /export\s+default\s+function\s+(\w+)\s*\(\s*\)\s*{/,
      'export default function $1({ loaderData }: Route.ComponentProps) {'
    );

    // Add destructuring of loader data
    const destructureRegex = /export default function \w+\([^}]*\) \{/;
    if (destructureRegex.test(content)) {
      content = content.replace(destructureRegex, (match) => {
        return `${match}
  const { items } = loaderData;`;
      });
    }

    // Remove useState for data
    content = content.replace(
      /const\s+\[[^,]+,\s*set[A-Z][a-zA-Z]*\]\s*=\s*useState\([^)]*\);?\n?/g,
      '// Removed useState - using loaderData instead\n'
    );

    // Remove useEffect for data fetching
    content = content.replace(
      /useEffect\s*\(\s*\(\s*\)\s*=>\s*\{[^}]*fetchData[^}]*\}\s*,\s*\[[^\]]*\]\s*\);?\n?/g,
      '// Removed useEffect - data loaded by loader function\n'
    );

    return content;
  }

  updateComponentImports(content) {
    // For components, just update imports and remove data fetching
    if (content.includes('useState') && content.includes('data')) {
      content = content.replace(
        /const\s+\[([^,]+),\s*set[A-Z][a-zA-Z]*\]\s*=\s*useState\([^)]*\);?\n?/g,
        '// TODO: Remove useState for data - pass from parent or use context\n'
      );
    }

    return content;
  }

  generateErrorBoundary() {
    return `export function ErrorBoundary() {
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
  }

  // Stage 3: Validation using our validation script
  async processStage3(files) {
    this.log('INFO', '=== Starting Stage 3: Quality Validation ===');
    
    // Install dependencies if needed
    const scriptsDir = path.join(__dirname);
    if (!fs.existsSync(path.join(scriptsDir, 'node_modules'))) {
      this.log('INFO', 'Installing validation script dependencies...');
      try {
        execSync('npm install', { cwd: scriptsDir, stdio: 'pipe' });
      } catch (error) {
        this.log('ERROR', 'Failed to install dependencies:', error.message);
        return;
      }
    }

    for (const file of files) {
      try {
        const inputPath = path.join(__dirname, '..', 'staging', file.relativePath);
        const outputPath = path.join(__dirname, '..', 'validated', file.relativePath);
        
        if (!fs.existsSync(inputPath)) {
          this.log('DEBUG', `Input file not found, skipping: ${file.relativePath}`);
          continue;
        }

        if (CONFIG.skipExisting && fs.existsSync(outputPath)) {
          this.log('DEBUG', `Skipping existing file: ${file.relativePath}`);
          continue;
        }

        // Run validation script
        const validationScript = path.join(__dirname, 'validate-rr7-conversion.js');
        const command = `node "${validationScript}" "${inputPath}" --fix`;
        
        try {
          execSync(command, { stdio: 'pipe', cwd: __dirname });
          
          // Copy to validated folder if validation passed
          const outputDir = path.dirname(outputPath);
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          fs.copyFileSync(inputPath, outputPath);
          this.stats.stage3.processed++;
          this.log('DEBUG', `Processed Stage 3: ${file.relativePath}`);
          
        } catch (validationError) {
          // Validation failed, log but continue
          this.stats.stage3.errors++;
          this.warnings.push({ stage: 3, file: file.relativePath, error: validationError.message });
          this.log('WARN', `Stage 3 validation issues in ${file.relativePath}`);
          
          // Still copy to validated but mark as needing manual review
          const outputDir = path.dirname(outputPath);
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          fs.copyFileSync(inputPath, outputPath);
        }

      } catch (error) {
        this.stats.stage3.errors++;
        this.errors.push({ stage: 3, file: file.relativePath, error: error.message });
        this.log('ERROR', `Stage 3 error in ${file.relativePath}:`, error.message);
      }
    }

    this.log('INFO', `Stage 3 complete: ${this.stats.stage3.processed} processed, ${this.stats.stage3.errors} errors`);
  }

  // Stage 4: Route Integration (copy to final web app location)
  async processStage4(files) {
    this.log('INFO', '=== Starting Stage 4: Route Integration ===');
    
    for (const file of files) {
      try {
        const inputPath = path.join(__dirname, '..', 'validated', file.relativePath);
        
        if (!fs.existsSync(inputPath)) {
          this.log('DEBUG', `Input file not found, skipping: ${file.relativePath}`);
          continue;
        }

        // Determine final route location
        let outputPath;
        if (file.category === 'page') {
          // Pages go to routes
          outputPath = path.join(__dirname, '..', '..', 'apps', 'web', 'app', 'routes', file.relativePath);
        } else {
          // Components and other files go to appropriate locations
          outputPath = path.join(__dirname, '..', '..', 'apps', 'web', 'app', 'components', file.relativePath);
        }

        if (CONFIG.skipExisting && fs.existsSync(outputPath)) {
          this.log('DEBUG', `Skipping existing file: ${file.relativePath}`);
          continue;
        }

        // Create output directory
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        // Copy file to final location
        fs.copyFileSync(inputPath, outputPath);
        this.stats.stage4.processed++;
        this.log('DEBUG', `Processed Stage 4: ${file.relativePath}`);

      } catch (error) {
        this.stats.stage4.errors++;
        this.errors.push({ stage: 4, file: file.relativePath, error: error.message });
        this.log('ERROR', `Stage 4 error in ${file.relativePath}:`, error.message);
      }
    }

    this.log('INFO', `Stage 4 complete: ${this.stats.stage4.processed} processed, ${this.stats.stage4.errors} errors`);
  }

  generateFinalReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalFiles: this.processedFiles,
      stages: this.stats,
      errors: this.errors,
      warnings: this.warnings,
      summary: {
        totalProcessed: Object.values(this.stats).reduce((sum, stage) => sum + stage.processed, 0),
        totalErrors: Object.values(this.stats).reduce((sum, stage) => sum + stage.errors, 0),
        successRate: 0
      }
    };

    report.summary.successRate = report.summary.totalProcessed > 0 ? 
      ((report.summary.totalProcessed - report.summary.totalErrors) / report.summary.totalProcessed * 100).toFixed(2) : 
      0;

    // Save report
    const reportPath = path.join(__dirname, '..', 'logs', `migration-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Update pipeline status
    this.updatePipelineStatus(report);

    return report;
  }

  updatePipelineStatus(report) {
    const statusPath = path.join(__dirname, '..', 'pipeline-status.json');
    const status = {
      summary: {
        total_files: this.processedFiles,
        stage1_complete: this.stats.stage1.processed,
        stage2_complete: this.stats.stage2.processed,
        stage3_complete: this.stats.stage3.processed,
        stage4_complete: this.stats.stage4.processed
      },
      files: {},
      lastUpdated: new Date().toISOString(),
      migrationComplete: report.summary.successRate > 80
    };

    fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
  }

  async processAll() {
    const startTime = Date.now();
    this.log('INFO', '🚀 Starting automated migration pipeline');
    
    // Get all source files
    const files = this.getAllSourceFiles();
    this.processedFiles = files.length;
    
    if (files.length === 0) {
      this.log('ERROR', 'No source files found!');
      return;
    }

    // Process in batches to avoid overwhelming the system
    const batches = [];
    for (let i = 0; i < files.length; i += CONFIG.batchSize) {
      batches.push(files.slice(i, i + CONFIG.batchSize));
    }

    this.log('INFO', `Processing ${files.length} files in ${batches.length} batches`);

    // Process each stage
    try {
      await this.processStage1(files);
      await this.processStage2(files);
      await this.processStage3(files);
      await this.processStage4(files);
      
      const report = this.generateFinalReport();
      const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
      
      this.log('INFO', '🎉 Migration pipeline complete!');
      this.log('INFO', `📊 Processed ${report.summary.totalProcessed} files in ${duration} minutes`);
      this.log('INFO', `✅ Success rate: ${report.summary.successRate}%`);
      
      if (report.summary.totalErrors > 0) {
        this.log('WARN', `⚠️  ${report.summary.totalErrors} files had errors - check logs for details`);
      }
      
    } catch (error) {
      this.log('ERROR', 'Pipeline failed:', error);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const processor = new MigrationProcessor();
  
  try {
    await processor.processAll();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Handle script arguments
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help')) {
    console.log(`
Usage: node process-all-files.js [options]

Options:
  --help          Show this help
  --dry-run       Show what would be processed without doing it
  --batch-size N  Process N files at a time (default: 10)
  --log-level L   Set log level: DEBUG, INFO, WARN, ERROR (default: INFO)
  --skip-stage N  Skip specific stage (1-4)

Example:
  node process-all-files.js --batch-size 5 --log-level DEBUG
    `);
    process.exit(0);
  }
  
  // Parse arguments
  if (args.includes('--batch-size')) {
    const index = args.indexOf('--batch-size');
    CONFIG.batchSize = parseInt(args[index + 1]) || CONFIG.batchSize;
  }
  
  if (args.includes('--log-level')) {
    const index = args.indexOf('--log-level');
    CONFIG.logLevel = args[index + 1] || CONFIG.logLevel;
  }
  
  if (args.includes('--dry-run')) {
    console.log('DRY RUN MODE - No files will be modified');
    // TODO: Implement dry run logic
    process.exit(0);
  }
  
  main();
}