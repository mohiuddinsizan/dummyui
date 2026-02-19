export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled,
}) {
  const base =
    "w-full rounded-2xl px-4 py-3 text-sm font-extrabold transition active:scale-[0.99] disabled:opacity-60 disabled:active:scale-100";

  const styles = {
    primary:
      "border border-white/12 bg-gradient-to-r from-rose-600/35 via-red-500/25 to-orange-500/15 shadow-[0_18px_45px_-28px_rgba(255,40,80,0.95)] hover:border-white/20",
    ghost:
      "border border-white/12 bg-white/5 hover:bg-white/10 shadow-[0_14px_35px_-30px_rgba(255,40,80,0.55)]",
    danger:
      "border border-white/12 bg-gradient-to-r from-rose-700/35 to-red-600/25 shadow-[0_18px_45px_-30px_rgba(255,20,60,0.95)]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={[base, styles[variant], className].join(" ")}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
