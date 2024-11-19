import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainPage from "./pages/buyer/MainPage.jsx";
import Store from "./pages/buyer/Store.jsx";
import BuyerProduct from "./pages/buyer/Product.jsx";
import Cart from "./pages/buyer/Cart.jsx";
import Profile from "./pages/buyer/Profile.jsx";
import Test from "./pages/buyer/test.jsx";
import Register from "./pages/baker/Register.jsx";

import Dashboard from "./pages/baker/Dashboard.jsx";
import Settings from "./pages/baker/Settings.jsx";

import "./App.css";
import ForgotPassword from "./pages/buyer/ForgotPassword.jsx";
import Header from "./components/buyer/Header.jsx";
import Orders from "./pages/baker/Orders.jsx";
import Products from "./pages/baker/Products";
import Reviews from "./pages/baker/Reviews";
import Statistics from "./pages/baker/Statistics";

import AdminDashboard from "./pages/admin/Dashboard";
import AccountsMonitoring from "./pages/admin/AccountsMonitoring";
import RefundRequests from "./pages/admin/RefundRequests";
import BusinessVerification from "./pages/admin/BusinessVerification";
import ReportedContent from "./pages/admin/ReportedContent";
import AccountManagement from "./pages/admin/AccountManagement";
import AdminLogin from "./pages/admin/Login";

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
        <Route path="/store/:userId" element={<Store />} />
        {/* <Route path="/product" element={<Product />} /> */}
        <Route path="/product/:productId" element={<BuyerProduct />} />
        <Route path="/cart/*" element={<Cart />} />
        <Route
          path="/profile"
          element={
            <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />

        {/* Baker's Route - Update these paths */}
        <Route path="/baker/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/products" element={<Products />} />
        <Route path="/dashboard/reviews" element={<Reviews />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/statistics" element={<Statistics />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/accounts" element={<AccountsMonitoring />} />
        <Route path="/admin/refunds" element={<RefundRequests />} />
        <Route path="/admin/verification" element={<BusinessVerification />} />
        <Route path="/admin/reports" element={<ReportedContent />} />
        <Route path="/admin/management" element={<AccountManagement />} />
        <Route path="/admin/statistics" element={<Statistics />} />

        {/* Add the product route */}
      </Routes>
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;
