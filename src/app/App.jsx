import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell.jsx";
import { appRoutes } from "./routes.jsx";
import NotFound from "../pages/NotFound.jsx";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        {appRoutes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppShell>
  );
}
