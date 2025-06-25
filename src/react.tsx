import React, { useMemo } from 'react';
import type { VersionInfo, VersionConfig } from './types';
import { getVersionInfo, formatVersion } from './core';

/**
 * React hook to get version information
 */
export const useVersionInfo = (config?: Partial<VersionConfig>): VersionInfo => {
  return useMemo(() => getVersionInfo(config), [
    config?.productionVersion,
    config?.packageVersion,
    config?.environment,
    config?.commitHash,
    config?.buildTime,
  ]);
};

/**
 * React hook to get formatted version string
 */
export const useVersionDisplay = (config?: Partial<VersionConfig>): string => {
  const versionInfo = useVersionInfo(config);

  return useMemo(() => formatVersion(versionInfo, config), [
    versionInfo,
    config?.showEnvironment,
    config?.showCommitHash,
    config?.showBuildTime,
  ]);
};

/**
 * Simple React component to display version information (matches version-fix.tsx)
 */
export function VersionDisplay({ className = '' }: { className?: string }) {
  const versionInfo = getVersionInfo();

  return <span className={className}>{formatVersion(versionInfo)}</span>;
}

/**
 * Advanced React component to display version information with full configuration
 */
export interface VersionDisplayProps extends Partial<VersionConfig> {
  className?: string;
  children?: (version: string, info: VersionInfo) => React.ReactNode;
}

export const VersionDisplayAdvanced: React.FC<VersionDisplayProps> = ({
  className = '',
  children,
  ...config
}) => {
  const versionInfo = useVersionInfo(config);
  const versionDisplay = useVersionDisplay(config);

  if (children) {
    return <>{children(versionDisplay, versionInfo)}</>;
  }

  return (
    <span className={className} data-testid="version-display">
      {versionDisplay}
    </span>
  );
}; 