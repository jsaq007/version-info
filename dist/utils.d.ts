/**
 * Increment version number by patch, minor, or major
 */
export declare const incrementVersion: (version: string, type?: "patch" | "minor" | "major") => string;
/**
 * Get environment variables from different sources
 */
export declare const getEnvVar: (key: string) => string | undefined;
/**
 * Parse build time from timestamp
 */
export declare const parseBuildTime: (timestamp?: string) => string | undefined;
/**
 * Get short commit hash
 */
export declare const getShortCommitHash: (hash?: string, length?: number) => string | undefined;
//# sourceMappingURL=utils.d.ts.map