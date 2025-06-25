# @julian-querido/version-info

A lightweight, performant version information utility for React/Vite applications. Automatically handles version display across different environments (production, staging, development) with smart version incrementing and configurable formatting.

## Features

- 🚀 **Lightweight**: Zero dependencies, tree-shakeable
- ⚡ **Performant**: Minimal runtime overhead
- 🔧 **Flexible**: Works with any build system (Vite, Webpack, etc.)
- 🎯 **Smart**: Automatically determines version based on environment
- 🎨 **Customizable**: Configurable display options
- 📱 **React Ready**: Includes React hooks and components
- 🔒 **Type Safe**: Full TypeScript support

## Installation

```bash
npm install @julian-querido/version-info
```

## Quick Start

### Basic Usage

```typescript
import { getVersionInfo, formatVersion } from '@julian-querido/version-info';

// Get version information
const versionInfo = getVersionInfo();
console.log(versionInfo);
// { version: 'v1.0.0', environment: 'production', ... }

// Format for display
const display = formatVersion(versionInfo);
console.log(display);
// 'v1.0.0' (production)
// 'v1.0.1 (staging) #abc123d' (staging)
```

### React Usage

```tsx
import { useVersionDisplay, VersionDisplay } from '@julian-querido/version-info';

function App() {
  const version = useVersionDisplay();
  
  return (
    <div>
      <p>Version: {version}</p>
      <VersionDisplay className="text-sm text-gray-500" />
    </div>
  );
}
```

## Environment Variables

The package automatically reads these environment variables:

| Variable               | Description                  | Example                                |
| ---------------------- | ---------------------------- | -------------------------------------- |
| `VITE_VERSION`         | Production version (git tag) | `v1.0.0`                               |
| `VITE_PACKAGE_VERSION` | Package.json version         | `1.0.0`                                |
| `VITE_APP_ENV`         | Environment name             | `production`, `staging`, `development` |
| `VITE_COMMIT_HASH`     | Git commit hash              | `abc123def456`                         |
| `VITE_BUILD_TIME`      | Build timestamp              | `1640995200`                           |

## Version Logic

### Production Environment
- **Source**: Git tag version (e.g., `v1.0.0`)
- **Display**: Clean version only (e.g., `v1.0.0`)

### Non-Production Environments
- **Logic**: 
  - If package.json version differs from production → Show next version
  - If package.json version matches production → Mirror production
- **Display**: Version + environment + commit hash (e.g., `v1.0.1 (staging) #abc123d`)

## API Reference

### Core Functions

#### `getVersionInfo(config?)`

Get version information from environment variables and configuration.

```typescript
import { getVersionInfo } from '@julian-querido/version-info';

const versionInfo = getVersionInfo({
  productionVersion: 'v1.0.0',
  environment: 'staging',
  showEnvironment: true,
});
```

#### `formatVersion(info, config?)`

Format version information for display.

```typescript
import { formatVersion } from '@julian-querido/version-info';

const display = formatVersion(versionInfo, {
  showEnvironment: true,
  showCommitHash: true,
  showBuildTime: false,
});
```

#### `incrementVersion(version, type?)`

Increment version number by patch, minor, or major.

```typescript
import { incrementVersion } from '@julian-querido/version-info';

incrementVersion('v1.0.0'); // 'v1.0.1'
incrementVersion('v1.0.0', 'minor'); // 'v1.1.0'
incrementVersion('v1.0.0', 'major'); // 'v2.0.0'
```

### React Hooks

#### `useVersionInfo(config?)`

React hook to get version information.

```tsx
import { useVersionInfo } from '@julian-querido/version-info';

function MyComponent() {
  const versionInfo = useVersionInfo();
  
  return <div>Version: {versionInfo.version}</div>;
}
```

#### `useVersionDisplay(config?)`

React hook to get formatted version string.

```tsx
import { useVersionDisplay } from '@julian-querido/version-info';

function MyComponent() {
  const version = useVersionDisplay();
  
  return <div>Version: {version}</div>;
}
```

### React Components

#### `VersionDisplay`

React component to display version information.

```tsx
import { VersionDisplay } from '@julian-querido/version-info';

function MyComponent() {
  return (
    <VersionDisplay 
      className="text-sm text-gray-500"
      showEnvironment={true}
      showCommitHash={true}
    />
  );
}
```

## Configuration Options

### VersionConfig

```typescript
interface VersionConfig {
  productionVersion?: string;    // Override production version
  packageVersion?: string;       // Override package version
  environment?: string;          // Override environment
  commitHash?: string;           // Override commit hash
  buildTime?: string;            // Override build time
  showEnvironment?: boolean;     // Show environment in display
  showCommitHash?: boolean;      // Show commit hash in display
  showBuildTime?: boolean;       // Show build time in display
}
```

## Build System Integration

### Vite

```typescript
// vite.config.ts
export default defineConfig({
  define: {
    'import.meta.env.VITE_VERSION': JSON.stringify(process.env.npm_package_version),
    'import.meta.env.VITE_APP_ENV': JSON.stringify(process.env.NODE_ENV),
    'import.meta.env.VITE_COMMIT_HASH': JSON.stringify(process.env.GITHUB_SHA),
    'import.meta.env.VITE_BUILD_TIME': JSON.stringify(Date.now()),
  },
});
```

### Webpack

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VITE_VERSION': JSON.stringify(process.env.npm_package_version),
      'process.env.VITE_APP_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VITE_COMMIT_HASH': JSON.stringify(process.env.GITHUB_SHA),
      'process.env.VITE_BUILD_TIME': JSON.stringify(Date.now()),
    }),
  ],
};
```

## Examples

### Basic Footer Component

```tsx
import { VersionDisplay } from '@julian-querido/version-info';

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 My App</p>
      <VersionDisplay className="text-xs text-gray-400" />
    </footer>
  );
}
```

### Custom Version Display

```tsx
import { useVersionInfo, formatVersion } from '@julian-querido/version-info';

function CustomVersion() {
  const versionInfo = useVersionInfo();
  
  const customDisplay = formatVersion(versionInfo, {
    showEnvironment: false,
    showCommitHash: true,
    showBuildTime: true,
  });
  
  return <span className="version">{customDisplay}</span>;
}
```

### Environment-Specific Styling

```tsx
import { useVersionInfo } from '@julian-querido/version-info';

function EnvironmentBadge() {
  const { environment, version } = useVersionInfo();
  
  const getBadgeColor = () => {
    switch (environment) {
      case 'production': return 'bg-green-100 text-green-800';
      case 'staging': return 'bg-yellow-100 text-yellow-800';
      case 'development': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <span className={`px-2 py-1 rounded text-xs ${getBadgeColor()}`}>
      {environment} - {version}
    </span>
  );
}
```

## Migration from Existing Version System

If you're migrating from your existing version system:

1. **Install the package**:
   ```bash
   npm install @julian-querido/version-info
   ```

2. **Replace imports**:
   ```typescript
   // Old
   import { getVersionInfo, formatVersion } from '../utils/version';
   
   // New
   import { getVersionInfo, formatVersion } from '@julian-querido/version-info';
   ```

3. **Update React components**:
   ```tsx
   // Old
   const versionInfo = getVersionInfo();
   const versionDisplay = formatVersion(versionInfo);
   
   // New
   const version = useVersionDisplay();
   // or
   <VersionDisplay />
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details. 