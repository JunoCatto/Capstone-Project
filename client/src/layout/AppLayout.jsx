import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router";
import TrendSidebar from "../components/TrendSidebar.jsx";

// Ensures sidebar is present on all pages
export default function AppLayout() {
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      {/* Page content placed by outlet */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Outlet />
      </main>

      <TrendSidebar />
    </div>
  );
}
