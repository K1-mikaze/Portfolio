const API_URL = import.meta.env.VITE_API_URL;
const PROJECTS_SUBURL = import.meta.env.VITE_PROJECTS_SUBURL;
const BLOGS_SUBURL = import.meta.env.VITE_BLOGS_SUBURL;
const TAGS_SUBURL = import.meta.env.VITE_TAGS_SUBURL;

if (!API_URL || !PROJECTS_SUBURL || !BLOGS_SUBURL || !TAGS_SUBURL) {
  throw Error(
    "!!!!!!! Environment variables misconfigured:\n  Required Environment variables\n - API_URL\n - PROJECTS_SUBURL\n - BLOGS_SUBURL\n - TAGS_SUBURL",
  );
}

export { API_URL, PROJECTS_SUBURL, BLOGS_SUBURL, TAGS_SUBURL };
