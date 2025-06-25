# Migration Guide

This guide helps you migrate from your existing versioning system to the `@julian-querido/version-info` package.

## Current Implementation

Your current versioning system is located in `src/utils/version.ts` and includes:

- `getVersionInfo()` - Gets version information from environment variables
- `formatVersion()` - Formats version for display
- Environment-aware version logic
- React integration in components like `Footer.tsx`

## Migration Steps

### 1. Install the Package

```bash
npm install @julian-querido/version-info
```

### 2. Update Imports

Replace imports in your components:

```typescript
// Old
import { getVersionInfo, formatVersion } from '../utils/version';

// New
import { getVersionInfo, formatVersion } from '@julian-querido/version-info';
```

### 3. Update Footer Component

Your current `Footer.tsx`:

```tsx
// Old implementation
const versionInfo = getVersionInfo();
const versionDisplay = formatVersion(versionInfo);

return (
  <p className="text-sm text-gray-500 dark:text-gray-500 font-mono">
    {versionDisplay}
  </p>
);
```

Can be simplified to:

```tsx
// New implementation
import { VersionDisplay } from '@julian-querido/version-info';

return (
  <VersionDisplay className="text-sm text-gray-500 dark:text-gray-500 font-mono" />
);
```

Or using the hook:

```tsx
// Alternative with hook
import { useVersionDisplay } from '@julian-querido/version-info';

const version = useVersionDisplay();

return (
  <p className="text-sm text-gray-500 dark:text-gray-500 font-mono">
    {version}
  </p>
);
```

### 4. Update Build Configuration

Your current Vite configuration already sets the required environment variables. The package will work with your existing setup:

```typescript
// vite.config.ts (already configured)
define: {
  'import.meta.env.VITE_VERSION': JSON.stringify(process.env.npm_package_version),
  'import.meta.env.VITE_APP_ENV': JSON.stringify(process.env.NODE_ENV),
  'import.meta.env.VITE_COMMIT_HASH': JSON.stringify(process.env.GITHUB_SHA),
  'import.meta.env.VITE_BUILD_TIME': JSON.stringify(Date.now()),
},
```

### 5. Remove Old Files

After confirming everything works:

1. Delete `src/utils/version.ts`
2. Remove the version update script from your main project (keep it in the package)
3. Update any remaining imports

### 6. Update Package Scripts

Your current scripts in `package.json`:

```json
{
  "scripts": {
    "version:next": "node scripts/update-version.js patch",
    "version:minor": "node scripts/update-version.js minor",
    "version:major": "node scripts/update-version.js major"
  }
}
```

Can be removed since the package includes its own version management.

## Benefits of Migration

1. **Reusability**: Use the same versioning system across multiple projects
2. **Maintenance**: Centralized maintenance and updates
3. **Features**: Additional features like React hooks and components
4. **Type Safety**: Better TypeScript support
5. **Testing**: Comprehensive test coverage
6. **Documentation**: Detailed documentation and examples

## Backward Compatibility

The package maintains the same API as your current implementation:

- `getVersionInfo()` - Same signature and behavior
- `formatVersion()` - Same signature and behavior
- Environment variable support - Same variables
- Version logic - Same logic for production/staging/development

## Testing the Migration

1. Install the package
2. Update one component (like Footer.tsx)
3. Test in development and staging environments
4. Verify version display is correct
5. Gradually migrate other components
6. Remove old implementation

## Rollback Plan

If you need to rollback:

1. Keep the old `src/utils/version.ts` file during migration
2. Revert imports to use the old implementation
3. Uninstall the package: `npm uninstall @julian-querido/version-info`

## Support

If you encounter issues during migration:

1. Check the package documentation
2. Compare behavior with your current implementation
3. Open an issue on the package repository
4. Use the rollback plan if needed 