import type { Plugin } from 'vite';
import { getGitInfo, getPackageInfo, getEnvironmentInfo } from './server';
import { incrementVersion } from './utils';

export interface VersionInfoPluginOptions {
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
 * Vite plugin that automatically sets up version information environment variables
 */
export function versionInfoPlugin(options: VersionInfoPluginOptions = {}): Plugin {
  return {
    name: 'version-info',
    config(config, { command }) {
      // Auto-detect information
      const packageInfo = getPackageInfo();
      const gitInfo = getGitInfo();
      const envInfo = getEnvironmentInfo();

      // Use provided options or auto-detected values
      const packageVersion = options.packageVersion || packageInfo.version;
      const productionVersion = options.productionVersion || `v${packageVersion}`;
      const environment = options.environment || envInfo.nodeEnv;
      const commitHash = options.commitHash || (options.includeGitInfo !== false ? gitInfo.commitHash : '');
      const buildTime = options.buildTime || (options.includeBuildTime !== false ? envInfo.buildTime.toString() : '');

      // Determine the version based on environment
      let version = productionVersion;
      if (environment !== 'production') {
        // For non-production, increment the version
        version = incrementVersion(productionVersion);
      }

      const define: Record<string, string> = {
        'import.meta.env.VITE_VERSION': JSON.stringify(version),
        'import.meta.env.VITE_PACKAGE_VERSION': JSON.stringify(packageVersion),
        'import.meta.env.VITE_APP_ENV': JSON.stringify(environment),
      };

      if (commitHash) {
        define['import.meta.env.VITE_COMMIT_HASH'] = JSON.stringify(commitHash);
        define['import.meta.env.VITE_SHORT_HASH'] = JSON.stringify(gitInfo.shortHash);
      }

      if (buildTime) {
        define['import.meta.env.VITE_BUILD_TIME'] = JSON.stringify(buildTime);
      }

      if (gitInfo.branch) {
        define['import.meta.env.VITE_BRANCH'] = JSON.stringify(gitInfo.branch);
      }

      if (gitInfo.tag) {
        define['import.meta.env.VITE_TAG'] = JSON.stringify(gitInfo.tag);
      }

      return {
        define: {
          ...config.define,
          ...define,
        }
      };
    }
  };
} 