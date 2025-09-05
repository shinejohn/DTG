const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads');
const os = require('os');

class ParallelProcessor {
  constructor(options = {}) {
    this.maxWorkers = options.maxWorkers || Math.max(1, os.cpus().length - 1);
    this.workerScript = options.workerScript || path.join(__dirname, 'migration-worker.js');
    this.results = new Map();
    this.errors = new Map();
  }

  /**
   * Analyzes file dependencies and creates independent batches
   */
  analyzeDepedencies(files, dependencyGraph) {
    const visited = new Set();
    const batches = [];
    const currentBatch = [];
    
    // Build reverse dependency map (who depends on this file)
    const reverseDeps = new Map();
    for (const [file, deps] of dependencyGraph.entries()) {
      for (const dep of deps) {
        if (!reverseDeps.has(dep)) {
          reverseDeps.set(dep, new Set());
        }
        reverseDeps.get(dep).add(file);
      }
    }
    
    // Group files that can be processed in parallel
    for (const file of files) {
      if (visited.has(file)) continue;
      
      // Check if this file has dependencies on files in current batch
      const deps = dependencyGraph.get(file) || new Set();
      const hasConflict = Array.from(deps).some(dep => currentBatch.includes(dep));
      
      if (hasConflict || currentBatch.length >= this.maxWorkers) {
        if (currentBatch.length > 0) {
          batches.push([...currentBatch]);
          currentBatch.length = 0;
        }
      }
      
      currentBatch.push(file);
      visited.add(file);
    }
    
    // Add remaining files
    if (currentBatch.length > 0) {
      batches.push(currentBatch);
    }
    
    return batches;
  }

  /**
   * Process files in parallel batches
   */
  async processBatches(batches, operation) {
    console.log(`🚀 Processing ${batches.length} batches in parallel`);
    console.log(`   Max workers: ${this.maxWorkers}`);
    
    const startTime = Date.now();
    let totalProcessed = 0;
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`\n📦 Batch ${i + 1}/${batches.length} - ${batch.length} files`);
      
      await this.processBatch(batch, operation);
      totalProcessed += batch.length;
      
      const elapsed = Date.now() - startTime;
      const rate = (totalProcessed / elapsed * 1000).toFixed(2);
      console.log(`   Progress: ${totalProcessed} files processed (${rate} files/sec)`);
    }
    
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n✅ All batches complete in ${totalTime}s`);
    
    return {
      results: this.results,
      errors: this.errors,
      stats: {
        totalFiles: totalProcessed,
        totalTime: totalTime,
        averageRate: (totalProcessed / totalTime).toFixed(2)
      }
    };
  }

  /**
   * Process a single batch of files in parallel
   */
  async processBatch(files, operation) {
    const workers = [];
    const promises = [];
    
    for (const file of files) {
      const promise = this.processFileWithWorker(file, operation);
      promises.push(promise);
    }
    
    // Wait for all files in batch to complete
    const results = await Promise.allSettled(promises);
    
    // Collect results
    results.forEach((result, index) => {
      const file = files[index];
      if (result.status === 'fulfilled') {
        this.results.set(file, result.value);
      } else {
        this.errors.set(file, result.reason);
        console.error(`   ❌ Failed: ${path.basename(file)} - ${result.reason.message}`);
      }
    });
  }

  /**
   * Process a single file using a worker thread
   */
  processFileWithWorker(file, operation) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(this.workerScript, {
        workerData: {
          file,
          operation,
          operationPath: path.join(__dirname, `${operation}.js`)
        }
      });
      
      worker.on('message', (result) => {
        if (result.error) {
          reject(new Error(result.error));
        } else {
          console.log(`   ✅ Completed: ${path.basename(file)}`);
          resolve(result);
        }
      });
      
      worker.on('error', (error) => {
        reject(error);
      });
      
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }

  /**
   * Smart batch creation based on file characteristics
   */
  createSmartBatches(analysisData) {
    const fileSizes = new Map();
    const fileComplexity = new Map();
    
    // Analyze each file
    Object.entries(analysisData.files).forEach(([file, data]) => {
      // Estimate processing complexity
      const complexity = data.mocks.length + 
                        data.images.length + 
                        data.linesOfMock / 100;
      
      fileComplexity.set(file, complexity);
    });
    
    // Sort files by complexity (process complex files first)
    const sortedFiles = Array.from(fileComplexity.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([file]) => file);
    
    // Create balanced batches
    const batches = [];
    const batchComplexity = new Array(this.maxWorkers).fill(0);
    const batchFiles = new Array(this.maxWorkers).fill(null).map(() => []);
    
    for (const file of sortedFiles) {
      // Find batch with lowest total complexity
      let minIndex = 0;
      let minComplexity = batchComplexity[0];
      
      for (let i = 1; i < this.maxWorkers; i++) {
        if (batchComplexity[i] < minComplexity) {
          minComplexity = batchComplexity[i];
          minIndex = i;
        }
      }
      
      // Add file to least loaded batch
      batchFiles[minIndex].push(file);
      batchComplexity[minIndex] += fileComplexity.get(file);
    }
    
    // Filter out empty batches
    return batchFiles.filter(batch => batch.length > 0);
  }

  /**
   * Generate performance report
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.results.size + this.errors.size,
        successful: this.results.size,
        failed: this.errors.size,
        successRate: `${(this.results.size / (this.results.size + this.errors.size) * 100).toFixed(2)}%`
      },
      errors: Array.from(this.errors.entries()).map(([file, error]) => ({
        file: path.basename(file),
        error: error.message
      })),
      performance: {
        workersUsed: this.maxWorkers,
        platform: os.platform(),
        cpus: os.cpus().length
      }
    };
    
    fs.writeFileSync(
      'migration-pipeline/logs/parallel-processing-report.json',
      JSON.stringify(report, null, 2)
    );
    
    return report;
  }
}

// Export for use in other scripts
module.exports = ParallelProcessor;

// Example usage
if (require.main === module) {
  async function example() {
    const processor = new ParallelProcessor({ maxWorkers: 4 });
    
    // Load analysis data
    const analysisData = JSON.parse(
      fs.readFileSync('migration-pipeline/mock-data-analysis.json', 'utf8')
    );
    
    // Create smart batches based on complexity
    const batches = processor.createSmartBatches(analysisData);
    
    console.log(`Created ${batches.length} batches for parallel processing`);
    
    // Process batches
    const results = await processor.processBatches(batches, 'remove-mock-data');
    
    // Generate report
    const report = processor.generateReport();
    console.log('\n📊 Processing Report:');
    console.log(`   Success Rate: ${report.summary.successRate}`);
  }
  
  example().catch(console.error);
}