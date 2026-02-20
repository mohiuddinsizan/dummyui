import { useEffect, useMemo, useRef, useState } from "react";
import { homeCourses } from "../../data/mockData.js";
import CourseCard from "./CourseCard.jsx";
import { useNavigate } from "react-router-dom";

export default function CourseCarousel() {
  const nav = useNavigate();

  // Duplicate list for seamless scroll
  const items = useMemo(() => [...homeCourses, ...homeCourses], []);
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    let x = 0;

    const step = () => {
      if (!paused) {
        x -= 0.6; // speed
        const half = el.scrollWidth / 2;
        if (Math.abs(x) >= half) x = 0;
        el.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-base font-extrabold text-white">Courses</div>
          <div className="text-xs text-white/60">
            Auto-moving carousel (right → left). Hover to pause.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaused((p) => !p)}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold text-white/90 hover:bg-white/10 transition"
          >
            {paused ? "Resume" : "Pause"}
          </button>

          <button
            onClick={() => nav("/subscription")}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-sky-400/25 to-emerald-400/10 px-4 py-2 text-xs font-extrabold text-white hover:from-sky-400/35 hover:to-emerald-400/20 transition"
          >
            Subscription
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/0"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* soft edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/35 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/35 to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-3 px-3 py-4 will-change-transform"
          style={{ transform: "translateX(0px)" }}
        >
          {items.map((c, idx) => (
            <CourseCard key={`${c.id}-${idx}`} course={c} />
          ))}
        </div>
      </div>
    </div>
  );
}