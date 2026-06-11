import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const fldCls = [
  "w-full bg-transparent",
  "border-b border-[#D9D3C3]/30 focus:border-[#B17457]",
  "font-sans text-[#B17457] text-xs",
  "py-2 outline-none placeholder-[#D9D3C3]/45",
  "transition-colors duration-300",
].join(" ");

export default function Footer() {
  const footerRef  = useRef(null);
  const bigTextRef = useRef(null);
  const gridRef    = useRef(null);
  const dividerRef = useRef(null);

  const [sub, setSub]           = useState({ firstName: "", lastName: "", phone: "", email: "", consent: false });
  const [done, setDone]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [consentError, setConsentError] = useState(false);

  const setField = (k) => (e) =>
    setSub((p) => ({ ...p, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sub.consent) { setConsentError(true); return; }
    setConsentError(false);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${sub.firstName} ${sub.lastName}`.trim(),
          email: sub.email,
          phone: sub.phone,
          service: "Newsletter / Community Sign-up",
        }),
      });
      if (res.ok) setDone(true);
    } catch {
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

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

      gsap.fromTo(bigTextRef.current,
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "bottom 90%", toggleActions: "play none none none" },
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const onEnter = () => gsap.to(bigTextRef.current, { color: "#B17457", duration: 0.45, ease: "power2.out" });
  const onLeave = () => gsap.to(bigTextRef.current, { color: "#EDE9DF", duration: 0.45, ease: "power2.out" });

  return (
    <footer ref={footerRef} className="bg-[#0A0908] w-full overflow-hidden">

      {/* ── Top divider ─────────────────────────────────────────── */}
      <div ref={dividerRef} className="w-full h-px bg-[#D9D3C3]/12"
        style={{ transformOrigin: "left center" }} />

      {/* ── Main grid: Left | Mid | Right ───────────────────────── */}
      <div
        ref={gridRef}
        className="max-w-[1400px] mx-auto px-5 lg:px-12 pt-20 pb-16
                   grid grid-cols-2 md:grid-cols-[1.4fr_0.7fr_0.7fr] gap-10 md:gap-12 lg:gap-20"
      >

        {/* ── LEFT: "Join the world" + subscribe form ─────────── */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-8">

          <div className="flex flex-col gap-4">
            <h2
              className="font-display text-[#EDE9DF] leading-[1.0]"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", letterSpacing: "-0.01em" }}
            >
              <span className="block">JOIN the</span>
              <span className="block">WORLD</span>
              <span className="block">of <em className="not-italic text-[#B17457]">DSQUARE DESIGNS</em></span>
            </h2>
            <p className="font-sans text-[#D9D3C3]/62 text-xs font-light leading-relaxed max-w-xs">
              Have a project in mind? Let’s bring it to life..
            </p>
          </div>

          {done ? (
            <p className="font-sans text-[#B17457] text-xs tracking-wider">
              Thank you — you're on the list.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-sm">

              {/* First + Last */}
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[#FFFFFF] text-[10px] tracking-[0.3em] uppercase">
                    First Name *
                  </label>
                  <input type="text" required value={sub.firstName} onChange={setField("firstName")}
                    placeholder="First" className={fldCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[#FFFFFF] text-[10px] tracking-[0.3em] uppercase">
                    Last Name *
                  </label>
                  <input type="text" required value={sub.lastName} onChange={setField("lastName")}
                    placeholder="Last" className={fldCls} />
                </div>
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[#FFFFFF] text-[10px] tracking-[0.3em] uppercase">
                    Phone *
                  </label>
                  <input type="tel" required value={sub.phone} onChange={setField("phone")}
                    placeholder="10-digit number" className={fldCls}
                    pattern="[0-9]{10}" minLength={10} maxLength={10}
                    title="Enter a valid 10-digit phone number" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[#FFFFFF] text-[10px] tracking-[0.3em] uppercase">
                    Email
                  </label>
                  <input type="email" value={sub.email} onChange={setField("email")}
                    placeholder="hello@email.com" className={fldCls} />
                </div>
              </div>

              {/* Consent */}
              <div className="flex flex-col gap-1.5 mt-1">
                <label className="flex items-start gap-3 cursor-pointer group" onClick={() => setConsentError(false)}>
                  <div className={`mt-0.5 w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center transition-colors duration-200
                    ${consentError ? "border-red-400" : sub.consent ? "border-[#B17457] bg-[#B17457]" : "border-[#D9D3C3]/25 group-hover:border-[#B17457]/40"}`}>
                    {sub.consent && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <input type="checkbox" className="sr-only" checked={sub.consent} onChange={setField("consent")} />
                  <span className="font-sans text-[#FFFFFF] text-[10px] leading-relaxed">
                    I consent to my information being collected in accordance with the Dsquare Design privacy policy *
                  </span>
                </label>
                {consentError && (
                  <p className="font-sans text-red-400 text-[9px] tracking-wide pl-6">
                    Please accept the consent to submit.
                  </p>
                )}
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="group self-start inline-flex items-center gap-3 bg-[#B17457] text-[#EDE9DF] font-sans text-[10px] tracking-[0.35em] uppercase px-7 py-3.5 hover:bg-[#9a6245] transition-colors duration-300 mt-1 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? "Sending…" : "Submit Form"}
                {!loading && (
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none"
                    className="group-hover:translate-x-1 transition-transform duration-200">
                    <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

            </form>
          )}
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

      {/* ── Big DSQUARE — left-aligned, full width ──────────────── */}
      <div className="overflow-hidden w-full mt-4">
        <p
          ref={bigTextRef}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className="font-display font-bold text-[#EDE9DF] leading-none select-none cursor-default"
          style={{
            fontSize: "clamp(5rem, 11.5vw, 22rem)",
            letterSpacing: "-0.03em",
            lineHeight: 0.88,
            paddingLeft: "0.02em",
          }}
        >
          DSQUARE DESIGNS
        </p>
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

