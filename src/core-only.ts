// Core exports without React dependencies
export { getVersionInfo, formatVersion, createVersionFormatter } from './core';
export { incrementVersion, getEnvVar, parseBuildTime, getShortCommitHash } from './utils';

// Auto-detection exports
export { getGitInfo, getPackageInfo, detectBuildSystem, getEnvironmentInfo } from './auto-detect';

// Type exports
export type {
  VersionInfo,
  VersionConfig,
  Environment,
  VersionFormatter,
  GitInfo,
  PackageInfo,
  BuildSystem,
} from './types'; 