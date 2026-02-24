// src/pages/MyCourses.jsx
import { Link } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import { myBooks, myBundles } from "../data/mockData.js";

export default function MyCourses() {
  const books = Array.isArray(myBooks) ? myBooks : [];
  const bundles = Array.isArray(myBundles) ? myBundles : [];

  const EmptyState = ({ title, desc, cta }) => (
    <Card className="p-4">
      <div className="text-sm font-extrabold text-white">{title}</div>
      <div className="mt-1 text-xs text-white/65 leading-relaxed">{desc}</div>
      {cta ? (
        <div className="mt-3">
          {cta}
        </div>
      ) : null}
    </Card>
  );

  const MediaCard = ({ to, thumb, title, subtitle, badges = [] }) => (
    <Link to={to} className="block">
      <Card className="overflow-hidden border border-white/10 bg-white/5 hover:bg-white/7 transition active:scale-[0.99]">
        <div className="relative h-40 w-full">
          {/* image */}
          {thumb ? (
            <img
              src={thumb}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : null}

          {/* stronger readability layer (fix bright images) */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15" />

          {/* content */}
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-base font-extrabold text-white leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] line-clamp-2">
                  {title}
                </div>
                {subtitle ? (
                  <div className="mt-1 text-xs text-white/75 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] line-clamp-2">
                    {subtitle}
                  </div>
                ) : null}
              </div>

              <div className="flex-shrink-0 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-extrabold text-white/90">
                খুলুন →
              </div>
            </div>

            {badges.length > 0 ? (
              <div className="mt-3 flex gap-2 flex-wrap">
                {badges.map((b, i) => (
                  <Badge key={i}>{b}</Badge>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Card>
    </Link>
  );

  const SectionHeader = ({ title, count }) => (
    <div className="flex items-end justify-between">
      <div className="text-sm font-extrabold text-white">{title}</div>
      <div className="text-xs text-white/55">{count} টি</div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-4">
        <div className="text-xs font-semibold text-white/60">লাইব্রেরি</div>
        <div className="mt-1 text-lg font-extrabold text-white">আমার বই ও বান্ডেল</div>
        <div className="mt-1 text-xs text-white/65 leading-relaxed">
          আপনি যেগুলো কিনেছেন — সব এখানে।
        </div>
      </Card>

      {/* ===== Bundles ===== */}
      <div className="space-y-2">
        <SectionHeader title="আমার বান্ডেল" count={bundles.length} />

        {bundles.length === 0 ? (
          <EmptyState
            title="এখনো কোনো বান্ডেল নেই"
            desc="সাবস্ক্রিপশন থেকে একাধিক বই নিয়ে বান্ডেল কিনলে এখানে দেখা যাবে।"
            cta={
              <Link
                to="/subscription"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-red-500/30 to-red-500/10 px-4 py-2 text-xs font-extrabold text-white hover:from-red-500/40 hover:to-red-500/20 transition"
              >
                সাবস্ক্রিপশন দেখুন →
              </Link>
            }
          />
        ) : (
          <div className="grid gap-3">
            {bundles.map((b) => (
              <MediaCard
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

      {/* ===== Books ===== */}
      <div className="space-y-2">
        <SectionHeader title="আমার বই" count={books.length} />

        {books.length === 0 ? (
          <EmptyState
            title="এখনো কোনো বই নেই"
            desc="সাবস্ক্রিপশন থেকে বই কিনলে এখানে দেখা যাবে।"
            cta={
              <Link
                to="/subscription"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-red-500/30 to-red-500/10 px-4 py-2 text-xs font-extrabold text-white hover:from-red-500/40 hover:to-red-500/20 transition"
              >
                বই কিনুন →
              </Link>
            }
          />
        ) : (
          <div className="grid gap-3">
            {books.map((bk) => (
              <MediaCard
                key={bk.id}
                to={`/my-courses/${bk.id}`}
                thumb={bk.thumb}
                title={bk.title}
                subtitle={bk.subtitle}
                badges={[`${bk.subjects?.length || 0} টি বিষয়`, "বই"]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}