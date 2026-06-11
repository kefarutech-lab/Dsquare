import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useParams, Link, Navigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero1 from "../assets/hero/hero1.jpg";
import hero4 from "../assets/hero/hero4.jpg";
import hero5 from "../assets/hero/hero5.jpg";
import hero6 from "../assets/hero/hero6.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ── Auto-load photos from asset folders via Vite glob ─────────────
   Drop any .jpg / .jpeg / .png / .webp into a folder and it
   appears automatically — no code change needed.              ──── */
function toPhotos(glob) {
  return Object.values(glob).map((m) => ({ src: m.default }));
}

const INTERIOR_PHOTO_SETS = {
  "Living Room": toPhotos(import.meta.glob("../assets/interior/Livingroom/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true })),
  Bedrooms:      toPhotos(import.meta.glob("../assets/interior/bedrooms/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",    { eager: true })),
  Kitchen:       toPhotos(import.meta.glob("../assets/interior/kitchen/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",     { eager: true })),
  "Lobby's":     toPhotos(import.meta.glob("../assets/interior/lobby/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",       { eager: true })),
  Bungalow:      toPhotos(import.meta.glob("../assets/interior/bungalow/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",    { eager: true })),
};

const COMMERCIAL_PHOTO_SETS = {
  Office:           toPhotos(import.meta.glob("../assets/commercial/offices/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",        { eager: true })),
  Showroom:         toPhotos(import.meta.glob("../assets/commercial/showrooms/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",      { eager: true })),
  "Service Center": toPhotos(import.meta.glob("../assets/commercial/service-centre/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true })),
};

const HOSPITALITY_PHOTO_SETS = {
  Hotel: toPhotos(import.meta.glob("../assets/hospitality/hotel/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true })),
  Café:  toPhotos(import.meta.glob("../assets/hospitality/cafe/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",  { eager: true })),
};

const DEVELOPMENT_PHOTO_SETS = {
  Development: toPhotos(import.meta.glob("../assets/development/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true })),
};

const SERVICES = {
  "interior-design": {
    title: "Interior Design",
    tagline: "Luxury Interior Design Solutions",
    heroImage: hero1,
    about:
      "From elegant residences to beautifully detailed bedrooms and kitchens, we craft interiors that reflect your personality and elevate everyday living. Each project is a unique story told through light, material and space.",
    stats: [
      { value: "15+", label: "Residential Projects" },
      { value: "100%", label: "Client Satisfaction" },
      { value: "8+",  label: "Years Residential" },
    ],
    categories: ["Living Room", "Bedrooms", "Kitchen", "Lobby's", "Bungalow"],
    photoSets: INTERIOR_PHOTO_SETS,
  },

  "commercial": {
    title: "Commercial Spaces",
    tagline: "Modern Commercial & Office Spaces",
    heroImage: hero4,
    about:
      "We design workplaces, showrooms and service environments that inspire performance, reflect brand identity and leave a lasting impression on every visitor and client who walks through the door.",
    stats: [
      { value: "7+", label: "Commercial Projects" },
      { value: "3",  label: "Sectors Served" },
      { value: "5+", label: "Years Commercial" },
    ],
    categories: ["All", "Office", "Showroom", "Service Center"],
    photoSets: COMMERCIAL_PHOTO_SETS,
  },

  "hospitality": {
    title: "Café & Hospitality",
    tagline: "Hospitality Design That Captivates",
    heroImage: hero5,
    about:
      "We create hospitality environments that captivate from the moment guests arrive — from intimate cafés to landmark hotels, every material choice and spatial decision contributes to an unforgettable experience.",
    stats: [
      { value: "4+", label: "Hospitality Projects" },
      { value: "3",  label: "Hotel Projects" },
      { value: "10+", label: "Years Experience" },
    ],
    categories: ["All", "Hotel", "Café"],
    photoSets: HOSPITALITY_PHOTO_SETS,
  },

  "development": {
    title: "Project Development",
    tagline: "End-to-End Project Development",
    heroImage: hero6,
    about:
      "From concept through construction to final handover, we manage every stage of project development with precision and care — delivering spaces that are built as beautifully as they are designed.",
    stats: [
      { value: "3+",  label: "Development Projects" },
      { value: "100%", label: "End-to-End" },
      { value: "10+", label: "Years Experience" },
    ],
    categories: ["All", "Development"],
    photoSets: DEVELOPMENT_PHOTO_SETS,
  },
};

/* ═══════════════════════════════════════════════════════════════ */
export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const service = SERVICES[serviceId];
  if (!service) return <Navigate to="/services" replace />;

  return (
    <main className="bg-[#0F0D0C]">
      <HeroSection service={service} />
      <IntroSection service={service} />
      <ProjectsSection service={service} />
      <CTASection />
    </main>
  );
}

/* ── 1. Hero ────────────────────────────────────────────────────── */
function HeroSection({ service }) {
  const secRef   = useRef(null);
  const imgRef   = useRef(null);
  const headRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -12, ease: "none",
        scrollTrigger: { trigger: secRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.fromTo(headRef.current,
        { x: "-18vw", opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.3 }
      );
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="relative h-[70vh] w-full overflow-hidden">
      <img ref={imgRef} src={service.heroImage} alt={service.title} draggable={false}
        className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform" />
      <div className="absolute inset-0 bg-[#0F0D0C]/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0C]/80 via-[#0F0D0C]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0C]/60 via-transparent to-transparent" />

      <div className="absolute bottom-12 lg:bottom-16 left-0 px-8 lg:px-20 xl:px-32">
        <h1
          ref={headRef}
          className="font-display text-[#EDE9DF] whitespace-nowrap leading-none"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)", letterSpacing: "-0.02em" }}
        >
          {service.title.split(" ")[0]}&nbsp;
          <em className="not-italic text-[#B17457]">
            {service.title.split(" ").slice(1).join(" ")}
          </em>
        </h1>
      </div>

    </section>
  );
}

/* ── 2. Intro + Stats ───────────────────────────────────────────── */
function IntroSection({ service }) {
  const secRef    = useRef(null);
  const textRef   = useRef(null);
  const statsRef  = useRef([]);
  const lineRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0, x: -40, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.from(lineRef.current, {
        scaleX: 0, duration: 1.1, ease: "power2.out", transformOrigin: "left center",
        scrollTrigger: { trigger: lineRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
      statsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, y: 24, duration: 0.8, delay: i * 0.12, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-[#0F0D0C] py-20 lg:py-28 px-5 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-start">

          {/* About text */}
          <div ref={textRef}>
            <p className="font-display text-[#EDE9DF]/90 leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", maxWidth: "680px" }}>
              {service.about}
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-row lg:flex-col gap-10 lg:gap-8 lg:min-w-[200px]">
            {service.stats.map((s, i) => (
              <div key={s.label} ref={(el) => (statsRef.current[i] = el)} className="flex flex-col gap-1">
                <span className="font-display text-[#B17457] leading-none"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>{s.value}</span>
                <span className="font-sans text-[#D9D3C3]/65 text-[9px] tracking-[0.3em] uppercase">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={lineRef} className="w-full h-px bg-[#D9D3C3]/10 mt-16"
          style={{ transformOrigin: "left center" }} />
      </div>
    </section>
  );
}

/* ── 3. Projects / Gallery Section ─────────────────────────────── */
function ProjectsSection({ service }) {
  const [active,  setActive]  = useState(() => service.categories[0]);
  const [lightbox, setLightbox] = useState(null); // { photos, index }
  const secRef  = useRef(null);
  const gridRef = useRef(null);

  const isMasonry = !!service.photoSets;

  const photos = isMasonry
    ? (active === "All"
        ? Object.values(service.photoSets).flat()
        : service.photoSets[active] || [])
    : null;

  const filtered = isMasonry
    ? null
    : (active === "All" ? service.projects : service.projects.filter((p) => p.category === active));

  const count = isMasonry ? photos.length : filtered.length;

  /* Re-animate when tab changes */
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(gridRef.current.querySelectorAll(".gallery-item"),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.04, ease: "power3.out" }
    );
  }, [active]);


  return (
    <>
    <section ref={secRef} className="bg-[#0F0D0C] pb-28 lg:pb-36 px-5 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        {/* Section tag */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-px bg-[#B17457]" />
          <span className="font-sans text-[#B17457] text-[10px] tracking-[0.4em] uppercase">
            {isMasonry ? "Our Gallery" : "Our Projects"}
          </span>
        </div>

        {/* Category filter tabs */}
        {service.categories.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {service.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-sans text-[9px] tracking-[0.3em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                  active === cat
                    ? "border-[#B17457] bg-[#B17457] text-[#EDE9DF]"
                    : "border-[#D9D3C3]/20 text-[#D9D3C3]/65 hover:border-[#B17457]/50 hover:text-[#D9D3C3]/85"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* ── Masonry Photo Grid ── */}
        {isMasonry && photos.length > 0 && (
          <div ref={gridRef} className="columns-2 md:columns-3 xl:columns-4 gap-3 md:gap-4">
            {photos.map((photo, i) => (
              <MasonryPhoto key={i} photo={photo}
                onOpen={() => setLightbox({ photos, index: i })} />
            ))}
          </div>
        )}
        {isMasonry && photos.length === 0 && (
          <div ref={gridRef} className="flex flex-col items-center justify-center py-24 gap-4 border border-[#D9D3C3]/10">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="#B17457" strokeWidth="1.2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="#B17457" strokeWidth="1.2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="#B17457" strokeWidth="1.2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="#B17457" strokeWidth="1.2"/>
            </svg>
            <span className="font-sans text-[#D9D3C3]/45 text-[10px] tracking-[0.35em] uppercase">
              Photos coming soon
            </span>
          </div>
        )}

        {/* ── Project Cards Grid ── */}
        {!isMasonry && (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={`${project.name}-${i}`} project={project} />
            ))}
          </div>
        )}

      </div>
    </section>

    {/* Lightbox */}
    {lightbox && (
      <Lightbox
        photos={lightbox.photos}
        startIndex={lightbox.index}
        onClose={() => setLightbox(null)}
      />
    )}
    </>
  );
}

/* ── Masonry Photo Tile ─────────────────────────────────────────── */
function MasonryPhoto({ photo, onOpen }) {
  const imgRef = useRef(null);

  const onEnter = () => gsap.to(imgRef.current, { scale: 1.05, duration: 0.5, ease: "power2.out" });
  const onLeave = () => gsap.to(imgRef.current, { scale: 1,    duration: 0.45, ease: "power2.out" });

  return (
    <div
      className="gallery-item mb-3 md:mb-4 break-inside-avoid overflow-hidden group cursor-zoom-in border border-[#D9D3C3]/8 hover:border-[#B17457]/30 transition-colors duration-500"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onOpen}
    >
      <div className="relative overflow-hidden">
        <img
          ref={imgRef}
          src={photo.src}
          alt=""
          draggable={false}
          className="w-full h-auto block will-change-transform"
        />
        {/* Expand hint on hover */}
        <div className="absolute inset-0 bg-[#0F0D0C]/0 group-hover:bg-[#0F0D0C]/30 transition-colors duration-400 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
              stroke="#EDE9DF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Lightbox ───────────────────────────────────────────────────── */
function Lightbox({ photos, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const backdropRef = useRef(null);
  const cardRef     = useRef(null);
  const imgRef      = useRef(null);

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  const close = () => {
    gsap.to(cardRef.current,     { scale: 0.94, opacity: 0, duration: 0.22, ease: "power2.in" });
    gsap.to(backdropRef.current, { opacity: 0,  duration: 0.28, ease: "power2.in", onComplete: onClose });
  };

  /* open */
  useEffect(() => {
    gsap.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(cardRef.current,
      { scale: 0.93, opacity: 0, y: 18 },
      { scale: 1,    opacity: 1, y: 0, duration: 0.42, ease: "power3.out", delay: 0.06 }
    );
  }, []);

  /* image swap */
  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(imgRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1,    duration: 0.26, ease: "power2.out" }
    );
  }, [index]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "Escape")     close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  /* scroll lock */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();
    return () => {
      document.body.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
    };
  }, []);

  return createPortal(
    <div ref={backdropRef} className="fixed inset-0 z-[9999]">

      {/* Layer 1: blur + dark overlay — clicking closes */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(10,9,8,0.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
        onClick={close}
      />

      {/* Layer 2: content — above blur layer */}
      <div
        ref={cardRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {/* Counter — top left */}
        <div className="absolute top-4 left-4 lg:top-6 lg:left-6 pointer-events-none">
          <span className="font-sans text-[#D9D3C3]/45 text-[9px] tracking-[0.4em] uppercase">
            {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
        </div>

        {/* Close — top right */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 lg:top-6 lg:right-6 pointer-events-auto w-10 h-10 flex items-center justify-center border border-[#D9D3C3]/22 bg-[#0F0D0C]/60 hover:border-[#B17457] text-[#D9D3C3]/55 hover:text-[#EDE9DF] transition-colors duration-300"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Prev */}
        {photos.length > 1 && (
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 lg:left-6 pointer-events-auto w-11 h-11 flex items-center justify-center border border-[#D9D3C3]/20 bg-[#0F0D0C]/55 hover:border-[#B17457] text-[#D9D3C3]/55 hover:text-[#EDE9DF] transition-colors duration-300"
          >
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1M6 2L1 7L6 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Image */}
        <img
          ref={imgRef}
          key={index}
          src={photos[index].src}
          alt=""
          draggable={false}
          className="select-none object-contain pointer-events-auto"
          style={{
            maxWidth:  "calc(100vw - 120px)",
            maxHeight: "calc(100vh - 96px)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.75)",
          }}
        />

        {/* Next */}
        {photos.length > 1 && (
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 lg:right-6 pointer-events-auto w-11 h-11 flex items-center justify-center border border-[#D9D3C3]/20 bg-[#0F0D0C]/55 hover:border-[#B17457] text-[#D9D3C3]/55 hover:text-[#EDE9DF] transition-colors duration-300"
          >
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Hint */}
        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-sans text-[#D9D3C3]/22 text-[8px] tracking-[0.35em] uppercase pointer-events-none whitespace-nowrap">
          Click outside or press ESC to close
        </p>
      </div>
    </div>,
    document.body
  );
}

/* ── Project Card ───────────────────────────────────────────────── */
function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const imgRef  = useRef(null);

  const onEnter = () => {
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.6, ease: "power2.out" });
  };
  const onLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
  };

  return (
    <div ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group flex flex-col border border-[#D9D3C3]/8 overflow-hidden hover:border-[#B17457]/30 transition-colors duration-500">

      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img ref={imgRef} src={project.image} alt={project.name} draggable={false}
          className="w-full h-full object-cover will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0C]/80 via-[#0F0D0C]/20 to-transparent" />

        {/* Category chip */}
        <div className="absolute top-4 left-4">
          <span className="font-sans text-[8px] tracking-[0.3em] uppercase bg-[#B17457]/90 text-[#EDE9DF] px-3 py-1">
            {project.category}
          </span>
        </div>

        {/* Location on hover */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-[#B17457]">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-sans text-[#EDE9DF]/80 text-[9px] tracking-[0.2em]">{project.location}</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col gap-3 bg-[#0F0D0C]">
        <h3 className="font-display text-[#EDE9DF] text-lg leading-tight group-hover:text-[#B17457] transition-colors duration-300">
          {project.name}
        </h3>
        <p className="font-sans text-[#D9D3C3]/62 text-xs font-light leading-relaxed">
          {project.desc}
        </p>

        {/* Add Photos CTA */}
        <div className="flex items-center gap-2 mt-1 pt-3 border-t border-[#D9D3C3]/8">
          <span className="font-sans text-[#D9D3C3]/42 text-[9px] tracking-[0.25em] uppercase italic">
            Photos coming soon
          </span>
          <span className="flex-1 h-px bg-[#D9D3C3]/8" />
        </div>
      </div>

    </div>
  );
}

/* ── 4. CTA ─────────────────────────────────────────────────────── */
function CTASection() {
  const secRef   = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const ctaRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([line1Ref.current, line2Ref.current], {
        yPercent: 110, duration: 1.1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: line1Ref.current, start: "top 82%", toggleActions: "play none none none" },
      });
      gsap.from(ctaRef.current, {
        opacity: 0, y: 18, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-[#1C1714] border-t border-[#D9D3C3]/8 py-24 lg:py-32 px-5 lg:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

        <h2 className="font-display text-[#EDE9DF] leading-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.01em" }}>
          <div className="overflow-hidden pb-1">
            <span ref={line1Ref} className="block">Ready to start</span>
          </div>
          <div className="overflow-hidden">
            <span ref={line2Ref} className="block">
              your <em className="not-italic text-[#B17457]">project?</em>
            </span>
          </div>
        </h2>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <Link to="/contact"
            className="inline-flex items-center gap-3 bg-[#B17457] text-[#EDE9DF] font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#9a6245] transition-colors duration-300">
            Book a Consultation
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link to="/services"
            className="inline-flex items-center gap-3 border border-[#D9D3C3]/25 text-[#D9D3C3]/72 font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 hover:border-[#B17457]/50 hover:text-[#D9D3C3]/90 transition-all duration-300">
            All Services
          </Link>
        </div>

      </div>
    </section>
  );
}


