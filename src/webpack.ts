// Re-export all dependencies needed by the webpack plugin
export { getGitInfo, getPackageInfo, getEnvironmentInfo } from './auto-detect';
export { incrementVersion } from './utils';

// Export the webpack plugin
export { VersionInfoWebpackPlugin } from './webpack-plugin';
export type { VersionInfoWebpackPluginOptions } from './webpack-plugin'; 