// src/components/assetPaths.js

const getAssetBasePath = () => {
  // Check if we're running on GitHub Pages
  const isGitHubPages = window.location.hostname === 'bulbastore.github.io';
  
  // In development (localhost), use no base path
  const isDevelopment = window.location.hostname === 'localhost';
  
  // Determine the base path based on environment
  let basePath;
  if (isGitHubPages) {
    basePath = '/chaotic-react';
  } else if (isDevelopment) {
    basePath = '/chaotic-react';  // Changed this to match GitHub Pages path
  } else {
    basePath = '/chaotic-react';  // Default to same path
  }
  
  console.log('Current hostname:', window.location.hostname);
  console.log('Environment:', isDevelopment ? 'development' : isGitHubPages ? 'github-pages' : 'other');
  console.log('Using base path:', basePath);
  
  return basePath;
};

const getAssetPath = (path) => {
  const basePath = getAssetBasePath();
  
  // Remove leading slash if present to avoid double slashes
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Combine base path with normalized path
  const fullPath = `${basePath}/${normalizedPath}`;
  
  console.log('Requested asset path:', fullPath);
  return fullPath;
};

export { getAssetBasePath, getAssetPath };