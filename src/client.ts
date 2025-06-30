import type { GitInfo, PackageInfo, BuildSystem } from './types';

/**
 * Client-safe version of getGitInfo
 * Returns empty values since Git info is only available at build time
 */
export const getGitInfo = (): GitInfo => {
  return {
    commitHash: '',
    shortHash: '',
    branch: '',
    commitsAfterTag: 0,
    latestTag: undefined
  };
};

/**
 * Client-safe version of getPackageInfo
 * Returns default values since package.json is only available at build time
 */
export const getPackageInfo = (): PackageInfo => {
  return { version: '0.0.0', name: 'unknown' };
};

/**
 * Client-safe version of detectBuildSystem
 * Returns 'unknown' since build system detection is only available at build time
 */
export const detectBuildSystem = (): BuildSystem => {
  return 'unknown';
};

/**
 * Client-safe version of getEnvironmentInfo
 * Uses browser-safe APIs to get environment information
 */
export const getEnvironmentInfo = () => {
  // Try to get NODE_ENV from various sources
  let nodeEnv = 'development';

  try {
    // Try import.meta.env first (Vite)
    if (typeof import.meta !== 'undefined' && import.meta.env?.MODE) {
      nodeEnv = import.meta.env.MODE;
    }
    // Try process.env (if available in browser)
    else if (typeof process !== 'undefined' && process.env?.NODE_ENV) {
      nodeEnv = process.env.NODE_ENV;
    }
    // Try window.__ENV__ (custom env)
    else if (typeof window !== 'undefined' && (window as unknown as { __ENV__?: { NODE_ENV?: string } }).__ENV__?.NODE_ENV) {
      nodeEnv = (window as unknown as { __ENV__?: { NODE_ENV?: string } }).__ENV__?.NODE_ENV || 'development';
    }
  } catch {
    // Fallback to development
  }

  const isProduction = nodeEnv === 'production';
  const isDevelopment = nodeEnv === 'development';
  const isTest = nodeEnv === 'test';

  return {
    nodeEnv,
    isProduction,
    isDevelopment,
    isTest,
    buildTime: Date.now()
  };
}; 