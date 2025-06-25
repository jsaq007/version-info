import { getVersionInfo, formatVersion } from '../src/index';

// Basic usage
const versionInfo = getVersionInfo();
console.log('Version Info:', versionInfo);

const formattedVersion = formatVersion(versionInfo);
console.log('Formatted Version:', formattedVersion);

// With custom configuration
const customVersionInfo = getVersionInfo({
  productionVersion: 'v2.0.0',
  environment: 'staging',
  showEnvironment: true,
  showCommitHash: true,
});

console.log('Custom Version Info:', customVersionInfo);

// Example of version incrementing
import { incrementVersion } from '../src/index';

console.log('Next patch version:', incrementVersion('v1.0.0')); // v1.0.1
console.log('Next minor version:', incrementVersion('v1.0.0', 'minor')); // v1.1.0
console.log('Next major version:', incrementVersion('v1.0.0', 'major')); // v2.0.0 