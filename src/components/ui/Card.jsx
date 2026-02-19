export default function Card({ className = "", children }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border border-white/10",
        "bg-gradient-to-br from-white/10 via-white/5 to-transparent",
        "shadow-[0_28px_80px_-45px_rgba(0,0,0,0.95)]",
        // IMPORTANT: overlays must NOT capture clicks
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_10%,rgba(255,40,90,0.18),transparent_40%),radial-gradient(circle_at_85%_25%,rgba(255,120,0,0.10),transparent_45%)] before:opacity-90 before:content-['']",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,rgba(255,255,255,0.04))] after:content-['']",
        className,
      ].join(" ")}
    >
      <div className="relative">{children}</div>
    </div>
  );
}
