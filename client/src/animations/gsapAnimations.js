import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Fade in from below
export function fadeInUp(element, delay = 0) {
  return gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    delay,
    ease: "power3.out",
  });
}

// Stagger children fade in
export function staggerFadeIn(elements, delay = 0) {
  return gsap.from(elements, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay,
    stagger: 0.15,
    ease: "power3.out",
  });
}

// Scroll-triggered fade in
export function scrollFadeIn(element, trigger) {
  return gsap.from(element, {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: trigger || element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}

// Parallax effect
export function parallax(element, speed = 0.5) {
  return gsap.to(element, {
    yPercent: -20 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

export { gsap, ScrollTrigger };
