import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../assets/logo.png";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Our Works",  to: "/work" },
  { label: "About",    to: "/about" },
  { label: "Services",  to: "/services" },
  { label: "Approach",  to: "/approach" },
  { label: "Contact",   to: "/contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/divyani_architects?igsh=aGZmMmdud3doeHBz&utm_source=qr" },
  { label: "Youtube",   href: "https://www. youtube.com/" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/" },
  { label: "Facebook",  href: "https://www.facebook.com/" },
];

export default function Footer() {
  const footerRef  = useRef(null);
  const bigTextRef = useRef(null);
  const gridRef    = useRef(null);
  const dividerRef = useRef(null);

  const marqueeTweenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(dividerRef.current, {
        scaleX: 0, duration: 1, ease: "power2.out",
        transformOrigin: "left center",
        scrollTrigger: { trigger: dividerRef.current, start: "top 90%", toggleActions: "play none none none" },
      });

      gsap.from(gridRef.current.children, {
        opacity: 0, y: 28, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none none" },
      });

      // Continuous marquee loop — content is duplicated once, so -50% lines
      // the second copy up exactly where the first started, for a seamless loop
      marqueeTweenRef.current = gsap.to(bigTextRef.current, {
        xPercent: -50,
        duration: 22,
        ease: "linear",
        repeat: -1,
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const pauseMarquee  = () => marqueeTweenRef.current?.pause();
  const resumeMarquee = () => marqueeTweenRef.current?.resume();

  return (
    <footer ref={footerRef} className="bg-[#0A0908] w-full overflow-hidden">

      {/* ── Top divider ─────────────────────────────────────────── */}
      <div ref={dividerRef} className="w-full h-px bg-[#D9D3C3]/12"
        style={{ transformOrigin: "left center" }} />

      {/* ── Main grid: Left | Mid | Right ───────────────────────── */}
      <div
        ref={gridRef}
        className="max-w-[1400px] mx-auto px-5 lg:px-12 pt-6 pb-16
                   grid grid-cols-2 md:grid-cols-[1.4fr_0.7fr_0.7fr] gap-10 md:gap-12 lg:gap-20"
      >

        {/* ── LEFT: Logo + about ─────────────────────────────── */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
          <Link to="/" className="flex items-center flex-shrink-0 -ml-2 -mt-8">
            <img
              src={logo}
              alt="DSquare Interior Design"
              className="h-40 w-auto object-contain"
            />
          </Link>
          <p className="font-sans text-[#D9D3C3]/62 text-xs font-light leading-relaxed max-w-xs">
            DSquare Designs crafts refined interiors and spaces that blend timeless elegance with modern sensibility. From residences to hospitality and commercial spaces, every project is shaped with precision, care and a deep respect for how people live and work.
          </p>
        </div>

        {/* ── MIDDLE: Navigation ───────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="font-sans font-bold text-[#FFFFFF] text-[10px] tracking-[0.3em] uppercase hover:text-[#B17457] transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT: Socials ───────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-bold text-[#FFFFFF] text-[10px] tracking-[0.3em] uppercase hover:text-[#B17457] transition-colors duration-300"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ── DSQUARE — continuous marquee ──────────────────────── */}
      <div
        className="overflow-hidden w-full mt-4 py-2"
        onMouseEnter={pauseMarquee}
        onMouseLeave={resumeMarquee}
      >
        <div ref={bigTextRef} className="flex whitespace-nowrap select-none cursor-default will-change-transform">
          {[0, 1].map((group) => (
            <div key={group} className="flex items-center flex-shrink-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}
                  className="font-display font-bold text-[#EDE9DF] leading-none"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 3.2rem)", letterSpacing: "-0.02em" }}
                >
                  DSQUARE DESIGNS
                  <span className="text-[#B17457] px-6">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div className="w-full border-t border-[#D9D3C3]/8 mt-2">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-12 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link to="/terms" className="font-sans text-[#EDE9DF] text-[11px] tracking-[0.2em] uppercase hover:text-[#B17457] transition-colors duration-300">
            Terms of Service
          </Link>
          <Link to="/privacy" className="font-sans text-[#EDE9DF] text-[11px] tracking-[0.2em] uppercase hover:text-[#B17457] transition-colors duration-300">
            Privacy Policy
          </Link>
          <p className="font-sans text-[#EDE9DF] text-[11px] tracking-[0.15em] uppercase">
            Powered by{" "}
            <a
              href="https://kefaru.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B17457] hover:text-[#EDE9DF] transition-colors duration-300"
            >
              Kefaru Technologies Pvt Ltd
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}

