import { describe, it, expect, beforeEach, vi } from 'vitest';
import { incrementVersion, getEnvVar, parseBuildTime, getShortCommitHash } from './utils';

describe('incrementVersion', () => {
  it('should increment patch version', () => {
    expect(incrementVersion('v1.0.0')).toBe('v1.0.1');
    expect(incrementVersion('1.0.0')).toBe('1.0.1');
  });

  it('should increment minor version', () => {
    expect(incrementVersion('v1.0.0', 'minor')).toBe('v1.1.0');
    expect(incrementVersion('1.0.0', 'minor')).toBe('1.1.0');
  });

  it('should increment major version', () => {
    expect(incrementVersion('v1.0.0', 'major')).toBe('v2.0.0');
    expect(incrementVersion('1.0.0', 'major')).toBe('2.0.0');
  });

  it('should handle invalid version format', () => {
    expect(incrementVersion('invalid')).toBe('invalid');
    expect(incrementVersion('1.0')).toBe('1.0');
  });
});

describe('getEnvVar', () => {
  beforeEach(() => {
    // Clear any existing mocks
    vi.clearAllMocks();
  });

  it('should return undefined when no environment variables are available', () => {
    const result = getEnvVar('TEST_VAR');
    expect(result).toBeUndefined();
  });

  it('should handle process.env in Node.js environment', () => {
    const originalEnv = process.env;
    process.env.TEST_VAR = 'test-value';

    const result = getEnvVar('TEST_VAR');
    expect(result).toBe('test-value');

    process.env = originalEnv;
  });

  it('should handle window.__ENV__ in browser environment', () => {
    // Remove process.env.TEST_VAR so window.__ENV__ is used
    delete process.env.TEST_VAR;
    const originalWindow = global.window;
    (global as unknown as { window?: unknown }).window = {
      __ENV__: {
        TEST_VAR: 'browser-value',
      },
    };

    const result = getEnvVar('TEST_VAR');
    expect(result).toBe('browser-value');

    global.window = originalWindow;
  });
});

describe('parseBuildTime', () => {
  it('should parse Unix timestamp in seconds', () => {
    const result = parseBuildTime('1640995200');
    expect(result).toBe('2022-01-01T00:00:00.000Z');
  });

  it('should parse Unix timestamp in milliseconds', () => {
    const result = parseBuildTime('1640995200000');
    expect(result).toBe('2022-01-01T00:00:00.000Z');
  });

  it('should return undefined for invalid timestamp', () => {
    expect(parseBuildTime('invalid')).toBeUndefined();
    expect(parseBuildTime('')).toBeUndefined();
    expect(parseBuildTime(undefined)).toBeUndefined();
  });

  it('should return undefined for NaN', () => {
    expect(parseBuildTime('abc123')).toBeUndefined();
  });
});

describe('getShortCommitHash', () => {
  it('should return short hash with default length', () => {
    expect(getShortCommitHash('abc123def456')).toBe('abc123d');
  });

  it('should return short hash with custom length', () => {
    expect(getShortCommitHash('abc123def456', 5)).toBe('abc12');
  });

  it('should handle short hashes', () => {
    expect(getShortCommitHash('abc123', 10)).toBe('abc123');
  });

  it('should return undefined for empty or undefined hash', () => {
    expect(getShortCommitHash('')).toBeUndefined();
    expect(getShortCommitHash(undefined)).toBeUndefined();
  });
}); 