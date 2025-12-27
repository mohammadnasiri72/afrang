// @/utils/cacheBuster.js
let buster = Date.now();

export const getMenuCacheBuster = () => buster;

export const invalidateMenuCacheBuster = () => {
  buster = Date.now();
};