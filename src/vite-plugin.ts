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
    config(config) {
      // Auto-detect information
      const packageInfo = getPackageInfo();
      const gitInfo = getGitInfo();
      const envInfo = getEnvironmentInfo();

      // Use provided options or auto-detected values
      const packageVersion = options.packageVersion || packageInfo.version;
      // Use the latest Git tag as production version, fallback to package version
      const productionVersion = options.productionVersion || gitInfo.latestTag || `v${packageVersion}`;
      const environment = options.environment || envInfo.nodeEnv;
      const commitHash = options.commitHash || (options.includeGitInfo !== false ? gitInfo.commitHash : '');
      const buildTime = options.buildTime || (options.includeBuildTime !== false ? envInfo.buildTime.toString() : '');

      // Determine the version based on environment and commits after tag
      let version = productionVersion;
      if (environment !== 'production') {
        // Check if there are commits after the latest tag
        const hasCommitsAfterTag = gitInfo.commitsAfterTag && gitInfo.commitsAfterTag > 0;

        if (hasCommitsAfterTag) {
          // We have commits after the latest tag, show next version
          version = incrementVersion(productionVersion);
        } else {
          // We're at the exact tag or no commits after tag, mirror production version
          version = productionVersion;
        }
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