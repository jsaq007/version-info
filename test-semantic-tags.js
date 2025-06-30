#!/usr/bin/env node

// Test script to verify semantic version tag detection
const { versionInfoPlugin } = require('./dist/vite-plugin.js');

console.log('=== Testing Semantic Version Tag Detection ===\n');

// Mock the plugin config function
const mockConfig = {};
const mockContext = { command: 'build' };

// Test the plugin
const plugin = versionInfoPlugin({
  environment: 'development',
  includeGitInfo: true,
  includeBuildTime: true
});

console.log('Plugin name:', plugin.name);

// Simulate the config function call
const result = plugin.config(mockConfig, mockContext);

console.log('Plugin result:');
console.log('VITE_VERSION:', result.define['import.meta.env.VITE_VERSION']);
console.log('VITE_APP_ENV:', result.define['import.meta.env.VITE_APP_ENV']);
console.log('VITE_COMMIT_HASH:', result.define['import.meta.env.VITE_COMMIT_HASH']);

console.log('\nExpected behavior:');
console.log('- VITE_VERSION should be "v0.1.8" (incremented from v0.1.7 due to commits after tag)');
console.log('- Should NOT use "list" tag as it\'s not a semantic version');

console.log('\n=== Test Complete ==='); 