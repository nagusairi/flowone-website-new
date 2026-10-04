export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function motionDuration(duration: number) {
  return prefersReducedMotion() ? 0 : duration;
}
