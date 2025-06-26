// Example: vite.config.ts
import { defineConfig } from 'vite';
import { versionInfoPlugin } from '@julian-querido/version-info/vite';

export default defineConfig({
  plugins: [
    // Zero-config plugin - automatically sets up all environment variables
    versionInfoPlugin(),

    // Or with custom options
    // versionInfoPlugin({
    //   environment: 'staging',
    //   includeGitInfo: true,
    //   includeBuildTime: true,
    // }),
  ],
  // No manual environment variable setup needed!
  // The plugin automatically provides:
  // - VITE_VERSION
  // - VITE_PACKAGE_VERSION
  // - VITE_APP_ENV
  // - VITE_COMMIT_HASH
  // - VITE_BUILD_TIME
  // - VITE_BRANCH
  // - VITE_TAG
});

// Example: Using in your app
import { getVersionInfo } from '@julian-querido/version-info';

// Works immediately without any setup
const versionInfo = getVersionInfo();
console.log('Version:', versionInfo.version);
console.log('Environment:', versionInfo.environment);
console.log('Commit Hash:', versionInfo.commitHash);

// React component example (in a .tsx file)
/*
function App() {
  const version = useVersionDisplay(); // Works out of the box!
  
  return (
    <div>
      <h1>My App</h1>
      <p>Version: {version}</p>
    </div>
  );
}
*/ 