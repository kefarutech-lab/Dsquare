import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Auto-load brand logos ─────────────────────────────────────────
   Drop logos into: client/src/assets/brands/
   Any filename, any order. Supported: jpg, jpeg, png, webp, svg
   ─────────────────────────────────────────────────────────────── */
const _glob = import.meta.glob(
  "../assets/brands/*.{jpg,jpeg,png,webp,svg,JPG,JPEG,PNG,WEBP,SVG}",
  { eager: true }
);
const LOGOS = Object.values(_glob).map((m) => m.default);

/* Fallback placeholder logos (shown until real logos are dropped in) */
const PLACEHOLDER_COUNT = 6;

export default function Brands() {
  const sectionRef = useRef(null);
  const tagRef     = useRef(null);
  const trackRef   = useRef(null);

  /* Section entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tagRef.current, {
        opacity: 0, y: 14, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: tagRef.current, start: "top 88%", toggleActions: "play none none none" },
      });
      gsap.from(trackRef.current, {
        opacity: 0, y: 20, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: trackRef.current, start: "top 90%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const items = LOGOS.length > 0 ? LOGOS : Array(PLACEHOLDER_COUNT).fill(null);
  /* Duplicate for seamless loop */
  const doubled = [...items, ...items];

  return (
    <section ref={sectionRef} className="bg-[#0F0D0C] py-16 lg:py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 mb-10">
        <div ref={tagRef} className="flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-[#B17457]" />
          <span className="font-sans font-bold text-[#B17457] text-sm tracking-[0.4em] uppercase">
            Brands We&apos;ve Worked With
          </span>
          <span className="w-8 h-px bg-[#B17457]" />
        </div>
      </div>

      {/* ── Marquee track ── */}
      <div ref={trackRef} className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0F0D0C, transparent)" }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0F0D0C, transparent)" }} />

        <div
          className="flex gap-5 lg:gap-6 items-center"
          style={{
            width: "max-content",
            animation: "marquee 28s linear infinite",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {doubled.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center w-36 lg:w-44 h-16 lg:h-20 bg-white rounded-xl px-5 py-3 hover:shadow-[0_0_0_1px_#B17457] transition-shadow duration-300"
            >
              {src ? (
                <img
                  src={src}
                  alt={`Brand ${(i % items.length) + 1}`}
                  draggable={false}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                /* Placeholder box until real logos are added */
                <span className="font-sans text-black/20 text-[9px] tracking-[0.3em] uppercase">Logo</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Keyframe animation ── */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
