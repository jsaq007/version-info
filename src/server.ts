import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export interface GitInfo {
  commitHash: string;
  shortHash: string;
  branch: string;
  tag?: string;
  commitsAfterTag?: number;
  latestTag?: string;
}

export interface PackageInfo {
  version: string;
  name: string;
}

export type BuildSystem = 'vite' | 'webpack' | 'rollup' | 'parcel' | 'unknown';

/**
 * Automatically detect Git information without requiring manual setup
 * SERVER-SIDE ONLY - uses Node.js modules
 */
export const getGitInfo = (): GitInfo => {
  try {
    const commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    const shortHash = commitHash.slice(0, 7);
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();

    // Try to get the current tag (only semantic version tags)
    let tag: string | undefined;
    try {
      const currentTag = execSync('git describe --tags --exact-match', { encoding: 'utf8' }).trim();
      // Only use semantic version tags (v*.*.*)
      if (currentTag.match(/^v\d+\.\d+\.\d+/)) {
        tag = currentTag;
      }
    } catch {
      // No exact tag match, that's okay
    }

    // Get the latest semantic version tag and commits after it
    let latestTag: string | undefined;
    let commitsAfterTag: number | undefined;

    try {
      // Get all tags and filter for semantic version tags
      const allTags = execSync('git tag --list "v*" --sort=-version:refname', { encoding: 'utf8' }).trim().split('\n');
      const semanticTags = allTags.filter(tag => tag.match(/^v\d+\.\d+\.\d+/)).filter(Boolean);

      if (semanticTags.length > 0) {
        latestTag = semanticTags[0]; // First one is the latest due to sort

        // Count commits between HEAD and the latest semantic version tag
        const commitsOutput = execSync(`git rev-list --count ${latestTag}..HEAD`, { encoding: 'utf8' }).trim();
        commitsAfterTag = parseInt(commitsOutput, 10);

        // If we're at the exact semantic version tag, commitsAfterTag should be 0
        if (tag === latestTag) {
          commitsAfterTag = 0;
        }
      }
    } catch {
      // No tags found or other git error
      latestTag = undefined;
      commitsAfterTag = undefined;
    }

    return {
      commitHash,
      shortHash,
      branch,
      tag,
      latestTag,
      commitsAfterTag
    };
  } catch {
    // Git not available or not a git repository
    return { commitHash: '', shortHash: '', branch: '' };
  }
};

/**
 * Automatically read package.json from the current working directory
 * SERVER-SIDE ONLY - uses Node.js modules
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
 * SERVER-SIDE ONLY - uses Node.js modules
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
 * SERVER-SIDE ONLY - uses Node.js modules
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