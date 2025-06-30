import { describe, it, expect } from 'vitest';
import { versionInfoPlugin } from '../vite-plugin';

describe('vite-plugin', () => {
  it('should export a function', () => {
    expect(typeof versionInfoPlugin).toBe('function');
  });

  it('should return a plugin object', () => {
    const plugin = versionInfoPlugin();
    expect(plugin).toHaveProperty('name', 'version-info');
    expect(typeof plugin.config).toBe('function');
  });
}); 