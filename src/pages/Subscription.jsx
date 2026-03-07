// src/pages/Subscription.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { homeCourses, presetBundles, subscriptionYears, user } from "../data/mockData.js";

/* ─── helpers ──────────────────────────────────────────────────── */
function money(n) { return Number(n || 0).toLocaleString(); }

const PAGE_SIZE = 5;

const TABS = [
  { value: "single", label: "একক বই",     icon: "📖" },
  { value: "bundle", label: "বান্ডেল বই", icon: "📦" },
  { value: "preset", label: "প্রিসেট",     icon: "⚡" },
];

const CLASS_OPTIONS = [
  { value: "all",       label: "সব ক্লাস"  },
  { value: "admission", label: "Admission"  },
  { value: "hsc",       label: "HSC"        },
  { value: "ssc",       label: "SSC"        },
];

const CATEGORY_OPTIONS = [
  { value: "all",               label: "সব ক্যাটাগরি"           },
  { value: "quick_preparation", label: "কুইক প্রিপারেশন"        },
  { value: "guide",             label: "গাইড"                   },
  { value: "understanding",     label: "আন্ডারস্ট্যান্ডিং সিরিজ" },
  { value: "test_paper",        label: "টেস্ট পেপার"            },
];

function classLabel(v)    { return { admission:"ভর্তি", hsc:"এইচএসসি", ssc:"এসএসসি" }[v] || "সব"; }
function categoryLabel(v) { return { quick_preparation:"কুইক প্রিপ", guide:"গাইড", understanding:"আন্ডারস্ট্যান্ডিং", test_paper:"টেস্ট পেপার" }[v] || "সব"; }

/* ════════════════════════════════════════════════════════════════
   PROMO CODES  — demo data
════════════════════════════════════════════════════════════════ */
const PROMOS = [
  {
    code:        "WELCOME20",
    label:       "নতুন শিক্ষার্থী",
    desc:        "প্রথমবার কিনলে ২০% ছাড়",
    discount:    0.20,
    type:        "percent",
    color:       "#ef4444",
    colorDim:    "rgba(239,68,68,0.12)",
    colorBorder: "rgba(239,68,68,0.30)",
    colorLight:  "#fca5a5",
    icon:        "🎉",
  },
  {
    code:        "HSC2026",
    label:       "HSC ব্যাচ ২০২৬",
    desc:        "HSC পরীক্ষার্থীদের জন্য ১৫% ছাড়",
    discount:    0.15,
    type:        "percent",
    color:       "#6366f1",
    colorDim:    "rgba(99,102,241,0.12)",
    colorBorder: "rgba(99,102,241,0.30)",
    colorLight:  "#c7d2fe",
    icon:        "📘",
  },
  {
    code:        "FLAT100",
    label:       "ফ্ল্যাট ডিসকাউন্ট",
    desc:        "যেকোনো অর্ডারে ১০০ টাকা ছাড়",
    discount:    100,
    type:        "flat",
    color:       "#22c55e",
    colorDim:    "rgba(34,197,94,0.12)",
    colorBorder: "rgba(34,197,94,0.30)",
    colorLight:  "#86efac",
    icon:        "💚",
  },
];

function applyPromo(base, promo) {
  if (!promo) return 0;
  if (promo.type === "percent") return base * promo.discount;
  if (promo.type === "flat")    return Math.min(promo.discount, base);
  return 0;
}

/* ════════════════════════════════════════════════════════════════
   DESIGN TOKENS
════════════════════════════════════════════════════════════════ */
const T = {
  bg:        "#08090c",
  surface:   "#0c0e14",
  card:      "#101218",
  card2:     "#161a24",
  card3:     "#1c2030",
  border:    "#1e2235",
  border2:   "#252c40",
  border3:   "#2e3650",
  text:      "#f1f5f9",
  textMid:   "#cbd5e1",
  textDim:   "#94a3b8",
  textFade:  "#64748b",
  textGhost: "#334155",
  red:       "#ef4444",
  redDeep:   "#1e0a0d",
  redDark:   "#2d0f14",
  redLight:  "#fca5a5",
  green:     "#22c55e",
  greenDark: "#052e16",
  greenMid:  "#86efac",
};

/* ════════════════════════════════════════════════════════════════
   GLOBAL STYLES
════════════════════════════════════════════════════════════════ */
const STYLES = `
  @keyframes subFadeUp {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes subGlow {
    0%,100% { opacity:.5; } 50% { opacity:1; }
  }
  @keyframes subSlideIn {
    from { opacity:0; transform:translateX(-8px); }
    to   { opacity:1; transform:translateX(0);    }
  }
  @keyframes subBounce {
    0%,100% { transform:scale(1); }
    40%      { transform:scale(1.08); }
    70%      { transform:scale(.96); }
  }
  .sub-card-hover { transition: border-color .18s, background .18s; }
  .sub-card-hover:hover { border-color:${T.border3} !important; background:${T.card2} !important; }
  .sub-row-hover  { transition: all .15s; }
  .sub-row-hover:hover { background:${T.card3} !important; border-color:${T.border3} !important; }
  .sub-tab-btn { transition: all .18s; }
  .sub-tab-btn:hover:not(.active) { background:${T.card3} !important; border-color:${T.border3} !important; }
  .sub-pri-btn { transition: all .15s; }
  .sub-pri-btn:hover:not(:disabled) { background:#dc2626 !important; box-shadow:0 6px 24px ${T.red}55 !important; transform:translateY(-1px); }
  .sub-pri-btn:active:not(:disabled) { transform:scale(.98); }
  .sub-ghost-btn { transition: all .15s; }
  .sub-ghost-btn:hover { background:${T.card3} !important; border-color:${T.border3} !important; }
  .promo-tile { transition: all .18s; cursor:pointer; }
  .promo-tile:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.4) !important; }
  .promo-tile:active { transform:scale(.97); }
  .promo-apply-btn { transition: all .15s; }
  .promo-apply-btn:hover:not(:disabled) { opacity:.85; }
  input::placeholder { color:${T.textGhost}; }
  input:focus { border-color:${T.border3} !important; outline:none; }
  select { color-scheme:dark; }
  select:focus { border-color:${T.border3} !important; outline:none; }
  .no-scrollbar::-webkit-scrollbar { display:none; }
  .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
`;

/* ════════════════════════════════════════════════════════════════
   ATOMS
════════════════════════════════════════════════════════════════ */
const Pill = ({ children, color=T.textGhost, bg=T.card3, border=T.border2, style }) => (
  <span style={{ display:"inline-flex", alignItems:"center", background:bg, border:`1px solid ${border}`, borderRadius:99, padding:"3px 10px", fontSize:10, fontWeight:700, color, ...style }}>
    {children}
  </span>
);

const SLabel = ({ children, right }) => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
    <span style={{ display:"flex", alignItems:"center", gap:7 }}>
      <span style={{ display:"inline-block", width:3, height:13, borderRadius:99, background:T.red, flexShrink:0 }}/>
      <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.15em", textTransform:"uppercase", color:T.textFade }}>{children}</span>
    </span>
    {right && <span style={{ fontSize:11, color:T.textFade, fontWeight:600 }}>{right}</span>}
  </div>
);

const Card = ({ children, style, className="" }) => (
  <div className={`sub-card-hover ${className}`} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:22, padding:16, marginBottom:12, ...style }}>
    {children}
  </div>
);

const StyledSelect = ({ value, onChange, children, label }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
    {label && <span style={{ fontSize:9, fontWeight:800, letterSpacing:"0.15em", textTransform:"uppercase", color:T.textGhost }}>{label}</span>}
    <div style={{ position:"relative" }}>
      <select value={value} onChange={onChange} style={{ width:"100%", background:T.card2, border:`1px solid ${T.border2}`, borderRadius:13, padding:"10px 36px 10px 13px", color:T.textMid, fontSize:13, fontWeight:500, outline:"none", appearance:"none", cursor:"pointer" }}>
        {children}
      </select>
      <svg style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", width:14, height:14, color:T.textGhost, pointerEvents:"none" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </div>
);

const SearchBox = ({ value, onChange }) => (
  <div style={{ position:"relative" }}>
    <svg style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", width:15, height:15, color:T.textGhost, pointerEvents:"none" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
    <input value={value} onChange={onChange} placeholder="বইয়ের নাম লিখুন…" style={{ width:"100%", background:T.card2, border:`1px solid ${T.border2}`, borderRadius:13, padding:"10px 36px 10px 40px", color:T.textMid, fontSize:13, outline:"none", boxSizing:"border-box" }}/>
    {value && <button onClick={()=>onChange({target:{value:""}})} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", color:T.textFade, background:"none", border:"none", cursor:"pointer", fontSize:14, padding:2, lineHeight:1 }}>✕</button>}
  </div>
);

const PrimaryBtn = ({ children, onClick, disabled, full }) => (
  <button className="sub-pri-btn" onClick={onClick} disabled={disabled} style={{ width:full?"100%":"auto", padding:"13px 22px", borderRadius:14, background:disabled?T.card3:`linear-gradient(135deg,${T.red} 0%,#c53030 100%)`, color:disabled?T.textGhost:"#fff", fontSize:14, fontWeight:800, border:`1px solid ${disabled?T.border2:T.red}`, cursor:disabled?"not-allowed":"pointer", boxShadow:disabled?"none":`0 4px 20px ${T.red}44`, letterSpacing:"-0.2px" }}>
    {children}
  </button>
);

const GhostBtn = ({ children, onClick }) => (
  <button className="sub-ghost-btn" onClick={onClick} style={{ padding:"12px 18px", borderRadius:14, background:T.card2, color:T.textDim, fontSize:13, fontWeight:700, border:`1px solid ${T.border2}`, cursor:"pointer" }}>
    {children}
  </button>
);

/* ════════════════════════════════════════════════════════════════
   PROMO SECTION
════════════════════════════════════════════════════════════════ */
const PromoSection = ({ base, appliedPromo, onApply, onRemove }) => {
  const [input,  setInput]  = useState("");
  const [error,  setError]  = useState("");
  const [shake,  setShake]  = useState(false);

  const tryApply = (code) => {
    const found = PROMOS.find(p => p.code.toUpperCase() === code.trim().toUpperCase());
    if (found) {
      onApply(found);
      setInput("");
      setError("");
    } else {
      setError("কোডটি সঠিক নয় বা মেয়াদ শেষ হয়েছে");
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  const discountAmt = appliedPromo ? applyPromo(base, appliedPromo) : 0;

  return (
    <div style={{ marginBottom:12 }}>

      {/* ── Section header ── */}
      <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:12 }}>
        <div style={{ width:3, height:13, borderRadius:99, background:T.red }}/>
        <span style={{ fontSize:10, fontWeight:800, letterSpacing:"0.15em", textTransform:"uppercase", color:T.textFade }}>
          🏷️  প্রোমো কোড
        </span>
      </div>

      {/* ── Available promo tiles ── */}
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
        {PROMOS.map((p) => {
          const isActive = appliedPromo?.code === p.code;
          return (
            <button
              key={p.code}
              className="promo-tile"
              onClick={() => isActive ? onRemove() : onApply(p)}
              style={{
                display:"flex", alignItems:"center", gap:12, width:"100%", textAlign:"left",
                background: isActive ? p.colorDim : "rgba(255,255,255,0.025)",
                border:`1px solid ${isActive ? p.colorBorder : "rgba(255,255,255,0.07)"}`,
                borderRadius:16, padding:"12px 14px", outline:"none",
                boxShadow: isActive ? `0 0 0 1px ${p.color}18, 0 4px 20px ${p.color}15` : "none",
                animation: isActive ? "subBounce .35s ease both" : "none",
              }}
            >
              {/* Left: dashed coupon stub */}
              <div style={{
                width:52, height:52, borderRadius:12, flexShrink:0,
                background: isActive ? p.colorDim : "rgba(255,255,255,0.04)",
                border:`1.5px dashed ${isActive ? p.colorBorder : "rgba(255,255,255,0.12)"}`,
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2,
              }}>
                <span style={{ fontSize:20, lineHeight:1 }}>{p.icon}</span>
              </div>

              {/* Middle: info */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
                  {/* Code badge — monospace feel */}
                  <span style={{
                    fontFamily:"monospace", fontSize:12, fontWeight:900,
                    letterSpacing:"0.08em", color: isActive ? p.colorLight : T.textMid,
                    background: isActive ? `${p.color}18` : "rgba(255,255,255,0.06)",
                    border:`1px solid ${isActive ? p.colorBorder : "rgba(255,255,255,0.1)"}`,
                    borderRadius:7, padding:"2px 8px",
                  }}>
                    {p.code}
                  </span>
                  <span style={{
                    fontSize:9, fontWeight:700, color: isActive ? p.colorLight : T.textFade,
                    background: isActive ? `${p.color}15` : "transparent",
                    border:`1px solid ${isActive ? p.colorBorder : "transparent"}`,
                    borderRadius:99, padding: isActive ? "1px 7px" : "0",
                  }}>
                    {p.label}
                  </span>
                </div>
                <div style={{ fontSize:11, color: isActive ? `${p.colorLight}cc` : T.textFade, fontWeight:500, lineHeight:1.4 }}>
                  {p.desc}
                </div>
                {isActive && base > 0 && (
                  <div style={{ fontSize:11, fontWeight:800, color:p.colorLight, marginTop:4, animation:"subSlideIn .2s ease both" }}>
                    − ৳ {money(discountAmt.toFixed(0))} সাশ্রয় হচ্ছে
                  </div>
                )}
              </div>

              {/* Right: toggle */}
              <div style={{
                width:28, height:28, borderRadius:"50%", flexShrink:0,
                background: isActive ? p.color : "transparent",
                border:`2px solid ${isActive ? p.color : T.textGhost}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all .15s",
              }}>
                {isActive
                  ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <span style={{ fontSize:11, color:T.textGhost, lineHeight:1 }}>+</span>
                }
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Manual code input ── */}
      <div style={{
        background:"rgba(255,255,255,0.02)", border:`1px dashed rgba(255,255,255,0.10)`,
        borderRadius:16, padding:"14px 14px",
      }}>
        <div style={{ fontSize:11, fontWeight:700, color:T.textFade, marginBottom:10 }}>
          অন্য কোড আছে? এখানে লিখুন
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <input
            value={input}
            onChange={e => { setInput(e.target.value.toUpperCase()); setError(""); }}
            onKeyDown={e => e.key==="Enter" && input && tryApply(input)}
            placeholder="PROMO CODE"
            style={{
              flex:1, background:T.card2, border:`1px solid ${error?"rgba(239,68,68,0.4)":T.border2}`,
              borderRadius:11, padding:"10px 13px", color:T.textMid,
              fontFamily:"monospace", fontSize:13, fontWeight:700, letterSpacing:"0.06em",
              outline:"none", boxSizing:"border-box",
              animation: shake ? "subBounce .35s ease both" : "none",
            }}
          />
          <button
            className="promo-apply-btn"
            onClick={() => input && tryApply(input)}
            disabled={!input}
            style={{
              padding:"10px 18px", borderRadius:11, flexShrink:0,
              background:input?`linear-gradient(135deg,${T.red},#c53030)`:"rgba(255,255,255,0.05)",
              color:input?"#fff":T.textGhost, fontSize:12, fontWeight:800,
              border:`1px solid ${input?T.red:T.border2}`, cursor:input?"pointer":"not-allowed",
              boxShadow:input?`0 4px 14px ${T.red}44`:"none",
            }}
          >
            প্রয়োগ করুন
          </button>
        </div>
        {error && (
          <div style={{ marginTop:7, fontSize:11, color:"#fca5a5", fontWeight:600, display:"flex", alignItems:"center", gap:5, animation:"subSlideIn .2s ease both" }}>
            <span>⚠️</span> {error}
          </div>
        )}
      </div>

      {/* ── Applied banner ── */}
      {appliedPromo && (
        <div style={{
          marginTop:10, display:"flex", alignItems:"center", justifyContent:"space-between",
          background:`${appliedPromo.color}12`, border:`1px solid ${appliedPromo.colorBorder}`,
          borderRadius:13, padding:"10px 14px",
          animation:"subSlideIn .25s ease both",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:14 }}>✅</span>
            <span style={{ fontSize:12, fontWeight:700, color:appliedPromo.colorLight }}>
              <span style={{ fontFamily:"monospace", letterSpacing:"0.05em" }}>{appliedPromo.code}</span> প্রয়োগ হয়েছে
            </span>
          </div>
          <button onClick={onRemove} style={{ fontSize:10, fontWeight:800, color:T.textFade, background:"rgba(255,255,255,0.06)", border:`1px solid rgba(255,255,255,0.1)`, borderRadius:99, padding:"3px 10px", cursor:"pointer" }}>
            সরান
          </button>
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   FILTER BAR
════════════════════════════════════════════════════════════════ */
const FilterBar = ({ query, setQuery, classFilter, setClassFilter, categoryFilter, setCategoryFilter, sortBy, setSortBy }) => {
  const hasFilter = classFilter!=="all" || categoryFilter!=="all" || query || sortBy!=="popular";
  return (
    <Card>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <span style={{ fontSize:13, fontWeight:700, color:T.textMid }}>বই খুঁজুন</span>
        {hasFilter && <button onClick={()=>{setQuery("");setClassFilter("all");setCategoryFilter("all");setSortBy("popular");}} style={{ fontSize:11, fontWeight:700, color:T.textDim, background:T.card2, border:`1px solid ${T.border2}`, borderRadius:20, padding:"4px 12px", cursor:"pointer" }}>✕ রিসেট</button>}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
        <SearchBox value={query} onChange={e=>setQuery(e.target.value)}/>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
          <StyledSelect label="ক্লাস" value={classFilter} onChange={e=>setClassFilter(e.target.value)}>
            {CLASS_OPTIONS.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
          </StyledSelect>
          <StyledSelect label="ক্যাটাগরি" value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)}>
            {CATEGORY_OPTIONS.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
          </StyledSelect>
        </div>
        <StyledSelect label="সাজান" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
          <option value="popular">জনপ্রিয়তা অনুযায়ী</option>
          <option value="priceLow">দাম: কম → বেশি</option>
          <option value="priceHigh">দাম: বেশি → কম</option>
          <option value="name">নাম: A → Z</option>
        </StyledSelect>
      </div>
      {hasFilter && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:10 }}>
          {classFilter!=="all"    && <Pill bg={T.redDeep} border={`${T.red}33`} color={T.redLight}>{classLabel(classFilter)}</Pill>}
          {categoryFilter!=="all" && <Pill bg={T.redDeep} border={`${T.red}33`} color={T.redLight}>{categoryLabel(categoryFilter)}</Pill>}
          {query && <Pill bg={T.redDeep} border={`${T.red}33`} color={T.redLight}>"{query}"</Pill>}
        </div>
      )}
    </Card>
  );
};

/* ════════════════════════════════════════════════════════════════
   PAGER
════════════════════════════════════════════════════════════════ */
const Pager = ({ page, totalPages, onPrev, onNext, total }) => {
  if (totalPages<=1) return null;
  const start=(page-1)*PAGE_SIZE+1, end=Math.min(page*PAGE_SIZE,total);
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:14, paddingTop:13, borderTop:`1px dashed ${T.border}` }}>
      <span style={{ fontSize:11, color:T.textGhost, fontWeight:500 }}>{start}–{end} / {total}</span>
      <div style={{ display:"flex", gap:6, alignItems:"center" }}>
        {[{label:"←",disabled:page<=1,onClick:onPrev},{label:`${page}/${totalPages}`,disabled:true,accent:true},{label:"→",disabled:page>=totalPages,onClick:onNext}].map((b,i)=>(
          <button key={i} onClick={b.onClick} disabled={b.disabled&&!b.accent} style={{ padding:b.accent?"6px 13px":"6px 12px", borderRadius:10, border:`1px solid ${b.accent?`${T.red}44`:T.border2}`, background:b.accent?T.redDeep:(b.disabled?T.card:T.card2), color:b.accent?T.redLight:(b.disabled?T.textGhost:T.textMid), fontSize:12, fontWeight:800, cursor:(b.disabled&&!b.accent)?"not-allowed":"pointer" }}>
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   COURSE ROW
════════════════════════════════════════════════════════════════ */
const CourseRow = ({ c, active, onClick }) => (
  <button onClick={onClick} className="sub-row-hover" style={{ display:"flex", alignItems:"center", gap:12, width:"100%", textAlign:"left", background:active?T.redDeep:T.card2, border:`1px solid ${active?`${T.red}50`:T.border}`, borderRadius:16, padding:12, cursor:"pointer", outline:"none", boxShadow:active?`0 0 0 1px ${T.red}20, 0 4px 16px ${T.red}18`:"none" }}>
    <div style={{ width:56, height:56, borderRadius:12, overflow:"hidden", flexShrink:0, background:T.card3, border:`1px solid ${T.border}` }}>
      <img src={c.image} alt={c.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{e.currentTarget.style.display="none";}}/>
    </div>
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ color:T.text, fontSize:13, fontWeight:700, lineHeight:1.3, marginBottom:4, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.name}</div>
      <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap" }}>
        <Pill>{c.validity}</Pill>
        <Pill>{classLabel(c.category)}</Pill>
        <span style={{ marginLeft:"auto", fontSize:14, fontWeight:800, color:active?T.redLight:T.text }}>৳ {money(c.price)}</span>
      </div>
    </div>
    <div style={{ width:24, height:24, borderRadius:"50%", flexShrink:0, background:active?T.red:"transparent", border:`2px solid ${active?T.red:T.textGhost}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .15s" }}>
      {active && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
    </div>
  </button>
);

/* ════════════════════════════════════════════════════════════════
   SUMMARY TABLE
════════════════════════════════════════════════════════════════ */
const SummaryTable = ({ rows, promoRow, totalLabel, totalValue }) => (
  <div style={{ background:T.card2, border:`1px solid ${T.border}`, borderRadius:18, overflow:"hidden" }}>
    {rows.map((r,i)=>(
      <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 15px", borderBottom:`1px solid ${T.border}` }}>
        <span style={{ fontSize:12, color:T.textFade }}>{r.label}</span>
        <span style={{ fontSize:12, color:r.color||T.textMid, fontWeight:r.bold?700:500, maxWidth:"58%", textAlign:"right", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.value}</span>
      </div>
    ))}
    {promoRow && (
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 15px", borderBottom:`1px solid ${T.border}`, background:promoRow.bg||"rgba(34,197,94,0.08)" }}>
        <span style={{ fontSize:11, color:promoRow.color||T.greenMid, fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontFamily:"monospace", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:5, padding:"1px 6px", fontSize:10 }}>{promoRow.code}</span>
          {promoRow.label}
        </span>
        <span style={{ fontSize:13, color:promoRow.color||T.green, fontWeight:800 }}>{promoRow.value}</span>
      </div>
    )}
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"15px 15px", background:`linear-gradient(90deg,${T.redDeep} 0%,${T.card3} 100%)`, borderTop:`1px solid ${T.border}` }}>
      <span style={{ fontSize:12, color:T.textDim, fontWeight:700 }}>{totalLabel}</span>
      <span style={{ fontSize:22, color:T.text, fontWeight:800, letterSpacing:"-0.5px" }}>{totalValue}</span>
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════════════ */
export default function Subscription() {
  const location = useLocation();
  const [tab, setTab] = useState("single");

  const [query,          setQuery]          = useState("");
  const [sortBy,         setSortBy]         = useState("popular");
  const [classFilter,    setClassFilter]    = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [pageSingle,     setPageSingle]     = useState(1);
  const [pageBundle,     setPageBundle]     = useState(1);
  const [pagePreset,     setPagePreset]     = useState(1);

  const [singleCourseId, setSingleCourseId] = useState(homeCourses[0]?.id||"");
  const [singleYear]                        = useState(subscriptionYears[0]||"2025");
  const singleCourse = useMemo(()=>homeCourses.find(c=>c.id===singleCourseId),[singleCourseId]);

  const [bundleName,    setBundleName]    = useState("");
  const [selected,      setSelected]      = useState(()=>new Set());
  const [appliedPromo,  setAppliedPromo]  = useState(null);

  /* single promo */
  const [singlePromo, setSinglePromo] = useState(null);

  /* deep-link */
  useEffect(()=>{
    const qs=new URLSearchParams(location.search);
    const bundleId=qs.get("bundle");
    if(!bundleId) return;
    const pb=presetBundles.find(b=>b.id===bundleId);
    if(!pb) return;
    setTab("bundle"); setBundleName(pb.name); setSelected(new Set(pb.courseIds));
    setQuery(""); setClassFilter("all"); setCategoryFilter("all"); setSortBy("popular"); setPageBundle(1);
  },[location.search]);

  const selectedCourses = useMemo(()=>homeCourses.filter(c=>selected.has(c.id)),[selected]);
  const bundleBase      = useMemo(()=>selectedCourses.reduce((s,c)=>s+Number(c.price||0),0),[selectedCourses]);
  const promoDiscount   = useMemo(()=>applyPromo(bundleBase,appliedPromo),[bundleBase,appliedPromo]);
  const bundleFinal     = Math.max(0, bundleBase - promoDiscount);

  const singleDiscount  = useMemo(()=>applyPromo(Number(singleCourse?.price||0),singlePromo),[singleCourse,singlePromo]);
  const singleFinal     = Math.max(0, Number(singleCourse?.price||0) - singleDiscount);

  const toggleCourse = id=>setSelected(prev=>{ const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });

  const filteredCourses = useMemo(()=>{
    const q=query.trim().toLowerCase();
    let list=[...homeCourses];
    if(classFilter!=="all")    list=list.filter(c=>c.category===classFilter);
    if(categoryFilter!=="all") list=list.filter(c=>c.subcategory===categoryFilter);
    if(q) list=list.filter(c=>String(c.name||"").toLowerCase().includes(q)||String(c.desc||"").toLowerCase().includes(q));
    if(sortBy==="priceLow")  list.sort((a,b)=>(a.price||0)-(b.price||0));
    if(sortBy==="priceHigh") list.sort((a,b)=>(b.price||0)-(a.price||0));
    if(sortBy==="name")      list.sort((a,b)=>String(a.name).localeCompare(String(b.name)));
    return list;
  },[query,sortBy,classFilter,categoryFilter]);

  useEffect(()=>{ setPageSingle(1); setPageBundle(1); },[query,sortBy,classFilter,categoryFilter]);

  const totalPages      = Math.max(1,Math.ceil(filteredCourses.length/PAGE_SIZE));
  const singlePageItems = useMemo(()=>filteredCourses.slice((pageSingle-1)*PAGE_SIZE,pageSingle*PAGE_SIZE),[filteredCourses,pageSingle]);
  const bundlePageItems = useMemo(()=>filteredCourses.slice((pageBundle-1)*PAGE_SIZE,pageBundle*PAGE_SIZE),[filteredCourses,pageBundle]);

  const presetExpanded  = useMemo(()=>presetBundles.map(b=>{
    const courses=homeCourses.filter(c=>b.courseIds.includes(c.id));
    const base=courses.reduce((s,c)=>s+Number(c.price||0),0);
    return { ...b, courses, base };
  }),[]);
  const presetTotal     = Math.max(1,Math.ceil(presetExpanded.length/PAGE_SIZE));
  const presetPageItems = useMemo(()=>presetExpanded.slice((pagePreset-1)*PAGE_SIZE,pagePreset*PAGE_SIZE),[presetExpanded,pagePreset]);

  const canCreateBundle = bundleName.trim().length>=2 && selectedCourses.length>=1;

  const buySingle    = ()=>alert(`একক সাবস্ক্রিপশন\nবই: ${singleCourse?.name}\nমূল্য: ৳ ${money(singleFinal.toFixed(0))}`);
  const createBundle = ()=>{ alert(`বান্ডেল\nনাম: ${bundleName}\nবই: ${selectedCourses.length}\nপে: ৳ ${money(bundleFinal.toFixed(0))}`); setBundleName(""); setSelected(new Set()); setAppliedPromo(null); };
  const buyPreset    = b=>alert(`প্রিসেট: ${b.name}\nপে: ৳ ${money(b.base.toFixed(0))}`);

  /* ════ RENDER ════════════════════════════════════════════════ */
  return (
    <>
      <style>{STYLES}</style>
      <div style={{ background:T.bg, minHeight:"100vh", paddingBottom:90 }}>

        {/* HEADER */}
        <div style={{ position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-40, right:-30, width:220, height:220, borderRadius:"50%", background:"radial-gradient(circle,rgba(239,68,68,0.12) 0%,transparent 65%)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", inset:0, opacity:0.03, pointerEvents:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"160px" }}/>
          <div style={{ position:"relative", background:`linear-gradient(180deg,${T.surface} 0%,${T.bg} 100%)`, borderBottom:`1px solid ${T.border}`, padding:"24px 16px 0" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${T.red}10`, border:`1px solid ${T.red}25`, borderRadius:99, padding:"4px 11px", marginBottom:10 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:T.red, flexShrink:0, animation:"subGlow 2s ease-in-out infinite" }}/>
              <span style={{ fontSize:9, fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", color:`${T.red}cc` }}>Royal Scientific Publications</span>
            </div>
            <div style={{ fontSize:28, color:T.text, fontWeight:900, letterSpacing:"-0.6px", lineHeight:1.1, marginBottom:14 }}>Buy Subscription</div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:T.card2, border:`1px solid ${T.border2}`, borderRadius:99, padding:"8px 14px", marginBottom:20 }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:T.green, flexShrink:0, boxShadow:`0 0 6px ${T.green}` }}/>
              <span style={{ fontSize:12, color:T.textFade, fontWeight:500 }}>Wallet <strong style={{ color:T.text, fontWeight:800 }}>৳ {money(user.walletBalance)}</strong></span>
              <span style={{ color:T.border3, fontSize:14 }}>·</span>
              <span style={{ fontSize:12, color:T.textFade, fontWeight:600 }}>{user.plan}</span>
            </div>
            {/* Tabs */}
            <div style={{ display:"flex", gap:8, paddingBottom:1 }}>
              {TABS.map(t=>{
                const active=tab===t.value;
                return (
                  <button key={t.value} onClick={()=>setTab(t.value)} className={`sub-tab-btn ${active?"active":""}`} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6, padding:"12px 6px 10px", borderRadius:"14px 14px 0 0", background:active?T.card:T.surface, border:`1px solid ${active?T.border2:"transparent"}`, borderBottom:active?`1px solid ${T.card}`:"1px solid transparent", color:active?T.text:T.textFade, cursor:"pointer", position:"relative", marginBottom:active?-1:0 }}>
                    {active && <div style={{ position:"absolute", top:0, left:"25%", right:"25%", height:2, borderRadius:"0 0 99px 99px", background:`linear-gradient(90deg,transparent,${T.red},transparent)` }}/>}
                    <span style={{ fontSize:18, lineHeight:1 }}>{t.icon}</span>
                    <span style={{ fontSize:11, fontWeight:800, letterSpacing:"-0.1px" }}>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div style={{ padding:"14px 14px 0", animation:"subFadeUp .45s cubic-bezier(.22,1,.36,1) both" }}>

          {(tab==="single"||tab==="bundle") && <FilterBar query={query} setQuery={setQuery} classFilter={classFilter} setClassFilter={setClassFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} sortBy={sortBy} setSortBy={setSortBy}/>}

          {/* ══ SINGLE ══════════════════════════════════════════ */}
          {tab==="single" && (
            <>
              <Card>
                <SLabel right={<Pill>{filteredCourses.length}টি</Pill>}>একটি বই বাছাই করুন</SLabel>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {singlePageItems.map(c=><CourseRow key={c.id} c={c} active={singleCourseId===c.id} onClick={()=>setSingleCourseId(c.id)}/>)}
                  {filteredCourses.length===0 && <div style={{ padding:"32px 0", textAlign:"center", color:T.textGhost, fontSize:14 }}>কোনো বই পাওয়া যায়নি 😔</div>}
                </div>
                <Pager page={pageSingle} totalPages={totalPages} onPrev={()=>setPageSingle(p=>Math.max(1,p-1))} onNext={()=>setPageSingle(p=>Math.min(totalPages,p+1))} total={filteredCourses.length}/>
              </Card>

              {singleCourse && (
                <Card>
                  <PromoSection base={Number(singleCourse.price||0)} appliedPromo={singlePromo} onApply={setSinglePromo} onRemove={()=>setSinglePromo(null)}/>
                  <div style={{ borderTop:`1px dashed ${T.border}`, paddingTop:14, marginTop:2 }}>
                    <SLabel>অর্ডার সারাংশ</SLabel>
                    <SummaryTable
                      rows={[
                        { label:"বই",         value:singleCourse.name, bold:true },
                        { label:"ভ্যালিডিটি", value:singleCourse.validity        },
                        { label:"দাম",    value:`৳ ${money(singleCourse.price)}` },
                      ]}
                      promoRow={singlePromo&&singleDiscount>0 ? { code:singlePromo.code, label:"ছাড়", value:`− ৳ ${money(singleDiscount.toFixed(0))}`, color:singlePromo.colorLight, bg:singlePromo.colorDim } : null}
                      totalLabel="Your Total"
                      totalValue={`৳ ${money(singleFinal.toFixed(0))}`}
                    />
                    <div style={{ marginTop:14 }}><PrimaryBtn full onClick={buySingle}>এখনই কিনুন →</PrimaryBtn></div>
                  </div>
                </Card>
              )}
            </>
          )}

          {/* ══ BUNDLE ══════════════════════════════════════════ */}
          {tab==="bundle" && (
            <>
              <Card>
                <SLabel>বান্ডেলের নাম</SLabel>
                <input value={bundleName} onChange={e=>setBundleName(e.target.value)} placeholder="বান্ডেল নাম দিন (যেমন: আমার ২০২৬ কম্বো)" style={{ width:"100%", background:T.card2, border:`1px solid ${T.border2}`, borderRadius:13, padding:"11px 13px", color:T.textMid, fontSize:13, outline:"none", boxSizing:"border-box" }}/>
              </Card>

              <Card>
                <SLabel right={selectedCourses.length>0 ? <Pill bg={T.redDeep} border={`${T.red}33`} color={T.redLight}>{selectedCourses.length}টি বাছাই</Pill> : <Pill>{filteredCourses.length}টি</Pill>}>বই নির্বাচন করুন</SLabel>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {bundlePageItems.map(c=><CourseRow key={c.id} c={c} active={selected.has(c.id)} onClick={()=>toggleCourse(c.id)}/>)}
                  {filteredCourses.length===0 && <div style={{ padding:"32px 0", textAlign:"center", color:T.textGhost, fontSize:14 }}>কোনো বই পাওয়া যায়নি 😔</div>}
                </div>
                <Pager page={pageBundle} totalPages={totalPages} onPrev={()=>setPageBundle(p=>Math.max(1,p-1))} onNext={()=>setPageBundle(p=>Math.min(totalPages,p+1))} total={filteredCourses.length}/>
              </Card>

              {selectedCourses.length>0 && (
                <Card>
                  <PromoSection base={bundleBase} appliedPromo={appliedPromo} onApply={setAppliedPromo} onRemove={()=>setAppliedPromo(null)}/>
                  <div style={{ borderTop:`1px dashed ${T.border}`, paddingTop:14, marginTop:2 }}>
                    <SLabel>Cost Summary</SLabel>
                    <SummaryTable
                      rows={[
                        { label:"বই", value:`${selectedCourses.length}টি`, bold:true },
                        { label:"মূল্য",    value:`৳ ${money(bundleBase)}`                 },
                      ]}
                      promoRow={appliedPromo&&promoDiscount>0 ? { code:appliedPromo.code, label:"ছাড়", value:`− ৳ ${money(promoDiscount.toFixed(0))}`, color:appliedPromo.colorLight, bg:appliedPromo.colorDim } : null}
                      totalLabel="Your Total"
                      totalValue={`৳ ${money(bundleFinal.toFixed(0))}`}
                    />
                    <div style={{ display:"flex", gap:8, marginTop:12 }}>
                      <GhostBtn onClick={()=>{setSelected(new Set());setAppliedPromo(null);}}>Clear All</GhostBtn>
                      <div style={{ flex:1 }}><PrimaryBtn full onClick={canCreateBundle?createBundle:undefined} disabled={!canCreateBundle}>তৈরি ও কিনুন →</PrimaryBtn></div>
                    </div>
                    {!canCreateBundle && <div style={{ marginTop:9, textAlign:"center", fontSize:11, color:T.textGhost }}>নাম দিন + কমপক্ষে ১টি বই নির্বাচন করুন</div>}
                  </div>
                </Card>
              )}
            </>
          )}

          {/* ══ PRESET ══════════════════════════════════════════ */}
          {tab==="preset" && (
            <>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                <div style={{ height:13, width:3, borderRadius:99, background:T.red }}/>
                <span style={{ fontSize:12, color:T.textFade, fontWeight:700 }}>রেডিমেড বান্ডেল — এক ট্যাপেই কিনুন</span>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {presetPageItems.map(b=>(
                  <div key={b.id} className="sub-card-hover" style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:22, overflow:"hidden" }}>
                    {b.courses[0]?.image && (
                      <div style={{ position:"relative", height:140 }}>
                        <img src="https://the-royal-scientific-publications.com/uploads/sliders/2024/06/22/Slider1719046422.webp" alt={b.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{e.currentTarget.parentElement.style.display="none";}}/>
                        <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top,${T.card} 0%,${T.card}90 30%,transparent 70%)` }}/>
                        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(0,0,0,0.3) 0%,transparent 60%)" }}/>
                        <div style={{ position:"absolute", top:10, left:12, display:"flex", gap:6 }}>
                          <Pill bg={`${T.redDeep}cc`} border={`${T.red}40`} color={T.redLight} style={{ backdropFilter:"blur(8px)" }}>⚡ প্রিসেট</Pill>
                          <Pill bg="rgba(0,0,0,0.5)" border="rgba(255,255,255,0.12)" color={T.textMid} style={{ backdropFilter:"blur(8px)" }}>{b.courses.length} বই</Pill>
                        </div>
                        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 14px 14px" }}>
                          <div style={{ fontSize:17, fontWeight:900, color:T.text, lineHeight:1.2, letterSpacing:"-0.3px" }}>{b.name}</div>
                        </div>
                      </div>
                    )}
                    <div style={{ padding:16 }}>
                      <div style={{ background:T.card2, border:`1px solid ${T.border}`, borderRadius:14, overflow:"hidden", marginBottom:16 }}>
                        {b.courses.map((c,i)=>(
                          <div key={c.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 13px", borderBottom:i<b.courses.length-1?`1px solid ${T.border}`:"none" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8, flex:1, minWidth:0, marginRight:8 }}>
                              <div style={{ width:4, height:4, borderRadius:"50%", background:T.textGhost, flexShrink:0 }}/>
                              <span style={{ fontSize:12, color:T.textMid, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.name}</span>
                            </div>
                            <span style={{ fontSize:11, color:T.textFade, fontWeight:700, flexShrink:0 }}>৳ {money(c.price)}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:12 }}>
                        <div>
                          <div style={{ fontSize:26, fontWeight:900, color:T.text, lineHeight:1, letterSpacing:"-0.8px" }}>৳ {money(b.base.toFixed(0))}</div>
                        </div>
                        <PrimaryBtn onClick={()=>buyPreset(b)}>কিনুন →</PrimaryBtn>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {presetTotal>1 && <Card style={{ marginTop:14 }}><Pager page={pagePreset} totalPages={presetTotal} onPrev={()=>setPagePreset(p=>Math.max(1,p-1))} onNext={()=>setPagePreset(p=>Math.min(presetTotal,p+1))} total={presetExpanded.length}/></Card>}
            </>
          )}
        </div>
      </div>
    </>
  );
}