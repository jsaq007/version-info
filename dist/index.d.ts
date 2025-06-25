import React from 'react';

interface VersionInfo {
    version: string;
    buildTime?: string;
    commitHash?: string;
    environment?: string;
    packageVersion?: string;
}
interface VersionConfig {
    productionVersion?: string;
    packageVersion?: string;
    environment?: string;
    commitHash?: string;
    buildTime?: string;
    showEnvironment?: boolean;
    showCommitHash?: boolean;
    showBuildTime?: boolean;
}
type Environment = 'production' | 'staging' | 'development' | 'test';
interface VersionFormatter {
    (info: VersionInfo, config?: Partial<VersionConfig>): string;
}

/**
 * Get version information from environment variables and configuration
 */
declare const getVersionInfo: (config?: Partial<VersionConfig>) => VersionInfo;
/**
 * Format version for display with configurable options
 */
declare const formatVersion: (info: VersionInfo, config?: Partial<VersionConfig>) => string;
/**
 * Create a custom version formatter
 */
declare const createVersionFormatter: (config: Partial<VersionConfig>) => (info: VersionInfo) => string;

/**
 * Increment version number by patch, minor, or major
 */
declare const incrementVersion: (version: string, type?: "patch" | "minor" | "major") => string;
/**
 * Get environment variables from different sources
 */
declare const getEnvVar: (key: string) => string | undefined;
/**
 * Parse build time from timestamp
 */
declare const parseBuildTime: (timestamp?: string) => string | undefined;
/**
 * Get short commit hash
 */
declare const getShortCommitHash: (hash?: string, length?: number) => string | undefined;

/**
 * React hook to get version information
 */
declare const useVersionInfo: (config?: Partial<VersionConfig>) => VersionInfo;
/**
 * React hook to get formatted version string
 */
declare const useVersionDisplay: (config?: Partial<VersionConfig>) => string;
/**
 * React component to display version information
 */
interface VersionDisplayProps extends Partial<VersionConfig> {
    className?: string;
    children?: (version: string, info: VersionInfo) => React.ReactNode;
}
declare const VersionDisplay: React.FC<VersionDisplayProps>;

//# sourceMappingURL=index.d.ts.map

export { VersionDisplay, createVersionFormatter, getVersionInfo as default, formatVersion, getEnvVar, getShortCommitHash, getVersionInfo, incrementVersion, parseBuildTime, useVersionDisplay, useVersionInfo };
export type { Environment, VersionConfig, VersionDisplayProps, VersionFormatter, VersionInfo };
