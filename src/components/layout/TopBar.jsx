import { Menu } from "lucide-react";

export default function TopBar({ title, onMenu }) {
  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-white/10 bg-gradient-to-b from-black/70 to-black/30 backdrop-blur-xl">
        <div className="px-4 pt-3 pb-3">
          {/* Title row */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenu}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/5 shadow-[0_10px_25px_-15px_rgba(255,40,80,0.7)] active:scale-[0.98]"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold tracking-wide text-white/55">
                The Royal Scientific Publications
              </div>
              <div className="truncate text-lg font-extrabold">{title}</div>
            </div>

            {/* Logo */}
            <div className="relative grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-gradient-to-br from-rose-500/25 via-red-500/20 to-orange-500/10 shadow-[0_18px_40px_-25px_rgba(255,35,80,0.9)]">
              <span className="text-sm font-extrabold">RS</span>
              <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-rose-500/20 to-transparent blur-lg" />
            </div>
          </div>

          {/* Sub glow line */}
          <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-rose-400/35 to-transparent" />
        </div>
      </div>
    </header>
  );
}
