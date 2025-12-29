// scripts/utils/sleep.js
// tiny promise-based sleep used across modules

/**
 * Pause execution for ms milliseconds (await sleep(ms))
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, Math.max(0, ms | 0)));
}
