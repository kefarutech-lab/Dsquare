import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import _aboutFallback from "../assets/about/HNB04297.jpg";
const _aboutGlob = import.meta.glob("../assets/about/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,avif,AVIF}", { eager: true });
const aboutImg = Object.values(_aboutGlob)[0]?.default ?? _aboutFallback;

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 85, suffix: "+", label: "Projects Completed" },
  { value: 100, suffix: "+", label: "Happy Clients" },
];

export default function About() {
  const sectionRef = useRef(null);
  const imgWrapRef = useRef(null);     // parallax target
  const imgRef     = useRef(null);
  const line1Ref   = useRef(null);     // heading mask line 1
  const line2Ref   = useRef(null);     // heading mask line 2
  const tagRef     = useRef(null);
  const quoteRef   = useRef(null);
  const bodyRef    = useRef(null);
  const statsRef   = useRef([]);
  const ctaRef     = useRef(null);
  const divRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Image parallax — symmetric so top never clips ───────
      gsap.fromTo(imgRef.current,
        { yPercent: 8 },
        {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // ── Image entrance ───────────────────────────────────────
      gsap.from(imgWrapRef.current, {
        x: -70,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // ── Tag line ─────────────────────────────────────────────
      gsap.from(tagRef.current, {
        opacity: 0,
        y: 14,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tagRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // ── Heading: mask clip reveal from bottom ────────────────
      // Lines sit inside overflow-hidden wrappers — translate up
      gsap.from([line1Ref.current, line2Ref.current], {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: line1Ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // ── Body text ────────────────────────────────────────────
      gsap.from(bodyRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      // ── Divider draws ────────────────────────────────────────
      gsap.from(divRef.current, {
        scaleX: 0,
        duration: 0.8,
        ease: "power2.out",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: divRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // ── Quote ────────────────────────────────────────────────
      gsap.from(quoteRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      // ── Stats count up ───────────────────────────────────────
      STATS.forEach((stat, i) => {
        const el = statsRef.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + stat.suffix;
          },
        });
      });

      // ── CTA ──────────────────────────────────────────────────
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0F0D0C] pt-8 pb-16 lg:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-24 items-center">

          {/* ── Left: Image with parallax ───────────────────────── */}
          <div ref={imgWrapRef} className="relative overflow-hidden">
            <img
              ref={imgRef}
              src={aboutImg}
              alt="DSquare Interior Design Studio"
              className="w-full h-[380px] lg:h-[520px] object-cover object-top will-change-transform"
              style={{ scale: 1.2 }}
            />
          </div>

          {/* ── Right: Content ──────────────────────────────────── */}
          <div className="flex flex-col gap-7">

            {/* Heading — mask clip reveal */}
            <h2
              className="font-display text-[#EDE9DF] leading-tight"
              style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", letterSpacing: "-0.01em" }}
            >
              <div className="overflow-hidden pb-1">
                <span ref={line1Ref} className="block">Crafting Spaces That Tell</span>
              </div>
              <div className="overflow-hidden">
                <em ref={line2Ref} className="block not-italic text-[#B17457]">Your Story</em>
              </div>
            </h2>

            {/* Body */}
            <p ref={bodyRef} className="font-sans text-[#D9D3C3]/74 font-light leading-loose text-base">
              We believe great design is more than aesthetics — it's about creating
              environments that resonate with the people who inhabit them. Every project
              begins with listening: understanding how you live, work, and dream.
            </p>

            {/* Quote */}
            <p ref={quoteRef} className="font-display text-[#D9D3C3]/62 text-sm italic border-l-2 border-[#B17457]/40 pl-4">
              "Design is not just what it looks like — it's how it makes you feel
              when you walk through the door."
            </p>

            {/* Divider */}
            <div
              ref={divRef}
              className="w-full h-px bg-[#D9D3C3]/10"
              style={{ transformOrigin: "left center" }}
            />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    ref={(el) => (statsRef.current[i] = el)}
                    className="font-display text-[#B17457] font-bold leading-none"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
                  >
                    0+
                  </span>
                  <span className="font-sans text-[#D9D3C3]/62 text-[9px] tracking-[0.25em] uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

