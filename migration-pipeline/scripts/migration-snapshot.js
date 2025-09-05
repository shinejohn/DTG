const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const execPromise = util.promisify(exec);

class MigrationSnapshot {
  constructor() {
    this.snapshotDir = 'migration-pipeline/snapshots';
    this.snapshotLog = 'migration-pipeline/snapshots/snapshot-log.json';
    this.ensureSnapshotDir();
  }

  ensureSnapshotDir() {
    if (!fs.existsSync(this.snapshotDir)) {
      fs.mkdirSync(this.snapshotDir, { recursive: true });
    }
    
    if (!fs.existsSync(this.snapshotLog)) {
      fs.writeFileSync(this.snapshotLog, JSON.stringify({
        snapshots: [],
        currentStage: null
      }, null, 2));
    }
  }

  async create(stage, files, description = '') {
    const snapshotId = `${stage}-${Date.now()}`;
    const timestamp = new Date().toISOString();
    
    console.log(`📸 Creating snapshot: ${snapshotId}`);
    
    try {
      // Create git commit for safety
      await execPromise(`git add -A`);
      await execPromise(`git commit -m "Migration snapshot: ${snapshotId} - ${description}" --allow-empty`);
      
      // Get commit hash
      const { stdout: commitHash } = await execPromise('git rev-parse HEAD');
      
      // Create file backup
      const backupPath = path.join(this.snapshotDir, snapshotId);
      fs.mkdirSync(backupPath, { recursive: true });
      
      // Copy affected files
      for (const file of files) {
        const destPath = path.join(backupPath, path.basename(file));
        if (fs.existsSync(file)) {
          fs.copyFileSync(file, destPath);
        }
      }
      
      // Update snapshot log
      const log = JSON.parse(fs.readFileSync(this.snapshotLog, 'utf8'));
      log.snapshots.push({
        id: snapshotId,
        stage,
        timestamp,
        commitHash: commitHash.trim(),
        files: files.length,
        description,
        backupPath
      });
      log.currentStage = stage;
      
      fs.writeFileSync(this.snapshotLog, JSON.stringify(log, null, 2));
      
      console.log(`✅ Snapshot created: ${snapshotId}`);
      console.log(`   Commit: ${commitHash.trim()}`);
      console.log(`   Files backed up: ${files.length}`);
      
      return snapshotId;
      
    } catch (error) {
      console.error(`❌ Failed to create snapshot: ${error.message}`);
      throw error;
    }
  }
  
  async rollback(snapshotId) {
    console.log(`🔄 Rolling back to snapshot: ${snapshotId}`);
    
    const log = JSON.parse(fs.readFileSync(this.snapshotLog, 'utf8'));
    const snapshot = log.snapshots.find(s => s.id === snapshotId);
    
    if (!snapshot) {
      throw new Error(`Snapshot not found: ${snapshotId}`);
    }
    
    try {
      // Option 1: Git rollback (preferred)
      if (snapshot.commitHash) {
        console.log(`   Using git to rollback to commit: ${snapshot.commitHash}`);
        await execPromise(`git reset --hard ${snapshot.commitHash}`);
      }
      
      // Option 2: File restoration from backup
      else if (snapshot.backupPath && fs.existsSync(snapshot.backupPath)) {
        console.log(`   Restoring files from backup: ${snapshot.backupPath}`);
        const backupFiles = fs.readdirSync(snapshot.backupPath);
        
        for (const file of backupFiles) {
          const sourcePath = path.join(snapshot.backupPath, file);
          // Need to determine original location - this is simplified
          const destPath = path.join('migration-pipeline/staging', file);
          fs.copyFileSync(sourcePath, destPath);
        }
      }
      
      // Update current stage in log
      log.currentStage = snapshot.stage;
      fs.writeFileSync(this.snapshotLog, JSON.stringify(log, null, 2));
      
      console.log(`✅ Successfully rolled back to: ${snapshotId}`);
      
    } catch (error) {
      console.error(`❌ Rollback failed: ${error.message}`);
      throw error;
    }
  }
  
  async listSnapshots() {
    const log = JSON.parse(fs.readFileSync(this.snapshotLog, 'utf8'));
    
    console.log('\n📋 Available Snapshots:');
    console.log('═'.repeat(80));
    
    log.snapshots.forEach(snapshot => {
      console.log(`ID: ${snapshot.id}`);
      console.log(`   Stage: ${snapshot.stage}`);
      console.log(`   Time: ${snapshot.timestamp}`);
      console.log(`   Description: ${snapshot.description}`);
      console.log(`   Files: ${snapshot.files}`);
      console.log('─'.repeat(80));
    });
    
    console.log(`\nCurrent Stage: ${log.currentStage}`);
    
    return log.snapshots;
  }
  
  async cleanOldSnapshots(daysToKeep = 7) {
    const log = JSON.parse(fs.readFileSync(this.snapshotLog, 'utf8'));
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    const snapshotsToKeep = [];
    let removedCount = 0;
    
    for (const snapshot of log.snapshots) {
      const snapshotDate = new Date(snapshot.timestamp);
      
      if (snapshotDate > cutoffDate) {
        snapshotsToKeep.push(snapshot);
      } else {
        // Remove backup directory
        if (snapshot.backupPath && fs.existsSync(snapshot.backupPath)) {
          fs.rmSync(snapshot.backupPath, { recursive: true });
        }
        removedCount++;
      }
    }
    
    log.snapshots = snapshotsToKeep;
    fs.writeFileSync(this.snapshotLog, JSON.stringify(log, null, 2));
    
    console.log(`🧹 Cleaned ${removedCount} old snapshots`);
  }
}

// Export for use in other scripts
module.exports = MigrationSnapshot;

// CLI interface
if (require.main === module) {
  const snapshot = new MigrationSnapshot();
  const command = process.argv[2];
  const arg = process.argv[3];
  
  async function main() {
    switch (command) {
      case 'create':
        const stage = arg || 'manual';
        const files = process.argv.slice(4);
        await snapshot.create(stage, files, 'Manual snapshot');
        break;
        
      case 'rollback':
        if (!arg) {
          console.error('Please provide snapshot ID');
          process.exit(1);
        }
        await snapshot.rollback(arg);
        break;
        
      case 'list':
        await snapshot.listSnapshots();
        break;
        
      case 'clean':
        const days = parseInt(arg) || 7;
        await snapshot.cleanOldSnapshots(days);
        break;
        
      default:
        console.log('Usage:');
        console.log('  node migration-snapshot.js create <stage> <files...>');
        console.log('  node migration-snapshot.js rollback <snapshot-id>');
        console.log('  node migration-snapshot.js list');
        console.log('  node migration-snapshot.js clean [days-to-keep]');
    }
  }
  
  main().catch(console.error);
}