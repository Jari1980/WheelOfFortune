import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import Home from "./Home.jsx";
import NavBar from "./components/NavBar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wheel from "./components/Wheel.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/wheel" element={<Wheel />} />
    </Routes>
  </BrowserRouter>
);
