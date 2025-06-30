#!/usr/bin/env node

// Test script to verify Vite plugin commits after tag detection
const { versionInfoPlugin } = require('./dist/vite-plugin.js');

console.log('=== Testing Vite Plugin Commits After Tag Detection ===\n');

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
console.log('- If there are commits after v0.1.7 tag: VITE_VERSION should be "v0.1.8"');
console.log('- If at exact tag: VITE_VERSION should be "v0.1.7"');

console.log('\n=== Test Complete ==='); 