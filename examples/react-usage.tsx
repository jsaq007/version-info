import React from 'react';
import { useVersionDisplay, VersionDisplay, useVersionInfo } from '../src/index';

// Basic React hook usage
export function VersionComponent() {
  const version = useVersionDisplay();

  return (
    <div>
      <p>Current version: {version}</p>
    </div>
  );
}

// Using the VersionDisplay component
export function FooterComponent() {
  return (
    <footer>
      <p>&copy; 2024 My App</p>
      <VersionDisplay className="text-sm text-gray-500" />
    </footer>
  );
}

// Custom version display with configuration
export function CustomVersionComponent() {
  const versionInfo = useVersionInfo();

  return (
    <div>
      <span className="version-badge">
        {versionInfo.version}
        {versionInfo.environment !== 'production' && (
          <span className="env-badge">({versionInfo.environment})</span>
        )}
      </span>
    </div>
  );
}

// Environment-specific styling
export function EnvironmentBadge() {
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