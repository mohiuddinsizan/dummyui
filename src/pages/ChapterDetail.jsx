import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Tabs from "../components/ui/Tabs.jsx";
import Select from "../components/ui/Select.jsx";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";

import {
  boardAnalytics,
  relevantInfoRows,
  formulaRows,
  sampleCQ,
  sampleMCQ,
  myCourses,
} from "../data/mockData.js";

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

const CHART_COLORS = [
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#fb7185",
  "#a78bfa",
  "#22d3ee",
  "#f97316",
];

export default function ChapterDetail() {
  const { courseId, subjectId, chapterId } = useParams();

  const course = myCourses.find((c) => c.id === courseId);
  const subject = course?.subjects.find((s) => s.id === subjectId);
  const chapter = subject?.chapters.find((c) => c.id === chapterId);

  const [tab, setTab] = useState("board");
  const tabs = [
    { value: "board", label: "Board analysis" },
    { value: "relevant", label: "Relevant info" },
    { value: "formula", label: "Formula" },
    { value: "cq", label: "CQ" },
    { value: "mcq", label: "MCQ" },
  ];

  // Board analysis controls
  const [board, setBoard] = useState(boardAnalytics.boards[0]);
  const [year, setYear] = useState(boardAnalytics.years[boardAnalytics.years.length - 1]);

  const barData = useMemo(() =>
    boardAnalytics.years.map((y) => ({
      year: y,
      questions: boardAnalytics.data[board][y],
    })),
  [board]);

  const pieData = useMemo(() =>
    boardAnalytics.boards.map((b) => ({
      name: b,
      value: boardAnalytics.data[b][year],
    })),
  [year]);

  // CQ/MCQ filter/sort
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState("tag");

  const cqList = useMemo(() => {
    const filtered = sampleCQ.filter(
      (x) =>
        x.q.toLowerCase().includes(query.toLowerCase()) ||
        x.tag.toLowerCase().includes(query.toLowerCase())
    );
    return [...filtered].sort((a, b) =>
      sortMode === "tag" ? a.tag.localeCompare(b.tag) : a.q.localeCompare(b.q)
    );
  }, [query, sortMode]);

  const mcqList = useMemo(() => {
    const filtered = sampleMCQ.filter(
      (x) =>
        x.q.toLowerCase().includes(query.toLowerCase()) ||
        x.tag.toLowerCase().includes(query.toLowerCase())
    );
    return [...filtered].sort((a, b) =>
      sortMode === "tag" ? a.tag.localeCompare(b.tag) : a.q.localeCompare(b.q)
    );
  }, [query, sortMode]);

  if (!course || !subject || !chapter) {
    return (
      <Card className="p-4">
        <div className="text-sm font-bold">Chapter not found.</div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header card */}
      <Card className="p-4">
        <div className="text-xs text-white/60">
          {course.title} • {subject.title}
        </div>
        <div className="text-xl font-extrabold">{chapter.title}</div>
        <div className="mt-3 overflow-x-auto">
          <Tabs tabs={tabs} value={tab} onChange={setTab} />
        </div>
      </Card>

      {/* ── BOARD ANALYSIS ── */}
      {tab === "board" && (
        <Card className="p-4 space-y-4">
          <div>
            <div className="text-sm font-extrabold">Board analysis</div>
            <div className="text-xs text-white/60">
              Select board or year to update charts
            </div>
          </div>

          {/* Selects — no pb-6, proper gap */}
          <div className="grid grid-cols-2 gap-3 pb-3">
            <Select label="Board" value={board} onChange={(e) => setBoard(e.target.value)}>
              {boardAnalytics.boards.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </Select>
            <Select label="Year" value={year} onChange={(e) => setYear(e.target.value)}>
              {boardAnalytics.years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </Select>
          </div>

          {/* Bar chart */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
            <div className="text-xs font-bold text-white/70 mb-2">
              Questions by Year ({board})
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 11 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.25)" }}
                    tickLine={{ stroke: "rgba(255,255,255,0.25)" }}
                  />
                  <YAxis
                    tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 11 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.25)" }}
                    tickLine={{ stroke: "rgba(255,255,255,0.25)" }}
                    width={28}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(10,10,12,0.85)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 14,
                      color: "white",
                      backdropFilter: "blur(10px)",
                    }}
                    labelStyle={{ color: "rgba(255,255,255,0.85)" }}
                  />
                  <Bar dataKey="questions" fill="#fb7185" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie chart */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
            <div className="text-xs font-bold text-white/70 mb-2">
              Board share ({year})
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(10,10,12,0.9)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 14,
                      backdropFilter: "blur(10px)",
                    }}
                    labelStyle={{ color: "#ffffff", fontWeight: 600 }}
                    itemStyle={{ color: "#ffffff" }}
                  />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={78}
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth={2}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {pieData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-[11px] text-white/60">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                  />
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* ── RELEVANT INFO ── */}
      {tab === "relevant" && (
        <Card className="p-4">
          <div className="text-sm font-extrabold mb-3">Relevant information</div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-3 py-2 font-bold text-white/70 w-1/3">Name</th>
                  <th className="px-3 py-2 font-bold text-white/70">Description</th>
                </tr>
              </thead>
              <tbody>
                {relevantInfoRows.map((r, idx) => (
                  <tr key={idx} className="border-t border-white/10">
                    <td className="px-3 py-3 font-semibold align-top leading-relaxed">{r.name}</td>
                    <td className="px-3 py-3 text-white/70 leading-relaxed">{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ── FORMULA ── */}
      {tab === "formula" && (
        <Card className="p-4">
          <div className="text-sm font-extrabold mb-3">Formula</div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-3 py-2 font-bold text-white/70 w-2/5">Formula</th>
                  <th className="px-3 py-2 font-bold text-white/70">Parameters</th>
                </tr>
              </thead>
              <tbody>
                {formulaRows.map((r, idx) => (
                  <tr key={idx} className="border-t border-white/10">
                    <td className="px-3 py-3 font-semibold font-mono text-sky-300 align-top">{r.name}</td>
                    <td className="px-3 py-3 text-white/70 leading-relaxed">{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ── CQ / MCQ ── */}
      {(tab === "cq" || tab === "mcq") && (
        <Card className="p-4 space-y-4">
          {/* Header row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-base font-extrabold tracking-tight text-white">
                {tab === "cq" ? "CQ Bank" : "MCQ Bank"}
              </div>
              <div className="text-xs text-white/60">Search / sort enabled</div>
            </div>
            <div className="w-full sm:w-48 pb-3">
              <Select value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
                <option value="tag">Sort: Tag</option>
                <option value="name">Sort: Name</option>
              </Select>
            </div>
          </div>

          {/* Search */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <Input
              placeholder="Search by question text or tag…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="mt-1.5 text-[11px] text-white/50">
              Tip: try "গতি", "ঘর্ষণ", "মহাকর্ষ", "একক"
            </div>
          </div>

          {/* List */}
          <div className="grid gap-4 pt-3">
            {(tab === "cq" ? cqList : mcqList).map((item, idx) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-4 sm:p-5"
              >
                {/* Tag row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-white/75">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400/80 flex-shrink-0" />
                    Tag: <span className="text-white/90">{item.tag}</span>
                  </div>
                  <div className="text-[11px] font-bold text-white/45">#{idx + 1}</div>
                </div>

                {/* ── CQ ── */}
                {tab === "cq" && (
                  <div className="mt-4 space-y-3">
                    {/* Stem */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-[11px] font-bold text-white/60 mb-2">STEM</div>
                      <div className="text-sm font-extrabold leading-relaxed text-white whitespace-pre-line">
                        {item.q}
                      </div>
                    </div>

                    {/* Sub-questions */}
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-sky-400/10 to-transparent p-4">
                      <div className="text-[11px] font-bold text-sky-200/90 mb-2">Questions</div>
                      <div className="grid gap-2">
                        {(item.parts || []).map((p, i) => (
                          <div
                            key={p.key ?? i}
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/85"
                          >
                            <span className="font-extrabold text-white mr-2">
                              {(p.key || ["ক", "খ", "গ", "ঘ"][i])}{")"} 
                            </span>
                            <span className="leading-relaxed">{p.q}</span>
                          </div>
                        ))}
                        {(!item.parts || item.parts.length === 0) && (
                          <div className="text-xs text-white/55">No parts found.</div>
                        )}
                      </div>
                    </div>

                    {/* Answer */}
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-400/12 to-transparent p-4">
                      <div className="text-[11px] font-bold text-emerald-200/90 mb-2">Answer</div>
                      <div className="text-sm text-white/85 leading-relaxed whitespace-pre-line">
                        {item.a}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── MCQ ── */}
                {tab === "mcq" && (
                  <div className="mt-4 space-y-3">
                    {/* Question */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-[11px] font-bold text-white/60 mb-2">QUESTION</div>
                      <div className="text-sm font-extrabold leading-relaxed text-white">
                        {item.q}
                      </div>
                    </div>

                    {/* Options */}
                    <div className="grid gap-2">
                      {item.options?.map((opt, i) => (
                        <div
                          key={i}
                          className={[
                            "flex gap-3 items-center rounded-2xl border px-3 py-2.5 text-sm",
                            i === item.answer
                              ? "border-emerald-400/30 bg-emerald-400/10 text-white"
                              : "border-white/10 bg-white/5 text-white/80",
                          ].join(" ")}
                        >
                          <div
                            className={[
                              "flex-shrink-0 w-7 h-7 grid place-items-center rounded-lg text-xs font-extrabold",
                              i === item.answer
                                ? "bg-emerald-400/20 text-emerald-300"
                                : "bg-white/10 text-white",
                            ].join(" ")}
                          >
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className="leading-relaxed">{opt}</span>
                          {i === item.answer && (
                            <span className="ml-auto text-[10px] font-bold text-emerald-400 flex-shrink-0">
                              ✓
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Explanation */}
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-400/12 to-transparent p-4">
                      <div className="text-[11px] font-bold text-amber-200/90 mb-2">
                        Explanation
                      </div>
                      <div className="text-sm text-white/85 leading-relaxed whitespace-pre-line">
                        {item.explain || "ব্যাখ্যা যোগ করা হয়নি।"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {(tab === "cq" ? cqList : mcqList).length === 0 && (
              <div className="text-center py-10 text-sm text-white/40">
                No results found.
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Take test */}
      <Card className="p-4">
        <div className="text-sm font-extrabold">Take Test</div>
        <div className="mt-1 text-xs text-white/60">Start a test from this chapter.</div>
        <div className="mt-3">
          <Link to="/test/setup">
            <Button>Take Test</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}