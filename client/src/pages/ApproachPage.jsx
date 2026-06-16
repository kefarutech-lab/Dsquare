import { useEffect, useRef } from "react";
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

/* ── Data ──────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    name: "Understand",
    desc: "We begin by listening. We understand your needs, lifestyle, preferences, budget and vision before a single line is drawn.",
    bullets: ["In-depth consultation", "Site visit & space analysis", "Requirement gathering"],
    image: hero2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    num: "02",
    name: "Conceptualize",
    desc: "We translate your aspirations into concepts that reflect your unique identity and meet every functional requirement of the space.",
    bullets: ["Mood boards & inspiration", "Layout planning", "Concept development"],
    image: hero3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  {
    num: "03",
    name: "Design & Plan",
    desc: "We create detailed designs and plans with complete material selection that bring clarity and creative direction to every aspect of your project.",
    bullets: ["3D visualizations", "Material & finish selection", "Technical drawings & planning"],
    image: hero1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    num: "04",
    name: "Execute",
    desc: "Our expert team brings the design to life with meticulous attention to detail, precision craftsmanship and proactive project management throughout.",
    bullets: ["Site execution & supervision", "Skilled craftsmanship", "Regular updates & quality checks"],
    image: hero5,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    num: "05",
    name: "Deliver",
    desc: "We complete the journey by delivering a refined, perfected space — ensuring every detail is immaculate before the final handover.",
    bullets: ["Final styling & detailing", "Handover & walkthrough", "After-service support"],
    image: hero6,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
];

const STATS = [
  { value: 250, suffix: "+", label: "Projects Completed",  sub: "Across residential, commercial & hospitality spaces." },
  { value: 150, suffix: "+", label: "Happy Clients",       sub: "Building strong relationships through quality & trust." },
  { value: 10,  suffix: "+", label: "Years of Experience", sub: "Expertise that delivers timeless spaces." },
];

/* ═══════════════════════════════════════════════════════════════ */
export default function ApproachPage() {
  return (
    <main className="bg-[#0F0D0C]">
      <HeroSection />
      <IntroSection />
      <TimelineSection />
      <StatsSection />
    </main>
  );
}

/* ── 1. Hero ────────────────────────────────────────────────────── */
function HeroSection() {
  const secRef   = useRef(null);
  const imgRef   = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -12, ease: "none",
        scrollTrigger: { trigger: secRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.from([line1Ref.current, line2Ref.current], {
        yPercent: 110, duration: 1.2, stagger: 0.14, ease: "power4.out", delay: 0.4,
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="relative h-[70vh] w-full overflow-hidden">
      <img ref={imgRef} src={hero4} alt="Our Approach" draggable={false}
        className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform" />
      <div className="absolute inset-0 bg-[#0F0D0C]/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0C]/80 via-[#0F0D0C]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0C]/60 via-transparent to-transparent" />

      <div className="absolute bottom-12 lg:bottom-16 left-0 px-8 lg:px-20 xl:px-32">
        <h1 className="font-display text-[#EDE9DF] leading-tight"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)", letterSpacing: "-0.02em" }}>
          <div className="overflow-hidden pb-1">
            <span ref={line1Ref} className="block">Our Process,</span>
          </div>
          <div className="overflow-hidden">
            <span ref={line2Ref} className="block">
              Designed <em className="not-italic text-[#B17457]">for You</em>
            </span>
          </div>
        </h1>
      </div>

    </section>
  );
}

/* ── 2. Intro ───────────────────────────────────────────────────── */
function IntroSection() {
  const secRef   = useRef(null);
  const tagRef   = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef   = useRef(null);

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
        opacity: 0, y: 18, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: subRef.current, start: "top 88%", toggleActions: "play none none none" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-[#0F0D0C] pt-24 pb-6 lg:pt-32 lg:pb-8 text-center px-8">
      <div ref={tagRef} className="flex items-center justify-center gap-3 mb-6">
        <span className="w-10 h-px bg-[#B17457]/40" />
        <span className="font-sans text-[#D9D3C3]/58 text-[9px] tracking-[0.5em] uppercase">The DSquare Design Process</span>
        <span className="w-10 h-px bg-[#B17457]/40" />
      </div>

      <h2 className="font-display text-[#EDE9DF]"
        style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.01em" }}>
        <div className="overflow-hidden pb-1">
          <span ref={line1Ref} className="block">From Concept</span>
        </div>
        <div className="overflow-hidden">
          <em ref={line2Ref} className="block not-italic text-[#B17457]">to Creation</em>
        </div>
      </h2>

      <p ref={subRef} className="font-sans text-[#D9D3C3]/58 text-sm font-light mt-5 max-w-lg mx-auto leading-relaxed">
        Five carefully considered stages — each one bringing your vision closer to reality.
      </p>
    </section>
  );
}

/* ── 3. Timeline ────────────────────────────────────────────────── */
function TimelineSection() {
  const containerRef = useRef(null);
  const lineRef      = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, ease: "none", transformOrigin: "top center",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 55%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#0F0D0C] pt-8 pb-28 lg:pb-36">
      <div ref={containerRef} className="max-w-[1300px] mx-auto px-5 lg:px-12 relative">

        {/* Static dashed guide */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-20 bottom-20 w-px"
          style={{ borderLeft: "1px dashed rgba(177,116,87,0.1)" }} />

        {/* Animated fill line */}
        <div ref={lineRef}
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-20 bottom-20 w-px bg-gradient-to-b from-[#B17457]/50 to-[#B17457]/15"
          style={{ transformOrigin: "top center" }} />

        {STEPS.map((step, i) => (
          <StepRow key={step.num} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── Step Row ───────────────────────────────────────────────────── */
function StepRow({ step, index }) {
  const rowRef      = useRef(null);
  const imgWrapRef  = useRef(null);
  const imgInnerRef = useRef(null);
  const contentRef  = useRef(null);
  const circleRef   = useRef(null);

  const isImageLeft = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Parallax on image */
      gsap.to(imgInnerRef.current, {
        yPercent: -8, ease: "none",
        scrollTrigger: { trigger: rowRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });

      /* Image wrap slides in */
      gsap.from(imgWrapRef.current, {
        opacity: 0, x: isImageLeft ? -60 : 60, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: rowRef.current, start: "top 80%", toggleActions: "play none none none" },
      });

      /* Content slides in from opposite side */
      gsap.from(contentRef.current, {
        opacity: 0, x: isImageLeft ? 60 : -60, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: rowRef.current, start: "top 80%", toggleActions: "play none none none" },
      });

      /* Circle pops in */
      gsap.from(circleRef.current, {
        scale: 0.4, opacity: 0, duration: 0.65, ease: "back.out(1.7)",
        scrollTrigger: { trigger: rowRef.current, start: "top 75%", toggleActions: "play none none none" },
      });

      /* Bullets stagger */
      gsap.from(contentRef.current.querySelectorAll("[data-bullet]"), {
        opacity: 0, x: isImageLeft ? 22 : -22, duration: 0.65, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }, rowRef);
    return () => ctx.revert();
  }, [isImageLeft]);

  /* ── Sub-blocks ─────────────────────────────────────────────── */
  const imageBlock = (
    <div ref={imgWrapRef}
      className="relative overflow-hidden border border-[#D9D3C3]/8"
      style={{ height: "380px" }}>
      <img ref={imgInnerRef} src={step.image} alt={step.name} draggable={false}
        className="w-full h-full object-cover scale-110 will-change-transform" />
      <div className="absolute inset-0 bg-[#0F0D0C]/20 pointer-events-none" />

      {/* Step label overlay */}
      <div className="absolute top-5 left-5">
        <span className="font-sans text-[#EDE9DF]/25 text-[8px] tracking-[0.4em] uppercase">{step.num} / 05</span>
      </div>
    </div>
  );

  const contentBlock = (
    <div ref={contentRef}
      className={`flex flex-col gap-5 ${isImageLeft ? "lg:pl-14 xl:pl-20" : "lg:pr-14 xl:pr-20"}`}>

      {/* Large watermark number */}
      <div className="font-display text-[#B17457] select-none leading-none pointer-events-none"
        style={{ fontSize: "clamp(5rem, 9vw, 9rem)", opacity: 0.04, letterSpacing: "-0.04em", lineHeight: 0.85 }}>
        {step.num}
      </div>

      {/* Icon */}
      <div className="text-[#B17457] -mt-4">{step.icon}</div>

      {/* Name */}
      <h3 className="font-display text-[#EDE9DF] leading-tight"
        style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.01em" }}>
        {step.name}
      </h3>

      {/* Divider */}
      <div className="w-10 h-px bg-[#B17457]/40" />

      {/* Description */}
      <p className="font-sans text-[#D9D3C3]/72 text-sm font-light leading-loose">{step.desc}</p>

      {/* Bullet points */}
      <ul className="flex flex-col gap-3 mt-1">
        {step.bullets.map((b) => (
          <li key={b} data-bullet className="flex items-start gap-3">
            <span className="flex-shrink-0 w-4 h-px bg-[#B17457]/60 mt-[9px]" />
            <span className="font-sans text-[#D9D3C3]/65 text-xs font-light leading-relaxed tracking-wide">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {/* ── Desktop layout ──────────────────────────────────────── */}
      <div ref={rowRef}
        className="hidden lg:grid lg:grid-cols-[1fr_80px_1fr] items-center py-16 xl:py-20">

        <div>{isImageLeft ? imageBlock : contentBlock}</div>

        {/* Timeline circle */}
        <div className="flex justify-center items-center relative z-10">
          <div ref={circleRef}
            className="w-[52px] h-[52px] rounded-full bg-[#0F0D0C] border-2 border-[#B17457]/55 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(177,116,87,0.15)]">
            <span className="font-sans text-[#B17457] text-[10px] tracking-[0.1em]">{step.num}</span>
          </div>
        </div>

        <div>{isImageLeft ? contentBlock : imageBlock}</div>
      </div>

      {/* ── Mobile layout ───────────────────────────────────────── */}
      <div ref={rowRef} className="lg:hidden flex flex-col gap-6 py-10 border-t border-[#D9D3C3]/6">
        {/* Mobile step indicator */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#1C1714] border border-[#B17457]/40 flex items-center justify-center flex-shrink-0">
            <span className="font-sans text-[#B17457] text-[9px] tracking-[0.1em]">{step.num}</span>
          </div>
          <div className="h-px flex-1 bg-[#B17457]/15" />
        </div>

        {/* Always: image first, content second on mobile */}
        <div className="relative overflow-hidden border border-[#D9D3C3]/8" style={{ height: "260px" }}>
          <img src={step.image} alt={step.name} draggable={false}
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0F0D0C]/20" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[#B17457]">{step.icon}</div>
          <h3 className="font-display text-[#EDE9DF] leading-tight"
            style={{ fontSize: "clamp(1.6rem, 6vw, 2.2rem)", letterSpacing: "-0.01em" }}>
            {step.name}
          </h3>
          <div className="w-8 h-px bg-[#B17457]/40" />
          <p className="font-sans text-[#D9D3C3]/72 text-sm font-light leading-loose">{step.desc}</p>
          <ul className="flex flex-col gap-2.5">
            {step.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-4 h-px bg-[#B17457]/60 mt-[9px]" />
                <span className="font-sans text-[#D9D3C3]/65 text-xs font-light leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

/* ── 4. Stats ───────────────────────────────────────────────────── */
function StatsSection() {
  const secRef   = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const el = statsRef.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value, duration: 2.2, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          onUpdate: () => { el.textContent = Math.floor(obj.val) + stat.suffix; },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-[#1C1714] border-t border-[#D9D3C3]/6">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1px_auto] gap-10 lg:gap-8 items-center">

          {/* 3 stats */}
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col gap-3">
              <span
                ref={(el) => (statsRef.current[i] = el)}
                className="font-display text-[#B17457] leading-none"
                style={{ fontSize: "clamp(2.8rem, 4.5vw, 4rem)" }}
              >
                0+
              </span>
              <p className="font-display text-[#EDE9DF] text-base leading-tight">{stat.label}</p>
              <p className="font-sans text-[#D9D3C3]/74 text-[10px] font-light leading-relaxed max-w-[180px]">{stat.sub}</p>
            </div>
          ))}

          {/* Vertical divider */}
          <div className="hidden lg:block self-stretch w-px bg-[#D9D3C3]/8" />

          {/* CTA panel */}
          <div className="flex flex-col gap-6 lg:pl-10">
            <p className="font-display text-[#EDE9DF] leading-tight"
              style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)" }}>
              Ready to start your journey<br />
              with <em className="not-italic text-[#B17457]">DSquare?</em>
            </p>
            <Link to="/contact"
              className="self-start inline-flex items-center gap-3 border border-[#B17457] text-[#B17457] font-sans text-xs tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-[#B17457] hover:text-white transition-all duration-300">
              Book a Consultation
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}


