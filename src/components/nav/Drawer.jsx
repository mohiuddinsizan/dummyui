import DrawerLink from "./DrawerLink.jsx";
import { X, Home, LayoutDashboard, BookOpen, Wallet, Info } from "lucide-react";

export default function Drawer({ open, onClose }) {
  return (
    <>
      <button
        onClick={onClose}
        className={[
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-label="Close menu backdrop"
      />

      <aside
        className={[
          "fixed left-0 top-0 z-[60] h-full w-[320px] max-w-[86vw]",
          "border-r border-white/10 bg-black/55 backdrop-blur-xl",
          "shadow-[40px_0_120px_-70px_rgba(255,40,80,0.85)] transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="relative border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-extrabold">Menu</div>
              <div className="text-xs text-white/55">Navigate your app</div>
            </div>
            <button
              onClick={onClose}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white/5 active:scale-[0.98]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-3 h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />
        </div>

        <div className="px-3 py-3">
          <DrawerLink to="/home" icon={<Home className="h-5 w-5" />} label="Home" onClick={onClose} />
          <DrawerLink to="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" onClick={onClose} />
          <DrawerLink to="/my-courses" icon={<BookOpen className="h-5 w-5" />} label="My Courses" onClick={onClose} />

          <div className="my-3 border-t border-white/10" />

          <div className="px-2 pb-2 text-xs font-bold tracking-wide text-white/55">
            Quick Links
          </div>
          <DrawerLink to="/dashboard#wallet" icon={<Wallet className="h-5 w-5" />} label="Wallet" onClick={onClose} />
          <DrawerLink to="/home#tutorials" icon={<Info className="h-5 w-5" />} label="Tutorials" onClick={onClose} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-rose-600/18 via-red-500/12 to-orange-500/8 p-4">
            <div className="text-sm font-extrabold">The Royal Scientific Publications</div>
            <div className="mt-1 text-xs text-white/60">Premium red 3D theme</div>
          </div>
        </div>
      </aside>
    </>
  );
}
