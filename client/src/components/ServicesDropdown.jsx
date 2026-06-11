import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const SERVICES = [
  {
    category: "Design Services",
    items: [
      { label: "Interior Design", href: "/services/interior-design" },
      { label: "Exterior Design", href: "/services/exterior-design" },
    ],
  },
  {
    category: "Planning & Strategy",
    items: [
      { label: "Space Planning", href: "/services/space-planning" },
      { label: "Design Consultation", href: "/services/consultation" },
    ],
  },
  {
    category: "Execution & Styling",
    items: [
      { label: "Turnkey Projects", href: "/services/turnkey" },
      { label: "Furniture & Styling", href: "/services/furniture-styling" },
    ],
  },
];

export default function ServicesDropdown({ isOpen }) {
  const dropdownRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = dropdownRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    if (isOpen) {
      gsap.set(el, { display: "block" });
      gsap.fromTo(
        el,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
      gsap.fromTo(
        content.children,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: "power2.out", delay: 0.1 }
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        y: -6,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 hidden"
      style={{ minWidth: "620px" }}
    >
      {/* Arrow pointer */}
      <div className="flex justify-center mb-1">
        <div className="w-2.5 h-2.5 rotate-45 bg-[#1a1612] border-l border-t border-[#B17457]/20" />
      </div>

      {/* Panel */}
      <div className="bg-[#1a1612] border border-[#B17457]/15 rounded-sm shadow-2xl p-8">
        <div ref={contentRef} className="grid grid-cols-3 gap-8">
          {SERVICES.map((group) => (
            <div key={group.category}>
              {/* Category label */}
              <p className="text-[#B17457] font-sans text-[9px] tracking-[0.3em] uppercase mb-4 font-medium">
                {group.category}
              </p>
              {/* Items */}
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="group flex items-center gap-2 text-[#D9D3C3] font-sans text-sm font-light hover:text-[#EDE9DF] transition-colors duration-200"
                    >
                      {/* Dot accent */}
                      <span className="w-1 h-1 rounded-full bg-[#B17457]/40 group-hover:bg-[#B17457] transition-colors duration-200 flex-shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-8 pt-6 border-t border-[#D9D3C3]/10 flex items-center justify-between">
          <p className="text-[#D9D3C3]/40 font-sans text-xs font-light">
            End-to-end interior design solutions
          </p>
          <Link
            to="/services"
            className="text-[#B17457] font-sans text-xs tracking-[0.15em] uppercase hover:text-[#EDE9DF] transition-colors duration-200"
          >
            View all services →
          </Link>
        </div>
      </div>
    </div>
  );
}
