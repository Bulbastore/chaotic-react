// src/components/imageCache.js
/**
 * A global image caching system to prevent repeated loading of the same images
 */

// In-memory cache of loaded images
const imageCache = new Map();

/**
 * Load and cache an image from a URL
 * @param {string} url - The image URL to load
 * @param {boolean} crossOrigin - Whether to set crossOrigin to 'anonymous'
 * @returns {Promise<HTMLImageElement>} - Promise resolving to the loaded image
 */
export const loadAndCacheImage = (url, crossOrigin = true) => {
  // Return from cache if available
  if (imageCache.has(url)) {
    return Promise.resolve(imageCache.get(url));
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    if (crossOrigin) {
      img.crossOrigin = 'anonymous';
    }
    
    img.onload = () => {
      // Store in cache
      imageCache.set(url, img);
      resolve(img);
    };
    
    img.onerror = (error) => {
      console.error(`Failed to load image: ${url}`, error);
      reject(new Error(`Failed to load image: ${url}`));
    };
    
    img.src = url;
  });
};

/**
 * Convert image URL to File object for use with the card creator
 * @param {string} url - The image URL
 * @returns {Promise<File|null>} - Promise resolving to a File object
 */
export const urlToFile = async (url) => {
  if (!url) return null;
  
  try {
    // Use the cached image if available
    const img = await loadAndCacheImage(url);
    
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        const fileName = url.split('/').pop() || 'card-image.jpg';
        const file = new File([blob], fileName, { type: 'image/jpeg' });
        resolve(file);
      }, 'image/jpeg');
    });
  } catch (err) {
    console.error('Error converting URL to File:', err);
    return null;
  }
};

/**
 * Get the current cache stats
 * @returns {Object} - Cache statistics
 */
export const getCacheStats = () => {
  return {
    cacheSize: imageCache.size
  };
};

/**
 * Clear the image cache
 */
export const clearImageCache = () => {
  imageCache.clear();
};

export default {
  loadAndCacheImage,
  urlToFile,
  getCacheStats,
  clearImageCache
};