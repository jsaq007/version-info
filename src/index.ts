// Core exports
export { getVersionInfo, formatVersion, createVersionFormatter } from './core';
export { incrementVersion, getEnvVar, parseBuildTime, getShortCommitHash } from './utils';

// Type exports
export type {
  VersionInfo,
  VersionConfig,
  Environment,
  VersionFormatter,
} from './types';

// React exports (optional)
export { useVersionInfo, useVersionDisplay, VersionDisplay, VersionDisplayAdvanced } from './react';
export type { VersionDisplayProps } from './react';

// Default export for convenience
import { getVersionInfo } from './core';
export default getVersionInfo; 