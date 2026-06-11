import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero1 from "../assets/hero/hero1.jpg";
import hero2 from "../assets/hero/hero2.jpg";
import hero6 from "../assets/hero/hero6.jpg";
import hero4 from "../assets/hero/hero4.jpg";

gsap.registerPlugin(ScrollTrigger);

// Pick first match from glob, fall back to provided image
function pickOne(glob, fallback) {
  const vals = Object.values(glob);
  return vals.length > 0 ? vals[0].default : fallback;
}

const residentialImg = pickOne(import.meta.glob("../assets/services/residential.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true }), hero1);
const commercialImg  = pickOne(import.meta.glob("../assets/services/commercial.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",  { eager: true }), hero2);
const hospitalityImg = pickOne(import.meta.glob("../assets/services/hospitality.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true }), hero6);
const developmentImg = pickOne(import.meta.glob("../assets/services/development.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true }), hero4);

const SLIDES = [
  {
    word: "RESIDENTIAL",
    image: residentialImg,
  },
  {
    word: "COMMERCIAL",
    image: commercialImg,
  },
  {
    word: "HOSPITALITY",
    image: hospitalityImg,
  },
  {
    word: "DEVELOPMENT",
    image: developmentImg,
  },
];

/* horizontal scatter offsets (vw) per letter — letters drift left/right before snapping in */
const X_SCATTER = {
  RESIDENTIAL: [-8, 5, -12, 9, -6, 14, -10, 7, -15, 11, -5],
  COMMERCIAL:  [-10, 7, -8, 12, -5, -14, 9, -7, 13, -6],
  HOSPITALITY: [-9, 6, -13, 8, -5, 15, -11, 7, -8, 12, -6],
  DEVELOPMENT: [-7, 10, -12, 6, -15, 8, -9, 13, -5, 11, -8],
};

export default function Services() {
  const outerRef      = useRef(null);   // provides scroll space (n × 100vh)
  const stickyRef     = useRef(null);   // stays at top of viewport
  const slideRefs     = useRef([]);
  const charRefsList  = useRef(SLIDES.map(() => []));
  const infoRefs      = useRef([]);
  const lineRefs      = useRef([]);

  // Keep outer height in px (not css vh) so it stays in sync with window.innerHeight
  const [outerH, setOuterH] = useState(() => window.innerHeight * SLIDES.length);

  useEffect(() => {
    const onResize = () => {
      setOuterH(window.innerHeight * SLIDES.length);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const vh = window.innerHeight;

    const ctx = gsap.context(() => {
      /* ── Init: stack all slides below viewport except slide 0 ── */
      slideRefs.current.forEach((el, i) => {
        if (i > 0 && el) gsap.set(el, { yPercent: 100 });
      });

      /* ── Slide 0 letters — play on enter, not scrubbed ───────── */
      charRefsList.current[0]?.forEach((el, ci) => {
        if (!el) return;
        const sx = (X_SCATTER[SLIDES[0].word] || [])[ci] || 0;
        gsap.from(el, {
          y: "1.8em",
          x: `${sx}vw`,
          opacity: 0,
          duration: 1.1,
          delay: ci * 0.04,
          ease: "power4.out",
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      /* ── Slide 0 info ─────────────────────────────────────────── */
      [infoRefs.current[0], lineRefs.current[0]].forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, y: 20, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      });

      /* ── Slide-up transitions + letter assembly (slides 1-3) ─── */
      for (let i = 0; i < SLIDES.length - 1; i++) {
        const nextSlide = slideRefs.current[i + 1];
        if (!nextSlide) continue;

        /* slide panel rises from below */
        gsap.to(nextSlide, {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: outerRef.current,
            start: `top+=${i * vh}px top`,
            end:   `top+=${(i + 1) * vh}px top`,
            scrub: true,
          },
        });

        /* letters emerge from bottom + drift from x as panel rises */
        charRefsList.current[i + 1]?.forEach((el, ci) => {
          if (!el) return;
          const sx = (X_SCATTER[SLIDES[i + 1].word] || [])[ci] || 0;
          gsap.fromTo(
            el,
            { y: "1.8em", x: `${sx}vw`, opacity: 0 },
            {
              y: 0,
              x: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: outerRef.current,
                start: `top+=${(i + 0.05) * vh}px top`,
                end:   `top+=${(i + 0.8)  * vh}px top`,
                scrub: 1,
              },
            }
          );
        });

        /* info bar fades in once panel is mostly up */
        const infoEl = infoRefs.current[i + 1];
        const lineEl = lineRefs.current[i + 1];
        [infoEl, lineEl].forEach((el) => {
          if (!el) return;
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: outerRef.current,
                start: `top+=${(i + 0.7) * vh}px top`,
                end:   `top+=${(i + 1.0) * vh}px top`,
                scrub: 1,
              },
            }
          );
        });
      }
    }, outerRef);

    // Ensure ScrollTrigger positions are correct after layout settles
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section>
      {/* ── Intro header ─────────────────────────────────────────── */}
      <ServicesIntro />

      {/* ── Pinned slides ────────────────────────────────────────── */}
      {/* outerRef creates the scroll space; stickyRef stays fixed */}
      <div
        ref={outerRef}
        style={{ height: `${outerH}px` }}
        className="relative"
      >
        <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
          {SLIDES.map((slide, i) => {
            const chars  = slide.word.split("");
            const fSize  = `clamp(3rem, ${Math.floor(104 / chars.length)}vw, 18rem)`;

            return (
              <div
                key={slide.word}
                ref={(el) => (slideRefs.current[i] = el)}
                className="absolute inset-0"
                style={{ zIndex: i + 1 }}
              >
                {/* Background image */}
                <img
                  src={slide.image}
                  alt={slide.word}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-[#0F0D0C]/50" />
                <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#0F0D0C]/80 to-transparent" />

                {/* ── Giant word — letters distributed edge-to-edge ── */}
                <div className="absolute top-0 left-0 right-0 flex justify-between items-end"
                  style={{ paddingTop: "0.05em", paddingLeft: "1vw", paddingRight: "1vw" }}>
                  {chars.map((char, ci) => (
                    <span
                      key={ci}
                      ref={(el) => (charRefsList.current[i][ci] = el)}
                      className="font-display text-[#EDE9DF] select-none will-change-transform"
                      style={{ fontSize: fSize, lineHeight: 1, display: "block" }}
                    >
                      {char}
                    </span>
                  ))}
                </div>

                {/* Slide counter */}
                <div className="absolute top-8 right-8 lg:top-12 lg:right-16 z-10">
                  <span className="font-sans text-[#EDE9DF]/25 text-[9px] tracking-[0.4em] uppercase">
                    {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
                  </span>
                </div>

                {/* ── Bottom info bar ─────────────────────────────── */}
                <div className="absolute bottom-0 left-0 right-0 px-5 lg:px-12 pb-10 lg:pb-14">
                  <div
                    ref={(el) => (lineRefs.current[i] = el)}
                    className="w-full h-px bg-white/15 mb-7"
                  />
                  <div
                    ref={(el) => (infoRefs.current[i] = el)}
                    className="flex items-end justify-between gap-6"
                  >
                    {/* Left */}
                    <div className="flex flex-col gap-2">
                      <span className="font-sans text-[#B17457] text-[9px] tracking-[0.4em] uppercase">
                        {slide.word.charAt(0) + slide.word.slice(1).toLowerCase()}
                      </span>
                      <span className="font-sans text-[#EDE9DF]/30 text-[9px] tracking-[0.3em] uppercase">
                        {slide.location}
                      </span>
                    </div>
                    {/* Right */}
                    <div className="flex flex-col items-end gap-3 max-w-sm text-right">
                      <p className="font-display text-[#EDE9DF] text-lg lg:text-xl leading-tight">
                        {slide.project}
                      </p>
                      <p className="font-sans text-[#EDE9DF]/40 text-xs font-light leading-relaxed hidden lg:block">
                        {slide.desc}
                      </p>
                      <Link
                        to="/work"
                        className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.3em] uppercase text-[#EDE9DF]/45 hover:text-[#B17457] transition-colors duration-300 mt-1"
                      >
                        <span className="border-b border-current pb-0.5">View Work</span>
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"
                          className="group-hover:translate-x-1 transition-transform duration-200">
                          <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor"
                            strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Intro header ──────────────────────────────────────────────── */
function ServicesIntro() {
  const secRef = useRef(null);
  const line1  = useRef(null);
  const line2  = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([line1.current, line2.current], {
        opacity: 0, y: 20, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: line1.current, start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.from(subRef.current, {
        opacity: 0, y: 18, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: subRef.current, start: "top 88%", toggleActions: "play none none none" },
      });
      gsap.from(ctaRef.current, {
        opacity: 0, y: 14, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 92%", toggleActions: "play none none none" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={secRef} className="bg-[#1C1714] py-14 lg:py-20 text-center">
      <div className="max-w-[900px] mx-auto px-5 lg:px-12 flex flex-col items-center gap-5">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#B17457]" />
          <span className="font-sans text-[#B17457] text-[10px] tracking-[0.4em] uppercase">What We Do</span>
          <span className="w-8 h-px bg-[#B17457]" />
        </div>
        <h2
          className="font-display text-[#EDE9DF] leading-tight whitespace-nowrap"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)", letterSpacing: "-0.01em" }}
        >
          <div className="overflow-hidden">
            <span ref={line1} className="inline">Our&nbsp;</span>
            <em ref={line2} className="inline not-italic text-[#B17457]">Services</em>
          </div>
        </h2>
        <p ref={subRef} className="font-sans text-[#D9D3C3]/65 font-light text-sm max-w-md leading-relaxed">
          Storytelling through design — a curated spectrum of services
          that transform spaces into lived experiences.
        </p>
        <div ref={ctaRef}>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.3em] uppercase text-[#D9D3C3]/62 hover:text-[#B17457] transition-colors duration-300 mt-2"
          >
            <span className="border-b border-current pb-0.5">Explore Services</span>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"
              className="group-hover:translate-x-1 transition-transform duration-200">
              <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor"
                strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}


