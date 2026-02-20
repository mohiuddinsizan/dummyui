import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Input from "../components/ui/Input.jsx";
import Select from "../components/ui/Select.jsx";
import Button from "../components/ui/Button.jsx";

export default function TestSetup() {
  const nav = useNavigate();

  const [tag, setTag] = useState("Basics");
  const [difficulty, setDifficulty] = useState("Easy");
  const [timeMin, setTimeMin] = useState(10);
  const [count, setCount] = useState(5);

  const payload = useMemo(
    () => ({
      tag,
      difficulty,
      timeMin: Number(timeMin),
      count: Number(count),
    }),
    [tag, difficulty, timeMin, count]
  );

  const start = () => {
    nav("/test/run", { state: payload });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <Card className="p-6 border border-white/10 bg-gradient-to-br from-sky-500/15 via-white/5 to-rose-500/10">
        <div className="text-2xl font-extrabold text-white">
          Test Setup
        </div>
        <div className="mt-1 text-sm text-white/70">
          Choose your filters and start the test.
        </div>
      </Card>

      {/* Form Card */}
      <Card className="p-6 space-y-6 border border-white/10 bg-white/5">
        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Basics / Units / Concept ..."
          />

          <Select
            label="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </Select>

          <Input
            label="Time (minutes)"
            type="number"
            min="1"
            value={timeMin}
            onChange={(e) => setTimeMin(e.target.value)}
            placeholder="10"
          />

          <Input
            label="Number of questions"
            type="number"
            min="1"
            max="30"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="5"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-4" />

        {/* Summary Section */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/10 to-transparent p-5">
          <div className="text-xs font-bold text-emerald-200 mb-3">
            SUMMARY
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-[11px] text-white/60 font-bold">Tag</div>
              <div className="text-white font-extrabold mt-1">
                {tag || "—"}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-[11px] text-white/60 font-bold">
                Difficulty
              </div>
              <div className="text-white font-extrabold mt-1">
                {difficulty}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-[11px] text-white/60 font-bold">
                Time
              </div>
              <div className="text-white font-extrabold mt-1">
                {Number(timeMin) || 0} min
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-[11px] text-white/60 font-bold">
                qstn
              </div>
              <div className="text-white font-extrabold mt-1">
                {Number(count) || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          <div className="text-xs text-white/50">
            (Frontend-only mock: questions are generated from local sample data.)
          </div>

          <Button
            onClick={start}
            className="w-full sm:w-auto px-8 py-3 text-base"
          >
            Start Test
          </Button>
        </div>
      </Card>
    </div>
  );
}