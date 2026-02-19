import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "./TopBar.jsx";
import Drawer from "../nav/Drawer.jsx";
import BottomFooter from "./BottomFooter.jsx";

export default function AppShell({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const title = useMemo(() => {
    const p = location.pathname;
    if (p.startsWith("/dashboard")) return "Dashboard";
    if (p.startsWith("/my-courses")) return "My Courses";
    if (p.startsWith("/test")) return "Take Test";
    return "Home";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-rose-600/25 blur-[70px]" />
        <div className="absolute top-40 -left-40 h-[520px] w-[520px] rounded-full bg-red-500/20 blur-[80px]" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-[90px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,60,90,0.12),transparent_45%),radial-gradient(circle_at_80%_25%,rgba(255,120,0,0.10),transparent_45%)]" />
      </div>

      {/* Mobile device frame */}
      <div className="mx-auto min-h-screen w-full max-w-[430px]">
        <div className="min-h-screen rounded-none md:rounded-[34px] md:border md:border-white/10 md:bg-black/40 md:backdrop-blur-xl md:shadow-[0_40px_120px_-50px_rgba(255,20,60,0.65)] overflow-hidden">
          <TopBar title={title} onMenu={() => setDrawerOpen(true)} />
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

          <main className="px-4 pb-20 pt-4">{children}</main>

          <BottomFooter />
        </div>
      </div>
    </div>
  );
}
