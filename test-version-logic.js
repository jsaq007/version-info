#!/usr/bin/env node

// Test script to verify version logic
const { getVersionInfo } = require('./dist/core-only.js');

console.log('=== Testing Version Logic ===\n');

// Test 1: Production environment (should show tag version)
console.log('Test 1: Production Environment');
const productionResult = getVersionInfo({
  productionVersion: 'v0.1.5', // Latest tag
  packageVersion: '0.1.6',     // Package.json version (ahead)
  environment: 'production'
});
console.log('Production:', productionResult.version);
console.log('Expected: v0.1.5\n');

// Test 2: Development environment (should show incremented version)
console.log('Test 2: Development Environment');
const devResult = getVersionInfo({
  productionVersion: 'v0.1.5', // Latest tag
  packageVersion: '0.1.6',     // Package.json version (ahead)
  environment: 'development'
});
console.log('Development:', devResult.version);
console.log('Expected: v0.1.6\n');

// Test 3: Staging environment (should show incremented version)
console.log('Test 3: Staging Environment');
const stagingResult = getVersionInfo({
  productionVersion: 'v0.1.5', // Latest tag
  packageVersion: '0.1.6',     // Package.json version (ahead)
  environment: 'staging'
});
console.log('Staging:', stagingResult.version);
console.log('Expected: v0.1.6\n');

// Test 4: When package.json matches production (should mirror production)
console.log('Test 4: Package.json matches production');
const matchResult = getVersionInfo({
  productionVersion: 'v0.1.5', // Latest tag
  packageVersion: '0.1.5',     // Package.json version (same)
  environment: 'development'
});
console.log('Development (same):', matchResult.version);
console.log('Expected: v0.1.5\n');

console.log('=== Test Complete ==='); 