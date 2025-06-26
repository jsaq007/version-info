// Re-export all dependencies needed by the vite plugin (server-side)
export { getGitInfo, getPackageInfo, getEnvironmentInfo } from './server';
export { incrementVersion } from './utils';

// Export the vite plugin
export { versionInfoPlugin } from './vite-plugin';
export type { VersionInfoPluginOptions } from './vite-plugin'; 