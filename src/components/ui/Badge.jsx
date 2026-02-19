export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/12 bg-gradient-to-r from-rose-500/18 to-orange-500/10 px-2.5 py-1 text-[11px] font-bold text-white/80 shadow-[0_10px_30px_-25px_rgba(255,50,90,0.8)]">
      {children}
    </span>
  );
}
