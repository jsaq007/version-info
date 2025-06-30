import { describe, it, expect } from 'vitest';
import { VersionInfoWebpackPlugin } from '../webpack-plugin';

describe('webpack-plugin', () => {
  it('should construct without error', () => {
    expect(() => new VersionInfoWebpackPlugin()).not.toThrow();
  });

  it('should have an apply method', () => {
    const plugin = new VersionInfoWebpackPlugin();
    expect(typeof plugin.apply).toBe('function');
  });
}); 