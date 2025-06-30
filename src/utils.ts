/**
 * Increment version number by patch, minor, or major
 */
export const incrementVersion = (version: string, type: 'patch' | 'minor' | 'major' = 'patch'): string => {
  const cleanVersion = version.startsWith('v') ? version.slice(1) : version;
  const parts = cleanVersion.split('.').map(Number);

  if (parts.length !== 3) {
    return version;
  }

  switch (type) {
    case 'major':
      parts[0] += 1;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case 'minor':
      parts[1] += 1;
      parts[2] = 0;
      break;
    case 'patch':
    default:
      parts[2] += 1;
      break;
  }

  const prefix = version.startsWith('v') ? 'v' : '';
  return `${prefix}${parts.join('.')}`;
};

/**
 * Get environment variables from different sources
 */
export const getEnvVar = (key: string): string | undefined => {
  // Try Vite environment variables first (import.meta.env)
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && key in import.meta.env) {
      const value = (import.meta.env as unknown as { [key: string]: unknown })[key];
      if (value !== undefined && value !== null) {
        return String(value);
      }
    }
  } catch {
    // Ignore errors if import.meta is not available
  }

  // Try other possible sources for backward compatibility
  const possibleSources = [
    () => (globalThis as unknown as { import?: { meta?: { env?: Record<string, unknown> } } }).import?.meta?.env?.[key],
    () => (globalThis as unknown as { __VITE_ENV__?: Record<string, unknown> }).__VITE_ENV__?.[key],
    () => (globalThis as unknown as { VITE_ENV?: Record<string, unknown> }).VITE_ENV?.[key],
    () => process.env?.[key],
    () => (window as unknown as { __ENV__?: Record<string, unknown> }).__ENV__?.[key],
  ];

  for (let i = 0; i < possibleSources.length; i++) {
    try {
      const value = possibleSources[i]();
      if (typeof value === 'string') {
        return value;
      }
    } catch {
      // Ignore errors
    }
  }

  return undefined;
};

/**
 * Parse build time from timestamp
 */
export const parseBuildTime = (timestamp?: string): string | undefined => {
  if (!timestamp) return undefined;

  const time = parseInt(timestamp, 10);
  if (isNaN(time)) return undefined;

  // Handle both seconds and milliseconds
  const date = time < 10000000000 ? new Date(time * 1000) : new Date(time);
  return date.toISOString();
};

/**
 * Get short commit hash
 */
export const getShortCommitHash = (hash?: string, length: number = 7): string | undefined => {
  return hash ? hash.slice(0, length) : undefined;
}; 