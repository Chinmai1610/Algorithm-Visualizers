// scripts/utils/colorUtils.js
// Centralized color map used by UI components (keeps styling consistent with CSS)

export const COLOR_MAP = {
  blue: '#3b82f6',    // default
  orange: '#fb923c',  // comparing
  red: '#ef4444',     // swapping / not found
  green: '#10b981',   // done / found
  neutral: '#e5e7eb'
};

/**
 * Resolve a color value by key or return the passed value if not found.
 * @param {string} keyOrHex
 * @returns {string}
 */
export function getColor(keyOrHex) {
  if (!keyOrHex) return COLOR_MAP.neutral;
  if (COLOR_MAP[keyOrHex]) return COLOR_MAP[keyOrHex];
  return keyOrHex; // assume it's a valid CSS color
}

/**
 * Apply color to an element (used by alternate renderers)
 * @param {Element} el
 * @param {string} key
 */
export function applyColor(el, key) {
  if (!el) return;
  el.style.background = getColor(key);
}
