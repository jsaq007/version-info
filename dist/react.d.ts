import React from 'react';
import type { VersionInfo, VersionConfig } from './types';
/**
 * React hook to get version information
 */
export declare const useVersionInfo: (config?: Partial<VersionConfig>) => VersionInfo;
/**
 * React hook to get formatted version string
 */
export declare const useVersionDisplay: (config?: Partial<VersionConfig>) => string;
/**
 * React component to display version information
 */
export interface VersionDisplayProps extends Partial<VersionConfig> {
    className?: string;
    children?: (version: string, info: VersionInfo) => React.ReactNode;
}
export declare const VersionDisplay: React.FC<VersionDisplayProps>;
//# sourceMappingURL=react.d.ts.map