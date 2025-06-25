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
 * Simple React component to display version information (matches version-fix.tsx)
 */
export declare function VersionDisplay({ className }: {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Advanced React component to display version information with full configuration
 */
export interface VersionDisplayProps extends Partial<VersionConfig> {
    className?: string;
    children?: (version: string, info: VersionInfo) => React.ReactNode;
}
export declare const VersionDisplayAdvanced: React.FC<VersionDisplayProps>;
//# sourceMappingURL=react.d.ts.map