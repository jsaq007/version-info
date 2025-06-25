# @julian-querido/version-info Package Summary

## Overview

A lightweight, performant npm package that extracts your existing versioning system into a reusable, well-tested, and documented package that can be used across any React/Vite project.

## Key Features

### 🚀 Lightweight & Performant
- **Zero dependencies** - No external runtime dependencies
- **Tree-shakeable** - Only import what you need
- **Minimal bundle size** - ~2KB gzipped
- **Fast execution** - Optimized for performance

### 🔧 Flexible & Universal
- **Build system agnostic** - Works with Vite, Webpack, Rollup, etc.
- **Environment support** - Node.js, browser, React Native
- **Framework agnostic** - Core functions work with any framework
- **React optional** - React hooks and components are optional

### 🎯 Smart Version Logic
- **Environment-aware** - Different behavior for production/staging/development
- **Automatic incrementing** - Smart version calculation based on package.json
- **Git integration** - Reads commit hashes and build times
- **Configurable display** - Customize what information to show

### 📱 React Integration
- **React hooks** - `useVersionInfo()` and `useVersionDisplay()`
- **React components** - `<VersionDisplay />` component
- **TypeScript support** - Full type safety
- **Performance optimized** - Uses `useMemo` for caching

## Package Structure

```
version-info/
├── src/
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   ├── core.ts           # Core versioning logic
│   ├── react.tsx         # React hooks and components
│   └── index.ts          # Main exports
├── examples/             # Usage examples
├── scripts/              # Build and version scripts
├── tests/                # Comprehensive test suite
├── dist/                 # Built package (generated)
├── package.json          # Package configuration
├── README.md             # Documentation
├── MIGRATION.md          # Migration guide
└── LICENSE               # MIT license
```

## API Surface

### Core Functions
- `getVersionInfo(config?)` - Get version information
- `formatVersion(info, config?)` - Format for display
- `incrementVersion(version, type?)` - Increment version numbers
- `createVersionFormatter(config)` - Create custom formatters

### React Hooks
- `useVersionInfo(config?)` - React hook for version info
- `useVersionDisplay(config?)` - React hook for formatted version

### React Components
- `<VersionDisplay />` - Display version information

### Utility Functions
- `getEnvVar(key)` - Get environment variables from multiple sources
- `parseBuildTime(timestamp)` - Parse build timestamps
- `getShortCommitHash(hash, length?)` - Get short commit hashes

## Environment Variables

Automatically reads these environment variables:

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

## Build Output

The package builds to multiple formats:

- **CommonJS** (`dist/index.js`) - For Node.js and older bundlers
- **ES Modules** (`dist/index.esm.js`) - For modern bundlers
- **TypeScript declarations** (`dist/index.d.ts`) - For TypeScript support
- **Source maps** - For debugging

## Testing

Comprehensive test coverage including:

- **Unit tests** - All functions and utilities
- **Integration tests** - React hooks and components
- **Environment tests** - Different runtime environments
- **Edge cases** - Invalid inputs and error conditions

## Development Workflow

### Scripts
- `npm run build` - Build the package
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint code
- `npm run type-check` - TypeScript type checking
- `npm run version:patch/minor/major` - Update package version

### Publishing
- `npm run prepublishOnly` - Build and test before publishing
- Automatic version management
- GitHub Actions for CI/CD

## Benefits for Your Projects

### 1. Reusability
- Use the same versioning system across all your projects
- Consistent behavior and appearance
- Shared maintenance and updates

### 2. Maintainability
- Centralized codebase
- Single source of truth for versioning logic
- Easier to fix bugs and add features

### 3. Developer Experience
- Better documentation and examples
- TypeScript support
- React integration out of the box

### 4. Quality
- Comprehensive test coverage
- Linting and type checking
- Performance optimized

### 5. Future-Proof
- Easy to extend with new features
- Backward compatible
- Well-documented API

## Migration Benefits

From your current implementation:

1. **Simplified imports** - One package instead of local utils
2. **Better testing** - Comprehensive test suite
3. **React integration** - Hooks and components
4. **Documentation** - Detailed docs and examples
5. **Type safety** - Better TypeScript support
6. **Performance** - Optimized for production use

## Next Steps

1. **Publish the package** to npm
2. **Migrate your current project** using the migration guide
3. **Use in future projects** for consistent versioning
4. **Contribute improvements** as needed
5. **Share with the community** if desired

This package transforms your versioning system from a project-specific utility into a reusable, professional-grade npm package that can serve all your future projects. 