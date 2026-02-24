// src/components/home/CourseCarousel.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { homeCourses, presetBundles } from "../../data/mockData.js";
import { useNavigate } from "react-router-dom";

function money(n) {
  return Number(n || 0).toLocaleString();
}

// Try to read validity from bundle object safely (supports a few common names)
function getValidityLabel(b) {
  const days =
    b.validityDays ??
    b.validDays ??
    b.durationDays ??
    b.days ??
    null;

  const months =
    b.validityMonths ??
    b.validMonths ??
    b.durationMonths ??
    b.months ??
    null;

  // If your mockData already has a ready label like "৩ মাস"
  const label =
    b.validityLabel ??
    b.validity ??
    b.durationLabel ??
    null;

  if (label) return String(label);
  if (months) return `${months} মাস`;
  if (days) return `${days} দিন`;
  return null; // don't show anything if not available
}

export default function CourseCarousel() {
  const nav = useNavigate();

  // build bundle cards (duplicate for seamless scroll)
  const items = useMemo(() => {
    const bundles = presetBundles.map((b) => {
      const books = (b.courseIds || [])
        .map((id) => homeCourses.find((x) => x.id === id))
        .filter(Boolean);

      const base = books.reduce((s, x) => s + Number(x.price || 0), 0);

      return {
        id: b.id,
        name: b.name,
        count: books.length,
        base,
        image: books[0]?.image || "",
        validity: getValidityLabel(b), // optional
      };
    });

    return [...bundles, ...bundles];
  }, []);

  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    let x = 0;

    const step = () => {
      if (!paused) {
        x -= 0.55; // smoother + slightly slower on mobile
        const half = el.scrollWidth / 2;
        if (Math.abs(x) >= half) x = 0;
        el.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const openBundle = (bundleId) => {
    // keep bundle click = details/subscribe page
    nav(`/subscription?bundle=${encodeURIComponent(bundleId)}`);
  };

  return (
    <div className="space-y-2">
      {/* Simple header (mobile friendly) */}
      <div className="flex items-center justify-between gap-2">
        <div className="text-base font-extrabold text-white">বই</div>

        <div className="flex items-center gap-2">
          {/* <button
            onClick={() => setPaused((p) => !p)}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-extrabold text-white/90 hover:bg-white/10 transition"
            aria-label={paused ? "কারাউসেল চালু করুন" : "কারাউসেল থামান"}
          >
            {paused ? "চালু" : "থামান"}
          </button> */}

          <button
            onClick={() => nav("/subscription")}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-extrabold text-white/90 hover:bg-white/10 transition"
          >
            Buy Subscription
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* edge fade (subtle) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/30 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/30 to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-3 px-3 py-4 will-change-transform"
          style={{ transform: "translateX(0px)" }}
        >
          {items.map((b, idx) => (
            <button
              key={`${b.id}-${idx}`}
              onClick={() => openBundle(b.id)}
              className="w-[260px] flex-shrink-0 text-left rounded-2xl border border-white/10 bg-black/20 overflow-hidden hover:bg-black/30 transition active:scale-[0.99]"
              title="বান্ডেল খুলুন"
            >
              {/* image + title */}
              <div className="relative h-24 w-full">
                {b.image ? (
                  <img
                    src={b.image}
                    alt={b.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-sm font-extrabold text-white leading-snug line-clamp-1">
                    {b.name}
                  </div>
                </div>
              </div>

              {/* minimal info only */}
              <div className="p-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] font-extrabold text-white/90">
                    {b.count} বই
                  </span>

                  {b.validity ? (
                    <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] font-extrabold text-white/85">
                      ভ্যালিডিটি: {b.validity}
                    </span>
                  ) : null}
                </div>

                <div className="mt-2 flex items-end justify-between gap-2">
                  <div className="text-xs text-white/60 font-semibold">
                    দাম
                  </div>
                  <div className="text-base font-extrabold text-white">
                    ৳ {money(b.base)}
                  </div>
                </div>

                <div className="mt-2 text-[11px] font-bold text-white/70">
                  বিস্তারিত দেখতে ট্যাপ করুন →
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}