import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scroll and wires it into GSAP ticker.
 * Returns the lenis instance so components can subscribe to scroll events.
 */
export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Let ScrollTrigger know about Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Expose lenis globally so ScrollToTop can reset it
    window.__lenis = lenis;

    // Images finishing their network fetch after mount shift page height,
    // which leaves already-calculated ScrollTrigger positions (e.g. footer
    // animations near the bottom) stale. Refresh whenever any resource
    // loads, debounced, using capture so non-bubbling `load` events on
    // <img> are still caught via delegation.
    let refreshTimer;
    const onResourceLoad = (e) => {
      if (e.target === window || e.target === document) return;
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    document.addEventListener("load", onResourceLoad, true);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      document.removeEventListener("load", onResourceLoad, true);
      clearTimeout(refreshTimer);
    };
  }, []);

  return lenisRef;
}
