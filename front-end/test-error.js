// Test if the error is thrown without environment variables
try {
  // Simulate the environment.js import
  const simulatedImportMetaEnv = {
    VITE_API_URL: undefined,
    VITE_PROJECTS_SUBURL: undefined, 
    VITE_BLOGS_SUBURL: undefined,
    VITE_TAGS_SUBURL: undefined,
  };

  const API_URL = simulatedImportMetaEnv.VITE_API_URL || null;
  const PROJECTS_SUBURL = simulatedImportMetaEnv.VITE_PROJECTS_SUBURL || null;
  const BLOGS_SUBURL = simulatedImportMetaEnv.VITE_BLOGS_SUBURL || null;
  const TAGS_SUBURL = simulatedImportMetaEnv.VITE_TAGS_SUBURL || null;

  if (
    API_URL == null ||
    PROJECTS_SUBURL == null ||
    BLOGS_SUBURL == null ||
    TAGS_SUBURL == null
  ) {
    throw Error(
      '!!!!!!! Environment variables misconfigured:\nRequired Environment variables\n - API_URL\n - PROJECTS_SUBURL\n - BLOGS_SUBURL\n - TAGS_SUBURL',
    );
  }

  console.log('No error thrown - this should not happen!');
} catch (error) {
  console.log('ERROR CAUGHT:', error.message);
}
