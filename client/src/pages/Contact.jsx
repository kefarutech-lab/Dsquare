import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ENQUIRY_TYPES = [
  "Design Consultancy",
  "Turnkey Execution",
  "Landscape Design",
  "Project Management Consultancy",
];

export default function Contact() {
  const pageRef    = useRef(null);
  const headRef    = useRef(null);
  const line1Ref   = useRef(null);
  const line2Ref   = useRef(null);
  const line3Ref   = useRef(null);
  const infoRef    = useRef(null);
  const formRef    = useRef(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", telephone: "",
    enquiry: "", message: "", joinCommunity: false, consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const [consentError, setConsentError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);
    setSubmitError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.telephone,
          service: form.enquiry,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading: horizontal mask wipe — right to left ──────────
      // Each line is inside overflow-hidden; xPercent: 100 slides
      // it from the right edge then wipes into view.
      gsap.from([line1Ref.current, line2Ref.current, line3Ref.current], {
        xPercent: 105,
        duration: 1.3,
        stagger: 0.14,
        ease: "power4.out",
        delay: 0.15,
      });

      // ── Tag fades in ─────────────────────────────────────────
      gsap.from(".contact-tag", {
        opacity: 0, x: 20, duration: 0.7, ease: "power3.out", delay: 0.1,
      });

      // ── Info block slides up ─────────────────────────────────
      gsap.from(infoRef.current, {
        opacity: 0, y: 28, duration: 1, ease: "power3.out", delay: 0.85,
      });

      // ── Form fields stagger from right ───────────────────────
      gsap.from(formRef.current.children, {
        opacity: 0, x: 36, duration: 0.85, stagger: 0.08,
        ease: "power3.out", delay: 0.35,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-[#0F0D0C] min-h-screen">

      {/* ── Hero strip ──────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20 items-start">

          {/* ── Left: Heading + Info ─────────────────────────────── */}
          <div className="flex flex-col gap-10" ref={headRef}>

            {/* Tag */}
            <div className="contact-tag flex items-center gap-3">
              <span className="w-8 h-px bg-[#B17457]" />
              <span className="font-sans text-[#B17457] text-[10px] tracking-[0.4em] uppercase">Get In Touch</span>
            </div>

            {/* Heading — horizontal mask wipe right → left */}
            <h1
              className="font-display text-[#EDE9DF] leading-[1.0]"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)", letterSpacing: "-0.02em" }}
            >
              <div className="overflow-hidden pb-2">
                <span ref={line1Ref} className="block uppercase"> <em className="not-italic text-[#B17457]">Every</em> Space</span>
              </div>
              <div className="overflow-hidden pb-2">
                <span ref={line2Ref} className="block uppercase">
                  Tells a <em className="not-italic text-[#B17457]">Story.</em>
                </span>
              </div>
              <div className="overflow-hidden">
                <span ref={line3Ref} className="block uppercase">Begin Yours Today.</span>
              </div>
            </h1>

            {/* Contact detail cards */}
            <div ref={infoRef} className="flex flex-col gap-0 mt-4">

              {/* Email */}
              <a href="mailto:dsquare.designn@gmail.com"
                className="group flex items-center gap-5 border-t border-[#D9D3C3]/10 py-5 hover:pl-2 transition-all duration-300">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#B17457]/30 group-hover:bg-[#B17457]/10 transition-colors duration-300">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#B17457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13 2 6" stroke="#B17457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-sans text-[#B17457] text-[8px] tracking-[0.4em] uppercase">Email</span>
                  <span className="font-sans text-[#EDE9DF] text-sm group-hover:text-[#B17457] transition-colors duration-300">dsquare.designn@gmail.com</span>
                </div>
              </a>

              {/* Phone — Divyani */}
              <a href="tel:+917507009090"
                className="group flex items-center gap-5 border-t border-[#D9D3C3]/10 py-5 hover:pl-2 transition-all duration-300">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#B17457]/30 group-hover:bg-[#B17457]/10 transition-colors duration-300">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 11 19.79 19.79 0 01.44 2.36 2 2 0 012.42.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8a16 16 0 006.29 6.29l1.88-1.88a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#B17457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-[#B17457] text-[8px] tracking-[0.4em] uppercase">Phone</span>
                  <span className="font-sans text-[#D9D3C3]/70 text-xs tracking-wide">Ar. Divyani Patil</span>
                  <span className="font-sans text-[#EDE9DF] text-sm group-hover:text-[#B17457] transition-colors duration-300">+91 75070 09090</span>
                </div>
              </a>

              {/* Phone — Kunal */}
              <a href="tel:+919860771777"
                className="group flex items-center gap-5 border-t border-[#D9D3C3]/10 py-5 hover:pl-2 transition-all duration-300">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#B17457]/30 group-hover:bg-[#B17457]/10 transition-colors duration-300">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 11 19.79 19.79 0 01.44 2.36 2 2 0 012.42.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8a16 16 0 006.29 6.29l1.88-1.88a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#B17457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-[#B17457] text-[8px] tracking-[0.4em] uppercase">Phone</span>
                  <span className="font-sans text-[#D9D3C3]/70 text-xs tracking-wide">Kunal Deshmukh</span>
                  <span className="font-sans text-[#EDE9DF] text-sm group-hover:text-[#B17457] transition-colors duration-300">+91 98607 71777</span>
                </div>
              </a>

              {/* Address */}
              <div className="group flex items-start gap-5 border-t border-b border-[#D9D3C3]/10 py-5">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#B17457]/30 mt-0.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#B17457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="#B17457" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-sans text-[#B17457] text-[8px] tracking-[0.4em] uppercase">Address</span>
                  <p className="font-sans text-[#EDE9DF] text-sm leading-relaxed">
                    301, Park Plaza, Opp. Kamla Nehru Park<br />Off Bhandarkar Road, Pune — 411005
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ── Right: Form ──────────────────────────────────────── */}
          {/* Vertical rule visible only on lg+ */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#D9D3C3]/8 pointer-events-none" />

          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
              <div className="w-14 h-14 border border-[#B17457] flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 11L9 16L18 6" stroke="#B17457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-display text-[#EDE9DF] text-2xl">Enquiry Received</p>
              <p className="font-sans text-[#D9D3C3]/72 text-sm max-w-xs leading-relaxed">
                Thank you for reaching out. We'll be in touch within 1–2 business days.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 pt-2">

              {/* Row 1: First + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Field label="First Name" required>
                  <input type="text" required value={form.firstName} onChange={set("firstName")}
                    className={inputCls} placeholder=" " />
                </Field>
                <Field label="Last Name" required>
                  <input type="text" required value={form.lastName} onChange={set("lastName")}
                    className={inputCls} placeholder=" " />
                </Field>
              </div>

              {/* Row 2: Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Field label="Email">
                  <input type="email" value={form.email} onChange={set("email")}
                    className={inputCls} placeholder=" " />
                </Field>
                <Field label="Phone" required>
                  <input type="tel" required value={form.telephone} onChange={set("telephone")}
                    className={inputCls} placeholder=" "
                    pattern="[0-9]{10}" minLength={10} maxLength={10}
                    title="Enter a valid 10-digit phone number" />
                </Field>
              </div>

              {/* Row 3: Enquiry type */}
              <Field label="Nature of Enquiry (Please Select)" required>
                <select required value={form.enquiry} onChange={set("enquiry")}
                  className={`${inputCls} cursor-pointer appearance-none bg-transparent`}>
                  <option value="" disabled />
                  {ENQUIRY_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-[#1C1714] text-[#D9D3C3]">{t}</option>
                  ))}
                </select>
                {/* Custom chevron */}
                <div className="absolute right-0 bottom-3 pointer-events-none">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="#B17457" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Field>

              {/* Row 4: Message */}
              <Field label="Message">
                <textarea rows={4} value={form.message} onChange={set("message")}
                  className={`${inputCls} resize-none pt-2`} placeholder=" " />
              </Field>

              {/* Checkboxes */}
              <div className="flex flex-col gap-4 pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className={`mt-0.5 w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${form.joinCommunity ? "border-[#B17457] bg-[#B17457]" : "border-[#D9D3C3]/45 group-hover:border-[#B17457]/50"}`}>
                    {form.joinCommunity && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <input type="checkbox" className="sr-only" checked={form.joinCommunity} onChange={set("joinCommunity")} />
                  <span className="font-sans text-[#FFFFFF] text-xs leading-relaxed">
                    Join our community — receive inspiration, project updates, and design insights.
                  </span>
                </label>

                <div className="flex flex-col gap-1.5">
                  <label className="flex items-start gap-3 cursor-pointer group" onClick={() => setConsentError(false)}>
                    <div className={`mt-0.5 w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${
                      consentError ? "border-red-400" :
                      form.consent ? "border-[#B17457] bg-[#B17457]" : "border-[#D9D3C3]/45 group-hover:border-[#B17457]/50"
                    }`}>
                      {form.consent && (
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <input type="checkbox" className="sr-only" checked={form.consent} onChange={set("consent")} />
                    <span className="font-sans text-[#FFFFFF] text-xs leading-relaxed">
                      I consent to my information being collected and processed in accordance with the DSquare privacy policy. *
                    </span>
                  </label>
                  {consentError && (
                    <p className="font-sans text-red-400 text-[10px] tracking-wide pl-7">
                      Please accept the consent to submit your enquiry.
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4 flex flex-col gap-3">
                {submitError && (
                  <p className="font-sans text-red-400 text-[11px] tracking-wide">{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.35em] uppercase text-[#FFFFFF] hover:text-[#B17457] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="border-b border-current pb-0.5">
                    {loading ? "Sending…" : "Submit Enquiry"}
                  </span>
                  {!loading && (
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
                      className="group-hover:translate-x-1 transition-transform duration-200">
                      <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">
        <div className="w-full h-px bg-[#D9D3C3]/8" />
      </div>

      {/* ── Location Section ────────────────────────────────────── */}
      <LocationSection />

    </main>
  );
}

/* ── Location Section ────────────────────────────────────────── */
function LocationSection() {
  const secRef  = useRef(null);
  const textRef = useRef(null);
  const mapRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        opacity: 0, y: 30, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 82%", toggleActions: "play none none none" },
      });
      gsap.from(mapRef.current, {
        opacity: 0, y: 40, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: mapRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-[#0F0D0C] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">

        {/* ── Centred content ── */}
        <div ref={textRef} className="flex flex-col items-center text-center gap-6 mb-14">

          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#B17457]" />
            <span className="font-sans text-[#B17457] text-[10px] tracking-[0.4em] uppercase">Find Us</span>
            <span className="w-8 h-px bg-[#B17457]" />
          </div>

          <h2
            className="font-display text-[#EDE9DF] leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.01em" }}
          >
            <span className="block uppercase">Our</span>
            <em className="block not-italic text-[#B17457] uppercase">Location</em>
          </h2>

          <p className="font-sans text-[#D9D3C3]/75 text-base leading-relaxed">
            301, Park Plaza, Opp. Kamla Nehru Park<br />
            Off Bhandarkar Road, Pune — 411005, India
          </p>

          <a
            href="https://www.google.com/maps?q=18.517601,73.8339691"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-sans text-sm tracking-[0.2em] uppercase text-[#D9D3C3]/62 hover:text-[#B17457] transition-colors duration-300"
          >
            <span className="border-b border-current pb-0.5">Get Directions</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"
              className="group-hover:translate-x-1 transition-transform duration-200">
              <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* ── Full-width map below ── */}
        <div ref={mapRef} className="relative w-full h-[400px] lg:h-[520px] overflow-hidden">
          <div className="absolute -top-3 -left-3 w-full h-full border border-[#B17457]/15 pointer-events-none z-10" />
          <iframe
            title="DSquare Studio Location"
            src="https://maps.google.com/maps?q=18.517601,73.8339691&t=&z=17&ie=UTF8&iwloc=B&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
}

/* ── Shared input class ──────────────────────────────────────── */
const inputCls = [
  "w-full bg-transparent",
  "border-b border-[#D9D3C3]/35",
  "font-sans text-[#EDE9DF] text-sm",
  "py-2.5 outline-none",
  "placeholder-transparent",
  "focus:border-[#B17457]",
  "transition-colors duration-300",
].join(" ");

/* ── Field wrapper with floating label ───────────────────────── */
function Field({ label, required, children }) {
  return (
    <div className="relative flex flex-col">
      <label className="font-sans text-[#FFFFFF] text-sm tracking-[0.2em] uppercase mb-1">
        {label}{required && " *"}
      </label>
      {children}
    </div>
  );
}

