// Test file to understand Vite environment variable behavior
console.log('=== Testing import.meta.env simulation ===');

// Simulate what Vite does at build time
const simulatedImportMetaEnv = {
  // Vite replaces these with actual values or undefined
  VITE_API_URL: undefined, // This is what happens when env var is missing
  VITE_PROJECTS_SUBURL: undefined,
  VITE_BLOGS_SUBURL: undefined,
  VITE_TAGS_SUBURL: undefined,
};

// Recreate the environment.js logic
const API_URL = simulatedImportMetaEnv.VITE_API_URL || null;
const PROJECTS_SUBURL = simulatedImportMetaEnv.VITE_PROJECTS_SUBURL || null;
const BLOGS_SUBURL = simulatedImportMetaEnv.VITE_BLOGS_SUBURL || null;
const TAGS_SUBURL = simulatedImportMetaEnv.VITE_TAGS_SUBURL || null;

console.log('API_URL:', API_URL);
console.log('PROJECTS_SUBURL:', PROJECTS_SUBURL);
console.log('BLOGS_SUBURL:', BLOGS_SUBURL);
console.log('TAGS_SUBURL:', TAGS_SUBURL);

console.log('\n=== Testing null checks ===');
console.log('API_URL == null:', API_URL == null);
console.log('PROJECTS_SUBURL == null:', PROJECTS_SUBURL == null);
console.log('BLOGS_SUBURL == null:', BLOGS_SUBURL == null);
console.log('TAGS_SUBURL == null:', TAGS_SUBURL == null);

console.log('\n=== Testing if condition ===');
if (API_URL == null || PROJECTS_SUBURL == null || BLOGS_SUBURL == null || TAGS_SUBURL == null) {
  console.log('ERROR: Environment variables misconfigured - this should throw in real code!');
} else {
  console.log('All environment variables are present');
}
