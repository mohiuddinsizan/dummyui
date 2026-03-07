// src/pages/CourseDetail.jsx
import { Link, useParams } from "react-router-dom";
import { myBooks, myBundles } from "../data/mockData.js";

/* ════════════════════════════════════════════════════════
   STYLES
════════════════════════════════════════════════════════ */
const STYLES = `
  @keyframes cdFadeUp {
    from { opacity:0; transform:translateY(14px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes cdGlow {
    0%,100% { opacity:.5; transform:scale(1);    }
    50%      { opacity:1;  transform:scale(1.15); }
  }
  @keyframes cdShimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .cd-book-row   { transition: background .15s, border-color .15s, transform .15s; }
  .cd-book-row:hover { background: rgba(255,255,255,0.06) !important; border-color: rgba(255,255,255,0.14) !important; transform: translateX(3px); }
  .cd-ch-row     { transition: background .15s, border-color .15s, transform .15s; }
  .cd-ch-row:hover { background: rgba(255,255,255,0.055) !important; border-color: rgba(255,255,255,0.12) !important; transform: translateX(3px); }
  .cd-cta-btn    { transition: all .17s; }
  .cd-cta-btn:hover   { background: #dc2626 !important; box-shadow: 0 8px 30px rgba(239,68,68,.5) !important; transform: translateY(-1px); }
  .cd-cta-btn:active  { transform: scale(.98); }
`;

/* ════════════════════════════════════════════════════════
   PALETTE
════════════════════════════════════════════════════════ */
// A set of warm accent gradients cycled for imageless chapter tiles
const CHAPTER_GRADIENTS = [
  "linear-gradient(135deg, #1e0a0d 0%, #3b1116 100%)",
  "linear-gradient(135deg, #0a0e1e 0%, #111b3b 100%)",
  "linear-gradient(135deg, #0a1a0e 0%, #0f2e18 100%)",
  "linear-gradient(135deg, #1a0e00 0%, #2e1f06 100%)",
  "linear-gradient(135deg, #160a1e 0%, #2a1140 100%)",
  "linear-gradient(135deg, #0a1e1e 0%, #0f2e2e 100%)",
];

const CHAPTER_ACCENT = [
  "#ef4444", "#6366f1", "#22c55e", "#f59e0b", "#a855f7", "#06b6d4",
];

/* ════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════ */
export default function CourseDetail() {
  const { courseId } = useParams();

  const bundle = Array.isArray(myBundles) ? myBundles.find((b) => b.id === courseId) : null;
  const book   = Array.isArray(myBooks)   ? myBooks.find((b)   => b.id === courseId) : null;

  if (!bundle && !book) {
    return (
      <>
        <style>{STYLES}</style>
        <div style={{ padding:"48px 24px", textAlign:"center", color:"rgba(255,255,255,0.3)", fontSize:13 }}>
          বই/বান্ডেল খুঁজে পাওয়া যায়নি।
        </div>
      </>
    );
  }

  /* ── BUNDLE ── */
  if (bundle) {
    const books = Array.isArray(bundle.books) ? bundle.books : [];
    return (
      <>
        <style>{STYLES}</style>
        <div style={{ display:"flex", flexDirection:"column", gap:16, paddingBottom:40, animation:"cdFadeUp .5s cubic-bezier(.22,1,.36,1) both" }}>
          <HeroCard thumb={bundle.thumb} eyebrow="আমার বান্ডেল" title={bundle.title} subtitle={bundle.subtitle} meta={`${books.length} টি বই`} type="bundle" />
          <BooksSection books={books} />
          <CtaCard icon="⚡" title="এই বান্ডেল থেকে টেস্ট দিন" desc="বান্ডেলের সব বই মিলিয়ে কম্বাইন্ড টেস্ট দিতে নিচের বাটনে চাপুন।" to={`/test/setup?bundle=${bundle.id}`} label="কম্বাইন্ড টেস্ট →" />
        </div>
      </>
    );
  }

  /* ── BOOK ── */
  const chapters = Array.isArray(book.chapters) ? book.chapters : [];
  return (
    <>
      <style>{STYLES}</style>
      <div style={{ display:"flex", flexDirection:"column", gap:16, paddingBottom:40, animation:"cdFadeUp .5s cubic-bezier(.22,1,.36,1) both" }}>
        <HeroCard thumb={book.thumb} eyebrow="আমার বই" title={book.title} subtitle={book.subtitle} meta={`${chapters.length} টি অধ্যায়`} type="book" />
        <ChaptersSection chapters={chapters} bookId={book.id} bookThumb={book.thumb} />
        <CtaCard icon="📝" title="এই বই থেকে টেস্ট দিন" desc="এই বইয়ের সব অধ্যায় মিলিয়ে একটি পূর্ণাঙ্গ টেস্ট দিতে নিচের বাটনে চাপুন।" to={`/test/setup?book=${book.id}`} label="এই বই থেকে টেস্ট →" />
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════
   HERO CARD — cinematic with atmospheric glow
════════════════════════════════════════════════════════ */
function HeroCard({ thumb, eyebrow, title, subtitle, meta, type }) {
  return (
    <div style={{
      position:"relative", borderRadius:24, overflow:"hidden",
      border:"1px solid rgba(255,255,255,0.07)",
      background:"#0a0c12",
      minHeight:200,
    }}>
      {/* BG image — full bleed */}
      {thumb && (
        <img src="https://the-royal-scientific-publications.com/uploads/sliders/2024/01/24/Slider1706084072.webp" alt={title}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}
          onError={(e) => { e.currentTarget.style.display="none"; }} />
      )}

      {/* Atmospheric fallback gradient when no thumb */}
      {!thumb && (
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, #1e0a0d 0%, #0a0c12 60%, #0c1220 100%)" }} />
      )}

      {/* Multi-layer scrims for text legibility */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(0,0,0,.88) 0%, rgba(0,0,0,.55) 50%, rgba(0,0,0,.15) 100%)" }} />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.3) 50%, transparent 100%)" }} />

      {/* Red glow accent top-right */}
      <div style={{
        position:"absolute", top:-30, right:-30, width:180, height:180, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(239,68,68,0.18) 0%, transparent 65%)",
        pointerEvents:"none",
      }} />

      {/* Grid lines */}
      <div style={{
        position:"absolute", inset:0, opacity:0.03, pointerEvents:"none",
        backgroundImage:"linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
        backgroundSize:"32px 32px",
      }} />

      {/* Content */}
      <div style={{ position:"relative", padding:"22px 20px 22px" }}>
        {/* Eyebrow */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:99, padding:"4px 11px", marginBottom:12 }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:"#ef4444", animation:"cdGlow 2.2s ease-in-out infinite" }} />
          <span style={{ fontSize:9, fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(252,165,165,0.9)" }}>
            {eyebrow}
          </span>
        </div>

        {/* Title */}
        <div style={{ fontSize:22, fontWeight:900, color:"#f1f5f9", lineHeight:1.15, letterSpacing:"-0.4px", marginBottom: subtitle ? 8 : 14, maxWidth:280 }}>
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.55)", lineHeight:1.5, marginBottom:16, maxWidth:260, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
            {subtitle}
          </div>
        )}

        {/* Meta chips */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <Chip label={meta} />
          <Chip label={type === "bundle" ? "বান্ডেল" : "বই"} accent />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   BOOKS SECTION — for bundle view
════════════════════════════════════════════════════════ */
function BooksSection({ books }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      <SectionHeader title="বান্ডেলের বইগুলো" count={books.length} />
      {books.length === 0 ? (
        <EmptyState msg="এই বান্ডেলে এখনো কোনো বই নেই" />
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
          {books.map((bk) => (
            <Link key={bk.id} to={`/my-courses/${bk.id}`} style={{ textDecoration:"none", display:"block" }}>
              <div className="cd-book-row" style={{
                display:"flex", alignItems:"center", gap:12,
                background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:18, padding:"12px 14px", cursor:"pointer",
              }}>
                {/* Portrait thumb — always show, fallback to gradient */}
                <div style={{
                  width:52, height:68, borderRadius:12, overflow:"hidden", flexShrink:0,
                  background:"linear-gradient(135deg, #1e0a0d, #0c0e14)",
                  border:"1px solid rgba(255,255,255,0.08)", position:"relative",
                }}>
                  {bk.thumb ? (
                    <img src="https://the-royal-scientific-publications.com/uploads/products/thumbnail/2025/11/23/Chemistry-1st-Paper---HSC-2026-Made-Easy_1763877431.webp" alt={bk.title} style={{ width:"100%", height:"100%", objectFit:"cover" }}
                      onError={(e) => { e.currentTarget.style.display="none"; }} />
                  ) : (
                    <BookFallbackIcon />
                  )}
                </div>

                {/* Text */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:800, color:"#f1f5f9", lineHeight:1.3, marginBottom:4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {bk.title}
                  </div>
                  {bk.subtitle && (
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginBottom:8, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {bk.subtitle}
                    </div>
                  )}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <Chip label={`${bk.chapters?.length || 0} টি অধ্যায়`} small />
                    <span style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.45)" }}>খুলুন →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CHAPTERS SECTION — imageless but visually rich
════════════════════════════════════════════════════════ */
function ChaptersSection({ chapters, bookId, bookThumb }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      <SectionHeader title="অধ্যায়সমূহ" count={chapters.length} />
      {chapters.length === 0 ? (
        <EmptyState msg="এই বইয়ে এখনো কোনো অধ্যায় নেই" />
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {chapters.map((ch, idx) => (
            <Link
              key={ch.id || idx}
              to={`/my-courses/${bookId}/chapters/${encodeURIComponent(ch.id || String(idx))}`}
              style={{ textDecoration:"none", display:"block" }}
            >
              <ChapterRow ch={ch} idx={idx} bookThumb={bookThumb} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Single chapter row — uses book thumb blurred as bg, with numbered badge ── */
function ChapterRow({ ch, idx, bookThumb }) {
  const gradient  = CHAPTER_GRADIENTS[idx % CHAPTER_GRADIENTS.length];
  const accent    = CHAPTER_ACCENT[idx % CHAPTER_ACCENT.length];
  const num       = String(idx + 1).padStart(2, "0");

  return (
    <div className="cd-ch-row" style={{
      position:"relative", overflow:"hidden",
      display:"flex", alignItems:"center", gap:0,
      background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
      borderRadius:18, cursor:"pointer",
      minHeight:72,
    }}>
      {/* Left accent panel — book thumb blurred or gradient */}
      <div style={{ position:"relative", width:68, alignSelf:"stretch", flexShrink:0, overflow:"hidden", borderRadius:"17px 0 0 17px" }}>
        {/* Blurred book cover as texture */}
        {bookThumb && (
          <img src="https://the-royal-scientific-publications.com/uploads/products/thumbnail/2025/11/23/Chemistry-1st-Paper---HSC-2026-Made-Easy_1763877431.webp" alt="" style={{
            position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover",
            filter:"blur(3px) brightness(0.35) saturate(1.5)",
            transform:"scale(1.1)",
          }}
          onError={(e) => { e.currentTarget.style.display="none"; }} />
        )}
        {/* Gradient overlay */}
        <div style={{ position:"absolute", inset:0, background:gradient, opacity: bookThumb ? 0.6 : 1 }} />
        {/* Right fade into card */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, transparent 55%, rgba(12,14,20,0.95) 100%)" }} />

        {/* Chapter number badge */}
        <div style={{
          position:"absolute", inset:0, display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", gap:1,
        }}>
          <div style={{
            fontSize:18, fontWeight:900, color:"#fff", lineHeight:1, letterSpacing:"-0.5px",
            textShadow:`0 0 12px ${accent}`,
          }}>
            {num}
          </div>
          {/* tiny accent line */}
          <div style={{ width:16, height:2, borderRadius:99, background:accent, opacity:0.8 }} />
        </div>
      </div>

      {/* Right: text */}
      <div style={{ flex:1, padding:"14px 14px 14px 16px", minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:800, color:"#f1f5f9", lineHeight:1.3, marginBottom:4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {ch.title}
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)", fontWeight:600 }}>
            {ch.duration || "অধ্যায়"}
          </span>
          {/* Accent dot + arrow */}
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:4, height:4, borderRadius:"50%", background:accent, opacity:0.7 }} />
            <span style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.4)" }}>খুলুন →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CTA CARD
════════════════════════════════════════════════════════ */
function CtaCard({ icon, title, desc, to, label }) {
  return (
    <div style={{
      position:"relative", overflow:"hidden",
      background:"linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0.04) 100%)",
      border:"1px solid rgba(239,68,68,0.22)",
      borderRadius:22, padding:20,
    }}>
      {/* Decorative glow */}
      <div style={{
        position:"absolute", top:-20, right:-20, width:100, height:100, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 65%)",
        pointerEvents:"none",
      }} />

      <div style={{ position:"relative" }}>
        <div style={{ fontSize:24, marginBottom:8 }}>{icon}</div>
        <div style={{ fontSize:15, fontWeight:900, color:"#f1f5f9", marginBottom:8, letterSpacing:"-0.2px" }}>{title}</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.55)", lineHeight:1.6, marginBottom:18 }}>{desc}</div>
        <Link to={to} style={{ textDecoration:"none" }}>
          <button className="cd-cta-btn" style={{
            width:"100%", padding:"14px 20px", borderRadius:14,
            background:"linear-gradient(135deg, #ef4444 0%, #c53030 100%)",
            color:"#fff", fontSize:14, fontWeight:800,
            border:"1px solid #ef4444",
            cursor:"pointer", letterSpacing:"-0.1px",
            boxShadow:"0 4px 20px rgba(239,68,68,0.38)",
          }}>
            {label}
          </button>
        </Link>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   SMALL ATOMS
════════════════════════════════════════════════════════ */
function SectionHeader({ title, count }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingBottom:2 }}>
      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
        <div style={{ width:3, height:14, borderRadius:99, background:"#ef4444", flexShrink:0 }} />
        <span style={{ fontSize:13, fontWeight:800, color:"#f1f5f9", letterSpacing:"-0.1px" }}>{title}</span>
      </div>
      <div style={{
        background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.09)",
        borderRadius:99, padding:"3px 10px",
        fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.45)",
      }}>
        {count} টি
      </div>
    </div>
  );
}

function Chip({ label, accent, small }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center",
      background: accent ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.07)",
      border: `1px solid ${accent ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.09)"}`,
      borderRadius:99,
      padding: small ? "2px 8px" : "4px 11px",
      fontSize: small ? 9 : 10,
      fontWeight:700,
      color: accent ? "rgba(252,165,165,0.9)" : "rgba(255,255,255,0.55)",
    }}>
      {label}
    </span>
  );
}

function EmptyState({ msg }) {
  return (
    <div style={{
      background:"rgba(255,255,255,0.02)", border:"1px dashed rgba(255,255,255,0.08)",
      borderRadius:18, padding:"32px 20px", textAlign:"center",
    }}>
      <div style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.35)" }}>{msg}</div>
    </div>
  );
}

function BookFallbackIcon() {
  return (
    <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"
        stroke="rgba(255,255,255,0.2)" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25"/>
      </svg>
    </div>
  );
}