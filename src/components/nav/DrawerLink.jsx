import { NavLink } from "react-router-dom";

export default function DrawerLink({ to, icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "mb-2 flex items-center gap-3 rounded-2xl px-3 py-3 transition",
          "border border-white/12 bg-white/5 hover:bg-white/10",
          "shadow-[0_16px_40px_-35px_rgba(255,40,80,0.55)]",
          isActive ? "ring-2 ring-rose-400/30 bg-gradient-to-r from-rose-600/12 to-transparent" : "",
        ].join(" ")
      }
    >
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rose-600/18 to-white/5 ring-1 ring-white/10">
        {icon}
      </div>
      <div className="text-sm font-extrabold">{label}</div>
    </NavLink>
  );
}
