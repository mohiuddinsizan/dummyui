// src/pages/Subscription.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { homeCourses, presetBundles, subscriptionYears, user } from "../data/mockData.js";

/* ─── helpers ──────────────────────────────────────────────────── */
function discountRate(n) {
  if (n >= 7) return 0.10;
  if (n >= 4) return 0.075;
  if (n >= 2) return 0.05;
  return 0;
}
function money(n) { return Number(n || 0).toLocaleString(); }

const PAGE_SIZE = 5;

const TABS = [
  { value: "single", label: "একক বই", icon: "📖" },
  { value: "bundle", label: "বান্ডেল বই", icon: "📦" },
  { value: "preset", label: "প্রিসেট বান্ডেল", icon: "⚡" },
];

const CLASS_OPTIONS = [
  { value: "all", label: "সব ক্লাস" },
  { value: "admission", label: "Admission" },
  { value: "hsc", label: "HSC" },
  { value: "ssc", label: "SSC" },
];

const CATEGORY_OPTIONS = [
  { value: "all", label: "সব ক্যাটাগরি" },
  { value: "quick_preparation", label: "কুইক প্রিপারেশন" },
  { value: "guide", label: "গাইড" },
  { value: "understanding", label: "আন্ডারস্ট্যান্ডিং সিরিজ" },
  { value: "test_paper", label: "টেস্ট পেপার" },
];

function classLabel(v) {
  return { admission: "ভর্তি", hsc: "এইচএসসি", ssc: "এসএসসি" }[v] || "সব ক্লাস";
}
function categoryLabel(v) {
  return {
    quick_preparation: "কুইক প্রিপ",
    guide: "গাইড",
    understanding: "আন্ডারস্ট্যান্ডিং",
    test_paper: "টেস্ট পেপার",
  }[v] || "সব ক্যাটাগরি";
}

/* ─── design system (BLACK + RED THEME, keep same style) ────────── */
const C = {
  // base
  bg: "#08090d",
  card: "#0f1117",
  card2: "#141824",

  // borders
  border: "#1b1f2d",
  border2: "#242a3b",

  // text
  text: "#f9fafb",
  textMid: "#e5e7eb",
  textDim: "#a1a1aa",
  textFade: "#71717a",
  textGhost: "#3f3f46",

  // primary (red)
  red: "#ef4444",
  redDark: "#2a0f14",
  redDeep: "#3b1116",
  redLight: "#fecaca",

  // success (keep green for “save/discount”)
  green: "#10b981",
  greenDark: "#064e3b",
  greenLight: "#34d399",
  greenMid: "#6ee7b7",
};

/* ─── atoms ──────────────────────────────────────────────────────── */
const SLabel = ({ children, right }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textFade }}>
      {children}
    </span>
    {right && <span style={{ fontSize: 11, color: C.textFade, fontWeight: 600 }}>{right}</span>}
  </div>
);

const Divider = () => (
  <div style={{ borderTop: `1px solid ${C.border}`, margin: "14px 0" }} />
);

const Card = ({ children, style }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 16, marginBottom: 12, ...style }}>
    {children}
  </div>
);

const StyledSelect = ({ value, onChange, children, label }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    {label && (
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.textFade }}>
        {label}
      </span>
    )}
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={onChange}
        style={{
          width: "100%", background: C.card2, border: `1px solid ${C.border2}`,
          borderRadius: 12, padding: "11px 36px 11px 13px", color: C.textMid,
          fontSize: 13, fontWeight: 500, outline: "none", appearance: "none", cursor: "pointer",
        }}
      >
        {children}
      </select>
      <svg
        style={{
          position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)",
          width: 15, height: 15, color: C.textGhost, pointerEvents: "none",
        }}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

const SearchBox = ({ value, onChange }) => (
  <div style={{ position: "relative" }}>
    <svg style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: C.textGhost, pointerEvents: "none" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
    <input
      value={value}
      onChange={onChange}
      placeholder="বইয়ের নাম লিখুন…"
      style={{
        width: "100%", background: C.card2, border: `1px solid ${C.border2}`,
        borderRadius: 12, padding: "11px 38px 11px 40px", color: C.textMid,
        fontSize: 13, outline: "none", boxSizing: "border-box",
      }}
    />
    {value && (
      <button
        onClick={() => onChange({ target: { value: "" } })}
        style={{
          position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
          color: C.textFade, background: "none", border: "none", cursor: "pointer",
          fontSize: 15, padding: 2, lineHeight: 1,
        }}
      >
        ✕
      </button>
    )}
  </div>
);

const PrimaryBtn = ({ children, onClick, disabled, full }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      width: full ? "100%" : "auto",
      padding: "13px 22px",
      borderRadius: 14,
      background: disabled ? C.border : C.red,
      color: disabled ? C.textGhost : "#fff",
      fontSize: 14,
      fontWeight: 800,
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.15s",
      boxShadow: disabled ? "none" : `0 4px 18px ${C.red}44`,
      letterSpacing: "-0.2px",
    }}
  >
    {children}
  </button>
);

const GhostBtn = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: "13px 18px",
      borderRadius: 14,
      background: C.card2,
      color: C.textDim,
      fontSize: 13,
      fontWeight: 700,
      border: `1px solid ${C.border2}`,
      cursor: "pointer",
      transition: "all 0.15s",
    }}
  >
    {children}
  </button>
);

/* ─── filter bar ─────────────────────────────────────────────────── */
const FilterBar = ({ query, setQuery, classFilter, setClassFilter, categoryFilter, setCategoryFilter, sortBy, setSortBy }) => {
  const hasFilter = classFilter !== "all" || categoryFilter !== "all" || query || sortBy !== "popular";

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.textMid }}>🔍 বই খুঁজুন</span>
        {hasFilter && (
          <button
            onClick={() => { setQuery(""); setClassFilter("all"); setCategoryFilter("all"); setSortBy("popular"); }}
            style={{
              fontSize: 11, fontWeight: 700, color: C.textDim,
              background: C.card2, border: `1px solid ${C.border2}`, borderRadius: 20,
              padding: "4px 12px", cursor: "pointer",
            }}
          >
            ✕ রিসেট
          </button>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        <SearchBox value={query} onChange={(e) => setQuery(e.target.value)} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
          <StyledSelect label="ক্লাস" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
            {CLASS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </StyledSelect>
          <StyledSelect label="ক্যাটাগরি" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {CATEGORY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </StyledSelect>
        </div>
        <StyledSelect label="সাজান" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="popular">জনপ্রিয়তা অনুযায়ী</option>
          <option value="priceLow">দাম: কম → বেশি</option>
          <option value="priceHigh">দাম: বেশি → কম</option>
          <option value="name">নাম: A → Z</option>
        </StyledSelect>
      </div>

      {hasFilter && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
          {classFilter !== "all" && (
            <span
              style={{
                background: C.redDark,
                border: `1px solid ${C.red}33`,
                borderRadius: 20,
                padding: "4px 11px",
                fontSize: 11,
                fontWeight: 700,
                color: C.redLight,
              }}
            >
              {classLabel(classFilter)}
            </span>
          )}
          {categoryFilter !== "all" && (
            <span
              style={{
                background: C.redDark,
                border: `1px solid ${C.red}33`,
                borderRadius: 20,
                padding: "4px 11px",
                fontSize: 11,
                fontWeight: 700,
                color: C.redLight,
              }}
            >
              {categoryLabel(categoryFilter)}
            </span>
          )}
          {query && (
            <span
              style={{
                background: C.redDark,
                border: `1px solid ${C.red}33`,
                borderRadius: 20,
                padding: "4px 11px",
                fontSize: 11,
                fontWeight: 700,
                color: C.redLight,
              }}
            >
              "{query}"
            </span>
          )}
        </div>
      )}
    </Card>
  );
};

/* ─── pager ──────────────────────────────────────────────────────── */
const Pager = ({ page, totalPages, onPrev, onNext, total }) => {
  if (totalPages <= 1) return null;
  const start = (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 11, color: C.textFade, fontWeight: 500 }}>{start}–{end} / {total}</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <button
          onClick={onPrev} disabled={page <= 1}
          style={{
            padding: "7px 14px", borderRadius: 10, border: `1px solid ${C.border2}`,
            background: page <= 1 ? C.card : C.card2,
            color: page <= 1 ? C.textGhost : C.textMid,
            fontSize: 12, fontWeight: 700,
            cursor: page <= 1 ? "not-allowed" : "pointer",
          }}
        >← আগে</button>

        <span
          style={{
            padding: "7px 12px",
            borderRadius: 10,
            background: C.redDeep,
            border: `1px solid ${C.red}33`,
            fontSize: 12,
            fontWeight: 800,
            color: C.redLight,
          }}
        >
          {page}/{totalPages}
        </span>

        <button
          onClick={onNext} disabled={page >= totalPages}
          style={{
            padding: "7px 14px", borderRadius: 10, border: `1px solid ${C.border2}`,
            background: page >= totalPages ? C.card : C.card2,
            color: page >= totalPages ? C.textGhost : C.textMid,
            fontSize: 12, fontWeight: 700,
            cursor: page >= totalPages ? "not-allowed" : "pointer",
          }}
        >পরে →</button>
      </div>
    </div>
  );
};

/* ─── course row ─────────────────────────────────────────────────── */
const CourseRow = ({ c, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      textAlign: "left",
      background: active ? C.redDark : C.card2,
      border: `1px solid ${active ? C.red + "55" : C.border}`,
      borderRadius: 16,
      padding: 12,
      cursor: "pointer",
      outline: "none",
      transition: "all 0.15s",
      boxShadow: active ? `0 0 0 1.5px ${C.red}22, 0 2px 12px ${C.red}18` : "none",
    }}
  >
    <img
      src={c.image}
      alt={c.name}
      style={{ width: 58, height: 58, borderRadius: 11, objectFit: "cover", flexShrink: 0, background: C.border }}
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />

    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ color: C.text, fontSize: 14, fontWeight: 700, lineHeight: 1.3, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {c.name}
      </div>
      <div style={{ color: C.textFade, fontSize: 11, marginBottom: 7, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {c.desc}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        <span style={{ background: C.border, borderRadius: 6, padding: "2px 7px", fontSize: 10, fontWeight: 600, color: C.textDim }}>
          {c.validity}
        </span>
        <span style={{ background: C.border, borderRadius: 6, padding: "2px 7px", fontSize: 10, fontWeight: 600, color: C.textDim }}>
          {classLabel(c.category)}
        </span>
        <span style={{ marginLeft: "auto", fontSize: 15, fontWeight: 800, color: C.text }}>
          ৳ {money(c.price)}
        </span>
      </div>
    </div>

    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        flexShrink: 0,
        background: active ? C.red : "transparent",
        border: `2px solid ${active ? C.red : C.textGhost}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s",
        marginLeft: 4,
      }}
    >
      {active && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  </button>
);

/* ─── summary table ──────────────────────────────────────────────── */
const SummaryTable = ({ rows, accentRow, totalLabel, totalValue }) => (
  <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
    {rows.map((r, i) => (
      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 16px", borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 12, color: C.textFade }}>{r.label}</span>
        <span style={{ fontSize: 13, color: r.color || C.textMid, fontWeight: r.bold ? 700 : 500, maxWidth: "60%", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {r.value}
        </span>
      </div>
    ))}

    {accentRow && (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 16px", borderBottom: `1px solid ${C.border}`, background: C.greenDark + "88" }}>
        <span style={{ fontSize: 12, color: C.greenMid, fontWeight: 700 }}>{accentRow.label}</span>
        <span style={{ fontSize: 13, color: C.greenLight, fontWeight: 800 }}>{accentRow.value}</span>
      </div>
    )}

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: C.border }}>
      <span style={{ fontSize: 12, color: C.textDim, fontWeight: 700 }}>{totalLabel}</span>
      <span style={{ fontSize: 20, color: C.text, fontWeight: 800 }}>{totalValue}</span>
    </div>
  </div>
);

const DiscountBanner = () => (
  <div style={{
    background: `linear-gradient(135deg, ${C.redDeep} 0%, ${C.redDark} 100%)`,
    border: `1px solid ${C.red}33`,
    borderRadius: 16,
    padding: "13px 16px",
    marginBottom: 12,
  }}>
    <div style={{ fontSize: 12, color: C.redLight, fontWeight: 800, marginBottom: 8 }}>🎁 বেশি বই কিনলে বেশি ছাড়</div>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {[["২–৩ বই", "৫%"], ["৪–৬ বই", "৭.৫%"], ["৭+ বই", "১০%"]].map(([label, pct]) => (
        <div
          key={pct}
          style={{
            background: "#1a0b0f",
            border: `1px solid ${C.red}22`,
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: 11,
            color: C.redLight,
            fontWeight: 800,
          }}
        >
          {label} → <span style={{ color: "#fff" }}>{pct}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════ */
export default function Subscription() {
  const location = useLocation();
  const [tab, setTab] = useState("single");

  /* shared filters */
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [classFilter, setClassFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  /* paging */
  const [pageSingle, setPageSingle] = useState(1);
  const [pageBundle, setPageBundle] = useState(1);
  const [pagePreset, setPagePreset] = useState(1);

  /* single */
  const [singleCourseId, setSingleCourseId] = useState(homeCourses[0]?.id || "");
  const [singleYear, setSingleYear] = useState(subscriptionYears[0] || "2025");
  const singleCourse = useMemo(() => homeCourses.find((c) => c.id === singleCourseId), [singleCourseId]);

  /* bundle */
  const [bundleName, setBundleName] = useState("");
  const [bundleYear, setBundleYear] = useState(subscriptionYears[0] || "2025");
  const [selected, setSelected] = useState(() => new Set());

  /* deep-link */
  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    const bundleId = qs.get("bundle");
    if (!bundleId) return;
    const pb = presetBundles.find((b) => b.id === bundleId);
    if (!pb) return;
    setTab("bundle"); setBundleName(pb.name); setSelected(new Set(pb.courseIds));
    setQuery(""); setClassFilter("all"); setCategoryFilter("all"); setSortBy("popular"); setPageBundle(1);
  }, [location.search]);

  const selectedCourses = useMemo(() => homeCourses.filter((c) => selected.has(c.id)), [selected]);
  const bundlePricing = useMemo(() => {
    const count = selectedCourses.length;
    const base = selectedCourses.reduce((s, c) => s + Number(c.price || 0), 0);
    const rate = discountRate(count);
    const discount = base * rate;
    const final = Math.max(0, base - discount);
    return { count, base, rate, discount, final };
  }, [selectedCourses]);

  const toggleCourse = (id) => setSelected((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  /* filtered courses */
  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = [...homeCourses];
    if (classFilter !== "all") list = list.filter((c) => c.category === classFilter);
    if (categoryFilter !== "all") list = list.filter((c) => c.subcategory === categoryFilter);
    if (q) list = list.filter((c) => String(c.name || "").toLowerCase().includes(q) || String(c.desc || "").toLowerCase().includes(q));
    if (sortBy === "priceLow") list.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sortBy === "priceHigh") list.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sortBy === "name") list.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    return list;
  }, [query, sortBy, classFilter, categoryFilter]);

  useEffect(() => { setPageSingle(1); setPageBundle(1); }, [query, sortBy, classFilter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const singlePageItems = useMemo(() => filteredCourses.slice((pageSingle - 1) * PAGE_SIZE, pageSingle * PAGE_SIZE), [filteredCourses, pageSingle]);
  const bundlePageItems = useMemo(() => filteredCourses.slice((pageBundle - 1) * PAGE_SIZE, pageBundle * PAGE_SIZE), [filteredCourses, pageBundle]);

  /* presets */
  const presetExpanded = useMemo(() => presetBundles.map((b) => {
    const courses = homeCourses.filter((c) => b.courseIds.includes(c.id));
    const base = courses.reduce((s, c) => s + Number(c.price || 0), 0);
    const rate = discountRate(courses.length);
    const discount = base * rate;
    const final = Math.max(0, base - discount);
    return { ...b, courses, base, rate, discount, final };
  }), []);

  const presetTotal = Math.max(1, Math.ceil(presetExpanded.length / PAGE_SIZE));
  const presetPageItems = useMemo(() => presetExpanded.slice((pagePreset - 1) * PAGE_SIZE, pagePreset * PAGE_SIZE), [presetExpanded, pagePreset]);

  const canCreateBundle = bundleName.trim().length >= 2 && bundlePricing.count >= 2;

  const buySingle = () => alert(`একক সাবস্ক্রিপশন\nবই: ${singleCourse?.name}\nবছর: ${singleYear}\nমূল্য: ৳ ${money(singleCourse?.price)}`);
  const createBundle = () => {
    alert(`বান্ডেল\nনাম: ${bundleName}\nবছর: ${bundleYear}\nবই: ${bundlePricing.count}\nপে: ৳ ${money(bundlePricing.final.toFixed(0))}`);
    setBundleName(""); setSelected(new Set()); setQuery("");
  };
  const buyPreset = (b) => alert(`প্রিসেট: ${b.name}\nপে: ৳ ${money(b.final.toFixed(0))}`);

  /* ═══════════════════════ RENDER ═══════════════════════ */
  return (
    <div style={{ background: C.bg, minHeight: "100vh", paddingBottom: 80 }}>

      {/* ── HEADER ── */}
      <div
        style={{
          background: `linear-gradient(180deg, ${C.card} 0%, ${C.bg} 100%)`,
          borderBottom: `1px solid ${C.border}`,
          padding: "22px 16px 18px",
        }}
      >
        <div style={{ fontSize: 10, color: C.textFade, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 5 }}>
          The Royal Scientific Publications Ltd. 
        </div>

        <div style={{ fontSize: 27, color: C.text, fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.1 }}>
          সাবস্ক্রিপশন
        </div>

        {/* wallet */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 11, background: C.card2, border: `1px solid ${C.border2}`, borderRadius: 24, padding: "7px 14px" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: C.textFade, fontWeight: 500 }}>
            Wallet <strong style={{ color: C.text }}>৳ {money(user.walletBalance)}</strong>
          </span>
          <span style={{ color: C.border2 }}>·</span>
          <span style={{ fontSize: 12, color: C.textFade, fontWeight: 600 }}>{user.plan}</span>
        </div>

        {/* tabs */}
        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          {TABS.map((t) => {
            const active = tab === t.value;
            return (
              <button
                key={t.value}
                onClick={() => setTab(t.value)}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 5,
                  padding: "11px 6px",
                  borderRadius: 15,
                  background: active ? C.red : C.card2,
                  border: `1px solid ${active ? C.red : C.border2}`,
                  color: active ? "#fff" : C.textFade,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  boxShadow: active ? `0 4px 18px ${C.red}44` : "none",
                }}
              >
                <span style={{ fontSize: 20, lineHeight: 1 }}>{t.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 800 }}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: "14px 14px 0" }}>

        {(tab === "single" || tab === "bundle") && (
          <FilterBar
            query={query} setQuery={setQuery}
            classFilter={classFilter} setClassFilter={setClassFilter}
            categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
            sortBy={sortBy} setSortBy={setSortBy}
          />
        )}

        {/* ══ SINGLE ══════════════════════════════════════════════ */}
        {tab === "single" && (
          <>
            <Card>
              <SLabel right={`${filteredCourses.length}টি পাওয়া গেছে`}>একটি বই বাছাই করুন</SLabel>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {singlePageItems.map((c) => (
                  <CourseRow key={c.id} c={c} active={singleCourseId === c.id} onClick={() => setSingleCourseId(c.id)} />
                ))}

                {filteredCourses.length === 0 && (
                  <div style={{ padding: "32px 0", textAlign: "center", color: C.textGhost, fontSize: 14 }}>
                    কোনো বই পাওয়া যায়নি 😔
                  </div>
                )}
              </div>

              <Pager
                page={pageSingle}
                totalPages={totalPages}
                onPrev={() => setPageSingle((p) => Math.max(1, p - 1))}
                onNext={() => setPageSingle((p) => Math.min(totalPages, p + 1))}
                total={filteredCourses.length}
              />
            </Card>

            {singleCourse && (
              <Card>
                {/* <StyledSelect label="সাবস্ক্রিপশন বছর" value={singleYear} onChange={(e) => setSingleYear(e.target.value)}>
                  {subscriptionYears.map((y) => <option key={y} value={y}>{y}</option>)}
                </StyledSelect> */}

                <div style={{ marginTop: 14 }}>
                  <SLabel>অর্ডার সারাংশ</SLabel>
                  <SummaryTable
                    rows={[
                      { label: "বই", value: singleCourse.name, bold: true },
                      { label: "ভ্যালিডিটি", value: singleCourse.validity },
                      { label: "ক্লাস", value: classLabel(singleCourse.category) },
                      { label: "বছর", value: singleYear },
                    ]}
                    totalLabel="আপনি দেবেন"
                    totalValue={`৳ ${money(singleCourse.price)}`}
                  />
                </div>

                <div style={{ marginTop: 14 }}>
                  <PrimaryBtn full onClick={buySingle}>এখনই কিনুন →</PrimaryBtn>
                </div>
              </Card>
            )}
          </>
        )}

        {/* ══ BUNDLE ══════════════════════════════════════════════ */}
        {tab === "bundle" && (
          <>
            <DiscountBanner />

            <Card>
              <SLabel>বান্ডেলের তথ্য</SLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <input
                  value={bundleName}
                  onChange={(e) => setBundleName(e.target.value)}
                  placeholder="বান্ডেল নাম দিন (যেমন: আমার ২০২৬ কম্বো)"
                  style={{
                    width: "100%",
                    background: C.card2,
                    border: `1px solid ${C.border2}`,
                    borderRadius: 12,
                    padding: "11px 13px",
                    color: C.textMid,
                    fontSize: 13,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                {/* <StyledSelect label="বছর" value={bundleYear} onChange={(e) => setBundleYear(e.target.value)}>
                  {subscriptionYears.map((y) => <option key={y} value={y}>{y}</option>)}
                </StyledSelect> */}
              </div>
            </Card>

            <Card>
              <SLabel right={
                bundlePricing.count > 0
                  ? <span style={{ background: C.redDeep, color: C.redLight, borderRadius: 8, padding: "2px 9px", fontWeight: 800, fontSize: 11, border: `1px solid ${C.red}22` }}>
                      {bundlePricing.count}টি বাছাই
                    </span>
                  : `${filteredCourses.length}টি`
              }>
                বই নির্বাচন করুন
              </SLabel>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {bundlePageItems.map((c) => (
                  <CourseRow key={c.id} c={c} active={selected.has(c.id)} onClick={() => toggleCourse(c.id)} />
                ))}

                {filteredCourses.length === 0 && (
                  <div style={{ padding: "32px 0", textAlign: "center", color: C.textGhost, fontSize: 14 }}>
                    কোনো বই পাওয়া যায়নি 😔
                  </div>
                )}
              </div>

              <Pager
                page={pageBundle}
                totalPages={totalPages}
                onPrev={() => setPageBundle((p) => Math.max(1, p - 1))}
                onNext={() => setPageBundle((p) => Math.min(totalPages, p + 1))}
                total={filteredCourses.length}
              />
            </Card>

            {bundlePricing.count > 0 && (
              <Card>
                <SLabel>মূল্য সারাংশ</SLabel>
                <SummaryTable
                  rows={[
                    { label: "বাছাই করা বই", value: `${bundlePricing.count}টি`, bold: true },
                    { label: "মূল মূল্য", value: `৳ ${money(bundlePricing.base)}` },
                  ]}
                  accentRow={bundlePricing.discount > 0 ? {
                    label: `ডিসকাউন্ট (${Math.round(bundlePricing.rate * 100)}%)`,
                    value: `− ৳ ${money(bundlePricing.discount.toFixed(0))}`,
                  } : null}
                  totalLabel="আপনি দেবেন"
                  totalValue={`৳ ${money(bundlePricing.final.toFixed(0))}`}
                />

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <GhostBtn onClick={() => { setSelected(new Set()); setQuery(""); }}>মুছুন</GhostBtn>
                  <div style={{ flex: 1 }}>
                    <PrimaryBtn full onClick={canCreateBundle ? createBundle : undefined} disabled={!canCreateBundle}>
                      তৈরি ও কিনুন →
                    </PrimaryBtn>
                  </div>
                </div>

                {!canCreateBundle && (
                  <div style={{ marginTop: 9, textAlign: "center", fontSize: 11, color: C.textGhost }}>
                    নাম দিন + কমপক্ষে ২টি বই নির্বাচন করুন
                  </div>
                )}
              </Card>
            )}
          </>
        )}

        {/* ══ PRESET ══════════════════════════════════════════════ */}
        {tab === "preset" && (
          <>
            <div style={{ fontSize: 12, color: C.textFade, marginBottom: 12, fontWeight: 500 }}>
              রেডিমেড বান্ডেল — এক ট্যাপেই কিনুন
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {presetPageItems.map((b) => (
                <div
                  key={b.id}
                  style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}
                >
                  {b.courses[0]?.image && (
                    <div style={{ position: "relative", height: 130 }}>
                      <img
                        src={b.courses[0].image}
                        alt={b.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.card} 0%, ${C.card}80 40%, transparent 100%)` }} />
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 16px 14px" }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: C.text, lineHeight: 1.25 }}>{b.name}</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                          <span style={{ background: "#00000066", border: `1px solid #ffffff22`, borderRadius: 8, padding: "3px 9px", fontSize: 10, fontWeight: 700, color: C.textDim }}>
                            {b.courses.length}টি বই
                          </span>
                          <span style={{ background: `${C.redDeep}aa`, border: `1px solid ${C.red}33`, borderRadius: 8, padding: "3px 9px", fontSize: 10, fontWeight: 800, color: C.redLight }}>
                            {Math.round(b.rate * 100)}% ছাড়
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ padding: 16 }}>
                    <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
                      {b.courses.map((c, i) => (
                        <div
                          key={c.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px 14px",
                            borderBottom: i < b.courses.length - 1 ? `1px solid ${C.border}` : "none",
                          }}
                        >
                          <span style={{ fontSize: 12, color: C.textMid, fontWeight: 600, flex: 1, marginRight: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {c.name}
                          </span>
                          <span style={{ fontSize: 11, color: C.textFade, fontWeight: 600, flexShrink: 0 }}>
                            ৳ {money(c.price)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: 11, color: C.textGhost, textDecoration: "line-through", marginBottom: 2 }}>
                          ৳ {money(b.base)}
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 800, color: C.text, lineHeight: 1 }}>
                          ৳ {money(b.final.toFixed(0))}
                        </div>
                        {b.discount > 0 && (
                          <div style={{ fontSize: 11, color: C.greenLight, fontWeight: 700, marginTop: 3 }}>
                            ৳ {money(b.discount.toFixed(0))} সাশ্রয়
                          </div>
                        )}
                      </div>
                      <PrimaryBtn onClick={() => buyPreset(b)}>কিনুন →</PrimaryBtn>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {presetTotal > 1 && (
              <Card style={{ marginTop: 12 }}>
                <Pager
                  page={pagePreset}
                  totalPages={presetTotal}
                  onPrev={() => setPagePreset((p) => Math.max(1, p - 1))}
                  onNext={() => setPagePreset((p) => Math.min(presetTotal, p + 1))}
                  total={presetExpanded.length}
                />
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}