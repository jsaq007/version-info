#!/usr/bin/env node

/**
 * Script to update package.json version
 * Usage: node scripts/update-version.js [patch|minor|major]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.join(__dirname, '..', 'package.json');

function incrementVersion(version, type = 'patch') {
  const parts = version.split('.').map(Number);

  switch (type) {
    case 'major':
      parts[0] += 1;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case 'minor':
      parts[1] += 1;
      parts[2] = 0;
      break;
    case 'patch':
    default:
      parts[2] += 1;
      break;
  }

  return parts.join('.');
}

function updateVersion() {
  try {
    // Read current package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const currentVersion = packageJson.version;

    // Get increment type from command line args
    const incrementType = process.argv[2] || 'patch';

    if (!['patch', 'minor', 'major'].includes(incrementType)) {
      console.error('❌ Invalid increment type. Use: patch, minor, or major');
      process.exit(1);
    }

    // Increment version
    const newVersion = incrementVersion(currentVersion, incrementType);

    // Update package.json
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

    console.log(`✅ Updated version from ${currentVersion} to ${newVersion}`);

  } catch (error) {
    console.error('❌ Error updating version:', error.message);
    process.exit(1);
  }
}

updateVersion(); 