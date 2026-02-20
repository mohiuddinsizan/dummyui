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
  labelStyle: { color: "rgba(255,255,255,0.85)", fontWeight: 700 },
  itemStyle: { color: "#fff" },
};

function fmt(n) {
  const num = Number(n);
  if (Number.isNaN(num)) return "0";
  return num.toLocaleString();
}

export default function Dashboard() {
  const marks = dashboardDailyMarks || [];
  const hours = dashboardSpentHours || [];

  const totalMarks = marks.reduce((s, r) => s + (Number(r.marks) || 0), 0);
  const avgMarks = marks.length ? Math.round(totalMarks / marks.length) : 0;
  const bestMarks = marks.reduce((m, r) => Math.max(m, Number(r.marks) || 0), 0);
  const bestDay = (marks.find((r) => Number(r.marks) === bestMarks) || {}).day || "-";

  const totalHours = 10;
  const avgHours = 10;

  return (
    <div className="space-y-4">
      {/* Wallet / Profile */}
      <Card
        className="p-5 sm:p-6 border border-white/10 bg-gradient-to-br from-sky-500/15 via-white/5 to-rose-500/10"
        id="wallet"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-xs font-semibold text-white/60">Wallet</div>
            <div className="mt-1 text-3xl font-extrabold tracking-tight text-white">
              ৳ {fmt(user.walletBalance)}
            </div>

            <div className="mt-2 text-xs text-white/60">
              User: <span className="text-white/80 font-bold">{user.name}</span> •{" "}
              <span className="text-white/70">{user.id}</span> • Plan:{" "}
              <span className="text-white/80 font-bold">{user.plan}</span>
            </div>

            {/* Quick stats row */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-[11px] text-white/55 font-bold">Avg Marks</div>
                <div className="mt-1 text-lg font-extrabold text-white">{avgMarks}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-[11px] text-white/55 font-bold">Best Day</div>
                <div className="mt-1 text-lg font-extrabold text-white">{bestDay}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-[11px] text-white/55 font-bold">Total Hours</div>
                <div className="mt-1 text-lg font-extrabold text-white">{totalHours}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2">
            {/* <Badge>Balance</Badge> */}
            {/* <Badge>Analytics</Badge> */}
          </div>
        </div>
      </Card>

      {/* Daily Exam Marks */}
      <Card className="p-5 sm:p-6 border border-white/10 bg-white/5">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold text-white">Daily Exam Marks</div>
            <div className="text-xs text-white/60">Obtained total marks by day</div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-[11px] font-bold text-white/55">Total</span>
            <span className="text-sm font-extrabold text-white">{totalMarks}</span>
            <span className="text-white/35">•</span>
            <span className="text-[11px] font-bold text-white/55">Avg</span>
            <span className="text-sm font-extrabold text-white">{avgMarks}</span>
          </div>
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
              <Line
                type="monotone"
                dataKey="marks"
                stroke="#60a5fa"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Time Spent */}
      <Card className="p-5 sm:p-6 border border-white/10 bg-white/5">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold text-white">Time Spent</div>
            <div className="text-xs text-white/60">Total hours spent in app by day</div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-[11px] font-bold text-white/55">Avg/day</span>
            <span className="text-sm font-extrabold text-white">{avgHours}h</span>
          </div>
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
              <Bar
                dataKey="hours"
                fill="#34d399"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}