import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero1 from "../assets/hero/hero1.avif";
import hero3 from "../assets/hero/hero3.avif";
import hero6 from "../assets/hero/hero6.avif";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ──────────────────────────────────────────────────────── */

const PHILOSOPHY = [
  {
    title: "Human-Centered Design",
    desc: "We design with people in mind — comfort, usability, and emotional connection come first.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
      </svg>
    ),
  },
  {
    title: "Sustainable Thinking",
    desc: "We integrate eco-conscious materials and smart solutions for long-lasting impact.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M2 22c5.5-5.5 8-13 14-15" />
        <path d="M2 22c0-7 5-12 12-12" />
        <path d="M16 7C16 7 20 11 18 16" />
        <path d="M14 6C10 3 6 4 4 8" />
      </svg>
    ),
  },
  {
    title: "Timeless Aesthetics",
    desc: "Our designs balance modern trends with timeless elegance that endures through decades.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "Functional Innovation",
    desc: "Every detail serves a purpose — beauty meets practicality in everything we do.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
];

const PROCESS_STEPS = [
  { num: "01", name: "Discover",       desc: "We understand your needs, lifestyle, and vision." },
  { num: "02", name: "Conceptualize",  desc: "We create design ideas and mood boards." },
  { num: "03", name: "Design & Plan",  desc: "Detailed layouts, materials & 3D visuals." },
  { num: "04", name: "Execute",        desc: "Bringing designs to life with precision." },
  { num: "05", name: "Deliver",        desc: "Final handover with perfection." },
];

const STATS = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 85, suffix: "+", label: "Projects Completed" },
  { value: 100, suffix: "+", label: "Happy Clients" },
];

/* ── Auto-load team photos ─────────────────────────────────────────
   Drop a photo (any name) into each folder:
     assets/team/prayag-bhandari/
     assets/team/kunal-singh/
     assets/team/deshana/
   It will appear automatically — no code changes needed.        ── */
function teamPhoto(glob) {
  const vals = Object.values(glob);
  return vals.length > 0 ? vals[0].default : null;
}

const TEAM = [
  {
    name:     "Prayag Bhandari",
    role:     "Electrical Engineer",
    initials: "PB",
    photo:    teamPhoto(import.meta.glob("../assets/team/prayag-bhandari/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true })),
  },
  {
    name:     "Kunal Singh",
    role:     "3D Planner",
    initials: "KS",
    photo:    teamPhoto(import.meta.glob("../assets/team/kunal-singh/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true })),
  },
  {
    name:     "Deshana",
    role:     "Interior Designer",
    initials: "D",
    photo:    teamPhoto(import.meta.glob("../assets/team/deshana/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true })),
  },
  {
    name:     "Rajat Deshmukh",
    role:     "Project Engineer",
    initials: "RD",
    photo:    teamPhoto(import.meta.glob("../assets/team/rajat-deshmukh/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true })),
  },
  {
    name:     "Jui Shelke",
    role:     "Senior Interior Designer",
    initials: "JS",
    photo:    teamPhoto(import.meta.glob("../assets/team/jui-shelke/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true })),
  },
];


/* ═══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <main className="bg-[#0F0D0C]">
      <HeroSection />
      <OurStorySection />
      <PhilosophySection />
      <ProcessSection />
      <StatsSection />
      <TeamSection />
<CTASection />
    </main>
  );
}

/* ── 1. Hero ────────────────────────────────────────────────────── */
function HeroSection() {
  const secRef   = useRef(null);
  const imgRef   = useRef(null);
  const tagRef   = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -15, ease: "none",
        scrollTrigger: { trigger: secRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.from(tagRef.current,  { opacity: 0, y: 14, duration: 0.7, ease: "power3.out", delay: 0.35 });
      gsap.from([line1Ref.current, line2Ref.current], {
        yPercent: 110, duration: 1.2, stagger: 0.14, ease: "power4.out", delay: 0.5,
      });
      gsap.from(subRef.current, { opacity: 0, y: 20, duration: 0.9, ease: "power3.out", delay: 0.95 });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="relative h-[85vh] w-full overflow-hidden">
      <img ref={imgRef} src={hero1} alt="About DSquare" draggable={false}
        className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform" />
      <div className="absolute inset-0 bg-[#0F0D0C]/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0C]/85 via-[#0F0D0C]/40 to-transparent" />

      <div className="absolute inset-0 flex items-center px-8 lg:px-20 xl:px-32">
        <div className="max-w-[680px]">
          <div ref={tagRef} className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-[#B17457]" />
            <span className="font-sans text-[#B17457] text-[10px] tracking-[0.4em] uppercase">About Us</span>
          </div>
          <h1 className="font-display text-[#EDE9DF] leading-tight mb-7"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)", letterSpacing: "-0.01em" }}>
            <div className="overflow-hidden pb-1">
              <span ref={line1Ref} className="block">Designing Spaces</span>
            </div>
            <div className="overflow-hidden pb-1">
              <span ref={line2Ref} className="block">
                That Reflect <em className="not-italic text-[#B17457]">Your Story</em>
              </span>
            </div>
          </h1>
          <p ref={subRef} className="font-sans text-[#D9D3C3]/72 font-light text-sm leading-loose max-w-[420px]">
            At DSquare Interiors, we transform everyday spaces into meaningful environments that inspire, comfort, and elevate your lifestyle.
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#B17457]" />
          <span className="font-sans text-[#D9D3C3]/62 text-[9px] tracking-[0.4em] uppercase">Interior Design Studio</span>
          <span className="w-8 h-px bg-[#B17457]" />
        </div>
      </div>
    </section>
  );
}

/* ── 2. Our Story ───────────────────────────────────────────────── */
function OurStorySection() {
  const secRef   = useRef(null);
  const imgRef   = useRef(null);
  const imgWrap  = useRef(null);
  const tagRef   = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const body1Ref = useRef(null);
  const body2Ref = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -15, ease: "none",
        scrollTrigger: { trigger: secRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
      gsap.from(imgWrap.current, {
        x: -70, opacity: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: secRef.current, start: "top 75%", toggleActions: "play none none none" },
      });
      gsap.from(tagRef.current, {
        opacity: 0, y: 14, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: tagRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.from([line1Ref.current, line2Ref.current], {
        yPercent: 110, duration: 1.1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: line1Ref.current, start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.from([body1Ref.current, body2Ref.current], {
        opacity: 0, y: 20, duration: 0.9, stagger: 0.14, ease: "power3.out",
        scrollTrigger: { trigger: body1Ref.current, start: "top 88%", toggleActions: "play none none none" },
      });
      gsap.from(quoteRef.current, {
        opacity: 0, x: 20, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: quoteRef.current, start: "top 88%", toggleActions: "play none none none" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-[#0F0D0C] py-28 lg:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div ref={imgWrap} className="relative overflow-hidden">
            <img ref={imgRef} src={hero3} alt="Our story" draggable={false}
              className="w-full h-[500px] lg:h-[640px] object-cover will-change-transform"
              style={{ scale: 1.15 }} />
          </div>

          <div className="flex flex-col gap-7">
            <div ref={tagRef} className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#B17457]" />
              <span className="font-sans text-[#B17457] text-[10px] tracking-[0.4em] uppercase">Our Story</span>
            </div>

            <h2 className="font-display text-[#EDE9DF] leading-tight"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.5rem)", letterSpacing: "-0.01em" }}>
              <div className="overflow-hidden pb-1">
                <span ref={line1Ref} className="block">Crafting Spaces</span>
              </div>
              <div className="overflow-hidden">
                <span ref={line2Ref} className="block">
                  with <em className="not-italic text-[#B17457]">Purpose</em>
                </span>
              </div>
            </h2>

            <p ref={body1Ref} className="font-sans text-[#D9D3C3]/74 font-light text-sm leading-loose">
              At DSquare Interiors, we believe every space has a story waiting to be told. Our approach blends creativity with functionality, designing interiors that reflect your personality and lifestyle.
            </p>
            <p ref={body2Ref} className="font-sans text-[#D9D3C3]/74 font-light text-sm leading-loose">
              From modern homes to dynamic commercial environments, we create spaces that are not just visually appealing but deeply meaningful and practical.
            </p>

            <blockquote ref={quoteRef}
              className="font-display text-[#D9D3C3]/65 text-base italic border-l-2 border-[#B17457]/40 pl-5 leading-relaxed">
              "We don't just design spaces — we design experiences."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Our Philosophy ──────────────────────────────────────────── */
function PhilosophySection() {
  const secRef   = useRef(null);
  const tagRef   = useRef(null);
  const headRef  = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tagRef.current, {
        opacity: 0, y: 14, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: tagRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.from(headRef.current, {
        opacity: 0, y: 30, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, y: 40, duration: 0.9, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-[#1C1714] py-28 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">

        <div className="text-center mb-16 lg:mb-20">
          <div ref={tagRef} className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#B17457]" />
            <span className="font-sans text-[#B17457] text-[10px] tracking-[0.4em] uppercase">Our Philosophy</span>
            <span className="w-8 h-px bg-[#B17457]" />
          </div>
          <h2 ref={headRef} className="font-display text-[#EDE9DF]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.01em" }}>
            Design. Purpose. People.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {PHILOSOPHY.map((item, i) => (
            <div key={item.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="border border-[#D9D3C3]/8 p-8 flex flex-col gap-5 group hover:border-[#B17457]/30 transition-colors duration-500">
              <div className="text-[#B17457]">{item.icon}</div>
              <h3 className="font-display text-[#EDE9DF] text-lg leading-tight">{item.title}</h3>
              <p className="font-sans text-[#D9D3C3]/65 text-xs font-light leading-loose">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── 4. Our Process ─────────────────────────────────────────────── */
function ProcessSection() {
  const secRef    = useRef(null);
  const tagRef    = useRef(null);
  const line1Ref  = useRef(null);
  const line2Ref  = useRef(null);
  const connRef   = useRef(null);
  const stepsRef  = useRef([]);

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
      gsap.from(connRef.current, {
        scaleX: 0, duration: 1.6, ease: "power2.out", transformOrigin: "left center",
        scrollTrigger: { trigger: connRef.current, start: "top 78%", toggleActions: "play none none none" },
      });
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, y: 30, duration: 0.9, delay: i * 0.12, ease: "power3.out",
          scrollTrigger: { trigger: connRef.current, start: "top 78%", toggleActions: "play none none none" },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-[#0F0D0C] py-28 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">

        <div className="text-center mb-20 lg:mb-28">
          <div ref={tagRef} className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#B17457]" />
            <span className="font-sans text-[#B17457] text-[10px] tracking-[0.4em] uppercase">Our Process</span>
            <span className="w-8 h-px bg-[#B17457]" />
          </div>
          <h2 className="font-display text-[#EDE9DF]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.01em" }}>
            <div className="overflow-hidden pb-1">
              <span ref={line1Ref} className="block">A Seamless Journey</span>
            </div>
            <div className="overflow-hidden">
              <span ref={line2Ref} className="block">
                From Concept to <em className="not-italic text-[#B17457]">Creation</em>
              </span>
            </div>
          </h2>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          <div ref={connRef}
            className="absolute top-7 left-[calc(10%+28px)] right-[calc(10%+28px)] h-px bg-[#B17457]/20"
            style={{ transformOrigin: "left center" }}
          />
          <div className="grid grid-cols-5 gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} ref={(el) => (stepsRef.current[i] = el)}
                className="flex flex-col items-center text-center gap-5">
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#1C1714] border border-[#B17457]/35 flex items-center justify-center flex-shrink-0">
                  <span className="font-sans text-[#B17457] text-[9px] tracking-[0.2em]">{step.num}</span>
                </div>
                <h3 className="font-display text-[#EDE9DF] text-base tracking-wide">{step.name}</h3>
                <p className="font-sans text-[#D9D3C3]/62 text-[11px] font-light leading-relaxed max-w-[130px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden flex flex-col gap-8 relative">
          <div className="absolute left-7 top-4 bottom-4 w-px bg-[#B17457]/20" />
          {PROCESS_STEPS.map((step) => (
            <div key={step.num} className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-full bg-[#1C1714] border border-[#B17457]/35 flex items-center justify-center flex-shrink-0 relative z-10">
                <span className="font-sans text-[#B17457] text-[9px] tracking-[0.2em]">{step.num}</span>
              </div>
              <div className="flex flex-col gap-1 pt-4">
                <h3 className="font-display text-[#EDE9DF] text-lg tracking-wide">{step.name}</h3>
                <p className="font-sans text-[#D9D3C3]/62 text-xs font-light leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── 5. Stats ───────────────────────────────────────────────────── */
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
    <section ref={secRef} className="bg-[#1C1714] border-t border-b border-[#D9D3C3]/8">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12 py-20 lg:py-24">
        <div className="grid grid-cols-3 divide-x divide-[#D9D3C3]/10">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 px-4 py-2">
              <span
                ref={(el) => (statsRef.current[i] = el)}
                className="font-display text-[#B17457] leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                0+
              </span>
              <span className="font-sans text-[#D9D3C3]/62 text-[9px] tracking-[0.35em] uppercase text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 6. Our Team ────────────────────────────────────────────────── */
function TeamSection() {
  const secRef   = useRef(null);
  const tagRef   = useRef(null);
  const headRef  = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tagRef.current, {
        opacity: 0, y: 14, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: tagRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
      gsap.from(headRef.current, {
        opacity: 0, y: 30, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0, y: 50, duration: 0.9, delay: i * 0.12, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-[#0F0D0C] py-28 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">

        <div className="text-center mb-16 lg:mb-20">
          <div ref={tagRef} className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#B17457]" />
            <span className="font-sans text-[#B17457] text-[10px] tracking-[0.4em] uppercase">Our Team</span>
            <span className="w-8 h-px bg-[#B17457]" />
          </div>
          <h2 ref={headRef} className="font-display text-[#EDE9DF]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.01em" }}>
            The Minds Behind <em className="not-italic text-[#B17457]">the Magic</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 max-w-[1200px] mx-auto">
          {TEAM.map((member, i) => (
            <div key={member.name} ref={(el) => (cardsRef.current[i] = el)}
              className="flex flex-col gap-4 group">

              {/* Photo area */}
              <div className="relative overflow-hidden bg-[#1C1714] border border-[#D9D3C3]/8 group-hover:border-[#B17457]/30 transition-colors duration-500"
                style={{ aspectRatio: "3/4" }}>
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-[#B17457]/25 select-none"
                        style={{ fontSize: "clamp(3rem, 5vw, 5rem)", letterSpacing: "0.08em" }}>
                        {member.initials}
                      </span>
                    </div>
                    <div className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: "repeating-linear-gradient(45deg, #D9D3C3 0, #D9D3C3 1px, transparent 0, transparent 50%)",
                        backgroundSize: "10px 10px",
                      }}
                    />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0C]/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1">
                <p className="font-display text-[#EDE9DF] text-base lg:text-lg leading-tight">{member.name}</p>
                <p className="font-sans text-[#D9D3C3]/58 text-[9px] tracking-[0.25em] uppercase">{member.role}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── 7. CTA ─────────────────────────────────────────────────────── */
function CTASection() {
  const secRef   = useRef(null);
  const imgRef   = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const ctaRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -12, ease: "none",
        scrollTrigger: { trigger: secRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
      gsap.from([line1Ref.current, line2Ref.current], {
        yPercent: 110, duration: 1.1, stagger: 0.14, ease: "power3.out",
        scrollTrigger: { trigger: line1Ref.current, start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.from(ctaRef.current, {
        opacity: 0, y: 20, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="relative overflow-hidden min-h-[480px] flex items-center">
      <img ref={imgRef} src={hero6} alt="Book consultation" draggable={false}
        className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform" />
      <div className="absolute inset-0 bg-[#0F0D0C]/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0C]/85 via-[#0F0D0C]/50 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-20 w-full">
        <div className="max-w-xl">
          <h2 className="font-display text-[#EDE9DF] leading-tight mb-10"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.01em" }}>
            <div className="overflow-hidden pb-1">
              <span ref={line1Ref} className="block">Let's Design</span>
            </div>
            <div className="overflow-hidden">
              <span ref={line2Ref} className="block">
                Your <em className="not-italic text-[#B17457]">Dream Space</em>
              </span>
            </div>
          </h2>

          <div ref={ctaRef}>
            <Link to="/contact"
              className="inline-flex items-center gap-3 bg-[#B17457] text-[#EDE9DF] font-sans text-xs tracking-[0.2em] uppercase px-9 py-4 hover:bg-[#9a6245] transition-colors duration-300">
              Book Consultation
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
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


