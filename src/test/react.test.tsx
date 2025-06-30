import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';
import { render, renderHook } from '@testing-library/react';
import { useVersionInfo, useVersionDisplay, VersionDisplay, VersionDisplayAdvanced } from '../react';

describe('react exports', () => {
  it('useVersionInfo returns version info', () => {
    const { result } = renderHook(() => useVersionInfo());
    expect(result.current).toHaveProperty('version');
  });

  it('useVersionDisplay returns a string', () => {
    const { result } = renderHook(() => useVersionDisplay());
    expect(typeof result.current).toBe('string');
  });

  it('VersionDisplay renders', () => {
    const { container } = render(<VersionDisplay />);
    expect(container.textContent).toMatch(/v/);
  });

  it('VersionDisplayAdvanced renders', () => {
    const { getByTestId } = render(<VersionDisplayAdvanced />);
    expect(getByTestId('version-display')).toBeInTheDocument();
  });
}); 