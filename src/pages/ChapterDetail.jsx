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

  const CHART_COLORS = [
    "#60a5fa", // blue
    "#34d399", // green
    "#fbbf24", // amber
    "#fb7185", // rose
    "#a78bfa", // violet
    "#22d3ee", // cyan
    "#f97316", // orange
  ];

  // Board analysis controls
  const [board, setBoard] = useState(boardAnalytics.boards[0]);
  const [year, setYear] = useState(boardAnalytics.years[boardAnalytics.years.length - 1]);

  const barData = useMemo(() => {
    // show all years for selected board
    return boardAnalytics.years.map((y) => ({
      year: y,
      questions: boardAnalytics.data[board][y],
    }));
  }, [board]);

  const pieData = useMemo(() => {
    // show distribution across boards for selected year
    return boardAnalytics.boards.map((b) => ({
      name: b,
      value: boardAnalytics.data[b][year],
    }));
  }, [year]);

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
      <Card className="p-4">
        <div className="text-xs text-white/60">{course.title} • {subject.title}</div>
        <div className="text-xl font-extrabold">{chapter.title}</div>
        <div className="mt-2">
          <Tabs tabs={tabs} value={tab} onChange={setTab} />
        </div>
      </Card>

      {tab === "board" && (
        <Card className="p-4 space-y-3">
          <div>
            <div className="text-sm font-extrabold">Board analysis</div>
            <div className="text-xs text-white/60">
              Sort by selecting year or board → show bar + pie
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pb-6">
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

          <div className="grid gap-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs font-bold text-white/70">Questions by Year ({board})</div>
              <div className="mt-2 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.18)" strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fill: "rgba(255,255,255,0.75)" }} axisLine={{ stroke: "rgba(255,255,255,0.25)" }} tickLine={{ stroke: "rgba(255,255,255,0.25)" }} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.75)" }} axisLine={{ stroke: "rgba(255,255,255,0.25)" }} tickLine={{ stroke: "rgba(255,255,255,0.25)" }} />
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
                    <Bar
                      dataKey="questions"
                      fill="#fb7185"
                      radius={[12, 12, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs font-bold text-white/70">Board share ({year})</div>
              <div className="mt-2 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      contentStyle={{
                        background: "rgba(10,10,12,0.9)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 14,
                        backdropFilter: "blur(10px)",
                      }}
                      labelStyle={{
                        color: "#ffffff",
                        fontWeight: 600,
                      }}
                      itemStyle={{
                        color: "#ffffff",
                      }}
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
              <div className="mt-2 text-xs text-white/60">
                (Pie slice colors are now set via CHART_COLORS.)
              </div>
            </div>
          </div>
        </Card>
      )}

      {tab === "relevant" && (
        <Card className="p-4">
          <div className="text-sm font-extrabold">Relevant information</div>
          <div className="mt-2 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-3 py-2 font-bold text-white/70">Name</th>
                  <th className="px-3 py-2 font-bold text-white/70">Description</th>
                </tr>
              </thead>
              <tbody>
                {relevantInfoRows.map((r, idx) => (
                  <tr key={idx} className="border-t border-white/10">
                    <td className="px-3 py-2 font-semibold">{r.name}</td>
                    <td className="px-3 py-2 text-white/70">{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "formula" && (
        <Card className="p-4">
          <div className="text-sm font-extrabold">Formula</div>
          <div className="mt-2 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-3 py-2 font-bold text-white/70">Formula</th>
                  <th className="px-3 py-2 font-bold text-white/70">Parameters</th>
                </tr>
              </thead>
              <tbody>
                {formulaRows.map((r, idx) => (
                  <tr key={idx} className="border-t border-white/10">
                    <td className="px-3 py-2 font-semibold">{r.name}</td>
                    <td className="px-3 py-2 text-white/70">{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {(tab === "cq" || tab === "mcq") && (
        <Card className="p-5 sm:p-6 space-y-4">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-base font-extrabold tracking-tight text-white">
                {tab === "cq" ? "CQ Bank" : "MCQ Bank"}
              </div>
              <div className="text-xs text-white/60">Search / sort enabled</div>
            </div>

            <div className="w-full sm:w-60 pb-4">
              <Select value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
                <option value="tag">Sort: Tag</option>
                <option value="name">Sort: Name</option>
              </Select>
            </div>
          </div>

          {/* Search */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-3 sm:p-4">
            <Input
              placeholder="Search by stem/question text or tag..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="mt-2 text-[11px] text-white/50">
              Tip: try “গতি”, “ঘর্ষণ”, “মহাকর্ষ”, “একক”
            </div>
          </div>

          {/* List */}
          <div className="grid gap-4 pt-4">
            {(tab === "cq" ? cqList : mcqList).map((item, idx) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-5 sm:p-6 shadow-[0_18px_60px_-35px_rgba(0,0,0,0.95)]"
              >
                {/* Top row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-white/75">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                    Tag: <span className="text-white/90">{item.tag}</span>
                  </div>

                  <div className="text-[11px] font-bold text-white/45">#{idx + 1}</div>
                </div>

                {/* ===================== CQ ===================== */}
                {tab === "cq" ? (
                  <div className="mt-4 space-y-3">
                    {/* Stem */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-[11px] font-bold text-white/60 mb-2">STEM</div>
                      <div className="text-[15px] sm:text-base font-extrabold leading-relaxed text-white whitespace-pre-line">
                        {item.q}
                      </div>
                    </div>

                    {/* 4 sub-questions */}
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-sky-400/10 to-transparent p-4">
                      <div className="text-[11px] font-bold text-sky-200/90 mb-2">Questions</div>

                      <div className="grid gap-2">
                        {(item.parts || []).map((p, i) => (
                          <div
                            key={p.key ?? i}
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85"
                          >
                            <span className="font-extrabold text-white mr-2">
                              {(p.key || ["ক", "খ", "গ", "ঘ"][i]) + ")"}
                            </span>
                            <span className="leading-relaxed">{p.q}</span>
                          </div>
                        ))}

                        {/* fallback if parts not present (so it doesn't break) */}
                        {(!item.parts || item.parts.length === 0) && (
                          <div className="text-xs text-white/55">
                            (No parts[] found in CQ item. Add item.parts with 4 questions: ক/খ/গ/ঘ)
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Answer box */}
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-400/12 to-transparent p-4">
                      <div className="text-[11px] font-bold text-emerald-200/90 mb-2">Answer</div>
                      <div className="text-sm text-white/85 leading-relaxed whitespace-pre-line">
                        {item.a}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ===================== MCQ ===================== */
                  <div className="mt-4 space-y-3">
                    {/* Question */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-[11px] font-bold text-white/60 mb-2">QUESTION</div>
                      <div className="text-[15px] sm:text-base font-extrabold leading-relaxed text-white">
                        {item.q}
                      </div>
                    </div>

                    {/* Options */}
                    <div className="grid gap-2">
                      {item.options?.map((opt, i) => (
                        <div
                          key={i}
                          className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85"
                        >
                          <div className="min-w-8 h-8 grid place-items-center rounded-xl bg-white/10 text-xs font-extrabold text-white">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <div className="leading-relaxed">{opt}</div>
                        </div>
                      ))}
                    </div>

                    {/* Answer box (shows correct option) */}
                    {/* Answer + Explanation box */}
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-400/12 to-transparent p-4">
                      <div className="text-[11px] font-bold text-amber-200/90 mb-2">
                        Answer & Explanation
                      </div>

                      <div className="text-sm text-white/90">
                        {typeof item.answer === "number" && item.options?.[item.answer] ? (
                          <>
                            <div className="mb-2">
                              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                                <span className="text-white/70 text-xs font-bold">Correct:</span>
                                <span className="font-extrabold">
                                  {String.fromCharCode(65 + item.answer)}.
                                </span>
                                <span className="text-white/85">{item.options[item.answer]}</span>
                              </span>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/85 leading-relaxed whitespace-pre-line">
                              {item.explain ? item.explain : "ব্যাখ্যা যোগ করা হয়নি।"}
                            </div>
                          </>
                        ) : (
                          <span className="text-white/60">(Answer not set)</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <div className="text-sm font-extrabold">Take Test</div>
        <div className="mt-1 text-xs text-white/60">
          Start a test from this chapter.
        </div>
        <div className="mt-3">
          <Link to="/test/setup">
            <Button>Take Test</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
