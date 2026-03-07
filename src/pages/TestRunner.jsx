// src/pages/TestRunner.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { sampleMCQ } from "../data/mockData.js";

/* ════════════════════════════════════════════════════════
   STYLES  — mirrors TestSetup exactly
════════════════════════════════════════════════════════ */
const STYLES = `
  @keyframes trFadeUp {
    from { opacity:0; transform:translateY(14px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes trGlow {
    0%,100% { opacity:.55; transform:scale(1);    }
    50%      { opacity:1;   transform:scale(1.18); }
  }
  @keyframes trBarGrow {
    from { width:0%; }
    to   { width:var(--w); }
  }
  @keyframes trPop {
    0%   { transform:scale(.92); opacity:0; }
    60%  { transform:scale(1.04); }
    100% { transform:scale(1);   opacity:1; }
  }
  @keyframes trShake {
    0%,100% { transform:translateX(0);  }
    20%     { transform:translateX(-5px); }
    40%     { transform:translateX( 5px); }
    60%     { transform:translateX(-3px); }
    80%     { transform:translateX( 3px); }
  }
  /* option rows */
  .tr-opt { transition: border-color .15s, background .15s, transform .15s; cursor:pointer; }
  .tr-opt:hover:not(.chosen):not(.locked) {
    border-color: rgba(255,255,255,0.18) !important;
    background:   rgba(255,255,255,0.06) !important;
    transform: translateX(3px);
  }
  .tr-opt.chosen:not(.locked) { animation: trPop   .25s cubic-bezier(.22,1,.36,1) both; }
  .tr-opt.correct              { animation: trPop   .3s  cubic-bezier(.22,1,.36,1) both; }
  .tr-opt.wrong                { animation: trShake .35s ease both; }
  /* buttons */
  .tr-primary { transition: all .18s; }
  .tr-primary:hover:not(:disabled) {
    background: #dc2626 !important;
    box-shadow: 0 8px 32px rgba(239,68,68,.52) !important;
    transform: translateY(-2px);
  }
  .tr-primary:active:not(:disabled) { transform: scale(.97); }
  .tr-ghost { transition: all .15s; }
  .tr-ghost:hover {
    background:   rgba(255,255,255,0.07) !important;
    border-color: rgba(255,255,255,0.15) !important;
  }
`;

const ALPHA = ["A","B","C","D","E"];

function scoreColor(p) { return p>=80?"#22c55e":p>=50?"#f59e0b":"#ef4444"; }
function scoreEmoji(p) { return p>=80?"🏆":p>=60?"👍":p>=40?"😐":"💪"; }

/* ════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════ */
export default function TestRunner() {
  const nav = useNavigate();
  const { state } = useLocation();
  const config = state || { tag:"Basics", difficulty:"Easy", timeMin:10, count:5 };

  const questions = useMemo(() => {
    const filtered = sampleMCQ.filter(q =>
      String(q.tag).toLowerCase().includes(String(config.tag).toLowerCase())
    );
    const pool = filtered.length ? filtered : sampleMCQ;
    return pool.slice(0, Math.min(config.count, pool.length));
  }, [config]);

  const [answers,   setAnswers]   = useState(() => { const o={}; questions.forEach(q=>o[q.id]=null); return o; });
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = useMemo(() => Object.values(answers).filter(v=>v!==null).length, [answers]);
  const allAnswered   = answeredCount === questions.length;
  const progressPct   = questions.length ? Math.round((answeredCount/questions.length)*100) : 0;

  const score = useMemo(() => {
    let correct=0;
    for (const q of questions) if (answers[q.id]===q.answer) correct++;
    const total=questions.length, wrong=total-correct;
    return { correct, wrong, total, pct: total?Math.round((correct/total)*100):0 };
  }, [answers, questions]);

  const onChoose  = (qid,i) => { if(submitted) return; setAnswers(p=>({...p,[qid]:i})); };
  const reset     = () => nav("/test/setup");
  const retrySame = () => { const o={}; questions.forEach(q=>o[q.id]=null); setAnswers(o); setSubmitted(false); };

  return (
    <>
      <style>{STYLES}</style>
      <div style={{ display:"flex", flexDirection:"column", gap:16, paddingBottom:48 }}>

        {/* ══════════════════════════════════════════════════
            HERO  — identical structure to TestSetup hero
        ══════════════════════════════════════════════════ */}
        <div style={{
          position:"relative", overflow:"hidden",
          background:"#0a0c12",
          border:"1px solid rgba(255,255,255,0.07)",
          borderRadius:24, padding:"24px 20px 22px",
          animation:"trFadeUp .5s cubic-bezier(.22,1,.36,1) both",
        }}>
          {/* Ambient glows */}
          <div style={{ position:"absolute", top:-40, left:-30, width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle, rgba(239,68,68,0.14) 0%, transparent 65%)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", bottom:-50, right:-20, width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%)", pointerEvents:"none" }}/>
          {/* Grid */}
          <div style={{ position:"absolute", inset:0, opacity:.025, pointerEvents:"none", backgroundImage:"linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)", backgroundSize:"32px 32px" }}/>

          <div style={{ position:"relative" }}>
            {/* Eyebrow pill */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background: submitted?"rgba(34,197,94,0.10)":"rgba(239,68,68,0.10)", border:`1px solid ${submitted?"rgba(34,197,94,0.22)":"rgba(239,68,68,0.22)"}`, borderRadius:99, padding:"4px 11px", marginBottom:12 }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:submitted?"#22c55e":"#ef4444", animation:"trGlow 2.2s ease-in-out infinite" }}/>
              <span style={{ fontSize:9, fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", color:submitted?"rgba(134,239,172,0.9)":"rgba(252,165,165,0.9)" }}>
                {submitted ? "ফলাফল" : "চলমান টেস্ট"}
              </span>
            </div>
            {/* Title */}
            <div style={{ fontSize:24, fontWeight:900, color:"#f1f5f9", letterSpacing:"-0.5px", lineHeight:1.15, marginBottom:8 }}>
              {submitted ? `${scoreEmoji(score.pct)} ফলাফল দেখুন` : "উত্তর দিন ও জমা দিন"}
            </div>
            {/* Subtitle */}
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.45)", lineHeight:1.6 }}>
              {submitted
                ? `${questions.length} টি প্রশ্নের মধ্যে ${score.correct} টি সঠিক — ${score.pct}% স্কোর।`
                : "প্রতিটি প্রশ্নের উত্তর বাছাই করুন, তারপর নিচে জমা দিন।"
              }
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            PROGRESS SECTION  (before submit only)
        ══════════════════════════════════════════════════ */}
        {!submitted && (
          <Section label="অগ্রগতি" icon="📊" delay={80}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:10 }}>
              <span style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.55)" }}>
                {allAnswered ? "সব উত্তর দেওয়া হয়েছে ✓" : `${questions.length - answeredCount} টি বাকি`}
              </span>
              <span style={{ fontSize:22, fontWeight:900, color:allAnswered?"#86efac":"#f1f5f9", letterSpacing:"-0.5px" }}>
                {answeredCount}<span style={{ fontSize:13, color:"rgba(255,255,255,0.35)", fontWeight:700 }}>/{questions.length}</span>
              </span>
            </div>
            <div style={{ height:8, borderRadius:99, background:"rgba(255,255,255,0.08)", overflow:"hidden" }}>
              <div style={{
                height:"100%", borderRadius:99,
                background: allAnswered
                  ? "linear-gradient(90deg,#22c55e,#86efac)"
                  : "linear-gradient(90deg,#ef4444,#f87171)",
                width:`${progressPct}%`,
                transition:"width .4s cubic-bezier(.22,1,.36,1)",
              }}/>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
              <span style={{ fontSize:9, color:"rgba(255,255,255,0.22)", fontWeight:600 }}>0</span>
              <span style={{ fontSize:9, color:"rgba(255,255,255,0.22)", fontWeight:600 }}>{questions.length}</span>
            </div>
          </Section>
        )}

        {/* ══════════════════════════════════════════════════
            SCORE SECTION  (after submit only)
        ══════════════════════════════════════════════════ */}
        {submitted && (
          <Section label="স্কোর বিশ্লেষণ" icon="🎯" delay={80}>
            {/* Big score */}
            <div style={{ textAlign:"center", padding:"8px 0 16px" }}>
              <div style={{ fontSize:52, fontWeight:900, letterSpacing:"-2px", lineHeight:1, color:scoreColor(score.pct) }}>
                {score.pct}%
              </div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:5, fontWeight:600 }}>
                {score.correct} সঠিক / {score.total} প্রশ্ন
              </div>
            </div>
            {/* Tiles */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:9, marginBottom:18 }}>
              {[
                { label:"সঠিক",  val:score.correct, bg:"rgba(34,197,94,0.10)",  border:"rgba(34,197,94,0.22)",  color:"#86efac"           },
                { label:"ভুল",   val:score.wrong,   bg:"rgba(239,68,68,0.10)",  border:"rgba(239,68,68,0.22)",  color:"#fca5a5"           },
                { label:"মোট",   val:score.total,   bg:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.09)",color:"#f1f5f9"           },
              ].map((s,i)=>(
                <div key={i} style={{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:16, padding:"13px 12px", textAlign:"center" }}>
                  <div style={{ fontSize:9, fontWeight:800, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:6 }}>{s.label}</div>
                  <div style={{ fontSize:24, fontWeight:900, color:s.color, letterSpacing:"-0.5px", lineHeight:1 }}>{s.val}</div>
                </div>
              ))}
            </div>
            {/* Performance bar */}
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.38)" }}>পারফরম্যান্স</span>
                <span style={{ fontSize:10, fontWeight:800, color:scoreColor(score.pct) }}>{score.pct}%</span>
              </div>
              <div style={{ height:8, borderRadius:99, background:"rgba(255,255,255,0.07)", overflow:"hidden" }}>
                <div style={{ height:"100%", borderRadius:99, background:`linear-gradient(90deg,${scoreColor(score.pct)},${scoreColor(score.pct)}99)`, width:`${score.pct}%`, animation:"trBarGrow .8s cubic-bezier(.22,1,.36,1) both", "--w":`${score.pct}%` }}/>
              </div>
            </div>
          </Section>
        )}

        {/* ══════════════════════════════════════════════════
            QUESTIONS
        ══════════════════════════════════════════════════ */}
        <Section label="প্রশ্নসমূহ" icon="📝" delay={160}>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {questions.map((q, qi) => {
              const chosenIdx  = answers[q.id];
              const isCorrectQ = submitted && chosenIdx === q.answer;
              const isWrongQ   = submitted && chosenIdx !== null && chosenIdx !== q.answer;

              return (
                <div key={q.id} style={{
                  background: isCorrectQ?"rgba(34,197,94,0.05)":isWrongQ?"rgba(239,68,68,0.05)":"rgba(255,255,255,0.02)",
                  border:`1px solid ${isCorrectQ?"rgba(34,197,94,0.2)":isWrongQ?"rgba(239,68,68,0.2)":"rgba(255,255,255,0.07)"}`,
                  borderRadius:18, padding:16,
                }}>
                  {/* Q header */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{
                        width:28, height:28, borderRadius:10, flexShrink:0,
                        background: isCorrectQ?"rgba(34,197,94,0.15)":isWrongQ?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.07)",
                        border:`1px solid ${isCorrectQ?"rgba(34,197,94,0.3)":isWrongQ?"rgba(239,68,68,0.3)":"rgba(255,255,255,0.1)"}`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:11, fontWeight:900,
                        color:isCorrectQ?"#86efac":isWrongQ?"#fca5a5":"rgba(255,255,255,0.55)",
                      }}>
                        {qi+1}
                      </div>
                      <span style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.3)" }}>{q.tag}</span>
                    </div>
                    {submitted && (
                      <span style={{
                        fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:99,
                        background:isCorrectQ?"rgba(34,197,94,0.12)":isWrongQ?"rgba(239,68,68,0.12)":"rgba(255,255,255,0.05)",
                        border:`1px solid ${isCorrectQ?"rgba(34,197,94,0.3)":isWrongQ?"rgba(239,68,68,0.3)":"rgba(255,255,255,0.1)"}`,
                        color:isCorrectQ?"#86efac":isWrongQ?"#fca5a5":"rgba(255,255,255,0.4)",
                      }}>
                        {isCorrectQ?"✓ সঠিক":isWrongQ?"✗ ভুল":"উত্তর নেই"}
                      </span>
                    )}
                  </div>

                  {/* Question text */}
                  <div style={{ fontSize:14, fontWeight:800, color:"#f1f5f9", lineHeight:1.6, marginBottom:14 }}>
                    {q.q}
                  </div>

                  {/* Options */}
                  <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                    {q.options.map((opt,i) => {
                      const chosen    = chosenIdx===i;
                      const isCorrect = submitted && i===q.answer;
                      const isWrong   = submitted && chosen && i!==q.answer;

                      let bg="rgba(255,255,255,0.03)",bdr="rgba(255,255,255,0.08)";
                      let lbg="rgba(255,255,255,0.08)",lc="rgba(255,255,255,0.6)",tc="rgba(255,255,255,0.8)";
                      if(chosen&&!submitted){ bg="rgba(239,68,68,0.10)";bdr="rgba(239,68,68,0.35)";lbg="rgba(239,68,68,0.20)";lc="#fca5a5";tc="#fff"; }
                      if(isCorrect)        { bg="rgba(34,197,94,0.08)"; bdr="rgba(34,197,94,0.28)"; lbg="rgba(34,197,94,0.18)"; lc="#86efac";tc="#f1f5f9"; }
                      if(isWrong)          { bg="rgba(239,68,68,0.08)"; bdr="rgba(239,68,68,0.28)"; lbg="rgba(239,68,68,0.18)"; lc="#fca5a5";tc="#f1f5f9"; }

                      return (
                        <button key={i} onClick={()=>onChoose(q.id,i)}
                          className={`tr-opt${chosen&&!submitted?" chosen":""}${isCorrect?" correct":""}${isWrong?" wrong":""}${submitted?" locked":""}`}
                          style={{ display:"flex", alignItems:"center", gap:10, width:"100%", textAlign:"left", background:bg, border:`1px solid ${bdr}`, borderRadius:14, padding:"11px 14px", outline:"none" }}
                        >
                          <div style={{ width:28, height:28, borderRadius:9, flexShrink:0, background:lbg, border:`1px solid ${bdr}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:lc }}>
                            {ALPHA[i]}
                          </div>
                          <span style={{ fontSize:13, fontWeight:600, color:tc, lineHeight:1.45, flex:1 }}>{opt}</span>
                          {isCorrect&&<span style={{ fontSize:14, color:"#86efac", flexShrink:0 }}>✓</span>}
                          {isWrong  &&<span style={{ fontSize:14, color:"#fca5a5", flexShrink:0 }}>✗</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {submitted && q.explain && (
                    <div style={{ marginTop:12, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"13px 14px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:7 }}>
                        <div style={{ width:3, height:12, borderRadius:99, background:"#f59e0b" }}/>
                        <span style={{ fontSize:9, fontWeight:800, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(251,191,36,0.7)" }}>ব্যাখ্যা</span>
                      </div>
                      <div style={{ fontSize:12, color:"rgba(255,255,255,0.65)", lineHeight:1.65, whiteSpace:"pre-line" }}>{q.explain}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════
            SUBMIT / ACTIONS
        ══════════════════════════════════════════════════ */}
        {!submitted ? (
          <div style={{ animation:`trFadeUp .5s cubic-bezier(.22,1,.36,1) 240ms both` }}>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.28)", textAlign:"center", marginBottom:12, fontWeight:500 }}>
              {allAnswered ? "সব প্রশ্নের উত্তর দেওয়া হয়েছে — এখন জমা দিন" : `সব প্রশ্নের উত্তর দিলে জমা দেওয়া যাবে`}
            </div>
            <button className="tr-primary" onClick={()=>setSubmitted(true)} disabled={!allAnswered}
              style={{
                width:"100%", padding:"16px 24px", borderRadius:18,
                background: allAnswered?"linear-gradient(135deg,#ef4444 0%,#c53030 100%)":"rgba(255,255,255,0.05)",
                color:allAnswered?"#fff":"rgba(255,255,255,0.25)",
                fontSize:15, fontWeight:900,
                border:`1px solid ${allAnswered?"#ef4444":"rgba(255,255,255,0.07)"}`,
                cursor:allAnswered?"pointer":"not-allowed",
                boxShadow:allAnswered?"0 4px 24px rgba(239,68,68,0.4)":"none",
                letterSpacing:"-0.2px",
              }}>
              জমা দিন →
            </button>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:9, animation:"trFadeUp .5s cubic-bezier(.22,1,.36,1) both" }}>
            <button className="tr-primary" onClick={reset}
              style={{ width:"100%", padding:"16px 24px", borderRadius:18, background:"linear-gradient(135deg,#ef4444 0%,#c53030 100%)", color:"#fff", fontSize:15, fontWeight:900, border:"1px solid #ef4444", cursor:"pointer", boxShadow:"0 4px 24px rgba(239,68,68,0.4)", letterSpacing:"-0.2px" }}>
              নতুন টেস্ট দিন →
            </button>
            <button className="tr-ghost" onClick={retrySame}
              style={{ width:"100%", padding:"14px 24px", borderRadius:18, background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.65)", fontSize:14, fontWeight:700, border:"1px solid rgba(255,255,255,0.09)", cursor:"pointer" }}>
              একই টেস্ট আবার দিন
            </button>
          </div>
        )}

      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION WRAPPER  — identical to TestSetup
════════════════════════════════════════════════════════ */
function Section({ label, icon, children, delay=0 }) {
  return (
    <div style={{
      background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
      borderRadius:22, padding:"18px 18px",
      animation:`trFadeUp .5s cubic-bezier(.22,1,.36,1) ${delay}ms both`,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
        <div style={{ width:3, height:13, borderRadius:99, background:"#ef4444" }}/>
        <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)" }}>
          {icon}{"  "}{label}
        </span>
      </div>
      {children}
    </div>
  );
}