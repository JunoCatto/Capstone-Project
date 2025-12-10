import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router";
import TrendSidebar from "../components/TrendSidebar.jsx";

// Ensures sidebar is present on all pages
export default function AppLayout() {
  return (
    <div className="layout-container">
      <Sidebar />
      {/* Page content placed by outlet */}
      <main>
        <Outlet />
      </main>

      <TrendSidebar />
    </div>
  );
}
