// src/pages/MyCourses.jsx
import { Link } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import { myBooks, myBundles } from "../data/mockData.js";

export default function MyCourses() {
  const books = Array.isArray(myBooks) ? myBooks : [];
  const bundles = Array.isArray(myBundles) ? myBundles : [];

  /* ── Empty State ─────────────────────────────────────────── */
  const EmptyState = ({ title, desc, cta }) => (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-10 text-center">
      <div className="mb-1 text-sm font-bold text-white/80">{title}</div>
      <div className="text-[11px] leading-relaxed text-white/45">{desc}</div>
      {cta && <div className="mt-4">{cta}</div>}
    </div>
  );

  /* ── Book Card  (portrait ratio — 2:3) ───────────────────── */
  const BookCard = ({ to, thumb, title, subtitle, badges = [] }) => (
    <Link to={to} className="group block">
      <div className="relative">
        {/* Portrait cover */}
        <div
          className="relative w-full overflow-hidden rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.55)]"
          style={{ aspectRatio: "2/3" }}
        >
          {thumb ? (
            <img
              src={thumb}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            /* Fallback placeholder */
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/[0.03] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
          )}

          {/* Bottom scrim */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent" />

          {/* "খুলুন" pill — visible on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-black text-black tracking-wide shadow-xl">
              খুলুন →
            </span>
          </div>

          {/* Badges bottom-left */}
          {badges.length > 0 && (
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className="rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-0.5 text-[9px] font-bold text-white/80"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Title below cover */}
        <div className="mt-2 px-0.5">
          <div className="text-[12px] font-extrabold text-white leading-snug line-clamp-2">
            {title}
          </div>
          {subtitle && (
            <div className="mt-0.5 text-[10px] text-white/50 leading-snug line-clamp-1">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </Link>
  );

  /* ── Bundle Card  (wide landscape strip) ────────────────── */
  const BundleCard = ({ to, thumb, title, subtitle, badges = [] }) => (
    <Link to={to} className="group block">
      <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] transition-colors duration-200 group-hover:bg-white/[0.07]">
        <div className="flex items-stretch">
          {/* Left: narrow portrait thumb */}
          <div className="relative flex-shrink-0 overflow-hidden" style={{ width: "72px" }}>
            <div className="absolute inset-0">
              {thumb ? (
                <img
                  src={thumb}
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/[0.03]" />
              )}
              {/* fade into card bg */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/70" />
            </div>
          </div>

          {/* Right: text */}
          <div className="flex flex-1 flex-col justify-center gap-1.5 px-4 py-4 min-w-0">
            <div className="text-[13px] font-extrabold text-white leading-snug line-clamp-2">
              {title}
            </div>
            {subtitle && (
              <div className="text-[11px] text-white/55 leading-relaxed line-clamp-2">
                {subtitle}
              </div>
            )}
            <div className="flex flex-wrap gap-1.5 mt-0.5">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/10 bg-white/8 px-2.5 py-0.5 text-[9px] font-bold text-white/70"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0 flex items-center pr-4">
            <span className="text-xl text-white/25 group-hover:text-white/70 transition-colors">›</span>
          </div>
        </div>
      </div>
    </Link>
  );

  /* ── Section Header ──────────────────────────────────────── */
  const SectionHeader = ({ title, count }) => (
    <div className="flex items-center justify-between pb-1">
      <div className="text-[13px] font-extrabold text-white tracking-wide">
        {title}
      </div>
      <div className="rounded-full bg-white/8 border border-white/10 px-2.5 py-0.5 text-[10px] font-bold text-white/50">
        {count} টি
      </div>
    </div>
  );

  /* ── CTA Button ──────────────────────────────────────────── */
  const CtaBtn = ({ to, label }) => (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-red-500/30 to-red-500/10 px-4 py-2 text-xs font-extrabold text-white hover:from-red-500/40 hover:to-red-500/20 transition"
    >
      {label}
    </Link>
  );

  /* ── Page ─────────────────────────────────────────────────── */
  return (
    <div className="space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-5">
        {/* subtle top-right glow accent */}
        <div
          className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.7) 0%, transparent 70%)" }}
        />
        <div className="relative">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-400/80">
            লাইব্রেরি
          </div>
          <div className="mt-1 text-xl font-black text-white tracking-tight">
            আমার বই ও বান্ডেল
          </div>
          <div className="mt-1 text-[11px] text-white/50 leading-relaxed">
            আপনি যেগুলো কিনেছেন — সব এখানে।
          </div>
          <div className="mt-3 flex gap-2.5">
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
              <span className="text-[10px] font-bold text-white/55">বই</span>
              <span className="text-[11px] font-black text-white">{books.length}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
              <span className="text-[10px] font-bold text-white/55">বান্ডেল</span>
              <span className="text-[11px] font-black text-white">{bundles.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bundles Section ─────────────────────────────────── */}
      <div className="space-y-3">
        <SectionHeader title="আমার বান্ডেল" count={bundles.length} />
        {bundles.length === 0 ? (
          <EmptyState
            title="এখনো কোনো বান্ডেল নেই"
            desc="সাবস্ক্রিপশন থেকে একাধিক বই নিয়ে বান্ডেল কিনলে এখানে দেখা যাবে।"
            cta={<CtaBtn to="/subscription" label="সাবস্ক্রিপশন দেখুন →" />}
          />
        ) : (
          <div className="flex flex-col gap-2.5">
            {bundles.map((b) => (
              <BundleCard
                key={b.id}
                to={`/my-courses/${b.id}`}
                thumb={b.thumb}
                title={b.title}
                subtitle={b.subtitle}
                badges={[`${b.bookIds?.length || 0} টি বই`, "বান্ডেল"]}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Books Section ───────────────────────────────────── */}
      <div className="space-y-3">
        <SectionHeader title="আমার বই" count={books.length} />
        {books.length === 0 ? (
          <EmptyState
            title="এখনো কোনো বই নেই"
            desc="সাবস্ক্রিপশন থেকে বই কিনলে এখানে দেখা যাবে।"
            cta={<CtaBtn to="/subscription" label="বই কিনুন →" />}
          />
        ) : (
          /* 3-column portrait grid — natural book-shelf feel */
          <div className="grid grid-cols-3 gap-3">
            {books.map((bk) => (
              <BookCard
                key={bk.id}
                to={`/my-courses/${bk.id}`}
                thumb={bk.thumb}
                title={bk.title}
                subtitle={bk.subtitle}
                badges={[`${bk.subjects?.length || 0} টি বিষয়`]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}