import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export interface GitInfo {
  commitHash: string;
  shortHash: string;
  branch: string;
  tag?: string;
}

export interface PackageInfo {
  version: string;
  name: string;
}

export type BuildSystem = 'vite' | 'webpack' | 'rollup' | 'parcel' | 'unknown';

/**
 * Automatically detect Git information without requiring manual setup
 */
export const getGitInfo = (): GitInfo => {
  try {
    const commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    const shortHash = commitHash.slice(0, 7);
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();

    // Try to get the current tag
    let tag: string | undefined;
    try {
      tag = execSync('git describe --tags --exact-match', { encoding: 'utf8' }).trim();
    } catch {
      // No exact tag match, that's okay
    }

    return { commitHash, shortHash, branch, tag };
  } catch {
    // Git not available or not a git repository
    return { commitHash: '', shortHash: '', branch: '' };
  }
};

/**
 * Automatically read package.json from the current working directory
 */
export const getPackageInfo = (): PackageInfo => {
  try {
    const packagePath = join(process.cwd(), 'package.json');
    if (!existsSync(packagePath)) {
      throw new Error('package.json not found');
    }

    const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
    return {
      version: packageJson.version || '0.0.0',
      name: packageJson.name || 'unknown'
    };
  } catch {
    // Fallback to default values
    return { version: '0.0.0', name: 'unknown' };
  }
};

/**
 * Automatically detect build system and provide appropriate setup
 */
export const detectBuildSystem = (): BuildSystem => {
  const configFiles = [
    'vite.config.js',
    'vite.config.ts',
    'vite.config.mjs',
    'webpack.config.js',
    'webpack.config.ts',
    'webpack.config.mjs',
    'rollup.config.js',
    'rollup.config.ts',
    'rollup.config.mjs',
    'parcel.config.js',
    'parcel.config.ts',
    'parcel.config.mjs'
  ];

  for (const file of configFiles) {
    if (existsSync(join(process.cwd(), file))) {
      if (file.startsWith('vite')) return 'vite';
      if (file.startsWith('webpack')) return 'webpack';
      if (file.startsWith('rollup')) return 'rollup';
      if (file.startsWith('parcel')) return 'parcel';
    }
  }

  return 'unknown';
};

/**
 * Get environment information
 */
export const getEnvironmentInfo = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
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