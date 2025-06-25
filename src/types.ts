export interface VersionInfo {
  version: string;
  buildTime?: string;
  commitHash?: string;
  environment?: string;
  packageVersion?: string;
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
}

export type Environment = 'production' | 'staging' | 'development' | 'test';

export interface VersionFormatter {
  (info: VersionInfo, config?: Partial<VersionConfig>): string;
} 