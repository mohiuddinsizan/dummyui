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
    <div className="space-y-3">
      <Card className="p-4">
        <div className="text-xl font-extrabold">Test Setup</div>
        <div className="mt-1 text-sm text-white/65">
          Enter necessary info then start.
        </div>
      </Card>

      <Card className="p-4 space-y-3">
        <Input label="Tag" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Basics / Units / ..." />

        <Select label="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </Select>

        <Input
          label="Time (minutes)"
          type="number"
          min="1"
          value={timeMin}
          onChange={(e) => setTimeMin(e.target.value)}
        />

        <Input
          label="Number of questions"
          type="number"
          min="1"
          max="30"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />

        <Button onClick={start}>Start Test</Button>

        <div className="text-xs text-white/50">
          (Frontend-only mock: questions are generated from local sample data.)
        </div>
      </Card>
    </div>
  );
}
