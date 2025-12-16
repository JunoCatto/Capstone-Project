import "./App.css";

import { Routes, Route } from "react-router-dom";

// Layout import
import AppLayout from "./layout/AppLayout.jsx";
import GuestRoute from "./layout/GuestRoute.jsx";
import ProtectedRoute from "./layout/ProtectedRoute.jsx";
// Page imports
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Routes>
      {/* Guest pages */}
      <Route element={<GuestRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
