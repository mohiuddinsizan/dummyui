export default function Tabs({ tabs, value, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {tabs.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={[
            "whitespace-nowrap rounded-2xl px-3 py-2 text-xs font-bold transition",
            "border border-white/10",
            value === t.value ? "bg-white/15 ring-2 ring-cyan-400/30" : "bg-white/5 hover:bg-white/10",
          ].join(" ")}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
