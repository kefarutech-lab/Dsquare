import { useRef, useEffect } from "react";
import gsap from "gsap";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/divyani_architects?igsh=aGZmMmdud3doeHBz&utm_source=qr",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
];

export default function SocialSidebar() {
  const itemRefs = useRef([]);

  useEffect(() => {
    const resetAll = () => {
      itemRefs.current.forEach((el) => {
        if (!el) return;
        gsap.to(el.querySelector(".icon-bg"), { scaleX: 0, duration: 0.25, ease: "power2.in", transformOrigin: "right center" });
        gsap.to(el.querySelector(".icon-wrap"), { color: "#B17457", duration: 0.25, ease: "power2.in" });
      });
    };
    window.addEventListener("blur", resetAll);
    return () => window.removeEventListener("blur", resetAll);
  }, []);

  const onEnter = (i) => {
    const el = itemRefs.current[i];
    if (!el) return;
    gsap.to(el.querySelector(".icon-bg"), {
      scaleX: 1, duration: 0.3, ease: "power2.out", transformOrigin: "right center",
    });
    gsap.to(el.querySelector(".icon-wrap"), {
      color: "#ffffff", duration: 0.3, ease: "power2.out",
    });
  };

  const onLeave = (i) => {
    const el = itemRefs.current[i];
    if (!el) return;
    gsap.to(el.querySelector(".icon-bg"), {
      scaleX: 0, duration: 0.25, ease: "power2.in", transformOrigin: "right center",
    });
    gsap.to(el.querySelector(".icon-wrap"), {
      color: "#B17457", duration: 0.25, ease: "power2.in",
    });
  };

  return (
    <div className="flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col">
      {SOCIALS.map((s, i) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          ref={(el) => (itemRefs.current[i] = el)}
          onMouseEnter={() => onEnter(i)}
          onMouseLeave={() => onLeave(i)}
          className="relative flex items-center justify-end group"
        >
          {/* Expanding clay bg (slides from right) */}
          <div
            className="icon-bg absolute right-0 top-0 bottom-0 w-full bg-[#B17457]"
            style={{ transform: "scaleX(0)", transformOrigin: "right center" }}
          />

          {/* Icon container */}
          <div
            className="icon-wrap relative flex items-center justify-center w-[38px] h-[42px] md:w-[48px] md:h-[52px] bg-[#0F0D0C] border-l border-t border-b border-[#D9D3C3]/10 text-[#B17457] flex-shrink-0"
          >
            {s.icon}
          </div>
        </a>
      ))}

    </div>
  );
}
