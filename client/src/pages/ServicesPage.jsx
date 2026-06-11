import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero1 from "../assets/hero/hero1.jpg";
import hero2 from "../assets/hero/hero2.jpg";
import hero3 from "../assets/hero/hero3.jpg";
import hero4 from "../assets/hero/hero4.jpg";
import hero5 from "../assets/hero/hero5.jpg";
import hero6 from "../assets/hero/hero6.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ── Load featured project hero images ─────────────────────────── */
function toHero(glob, fallback) {
  return Object.values(glob)[0]?.default ?? fallback;
}

const jagtapHero  = toHero(import.meta.glob("../assets/projects/jagtap/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",              { eager: true }), hero3);
const butteHero   = toHero(import.meta.glob("../assets/projects/butte-patil/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",         { eager: true }), hero1);
const turaHero    = toHero(import.meta.glob("../assets/projects/tura/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",                { eager: true }), hero2);
const savitriHero = toHero(import.meta.glob("../assets/projects/savitri-corps/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",       { eager: true }), hero4);
const acaiHero    = toHero(import.meta.glob("../assets/projects/acai-hotel/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",          { eager: true }), hero5);
const finupHero   = toHero(import.meta.glob("../assets/projects/finup-consultancy/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",   { eager: true }), hero4);
const pcPatilHero = toHero(import.meta.glob("../assets/projects/ca-official/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",         { eager: true }), hero6);

/* ── Data ──────────────────────────────────────────────────────── */
const SERVICE_PANELS = [
  {
    name: "Interior Design",
    slug: "interior-design",
    image: hero1,
    thumb: hero3,
    desc: "We design interiors that tell the story of each client, shaping residences, commercial spaces and developments through thoughtful detailing, curated materials and considered layouts to create environments that are beautiful, functional and deeply personal.",
  },
  {
    name: "Commercial Spaces",
    slug: "commercial",
    image: hero2,
    thumb: hero4,
    desc: "We shape environments where people perform at their best — lobbies, offices, retail and hospitality spaces crafted with the same precision and intention we bring to every residential project.",
  },
  {
    name: "Café & Hospitality",
    slug: "hospitality",
    image: hero6,
    thumb: hero5,
    desc: "We create branded hospitality environments that leave lasting impressions — from intimate cafés to landmark venues — where every material choice, every detail, contributes to the story of the place.",
  },
  {
    name: "Project Development",
    slug: "development",
    image: hero4,
    thumb: hero1,
    desc: "With in-house expertise across interior design and project management, we offer a fully integrated service — from initial concept and spatial planning through to architectural detailing, installation and handover.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    name: "DISCOVERY",
    desc: "Every project begins with understanding — not only what you envision, but how you will live, work, and thrive within the space. We listen deeply, uncovering aspirations, lifestyle requirements, and the true character of the environment, to build a foundation of purpose.",
  },
  {
    step: "02",
    name: "DEVELOPMENT",
    desc: "Through design meetings led by senior members of our team, we translate ideas into atmosphere and narrative. This stage is about storytelling, layering concept, mood, and materiality to shape a vision that is both unique and timeless.",
  },
  {
    step: "03",
    name: "DETAILING",
    desc: "The vision becomes tangible. We refine every element — from architectural detailing and bespoke joinery to finishes and furnishings — ensuring coherence, precision, and artistry across every scale.",
  },
  {
    step: "04",
    name: "DELIVERY",
    desc: "We seamlessly orchestrate the installation and handover, managing every discipline and detail with care. Our experienced project management team ensures deadlines are met and that the result is a space ready to be lived in, admired, and enjoyed from the very first moment.",
  },
];

const OBJECTS = [
  { image: jagtapHero,  title: "Jagtap Residence",           desc: "A contemporary family home designed around natural light, spatial flow and the quiet luxury of considered living." },
  { image: butteHero,   title: "Butte Patil Residence",      desc: "A refined family home balancing elegant aesthetics with the warmth of everyday living — luxurious and deeply personal." },
  { image: turaHero,    title: "Tura Residence",             desc: "Contemporary elegance and warmth of considered living, shaped through proportion, material quality and natural light." },
  { image: savitriHero, title: "Savitri Corps",              desc: "Generous, composed and quietly refined spaces — a home that lives as beautifully as it looks." },
  { image: acaiHero,    title: "Acai — Café & Hospitality",  desc: "A boutique hospitality experience where vibrant energy meets intimately considered design and layered materiality." },
  { image: finupHero,   title: "Finup Consultancy Office",   desc: "A professional workspace that feels authoritative yet approachable — precision and purpose in every detail." },
  { image: pcPatilHero, title: "PC Patil Office",            desc: "A chartered accountancy interior projecting quiet authority — disciplined layout, premium materials, enduring form." },
];

/* ═══════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  return (
    <main className="bg-[#0F0D0C]">
      <HeroSection />
      <EditorialSection />
      <ServicePanelsSection />
      <ProcessSection />
      <ObjectsDesireSection />
    </main>
  );
}

/* ── 1. Hero ────────────────────────────────────────────────────── */
function HeroSection() {
  const heroRef   = useRef(null);
  const wordRef   = useRef(null);
  const imgRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(wordRef.current, {
        opacity: 0, y: 40, duration: 1.4, ease: "power3.out", delay: 0.3,
      });
      gsap.to(imgRef.current, {
        yPercent: -12, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      <img ref={imgRef} src={hero2} alt="Services" draggable={false}
        className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform" />
      <div className="absolute inset-0 bg-[#0F0D0C]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0D0C]/30 via-transparent to-[#0F0D0C]/40" />

      {/* Centered word */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          ref={wordRef}
          className="font-display text-[#EDE9DF] text-center select-none"
          style={{ fontSize: "clamp(3rem, 9vw, 10rem)", letterSpacing: "0.08em" }}
        >
          SERVICES
        </h1>
      </div>

      {/* Bottom tag */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#B17457]" />
          <span className="font-sans text-[#D9D3C3]/72 text-[9px] tracking-[0.4em] uppercase">Architectural Design Company</span>
          <span className="w-8 h-px bg-[#B17457]" />
        </div>
      </div>
    </section>
  );
}

/* ── 2. Editorial Statement ─────────────────────────────────────── */
function EditorialSection() {
  const secRef   = useRef(null);
  const headRef  = useRef(null);
  const col1Ref  = useRef(null);
  const col2Ref  = useRef(null);
  const lineRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { x: "-15vw", opacity: 0 },
        { x: 0, opacity: 1, duration: 1.6, ease: "power2.out",
          scrollTrigger: { trigger: headRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      gsap.from(lineRef.current, {
        scaleX: 0, duration: 1, ease: "power2.out", transformOrigin: "left center",
        scrollTrigger: { trigger: lineRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.from([col1Ref.current, col2Ref.current], {
        opacity: 0, y: 30, duration: 0.9, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: col1Ref.current, start: "top 85%", toggleActions: "play none none none" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-[#0F0D0C] py-28 lg:py-40 px-5 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        {/* Large editorial statement */}
        <h2
          ref={headRef}
          className="font-display text-[#EDE9DF] leading-[1.1] mb-20 lg:mb-28"
          style={{ fontSize: "clamp(2rem, 4.5vw, 5rem)", letterSpacing: "-0.01em", maxWidth: "900px" }}
        >
          <em className="not-italic text-[#B17457]">REALISATION</em> of <em className="not-italic text-[#B17457]">EXTRAORDINARY</em> DETAIL
          and an UNRIVALLED <em className="not-italic text-[#B17457]">DEDICATION</em> to MATERIAL.
        </h2>

        {/* Divider */}
        <div ref={lineRef} className="w-full h-px bg-[#D9D3C3]/10 mb-16"
          style={{ transformOrigin: "left center" }} />

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 max-w-[1100px] ml-auto">
          <p ref={col1Ref} className="font-sans text-[#D9D3C3]/74 font-light text-base lg:text-lg leading-loose">
            Dsquare Designs is a Architectural Design Company renowned for crafting spaces that combine individuality, refinement and enduring quality. From elegant residences to innovative workplaces and landmark developments, we create environments that balance function and beauty, while reflecting the unique identity of each client. As a leading luxury design Company, our work spans the full spectrum of design and delivery, from initial concept and spatial planning to architectural detailing, bespoke interior design and final installation.
          </p>
          <p ref={col2Ref} className="font-sans text-[#D9D3C3]/74 font-light text-base lg:text-lg leading-loose">
            With in-house expertise across interior design, architecture and project management, we offer a fully integrated service that ensures every project is cohesive, meticulously executed and tailored to its purpose. We collaborate with an international network of artisans, suppliers and craftspeople, sourcing materials and creating pieces that are both timeless and distinctive. Every decision is made with intention, considering sustainability, longevity and the story a space will tell.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ── 3. Service Panels ──────────────────────────────────────────── */
function ServicePanelsSection() {
  return (
    <section className="bg-[#0F0D0C]">
      {SERVICE_PANELS.map((svc, i) => (
        <ServicePanel key={svc.name} svc={svc} index={i} />
      ))}
    </section>
  );
}

function ServicePanel({ svc, index }) {
  const panelRef   = useRef(null);
  const imgRef     = useRef(null);
  const contentRef = useRef(null);
  const titleRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -12, ease: "none",
        scrollTrigger: { trigger: panelRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
      gsap.from(imgRef.current.parentElement, {
        x: -60, opacity: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: panelRef.current, start: "top 75%", toggleActions: "play none none none" },
      });
      gsap.from(contentRef.current.children, {
        opacity: 0, x: 50, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: panelRef.current, start: "top 70%", toggleActions: "play none none none" },
      });
    }, panelRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={panelRef} className="grid grid-cols-1 lg:grid-cols-2 min-h-screen border-t border-[#D9D3C3]/8">

      {/* Left: image */}
      <div className="relative overflow-hidden min-h-[50vh] lg:min-h-screen">
        <img ref={imgRef} src={svc.image} alt={svc.name} draggable={false}
          className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform" />
        <div className="absolute inset-0 bg-[#0F0D0C]/30" />

        {/* Project label at bottom */}
        <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12">
          <p className="font-sans text-[#EDE9DF]/35 text-[8px] tracking-[0.4em] uppercase mb-1"></p>
          <div className="flex items-center gap-3 group cursor-pointer">
            <p className="font-display text-[#EDE9DF] text-base lg:text-lg tracking-wide">{svc.project}</p>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              className="group-hover:translate-x-1 transition-transform duration-200">
              <path d="M1 7H13M8 2L13 7L8 12" stroke="white" strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Index */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12">
          <span className="font-sans text-[#EDE9DF]/20 text-[9px] tracking-[0.4em] uppercase">
            {String(index + 1).padStart(2, "0")} / {String(SERVICE_PANELS.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Right: content */}
      <div className="bg-[#0F0D0C] flex items-center px-10 lg:px-16 xl:px-24 py-20 lg:py-0">
        <div ref={contentRef} className="flex flex-col gap-8 max-w-md">

          {/* Service name */}
          <h2 ref={titleRef}
            className="font-display text-[#EDE9DF] leading-tight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", letterSpacing: "-0.01em" }}>
            {svc.name.toUpperCase().split(" ").map((word, wi) => (
              <span key={wi} className={wi % 2 === 1 ? "block text-[#B17457]" : "block"}>{word}</span>
            ))}
          </h2>

          {/* Thumbnail */}
          <div className="relative overflow-hidden border border-[#B17457]/25"
            style={{ width: "260px", height: "170px" }}>
            <img src={svc.thumb} alt="" draggable={false}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>

          {/* Description */}
          <p className="font-sans text-[#D9D3C3]/72 text-sm font-light leading-loose">
            {svc.desc}
          </p>

          {/* CTA */}
          <Link to={`/services/${svc.slug}`}
            className="group self-start inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.3em] uppercase text-[#D9D3C3]/62 hover:text-[#B17457] transition-colors duration-300">
            <span className="border-b border-current pb-0.5">View Projects</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"
              className="group-hover:translate-x-1 transition-transform duration-200">
              <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

        </div>
      </div>
    </div>
  );
}

/* ── 4. A Refined Process ───────────────────────────────────────── */
function ProcessSection() {
  const secRef   = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const rowRefs  = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([line1Ref.current, line2Ref.current], {
        yPercent: 110, duration: 1.1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: line1Ref.current, start: "top 85%", toggleActions: "play none none none" },
      });
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, y: 30, duration: 0.9, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none none" },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-[#1C1714] py-28 lg:py-40 px-5 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        {/* Heading */}
        <div className="text-center mb-20 lg:mb-28">
          <h2 className="font-display text-[#EDE9DF]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.02em" }}>
            <div className="overflow-hidden pb-1">
              <span ref={line1Ref} className="block">A REFINED</span>
            </div>
            <div className="overflow-hidden">
              <em ref={line2Ref} className="block not-italic text-[#B17457]">PROCESS</em>
            </div>
          </h2>
        </div>

        {/* Process rows */}
        <div className="flex flex-col">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.name}
              ref={(el) => (rowRefs.current[i] = el)}
              className="grid grid-cols-1 lg:grid-cols-[280px_1fr_1fr] gap-6 lg:gap-16 py-10 border-t border-[#D9D3C3]/10 items-start"
            >
              {/* Step name */}
              <div className="flex items-baseline gap-4">
                <span className="font-sans text-[#B17457] text-[9px] tracking-[0.35em]">{step.step}</span>
                <h3 className="font-display text-[#EDE9DF]"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", letterSpacing: "0.05em" }}>
                  {step.name}
                </h3>
              </div>

              {/* Description — spans 2 cols */}
              <p className="font-sans text-[#D9D3C3]/72 text-sm font-light leading-loose lg:col-span-2 max-w-2xl">
                {step.desc}
              </p>
            </div>
          ))}
          {/* Final border */}
          <div className="border-t border-[#D9D3C3]/10" />
        </div>

      </div>
    </section>
  );
}

/* ── 5. Objects of Desire ───────────────────────────────────────── */
function ObjectsDesireSection() {
  const [active, setActive] = useState(2);
  const secRef     = useRef(null);
  const headRef    = useRef(null);
  const lineRef    = useRef(null);
  const trackRef   = useRef(null);
  const infoRef    = useRef(null);
  const titleRef   = useRef(null);
  const descRef    = useRef(null);
  const dotsRef    = useRef(null);
  const slotRefs   = useRef([]);
  const touchStartX = useRef(null);

  const prev = () => setActive((i) => (i - 1 + OBJECTS.length) % OBJECTS.length);
  const next = () => setActive((i) => (i + 1) % OBJECTS.length);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  /* ── Scroll entrance ─────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Heading word reveal */
      gsap.from(headRef.current, {
        opacity: 0, y: 40, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none none" },
      });

      /* Decorative line draws in */
      gsap.from(lineRef.current, {
        scaleX: 0, duration: 0.9, ease: "power2.out", transformOrigin: "center center",
        scrollTrigger: { trigger: lineRef.current, start: "top 88%", toggleActions: "play none none none" },
      });

      /* Carousel slots stagger in from bottom */
      gsap.from(slotRefs.current.filter(Boolean), {
        opacity: 0, y: 60, scale: 0.92,
        duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: trackRef.current, start: "top 82%", toggleActions: "play none none none" },
      });

      /* Info block */
      gsap.from(infoRef.current, {
        opacity: 0, y: 24, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: infoRef.current, start: "top 88%", toggleActions: "play none none none" },
      });

      /* Dots */
      gsap.from(dotsRef.current, {
        opacity: 0, y: 14, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: dotsRef.current, start: "top 92%", toggleActions: "play none none none" },
      });

    }, secRef);
    return () => ctx.revert();
  }, []);

  /* ── Text fade on slide change ───────────────────────────── */
  useEffect(() => {
    if (titleRef.current)
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.38, ease: "power2.out" }
      );
    if (descRef.current)
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.38, ease: "power2.out", delay: 0.07 }
      );
  }, [active]);

  /* visible slots: relative indices -2 to +2 */
  const slots = [-2, -1, 0, 1, 2];
  const W     = [120, 200, 320, 200, 120];
  const H     = [160, 260, 440, 260, 160];
  const OP    = [0.35, 0.65, 1, 0.65, 0.35];

  return (
    <section ref={secRef} className="bg-[#0F0D0C] py-24 lg:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">

        {/* Heading */}
        <div ref={headRef} className="text-center mb-4">
          <h2 className="font-display text-[#EDE9DF]"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "0.04em" }}>
            FEATURED <em className="not-italic text-[#B17457]">Projects</em>
          </h2>
        </div>
        <div ref={lineRef} className="w-10 h-px bg-[#B17457] mx-auto mb-16"
          style={{ transformOrigin: "center center" }} />

        {/* ── Mobile: single-slide carousel ── */}
        <div
          ref={trackRef}
          className="lg:hidden relative overflow-hidden"
          style={{ aspectRatio: "4/3" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <img
            src={OBJECTS[active].image}
            alt={OBJECTS[active].title}
            draggable={false}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-[#0F0D0C]/20" />
          <div className="absolute -inset-[5px] border-2 border-[#B17457] pointer-events-none" />

          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#0F0D0C]/60 border border-[#D9D3C3]/20 flex items-center justify-center text-[#D9D3C3]/80 hover:border-[#B17457] hover:text-[#B17457] transition-colors duration-300"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1M6 2L1 7L6 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#0F0D0C]/60 border border-[#D9D3C3]/20 flex items-center justify-center text-[#D9D3C3]/80 hover:border-[#B17457] hover:text-[#B17457] transition-colors duration-300"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ── Desktop: 5-slot fan carousel ── */}
        <div className="hidden lg:flex items-center justify-center gap-6">
          {slots.map((offset, si) => {
            const idx      = (active + offset + OBJECTS.length) % OBJECTS.length;
            const item     = OBJECTS[idx];
            const isCenter = offset === 0;

            return (
              <div
                key={si}
                ref={(el) => (slotRefs.current[si] = el)}
                onClick={offset !== 0 ? (offset < 0 ? prev : next) : undefined}
                className="relative flex-shrink-0 overflow-hidden transition-all duration-500"
                style={{
                  width:   W[si],
                  height:  H[si],
                  opacity: OP[si],
                  cursor:  isCenter ? "default" : "pointer",
                }}
              >
                {isCenter && (
                  <div className="absolute -inset-[6px] border-2 border-[#B17457] z-10 pointer-events-none" />
                )}
                <img src={item.image} alt={item.title} draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-[#0F0D0C]/20" />
              </div>
            );
          })}

          {/* Next arrow */}
          <button
            onClick={next}
            className="ml-4 w-10 h-10 border border-[#D9D3C3]/20 flex items-center justify-center text-[#D9D3C3]/62 hover:border-[#B17457] hover:text-[#B17457] transition-colors duration-300 flex-shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Active item info — fades on change */}
        <div ref={infoRef} className="text-center mt-10">
          <p ref={titleRef} className="font-display text-[#EDE9DF] text-lg lg:text-xl tracking-wide mb-3">
            {OBJECTS[active].title}
          </p>
          <p ref={descRef} className="font-sans text-[#D9D3C3]/62 text-sm font-light max-w-sm mx-auto leading-relaxed">
            {OBJECTS[active].desc}
          </p>
        </div>

        {/* Dots nav */}
        <div ref={dotsRef} className="flex justify-center gap-2 mt-8">
          {OBJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300"
              style={{
                width:           i === active ? "22px" : "6px",
                height:          "3px",
                borderRadius:    "1px",
                backgroundColor: i === active ? "#B17457" : "#D9D3C3",
                opacity:         i === active ? 1 : 0.25,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}


