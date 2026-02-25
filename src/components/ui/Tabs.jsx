// src/components/ui/Tabs.jsx
export default function Tabs({
  tabs,
  options, // optional alias
  value,
  onChange,
  className = "",
}) {
  const items = Array.isArray(tabs) ? tabs : Array.isArray(options) ? options : [];

  return (
    <div className={`flex gap-2 overflow-x-auto pb-1 ${className}`}>
      {items.map((t) => {
        const active = value === t.value;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange?.(t.value)}
            className={[
              "whitespace-nowrap rounded-2xl px-3 py-2 text-xs font-extrabold transition",
              "border border-white/10 backdrop-blur",
              active
                ? "bg-white/15 ring-2 ring-cyan-400/30 shadow-[0_10px_25px_-20px_rgba(34,211,238,0.8)]"
                : "bg-white/5 hover:bg-white/10",
            ].join(" ")}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}