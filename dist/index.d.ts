import { Plugin } from 'vite';
import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface VersionInfo {
    version: string;
    buildTime?: string;
    commitHash?: string;
    environment?: string;
    packageVersion?: string;
    branch?: string;
    shortHash?: string;
    tag?: string;
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
    showBranch?: boolean;
    showTag?: boolean;
}
type Environment = 'production' | 'staging' | 'development' | 'test';
interface VersionFormatter {
    (info: VersionInfo, config?: Partial<VersionConfig>): string;
}
interface GitInfo$1 {
    commitHash: string;
    shortHash: string;
    branch: string;
    tag?: string;
}
interface PackageInfo$1 {
    version: string;
    name: string;
}
type BuildSystem$1 = 'vite' | 'webpack' | 'rollup' | 'parcel' | 'unknown';

/**
 * Get version information from environment variables and configuration
 * Now with automatic package.json and Git detection
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

interface GitInfo {
    commitHash: string;
    shortHash: string;
    branch: string;
    tag?: string;
}
interface PackageInfo {
    version: string;
    name: string;
}
type BuildSystem = 'vite' | 'webpack' | 'rollup' | 'parcel' | 'unknown';
/**
 * Automatically detect Git information without requiring manual setup
 */
declare const getGitInfo: () => GitInfo;
/**
 * Automatically read package.json from the current working directory
 */
declare const getPackageInfo: () => PackageInfo;
/**
 * Automatically detect build system and provide appropriate setup
 */
declare const detectBuildSystem: () => BuildSystem;
/**
 * Get environment information
 */
declare const getEnvironmentInfo: () => {
    nodeEnv: string;
    isProduction: boolean;
    isDevelopment: boolean;
    isTest: boolean;
    buildTime: number;
};

interface VersionInfoPluginOptions {
    /**
     * Override the package version
     */
    packageVersion?: string;
    /**
     * Override the production version
     */
    productionVersion?: string;
    /**
     * Override the environment
     */
    environment?: string;
    /**
     * Override the commit hash
     */
    commitHash?: string;
    /**
     * Override the build time
     */
    buildTime?: string;
    /**
     * Whether to include Git information
     */
    includeGitInfo?: boolean;
    /**
     * Whether to include build time
     */
    includeBuildTime?: boolean;
}
/**
 * Vite plugin that automatically sets up version information environment variables
 */
declare function versionInfoPlugin(options?: VersionInfoPluginOptions): Plugin;

interface VersionInfoWebpackPluginOptions {
    /**
     * Override the package version
     */
    packageVersion?: string;
    /**
     * Override the production version
     */
    productionVersion?: string;
    /**
     * Override the environment
     */
    environment?: string;
    /**
     * Override the commit hash
     */
    commitHash?: string;
    /**
     * Override the build time
     */
    buildTime?: string;
    /**
     * Whether to include Git information
     */
    includeGitInfo?: boolean;
    /**
     * Whether to include build time
     */
    includeBuildTime?: boolean;
}
/**
 * Webpack plugin that automatically sets up version information environment variables
 * Note: Webpack is an optional dependency. If webpack is not available, this plugin will throw an error.
 */
declare class VersionInfoWebpackPlugin {
    private options;
    constructor(options?: VersionInfoWebpackPluginOptions);
    apply(compiler: any): void;
}

/**
 * React hook to get version information
 */
declare const useVersionInfo: (config?: Partial<VersionConfig>) => VersionInfo;
/**
 * React hook to get formatted version string
 */
declare const useVersionDisplay: (config?: Partial<VersionConfig>) => string;
/**
 * Simple React component to display version information (matches version-fix.tsx)
 */
declare function VersionDisplay({ className }: {
    className?: string;
}): react_jsx_runtime.JSX.Element;
/**
 * Advanced React component to display version information with full configuration
 */
interface VersionDisplayProps extends Partial<VersionConfig> {
    className?: string;
    children?: (version: string, info: VersionInfo) => React.ReactNode;
}
declare const VersionDisplayAdvanced: React.FC<VersionDisplayProps>;

//# sourceMappingURL=index.d.ts.map

export { VersionDisplay, VersionDisplayAdvanced, VersionInfoWebpackPlugin, createVersionFormatter, getVersionInfo as default, detectBuildSystem, formatVersion, getEnvVar, getEnvironmentInfo, getGitInfo, getPackageInfo, getShortCommitHash, getVersionInfo, incrementVersion, parseBuildTime, useVersionDisplay, useVersionInfo, versionInfoPlugin };
export type { BuildSystem$1 as BuildSystem, Environment, GitInfo$1 as GitInfo, PackageInfo$1 as PackageInfo, VersionConfig, VersionDisplayProps, VersionFormatter, VersionInfo, VersionInfoPluginOptions, VersionInfoWebpackPluginOptions };
