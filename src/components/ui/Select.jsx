export default function Select({ label, children, ...props }) {
  return (
    <label className="block">
      {label ? <div className="mb-1 text-xs font-bold text-white/60">{label}</div> : null}
      <select
        {...props}
        className="w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm outline-none focus:border-rose-400/30 focus:ring-2 focus:ring-rose-400/15"
      >
        {children}
      </select>
    </label>
  );
}
