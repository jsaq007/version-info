export interface VersionInfo {
  version: string;
  buildTime?: string;
  commitHash?: string;
  environment?: string;
  packageVersion?: string;
  branch?: string;
  shortHash?: string;
  tag?: string;
}

export interface VersionConfig {
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

export type Environment = 'production' | 'staging' | 'development' | 'test';

export interface VersionFormatter {
  (info: VersionInfo, config?: Partial<VersionConfig>): string;
}

// Auto-detection interfaces
export interface GitInfo {
  commitHash: string;
  shortHash: string;
  branch: string;
  tag?: string;
  commitsAfterTag?: number;
  latestTag?: string;
}

export interface PackageInfo {
  version: string;
  name: string;
}

export type BuildSystem = 'vite' | 'webpack' | 'rollup' | 'parcel' | 'unknown'; 