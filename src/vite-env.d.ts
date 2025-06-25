/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VERSION?: string;
  readonly VITE_APP_ENV?: string;
  readonly VITE_PACKAGE_VERSION?: string;
  readonly VITE_COMMIT_HASH?: string;
  readonly VITE_BUILD_TIME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 