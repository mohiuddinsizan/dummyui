// src/pages/ChapterDetail.jsx
import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  boardAnalytics,
  relevantInfoRows,
  formulaRows,
  sampleCQ,
  sampleMCQ,
  myBooks,
} from "../data/mockData.js";

/* ─── design tokens ──────────────────────────────────────────── */
const C = {
  bg: "#08090d",
  card: "#0f1117",
  card2: "#141824",
  border: "#1b1f2d",
  border2: "#242a3b",
  text: "#f9fafb",
  textMid: "#e5e7eb",
  textDim: "#c6c9d4",
  textFade: "#9aa0ad",
  textGhost: "#5d6270",
  red: "#ef4444",
  redDark: "#2a0f14",
  redDeep: "#3b1116",
  redLight: "#fecaca",
  green: "#10b981",
  greenDark: "#064e3b",
  greenLight: "#34d399",
  greenMid: "#6ee7b7",
  sky: "#38bdf8",
  skyDark: "#0c2233",
  skyLight: "#bae6fd",
  amber: "#fbbf24",
  amberDark: "#2a1a04",
};

const CHART_COLORS = [
  "#ef4444",
  "#38bdf8",
  "#34d399",
  "#fbbf24",
  "#a78bfa",
  "#fb923c",
  "#22d3ee",
];

/* ─── helpers ───────────────────────────────────────────────── */
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function bnDigitsToNumber(x) {
  if (x == null) return null;
  const s = String(x).trim();
  if (!s) return null;
  const map = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };
  const normalized = s.replace(/[০-৯]/g, (d) => map[d] ?? d);
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function parseCQAnswer(a) {
  if (!a) return [];
  const s = String(a).trim();
  if (!s) return [];

  const re = /(^|\n)\s*(ক|খ|গ|ঘ)\s*(?:\(([0-9০-৯]+)\))?\s*[:：]\s*/g;

  const hits = [];
  let m;
  while ((m = re.exec(s)) !== null) {
    hits.push({
      index: m.index + (m[1] ? m[1].length : 0),
      key: m[2],
      marks: bnDigitsToNumber(m[3]),
      markerLen: m[0].length - (m[1] ? m[1].length : 0),
    });
  }

  if (hits.length === 0) return [];

  const out = [];
  for (let i = 0; i < hits.length; i++) {
    const cur = hits[i];
    const next = hits[i + 1];
    const start = cur.index + cur.markerLen;
    const end = next ? next.index : s.length;
    const text = s.slice(start, end).trim();
    out.push({ key: cur.key, marks: cur.marks, text });
  }
  return out;
}

function splitParagraphs(text) {
  return String(text || "")
    .split(/\n\s*\n/g)
    .map((t) => t.trim())
    .filter(Boolean);
}

/* ─── atoms ──────────────────────────────────────────────────── */
const card = (extra) => ({
  background: C.card,
  border: `1px solid ${C.border}`,
  borderRadius: 20,
  padding: 16,
  marginBottom: 12,
  ...extra,
});

const SLabel = ({ children }) => (
  <div
    style={{
      fontSize: 10,
      fontWeight: 900,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: C.textDim,
      marginBottom: 10,
    }}
  >
    {children}
  </div>
);

const PrimaryBtn = ({ children, onClick, full, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      width: full ? "100%" : "auto",
      padding: "13px 22px",
      borderRadius: 14,
      background: disabled ? C.border2 : C.red,
      color: disabled ? C.textGhost : "#fff",
      fontSize: 14,
      fontWeight: 950,
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.15s",
      boxShadow: disabled ? "none" : `0 6px 22px ${C.red}55`,
      letterSpacing: "-0.2px",
      opacity: disabled ? 0.7 : 1,
    }}
  >
    {children}
  </button>
);

const GhostBtn = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: "11px 14px",
      borderRadius: 14,
      background: C.card2,
      color: disabled ? C.textGhost : C.textDim,
      fontSize: 13,
      fontWeight: 900,
      border: `1px solid ${C.border2}`,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      minWidth: 110,
    }}
  >
    {children}
  </button>
);

const StyledSelect = ({ value, onChange, children, label }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && (
      <span
        style={{
          fontSize: 10,
          fontWeight: 900,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.textDim,
        }}
      >
        {label}
      </span>
    )}
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          background: C.card2,
          border: `1px solid ${C.border2}`,
          borderRadius: 12,
          padding: "10px 36px 10px 13px",
          color: C.text,
          fontSize: 13,
          fontWeight: 900,
          outline: "none",
          appearance: "none",
          cursor: "pointer",
        }}
      >
        {children}
      </select>
      <svg
        style={{
          position: "absolute",
          right: 11,
          top: "50%",
          transform: "translateY(-50%)",
          width: 14,
          height: 14,
          color: C.textGhost,
          pointerEvents: "none",
        }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

const SearchBox = ({ value, onChange, placeholder }) => (
  <div style={{ position: "relative" }}>
    <svg
      style={{
        position: "absolute",
        left: 13,
        top: "50%",
        transform: "translateY(-50%)",
        width: 15,
        height: 15,
        color: C.textGhost,
        pointerEvents: "none",
      }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder || "খুঁজুন…"}
      style={{
        width: "100%",
        background: C.card2,
        border: `1px solid ${C.border2}`,
        borderRadius: 12,
        padding: "10px 36px 10px 40px",
        color: C.text,
        fontSize: 13,
        outline: "none",
        boxSizing: "border-box",
        fontWeight: 800,
      }}
    />
    {value && (
      <button
        onClick={() => onChange({ target: { value: "" } })}
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          color: C.textDim,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 14,
          padding: 0,
          lineHeight: 1,
        }}
      >
        ✕
      </button>
    )}
  </div>
);

/* custom chart tooltip */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border2}`,
        borderRadius: 12,
        padding: "8px 14px",
      }}
    >
      {label && (
        <div
          style={{
            fontSize: 11,
            color: C.textDim,
            marginBottom: 4,
            fontWeight: 900,
          }}
        >
          {label}
        </div>
      )}
      {payload.map((p, i) => (
        <div
          key={i}
          style={{
            fontSize: 13,
            fontWeight: 950,
            color: p.color || C.text,
          }}
        >
          {p.name}: <span style={{ color: C.text }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

/* ─── tab definitions ─────────────────────────────────────────── */
const TABS = [
  { value: "board", label: "বোর্ড বিশ্লেষণ", icon: "📊" },
  { value: "relevant", label: "প্রাসঙ্গিক তথ্য", icon: "📋" },
  { value: "formula", label: "সূত্র", icon: "🔢" },
  { value: "cq", label: "CQ", icon: "📝" },
  { value: "mcq", label: "MCQ", icon: "✅" },
];

/* ══════════════════════════════════════════════════════════════ */
export default function ChapterDetail() {
  const { bookId, chapterId } = useParams();
  const book = Array.isArray(myBooks) ? myBooks.find((b) => b.id === bookId) : null;
  const chapters = Array.isArray(book?.chapters) ? book.chapters : [];
  const chapter = chapters.find((c) => String(c.id) === String(chapterId));

  const [tab, setTab] = useState("board");

  // ✅ All options
  const [board, setBoard] = useState("all"); // "all" | boardName
  const [year, setYear] = useState("all"); // "all" | year

  // filters
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState("tag"); // still exists, now controlled inside TagDropdown
  const [selectedTags, setSelectedTags] = useState([]); // multi-tag

  // ✅ tag dropdown UI state
  const [tagOpen, setTagOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const tagRef = useRef(null);

  // paging
  const [cqPage, setCqPage] = useState(1);
  const [mcqPage, setMcqPage] = useState(1);
  const [cqPerPage, setCqPerPage] = useState(5);
  const [mcqPerPage, setMcqPerPage] = useState(5);

  const CQ_REPEAT = 8;
  const MCQ_REPEAT = 8;

  const expandedCQ = useMemo(() => {
    const base = Array.isArray(sampleCQ) ? sampleCQ : [];
    const out = [];
    for (let r = 0; r < CQ_REPEAT; r++) {
      for (const item of base) {
        out.push({
          ...item,
          id: `${item.id ?? "cq"}-${r}-${Math.random().toString(16).slice(2, 7)}`,
          _repeat: r + 1,
        });
      }
    }
    return out;
  }, []);

  const expandedMCQ = useMemo(() => {
    const base = Array.isArray(sampleMCQ) ? sampleMCQ : [];
    const out = [];
    for (let r = 0; r < MCQ_REPEAT; r++) {
      for (const item of base) {
        out.push({
          ...item,
          id: `${item.id ?? "mcq"}-${r}-${Math.random().toString(16).slice(2, 7)}`,
          _repeat: r + 1,
        });
      }
    }
    return out;
  }, []);

  useEffect(() => {
    if (tab === "cq") setCqPage(1);
    if (tab === "mcq") setMcqPage(1);
    setQuery("");
    setSelectedTags([]);
    setTagOpen(false);
    setTagSearch("");
    setSortMode("tag");
  }, [tab]);

  // close tag dropdown on outside click
  useEffect(() => {
    const onDown = (e) => {
      if (!tagOpen) return;
      if (tagRef.current && tagRef.current.contains(e.target)) return;
      setTagOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [tagOpen]);

  // ✅ BAR: per-year questions. If board === "all" => sum all boards.
  const barData = useMemo(() => {
    const years = Array.isArray(boardAnalytics?.years) ? boardAnalytics.years : [];
    const boards = Array.isArray(boardAnalytics?.boards) ? boardAnalytics.boards : [];
    const data = boardAnalytics?.data || {};

    return years.map((y) => {
      const questions =
        board === "all"
          ? boards.reduce((sum, b) => sum + Number(data?.[b]?.[y] || 0), 0)
          : Number(data?.[board]?.[y] || 0);
      return { year: y, questions };
    });
  }, [board]);

  // ✅ PIE: board distribution. If year === "all" => sum across years.
  const pieData = useMemo(() => {
    const years = Array.isArray(boardAnalytics?.years) ? boardAnalytics.years : [];
    const boards = Array.isArray(boardAnalytics?.boards) ? boardAnalytics.boards : [];
    const data = boardAnalytics?.data || {};

    return boards.map((b) => {
      const value =
        year === "all"
          ? years.reduce((sum, y) => sum + Number(data?.[b]?.[y] || 0), 0)
          : Number(data?.[b]?.[year] || 0);
      return { name: b, value };
    });
  }, [year]);

  const boardSummary = useMemo(() => {
    const total = barData.reduce((s, x) => s + (Number(x.questions) || 0), 0);
    const avg = barData.length ? total / barData.length : 0;
    const maxItem = barData.reduce(
      (best, cur) => ((cur.questions || 0) > (best.questions || 0) ? cur : best),
      { year: "-", questions: 0 }
    );
    return { total, avg, maxItem };
  }, [barData]);

  const allCqTags = useMemo(() => {
    const tags = new Set((expandedCQ || []).map((x) => String(x.tag || "").trim()).filter(Boolean));
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }, [expandedCQ]);

  const allMcqTags = useMemo(() => {
    const tags = new Set((expandedMCQ || []).map((x) => String(x.tag || "").trim()).filter(Boolean));
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }, [expandedMCQ]);

  // multi-tag + search filter wired into cqList/mcqList
  const cqList = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...expandedCQ]
      .filter((x) => {
        const okTag = selectedTags.length === 0 ? true : selectedTags.includes(String(x.tag || ""));
        if (!okTag) return false;
        if (!q) return true;
        return (
          String(x.q || "").toLowerCase().includes(q) ||
          String(x.tag || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) =>
        sortMode === "tag"
          ? String(a.tag).localeCompare(String(b.tag))
          : String(a.q).localeCompare(String(b.q))
      );
  }, [expandedCQ, query, sortMode, selectedTags]);

  const mcqList = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...expandedMCQ]
      .filter((x) => {
        const okTag = selectedTags.length === 0 ? true : selectedTags.includes(String(x.tag || ""));
        if (!okTag) return false;
        if (!q) return true;
        return (
          String(x.q || "").toLowerCase().includes(q) ||
          String(x.tag || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) =>
        sortMode === "tag"
          ? String(a.tag).localeCompare(String(b.tag))
          : String(a.q).localeCompare(String(b.q))
      );
  }, [expandedMCQ, query, sortMode, selectedTags]);

  const cqTotalPages = Math.max(1, Math.ceil(cqList.length / cqPerPage));
  const mcqTotalPages = Math.max(1, Math.ceil(mcqList.length / mcqPerPage));

  useEffect(() => setCqPage((p) => clamp(p, 1, cqTotalPages)), [cqTotalPages]);
  useEffect(() => setMcqPage((p) => clamp(p, 1, mcqTotalPages)), [mcqTotalPages]);

  const cqPageItems = useMemo(() => {
    const start = (cqPage - 1) * cqPerPage;
    return cqList.slice(start, start + cqPerPage);
  }, [cqList, cqPage, cqPerPage]);

  const mcqPageItems = useMemo(() => {
    const start = (mcqPage - 1) * mcqPerPage;
    return mcqList.slice(start, start + mcqPerPage);
  }, [mcqList, mcqPage, mcqPerPage]);

  // ✅ Tag Dropdown component (now ALSO holds sort toggle — replaces Sort row)
  const TagDropdown = ({ tags }) => {
    const list = Array.isArray(tags) ? tags : [];
    const selectedCount = selectedTags.length;

    const filtered = useMemo(() => {
      const q = (tagSearch || "").trim().toLowerCase();
      if (!q) return list;
      return list.filter((t) => String(t).toLowerCase().includes(q));
    }, [list, tagSearch]);

    const toggle = (tag) => {
      const s = String(tag);
      setSelectedTags((prev) =>
        prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
      );
      setCqPage(1);
      setMcqPage(1);
    };

    const selectAll = () => {
      setSelectedTags([...list]);
      setCqPage(1);
      setMcqPage(1);
    };

    const clearAll = () => {
      setSelectedTags([]);
      setCqPage(1);
      setMcqPage(1);
    };

    return (
      <div ref={tagRef} style={{ position: "relative" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.textDim,
            marginBottom: 6,
          }}
        >
          TAG / SORT
        </div>

        <button
          type="button"
          onClick={() => setTagOpen((v) => !v)}
          style={{
            width: "100%",
            background: C.card2,
            border: `1px solid ${C.border2}`,
            borderRadius: 12,
            padding: "10px 36px 10px 13px", // ✅ same size as StyledSelect
            color: C.text,
            fontSize: 13,
            fontWeight: 900,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <span style={{ color: selectedCount ? C.text : C.textFade }}>
            {selectedCount === 0 ? "সব Tag" : `${selectedCount} টি Tag সিলেক্টেড`}
          </span>
          <span style={{ color: C.textGhost, fontSize: 12 }}>{tagOpen ? "▲" : "▼"}</span>
        </button>

        {tagOpen ? (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              right: 0,
              zIndex: 80,
              background: C.card,
              border: `1px solid ${C.border2}`,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 18px 50px rgba(0,0,0,0.65)",
            }}
          >
            <div style={{ padding: 10, borderBottom: `1px solid ${C.border}` }}>
              {/* ✅ sort toggle moved here (no extra row outside) */}
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <button
                  type="button"
                  onClick={() => setSortMode("tag")}
                  style={{
                    flex: 1,
                    padding: "9px 10px",
                    borderRadius: 12,
                    background: sortMode === "tag" ? `${C.red}22` : C.card2,
                    border: `1px solid ${sortMode === "tag" ? `${C.red}55` : C.border2}`,
                    color: sortMode === "tag" ? C.text : C.textDim,
                    fontWeight: 950,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Sort: Tag
                </button>
                <button
                  type="button"
                  onClick={() => setSortMode("name")}
                  style={{
                    flex: 1,
                    padding: "9px 10px",
                    borderRadius: 12,
                    background: sortMode === "name" ? `${C.red}22` : C.card2,
                    border: `1px solid ${sortMode === "name" ? `${C.red}55` : C.border2}`,
                    color: sortMode === "name" ? C.text : C.textDim,
                    fontWeight: 950,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Sort: প্রশ্ন
                </button>
              </div>

              <input
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
                placeholder="Tag খুঁজুন…"
                style={{
                  width: "100%",
                  background: C.card2,
                  border: `1px solid ${C.border2}`,
                  borderRadius: 12,
                  padding: "10px 12px",
                  color: C.text,
                  fontSize: 13,
                  outline: "none",
                  fontWeight: 800,
                  boxSizing: "border-box",
                }}
              />

              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  type="button"
                  onClick={selectAll}
                  style={{
                    flex: 1,
                    padding: "9px 10px",
                    borderRadius: 12,
                    background: C.card2,
                    border: `1px solid ${C.border2}`,
                    color: C.textDim,
                    fontWeight: 950,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  style={{
                    flex: 1,
                    padding: "9px 10px",
                    borderRadius: 12,
                    background: C.redDark,
                    border: `1px solid ${C.red}33`,
                    color: C.redLight,
                    fontWeight: 950,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Clear
                </button>
              </div>
            </div>

            <div style={{ maxHeight: 260, overflow: "auto", padding: 10 }}>
              {filtered.length === 0 ? (
                <div style={{ padding: 10, color: C.textFade, fontWeight: 800, fontSize: 12 }}>
                  কোনো Tag মেলেনি।
                </div>
              ) : (
                filtered.map((t) => {
                  const active = selectedTags.includes(String(t));
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggle(t)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 10px",
                        borderRadius: 12,
                        background: active ? `${C.red}18` : "transparent",
                        border: `1px solid ${active ? `${C.red}44` : "transparent"}`,
                        cursor: "pointer",
                        textAlign: "left",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 6,
                          border: `1px solid ${active ? `${C.red}99` : C.border2}`,
                          background: active ? C.red : C.card2,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: active ? "#fff" : C.textGhost,
                          fontSize: 12,
                          fontWeight: 1000,
                          flexShrink: 0,
                        }}
                      >
                        {active ? "✓" : ""}
                      </span>
                      <span
                        style={{
                          color: active ? C.text : C.textDim,
                          fontSize: 13,
                          fontWeight: 900,
                        }}
                      >
                        {t}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            <div style={{ padding: 10, borderTop: `1px solid ${C.border}` }}>
              <PrimaryBtn full onClick={() => setTagOpen(false)}>
                Done
              </PrimaryBtn>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  if (!book || !chapter) {
    return (
      <div style={card()}>
        <div style={{ fontSize: 15, fontWeight: 950, color: C.text }}>Chapter not found.</div>
        <div style={{ marginTop: 14 }}>
          <Link to={`/my-courses/${encodeURIComponent(String(bookId))}`}>
            <PrimaryBtn full>← বইয়ে ফিরুন</PrimaryBtn>
          </Link>
        </div>
      </div>
    );
  }

  const Pager = ({ mode }) => {
    const isCQ = mode === "cq";
    const page = isCQ ? cqPage : mcqPage;
    const total = isCQ ? cqTotalPages : mcqTotalPages;

    return (
      <div
        style={{
          position: "sticky",
          bottom: 12,
          zIndex: 20,
          marginTop: 14,
          background: `linear-gradient(180deg, ${C.card}CC 0%, ${C.card} 55%, ${C.card} 100%)`,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          padding: 12,
          boxShadow: "0 14px 40px rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <GhostBtn
            disabled={page <= 1}
            onClick={() =>
              isCQ ? setCqPage((p) => Math.max(1, p - 1)) : setMcqPage((p) => Math.max(1, p - 1))
            }
          >
            ← Prev
          </GhostBtn>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, color: C.textDim, fontWeight: 1000 }}>
              Page <span style={{ color: C.text }}>{page}</span> /{" "}
              <span style={{ color: C.text }}>{total}</span>
            </div>
          </div>

          <GhostBtn
            disabled={page >= total}
            onClick={() =>
              isCQ
                ? setCqPage((p) => Math.min(cqTotalPages, p + 1))
                : setMcqPage((p) => Math.min(mcqTotalPages, p + 1))
            }
          >
            Next →
          </GhostBtn>
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", paddingBottom: 80 }}>
      {/* ── HEADER ── */}
      <div
        style={{
          background: `linear-gradient(180deg, ${C.card} 0%, ${C.bg} 100%)`,
          borderBottom: `1px solid ${C.border}`,
          padding: "20px 16px 0",
        }}
      >
        <div style={{ fontSize: 11, color: C.textDim, fontWeight: 950, marginBottom: 4 }}>
          {book.title}
        </div>
        <div style={{ fontSize: 22, fontWeight: 1000, color: C.text, letterSpacing: "-0.4px", lineHeight: 1.2 }}>
          {chapter.title}
        </div>

        {/* tabs */}
        <div style={{ marginTop: 14, paddingBottom: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
            {TABS.filter((t) => t.value !== "cq" && t.value !== "mcq").map((t) => {
              const active = tab === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => setTab(t.value)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 7,
                    padding: "11px 10px",
                    borderRadius: 16,
                    background: active ? `linear-gradient(180deg, ${C.red} 0%, ${C.redDeep} 100%)` : C.card2,
                    border: `1px solid ${active ? C.red : C.border2}`,
                    color: active ? "#fff" : C.textDim,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 1000,
                    boxShadow: active ? `0 8px 22px ${C.red}44` : `0 6px 18px #00000044`,
                    minHeight: 52,
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{t.icon}</span>
                  <span
                    style={{
                      minWidth: 0,
                      lineHeight: 1.15,
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      wordBreak: "break-word",
                    }}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {TABS.filter((t) => t.value === "cq" || t.value === "mcq").map((t) => {
              const active = tab === t.value;
              const glam =
                t.value === "cq"
                  ? { glow: C.sky, bg1: C.skyDark, border: `${C.sky}66`, text: C.skyLight }
                  : { glow: C.green, bg1: C.greenDark, border: `${C.green}66`, text: C.greenMid };

              return (
                <button
                  key={t.value}
                  onClick={() => setTab(t.value)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    padding: "12px 12px",
                    borderRadius: 18,
                    background: active ? `linear-gradient(180deg, ${C.card2} 0%, ${glam.bg1} 100%)` : C.card2,
                    border: `1px solid ${active ? glam.border : C.border2}`,
                    color: active ? C.text : C.textDim,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 1100,
                    boxShadow: active ? `0 12px 30px ${glam.glow}33` : `0 6px 18px #00000044`,
                    letterSpacing: "-0.25px",
                  }}
                >
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: active ? `${glam.glow}22` : C.border,
                      border: `1px solid ${active ? `${glam.glow}66` : C.border2}`,
                      color: active ? glam.text : C.textDim,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {t.icon}
                  </span>
                  <span style={{ whiteSpace: "nowrap" }}>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: "16px 14px 0" }}>
        {/* BOARD */}
        {tab === "board" && (
          <div style={card()}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 16, fontWeight: 1100, color: C.text }}>
                বোর্ড বিশ্লেষণ (এই অধ্যায়ের প্রশ্ন ট্রেন্ড)
              </div>
            </div>

            {/* selectors */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <StyledSelect label="বোর্ড (Bar চার্ট)" value={board} onChange={(e) => setBoard(e.target.value)}>
                <option value="all">সব বোর্ড</option>
                {boardAnalytics.boards.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </StyledSelect>

              <StyledSelect label="বছর (Pie চার্ট)" value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="all">সব বছর</option>
                {boardAnalytics.years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </StyledSelect>
            </div>

            {/* summary strip */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 16, padding: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 1000, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textDim }}>
                  মোট প্রশ্ন
                </div>
                <div style={{ marginTop: 6, fontSize: 18, fontWeight: 1100, color: C.text }}>
                  {Math.round(boardSummary.total)}
                </div>
                <div style={{ marginTop: 3, fontSize: 11, color: C.textFade, fontWeight: 800 }}>
                  {board === "all" ? "সব বোর্ড (সব বছর)" : `${board} (সব বছর)`}
                </div>
              </div>

              <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 16, padding: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 1000, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textDim }}>
                  গড় / বছর
                </div>
                <div style={{ marginTop: 6, fontSize: 18, fontWeight: 1100, color: C.text }}>
                  {boardSummary.avg.toFixed(1)}
                </div>
                <div style={{ marginTop: 3, fontSize: 11, color: C.textFade, fontWeight: 800 }}>
                  Bar চার্টের ডেটা থেকে
                </div>
              </div>

              <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 16, padding: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 1000, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textDim }}>
                  সর্বোচ্চ বছর
                </div>
                <div style={{ marginTop: 6, fontSize: 18, fontWeight: 1100, color: C.text }}>
                  {boardSummary.maxItem.questions}
                </div>
                <div style={{ marginTop: 3, fontSize: 11, color: C.textFade, fontWeight: 800 }}>
                  বছর: {boardSummary.maxItem.year}
                </div>
              </div>
            </div>

            {/* bar */}
            <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 16, padding: "14px 12px 10px", marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 950, color: C.textDim, marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                বছর অনুযায়ী প্রশ্ন — {board === "all" ? "সব বোর্ড" : board}
              </div>
              <div style={{ fontSize: 12, color: C.textFade, marginBottom: 10, fontWeight: 800 }}>
                {board === "all" ? "সব বোর্ড মিলিয়ে প্রতি বছরে মোট প্রশ্ন" : "নির্বাচিত বোর্ডে প্রতি বছরে প্রশ্ন সংখ্যা"}
              </div>

              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                    <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: C.textDim, fontSize: 10 }} axisLine={{ stroke: C.border2 }} tickLine={false} />
                    <YAxis tick={{ fill: C.textDim, fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: `${C.red}18` }} />
                    <Bar dataKey="questions" name="Questions" fill={C.red} radius={[6, 6, 0, 0]} maxBarSize={42} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* pie */}
            <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 16, padding: "14px 12px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 950, color: C.textDim, marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                বোর্ড অনুপাত — {year === "all" ? "সব বছর" : year}
              </div>
              <div style={{ fontSize: 12, color: C.textFade, marginBottom: 10, fontWeight: 800 }}>
                {year === "all" ? "সব বছর মিলিয়ে কোন বোর্ডে কত প্রশ্ন এসেছে" : "নির্বাচিত বছরে কোন বোর্ডে কত প্রশ্ন এসেছে"}
              </div>

              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<ChartTooltip />} />
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={86}
                      innerRadius={38}
                      stroke={C.card2}
                      strokeWidth={3}
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* RELEVANT */}
        {tab === "relevant" && (
          <div style={card()}>
            <SLabel>প্রাসঙ্গিক তথ্য</SLabel>
            <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
              {relevantInfoRows.map((r, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "13px 16px",
                    borderBottom: idx < relevantInfoRows.length - 1 ? `1px solid ${C.border}` : "none",
                  }}
                >
                  <div style={{ width: "36%", flexShrink: 0, fontSize: 12, fontWeight: 950, color: C.text, lineHeight: 1.5 }}>
                    {r.name}
                  </div>
                  <div style={{ flex: 1, fontSize: 12, color: C.textDim, lineHeight: 1.75, fontWeight: 700 }}>
                    {r.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FORMULA */}
        {tab === "formula" && (
          <div style={card()}>
            <SLabel>সূত্রাবলি</SLabel>
            <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "46% 54%", padding: "11px 14px", background: C.card, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, fontWeight: 1000, letterSpacing: "0.16em", textTransform: "uppercase", color: C.textDim }}>সূত্র/নাম</div>
                <div style={{ fontSize: 10, fontWeight: 1000, letterSpacing: "0.16em", textTransform: "uppercase", color: C.textDim }}>ব্যাখ্যা</div>
              </div>

              {formulaRows.map((r, idx) => (
                <div key={idx} style={{ display: "grid", gridTemplateColumns: "46% 54%", padding: "12px 14px", borderBottom: idx < formulaRows.length - 1 ? `1px solid ${C.border}` : "none", alignItems: "start" }}>
                  <div style={{ paddingRight: 12 }}>
                    <div style={{ background: C.skyDark + "66", border: `1px solid ${C.sky}44`, borderRadius: 12, padding: "10px 10px" }}>
                      <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace", fontSize: 13, fontWeight: 1000, color: C.skyLight, whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.65 }}>
                        {r.name}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.75, wordBreak: "break-word", fontWeight: 750 }}>
                    {r.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CQ / MCQ */}
        {(tab === "cq" || tab === "mcq") && (
          <>
            {/* ── FILTER BAR ── */}
            <div style={card()}>
              {/* ✅ Row 1: Tag+Sort (dropdown) + Per Page  (no extra row anymore) */}
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  {(tab === "cq" ? allCqTags : allMcqTags).length > 0 ? (
                    <TagDropdown tags={tab === "cq" ? allCqTags : allMcqTags} />
                  ) : (
                    <div style={{ height: 58 }} />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <StyledSelect
                    label="Per Page"
                    value={tab === "cq" ? cqPerPage : mcqPerPage}
                    onChange={(e) => {
                      const n = Number(e.target.value) || 5;
                      if (tab === "cq") {
                        setCqPerPage(n);
                        setCqPage(1);
                      } else {
                        setMcqPerPage(n);
                        setMcqPage(1);
                      }
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </StyledSelect>
                </div>
              </div>

              {/* Row 2: Search */}
              <div style={{ marginTop: 10 }}>
                <SearchBox
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCqPage(1);
                    setMcqPage(1);
                  }}
                  placeholder="প্রশ্ন/কীওয়ার্ড দিয়ে খুঁজুন…"
                />
              </div>
            </div>

            {/* ── QUESTION LIST ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(tab === "cq" ? cqPageItems : mcqPageItems).map((item, idx) => {
                const globalIndex =
                  tab === "cq"
                    ? (cqPage - 1) * cqPerPage + idx
                    : (mcqPage - 1) * mcqPerPage + idx;

                return (
                  <div key={item.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${C.border}`, background: C.card2 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ background: C.redDark, border: `1px solid ${C.red}33`, borderRadius: 8, padding: "3px 10px", fontSize: 10, fontWeight: 1000, color: C.redLight }}>
                          #{globalIndex + 1}
                        </span>
                        <span style={{ background: C.skyDark, border: `1px solid ${C.sky}33`, borderRadius: 8, padding: "3px 10px", fontSize: 10, fontWeight: 1000, color: C.skyLight }}>
                          {item.tag}
                        </span>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 1000, color: C.textGhost }}>{tab.toUpperCase()}</span>
                    </div>

                    <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                      {/* CQ */}
                      {tab === "cq" && (
                        <>
                          <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 14, padding: "13px 16px" }}>
                            <div style={{ fontSize: 10, fontWeight: 1000, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textDim, marginBottom: 7 }}>
                              উদ্দীপক
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 900, color: C.text, lineHeight: 1.7 }}>
                              {item.q}
                            </div>
                          </div>

                          <div style={{ background: C.skyDark + "66", border: `1px solid ${C.sky}22`, borderRadius: 14, padding: "13px 16px" }}>
                            <div style={{ fontSize: 10, fontWeight: 1000, letterSpacing: "0.14em", textTransform: "uppercase", color: C.skyLight, marginBottom: 8 }}>
                              প্রশ্নাবলী
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                              {(item.parts || []).map((p, i) => (
                                <div key={p.key ?? i} style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
                                  <div style={{ fontSize: 10, fontWeight: 1000, color: C.textDim, marginBottom: 6, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                                    অংশ {p.key || ["ক", "খ", "গ", "ঘ"][i]}
                                  </div>
                                  <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.7, fontWeight: 750 }}>
                                    {p.q}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div style={{ background: C.greenDark + "55", border: `1px solid ${C.green}22`, borderRadius: 14, padding: "13px 16px" }}>
                            <div style={{ fontSize: 10, fontWeight: 1000, letterSpacing: "0.14em", textTransform: "uppercase", color: C.greenMid, marginBottom: 8 }}>
                              উত্তর
                            </div>

                            {(() => {
                              const parsed = parseCQAnswer(item.a);
                              const byKey = new Map(parsed.map((x) => [x.key, x]));
                              const marksDefault = { ক: 1, খ: 2, গ: 3, ঘ: 4 };
                              const keys = ["ক", "খ", "গ", "ঘ"];

                              return (
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                  {keys.map((k) => {
                                    const hit = byKey.get(k);
                                    const marks = hit?.marks ?? marksDefault[k];
                                    const text = hit?.text ?? "";

                                    return (
                                      <div key={k} style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
                                        <div style={{ fontSize: 10, fontWeight: 1000, color: C.greenMid, marginBottom: 8, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                                          {k} ({bnDigitsToNumber(marks) ?? marks})
                                        </div>

                                        {text ? (
                                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                            {splitParagraphs(text).map((p, i) => (
                                              <div
                                                key={i}
                                                style={{
                                                  color: C.textMid,
                                                  fontSize: 13,
                                                  lineHeight: 1.75,
                                                  fontWeight: 750,
                                                  whiteSpace: "pre-wrap",
                                                  wordBreak: "break-word",
                                                }}
                                              >
                                                {p}
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <div style={{ fontSize: 12, color: C.textGhost, fontWeight: 800 }}>
                                            উত্তর যোগ করা হয়নি।
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })()}
                          </div>
                        </>
                      )}

                      {/* MCQ */}
                      {tab === "mcq" && (
                        <>
                          <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 14, padding: "13px 16px" }}>
                            <div style={{ fontSize: 10, fontWeight: 1000, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textDim, marginBottom: 7 }}>
                              প্রশ্ন
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 900, color: C.text, lineHeight: 1.65 }}>
                              {item.q}
                            </div>
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                            {(item.options || []).map((opt, i) => {
                              const correct = i === item.answer;
                              return (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: correct ? C.greenDark + "55" : C.card2, border: `1px solid ${correct ? C.green + "44" : C.border}`, borderRadius: 12, padding: "10px 14px" }}>
                                  <div style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: correct ? C.green + "33" : C.border, fontSize: 11, fontWeight: 1000, color: correct ? C.greenLight : C.textDim }}>
                                    {String.fromCharCode(65 + i)}
                                  </div>
                                  <span style={{ fontSize: 13, color: correct ? C.textMid : C.textDim, lineHeight: 1.6, flex: 1, fontWeight: 800 }}>
                                    {opt}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          <div style={{ background: C.amberDark + "88", border: `1px solid ${C.amber}22`, borderRadius: 14, padding: "13px 16px" }}>
                            <div style={{ fontSize: 10, fontWeight: 1000, letterSpacing: "0.14em", textTransform: "uppercase", color: C.amber, marginBottom: 7 }}>
                              ব্যাখ্যা
                            </div>
                            <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.75, fontWeight: 750 }}>
                              {item.explain || "ব্যাখ্যা যোগ করা হয়নি।"}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

              <Pager mode={tab} />
            </div>
          </>
        )}

        {/* TAKE TEST */}
        <div style={{ ...card(), marginTop: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 1000, color: C.text, marginBottom: 4 }}>পরীক্ষা দিন</div>
          <div style={{ fontSize: 12, color: C.textDim, marginBottom: 14, lineHeight: 1.75, fontWeight: 750 }}>
            এই অধ্যায়ের উপর একটি পূর্ণাঙ্গ টেস্ট দিতে নিচের বাটনে চাপুন।
          </div>
          <Link to={`/test/setup?book=${book.id}&chapter=${chapter.id}`}>
            <PrimaryBtn full>এই অধ্যায় থেকে টেস্ট দিন →</PrimaryBtn>
          </Link>
        </div>
      </div>
    </div>
  );
}