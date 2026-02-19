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

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <Card className="p-4" id="wallet">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-white/60">Wallet</div>
            <div className="mt-1 text-2xl font-extrabold">৳ {user.walletBalance}</div>
            <div className="mt-2 text-xs text-white/60">
              User: {user.name} • {user.id} • Plan: {user.plan}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge>Balance</Badge>
            <Badge>Info</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-sm font-extrabold">Daily Exam Marks</div>
            <div className="text-xs text-white/60">Obtained total marks by day</div>
          </div>
        </div>

        <div className="mt-3 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dashboardDailyMarks}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip />
              <Line type="monotone" dataKey="marks" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4">
        <div>
          <div className="text-sm font-extrabold">Time Spent</div>
          <div className="text-xs text-white/60">Total hours spent in app by day</div>
        </div>

        <div className="mt-3 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboardSpentHours}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip />
              <Bar dataKey="hours" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
