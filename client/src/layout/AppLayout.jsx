import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router";
import TrendSidebar from "../components/TrendSidebar.jsx";

// Ensures sidebar is present on all pages
export default function AppLayout() {
  return (
    <div className="appContainer">
      <div className="leftContainer">
        <Sidebar />
      </div>
      {/* Page content placed by outlet */}
      <div className="mainContainer">
        <main>
          <Outlet />
        </main>

        <TrendSidebar />
      </div>
    </div>
  );
}
