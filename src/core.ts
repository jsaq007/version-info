import type { VersionInfo, VersionConfig, Environment } from './types';
import { incrementVersion, getEnvVar, parseBuildTime, getShortCommitHash } from './utils';
import { getGitInfo, getPackageInfo, getEnvironmentInfo } from './client';

/**
 * Get version information from environment variables and configuration
 * Now with automatic package.json and Git detection
 */
export const getVersionInfo = (config?: Partial<VersionConfig>): VersionInfo => {
  // Auto-detect package.json and Git information
  const packageInfo = getPackageInfo();
  const gitInfo = getGitInfo();
  const envInfo = getEnvironmentInfo();

  // Read from Vite environment variables with improved fallbacks
  const viteVersion = config?.productionVersion || getEnvVar('VITE_VERSION');
  const viteAppEnv = config?.environment || getEnvVar('VITE_APP_ENV') || envInfo.nodeEnv;
  const vitePackageVersion = config?.packageVersion || getEnvVar('VITE_PACKAGE_VERSION') || getEnvVar('npm_package_version') || packageInfo.version;
  const viteCommitHash = config?.commitHash || getEnvVar('VITE_COMMIT_HASH') || getEnvVar('GITHUB_SHA') || gitInfo.commitHash;
  const viteBuildTime = config?.buildTime || parseBuildTime(getEnvVar('VITE_BUILD_TIME')) || envInfo.buildTime.toString();

  // Determine the environment
  const environment = viteAppEnv || 'development';

  // Determine the version with better defaults
  let version = 'v0.0.0';
  let productionVersion = viteVersion || `v${packageInfo.version}`;
  let packageVersion = vitePackageVersion || packageInfo.version;

  // Clean production version for comparison
  const productionVersionClean = productionVersion.startsWith('v')
    ? productionVersion.slice(1)
    : productionVersion;

  if (environment === 'production') {
    version = productionVersion;
  } else {
    if (packageVersion !== productionVersionClean) {
      // We're ahead of production, show next version
      version = incrementVersion(productionVersion);
    } else {
      // We're at the same level as production, mirror production version
      version = productionVersion;
    }
  }

  return {
    version,
    buildTime: viteBuildTime,
    commitHash: viteCommitHash,
    environment,
    packageVersion: vitePackageVersion,
    branch: gitInfo.branch,
    shortHash: gitInfo.shortHash,
    tag: gitInfo.tag,
  };
};

/**
 * Determine the appropriate version for each environment
 */
const getEnvironmentVersion = (
  productionVersion: string,
  packageVersion: string,
  environment: Environment
): string => {
  // For production, always use the exact version from git tag
  if (environment === 'production') {
    return productionVersion;
  }

  // For other environments, determine if we're ahead of production
  const productionVersionClean = productionVersion.startsWith('v')
    ? productionVersion.slice(1)
    : productionVersion;

  // If package.json version is different from production, we're ahead
  if (packageVersion !== productionVersionClean) {
    // We're ahead of production, show next version
    return incrementVersion(productionVersion);
  } else {
    // We're at the same level as production, mirror production version
    return productionVersion;
  }
};

/**
 * Format version for display with configurable options
 */
export const formatVersion = (
  info: VersionInfo,
  config?: Partial<VersionConfig>
): string => {
  const {
    showEnvironment = true,
    showCommitHash = true,
    showBuildTime = false,
    showBranch = false,
    showTag = false,
  } = config || {};

  // Only add 'v' if not already present
  let displayText = info.version.startsWith('v') ? info.version : `v${info.version}`;

  // For production, only show the version number (clean and simple)
  if (info.environment === 'production') {
    return displayText;
  }

  // For non-production environments, show additional info based on config
  if (showEnvironment && info.environment && info.environment !== 'production') {
    displayText += ` (${info.environment})`;
  }

  if (showCommitHash && info.commitHash) {
    displayText += ` #${getShortCommitHash(info.commitHash)}`;
  }

  if (showBranch && info.branch && info.branch !== 'main' && info.branch !== 'master') {
    displayText += ` [${info.branch}]`;
  }

  if (showTag && info.tag) {
    displayText += ` ${info.tag}`;
  }

  if (showBuildTime && info.buildTime) {
    const date = new Date(info.buildTime);
    displayText += ` @${date.toISOString().split('T')[0]}`;
  }

  return displayText;
};

/**
 * Create a custom version formatter
 */
export const createVersionFormatter = (config: Partial<VersionConfig>) => {
  return (info: VersionInfo) => formatVersion(info, config);
}; 