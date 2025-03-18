import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Panel from "./Panel";
import PrivacyPolicy from "./privacyPolicy.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Panel />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
