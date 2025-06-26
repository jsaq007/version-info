// Example: webpack.config.js
const { VersionInfoWebpackPlugin } = require('@julian-querido/version-info/webpack');

module.exports = {
  // ... other webpack config
  plugins: [
    // Zero-config plugin - automatically sets up all environment variables
    new VersionInfoWebpackPlugin(),

    // Or with custom options
    // new VersionInfoWebpackPlugin({
    //   environment: 'staging',
    //   includeGitInfo: true,
    //   includeBuildTime: true,
    // }),
  ],
  // No manual environment variable setup needed!
  // The plugin automatically provides:
  // - process.env.VITE_VERSION
  // - process.env.VITE_PACKAGE_VERSION
  // - process.env.VITE_APP_ENV
  // - process.env.VITE_COMMIT_HASH
  // - process.env.VITE_BUILD_TIME
  // - process.env.VITE_BRANCH
  // - process.env.VITE_TAG
};

// Example: Using in your app
const { getVersionInfo } = require('@julian-querido/version-info');

// Works immediately without any setup
const versionInfo = getVersionInfo();
console.log('Version:', versionInfo.version);
console.log('Environment:', versionInfo.environment);
console.log('Commit Hash:', versionInfo.commitHash); 