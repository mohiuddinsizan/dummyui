// src/components/home/CourseCarousel.jsx
import { useMemo, useRef, useState } from "react";
import { homeCourses, presetBundles } from "../../data/mockData.js";
import { useNavigate } from "react-router-dom";

function money(n) {
  return Number(n || 0).toLocaleString();
}

function getValidityLabel(b) {
  const days = b.validityDays ?? b.validDays ?? b.durationDays ?? b.days ?? null;
  const months = b.validityMonths ?? b.validMonths ?? b.durationMonths ?? b.months ?? null;
  const label = b.validityLabel ?? b.validity ?? b.durationLabel ?? null;
  if (label) return String(label);
  if (months) return `${months} মাস`;
  if (days) return `${days} দিন`;
  return null;
}

export default function CourseCarousel() {
  const nav = useNavigate();
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const items = useMemo(() => {
    return presetBundles.map((b) => {
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
        validity: getValidityLabel(b),
        books: books.slice(0, 4),
      };
    });
  }, []);

  const featured = items[activeIdx] || items[0];

  const openBundle = (bundleId) => {
    nav(`/subscription?bundle=${encodeURIComponent(bundleId)}`);
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <div className="space-y-3">

      {/* ── Section label + CTA ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-1 rounded-full bg-red-500" />
          <span className="text-[13px] font-extrabold text-white tracking-wide">বই ও বান্ডেল</span>
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold text-white/45">
            {items.length} টি প্যাকেজ
          </span>
        </div>
        <button
          onClick={() => nav("/subscription")}
          className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-gradient-to-br from-red-500/20 to-red-500/5 px-3.5 py-1.5 text-[11px] font-extrabold text-white hover:from-red-500/30 transition-all duration-200"
        >
          সব দেখুন
          <span className="text-white/40">›</span>
        </button>
      </div>

      {/* ── Featured Hero Card ── */}
      {featured && (
        <button
          onClick={() => openBundle(featured.id)}
          className="group relative w-full overflow-hidden rounded-2xl border border-white/8 text-left transition-transform duration-300 active:scale-[0.99]"
          style={{ aspectRatio: "16/7" }}
        >
          {/* Background image */}
          {featured.image ? (
            <img
              src="https://the-royal-scientific-publications.com/uploads/childcategory/2025/11/23/HSC-20261763898844.jpg"
              alt={featured.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-white/[0.02]" />
          )}

          {/* Layered scrims */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            {/* Top badges */}
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-red-500/90 px-2.5 py-0.5 text-[9px] font-black text-white uppercase tracking-widest">
                Featured
              </span>
              {featured.validity && (
                <span className="rounded-full border border-white/15 bg-black/30 backdrop-blur-sm px-2.5 py-0.5 text-[9px] font-bold text-white/80">
                  ভ্যালিডিটি: {featured.validity}
                </span>
              )}
            </div>

            {/* Bottom content */}
            <div>
              <div className="text-base font-black text-white leading-snug line-clamp-2 drop-shadow-md">
                {featured.name}
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-white/85">
                    {featured.count} টি বই
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-[9px] text-white/50 font-semibold">মোট দাম</div>
                    <div className="text-sm font-black text-white">৳ {money(featured.base)}</div>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 transition-all duration-200 group-hover:bg-white/25">
                    <span className="text-xs text-white">›</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
      )}

      {/* ── Horizontal Shelf ── */}
      <div className="relative">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll(-1)}
          className="absolute -left-1 top-1/2 z-10 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/80 transition"
          aria-label="scroll left"
        >
          <span className="text-sm leading-none">‹</span>
        </button>

        <button
          onClick={() => scroll(1)}
          className="absolute -right-1 top-1/2 z-10 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/80 transition"
          aria-label="scroll right"
        >
          <span className="text-sm leading-none">›</span>
        </button>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 z-[5] bg-gradient-to-r from-black/40 to-transparent rounded-l-2xl" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 z-[5] bg-gradient-to-l from-black/40 to-transparent rounded-r-2xl" />

        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto scroll-smooth px-1 pb-1 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveIdx(idx);
                openBundle(item.id);
              }}
              className={`group flex-shrink-0 w-[160px] overflow-hidden rounded-xl border text-left transition-all duration-200 ${
                idx === activeIdx
                  ? "border-red-500/40 bg-white/[0.07]"
                  : "border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15"
              }`}
            >
              {/* Portrait thumb */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/[0.02]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Active dot */}
                {idx === activeIdx && (
                  <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                )}

                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <div className="text-[10px] font-extrabold text-white leading-snug line-clamp-2">
                    {item.name}
                  </div>
                </div>
              </div>

              {/* Info strip */}
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="text-[9px] font-bold text-white/50">{item.count} বই</span>
                <span className="text-[9px] font-extrabold text-white/80">৳ {money(item.base)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}