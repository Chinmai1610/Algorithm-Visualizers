// scripts/utils/domUtils.js
// Small DOM helper utilities

/**
 * Query single element. Throws if not found? No — returns null.
 * @param {string} selector
 * @returns {Element|null}
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Query all elements.
 * @param {string} selector
 * @returns {NodeListOf<Element>}
 */
export function qsa(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * Create an element with optional properties.
 * props: { className, id, textContent, attrs: {name:val}, dataset: {k:v} }
 */
export function createEl(tag, props = {}) {
  const el = document.createElement(tag);
  if (props.className) el.className = props.className;
  if (props.id) el.id = props.id;
  if (props.textContent) el.textContent = props.textContent;
  if (props.html) el.innerHTML = props.html;
  if (props.attrs) {
    for (const [k, v] of Object.entries(props.attrs)) el.setAttribute(k, v);
  }
  if (props.dataset) {
    for (const [k, v] of Object.entries(props.dataset)) el.dataset[k] = v;
  }
  return el;
}

/**
 * Empty a container element
 */
export function clearChildren(el) {
  if (!el) return;
  while (el.firstChild) el.removeChild(el.firstChild);
}

/**
 * Safe number parse from input value
 */
export function parseNumberInput(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}
