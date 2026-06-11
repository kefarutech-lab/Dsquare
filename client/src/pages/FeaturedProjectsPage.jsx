import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useParams, useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero1 from "../assets/hero/hero1.jpg";
import hero2 from "../assets/hero/hero2.jpg";
import hero3 from "../assets/hero/hero3.jpg";
import hero4 from "../assets/hero/hero4.jpg";
import hero5 from "../assets/hero/hero5.jpg";
import hero6 from "../assets/hero/hero6.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ── Auto-load project images from asset folders ───────────────────
   Hero    → drop one image named hero.jpg in each project folder
   Gallery → drop any photos in each project's gallery/ folder    ── */
function toPhotos(glob) {
  return Object.values(glob).map((m) => ({ src: m.default }));
}
function toHero(glob, fallback) {
  return Object.values(glob)[0]?.default ?? fallback;
}

const jagtapHero   = toHero(import.meta.glob("../assets/projects/jagtap/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",              { eager: true }), hero3);
const butteHero    = toHero(import.meta.glob("../assets/projects/butte-patil/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",         { eager: true }), hero1);
const turaHero     = toHero(import.meta.glob("../assets/projects/tura/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",                { eager: true }), hero2);
const savitriHero  = toHero(import.meta.glob("../assets/projects/savitri-corps/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",       { eager: true }), hero4);
const acaiHero     = toHero(import.meta.glob("../assets/projects/acai-hotel/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",          { eager: true }), hero5);
const finupHero    = toHero(import.meta.glob("../assets/projects/finup-consultancy/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",   { eager: true }), hero4);
const pcPatilHero  = toHero(import.meta.glob("../assets/projects/ca-official/hero.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",         { eager: true }), hero6);

const jagtapGallery   = toPhotos(import.meta.glob("../assets/projects/jagtap/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",              { eager: true }));
const butteGallery    = toPhotos(import.meta.glob("../assets/projects/butte-patil/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",         { eager: true }));
const turaGallery     = toPhotos(import.meta.glob("../assets/projects/tura/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",                { eager: true }));
const savitriGallery  = toPhotos(import.meta.glob("../assets/projects/savitri-corps/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",       { eager: true }));
const acaiGallery     = toPhotos(import.meta.glob("../assets/projects/acai-hotel/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",          { eager: true }));
const finupGallery    = toPhotos(import.meta.glob("../assets/projects/finup-consultancy/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",   { eager: true }));
const pcPatilGallery  = toPhotos(import.meta.glob("../assets/projects/ca-official/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",         { eager: true }));

/* ── Project data ───────────────────────────────────────────────── */
const PROJECTS = [
  {
    slug: "jagtap",
    name: "Jagtap",
    type: "Residential",
    location: "Pune, Maharashtra",
    year: "2023",
    scope: "Interior Design & FF&E",
    heroImage: jagtapHero,
    description: [
      "The Jagtap Residency is a contemporary home designed around natural light, spatial flow and the quiet luxury of considered living. The brief called for interiors that felt modern yet warm — spaces where family life and refined taste coexist effortlessly.",
      "The open-plan living and dining areas were conceived as a single continuous experience, with material transitions and subtle level changes defining each zone. Bedrooms were designed as true retreats — calm, layered and beautifully proportioned.",
      "Furniture and finishes were sourced from a carefully selected palette of Indian and international suppliers, with several bespoke pieces commissioned specifically for the project.",
    ],
    stats: [
      { label: "Type",     value: "Residential" },
      { label: "Location", value: "Pune" },
      { label: "Year",     value: "2023" },
      { label: "Scope",    value: "Design & FF&E" },
    ],
    photos: jagtapGallery,
  },
  {
    slug: "butte-patil",
    name: "Butte Patil",
    type: "Residential",
    location: "Pune, Maharashtra",
    year: "2023",
    scope: "Complete Interior Design",
    heroImage: butteHero,
    description: [
      "The Butte Patil Residency is a refined family home in Pune, designed to balance elegant aesthetics with the demands of everyday family living. The client's vision was a home that felt both luxurious and deeply personal.",
      "The design language draws on clean architectural lines, rich material palettes and bespoke joinery — creating spaces that feel considered at every scale. Warm tones and natural textures run through the home, from the formal living areas to the private family rooms.",
      "DSquare managed the project from initial concept through to final handover, delivering a home that the family described as exceeding every expectation.",
    ],
    stats: [
      { label: "Type",     value: "Residential" },
      { label: "Location", value: "Pune" },
      { label: "Year",     value: "2023" },
      { label: "Scope",    value: "Full Design" },
    ],
    photos: butteGallery,
  },
  {
    slug: "tura",
    name: "TTura",
    type: "Residential",
    location: "Pune, Maharashtra",
    year: "2024",
    scope: "Interior Design",
    heroImage: turaHero,
    description: [
      "The Tura project is a residential interior designed to bring together contemporary elegance and the warmth of considered living. Every space was approached with a focus on proportion, material quality and the way natural light moves through the home.",
      "A curated palette of textures and finishes ties the rooms together, creating a residence that feels cohesive from the entrance through to the private areas.",
      "DSquare delivered the project with its hallmark attention to detail, ensuring every element — from custom joinery to lighting design — contributes to the overall experience.",
    ],
    stats: [
      { label: "Type",     value: "Residential" },
      { label: "Location", value: "Pune" },
      { label: "Year",     value: "2024" },
      { label: "Scope",    value: "Interior Design" },
    ],
    photos: turaGallery,
  },
  {
    slug: "savitri-corps",
    name: "Savitri Corps",
    type: "Residential",
    location: "Pune, Maharashtra",
    year: "2024",
    scope: "Interior Design",
    heroImage: savitriHero,
    description: [
      "Savitri Corps is a residential project designed with a deep respect for the client's lifestyle and aspirations. The spaces are crafted to feel generous, composed and quietly refined — a home that lives as beautifully as it looks.",
      "Material selection was guided by a desire for longevity and warmth, with natural textures and a considered palette threading through every room. Bespoke elements were developed specifically for the project, ensuring a result that is entirely unique.",
      "DSquare delivered Savitri Corps with the same rigour and care that defines every project — from the first concept sketch to the final finishing detail.",
    ],
    stats: [
      { label: "Type",     value: "Residential" },
      { label: "Location", value: "Pune" },
      { label: "Year",     value: "2024" },
      { label: "Scope",    value: "Interior Design" },
    ],
    photos: savitriGallery,
  },
  {
    slug: "acai",
    name: "Acai",
    type: "Café & Hospitality",
    location: "Pune, Maharashtra",
    year: "2024",
    scope: "Full Interior Design & Turnkey Execution",
    heroImage: acaiHero,
    description: [
      "Acai is a boutique hospitality project in the heart of Pune, designed to offer guests an experience that feels both vibrant and intimately considered. The brief was to create a space that captures the energy of the city while providing a warm, design-led retreat.",
      "Every element — from the lobby's textured feature wall to the curated furniture selections in each suite — was designed with the guest experience at the centre. Rich earthy tones, natural materials and layered lighting work together to create an environment that feels alive at every hour.",
      "The project represents DSquare's full-service capability, handling concept, design development, material specification and complete project delivery.",
    ],
    stats: [
      { label: "Type",     value: "Boutique Hotel" },
      { label: "Location", value: "Pune" },
      { label: "Year",     value: "2024" },
      { label: "Scope",    value: "Turnkey" },
    ],
    photos: acaiGallery,
  },
  {
    slug: "finup-consultancy",
    name: "Finup Consultancy Office",
    type: "Commercial",
    location: "Pune, Maharashtra",
    year: "2024",
    scope: "Commercial Interior Design",
    heroImage: finupHero,
    description: [
      "The Finup Consultancy Office is a professional workspace designed to reflect the brand's credibility, precision and client-first ethos. The brief called for a space that felt authoritative yet approachable — a place where clients immediately feel confidence in the team.",
      "Clean lines, a restrained material palette and considered lighting define the office environment. Workstations are designed for focus while meeting spaces invite open conversation, with acoustic and spatial design working in harmony.",
      "DSquare delivered a workspace that elevates the daily experience of both the Finup team and the clients they serve.",
    ],
    stats: [
      { label: "Type",     value: "Commercial" },
      { label: "Location", value: "Pune" },
      { label: "Year",     value: "2024" },
      { label: "Scope",    value: "Office Design" },
    ],
    photos: finupGallery,
  },
  {
    slug: "ca-official",
    name: "PC Patil",
    type: "Commercial",
    location: "Pune, Maharashtra",
    year: "2024",
    scope: "Commercial Interior Design",
    heroImage: pcPatilHero,
    description: [
      "The PC Patil office is a professional interior crafted to communicate trust, structure and clarity. As a chartered accountancy practice, the space needed to project quiet authority while remaining functional and welcoming for clients.",
      "The design achieves this through a disciplined layout, premium materials and a palette that balances warmth with professionalism. Private consultation rooms, a reception area and open workspaces each receive individual consideration within the overall design language.",
      "The result is a workspace that reflects the practice's values — precise, considered and built to last.",
    ],
    stats: [
      { label: "Type",     value: "Commercial" },
      { label: "Location", value: "Pune" },
      { label: "Year",     value: "2024" },
      { label: "Scope",    value: "Office Design" },
    ],
    photos: pcPatilGallery,
  },
];

/* ═══════════════════════════════════════════════════════════════ */
export default function FeaturedProjectsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const initial = PROJECTS.find((p) => p.slug === projectId) ?? PROJECTS[0];
  const [active, setActive] = useState(initial.slug);

  const project = PROJECTS.find((p) => p.slug === active) ?? PROJECTS[0];

  /* Sync URL when tab changes */
  const switchTab = (slug) => {
    if (slug === active) return;
    setActive(slug);
    navigate(`/projects/${slug}`, { replace: true });
  };

  /* Sync tab if URL changes externally */
  useEffect(() => {
    if (projectId && projectId !== active) {
      setActive(projectId);
    }
  }, [projectId]);

  return (
    <main className="bg-[#0F0D0C]">
      <HeroSection />
      <TabsSection active={active} onSwitch={switchTab} />
      <ProjectContent key={active} project={project} />
    </main>
  );
}

/* ── 1. Hero ────────────────────────────────────────────────────── */
function HeroSection() {
  const heroRef = useRef(null);
  const imgRef  = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -12, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.from(headRef.current, {
        opacity: 0, y: 40, duration: 1.3, ease: "power3.out", delay: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[70vh] w-full overflow-hidden">
      <img ref={imgRef} src={hero2} alt="Featured Projects" draggable={false}
        className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform" />
      <div className="absolute inset-0 bg-[#0F0D0C]/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0D0C]/30 via-transparent to-[#0F0D0C]/70" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <h1
          ref={headRef}
          className="font-display text-[#EDE9DF] text-center select-none"
          style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)", letterSpacing: "-0.02em", lineHeight: 1 }}
        >
          Featured <em className="not-italic text-[#B17457]">Projects</em>
        </h1>
        <p className="font-sans text-[#D9D3C3]/65 text-sm font-light tracking-wider max-w-sm text-center">
          A curated selection of spaces that define our craft
        </p>
      </div>
    </section>
  );
}

/* ── 2. Tabs ────────────────────────────────────────────────────── */
function TabsSection({ active, onSwitch }) {
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.from(lineRef.current, {
      scaleX: 0, duration: 0.9, ease: "power2.out", transformOrigin: "left center",
      scrollTrigger: { trigger: lineRef.current, start: "top 90%", toggleActions: "play none none none" },
    });
  }, []);

  return (
    <div className="bg-[#0F0D0C] sticky top-0 z-50 border-b border-[#D9D3C3]/8">
      <div ref={lineRef} className="h-px w-full bg-[#D9D3C3]/8" style={{ transformOrigin: "left center" }} />
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">
        <div className="flex items-stretch overflow-x-auto scrollbar-none">
          {PROJECTS.map((p) => (
            <button
              key={p.slug}
              onClick={() => onSwitch(p.slug)}
              className={`relative flex-shrink-0 px-6 lg:px-10 py-5 font-sans font-bold text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 ${
                active === p.slug
                  ? "text-[#EDE9DF]"
                  : "text-[#D9D3C3]/48 hover:text-[#D9D3C3]/80"
              }`}
            >
              {p.name}
              {/* Active underline */}
              {active === p.slug && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B17457]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 3. Project Content ─────────────────────────────────────────── */
function ProjectContent({ project }) {
  const contentRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={contentRef}>
      <OverviewSection project={project} />
      <GallerySection project={project} onOpen={(i) => setLightbox(i)} />
      {lightbox !== null && (
        <Lightbox
          photos={project.photos}
          startIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

/* ── 3a. Overview ───────────────────────────────────────────────── */
function OverviewSection({ project }) {
  const secRef  = useRef(null);
  const imgRef  = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        x: -50, opacity: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: secRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.from(textRef.current.children, {
        opacity: 0, y: 28, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: secRef.current, start: "top 75%", toggleActions: "play none none none" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-[#0F0D0C] py-20 lg:py-28 px-5 lg:px-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Hero image */}
        <div ref={imgRef} className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <img src={project.heroImage} alt={project.name} draggable={false}
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0C]/40 to-transparent" />
        </div>

        {/* Text + stats */}
        <div ref={textRef} className="flex flex-col gap-8">

          {/* Name + type */}
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[#B17457] text-[9px] tracking-[0.4em] uppercase">{project.type}</span>
            <h2
              className="font-display text-[#EDE9DF] leading-tight"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              {project.name}
            </h2>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 border border-[#D9D3C3]/8 p-6">
            {project.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-sans text-[#B17457] text-[8px] tracking-[0.35em] uppercase">{s.label}</span>
                <span className="font-sans text-[#EDE9DF] text-sm">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#D9D3C3]/10" />

          {/* Description */}
          <div className="flex flex-col gap-4">
            {project.description.map((para, i) => (
              <p key={i} className="font-sans text-[#D9D3C3]/72 text-sm font-light leading-loose">
                {para}
              </p>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            className="group self-start inline-flex items-center gap-3 border border-[#B17457] text-[#B17457] font-sans text-[10px] tracking-[0.3em] uppercase px-7 py-3.5 hover:bg-[#B17457] hover:text-[#EDE9DF] transition-all duration-300"
          >
            Start a Similar Project
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
              className="group-hover:translate-x-1 transition-transform duration-200">
              <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 3b. Gallery ────────────────────────────────────────────────── */
function GallerySection({ project, onOpen }) {
  const secRef  = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".gitem");
    if (!items.length) return;
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.05, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none none" },
      }
    );
  }, []);

  return (
    <section ref={secRef} className="bg-[#0F0D0C] pb-28 lg:pb-36 px-5 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-px bg-[#B17457]" />
          <span className="font-sans text-[#B17457] text-[10px] tracking-[0.4em] uppercase">Project Gallery</span>
        </div>

        {project.photos.length > 0 ? (
          <div ref={gridRef} className="columns-2 md:columns-3 xl:columns-4 gap-3 md:gap-4">
            {project.photos.map((photo, i) => (
              <GalleryTile key={i} photo={photo} onClick={() => onOpen(i)} />
            ))}
          </div>
        ) : (
          <div ref={gridRef} className="flex flex-col items-center justify-center py-24 gap-4 border border-[#D9D3C3]/10">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="#B17457" strokeWidth="1.2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="#B17457" strokeWidth="1.2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="#B17457" strokeWidth="1.2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="#B17457" strokeWidth="1.2"/>
            </svg>
            <span className="font-sans text-[#D9D3C3]/45 text-[10px] tracking-[0.35em] uppercase">
              Gallery coming soon
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

function GalleryTile({ photo, onClick }) {
  const imgRef = useRef(null);

  const onEnter = () => gsap.to(imgRef.current, { scale: 1.05, duration: 0.5, ease: "power2.out" });
  const onLeave = () => gsap.to(imgRef.current, { scale: 1,    duration: 0.45, ease: "power2.out" });

  return (
    <div
      className="gitem mb-3 md:mb-4 break-inside-avoid overflow-hidden group cursor-zoom-in border border-[#D9D3C3]/8 hover:border-[#B17457]/30 transition-colors duration-500"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img ref={imgRef} src={photo.src} alt="" draggable={false}
          className="w-full h-auto block will-change-transform" />
        <div className="absolute inset-0 bg-[#0F0D0C]/0 group-hover:bg-[#0F0D0C]/25 transition-colors duration-400 flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
              stroke="#EDE9DF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
    gsap.to(cardRef.current,    { scale: 0.94, opacity: 0, duration: 0.22, ease: "power2.in" });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.28, ease: "power2.in", onComplete: onClose });
  };

  /* open animation */
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

  /* image swap animation */
  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(imgRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1,    duration: 0.26, ease: "power2.out" }
    );
  }, [index]);

  /* keyboard nav */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "Escape")     close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  /* lock scroll */
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

      {/* ── Layer 1: blur + dark overlay — clicking this closes ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(10,9,8,0.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
        onClick={close}
      />

      {/* ── Layer 2: content — sits above blur layer ── */}
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

        {/* Close button — top right */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 lg:top-6 lg:right-6 pointer-events-auto w-10 h-10 flex items-center justify-center border border-[#D9D3C3]/22 bg-[#0F0D0C]/60 hover:border-[#B17457] text-[#D9D3C3]/55 hover:text-[#EDE9DF] transition-colors duration-300"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Prev arrow */}
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

        {/* Next arrow */}
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
