import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import logo from "../assets/logo.png";

const NAV_ITEMS = [
  { label: "Our Work",  href: "/work" },
  { label: "Services",  href: "/services" },
  { label: "Approach",  href: "/approach" },
  { label: "About",     href: "/about" },
  { label: "Contact",   href: "/contact" },
];

// ─── Nav Link with GSAP underline ──────────────────────────────
function NavLink({ item }) {
  const lineRef = useRef(null);
  const location = useLocation();

  /* Reset underline on every route change — prevents stuck state
     when user navigates while hovering a link                    */
  useEffect(() => {
    if (lineRef.current) {
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    }
  }, [location.pathname]);

  const handleEnter = () => {
    gsap.to(lineRef.current, {
      scaleX: 1,
      duration: 0.3,
      ease: "power2.out",
      transformOrigin: "left center",
      overwrite: "auto",
    });
  };

  const handleLeave = () => {
    gsap.to(lineRef.current, {
      scaleX: 0,
      duration: 0.25,
      ease: "power2.in",
      transformOrigin: "right center",
      overwrite: "auto",
    });
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        to={item.href}
        className="relative flex items-center gap-1 text-[#EDE9DF] font-sans text-sm font-semibold tracking-wide hover:text-white transition-colors duration-200 py-1"
      >
        {item.label}
      </Link>
      {/* Underline */}
      <span
        ref={lineRef}
        className="absolute bottom-0 left-0 w-full h-px bg-[#B17457]"
        style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
      />
    </div>
  );
}

// ─── Mobile Menu ───────────────────────────────────────────────
function MobileMenu({ isOpen, onClose }) {
  const menuRef    = useRef(null);
  const itemsRef   = useRef(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const accordionRef = useRef(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isOpen) {
      gsap.set(menu, { display: "flex" });
      gsap.fromTo(menu,
        { opacity: 0, y: "-100%" },
        { opacity: 1, y: "0%", duration: 0.55, ease: "power3.out" }
      );
      gsap.fromTo(
        itemsRef.current?.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power2.out", delay: 0.2 }
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: "-100%",
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
  }, [isOpen]);

  // Accordion for Services
  const toggleServices = () => {
    const el = accordionRef.current;
    if (!el) return;
    if (!servicesOpen) {
      gsap.set(el, { display: "block", height: "auto" });
      const h = el.offsetHeight;
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.35, ease: "power2.out" });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
    setServicesOpen((p) => !p);
  };

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-[9998] bg-[#0F0D0C] flex-col hidden"
    >
      {/* Close */}
      <div className="flex justify-end items-center px-6 py-6 border-b border-[#D9D3C3]/10">
        <button onClick={onClose} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M6 18L18 6" stroke="#D9D3C3" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Nav items */}
      <nav ref={itemsRef} className="flex flex-col flex-1 px-6 pt-10 gap-1">
        {NAV_ITEMS.map((item) =>
          item.hasDropdown ? (
            <div key={item.label}>
              <button
                onClick={toggleServices}
                className="w-full flex items-center justify-between py-4 border-b border-[#D9D3C3]/10 text-[#D9D3C3] font-sans text-2xl font-light"
              >
                {item.label}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                >
                  <path d="M3 6L8 11L13 6" stroke="#B17457" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
              {/* Accordion panel */}
              <div ref={accordionRef} className="hidden overflow-hidden">
                <div className="pt-4 pb-2 pl-4 space-y-4">
                  {[
                    "Interior Design", "Exterior Design",
                    "Space Planning", "Design Consultation",
                    "Turnkey Projects", "Furniture & Styling",
                  ].map((s) => (
                    <p key={s} className="text-[#D9D3C3]/60 font-sans text-base font-light">
                      {s}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={item.label}
              to={item.href}
              onClick={onClose}
              className="py-4 border-b border-[#D9D3C3]/10 text-[#D9D3C3] font-sans text-2xl font-light hover:text-[#EDE9DF] transition-colors"
            >
              {item.label}
            </Link>
          )
        )}
      </nav>

      {/* Bottom CTA */}
      <div className="px-6 py-8">
        <Link
          to="/contact"
          onClick={onClose}
          className="block w-full text-center bg-[#B17457] text-[#EDE9DF] font-sans text-sm tracking-[0.15em] uppercase py-4 hover:bg-[#8A5A3F] transition-colors duration-300"
        >
          Start a Project
        </Link>
      </div>
    </div>
  );
}

// ─── Main Navbar ───────────────────────────────────────────────
export default function Navbar() {
  const headerRef      = useRef(null);
  const navItemsRef    = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // ── Entrance animation ──────────────────────────────────────
  useEffect(() => {
    const header = headerRef.current;
    gsap.fromTo(
      header,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  // ── Scroll: hide on down, show on up, transparent → solid ──
  useEffect(() => {
    const header = headerRef.current;
    let lastY = 0;
    let hidden = false;

    const onScroll = () => {
      const y = window.scrollY;
      const past = y > 60;
      const scrollingDown = y > lastY;

      // Hide / show
      if (scrollingDown && y > 120 && !hidden) {
        gsap.to(header, { yPercent: -100, duration: 0.35, ease: "power3.in", overwrite: "auto" });
        hidden = true;
      } else if (!scrollingDown && hidden) {
        gsap.to(header, { yPercent: 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        hidden = false;
      }

      header.classList.remove("backdrop-blur-md");

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[999] w-full"
        style={{ backgroundColor: "rgba(0,0,0,0)" }}
      >
        <div className="max-w-[1400px] mx-auto pl-1 pr-5 lg:pl-2 lg:pr-8 h-40 flex items-center justify-between pb-6">

          {/* ── Logo ──────────────────────────────────────── */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src={logo}
              alt="DSquare Interior Design"
              className="h-36 w-auto object-contain"
            />
          </Link>

          {/* ── Desktop Nav ───────────────────────────────── */}
          <nav
            ref={navItemsRef}
            className="hidden lg:flex items-center gap-8"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </nav>

          {/* ── Right: CTA + Hamburger ─────────────────────── */}
          <div className="flex items-center gap-4">
            {/* CTA — desktop only */}
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center gap-2 bg-[#B17457] text-[#EDE9DF] font-sans text-xs font-semibold tracking-[0.2em] uppercase px-6 py-2.5 hover:bg-[#9a6245] transition-colors duration-300"
            >
              Start a Project
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden flex flex-col gap-1.5 p-1"
            >
              <span className="w-6 h-px bg-[#D9D3C3] block" />
              <span className="w-4 h-px bg-[#D9D3C3] block" />
              <span className="w-6 h-px bg-[#D9D3C3] block" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}


