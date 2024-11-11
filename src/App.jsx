import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./pages/buyer/MainPage.jsx";
import Store from "./pages/buyer/Store.jsx";
import Product from "./pages/buyer/Product.jsx";
import Cart from "./pages/buyer/Cart.jsx";
import Profile from "./pages/buyer/Profile.jsx";
import Test from "./pages/buyer/test.jsx";
import Register from "./pages/baker/Register.jsx";

import "./App.css";
import ForgotPassword from "./pages/buyer/ForgotPassword.jsx";
import Header from "./components/buyer/Header.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <Route
          path="/Profile"
          element={
            <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        {/* Baker's Route */}
        {/* <Route path="/dashboard" element={<Store />} /> */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
