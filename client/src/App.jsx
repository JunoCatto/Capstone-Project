import "./App.css";

import { Routes, Route } from "react-router";

// Layout import
import AppLayout from "./layout/AppLayout.jsx";
// Page imports
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
