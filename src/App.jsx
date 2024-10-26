import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage.jsx";
import Store from "./pages/Store.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import Test from "./pages/test.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Cake Area Landing Page */}
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<Test />} />

        {/* Customer's Route */}
        <Route path="/Store/:name/:id" element={<Store />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
        {/* Baker's Route */}
        <Route path="/dashboard" element={<Store />} />
      </Routes>
    </Router>
  );
}

export default App;
