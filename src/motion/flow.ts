import { motionDuration } from "./accessibility";

export function playFlowTransition(element: HTMLElement) {
  element.classList.remove("is-playing");
  void element.offsetWidth;
  element.classList.add("is-playing");
  const timeout = window.setTimeout(() => element.classList.remove("is-playing"), motionDuration(1200));
  return () => window.clearTimeout(timeout);
}
