// src/pages/Dashboard.jsx
import { useMemo, useState } from "react";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import { user, dashboardDailyMarks, dashboardSpentHours } from "../data/mockData.js";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";

const TOOLTIP_PROPS = {
  contentStyle: {
    background: "rgba(10,10,12,0.90)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    color: "#fff",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 35px rgba(0,0,0,0.55)",
  },
  labelStyle: { color: "rgba(255,255,255,0.85)", fontWeight: 800 },
  itemStyle: { color: "#fff", fontWeight: 700 },
};

function safeArr(x) {
  return Array.isArray(x) ? x : [];
}

function fmt(n) {
  const num = Number(n);
  if (Number.isNaN(num)) return "0";
  return num.toLocaleString();
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function round1(n) {
  const x = Number(n);
  if (!Number.isFinite(x)) return 0;
  return Math.round(x * 10) / 10;
}

function windowLabel(n) {
  if (n >= 28) return "Last 28 days";
  if (n >= 14) return "Last 14 days";
  return "Last 7 days";
}

function deltaText(n, suffix = "") {
  const x = Number(n);
  if (!Number.isFinite(x)) return `0${suffix}`;
  const sign = x > 0 ? "+" : "";
  return `${sign}${x}${suffix}`;
}

function DeltaPill({ value, suffix = "" }) {
  const v = Number(value || 0);
  const up = v > 0;
  const down = v < 0;

  const cls = up
    ? "border-emerald-400/25 bg-emerald-500/12 text-emerald-200"
    : down
      ? "border-rose-400/25 bg-rose-500/12 text-rose-200"
      : "border-white/10 bg-white/5 text-white/70";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${cls}`}>
      <span className="opacity-90">{up ? "▲" : down ? "▼" : "•"}</span>
      <span>{deltaText(v, suffix)}</span>
    </span>
  );
}

function StatTile({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-[11px] font-extrabold text-white/55">{label}</div>
      <div className="mt-1 text-lg font-extrabold text-white">{value}</div>
      {sub ? <div className="mt-1 text-[11px] font-bold text-white/50">{sub}</div> : null}
    </div>
  );
}

export default function Dashboard() {
  const marksRaw = safeArr(dashboardDailyMarks);
  const hoursRaw = safeArr(dashboardSpentHours);

  const [range, setRange] = useState(7); // 7 | 14 | 28

  const marks = useMemo(() => marksRaw.slice(-range), [marksRaw, range]);
  const hours = useMemo(() => hoursRaw.slice(-range), [hoursRaw, range]);

  // MARKS stats
  const totalMarks = useMemo(
    () => marks.reduce((s, r) => s + (Number(r?.marks) || 0), 0),
    [marks]
  );
  const avgMarks = useMemo(() => (marks.length ? Math.round(totalMarks / marks.length) : 0), [marks.length, totalMarks]);

  const bestMarks = useMemo(
    () => marks.reduce((m, r) => Math.max(m, Number(r?.marks) || 0), 0),
    [marks]
  );
  const bestDay = useMemo(
    () => (marks.find((r) => Number(r?.marks) === bestMarks) || {}).day || "-",
    [marks, bestMarks]
  );

  const lastMarks = useMemo(() => Number(marks[marks.length - 1]?.marks || 0), [marks]);
  const prevMarks = useMemo(() => Number(marks[marks.length - 2]?.marks || 0), [marks]);
  const marksDelta = useMemo(() => lastMarks - prevMarks, [lastMarks, prevMarks]);

  // HOURS stats
  const totalHours = useMemo(
    () => hours.reduce((s, r) => s + (Number(r?.hours) || 0), 0),
    [hours]
  );
  const avgHours = useMemo(() => (hours.length ? totalHours / hours.length : 0), [hours.length, totalHours]);

  const bestHours = useMemo(
    () => hours.reduce((m, r) => Math.max(m, Number(r?.hours) || 0), 0),
    [hours]
  );
  const bestHoursDay = useMemo(
    () => (hours.find((r) => Number(r?.hours) === bestHours) || {}).day || "-",
    [hours, bestHours]
  );

  const lastHours = useMemo(() => Number(hours[hours.length - 1]?.hours || 0), [hours]);
  const prevHours = useMemo(() => Number(hours[hours.length - 2]?.hours || 0), [hours]);
  const hoursDelta = useMemo(() => lastHours - prevHours, [lastHours, prevHours]);

  // streak (marks > 0 consecutive)
  const streak = useMemo(() => {
    let s = 0;
    for (let i = marks.length - 1; i >= 0; i--) {
      if ((Number(marks[i]?.marks) || 0) > 0) s++;
      else break;
    }
    return s;
  }, [marks]);

  const rangeOptions = [7, 14, 28];

  return (
    <div className="space-y-4">
      {/* TOP / PROFILE */}
      <Card className="p-5 border border-white/10 bg-gradient-to-br from-sky-500/12 via-white/5 to-rose-500/10">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs font-semibold text-white/60">Dashboard</div>
            <div className="mt-1 text-lg font-extrabold text-white">Wallet & Progress</div>
            <div className="mt-1 text-xs text-white/60">
              User: <span className="text-white/80 font-extrabold">{user?.name || "User"}</span>{" "}
              • <span className="text-white/70">{user?.id || "-"}</span>{" "}
              • Plan: <span className="text-white/80 font-extrabold">{user?.plan || "-"}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {/* <Badge>{windowLabel(range)}</Badge> */}
            {streak > 0 ? <Badge>{streak} day streak</Badge> : null}
          </div>
        </div>

        {/* Wallet */}
        <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="text-[11px] font-extrabold text-white/55">Wallet Balance</div>
          <div className="mt-1 text-3xl font-extrabold tracking-tight text-white">
            ৳ {fmt(user?.walletBalance)}
          </div>
        </div>

        {/* Range pills (mobile-friendly horizontal) */}
        <div className="mt-4">
          <div className="text-[11px] font-extrabold text-white/50 mb-2">View range</div>
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {rangeOptions.map((n) => {
              const active = range === n;
              return (
                <button
                  key={n}
                  onClick={() => setRange(n)}
                  className={[
                    "shrink-0 rounded-2xl border px-4 py-2 text-[11px] font-extrabold transition",
                    active
                      ? "border-cyan-400/25 bg-white/15 ring-2 ring-cyan-400/20 text-white"
                      : "border-white/10 bg-white/5 hover:bg-white/10 text-white/70",
                  ].join(" ")}
                >
                  {windowLabel(n)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Snapshot row (compact, NOT a big right panel) */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-extrabold text-white/55">Latest Marks</div>
              <DeltaPill value={marksDelta} />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-white">{lastMarks}</div>
            <div className="mt-1 text-[11px] font-bold text-white/50">vs previous day</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-extrabold text-white/55">Latest Hours</div>
              <DeltaPill value={round1(hoursDelta)} suffix="h" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-white">{round1(lastHours)}h</div>
            <div className="mt-1 text-[11px] font-bold text-white/50">vs previous day</div>
          </div>
        </div>

        {/* Clean 2x2 stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatTile label="Avg Marks" value={avgMarks} sub="per day" />
          <StatTile label="Best Marks" value={bestMarks} sub={`on ${bestDay}`} />
          <StatTile label="Avg Hours" value={`${round1(avgHours)}h`} sub="per day" />
          <StatTile label="Best Focus" value={`${round1(bestHours)}h`} sub={`on ${bestHoursDay}`} />
        </div>

        {/* Tip (small, neat) */}
        <div className="mt-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-4">
          <div className="text-[11px] font-extrabold text-white/55">Tip</div>
          <div className="mt-1 text-xs font-bold text-white/70 leading-relaxed">
            Keep <span className="text-white">hours consistent</span>, then your <span className="text-white">marks</span> will rise naturally.
          </div>
        </div>
      </Card>

      {/* Daily Exam Marks */}
      <Card className="p-5 border border-white/10 bg-white/5">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-extrabold text-white">Daily Exam Marks</div>
            <div className="text-xs text-white/60">Marks trend (demo analytics)</div>
          </div>
          <Badge>{windowLabel(range)}</Badge>
        </div>

        <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/70 flex items-center justify-between">
          <span>Total: <span className="text-white font-extrabold">{totalMarks}</span></span>
          <span className="text-white/35">•</span>
          <span>Avg: <span className="text-white font-extrabold">{avgMarks}</span></span>
          <span className="text-white/35">•</span>
          <span>Best: <span className="text-white font-extrabold">{bestMarks}</span></span>
        </div>

        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marks} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.14)" strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.25)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.25)" }}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.25)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.25)" }}
              />
              <Tooltip {...TOOLTIP_PROPS} />
              <ReferenceLine
                y={avgMarks}
                stroke="rgba(255,255,255,0.35)"
                strokeDasharray="4 4"
              />
              <Line
                type="monotone"
                dataKey="marks"
                stroke="#60a5fa"
                strokeWidth={3}
                dot={{ r: 3, strokeWidth: 2 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Time Spent */}
      <Card className="p-5 border border-white/10 bg-white/5">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-extrabold text-white">Time Spent</div>
            <div className="text-xs text-white/60">Hours trend (demo analytics)</div>
          </div>
          <Badge>{windowLabel(range)}</Badge>
        </div>

        <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/70 flex items-center justify-between">
          <span>Total: <span className="text-white font-extrabold">{round1(totalHours)}h</span></span>
          <span className="text-white/35">•</span>
          <span>Avg/day: <span className="text-white font-extrabold">{round1(avgHours)}h</span></span>
        </div>

        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hours} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.14)" strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.25)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.25)" }}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.25)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.25)" }}
              />
              <Tooltip {...TOOLTIP_PROPS} />
              <ReferenceLine y={avgHours} stroke="rgba(255,255,255,0.35)" strokeDasharray="4 4" />
              <Bar dataKey="hours" fill="#34d399" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}