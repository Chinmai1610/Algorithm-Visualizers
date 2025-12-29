// scripts/utils/arrayGenerator.js
// Utilities to produce arrays for random/custom/reverse modes

import { parseNumberInput } from './domUtils.js';

/**
 * Generate a random integer between min and max (inclusive)
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random array
 * @param {number} size
 * @param {number} min
 * @param {number} max
 * @returns {number[]}
 */
export function generateRandomArray(size = 30, min = 5, max = 100) {
  const n = Math.max(1, parseNumberInput(size, 30));
  const a = new Array(n);
  for (let i = 0; i < n; i++) a[i] = randInt(min, max);
  return a;
}

/**
 * Parse custom input string like "3, 5, 8, 2"
 * Returns array of numbers (filtered)
 */
export function parseCustomArray(text) {
  if (!text || typeof text !== 'string') return [];
  return text.split(',')
    .map(s => s.trim())
    .map(s => Number(s))
    .filter(v => Number.isFinite(v));
}

/**
 * Generate reverse-sorted array of given size
 */
export function generateReverseArray(size = 30, min = 5, max = 100) {
  const arr = generateRandomArray(size, min, max).sort((a,b) => b - a);
  return arr;
}

/**
 * Generic helper: generate by type
 * type: 'random' | 'custom' | 'reverse'
 */
export function generateByType(type = 'random', size = 30, customText = '') {
  if (type === 'custom') {
    const parsed = parseCustomArray(customText);
    if (parsed.length) return parsed;
    // fallback to random if custom invalid
    return generateRandomArray(size);
  }
  if (type === 'reverse') return generateReverseArray(size);
  return generateRandomArray(size);
}
