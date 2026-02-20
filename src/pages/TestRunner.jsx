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
    const filtered = sampleMCQ.filter((q) =>
      String(q.tag).toLowerCase().includes(String(config.tag).toLowerCase())
    );
    const pool = filtered.length ? filtered : sampleMCQ;
    return pool.slice(0, Math.min(config.count, pool.length));
  }, [config]);

  const [answers, setAnswers] = useState(() => {
    const obj = {};
    questions.forEach((q) => (obj[q.id] = null));
    return obj;
  });

  const [submitted, setSubmitted] = useState(false);

  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== null).length,
    [answers]
  );

  const score = useMemo(() => {
    let correct = 0;
    for (const q of questions) if (answers[q.id] === q.answer) correct++;
    const total = questions.length;
    const wrong = total - correct;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    return { correct, wrong, total, pct };
  }, [answers, questions]);

  const onChoose = (qid, idx) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  const submit = () => setSubmitted(true);

  const reset = () => nav("/test/setup");

  const retrySame = () => {
    // reset answers but keep same questions/config (simple)
    const obj = {};
    questions.forEach((q) => (obj[q.id] = null));
    setAnswers(obj);
    setSubmitted(false);
  };

  const allAnswered = answeredCount === questions.length;

  return (
    <div className="space-y-4">
      {/* Sticky Header */}
      <Card className="p-5 sm:p-6 sticky top-3 z-10 border border-white/10 bg-gradient-to-br from-sky-500/15 via-white/5 to-rose-500/10 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-white/60">MCQ Test</div>
            <div className="text-xl font-extrabold tracking-tight text-white">
              Answer & Submit
            </div>
            <div className="mt-1 text-xs text-white/60">
              Tag: {config.tag} • Difficulty: {config.difficulty} • Time:{" "}
              {config.timeMin} min • Q: {questions.length}
            </div>

            {/* Progress bar (before submit) */}
            {!submitted && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] text-white/55">
                  <span>Progress</span>
                  <span className="font-bold text-white/70">
                    {answeredCount}/{questions.length}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400/80 to-emerald-400/80"
                    style={{
                      width: `${questions.length ? (answeredCount / questions.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <Badge>{submitted ? "Submitted" : "In progress"}</Badge>

            {!submitted && (
              <div className="text-[11px] text-white/55">
                Answer all to submit
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Questions */}
      <div className="grid gap-4">
        {questions.map((q, qi) => {
          const chosenIdx = answers[q.id];
          const isCorrectQ = submitted && chosenIdx === q.answer;
          const isWrongQ = submitted && chosenIdx !== null && chosenIdx !== q.answer;

          return (
            <Card
              key={q.id}
              className={[
                "p-5 sm:p-6 border border-white/10",
                "bg-gradient-to-br from-white/8 to-white/0",
                submitted && isCorrectQ ? "ring-2 ring-emerald-400/25" : "",
                submitted && isWrongQ ? "ring-2 ring-rose-400/25" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-xs font-bold text-white/60">
                  Q{qi + 1} • Tag: {q.tag}
                </div>

                {submitted && (
                  <div
                    className={[
                      "text-[11px] font-extrabold px-2.5 py-1 rounded-full border",
                      isCorrectQ
                        ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                        : isWrongQ
                        ? "border-rose-400/25 bg-rose-400/10 text-rose-200"
                        : "border-white/10 bg-white/5 text-white/60",
                    ].join(" ")}
                  >
                    {isCorrectQ ? "Correct" : isWrongQ ? "Wrong" : "Not answered"}
                  </div>
                )}
              </div>

              <div className="mt-2 text-base font-extrabold leading-relaxed text-white">
                {q.q}
              </div>

              <div className="mt-4 grid gap-2">
                {q.options.map((opt, i) => {
                  const chosen = chosenIdx === i;
                  const isCorrect = submitted && i === q.answer;
                  const isWrong = submitted && chosen && i !== q.answer;

                  return (
                    <button
                      key={i}
                      onClick={() => onChoose(q.id, i)}
                      className={[
                        "text-left rounded-2xl border px-4 py-3 text-sm transition active:scale-[0.99]",
                        "border-white/10 bg-white/5 hover:bg-white/10",
                        chosen && !submitted ? "ring-2 ring-sky-400/30" : "",
                        isCorrect ? "border-emerald-400/25 bg-emerald-400/10" : "",
                        isWrong ? "border-rose-400/25 bg-rose-400/10" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={[
                            "min-w-8 h-8 grid place-items-center rounded-xl text-xs font-extrabold",
                            isCorrect
                              ? "bg-emerald-400/15 text-emerald-200"
                              : isWrong
                              ? "bg-rose-400/15 text-rose-200"
                              : "bg-white/10 text-white",
                          ].join(" ")}
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                        <div className="leading-relaxed text-white/85">{opt}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submit (if available) */}
              {submitted && q.explain && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[11px] font-bold text-white/60 mb-2">
                    Explanation
                  </div>
                  <div className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
                    {q.explain}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Footer / Submit / Result */}
      <Card className="p-5 sm:p-6 border border-white/10 bg-white/5">
        {!submitted ? (
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="text-xs text-white/55">
              You must answer all questions to submit.
            </div>

            <Button onClick={submit} disabled={!allAnswered} className="w-full sm:w-auto px-8 py-3">
              Submit
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <div className="text-sm font-extrabold text-white">Result</div>
                <div className="mt-1 text-xs text-white/60">
                  Review the correct answers + explanations below.
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-gradient-to-br from-amber-400/12 to-transparent px-4 py-3">
                <div className="text-[11px] font-bold text-white/60">Score</div>
                <div className="text-2xl font-extrabold text-white">
                  {score.correct}/{score.total}
                </div>
                <div className="text-sm font-extrabold text-amber-200/90">
                  {score.pct}%
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-emerald-400/10 p-4">
                <div className="text-[11px] font-bold text-white/60">Correct</div>
                <div className="mt-1 text-xl font-extrabold text-emerald-200">
                  {score.correct}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-rose-400/10 p-4">
                <div className="text-[11px] font-bold text-white/60">Wrong</div>
                <div className="mt-1 text-xl font-extrabold text-rose-200">
                  {score.wrong}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-[11px] font-bold text-white/60">Total</div>
                <div className="mt-1 text-xl font-extrabold text-white">
                  {score.total}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-white/55">
                <span>Performance</span>
                <span className="font-bold text-white/70">{score.pct}%</span>
              </div>
              <div className="mt-2 h-2.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400/85 to-sky-400/85"
                  style={{ width: `${score.pct}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-1">
              <Button variant="ghost" onClick={retrySame} className="w-full sm:w-auto">
                Retry same test
              </Button>
              <Button onClick={reset} className="w-full sm:w-auto px-8">
                Take another test
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}