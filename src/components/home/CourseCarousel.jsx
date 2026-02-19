import { useEffect, useMemo, useRef, useState } from "react";
import { homeCourses } from "../../data/mockData.js";
import CourseCard from "./CourseCard.jsx";

export default function CourseCarousel() {
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
        // reset when half scrolled
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
    <div className="space-y-2">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-sm font-extrabold">Courses</div>
          <div className="text-xs text-white/60">Auto-moving carousel (right → left)</div>
        </div>
        <button
          onClick={() => setPaused((p) => !p)}
          className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold"
        >
          {paused ? "Resume" : "Pause"}
        </button>
      </div>

      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-3 px-3 py-3 will-change-transform"
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
