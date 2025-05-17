// Utility functions for handling API URLs and image paths
const API_BASE_URL = 'http://localhost:5000';

/**
 * Converts a relative backend URL to an absolute URL
 * @param {string} path - The relative URL path from the backend
 * @returns {string} - The absolute URL
 */
export function getFullApiUrl(path) {
  // If the path already starts with http:// or https://, return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If the path doesn't start with a slash, add one
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  return `${API_BASE_URL}${path}`;
}

/**
 * Converts an image path to a thumbnail path
 * @param {string} imagePath - The original image path
 * @returns {string} - The thumbnail URL
 */
export function getThumbnailUrl(imagePath) {
  // Extract the ID from the image path
  const id = imagePath.split('/').pop();
  return getFullApiUrl(`/thumbnail/${id}`);
}
