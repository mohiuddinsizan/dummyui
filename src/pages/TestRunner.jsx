import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import { sampleMCQ } from "../data/mockData.js";

export default function TestRunner() {
  const nav = useNavigate();
  const { state } = useLocation();

  const config = state || { tag: "Basics", difficulty: "Easy", timeMin: 10, count: 5 };

  const questions = useMemo(() => {
    // Filter by tag if possible, else fallback to all
    const filtered = sampleMCQ.filter((q) =>
      String(q.tag).toLowerCase().includes(String(config.tag).toLowerCase())
    );
    const pool = filtered.length ? filtered : sampleMCQ;

    // Pick first N (simple deterministic mock)
    return pool.slice(0, Math.min(config.count, pool.length));
  }, [config]);

  const [answers, setAnswers] = useState(() => {
    const obj = {};
    questions.forEach((q) => (obj[q.id] = null));
    return obj;
  });

  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    let correct = 0;
    for (const q of questions) {
      if (answers[q.id] === q.answer) correct++;
    }
    return { correct, total: questions.length };
  }, [answers, questions]);

  const onChoose = (qid, idx) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  const submit = () => setSubmitted(true);

  const reset = () => {
    nav("/test/setup");
  };

  return (
    <div className="space-y-3">
      <Card className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-white/60">MCQ Test</div>
            <div className="text-lg font-extrabold">Answer & Submit</div>
            <div className="mt-1 text-xs text-white/60">
              Tag: {config.tag} • Difficulty: {config.difficulty} • Time: {config.timeMin} min • Q: {questions.length}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge>{submitted ? "Submitted" : "In progress"}</Badge>
          </div>
        </div>
      </Card>

      <div className="grid gap-3">
        {questions.map((q, qi) => (
          <Card key={q.id} className="p-4">
            <div className="text-xs font-bold text-white/60">Q{qi + 1} • Tag: {q.tag}</div>
            <div className="mt-2 text-sm font-extrabold">{q.q}</div>

            <div className="mt-3 grid gap-2">
              {q.options.map((opt, i) => {
                const chosen = answers[q.id] === i;
                const isCorrect = submitted && i === q.answer;
                const isWrong = submitted && chosen && i !== q.answer;

                return (
                  <button
                    key={i}
                    onClick={() => onChoose(q.id, i)}
                    className={[
                      "text-left rounded-2xl border px-3 py-3 text-sm transition active:scale-[0.99]",
                      "border-white/10 bg-white/5 hover:bg-white/10",
                      chosen ? "ring-2 ring-cyan-400/30" : "",
                      isCorrect ? "ring-2 ring-emerald-400/30" : "",
                      isWrong ? "ring-2 ring-rose-400/30" : "",
                    ].join(" ")}
                  >
                    <span className="font-bold">{String.fromCharCode(65 + i)}.</span>{" "}
                    <span className="text-white/80">{opt}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      {/* Submit & Result on same page */}
      <Card className="p-4 space-y-3">
        {!submitted ? (
          <>
            <Button onClick={submit} disabled={Object.values(answers).some((v) => v === null)}>
              Submit
            </Button>
            <div className="text-xs text-white/50">
              (You must answer all questions to submit.)
            </div>
          </>
        ) : (
          <>
            <div className="text-sm font-extrabold">Result</div>
            <div className="text-2xl font-extrabold">
              {score.correct} / {score.total}
            </div>
            <div className="text-xs text-white/60">
              Correct answers are highlighted after submission.
            </div>
            <Button variant="ghost" onClick={reset}>
              Take another test
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
