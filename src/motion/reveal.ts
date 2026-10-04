import { prefersReducedMotion } from "./accessibility";

export function initMotionReveals(selector = "[data-fo-reveal]") {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    elements.forEach(element => element.dataset.foVisible = "true");
    return () => {};
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      (entry.target as HTMLElement).dataset.foVisible = "true";
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });
  elements.forEach(element => observer.observe(element));
  return () => observer.disconnect();
}
