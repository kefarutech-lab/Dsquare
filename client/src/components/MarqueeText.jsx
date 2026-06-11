import { useEffect, useRef } from "react";
import gsap from "gsap";

const ITEMS = [
  "Interior Design",
  "Crafted With Intention",
  "Timeless Spaces",
  "Mumbai · Pune · Bangalore",
  "Luxury Living",
  "Where Space Becomes Art",
];

export default function MarqueeText({ direction = 1, className = "" }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Duplicate children for seamless loop
    el.innerHTML += el.innerHTML;

    const totalW = el.scrollWidth / 2;

    // direction 1 = left, -1 = right
    const startX = direction === 1 ? 0 : -totalW;
    const endX   = direction === 1 ? -totalW : 0;

    gsap.set(el, { x: startX });

    const tween = gsap.to(el, {
      x: endX,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    return () => tween.kill();
  }, [direction]);

  return (
    <div className={`overflow-hidden border-y border-[#D9D3C3]/8 py-4 ${className}`}>
      <div ref={trackRef} className="flex items-center w-max will-change-transform">
        {ITEMS.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-sans text-[#D9D3C3]/25 text-[10px] tracking-[0.35em] uppercase px-7 whitespace-nowrap">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#B17457]/40 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
