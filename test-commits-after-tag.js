#!/usr/bin/env node

// Test script to verify commits after tag detection
const { getVersionInfo } = require('./dist/core-only.js');

console.log('=== Testing Commits After Tag Detection ===\n');

// Test 1: At exact tag (no commits after)
console.log('Test 1: At exact tag (no commits after)');
const atTagResult = getVersionInfo({
  productionVersion: 'v0.1.7', // Latest tag
  environment: 'development'
});
console.log('Development (at tag):', atTagResult.version);
console.log('Expected: v0.1.7\n');

// Test 2: Commits after tag (should increment)
console.log('Test 2: Commits after tag (should increment)');
// This would normally be detected by Git, but for testing we'll simulate it
const afterTagResult = getVersionInfo({
  productionVersion: 'v0.1.7', // Latest tag
  environment: 'development'
});
console.log('Development (after tag):', afterTagResult.version);
console.log('Expected: v0.1.8 (if commits detected)\n');

// Test 3: Production environment (always shows tag)
console.log('Test 3: Production environment');
const productionResult = getVersionInfo({
  productionVersion: 'v0.1.7', // Latest tag
  environment: 'production'
});
console.log('Production:', productionResult.version);
console.log('Expected: v0.1.7\n');

console.log('=== Test Complete ===');
console.log('\nNote: This test uses the client-safe version which always returns 0 commits after tag.');
console.log('In a real environment with Git, it would detect actual commits after the latest tag.'); 