import { getGitInfo, getPackageInfo, getEnvironmentInfo } from './auto-detect';

export interface VersionInfoWebpackPluginOptions {
  /**
   * Override the package version
   */
  packageVersion?: string;

  /**
   * Override the production version
   */
  productionVersion?: string;

  /**
   * Override the environment
   */
  environment?: string;

  /**
   * Override the commit hash
   */
  commitHash?: string;

  /**
   * Override the build time
   */
  buildTime?: string;

  /**
   * Whether to include Git information
   */
  includeGitInfo?: boolean;

  /**
   * Whether to include build time
   */
  includeBuildTime?: boolean;
}

/**
 * Webpack plugin that automatically sets up version information environment variables
 */
export class VersionInfoWebpackPlugin {
  private options: VersionInfoWebpackPluginOptions;

  constructor(options: VersionInfoWebpackPluginOptions = {}) {
    this.options = options;
  }

  apply(compiler: any) {
    // Auto-detect information
    const packageInfo = getPackageInfo();
    const gitInfo = getGitInfo();
    const envInfo = getEnvironmentInfo();

    // Use provided options or auto-detected values
    const packageVersion = this.options.packageVersion || packageInfo.version;
    const productionVersion = this.options.productionVersion || `v${packageVersion}`;
    const environment = this.options.environment || envInfo.nodeEnv;
    const commitHash = this.options.commitHash || (this.options.includeGitInfo !== false ? gitInfo.commitHash : '');
    const buildTime = this.options.buildTime || (this.options.includeBuildTime !== false ? envInfo.buildTime.toString() : '');

    // Determine the version based on environment
    let version = productionVersion;
    if (environment !== 'production') {
      // For non-production, increment the version
      const { incrementVersion } = require('./utils');
      version = incrementVersion(productionVersion);
    }

    // Define environment variables
    const definePlugin = new (require('webpack').DefinePlugin)({
      'process.env.VITE_VERSION': JSON.stringify(version),
      'process.env.VITE_PACKAGE_VERSION': JSON.stringify(packageVersion),
      'process.env.VITE_APP_ENV': JSON.stringify(environment),
      ...(commitHash && {
        'process.env.VITE_COMMIT_HASH': JSON.stringify(commitHash),
        'process.env.VITE_SHORT_HASH': JSON.stringify(gitInfo.shortHash),
      }),
      ...(buildTime && {
        'process.env.VITE_BUILD_TIME': JSON.stringify(buildTime),
      }),
      ...(gitInfo.branch && {
        'process.env.VITE_BRANCH': JSON.stringify(gitInfo.branch),
      }),
      ...(gitInfo.tag && {
        'process.env.VITE_TAG': JSON.stringify(gitInfo.tag),
      }),
    });

    definePlugin.apply(compiler);
  }
} 