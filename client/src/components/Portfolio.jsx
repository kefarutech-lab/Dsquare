import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero1 from "../assets/hero/hero1.avif";
import hero2 from "../assets/hero/hero2.avif";
import hero3 from "../assets/hero/hero3.avif";
import hero4 from "../assets/hero/hero4.avif";
import hero5 from "../assets/hero/hero5.avif";
import hero6 from "../assets/hero/hero6.avif";

gsap.registerPlugin(ScrollTrigger);

function toImages(glob, fallbacks) {
  const srcs = Object.values(glob).map((m) => m.default).sort();
  return srcs.length > 0 ? srcs : fallbacks;
}

const jagtapImages   = toImages(import.meta.glob("../assets/projects/jagtap/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",              { eager: true }), [hero3, hero4]);
const butteImages    = toImages(import.meta.glob("../assets/projects/butte-patil/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",         { eager: true }), [hero1, hero2]);
const turaImages     = toImages(import.meta.glob("../assets/projects/tura/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",                { eager: true }), [hero2, hero3]);
const savitriImages  = toImages(import.meta.glob("../assets/projects/savitri-corps/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",       { eager: true }), [hero4, hero5]);
const acaiImages     = toImages(import.meta.glob("../assets/projects/acai-hotel/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",          { eager: true }), [hero5, hero6]);
const finupImages    = toImages(import.meta.glob("../assets/projects/finup-consultancy/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",   { eager: true }), [hero4, hero5]);
const pcPatilImages  = toImages(import.meta.glob("../assets/projects/ca-official/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",         { eager: true }), [hero6, hero1]);

const FEATURED = [
  {
    number: "01",
    name: "Jagtap Residency",
    type: "Residential",
    location: "Pune",
    desc: "Modern living spaces designed around natural light and spatial flow — a harmonious blend of contemporary luxury and timeless comfort.",
    images: [jagtapImages[0], jagtapImages[1] ?? jagtapImages[0]],
    slug: "jagtap",
  },
  {
    number: "02",
    name: "Butte Patil Residency",
    type: "Residential",
    location: "Pune",
    desc: "A refined family home balancing elegant aesthetics with functional living. Clean lines, curated materials and bespoke detailing bring warmth to every room.",
    images: [butteImages[0], butteImages[1] ?? butteImages[0]],
    slug: "butte-patil",
  },
  {
    number: "03",
    name: "TTura Restaurant ",
    type: "Residential",
    location: "Pune",
    desc: "A thoughtfully designed restaurant interior that balances contemporary aesthetics with a welcoming atmosphere, creating an immersive dining experience through refined materials, lighting, and spatial detailing.",    images: [turaImages[0], turaImages[1] ?? turaImages[0]],
    slug: "tura",
  },
  {
    number: "04",
    name: "Savitri Corps",
    type: "Residential",
    location: "Pune",
    desc: "A thoughtfully designed residence where every detail reflects the client's vision of elegant, functional living — spaces that are as beautiful as they are liveable.",
    images: [savitriImages[0], savitriImages[1] ?? savitriImages[0]],
    slug: "savitri-corps",
  },
  {
    number: "05",
    name: "Acai Restaurant",
    type: "Café & Hospitality",
    location: "Pune",
    desc: "A vibrant restaurant experience where contemporary design meets warm hospitality. Every space is crafted to leave a lasting impression — from the entrance to every dining detail.",  
    images: [acaiImages[0], acaiImages[1] ?? acaiImages[0]],
    slug: "acai",
  },
  {
    number: "06",
    name: "Finup Corporate Office",
    type: "Commercial",
    location: "Pune",
    desc: "A professional workspace designed to reflect credibility and precision — clean lines, considered lighting and a material palette that inspires confidence.",
    images: [finupImages[0], finupImages[1] ?? finupImages[0]],
    slug: "finup-consultancy",
  },
  {
    number: "07",
    name: "PC Patil Corporate office",
    type: "Commercial",
    location: "Pune",
    desc: "A chartered accountancy office interior crafted to communicate trust and structure — disciplined layout, premium materials and a palette that balances warmth with professionalism.",
    images: [pcPatilImages[0], pcPatilImages[1] ?? pcPatilImages[0]],
    slug: "ca-official",
  },
];

export default function Portfolio() {
  const [current, setCurrent] = useState(0);
  const sectionRef   = useRef(null);
  const containerRef = useRef(null); // the overflow-hidden viewport
  const trackRef     = useRef(null); // the flex strip of slides
  const tagRef       = useRef(null);
  const line1Ref     = useRef(null);
  const line2Ref     = useRef(null);

  /* ── Go to slide — pixel-based so every slide snaps correctly ── */
  const goTo = (index) => {
    if (index === current) return;
    const w = containerRef.current.offsetWidth;
    gsap.to(trackRef.current, {
      x: -(w * index),
      duration: 0.78,
      ease: "power3.inOut",
    });
    setCurrent(index);
  };

  const prev = () => goTo((current - 1 + FEATURED.length) % FEATURED.length);
  const next = () => goTo((current + 1) % FEATURED.length);

  /* ── Recalculate on resize so slides stay in sync ─────────── */
  useEffect(() => {
    const onResize = () => {
      if (!containerRef.current || !trackRef.current) return;
      const w = containerRef.current.offsetWidth;
      gsap.set(trackRef.current, { x: -(w * current) });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [current]);

  /* ── Section entrance ───────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tagRef.current, {
        opacity: 0, y: 14, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: tagRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.fromTo(line1Ref.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: line1Ref.current, start: "top 85%", toggleActions: "play none none none" } }
      );
      gsap.from(containerRef.current, {
        opacity: 0, y: 40, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Touch swipe ────────────────────────────────────────────── */
  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section ref={sectionRef} className="bg-[#0F0D0C] py-10 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">

        {/* ── Header ───────────────────────────────────────────── */}
        <div className="mb-6 lg:mb-20">
          <div ref={tagRef} className="flex items-center gap-3 mb-0">
          </div>
          {/* Single-line heading with left→right wipe reveal */}
          <div className="overflow-hidden">
            <h2
              ref={line1Ref}
              className="font-display text-[#EDE9DF] whitespace-nowrap"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.02em" }}
            >
              Featured&nbsp;<em ref={line2Ref} className="not-italic text-[#B17457]">Projects</em>
            </h2>
          </div>
        </div>

        {/* ── Carousel wrapper with side arrows ────────────────── */}
        <div className="relative">

          {/* ── LEFT arrow (hidden on first slide) ── */}
          {current > 0 && (
            <button
              onClick={prev}
              aria-label="Previous project"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 lg:-translate-x-6 z-10
                         w-12 h-12 border border-[#D9D3C3]/22 bg-[#0F0D0C]/70 backdrop-blur-sm
                         flex items-center justify-center
                         text-[#D9D3C3]/65 hover:border-[#B17457] hover:text-[#B17457]
                         transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M13 7H1M6 2L1 7L6 12" stroke="currentColor" strokeWidth="1.3"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* ── RIGHT arrow (hidden on last slide) ── */}
          {current < FEATURED.length - 1 && (
            <button
              onClick={next}
              aria-label="Next project"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 lg:translate-x-6 z-10
                         w-12 h-12 border border-[#D9D3C3]/22 bg-[#0F0D0C]/70 backdrop-blur-sm
                         flex items-center justify-center
                         text-[#D9D3C3]/65 hover:border-[#B17457] hover:text-[#B17457]
                         transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* ── Overflow viewport ── */}
          <div
            ref={containerRef}
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* ── Sliding track ── */}
            <div ref={trackRef} className="flex">
              {FEATURED.map((project, i) => (
                <div
                  key={project.slug}
                  className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5 lg:gap-16 items-center flex-shrink-0 px-2 lg:px-4"
                  style={{ width: "100%" }}
                >
                  {/* ── Images ── */}
                  <div className="grid grid-cols-2 gap-2 lg:gap-3 h-[220px] sm:h-[380px] lg:h-[480px]">
                    <div className="relative overflow-hidden group">
                      <img src={project.images[0]} alt={project.name} draggable={false}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-[#0F0D0C]/15" />
                    </div>
                    <div className="relative overflow-hidden group mt-6 lg:mt-16">
                      <img src={project.images[1]} alt={project.name} draggable={false}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-[#0F0D0C]/15" />
                    </div>
                  </div>

                  {/* ── Content ── */}
                  <div className="flex flex-col gap-3 py-1 lg:py-0">

                    <h3
                      className="font-display text-[#EDE9DF] leading-tight"
                      style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.02em" }}
                    >
                      {project.name}
                    </h3>

                    <div className="w-10 h-px bg-[#B17457]" />

                    <p className="hidden lg:block font-sans text-[#D9D3C3]/72 text-sm font-light leading-loose max-w-sm">
                      {project.desc}
                    </p>

                    <Link
                      to={`/projects/${project.slug}`}
                      className="group self-start inline-flex items-center gap-3 bg-[#B17457] text-[#EDE9DF] font-sans text-[10px] tracking-[0.3em] uppercase px-7 py-3.5 hover:bg-[#9a6245] transition-colors duration-300 mt-1"
                    >
                      A Quick Glance
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
                        className="group-hover:translate-x-1 transition-transform duration-200">
                        <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3"
                          strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Dots + counter ───────────────────────────────────── */}
        <div className="flex items-center justify-between mt-3 lg:mt-8">
          <div className="flex items-center gap-2">
            {FEATURED.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className="transition-all duration-400 rounded-none"
                style={{
                  width:           i === current ? "28px" : "8px",
                  height:          "3px",
                  backgroundColor: i === current ? "#B17457" : "#D9D3C3",
                  opacity:         i === current ? 1 : 0.25,
                }}
              />
            ))}
          </div>
          <span className="font-sans text-[#D9D3C3]/40 text-[10px] tracking-[0.2em]">
            {String(current + 1).padStart(2, "0")} / {String(FEATURED.length).padStart(2, "0")}
          </span>
        </div>

      </div>
    </section>
  );
}
