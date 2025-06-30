import { describe, it, expect } from 'vitest';
import * as autoDetect from '../auto-detect';

describe('auto-detect', () => {
  it('should return default git info if not in a git repo', () => {
    const info = autoDetect.getGitInfo();
    expect(info).toHaveProperty('commitHash');
    expect(info).toHaveProperty('shortHash');
    expect(info).toHaveProperty('branch');
  });

  it('should return package info', () => {
    const info = autoDetect.getPackageInfo();
    expect(info).toHaveProperty('version');
    expect(info).toHaveProperty('name');
  });

  it('should detect build system', () => {
    const system = autoDetect.detectBuildSystem();
    expect(['vite', 'webpack', 'rollup', 'parcel', 'unknown']).toContain(system);
  });

  it('should get environment info', () => {
    const env = autoDetect.getEnvironmentInfo();
    expect(env).toHaveProperty('nodeEnv');
    expect(env).toHaveProperty('isProduction');
    expect(env).toHaveProperty('isDevelopment');
    expect(env).toHaveProperty('isTest');
    expect(env).toHaveProperty('buildTime');
  });
}); 