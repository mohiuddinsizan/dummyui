// src/pages/ChapterDetail.jsx
import { useMemo, useState, useEffect } from "react";
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

function normalizeLines(x) {
  if (!x) return [];
  if (Array.isArray(x)) return x.map(String).filter(Boolean);

  const s = String(x).trim();
  if (!s) return [];

  if (s.includes("\n")) {
    return s
      .split(/\n+/)
      .map((t) => t.trim())
      .filter(Boolean);
  }
  if (s.includes("•")) return s.split("•").map((t) => t.trim()).filter(Boolean);
  if (s.includes("|")) return s.split("|").map((t) => t.trim()).filter(Boolean);
  if (s.includes(";")) return s.split(";").map((t) => t.trim()).filter(Boolean);

  return [s];
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

const TagPill = ({ children, active = false }) => (
  <span
    style={{
      background: active ? C.redDark : C.border,
      border: `1px solid ${active ? `${C.red}55` : C.border2}`,
      borderRadius: 999,
      padding: "5px 10px",
      fontSize: 11,
      fontWeight: 900,
      color: active ? C.redLight : C.textDim,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      boxShadow: active ? `0 10px 26px ${C.red}22` : "none",
      userSelect: "none",
    }}
  >
    {children}
  </span>
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
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
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
        <div style={{ fontSize: 11, color: C.textDim, marginBottom: 4, fontWeight: 900 }}>
          {label}
        </div>
      )}
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: 13, fontWeight: 950, color: p.color || C.text }}>
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

// hard-coded tags (UI only)
const HARD_TAGS = ["গতি", "ঘর্ষণ", "তাপ", "আলোক", "বিদ্যুৎ", "চাপ"];

/* ══════════════════════════════════════════════════════════════ */
export default function ChapterDetail() {
  const { bookId, chapterId } = useParams();
  const book = Array.isArray(myBooks) ? myBooks.find((b) => b.id === bookId) : null;
  const chapters = Array.isArray(book?.chapters) ? book.chapters : [];
  const chapter = chapters.find((c) => String(c.id) === String(chapterId));

  const [tab, setTab] = useState("board");

  const [board, setBoard] = useState(boardAnalytics.boards[0]);
  const [year, setYear] = useState(boardAnalytics.years[boardAnalytics.years.length - 1]);

  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState("tag");

  // paging (separate)
  const [cqPage, setCqPage] = useState(1);
  const [mcqPage, setMcqPage] = useState(1);
  const [cqPerPage, setCqPerPage] = useState(3);
  const [mcqPerPage, setMcqPerPage] = useState(3);

  // ✅ ensure multiple pages exist by repeating mock data
  const CQ_REPEAT = 8;  // enough to create 2+ pages even with perPage=10 in most cases
  const MCQ_REPEAT = 8;

  const expandedCQ = useMemo(() => {
    const base = Array.isArray(sampleCQ) ? sampleCQ : [];
    const out = [];
    for (let r = 0; r < CQ_REPEAT; r++) {
      for (const item of base) {
        out.push({
          ...item,
          id: `${item.id ?? "cq"}-${r}-${Math.random().toString(16).slice(2, 7)}`, // unique
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
          id: `${item.id ?? "mcq"}-${r}-${Math.random().toString(16).slice(2, 7)}`, // unique
          _repeat: r + 1,
        });
      }
    }
    return out;
  }, []);

  // reset paging on tab change
  useEffect(() => {
    if (tab === "cq") setCqPage(1);
    if (tab === "mcq") setMcqPage(1);
  }, [tab]);

  const barData = useMemo(
    () => boardAnalytics.years.map((y) => ({ year: y, questions: boardAnalytics.data[board][y] })),
    [board]
  );

  const pieData = useMemo(
    () => boardAnalytics.boards.map((b) => ({ name: b, value: boardAnalytics.data[b][year] })),
    [year]
  );

  const cqList = useMemo(() => {
    const q = query.toLowerCase();
    return [...expandedCQ]
      .filter((x) => x.q.toLowerCase().includes(q) || x.tag.toLowerCase().includes(q))
      .sort((a, b) => (sortMode === "tag" ? a.tag.localeCompare(b.tag) : a.q.localeCompare(b.q)));
  }, [expandedCQ, query, sortMode]);

  const mcqList = useMemo(() => {
    const q = query.toLowerCase();
    return [...expandedMCQ]
      .filter((x) => x.q.toLowerCase().includes(q) || x.tag.toLowerCase().includes(q))
      .sort((a, b) => (sortMode === "tag" ? a.tag.localeCompare(b.tag) : a.q.localeCompare(b.q)));
  }, [expandedMCQ, query, sortMode]);

  // totals
  const cqTotalPages = Math.max(1, Math.ceil(cqList.length / cqPerPage));
  const mcqTotalPages = Math.max(1, Math.ceil(mcqList.length / mcqPerPage));

  // clamp page when totals change
  useEffect(() => {
    setCqPage((p) => clamp(p, 1, cqTotalPages));
  }, [cqTotalPages]);

  useEffect(() => {
    setMcqPage((p) => clamp(p, 1, mcqTotalPages));
  }, [mcqTotalPages]);

  const cqPageItems = useMemo(() => {
    const start = (cqPage - 1) * cqPerPage;
    return cqList.slice(start, start + cqPerPage);
  }, [cqList, cqPage, cqPerPage]);

  const mcqPageItems = useMemo(() => {
    const start = (mcqPage - 1) * mcqPerPage;
    return mcqList.slice(start, start + mcqPerPage);
  }, [mcqList, mcqPage, mcqPerPage]);

  /* ── not found ── */
  if (!book || !chapter) {
    return (
      <div style={card()}>
        <div style={{ fontSize: 15, fontWeight: 950, color: C.text }}>Chapter not found.</div>
        <div style={{ marginTop: 8, fontSize: 12, color: C.textDim, fontWeight: 800 }}>
          bookId: <span style={{ color: C.text }}>{String(bookId)}</span>
          &nbsp;·&nbsp;
          chapterId: <span style={{ color: C.text }}>{String(chapterId)}</span>
        </div>
        <div style={{ marginTop: 14 }}>
          <Link to={`/my-courses/${encodeURIComponent(String(bookId))}`}>
            <PrimaryBtn full>← বইয়ে ফিরুন</PrimaryBtn>
          </Link>
        </div>
      </div>
    );
  }

  // pager control (sticky bottom inside CQ/MCQ view)
  const Pager = ({ mode }) => {
    const isCQ = mode === "cq";
    const page = isCQ ? cqPage : mcqPage;
    const total = isCQ ? cqTotalPages : mcqTotalPages;
    const totalItems = isCQ ? cqList.length : mcqList.length;
    const shown = isCQ ? cqPageItems.length : mcqPageItems.length;

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
            onClick={() => {
              if (isCQ) setCqPage((p) => Math.max(1, p - 1));
              else setMcqPage((p) => Math.max(1, p - 1));
            }}
          >
            ← Prev
          </GhostBtn>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, color: C.textDim, fontWeight: 1000 }}>
              Page <span style={{ color: C.text }}>{page}</span> /{" "}
              <span style={{ color: C.text }}>{total}</span>
            </div>
            <div style={{ fontSize: 10, color: C.textGhost, fontWeight: 900, marginTop: 2 }}>
              Showing {shown} / {totalItems}
            </div>
          </div>

          <GhostBtn
            disabled={page >= total}
            onClick={() => {
              if (isCQ) setCqPage((p) => Math.min(cqTotalPages, p + 1));
              else setMcqPage((p) => Math.min(mcqTotalPages, p + 1));
            }}
          >
            Next →
          </GhostBtn>
        </div>
      </div>
    );
  };

  /* ══════════════════════ RENDER ════════════════════════════ */
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

        {/* tabs (2 lines: line1=board/relevant/formula, line2=cq/mcq) */}
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
                    background: active
                      ? `linear-gradient(180deg, ${C.red} 0%, ${C.redDeep} 100%)`
                      : C.card2,
                    border: `1px solid ${active ? C.red : C.border2}`,
                    color: active ? "#fff" : C.textDim,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 1000,
                    boxShadow: active ? `0 8px 22px ${C.red}44` : `0 6px 18px #00000044`,
                    letterSpacing: "-0.2px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{t.icon}</span>
                  <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>{t.label}</span>
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
                    background: active
                      ? `linear-gradient(180deg, ${C.card2} 0%, ${glam.bg1} 100%)`
                      : C.card2,
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
        {/* ══ BOARD ANALYSIS ════════════════════════════════════ */}
        {tab === "board" && (
          <div style={card()}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 1000, color: C.text }}>বোর্ড বিশ্লেষণ</div>
              <div style={{ fontSize: 11, color: C.textFade, marginTop: 3, fontWeight: 800 }}>
                বোর্ড বা বছর বেছে নিন, চার্ট আপডেট হবে
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <StyledSelect label="বোর্ড" value={board} onChange={(e) => setBoard(e.target.value)}>
                {boardAnalytics.boards.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </StyledSelect>
              <StyledSelect label="বছর" value={year} onChange={(e) => setYear(e.target.value)}>
                {boardAnalytics.years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </StyledSelect>
            </div>

            <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 16, padding: "14px 12px 10px", marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 950, color: C.textDim, marginBottom: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                বছর অনুযায়ী প্রশ্ন — {board}
              </div>
              <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                    <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: C.textDim, fontSize: 10 }} axisLine={{ stroke: C.border2 }} tickLine={false} />
                    <YAxis tick={{ fill: C.textDim, fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: `${C.red}18` }} />
                    <Bar dataKey="questions" fill={C.red} radius={[6, 6, 0, 0]} maxBarSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 16, padding: "14px 12px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 950, color: C.textDim, marginBottom: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                বোর্ড অনুপাত — {year}
              </div>
              <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<ChartTooltip />} />
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={82} innerRadius={36} stroke={C.card2} strokeWidth={3}>
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", marginTop: 12 }}>
                {pieData.map((entry, i) => (
                  <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.textDim, fontWeight: 800 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: CHART_COLORS[i % CHART_COLORS.length], flexShrink: 0, display: "inline-block" }} />
                    <span>{entry.name}</span>
                    <span style={{ color: C.text, fontWeight: 950 }}>{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ RELEVANT INFO ══════════════════════════════════════ */}
        {tab === "relevant" && (
          <div style={card()}>
            <SLabel>প্রাসঙ্গিক তথ্য</SLabel>
            <div style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
              {relevantInfoRows.map((r, idx) => (
                <div key={idx} style={{ display: "flex", gap: 12, padding: "13px 16px", borderBottom: idx < relevantInfoRows.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ width: "36%", flexShrink: 0, fontSize: 12, fontWeight: 950, color: C.text, lineHeight: 1.5 }}>{r.name}</div>
                  <div style={{ flex: 1, fontSize: 12, color: C.textDim, lineHeight: 1.75, fontWeight: 700 }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ FORMULA (long formulas fully visible) ═══════════════ */}
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
                    <div
                      style={{
                        background: C.skyDark + "66",
                        border: `1px solid ${C.sky}44`,
                        borderRadius: 12,
                        padding: "10px 10px",
                        boxShadow: `0 10px 26px ${C.sky}12`,
                        overflowX: "auto",
                        overflowY: "hidden",
                      }}
                      title={r.name}
                    >
                      <div
                        style={{
                          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                          fontSize: 13,
                          fontWeight: 1000,
                          color: C.skyLight,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          lineHeight: 1.65,
                        }}
                      >
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

        {/* ══ CQ / MCQ ══════════════════════════════════════════ */}
        {(tab === "cq" || tab === "mcq") && (
          <>
            {/* toolbar */}
            <div style={card()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 1000, color: C.text }}>{tab === "cq" ? "CQ ব্যাংক" : "MCQ ব্যাংক"}</div>
                  <div style={{ fontSize: 11, color: C.textFade, marginTop: 2, fontWeight: 800 }}>
                    {tab === "cq" ? cqList.length : mcqList.length}টি প্রশ্ন
                    <span style={{ margin: "0 8px", color: C.textGhost }}>•</span>
                    Page {tab === "cq" ? cqPage : mcqPage} / {tab === "cq" ? cqTotalPages : mcqTotalPages}
                  </div>
                </div>

                <div style={{ width: 180, flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  <StyledSelect value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
                    <option value="tag">Tag অনুযায়ী</option>
                    <option value="name">নাম অনুযায়ী</option>
                  </StyledSelect>

                  <StyledSelect
                    label="প্রতি পেজ"
                    value={tab === "cq" ? cqPerPage : mcqPerPage}
                    onChange={(e) => {
                      const n = Number(e.target.value) || 3;
                      if (tab === "cq") {
                        setCqPerPage(n);
                        setCqPage(1);
                      } else {
                        setMcqPerPage(n);
                        setMcqPage(1);
                      }
                    }}
                  >
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                  </StyledSelect>
                </div>
              </div>

              <SearchBox
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCqPage(1);
                  setMcqPage(1);
                }}
                placeholder="প্রশ্ন বা ট্যাগ দিয়ে খুঁজুন…"
              />

              {/* hard-coded tags (UI only) */}
              <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {HARD_TAGS.map((t, i) => (
                  <TagPill key={i}>{t}</TagPill>
                ))}
                <TagPill active>Hard Tag</TagPill>
              </div>

              <div style={{ marginTop: 10, fontSize: 10, color: C.textGhost, fontWeight: 900 }}>
                (ডেমো) CQ/MCQ গুলো repeat করা হয়েছে যাতে Prev/Next কাজ দেখা যায়।
              </div>
            </div>

            {/* list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(tab === "cq" ? cqPageItems : mcqPageItems).map((item, idx) => {
                const globalIndex =
                  tab === "cq"
                    ? (cqPage - 1) * cqPerPage + idx
                    : (mcqPage - 1) * mcqPerPage + idx;

                return (
                  <div key={item.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
                    {/* header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${C.border}`, background: C.card2 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ background: C.redDark, border: `1px solid ${C.red}33`, borderRadius: 8, padding: "3px 10px", fontSize: 10, fontWeight: 1000, color: C.redLight }}>
                          #{globalIndex + 1}
                        </span>
                        <span style={{ background: C.skyDark, border: `1px solid ${C.sky}33`, borderRadius: 8, padding: "3px 10px", fontSize: 10, fontWeight: 1000, color: C.skyLight }}>
                          {item.tag}
                        </span>
                        {/* show repeat count (to make it obvious paging has many items) */}
                        <span style={{ fontSize: 10, fontWeight: 900, color: C.textGhost }}>
                          x{item._repeat ?? 1}
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

                            {/* ✅ separated parts (no congestion) */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                              {(item.parts || []).map((p, i) => (
                                <div
                                  key={p.key ?? i}
                                  style={{
                                    background: C.card2,
                                    border: `1px solid ${C.border}`,
                                    borderRadius: 12,
                                    padding: "12px 14px",
                                  }}
                                >
                                  <div style={{ fontSize: 10, fontWeight: 1000, color: C.textDim, marginBottom: 6, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                                    অংশ {p.key || ["ক", "খ", "গ", "ঘ"][i]}
                                  </div>
                                  <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.7, fontWeight: 750 }}>
                                    {p.q}
                                  </div>
                                </div>
                              ))}

                              {(!item.parts || item.parts.length === 0) && (
                                <div style={{ fontSize: 11, color: C.textGhost, fontWeight: 800 }}>কোনো অংশ নেই।</div>
                              )}
                            </div>
                          </div>

                          {/* ANSWER (separated lines) */}
                          <div style={{ background: C.greenDark + "55", border: `1px solid ${C.green}22`, borderRadius: 14, padding: "13px 16px" }}>
                            <div style={{ fontSize: 10, fontWeight: 1000, letterSpacing: "0.14em", textTransform: "uppercase", color: C.greenMid, marginBottom: 8 }}>
                              উত্তর
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                              {normalizeLines(item.a).map((line, i) => (
                                <div
                                  key={i}
                                  style={{
                                    background: C.card2,
                                    border: `1px solid ${C.border}`,
                                    borderRadius: 12,
                                    padding: "10px 12px",
                                    color: C.textMid,
                                    fontSize: 13,
                                    lineHeight: 1.75,
                                    fontWeight: 750,
                                  }}
                                >
                                  <span style={{ fontWeight: 1000, color: C.greenMid, marginRight: 8 }}>
                                    {i + 1}.
                                  </span>
                                  {line}
                                </div>
                              ))}

                              {normalizeLines(item.a).length === 0 && (
                                <div style={{ fontSize: 12, color: C.textGhost, fontWeight: 800 }}>উত্তর যোগ করা হয়নি।</div>
                              )}
                            </div>
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
                                <div
                                  key={i}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    background: correct ? C.greenDark + "55" : C.card2,
                                    border: `1px solid ${correct ? C.green + "44" : C.border}`,
                                    borderRadius: 12,
                                    padding: "10px 14px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 28,
                                      height: 28,
                                      borderRadius: 8,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      flexShrink: 0,
                                      background: correct ? C.green + "33" : C.border,
                                      fontSize: 11,
                                      fontWeight: 1000,
                                      color: correct ? C.greenLight : C.textDim,
                                    }}
                                  >
                                    {String.fromCharCode(65 + i)}
                                  </div>
                                  <span style={{ fontSize: 13, color: correct ? C.textMid : C.textDim, lineHeight: 1.6, flex: 1, fontWeight: 800 }}>
                                    {opt}
                                  </span>
                                  {correct && (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.greenLight} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  )}
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

              {(tab === "cq" ? cqPageItems : mcqPageItems).length === 0 && (
                <div style={{ padding: "40px 0", textAlign: "center", color: C.textGhost, fontSize: 14, fontWeight: 900 }}>
                  কোনো প্রশ্ন পাওয়া যায়নি 😔
                </div>
              )}

              {/* ✅ pager at bottom (sticky) */}
              <Pager mode={tab} />
            </div>
          </>
        )}

        {/* ── TAKE TEST ── */}
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