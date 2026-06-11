import { useEffect, useRef } from "react";
import gsap from "gsap";
import logo from "../assets/logo.png";

export default function SplashScreen({ onComplete }) {
  const overlayRef   = useRef(null);
  const logoRef      = useRef(null);
  const labelRef     = useRef(null);
  const progressRef  = useRef(null);
  const counterRef   = useRef(null);
  const countObj     = useRef({ val: 0 });

  useEffect(() => {
    let completed = false;

    const tl = gsap.timeline({
      onComplete: () => {
        if (!completed) {
          completed = true;
          if (onComplete) onComplete();
        }
      },
    });

    // ── Logo fade in ─────────────────────────────────────────
    tl.from(logoRef.current, {
      opacity: 0,
      scale: 0.85,
      duration: 1,
      ease: "power3.out",
    })

    // ── Label fade in ─────────────────────────────────────────
    .from(labelRef.current, {
      opacity: 0,
      y: 6,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.4")

    // ── Progress bar + counter (run together) ─────────────────
    .to(progressRef.current, {
      scaleX: 1,
      duration: 2,
      ease: "power1.inOut",
    }, "-=0.2")

    .to(countObj.current, {
      val: 100,
      duration: 2,
      ease: "power1.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(
            Math.floor(countObj.current.val)
          ).padStart(3, "0");
        }
      },
    }, "<")   // "<" = same start time as progress bar

    // ── Short hold at 100 ─────────────────────────────────────
    .to({}, { duration: 0.3 })

    // ── Fade out entire overlay ───────────────────────────────
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    >
      {/* ── Counter (top-left) ─────────────────────────────── */}
      <div className="absolute top-8 left-8">
        <span
          ref={counterRef}
          className="text-[#D9D3C3] font-sans font-light text-sm tracking-widest tabular-nums"
        >
          000
        </span>
      </div>

      {/* ── Centered Logo ──────────────────────────────────── */}
      <div ref={logoRef}>
        <img
          src={logo}
          alt="DSquare Interior Design"
          className="w-64 h-64 object-contain"
        />
      </div>

      {/* ── Bottom: label + progress bar ───────────────────── */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Label */}
        <div className="flex justify-center mb-4">
          <p
            ref={labelRef}
            className="text-[#D9D3C3] font-sans font-light text-[10px] tracking-[0.45em] uppercase opacity-80"
          >
            Experience Loading
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-[#D9D3C3]/10">
          <div
            ref={progressRef}
            className="h-full bg-[#B17457] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
