// Re-export all dependencies needed by the webpack plugin (server-side)
export { getGitInfo, getPackageInfo, getEnvironmentInfo } from './server';
export { incrementVersion } from './utils';

// Export the webpack plugin
export { VersionInfoWebpackPlugin } from './webpack-plugin';
export type { VersionInfoWebpackPluginOptions } from './webpack-plugin'; 