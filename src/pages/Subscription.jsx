import { useMemo, useState } from "react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Select from "../components/ui/Select.jsx";
import Input from "../components/ui/Input.jsx";
import { homeCourses, presetBundles, subscriptionYears, user } from "../data/mockData.js";

function discountRate(n) {
  if (n >= 7) return 0.10;
  if (n >= 4) return 0.075;
  if (n >= 2) return 0.05;
  return 0;
}

function money(n) {
  return Number(n || 0).toLocaleString();
}

const TABS = [
  { value: "single", label: "Single" },
  { value: "bundle", label: "Bundle" },
  { value: "preset", label: "Presets" },
];

/* ── Reusable section label ── */
function SectionLabel({ children }) {
  return (
    <div className="text-[11px] font-extrabold uppercase tracking-widest text-white/35 mb-3">
      {children}
    </div>
  );
}

/* ── Divider ── */
function Divider() {
  return <div className="border-t border-white/8 my-5" />;
}

export default function Subscription() {
  const [tab, setTab] = useState("single");

  // --- Single ---
  const [singleCourseId, setSingleCourseId] = useState(homeCourses[0]?.id || "");
  const [singleYear, setSingleYear]         = useState(subscriptionYears[0] || "2025");
  const singleCourse = useMemo(
    () => homeCourses.find((c) => c.id === singleCourseId),
    [singleCourseId]
  );

  // --- Bundle ---
  const [bundleName,  setBundleName]  = useState("");
  const [bundleYear,  setBundleYear]  = useState(subscriptionYears[0] || "2025");
  const [selected,    setSelected]    = useState(() => new Set());
  const [courseQuery, setCourseQuery] = useState("");
  const [sortBy,      setSortBy]      = useState("popular");

  const selectedCourses = useMemo(
    () => homeCourses.filter((c) => selected.has(c.id)),
    [selected]
  );

  const bundlePricing = useMemo(() => {
    const count    = selectedCourses.length;
    const base     = selectedCourses.reduce((s, c) => s + Number(c.price || 0), 0);
    const rate     = discountRate(count);
    const discount = base * rate;
    const final    = Math.max(0, base - discount);
    return { count, base, rate, discount, final };
  }, [selectedCourses]);

  const toggleCourse = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filteredCourses = useMemo(() => {
    const q    = courseQuery.trim().toLowerCase();
    let   list = q
      ? homeCourses.filter(
          (c) =>
            String(c.name || "").toLowerCase().includes(q) ||
            String(c.desc || "").toLowerCase().includes(q)
        )
      : [...homeCourses];
    if (sortBy === "priceLow")  list.sort((a, b) => a.price - b.price);
    if (sortBy === "priceHigh") list.sort((a, b) => b.price - a.price);
    if (sortBy === "name")      list.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    return list;
  }, [courseQuery, sortBy]);

  const presetExpanded = useMemo(() =>
    presetBundles.map((b) => {
      const courses  = homeCourses.filter((c) => b.courseIds.includes(c.id));
      const base     = courses.reduce((s, c) => s + Number(c.price || 0), 0);
      const rate     = discountRate(courses.length);
      const discount = base * rate;
      const final    = Math.max(0, base - discount);
      return { ...b, courses, base, rate, discount, final };
    }),
  []);

  const canCreateBundle = bundleName.trim().length >= 2 && bundlePricing.count >= 2;

  const buySingle = () =>
    alert(`Single subscription (mock)\nCourse: ${singleCourse?.name}\nYear: ${singleYear}\nPrice: ৳ ${money(singleCourse?.price)}`);

  const createBundle = () => {
    alert(`Bundle created (mock)\nName: ${bundleName}\nYear: ${bundleYear}\nCourses: ${bundlePricing.count}\nPay: ৳ ${money(bundlePricing.final.toFixed(0))}`);
    setBundleName(""); setSelected(new Set()); setCourseQuery("");
  };

  const buyPreset = (b) =>
    alert(`Preset bundle (mock)\nBundle: ${b.name}\nPay: ৳ ${money(b.final.toFixed(0))}`);

  /* ─────────────────────────────── RENDER ─────────────────────────────── */
  return (
    <div className="space-y-3 pb-10">

      {/* ══ HEADER CARD ══ */}
      <Card className="p-5">
        <div className="text-xs text-white/40 font-semibold tracking-wide uppercase">Royal Scientific</div>
        <div className="text-2xl font-extrabold mt-1 tracking-tight">Subscriptions</div>

        {/* Wallet chip */}
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Wallet ৳ {money(user.walletBalance)} &nbsp;·&nbsp; {user.plan}
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-0.5">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={[
                "flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold border transition-all",
                tab === t.value
                  ? "bg-white/12 border-white/25 text-white"
                  : "bg-transparent border-white/10 text-white/40",
              ].join(" ")}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Card>

      {/* ══ SINGLE TAB ══ */}
      {tab === "single" && (
        <Card className="p-5">

          {/* Section title */}
          <div className="mb-5">
            <div className="text-base font-extrabold text-white">Single Subscription</div>
            <div className="text-xs text-white/45 mt-0.5">Choose one course, pick a year, done.</div>
          </div>

          {/* ── Course picker ── */}
          <SectionLabel>Choose a course</SectionLabel>
          <div className="flex flex-col gap-3">
            {homeCourses.map((c) => {
              const active = singleCourseId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSingleCourseId(c.id)}
                  className={[
                    "w-full text-left rounded-2xl border overflow-hidden transition-all active:scale-[0.99]",
                    active
                      ? "border-white/25 bg-white/8"
                      : "border-white/8 bg-white/3",
                  ].join(" ")}
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-28 object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <div className="p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-extrabold text-white leading-snug">{c.name}</div>
                        <div className="text-xs text-white/45 mt-0.5 leading-relaxed">{c.desc}</div>
                      </div>
                      {active && (
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white grid place-items-center text-[10px] font-extrabold text-black mt-0.5">
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-white/50">
                        {c.validity}
                      </span>
                      <span className="text-sm font-extrabold text-white">৳ {money(c.price)}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <Divider />

          {/* ── Year picker ── */}
          <SectionLabel>Select year</SectionLabel>
          <Select value={singleYear} onChange={(e) => setSingleYear(e.target.value)}>
            {subscriptionYears.map((y) => <option key={y} value={y}>{y}</option>)}
          </Select>

          <Divider />

          {/* ── Summary ── */}
          {singleCourse && (
            <>
              <SectionLabel>Order summary</SectionLabel>
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="flex justify-between items-center px-4 py-3 border-b border-white/8">
                  <span className="text-xs text-white/50">Course</span>
                  <span className="text-sm font-bold text-white">{singleCourse.name}</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 border-b border-white/8">
                  <span className="text-xs text-white/50">Validity</span>
                  <span className="text-sm font-bold text-white">{singleCourse.validity}</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 border-b border-white/8">
                  <span className="text-xs text-white/50">Year</span>
                  <span className="text-sm font-bold text-white">{singleYear}</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 bg-white/5">
                  <span className="text-xs font-bold text-white/60">Total</span>
                  <span className="text-lg font-extrabold text-white">৳ {money(singleCourse.price)}</span>
                </div>
              </div>
              <Button className="w-full mt-4" onClick={buySingle}>
                Buy Now
              </Button>
            </>
          )}
        </Card>
      )}

      {/* ══ BUNDLE TAB ══ */}
      {tab === "bundle" && (
        <Card className="p-5">

          <div className="mb-5">
            <div className="text-base font-extrabold text-white">Bundle Subscription</div>
            <div className="text-xs text-white/45 mt-0.5">Add multiple courses — discount applied automatically.</div>
          </div>

          {/* Discount info strip */}
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 mb-6">
            <span className="text-base">🎁</span>
            <div className="text-xs text-white/60 leading-relaxed">
              <span className="text-white font-bold">2–3 courses</span> = 5% off &nbsp;·&nbsp;
              <span className="text-white font-bold">4–6</span> = 7.5% off &nbsp;·&nbsp;
              <span className="text-white font-bold">7+</span> = 10% off
            </div>
          </div>

          {/* ── Bundle details ── */}
          <SectionLabel>Bundle details</SectionLabel>
          <div className="flex flex-col gap-3 mb-2">
            <Input
              placeholder="Bundle name (e.g. My 2025 Combo)"
              value={bundleName}
              onChange={(e) => setBundleName(e.target.value)}
            />
            <Select value={bundleYear} onChange={(e) => setBundleYear(e.target.value)}>
              {subscriptionYears.map((y) => <option key={y} value={y}>{y}</option>)}
            </Select>
          </div>

          <Divider />

          {/* ── Search & sort ── */}
          <SectionLabel>Search & sort</SectionLabel>
          <div className="flex flex-col gap-3 mb-2">
            <Input
              placeholder="Search by name or topic…"
              value={courseQuery}
              onChange={(e) => setCourseQuery(e.target.value)}
            />
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="popular">Sort: Popular</option>
              <option value="priceLow">Sort: Price Low → High</option>
              <option value="priceHigh">Sort: Price High → Low</option>
              <option value="name">Sort: Name A → Z</option>
            </Select>
          </div>

          <Divider />

          {/* ── Course list ── */}
          <SectionLabel>
            Select courses
            {bundlePricing.count > 0 && (
              <span className="ml-2 normal-case tracking-normal font-bold text-white/60">
                ({bundlePricing.count} selected)
              </span>
            )}
          </SectionLabel>
          <div className="flex flex-col gap-3">
            {filteredCourses.map((c) => {
              const active = selected.has(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCourse(c.id)}
                  className={[
                    "w-full text-left rounded-2xl border overflow-hidden transition-all active:scale-[0.99]",
                    active ? "border-white/25 bg-white/8" : "border-white/8 bg-white/3",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3 p-3">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-extrabold text-white truncate">{c.name}</div>
                      <div className="text-xs text-white/45 mt-0.5 truncate">{c.desc}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-white/50">
                          {c.validity}
                        </span>
                        <span className="text-sm font-extrabold text-white">৳ {money(c.price)}</span>
                      </div>
                    </div>
                    <div
                      className={[
                        "flex-shrink-0 w-7 h-7 rounded-full border-2 grid place-items-center text-xs font-extrabold transition-all mr-1",
                        active
                          ? "bg-white border-white text-black"
                          : "border-white/20 bg-transparent text-transparent",
                      ].join(" ")}
                    >
                      ✓
                    </div>
                  </div>
                </button>
              );
            })}
            {filteredCourses.length === 0 && (
              <div className="py-10 text-center text-sm text-white/30">No courses found.</div>
            )}
          </div>

          {/* ── Pricing summary — shown only when courses selected ── */}
          {bundlePricing.count > 0 && (
            <>
              <Divider />
              <SectionLabel>Pricing summary</SectionLabel>
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden mb-4">
                <div className="flex justify-between items-center px-4 py-3 border-b border-white/8">
                  <span className="text-xs text-white/50">Courses selected</span>
                  <span className="text-sm font-bold text-white">{bundlePricing.count}</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 border-b border-white/8">
                  <span className="text-xs text-white/50">Base price</span>
                  <span className="text-sm font-bold text-white">৳ {money(bundlePricing.base)}</span>
                </div>
                {bundlePricing.discount > 0 && (
                  <div className="flex justify-between items-center px-4 py-3 border-b border-white/8">
                    <span className="text-xs text-white/50">Discount ({Math.round(bundlePricing.rate * 100)}%)</span>
                    <span className="text-sm font-bold text-emerald-400">− ৳ {money(bundlePricing.discount.toFixed(0))}</span>
                  </div>
                )}
                <div className="flex justify-between items-center px-4 py-3.5 bg-white/5">
                  <span className="text-xs font-bold text-white/60">You pay</span>
                  <span className="text-lg font-extrabold text-white">৳ {money(bundlePricing.final.toFixed(0))}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => { setSelected(new Set()); setCourseQuery(""); }}
                  className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-xs font-bold text-white/50 flex-shrink-0"
                >
                  Clear
                </button>
                <Button
                  className="flex-1"
                  onClick={canCreateBundle ? createBundle : undefined}
                  disabled={!canCreateBundle}
                >
                  Create & Buy
                </Button>
              </div>
              {!canCreateBundle && (
                <div className="mt-2.5 text-[11px] text-white/35 text-center">
                  Add a bundle name + at least 2 courses to continue
                </div>
              )}
            </>
          )}
        </Card>
      )}

      {/* ══ PRESETS TAB ══ */}
      {tab === "preset" && (
        <Card className="p-5">

          <div className="mb-5">
            <div className="text-base font-extrabold text-white">Preset Bundles</div>
            <div className="text-xs text-white/45 mt-0.5">Hand-picked bundles — one tap to buy.</div>
          </div>

          <div className="flex flex-col gap-5">
            {presetExpanded.map((b) => (
              <div
                key={b.id}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
              >
                {/* Hero image */}
                {b.courses[0]?.image && (
                  <div className="relative h-44 w-full">
                    <img
                      src={b.courses[0].image}
                      alt={b.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <div className="text-lg font-extrabold text-white leading-tight">{b.name}</div>
                      <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3 py-0.5 text-[11px] font-bold text-white/80">
                        {b.courses.length} courses &nbsp;·&nbsp; {Math.round(b.rate * 100)}% off
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-4">

                  {/* Thumbnail strip */}
                  <SectionLabel>Included courses</SectionLabel>
                  <div className="flex gap-2.5 overflow-x-auto pb-2 mb-4">
                    {b.courses.map((c) => (
                      <div key={c.id} className="flex-shrink-0 flex flex-col items-center gap-1.5">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-16 h-11 object-cover rounded-xl border border-white/10"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                        <span className="text-[10px] text-white/45 max-w-[64px] text-center leading-tight">
                          {c.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Course rows */}
                  <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden mb-4">
                    {b.courses.map((c, i) => (
                      <div
                        key={c.id}
                        className={[
                          "flex items-center justify-between px-4 py-3",
                          i > 0 ? "border-t border-white/8" : "",
                        ].join(" ")}
                      >
                        <span className="text-sm text-white/80 font-semibold">{c.name}</span>
                        <span className="text-xs text-white/40 font-semibold">৳ {money(c.price)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/35 line-through mb-0.5">৳ {money(b.base)}</div>
                      <div className="text-2xl font-extrabold text-white tracking-tight">
                        ৳ {money(b.final.toFixed(0))}
                      </div>
                      {b.discount > 0 && (
                        <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                          You save ৳ {money(b.discount.toFixed(0))}
                        </div>
                      )}
                    </div>
                    <Button onClick={() => buyPreset(b)}>Buy Bundle</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

    </div>
  );
}