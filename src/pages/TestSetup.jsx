// src/pages/TestSetup.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ════════════════════════════════════════════════════════
   STYLES
════════════════════════════════════════════════════════ */
const STYLES = `
  @keyframes tsFadeUp {
    from { opacity:0; transform:translateY(14px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes tsGlow {
    0%,100% { opacity:.55; transform:scale(1);    }
    50%      { opacity:1;   transform:scale(1.18); }
  }
  @keyframes tsPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
    50%      { box-shadow: 0 0 0 6px rgba(239,68,68,0.12); }
  }
  .ts-option { transition: all .18s; }
  .ts-option:hover:not(.selected) {
    border-color: rgba(255,255,255,0.18) !important;
    background:   rgba(255,255,255,0.06) !important;
    transform: translateY(-1px);
  }
  .ts-option.selected { animation: tsPulse 2.5s ease-in-out infinite; }
  .ts-stepper { transition: all .15s; }
  .ts-stepper:hover { background: rgba(255,255,255,0.09) !important; border-color: rgba(255,255,255,0.18) !important; }
  .ts-stepper:active { transform: scale(.93); }
  .ts-start-btn { transition: all .18s; }
  .ts-start-btn:hover { background: #dc2626 !important; box-shadow: 0 8px 32px rgba(239,68,68,.52) !important; transform: translateY(-2px); }
  .ts-start-btn:active { transform: scale(.97); }
  input[type=range] { -webkit-appearance:none; appearance:none; background:transparent; }
  input[type=range]::-webkit-slider-runnable-track {
    height:5px; border-radius:99px;
    background: linear-gradient(to right, #ef4444 var(--pct, 0%), rgba(255,255,255,0.1) var(--pct, 0%));
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance:none; width:18px; height:18px; border-radius:50%;
    background:#fff; margin-top:-6.5px; cursor:pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.5);
    border: 2px solid #ef4444;
  }
  input[type=range]:focus { outline:none; }
`;

/* ════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════ */
const DIFFICULTY_OPTIONS = [
  { value:"Easy",   label:"Easy",    icon:"🟢", desc:"মূল ধারণা" },
  { value:"Medium", label:"Medium", icon:"🟡", desc:"প্রায়োগিক" },
  { value:"Hard",   label:"Hard",  icon:"🔴", desc:"চ্যালেঞ্জ"  },
];

const TAG_OPTIONS = ["Basics", "Units", "Concept", "Formula", "Application", "Mixed"];

const SUMMARY_META = [
  { key:"tag",        icon:"🏷️",  label:"Tags"          },
  { key:"difficulty", icon:"⚡",  label:"Difficulty"         },
  { key:"timeMin",    icon:"⏱️",  label:"Time", suffix:" মিনিট" },
  { key:"count",      icon:"📝",  label:"Quesion"   },
];

/* ════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════ */
export default function TestSetup() {
  const nav = useNavigate();

  const [tag,        setTag]        = useState("Basics");
  const [difficulty, setDifficulty] = useState("Medium");
  const [timeMin,    setTimeMin]    = useState(10);
  const [count,      setCount]      = useState(10);

  const payload = useMemo(() => ({
    tag, difficulty, timeMin: Number(timeMin), count: Number(count),
  }), [tag, difficulty, timeMin, count]);

  const timePct  = Math.round(((timeMin - 1) / 59) * 100);
  const countPct = Math.round(((count - 1)   / 29) * 100);

  const diffObj = DIFFICULTY_OPTIONS.find(d => d.value === difficulty) || DIFFICULTY_OPTIONS[1];

  return (
    <>
      <style>{STYLES}</style>

      <div style={{ display:"flex", flexDirection:"column", gap:16, paddingBottom:40 }}>

        {/* ══ HERO HEADER ══════════════════════════════════════ */}
        <div style={{
          position:"relative", overflow:"hidden",
          background:"#0a0c12",
          border:"1px solid rgba(255,255,255,0.07)",
          borderRadius:24, padding:"24px 20px 22px",
          animation:"tsFadeUp .5s cubic-bezier(.22,1,.36,1) both",
        }}>
          {/* Ambient glows */}
          <div style={{ position:"absolute", top:-40, left:-30, width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle, rgba(239,68,68,0.14) 0%, transparent 65%)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", bottom:-50, right:-20, width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%)", pointerEvents:"none" }}/>
          {/* Grid */}
          <div style={{ position:"absolute", inset:0, opacity:.025, pointerEvents:"none", backgroundImage:"linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)", backgroundSize:"32px 32px" }}/>

          <div style={{ position:"relative" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.22)", borderRadius:99, padding:"4px 11px", marginBottom:12 }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:"#ef4444", animation:"tsGlow 2.2s ease-in-out infinite" }}/>
              <span style={{ fontSize:9, fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(252,165,165,0.9)" }}>
                Test Setup
              </span>
            </div>
            <div style={{ fontSize:24, fontWeight:900, color:"#f1f5f9", letterSpacing:"-0.5px", lineHeight:1.15, marginBottom:8 }}>
              পরীক্ষার ধরন বাছাই করুন
            </div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.45)", lineHeight:1.6 }}>
              Tags, Difficulty ও Time নির্ধারণ করে টেস্ট শুরু করুন।
            </div>
          </div>
        </div>

        {/* ══ DIFFICULTY SELECTOR ══════════════════════════════ */}
        <Section label="Difficulty Level" icon="⚡" delay={80}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:9 }}>
            {DIFFICULTY_OPTIONS.map((opt) => {
              const active = difficulty === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setDifficulty(opt.value)}
                  className={`ts-option${active ? " selected" : ""}`}
                  style={{
                    display:"flex", flexDirection:"column", alignItems:"center", gap:6,
                    padding:"14px 8px", borderRadius:18, cursor:"pointer",
                    background: active ? "rgba(239,68,68,0.1)"   : "rgba(255,255,255,0.03)",
                    border:     active ? "1px solid rgba(239,68,68,0.35)" : "1px solid rgba(255,255,255,0.07)",
                    outline:"none",
                  }}
                >
                  <span style={{ fontSize:20 }}>{opt.icon}</span>
                  <span style={{ fontSize:12, fontWeight:800, color: active ? "#fca5a5" : "rgba(255,255,255,0.75)" }}>
                    {opt.label}
                  </span>
                  <span style={{ fontSize:9, fontWeight:600, color:"rgba(255,255,255,0.35)" }}>
                    {opt.desc}
                  </span>
                  {active && (
                    <div style={{ width:20, height:2, borderRadius:99, background:"#ef4444" }}/>
                  )}
                </button>
              );
            })}
          </div>
        </Section>

        {/* ══ TAG SELECTOR ═════════════════════════════════════ */}
        <Section label="Select Tags" icon="🏷️" delay={140}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {TAG_OPTIONS.map((t) => {
              const active = tag === t;
              return (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`ts-option${active ? " selected" : ""}`}
                  style={{
                    padding:"8px 16px", borderRadius:99, cursor:"pointer",
                    background: active ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.04)",
                    border:     active ? "1px solid rgba(239,68,68,0.35)" : "1px solid rgba(255,255,255,0.08)",
                    fontSize:12, fontWeight:700,
                    color: active ? "#fca5a5" : "rgba(255,255,255,0.6)",
                    outline:"none",
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </Section>

        {/* ══ SLIDERS ══════════════════════════════════════════ */}
        <Section label="Time & Question" icon="🎚️" delay={200}>
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

            {/* Time slider */}
            <SliderField
              label="সময়"
              value={timeMin}
              min={1} max={60}
              pct={timePct}
              display={`${timeMin} মিনিট`}
              onChange={setTimeMin}
            />

            {/* Count slider */}
            <SliderField
              label="প্রশ্নসংখ্যা"
              value={count}
              min={1} max={30}
              pct={countPct}
              display={`${count} টি`}
              onChange={setCount}
            />
          </div>
        </Section>

        {/* ══ SUMMARY ══════════════════════════════════════════ */}
        <div style={{
          background:"linear-gradient(135deg, rgba(239,68,68,0.07) 0%, rgba(255,255,255,0.02) 60%, rgba(99,102,241,0.05) 100%)",
          border:"1px solid rgba(255,255,255,0.07)",
          borderRadius:22, padding:"18px 18px",
          animation:`tsFadeUp .5s cubic-bezier(.22,1,.36,1) ${260}ms both`,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:14 }}>
            <div style={{ width:3, height:13, borderRadius:99, background:"#ef4444" }}/>
            <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)" }}>Summary</span>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:9 }}>
            {SUMMARY_META.map((m) => {
              const val = payload[m.key];
              return (
                <div key={m.key} style={{
                  background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
                  borderRadius:14, padding:"12px 14px",
                }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:5 }}>
                    {m.icon}{"  "}{m.label}
                  </div>
                  <div style={{ fontSize:15, fontWeight:900, color:"#f1f5f9", letterSpacing:"-0.2px" }}>
                    {val}{m.suffix || ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ START BTN ════════════════════════════════════════ */}
        <div style={{ animation:`tsFadeUp .5s cubic-bezier(.22,1,.36,1) 320ms both` }}>
          {/* Note */}
          {/* <div style={{ fontSize:10, color:"rgba(255,255,255,0.28)", textAlign:"center", marginBottom:12, fontWeight:500 }}>
            প্রশ্নগুলো লোকাল সample ডেটা থেকে তৈরি হবে (ফ্রন্টএন্ড মক)
          </div> */}

          <button
            className="ts-start-btn"
            onClick={() => nav("/test/run", { state: payload })}
            style={{
              width:"100%", padding:"16px 24px", borderRadius:18,
              background:"linear-gradient(135deg, #ef4444 0%, #c53030 100%)",
              color:"#fff", fontSize:15, fontWeight:900,
              border:"1px solid #ef4444", cursor:"pointer",
              letterSpacing:"-0.2px",
              boxShadow:"0 4px 24px rgba(239,68,68,0.4)",
            }}
          >
            টেস্ট শুরু করুন →
          </button>
        </div>

      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION WRAPPER
════════════════════════════════════════════════════════ */
function Section({ label, icon, children, delay = 0 }) {
  return (
    <div style={{
      background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
      borderRadius:22, padding:"18px 18px",
      animation:`tsFadeUp .5s cubic-bezier(.22,1,.36,1) ${delay}ms both`,
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

/* ════════════════════════════════════════════════════════
   SLIDER FIELD
════════════════════════════════════════════════════════ */
function SliderField({ label, value, min, max, pct, display, onChange }) {
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:10 }}>
        <span style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.55)" }}>{label}</span>
        <span style={{ fontSize:16, fontWeight:900, color:"#f1f5f9", letterSpacing:"-0.3px" }}>{display}</span>
      </div>
      <input
        type="range"
        min={min} max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width:"100%", height:5, cursor:"pointer", "--pct":`${pct}%` }}
      />
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
        <span style={{ fontSize:9, color:"rgba(255,255,255,0.22)", fontWeight:600 }}>{min}</span>
        <span style={{ fontSize:9, color:"rgba(255,255,255,0.22)", fontWeight:600 }}>{max}</span>
      </div>
    </div>
  );
}