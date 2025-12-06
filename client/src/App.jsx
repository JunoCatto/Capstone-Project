import "./App.css";

import { Routes, Route } from "react-router";

// Layout import
import AppLayout from "./layout/AppLayout.jsx";
// Page imports
import Home from "./pages/Home.jsx";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
