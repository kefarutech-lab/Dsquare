import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import hero1 from "../assets/hero/hero1.avif";
import hero2 from "../assets/hero/hero2.avif";
import hero3 from "../assets/hero/hero3.avif";
import hero4 from "../assets/hero/hero4.avif";
import hero5 from "../assets/hero/hero5.avif";
import hero6 from "../assets/hero/hero6.avif";

const SLIDES = [
  { img: hero1, label: "Living Spaces" },
  { img: hero2, label: "Master Suites" },
  { img: hero3, label: "Kitchen & Dining" },
  { img: hero4, label: "Work Studios" },
  { img: hero5, label: "Luxury Exteriors" },
  { img: hero6, label: "Signature Spaces" },
];

const INTERVAL = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const currentRef  = useRef(0); // always up-to-date, no stale closure
  const imgRefs     = useRef([]);
  const zoomTweens  = useRef([]);

  // Text refs
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const ctaRef     = useRef(null);
  const lineRef    = useRef(null);

  // ── Text entrance animation ────────────────────────────────
  useEffect(() => {
    // Small breath after splash fades before hero animates
    const tl = gsap.timeline({ delay: 0.15 });

    // Line 1 slides up
    // Line 2 slides up with stagger delay
    tl.from(headingRef.current.children, {
        opacity: 0,
        y: 70,
        duration: 1.1,
        stagger: 0.14,
        ease: "power3.out",
      })
      // Divider draws
      .from(lineRef.current, {
        scaleX: 0,
        duration: 0.6,
        ease: "power2.out",
        transformOrigin: "left center",
      }, "-=0.4")
      // Subtext fades in
      .from(subRef.current, {
        opacity: 0,
        y: 22,
        duration: 0.85,
        ease: "power3.out",
      }, "-=0.35")
      // CTA buttons appear
      .from(ctaRef.current.children, {
        opacity: 0,
        y: 16,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
      }, "-=0.4");

    return () => tl.kill();
  }, []);

  // ── Crossfade to next slide ────────────────────────────────
  const goTo = (next) => {
    const prev    = currentRef.current;
    const prevImg = imgRefs.current[prev];
    const nextImg = imgRefs.current[next];
    if (!prevImg || !nextImg) return;

    // Kill existing zoom on prev
    zoomTweens.current[prev]?.kill();
    gsap.set(prevImg, { scale: 1 });

    // Fade next in over prev
    gsap.set(nextImg, { opacity: 0, scale: 1, zIndex: 2 });
    gsap.to(nextImg, {
      opacity: 1,
      duration: 1.6,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(prevImg, { opacity: 0, zIndex: 1 });
        gsap.set(nextImg, { zIndex: 1 });
      },
    });

    // Zoom in on next slide
    zoomTweens.current[next] = gsap.to(nextImg, {
      scale: 1.08,
      duration: (INTERVAL + 1600) / 1000,
      ease: "none",
    });

    currentRef.current = next;
    setCurrent(next);
  };

  // ── Start carousel ─────────────────────────────────────────
  useEffect(() => {
    // Zoom slide 0 on mount
    const firstImg = imgRefs.current[0];
    if (firstImg) {
      gsap.set(firstImg, { opacity: 1, scale: 1, zIndex: 1 });
      zoomTweens.current[0] = gsap.to(firstImg, {
        scale: 1.08,
        duration: (INTERVAL + 1600) / 1000,
        ease: "none",
      });
    }

    const id = setInterval(() => {
      const next = (currentRef.current + 1) % SLIDES.length;
      goTo(next);
    }, INTERVAL);

    return () => {
      clearInterval(id);
      zoomTweens.current.forEach((t) => t?.kill());
    };
  }, []);


  return (
    <section className="relative w-full h-[70vh] lg:h-screen overflow-hidden bg-[#0F0D0C]">

      {/* ── Images ──────────────────────────────────────────── */}
      {SLIDES.map((slide, i) => (
        <img
          key={i}
          ref={(el) => (imgRefs.current[i] = el)}
          src={slide.img}
          alt={slide.label}
          loading={i === 0 ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ opacity: i === 0 ? 1 : 0, zIndex: 1 }}
        />
      ))}

      {/* ── Overlays ─────────────────────────────────────────── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0F0D0C] via-[#0F0D0C]/40 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0F0D0C]/60 via-transparent to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0F0D0C]/30 via-transparent to-transparent" />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end">
        <div className="max-w-[1400px] mx-auto w-full px-5 lg:px-12 pb-6 lg:pb-12">


          {/* Heading */}
          <h1
            ref={headingRef}
            className="font-display mb-4 lg:mb-6 overflow-hidden"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 700 }}
          >
            <span className="block text-[#EDE9DF]">Where Space</span>
            <span className="block text-[#EDE9DF]">
              Becomes <em className="text-[#B17457] not-italic">Art.</em>
            </span>
          </h1>

          {/* Divider */}
          <div ref={lineRef} className="w-16 h-px bg-[#B17457]/60 mb-4 lg:mb-6" style={{ transformOrigin: "left center" }} />

          {/* Subtext */}
          <p
            ref={subRef}
            className="font-sans text-[#D9D3C3]/70 font-light mb-6 lg:mb-10 max-w-md"
            style={{ fontSize: "clamp(0.875rem, 1.4vw, 1rem)", lineHeight: 1.8 }}
          >
            We craft interiors that merge elegance with intention —
            spaces that reflect who you are and how you live.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex items-center gap-3 sm:gap-6">
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 sm:gap-3 bg-[#B17457] text-[#EDE9DF] font-sans text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase px-4 sm:px-7 py-3.5 sm:py-4 hover:bg-[#8A5A3F] transition-colors duration-300 whitespace-nowrap"
            >
              Explore Our Work
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0">
                <path d="M1 7H13M8 2L13 7L8 12" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}


