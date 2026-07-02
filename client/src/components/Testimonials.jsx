import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero1 from "../assets/hero/hero1.avif";
import hero2 from "../assets/hero/hero2.avif";
import hero3 from "../assets/hero/hero3.avif";
import hero4 from "../assets/hero/hero4.avif";
import hero5 from "../assets/hero/hero5.avif";
import hero6 from "../assets/hero/hero6.avif";

gsap.registerPlugin(ScrollTrigger);

/* ── Auto-load testimonial photos ──────────────────────────────────
   Drop a photo (any name) into the folder for each client:
     assets/testimonials/nitin-deshmukh/
     assets/testimonials/sangram-murkute/
     assets/testimonials/rahul-bhosale/
     assets/testimonials/sejal-sapre/
     assets/testimonials/bharat-jagtap/
     assets/testimonials/rujuta-kulkarni/
     assets/testimonials/sangita-bera/
   Falls back to a hero image until a real photo is added.      ── */
function firstPhoto(glob, fallback) {
  const vals = Object.values(glob);
  return vals.length > 0 ? vals[0].default : fallback;
}

const TESTIMONIALS = [
  {
    quote: "Working with DSquare Designs was a truly seamless experience. They listened carefully to our vision and delivered a space that feels luxurious, personal and completely us. Every corner reflects the quality and care they bring to their work.",
    name: "Nitin Deshmukh (Finup Consultancy Office)",
    initials: "ND",
    image: firstPhoto(
      import.meta.glob("../assets/testimonials/nitin-deshmukh/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true }),
      hero1
    ),
  },
  {
    quote: "Dsquare Designs transformed our house into a space that feels both elegant and comfortable. Their attention to detail, creativity, and understanding of our vision made the entire process smooth and stress-free. We couldn’t be happier with the final result.",
    name: "Sangram Murkute (Murkute Residency)",
    initials: "SM",
    image: firstPhoto(
      import.meta.glob("../assets/testimonials/sangram-murkute/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true }),
      hero4
    ),
  },
  {
    quote: "From the first consultation to the final handover, the Dsquare Designs team was exceptional. They understood exactly what we wanted — a modern, warm home that works for our family. The result exceeded every expectation we had.",
    name: "Nikhil Misal (Misal Residency)",
    initials: "RB",
    image: firstPhoto(
      import.meta.glob("../assets/testimonials/nikhil-misal/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true }),
      hero3
    ),
  },
  {
    quote: "We wanted an office space that felt modern, functional, and inspiring for our team, and Dsquare Designs delivered exactly that. Their smart space planning, attention to detail, and seamless execution created a workspace that perfectly reflects our brand and culture.",
    name: "Sejal Sapre (Corporate office)",
    initials: "SS",
    image: firstPhoto(
      import.meta.glob("../assets/testimonials/sejal-sapre/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true }),
      hero5
    ),
  },
  {
    quote: "Dsquare Design team designed our residence with a level of thoughtfulness that was truly remarkable. They balanced aesthetics and functionality perfectly. The space is beautiful, practical and everything we dreamed it would be.",
    name: "Bharat Jagtap (Jagtap Residency)",
    initials: "BJ",
    image: firstPhoto(
      import.meta.glob("../assets/testimonials/bharat-jagtap/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true }),
      hero2
    ),
  },
  {
    quote: "The team at Dsquare Designs brought so much creativity and professionalism to our project. They guided us through every decision with patience and expertise. Our home now feels like a true reflection of who we are.",
    name: "Rujuta Kulkarni (Kulkarni Residency)",
    initials: "RK",
    image: firstPhoto(
      import.meta.glob("../assets/testimonials/rujuta-kulkarni/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true }),
      hero6
    ),
  },
  {
    quote: "We engaged Dsquare Designs for a complete interior overhaul and we couldn't be happier. The quality of their work speaks for itself — every space feels elevated, considered and distinctly ours. Highly recommend their services.",
    name: "Sangita Bera (Bera Residency)",
    initials: "SB",
    image: firstPhoto(
      import.meta.glob("../assets/testimonials/sangita-bera/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true }),
      hero1
    ),
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);
  const quoteRef   = useRef(null);
  const imgRef     = useRef(null);

  const total = TESTIMONIALS.length;
  const t     = TESTIMONIALS[active];

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  /* Section entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0, x: -50, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" },
      });
      gsap.from(rightRef.current, {
        opacity: 0, x: 50, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Fade quote on slide change */
  useEffect(() => {
    if (!quoteRef.current) return;
    gsap.fromTo(quoteRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, [active]);

  /* Fade image on slide change */
  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(imgRef.current,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [active]);

  return (
    <section ref={sectionRef} className="bg-[#1C1714] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">

          {/* ── LEFT: quote content ─────────────────────────────── */}
          <div ref={leftRef}>

            {/* Tag */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-[#B17457]" />
              <span className="font-sans font-bold text-[#B17457] text-sm tracking-[0.4em] uppercase">Client Experience</span>
            </div>

            {/* Opening quote mark */}
            <div
              className="font-display text-[#B17457] select-none mb-3"
              style={{ fontSize: "clamp(3.5rem, 6vw, 6rem)", lineHeight: 0.85 }}
            >
              &#8220;
            </div>

            {/* Quote + author — fades on change */}
            <div ref={quoteRef}>
              <p
                className="font-display italic text-[#EDE9DF]/75 leading-relaxed mb-8"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.3rem)" }}
              >
                {t.quote}
              </p>

              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-[#B17457]/15 border border-[#B17457]/35 flex items-center justify-center flex-shrink-0">
                  <span className="font-sans text-[#B17457] text-[9px] tracking-wider font-medium">{t.initials}</span>
                </div>
                <div>
                  <p className="font-display text-[#EDE9DF] text-base leading-tight">{t.name}</p>
                  <p className="font-sans text-[#D9D3C3]/62 text-[9px] tracking-[0.25em] uppercase mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>

            {/* ── Navigation: prev arrow · dots · next arrow ── */}
            <div className="flex items-center gap-4">

              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 flex items-center justify-center border border-[#D9D3C3]/22 text-[#D9D3C3]/60 hover:border-[#B17457] hover:text-[#B17457] transition-colors duration-300 flex-shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M13 7H1M6 2L1 7L6 12" stroke="currentColor" strokeWidth="1.3"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className="transition-all duration-400 rounded-none"
                    style={{
                      width:           i === active ? "28px" : "8px",
                      height:          "3px",
                      backgroundColor: i === active ? "#B17457" : "#D9D3C3",
                      opacity:         i === active ? 1 : 0.25,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 flex items-center justify-center border border-[#D9D3C3]/22 text-[#D9D3C3]/60 hover:border-[#B17457] hover:text-[#B17457] transition-colors duration-300 flex-shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

            </div>
          </div>

          {/* ── RIGHT: image ────────────────────────────────────── */}
          <div
            ref={rightRef}
            className="relative overflow-hidden border border-[#D9D3C3]/12"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              key={active}
              ref={imgRef}
              src={t.image}
              alt={`${t.name} project`}
              draggable={false}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0F0D0C]/15 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}