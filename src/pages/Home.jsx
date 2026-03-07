// src/pages/Home.jsx
import { useEffect, useRef, useState } from "react";
import CourseCarousel from "../components/home/CourseCarousel.jsx";
import TutorialVideos from "../components/home/TutorialVideos.jsx";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   Tiny animation helper — fade + slide up
───────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  style: {
    animation: `fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
  },
});

/* ─────────────────────────────────────────────
   Animated counter
───────────────────────────────────────────── */
function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(to / 40);
    const t = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(t); }
      else setVal(start);
    }, 18);
    return () => clearInterval(t);
  }, [to]);
  return <>{val.toLocaleString()}{suffix}</>;
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
export default function Home() {
  const nav = useNavigate();

  const categories = [
    { label: "ভর্তি পরীক্ষা", icon: "🎯", to: "/subscription?cat=admission" },
    { label: "HSC",           icon: "📘", to: "/subscription?cat=hsc" },
    { label: "SSC",           icon: "📗", to: "/subscription?cat=ssc" },
    { label: "মেডিকেল",      icon: "🩺", to: "/subscription?cat=medical" },
    { label: "ইঞ্জিনিয়ারিং", icon: "⚙️", to: "/subscription?cat=engineering" },
  ];

  const stats = [
    { value: 120,  suffix: "+", label: "বই" },
    { value: 18,   suffix: "+", label: "বান্ডেল" },
    { value: 5000, suffix: "+", label: "শিক্ষার্থী" },
  ];

  return (
    <>
      {/* ── Keyframes injected once ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1);   opacity: .35; }
          50%       { transform: scale(1.18); opacity: .15; }
        }
        @keyframes driftA {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          33%       { transform: translate(6px,-8px) rotate(3deg); }
          66%       { transform: translate(-4px,5px) rotate(-2deg); }
        }
        @keyframes driftB {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          50%       { transform: translate(-8px,6px) rotate(-4deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="space-y-5 pb-10">

        {/* ════════════════════════════════════════
            HERO CARD
        ════════════════════════════════════════ */}
        <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-[#0d0d0d]">

          {/* ── Atmospheric glows ── */}
          <div
            className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 65%)",
              animation: "driftA 9s ease-in-out infinite",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(220,38,38,0.10) 0%, transparent 65%)",
              animation: "driftB 12s ease-in-out infinite",
            }}
          />

          {/* ── Subtle grid lines ── */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* ── Noise texture ── */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "160px",
            }}
          />

          {/* ── Content ── */}
          <div className="relative px-5 pt-6 pb-5">

            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/8 px-3 py-1"
              {...fadeUp(0)}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-red-400"
                style={{ animation: "pulseRing 2.2s ease-in-out infinite", boxShadow: "0 0 0 4px rgba(239,68,68,0.15)" }}
              />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-red-400/90">
                Best Educational Platform
              </span>
            </div>

            {/* Headline */}
            <div className="mt-3" {...fadeUp(80)}>
              <h1 className="text-[26px] font-black leading-[1.15] tracking-tight text-white">
                বই নিন।{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #fff 0%, #f87171 40%, #fff 80%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer 3.5s linear infinite",
                  }}
                >
                  পড়ুন।
                </span>{" "}
                এগিয়ে যান।
              </h1>
              <p className="mt-2 text-[12px] leading-relaxed text-white/50 max-w-[260px]">
                ক্যাটাগরি বেছে নিন, বান্ডেল কিনুন এবং যেকোনো ডিভাইসে পড়া শুরু করুন।
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-4 flex items-center gap-3" {...fadeUp(160)}>
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-[18px] font-black text-white leading-none">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-0.5 text-[9px] font-bold text-white/40 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}

              {/* Divider dots */}
              <div className="ml-auto flex flex-col items-end gap-1">
                <button
                  onClick={() => nav("/subscription")}
                  className="group flex items-center gap-1.5 rounded-2xl bg-red-500 px-4 py-2 text-[11px] font-extrabold text-white shadow-[0_4px_20px_rgba(220,38,38,0.4)] hover:bg-red-400 transition-all duration-200 active:scale-95"
                >
                  শুরু করুন
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Category Chips — horizontal scroll ── */}
          <div
            className="flex gap-2 overflow-x-auto no-scrollbar px-5 pb-5"
            {...fadeUp(240)}
          >
            {categories.map((c, i) => (
              <button
                key={i}
                onClick={() => nav(c.to)}
                className="flex-shrink-0 flex items-center gap-1.5 rounded-2xl border border-white/8 bg-white/[0.05] px-3 py-1.5 text-[11px] font-bold text-white/75 hover:bg-white/[0.10] hover:border-white/15 hover:text-white transition-all duration-150 active:scale-95"
              >
                <span>{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════
            MOTIVATIONAL STREAK BANNER
        ════════════════════════════════════════ */}
        <div
          className="relative overflow-hidden rounded-2xl border border-white/8"
          style={{
            background: "linear-gradient(110deg, rgba(220,38,38,0.12) 0%, rgba(255,255,255,0.03) 60%, rgba(220,38,38,0.06) 100%)",
          }}
          {...fadeUp(300)}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            {/* Fire icon with glow */}
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-lg"
              style={{ boxShadow: "0 0 12px rgba(220,38,38,0.25)" }}
            >
              🔥
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-extrabold text-white leading-snug">
                আজই পড়া শুরু করুন
              </div>
              <div className="text-[10px] text-white/45 leading-snug mt-0.5">
                নিয়মিত পড়লে পরীক্ষায় সাফল্য নিশ্চিত
              </div>
            </div>
            <button
              onClick={() => nav("/my-courses")}
              className="flex-shrink-0 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-extrabold text-white/80 hover:bg-white/[0.10] transition"
            >
              আমার বই
            </button>
          </div>

          {/* decorative right accent line */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-1 rounded-r-2xl"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(220,38,38,0.6), transparent)" }}
          />
        </div>

        {/* ════════════════════════════════════════
            BUNDLE / BOOKS CAROUSEL
        ════════════════════════════════════════ */}
        <div {...fadeUp(360)}>
          <CourseCarousel />
        </div>

        {/* ════════════════════════════════════════
            TUTORIALS
        ════════════════════════════════════════ */}
        <div id="tutorials" className="scroll-mt-24" {...fadeUp(420)}>
          <TutorialVideos />
        </div>

      </div>
    </>
  );
}