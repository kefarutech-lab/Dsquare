import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const STORAGE_KEY = "dsquare_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    // Only show if user hasn't responded yet
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Small delay so page load animations finish first
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!visible || !bannerRef.current) return;
    gsap.fromTo(
      bannerRef.current,
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.7, ease: "power3.out" }
    );
  }, [visible]);

  const dismiss = (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    gsap.to(bannerRef.current, {
      y: "110%", opacity: 0, duration: 0.5, ease: "power3.in",
      onComplete: () => setVisible(false),
    });
  };

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-0 left-0 right-0 z-[999] bg-[#0F0D0C] border-t border-[#D9D3C3]/10"
      style={{ willChange: "transform" }}
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        {/* Text */}
        <div className="flex flex-col gap-1 max-w-2xl">
          <p className="font-sans text-[#EDE9DF] text-xs leading-relaxed">
            We use cookies to improve your experience on our site. By continuing to browse,
            you agree to our{" "}
            <Link
              to="/privacy"
              onClick={() => dismiss("accepted")}
              className="text-[#B17457] hover:underline"
            >
              Privacy Policy
            </Link>
            {" "}and{" "}
            <Link
              to="/terms"
              onClick={() => dismiss("accepted")}
              className="text-[#B17457] hover:underline"
            >
              Terms of Service
            </Link>.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => dismiss("declined")}
            className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D9D3C3]/55 hover:text-[#D9D3C3] transition-colors duration-300 border-b border-transparent hover:border-[#D9D3C3]/40 pb-0.5"
          >
            Decline
          </button>
          <button
            onClick={() => dismiss("accepted")}
            className="font-sans text-[10px] tracking-[0.25em] uppercase bg-[#B17457] text-[#EDE9DF] px-6 py-2.5 hover:bg-[#9a6245] transition-colors duration-300"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}
