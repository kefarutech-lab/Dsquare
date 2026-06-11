import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="bg-[#0F0D0C] min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display text-[#B17457] text-[clamp(6rem,20vw,14rem)] leading-none select-none">
          404
        </p>
        <h1 className="font-display text-[#EDE9DF] text-2xl md:text-4xl mt-4 mb-4"
          style={{ letterSpacing: "-0.01em" }}>
          Page Not Found
        </h1>
        <p className="font-sans text-[#D9D3C3]/60 text-sm font-light mb-10 max-w-sm mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-[#B17457] text-[#EDE9DF] font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#9a6245] transition-colors duration-300"
        >
          Back to Home
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.3"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
