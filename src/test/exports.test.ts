import { describe, it, expect } from 'vitest';
import * as index from '../index';
import * as coreOnly from '../core-only';
import * as vite from '../vite';
import * as webpack from '../webpack';

describe('main exports', () => {
  it('index exports expected members', () => {
    expect(index).toHaveProperty('getVersionInfo');
    expect(index).toHaveProperty('formatVersion');
  });
  it('core-only exports expected members', () => {
    expect(coreOnly).toHaveProperty('getVersionInfo');
    expect(coreOnly).toHaveProperty('formatVersion');
  });
  it('vite exports expected members', () => {
    expect(vite).toHaveProperty('versionInfoPlugin');
  });
  it('webpack exports expected members', () => {
    expect(webpack).toHaveProperty('VersionInfoWebpackPlugin');
  });
}); 