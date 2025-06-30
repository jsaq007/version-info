// Mock environment variables for testing
process.env.NODE_ENV = 'test';

// Mock import.meta.env for Vite environments
if (typeof globalThis !== 'undefined') {
  (globalThis as unknown as { import?: unknown }).import = {
    meta: {
      env: {
        VITE_VERSION: 'v1.0.0',
        VITE_APP_ENV: 'test',
        VITE_COMMIT_HASH: 'abc123d',
        VITE_BUILD_TIME: '1640995200',
        VITE_PACKAGE_VERSION: '1.0.0',
        DEV: false,
      },
    },
  };
} 