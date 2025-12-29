// components/speedController.js
// Maps speed label to delay in milliseconds PER STEP

const SPEED_MAP = {
  fullslow: 1000,   // ~3 minutes total duration
  medium:   800,   // ~2 minutes
  slow:     700    // ~1 minute
};

export function getDelay(speedKey) {
  return SPEED_MAP[speedKey] ?? SPEED_MAP.medium;
}
