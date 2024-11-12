// src/utils/assetPaths.js

const getAssetBasePath = () => {
  // Check if we're running on GitHub Pages
  const isGitHubPages = window.location.hostname === 'bulbastore.github.io';
  const basePath = isGitHubPages ? '/chaotic-react' : '';
  console.log('Current hostname:', window.location.hostname);
  console.log('Using base path:', basePath);
  return basePath;
};

const getAssetPath = (path) => {
  const basePath = getAssetBasePath();
  // Ensure path starts with a forward slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const fullPath = `${basePath}${normalizedPath}`;
  console.log('Requested asset path:', fullPath);
  return fullPath;
};

export { getAssetBasePath, getAssetPath };