import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fallbackBefore1 from "../assets/hero/hero1.avif";
import fallbackAfter1  from "../assets/hero/hero4.avif";
import fallbackBefore2 from "../assets/hero/hero2.avif";
import fallbackAfter2  from "../assets/hero/hero5.avif";
import fallbackBefore3 from "../assets/hero/hero3.avif";
import fallbackAfter3  from "../assets/hero/hero6.avif";
import fallbackBefore4 from "../assets/hero/hero5.avif";
import fallbackAfter4  from "../assets/hero/hero2.avif";

gsap.registerPlugin(ScrollTrigger);

/* ── Auto-load before/after pairs ──────────────────────────────────
   Drop images into: client/src/assets/before-after/
   Naming convention:
     before-1.jpg  after-1.jpg
     before-2.jpg  after-2.jpg   … and so on
   Pairs are matched by their number suffix.                      ── */
const _beforeGlob = import.meta.glob("../assets/before-after/before-*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true });
const _afterGlob  = import.meta.glob("../assets/before-after/after-*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",  { eager: true });

const beforeSrcs = Object.values(_beforeGlob).map((m) => m.default).sort();
const afterSrcs  = Object.values(_afterGlob).map((m) => m.default).sort();

const FALLBACK_PAIRS = [
  { before: fallbackBefore1, after: fallbackAfter1 },
  { before: fallbackBefore2, after: fallbackAfter2 },
  { before: fallbackBefore3, after: fallbackAfter3 },
  { before: fallbackBefore4, after: fallbackAfter4 },
];

const PAIRS = beforeSrcs.length > 0
  ? beforeSrcs.map((b, i) => ({ before: b, after: afterSrcs[i] ?? b }))
  : FALLBACK_PAIRS;

/* Label shown centered at the top of each before/after pair, in order */
const PAIR_LABELS = ["Restaurant", "Restaurant", "Residential", "Commercial Office"];

/* Group pairs into pages of 2 */
function chunkPairs(arr) {
  const pages = [];
  for (let i = 0; i < arr.length; i += 2) pages.push(arr.slice(i, i + 2));
  return pages;
}
function CompareSlider({ beforeImg, afterImg, label }) {
  const [pos, setPos]   = useState(50);
  const isDragging      = useRef(false);
  const containerRef    = useRef(null);

  const calcPos = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(Math.max(x, 5), 95));
  }, []);

  useEffect(() => {
    const up = () => { isDragging.current = false; };
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] lg:h-[500px] overflow-hidden select-none cursor-col-resize"
      onMouseMove={(e) => { if (isDragging.current) calcPos(e.clientX); }}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      onTouchMove={(e) => { e.stopPropagation(); calcPos(e.touches[0].clientX); }}
    >
      {/* After (base) */}
      <img src={afterImg} alt="After" draggable={false}
        className="absolute inset-0 w-full h-full object-cover" />

      {/* Label — centered top, always above both image layers */}
      {label && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <span className="font-sans font-bold text-[#EDE9DF] text-[11px] lg:text-xs tracking-[0.3em] uppercase bg-[#0F0D0C]/75 backdrop-blur-sm px-5 py-2 border border-[#D9D3C3]/15 whitespace-nowrap">
            {label}
          </span>
        </div>
      )}

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={beforeImg} alt="Before" draggable={false}
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${10000 / pos}%`, maxWidth: "none" }} />
        <div className="absolute inset-0 bg-[#1C1714]/15" />
      </div>

      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-px bg-white/70 z-20 pointer-events-none"
        style={{ left: `${pos}%` }} />

      {/* Handle */}
      <div
        className="absolute top-1/2 z-20 -translate-y-1/2 -translate-x-1/2"
        style={{ left: `${pos}%` }}
        onMouseDown={() => { isDragging.current = true; }}
        onTouchStart={() => { isDragging.current = true; }}
      >
        <div className="w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center cursor-col-resize">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 4L1 8L5 12M11 4L15 8L11 12" stroke="#B17457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [page, setPage]     = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  const sectionRef          = useRef(null);
  const line1Ref            = useRef(null);
  const line2Ref            = useRef(null);
  const tagRef              = useRef(null);
  const subRef              = useRef(null);
  const viewportRef         = useRef(null);
  const trackRef            = useRef(null);

  // 1 pair per page on mobile, 2 pairs per page on desktop
  const indexedPairs = PAIRS.map((p, i) => ({ ...p, idx: i }));
  const pages = isMobile ? indexedPairs.map((p) => [p]) : chunkPairs(indexedPairs);
  const totalPages = pages.length;

  // Detect breakpoint changes and reset carousel position
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile((prev) => {
        if (prev !== mobile) {
          setPage(0);
          if (trackRef.current) gsap.set(trackRef.current, { x: 0 });
        }
        return mobile;
      });
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = (idx) => {
    if (idx === page) return;
    const w = viewportRef.current.offsetWidth;
    gsap.to(trackRef.current, { x: -(w * idx), duration: 0.72, ease: "power3.inOut" });
    setPage(idx);
  };

  const prev = () => goTo((page - 1 + totalPages) % totalPages);
  const next = () => goTo((page + 1) % totalPages);

  /* Keep track in sync on resize */
  useEffect(() => {
    const onResize = () => {
      if (!viewportRef.current || !trackRef.current) return;
      gsap.set(trackRef.current, { x: -(viewportRef.current.offsetWidth * page) });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [page]);

  /* Section entrance animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tagRef.current, {
        opacity: 0, y: 14, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: tagRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.from([line1Ref.current, line2Ref.current], {
        yPercent: 110, duration: 1.1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: line1Ref.current, start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.from(subRef.current, {
        opacity: 0, y: 18, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: subRef.current, start: "top 88%", toggleActions: "play none none none" },
      });
      gsap.from(viewportRef.current, {
        opacity: 0, y: 60, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: viewportRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Touch swipe */
  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section ref={sectionRef} className="bg-[#1C1714] py-14 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-10 gap-3">
          <div ref={tagRef} className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#B17457]" />
            <span className="font-sans text-[#B17457] text-[10px] tracking-[0.4em] uppercase">Transformations</span>
            <span className="w-8 h-px bg-[#B17457]" />
          </div>

          <h2
            className="font-display text-[#EDE9DF] whitespace-nowrap"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.01em" }}
          >
            <span className="overflow-hidden inline-block pb-1 align-bottom">
              <span ref={line1Ref} className="inline-block">Before &amp;&nbsp;</span>
            </span>
            <span className="overflow-hidden inline-block pb-1 align-bottom">
              <em ref={line2Ref} className="inline-block not-italic text-[#B17457]">After</em>
            </span>
          </h2>

          <p ref={subRef} className="font-sans text-[#D9D3C3]/72 font-light text-sm max-w-md leading-relaxed">
            Slide to witness the Reality — from raw space to refined living.
          </p>
        </div>

        {/* ── Carousel ───────────────────────────────────────────── */}
        <div className="relative">

          {/* Prev arrow (hidden on first page) */}
          {totalPages > 1 && page > 0 && (
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 lg:-translate-x-6 z-10
                         w-12 h-12 border border-[#D9D3C3]/22 bg-[#1C1714]/80 backdrop-blur-sm
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

          {/* Next arrow (hidden on last page) */}
          {totalPages > 1 && page < totalPages - 1 && (
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 lg:translate-x-6 z-10
                         w-12 h-12 border border-[#D9D3C3]/22 bg-[#1C1714]/80 backdrop-blur-sm
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

          {/* Viewport */}
          <div
            ref={viewportRef}
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Sliding track — each slide is a 2-col grid of sliders */}
            <div ref={trackRef} className="flex">
              {pages.map((pagePairs, pi) => (
                <div
                  key={pi}
                  className="flex-shrink-0 w-full grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {pagePairs.map((pair, si) => (
                    <CompareSlider key={si} beforeImg={pair.before} afterImg={pair.after}
                      label={PAIR_LABELS[pair.idx]} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Dots + hint ────────────────────────────────────────── */}
        <div className="flex items-center justify-between mt-6">
          <p className="font-sans text-[#D9D3C3]/42 text-xs tracking-wider">
            Drag the handle to compare
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Page ${i + 1}`}
                  style={{
                    width:           i === page ? "28px" : "8px",
                    height:          "3px",
                    backgroundColor: i === page ? "#B17457" : "#D9D3C3",
                    opacity:         i === page ? 1 : 0.25,
                  }}
                  className="transition-all duration-400 rounded-none"
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

