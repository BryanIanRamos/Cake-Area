import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./pages/customer/MainPage.jsx";
import Store from "./pages/customer/Store.jsx";
import Product from "./pages/customer/Product.jsx";
import Cart from "./pages/customer/Cart.jsx";
import Profile from "./pages/customer/Profile.jsx";
import Test from "./pages/customer/test.jsx";

import "./App.css";
import ForgotPassword from "./pages/customer/ForgotPassword.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Cake Area Landing Page */}
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Customer's Route */}
        <Route path="/Store" element={<Store />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Cart/*" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
        {/* Baker's Route */}
        {/* <Route path="/dashboard" element={<Store />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
