// Create a debug version of environment.js to understand what's happening
console.log('=== Debug Environment Variables ===');

// Log what import.meta.env contains (simulated)
const simulatedImportMetaEnv = {
  MODE: 'development',
  BASE_URL: '/',
  PROD: false,
  DEV: true,
  SSR: false,
  // These should be undefined if not loaded
  VITE_API_URL: undefined,
  VITE_PROJECTS_SUBURL: undefined,
  VITE_BLOGS_SUBURL: undefined,
  VITE_TAGS_SUBURL: undefined,
};

console.log('Full import.meta.env simulation:', simulatedImportMetaEnv);

// Test the exact logic from environment.js
const API_URL = simulatedImportMetaEnv.VITE_API_URL || null;
const PROJECTS_SUBURL = simulatedImportMetaEnv.VITE_PROJECTS_SUBURL || null;
const BLOGS_SUBURL = simulatedImportMetaEnv.VITE_BLOGS_SUBURL || null;
const TAGS_SUBURL = simulatedImportMetaEnv.VITE_TAGS_SUBURL || null;

console.log('After processing:');
console.log('API_URL:', API_URL, 'type:', typeof API_URL);
console.log('PROJECTS_SUBURL:', PROJECTS_SUBURL, 'type:', typeof PROJECTS_SUBURL);
console.log('BLOGS_SUBURL:', BLOGS_SUBURL, 'type:', typeof BLOGS_SUBURL);
console.log('TAGS_SUBURL:', TAGS_SUBURL, 'type:', typeof TAGS_SUBURL);

console.log('\n=== Testing the condition that should trigger error ===');
const shouldThrow = (
  API_URL == null ||
  PROJECTS_SUBURL == null ||
  BLOGS_SUBURL == null ||
  TAGS_SUBURL == null
);

console.log('Should throw?', shouldThrow);
console.log('API_URL == null?', API_URL == null);
console.log('PROJECTS_SUBURL == null?', PROJECTS_SUBURL == null);
console.log('BLOGS_SUBURL == null?', BLOGS_SUBURL == null);
console.log('TAGS_SUBURL == null?', TAGS_SUBURL == null);
