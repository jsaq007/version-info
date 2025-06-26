// Re-export all dependencies needed by the vite plugin
export { getGitInfo, getPackageInfo, getEnvironmentInfo } from './auto-detect';
export { incrementVersion } from './utils';

// Export the vite plugin
export { versionInfoPlugin } from './vite-plugin';
export type { VersionInfoPluginOptions } from './vite-plugin'; 