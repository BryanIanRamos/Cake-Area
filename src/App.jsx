import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage.jsx";
import Store from "./pages/Store.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define each route here */}
        <Route path="/" element={<MainPage />} />
        <Route path="/Store/:name/:id" element={<Store />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
