import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getVersionInfo, formatVersion, createVersionFormatter } from './core';
import type { VersionInfo, VersionConfig } from './types';

// Mock the utils module, including incrementVersion
vi.mock('./utils', () => ({
  getEnvVar: vi.fn(),
  parseBuildTime: vi.fn(),
  getShortCommitHash: vi.fn(),
  incrementVersion: vi.fn((version: string) => {
    // Simple patch increment for test
    const parts = version.replace(/^v/, '').split('.').map(Number);
    parts[2] += 1;
    return (version.startsWith('v') ? 'v' : '') + parts.join('.');
  }),
}));

// Mock the client module (which the core module now imports from)
vi.mock('./client', () => ({
  getGitInfo: vi.fn(() => ({
    commitHash: 'cbf50cc1234567890abcdef',
    shortHash: 'cbf50cc',
    branch: 'main',
    tag: undefined,
    commitsAfterTag: 0,
    latestTag: 'v1.0.0',
  })),
  getPackageInfo: vi.fn(() => ({
    version: '1.0.0',
    name: 'test-package',
  })),
  getEnvironmentInfo: vi.fn(() => ({
    nodeEnv: 'development',
    isProduction: false,
    isDevelopment: true,
    isTest: false,
    buildTime: 1640995200000,
  })),
}));

import { getEnvVar, parseBuildTime, getShortCommitHash, incrementVersion } from './utils';
import { getGitInfo } from './client';

describe('getVersionInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return version info with environment variables', () => {
    const mockEnvVars = {
      VITE_VERSION: 'v1.0.0',
      VITE_PACKAGE_VERSION: '1.0.0',
      VITE_APP_ENV: 'production',
      VITE_COMMIT_HASH: 'abc123def',
      VITE_BUILD_TIME: '1640995200',
    };

    vi.mocked(getEnvVar).mockImplementation((key) => mockEnvVars[key as keyof typeof mockEnvVars]);
    vi.mocked(parseBuildTime).mockReturnValue('2022-01-01T00:00:00.000Z');
    vi.mocked(getShortCommitHash).mockReturnValue('abc123d');

    const result = getVersionInfo();

    expect(result).toEqual({
      version: 'v1.0.0',
      buildTime: '2022-01-01T00:00:00.000Z',
      commitHash: 'abc123def',
      environment: 'production',
      packageVersion: '1.0.0',
      branch: 'main',
      shortHash: 'cbf50cc',
      tag: undefined,
    });
  });

  it('should use config over environment variables', () => {
    const config: Partial<VersionConfig> = {
      productionVersion: 'v2.0.0',
      packageVersion: '2.0.0',
      environment: 'staging',
      commitHash: 'def456ghi',
      buildTime: '2022-01-02T00:00:00.000Z',
    };

    const result = getVersionInfo(config);

    // No increment, since packageVersion === productionVersion (cleaned)
    expect(result).toEqual({
      version: 'v2.0.0',
      buildTime: '2022-01-02T00:00:00.000Z',
      commitHash: 'def456ghi',
      environment: 'staging',
      packageVersion: '2.0.0',
      branch: 'main',
      shortHash: 'cbf50cc',
      tag: undefined,
    });
  });

  it('should handle production environment correctly', () => {
    const config: Partial<VersionConfig> = {
      productionVersion: 'v1.0.0',
      packageVersion: '1.0.0',
      environment: 'production',
    };

    const result = getVersionInfo(config);

    expect(result.version).toBe('v1.0.0');
  });

  it('should increment version for non-production when ahead', () => {
    // Update the mock to simulate commits after tag
    vi.mocked(getGitInfo).mockReturnValue({
      commitHash: 'cbf50cc1234567890abcdef',
      shortHash: 'cbf50cc',
      branch: 'main',
      tag: undefined,
      commitsAfterTag: 2, // 2 commits after the latest tag
      latestTag: 'v1.0.0',
    });

    const config: Partial<VersionConfig> = {
      productionVersion: 'v1.0.0',
      environment: 'staging',
    };

    const result = getVersionInfo(config);

    // Should call the mocked incrementVersion
    expect(incrementVersion).toHaveBeenCalledWith('v1.0.0');
    expect(result.version).toBe('v1.0.1');
  });

  it('should mirror production version when not ahead', () => {
    // Update the mock to simulate no commits after tag
    vi.mocked(getGitInfo).mockReturnValue({
      commitHash: 'cbf50cc1234567890abcdef',
      shortHash: 'cbf50cc',
      branch: 'main',
      tag: 'v1.0.0', // At exact tag
      commitsAfterTag: 0, // No commits after tag
      latestTag: 'v1.0.0',
    });

    const config: Partial<VersionConfig> = {
      productionVersion: 'v1.0.0',
      environment: 'staging',
    };

    const result = getVersionInfo(config);

    expect(result.version).toBe('v1.0.0');
  });
});

describe('formatVersion', () => {
  const mockVersionInfo: VersionInfo = {
    version: 'v1.0.0',
    buildTime: '2022-01-01T00:00:00.000Z',
    commitHash: 'abc123def',
    environment: 'staging',
    packageVersion: '1.0.0',
    branch: 'feature-branch',
    shortHash: 'abc123d',
    tag: 'v1.0.0',
  };

  beforeEach(() => {
    vi.mocked(getShortCommitHash).mockReturnValue('abc123d');
  });

  it('should format production version cleanly', () => {
    const productionInfo = { ...mockVersionInfo, environment: 'production' };
    const result = formatVersion(productionInfo);

    expect(result).toBe('v1.0.0');
  });

  it('should format staging version with environment and commit', () => {
    const result = formatVersion(mockVersionInfo);

    expect(result).toBe('v1.0.0 (staging) #abc123d');
  });

  it('should respect showEnvironment config', () => {
    const result = formatVersion(mockVersionInfo, { showEnvironment: false });

    expect(result).toBe('v1.0.0 #abc123d');
  });

  it('should respect showCommitHash config', () => {
    const result = formatVersion(mockVersionInfo, { showCommitHash: false });

    expect(result).toBe('v1.0.0 (staging)');
  });

  it('should include build time when requested', () => {
    const result = formatVersion(mockVersionInfo, { showBuildTime: true });

    expect(result).toBe('v1.0.0 (staging) #abc123d @2022-01-01');
  });

  it('should include branch when requested', () => {
    const result = formatVersion(mockVersionInfo, { showBranch: true });

    expect(result).toBe('v1.0.0 (staging) #abc123d [feature-branch]');
  });

  it('should include tag when requested', () => {
    const result = formatVersion(mockVersionInfo, { showTag: true });

    expect(result).toBe('v1.0.0 (staging) #abc123d v1.0.0');
  });

  it('should handle missing optional fields', () => {
    const minimalInfo: VersionInfo = {
      version: 'v1.0.0',
      environment: 'production',
    };

    const result = formatVersion(minimalInfo);

    expect(result).toBe('v1.0.0');
  });
});

describe('createVersionFormatter', () => {
  it('should create a formatter with custom config', () => {
    const config: Partial<VersionConfig> = {
      showEnvironment: false,
      showCommitHash: true,
    };

    const formatter = createVersionFormatter(config);
    const mockInfo: VersionInfo = {
      version: 'v1.0.0',
      environment: 'staging',
      commitHash: 'abc123def',
    };

    vi.mocked(getShortCommitHash).mockReturnValue('abc123d');

    const result = formatter(mockInfo);

    expect(result).toBe('v1.0.0 #abc123d');
  });
}); 