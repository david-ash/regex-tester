import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Learn from "./components/Learn.jsx";
import RegexTester from "./components/RegexTester.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/tester" element={<RegexTester />} />
      </Routes>
    </BrowserRouter>
  );
}
