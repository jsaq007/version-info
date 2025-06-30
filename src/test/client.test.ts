import { describe, it, expect } from 'vitest';
import * as client from '../client';

describe('client stubs', () => {
  it('getGitInfo returns empty values', () => {
    expect(client.getGitInfo()).toEqual({
      commitHash: '',
      shortHash: '',
      branch: '',
      commitsAfterTag: 0,
      latestTag: undefined
    });
  });

  it('getPackageInfo returns default values', () => {
    expect(client.getPackageInfo()).toEqual({ version: '0.0.0', name: 'unknown' });
  });

  it('detectBuildSystem returns unknown', () => {
    expect(client.detectBuildSystem()).toBe('unknown');
  });

  it('getEnvironmentInfo returns expected shape', () => {
    const env = client.getEnvironmentInfo();
    expect(env).toHaveProperty('nodeEnv');
    expect(env).toHaveProperty('isProduction');
    expect(env).toHaveProperty('isDevelopment');
    expect(env).toHaveProperty('isTest');
    expect(env).toHaveProperty('buildTime');
  });
}); 