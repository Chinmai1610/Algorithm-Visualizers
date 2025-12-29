// scripts/app.js
// Global initializer used by index.html, home.html, sorting.html, searching.html

import { qs, qsa } from "./utils/domUtils.js";

/**
 * initCommon()
 * Sets shared UI behaviors for the entire app:
 *  - Logo loader
 *  - Optional keyboard shortcuts (play/pause/reset/generate)
 *  - Page fade animations (Optional)
 *  - Accessibility tweaks
 */
export function initCommon(options = {}) {
  const {
    logoPath = "./assets/logo.svg",
    enableKeyboardShortcuts = true,
    fadeInPage = true,
    fadeDuration = 300,
  } = options;

  /* -------------------------------------------------------
     APPLY LOGO TO ANY ELEMENT WITH .logo-img CLASS
  ------------------------------------------------------- */
  const logos = qsa(".logo-img");
  logos.forEach(img => {
    img.src = logoPath;
    img.alt = "Algorithm Visualizer";
  });

  /* -------------------------------------------------------
     PAGE FADE-IN EFFECT
  ------------------------------------------------------- */
  if (fadeInPage) {
    document.body.style.opacity = "0";
    document.body.style.transition = `opacity ${fadeDuration}ms ease-out`;

    window.addEventListener("load", () => {
      requestAnimationFrame(() => {
        document.body.style.opacity = "1";
      });
    });
  }

  /* -------------------------------------------------------
     GLOBAL KEYBOARD SHORTCUTS
     Space  → Play/Pause
     G      → Generate
     R      → Reset
  ------------------------------------------------------- */
  if (enableKeyboardShortcuts) {
    window.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();

      // SPACE → Play or Pause
      if (e.code === "Space") {
        const play = qs("#playBtn") || qs("#searchBtn");
        const pause = qs("#pauseBtn") || qs("#pauseSearchBtn");

        if (play && !play.disabled) play.click();
        else if (pause && !pause.disabled) pause.click();

        e.preventDefault();
      }

      // G → Generate
      if (key === "g") {
        const gen = qs("#generateBtn") || qs("#generateSearchBtn");
        if (gen) gen.click();
      }

      // R → Reset
      if (key === "r") {
        const reset = qs("#resetBtn") || qs("#resetSearchBtn");
        if (reset) reset.click();
      }
    });
  }

  /* -------------------------------------------------------
     FOCUS FIRST INTERACTIVE ELEMENT
     (Improves keyboard navigation)
  ------------------------------------------------------- */
  window.addEventListener("load", () => {
    const first = document.querySelector("button, input, select, a");
    if (first) first.setAttribute("tabindex", "0");
  });

  /* -------------------------------------------------------
     OPTIONAL: Add fade-out effect when leaving page
  ------------------------------------------------------- */
  qsa("a.nav-button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      if (!fadeInPage) return;

      e.preventDefault();
      const target = btn.getAttribute("href");

      document.body.style.opacity = "1";
      document.body.style.transition = `opacity ${fadeDuration}ms ease-in`;
      document.body.style.opacity = "0";

      setTimeout(() => {
        window.location.href = target;
      }, fadeDuration);
    });
  });
}
