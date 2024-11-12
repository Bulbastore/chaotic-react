// src/utils/assetPaths.js

const getAssetBasePath = () => {
  // Check if we're running on GitHub Pages
  const isGitHubPages = window.location.hostname === 'bulbastore.github.io';
  return isGitHubPages ? '/chaotic-react' : '';
};

const getAssetPath = (path) => {
  const basePath = getAssetBasePath();
  // Ensure path starts with a forward slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
};

export { getAssetBasePath, getAssetPath };