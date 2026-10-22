import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import About from "./pages/About";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";


export default function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/analysis"
        element={<Analysis />}
      />

      <Route
        path="/report"
        element={<Report />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}