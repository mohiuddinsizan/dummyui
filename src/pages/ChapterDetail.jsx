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

          <div className="grid grid-cols-2 gap-3">
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
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="year" stroke="rgba(255,255,255,0.6)" />
                    <YAxis stroke="rgba(255,255,255,0.6)" />
                    <Tooltip />
                    <Bar dataKey="questions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs font-bold text-white/70">Board share ({year})</div>
              <div className="mt-2 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={78}>
                      {pieData.map((_, i) => (
                        <Cell key={i} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-xs text-white/60">
                (Pie slice colors are default; not manually set.)
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
        <Card className="p-4 space-y-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-sm font-extrabold">{tab.toUpperCase()} Bank</div>
              <div className="text-xs text-white/60">Sort / filter enabled</div>
            </div>
            <Select value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
              <option value="tag">Sort: Tag</option>
              <option value="name">Sort: Name</option>
            </Select>
          </div>

          <Input
            placeholder="Search by question text or tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="grid gap-3">
            {(tab === "cq" ? cqList : mcqList).map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-4 shadow-[0_16px_50px_-30px_rgba(0,0,0,0.9)]"
              >
                <div className="text-xs font-bold text-white/60">Tag: {item.tag}</div>
                <div className="mt-2 text-sm font-extrabold">{item.q}</div>

                {tab === "cq" ? (
                  <div className="mt-2 text-sm text-white/70">{item.a}</div>
                ) : (
                  <div className="mt-3 grid gap-2">
                    {item.options.map((opt, i) => (
                      <div key={i} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
                        {String.fromCharCode(65 + i)}. {opt}
                      </div>
                    ))}
                    <div className="mt-2 text-xs text-white/50">
                      (Answer hidden here in mock view)
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
