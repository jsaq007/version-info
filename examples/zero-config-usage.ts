import { getVersionInfo, formatVersion, getGitInfo, getPackageInfo, detectBuildSystem } from '../src/index';

// Zero-config usage - works out of the box!
console.log('=== Zero-Config Usage ===');

// Automatically reads package.json and Git info
const versionInfo = getVersionInfo();
console.log('Version Info:', versionInfo);

const formattedVersion = formatVersion(versionInfo);
console.log('Formatted Version:', formattedVersion);

// Auto-detection utilities
const packageInfo = getPackageInfo();
console.log('Package Info:', packageInfo);

const gitInfo = getGitInfo();
console.log('Git Info:', gitInfo);

const buildSystem = detectBuildSystem();
console.log('Build System:', buildSystem);

// Enhanced formatting with new options
const detailedVersion = formatVersion(versionInfo, {
  showEnvironment: true,
  showCommitHash: true,
  showBranch: true,
  showTag: true,
  showBuildTime: true,
});
console.log('Detailed Version:', detailedVersion); 