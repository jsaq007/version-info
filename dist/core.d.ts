import type { VersionInfo, VersionConfig } from './types';
/**
 * Get version information from environment variables and configuration
 */
export declare const getVersionInfo: (config?: Partial<VersionConfig>) => VersionInfo;
/**
 * Format version for display with configurable options
 */
export declare const formatVersion: (info: VersionInfo, config?: Partial<VersionConfig>) => string;
/**
 * Create a custom version formatter
 */
export declare const createVersionFormatter: (config: Partial<VersionConfig>) => (info: VersionInfo) => string;
//# sourceMappingURL=core.d.ts.map