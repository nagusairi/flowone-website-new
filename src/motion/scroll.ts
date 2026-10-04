export function bindScrollProgress(element: HTMLElement) {
  let frame = 0;
  const update = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      element.style.setProperty("--fo-scroll-progress", max > 0 ? `${window.scrollY / max}` : "0");
    });
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
  return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); };
}
