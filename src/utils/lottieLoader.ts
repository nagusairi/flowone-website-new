// Utility to load lottie-light runtime on demand
let lottiePromise: Promise<any> | null = null;

export function loadLottie(): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  const win = window as any;
  if (win.lottie) {
    return Promise.resolve(win.lottie);
  }

  if (!lottiePromise) {
    lottiePromise = new Promise((resolve) => {
      // Check if script tag is already in DOM
      const existing = document.querySelector('script[data-lottie-loader="true"]');
      if (existing) {
        existing.addEventListener("load", () => resolve(win.lottie));
        existing.addEventListener("error", () => resolve(null));
        return;
      }

      const script = document.createElement("script");
      script.src = "/assets/lottie/lottie_light.min.js";
      script.async = true;
      script.dataset.lottieLoader = "true";
      script.onload = () => {
        resolve(win.lottie || null);
      };
      script.onerror = () => {
        console.warn("Could not load lottie runtime, using SVG fallback");
        resolve(null);
      };
      document.head.appendChild(script);
    });
  }

  return lottiePromise;
}
