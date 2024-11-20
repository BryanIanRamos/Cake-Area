import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const CartTabs = () => {
  const location = useLocation();

  const tabs = [
    { name: "Cart", path: "/cart" },
    { name: "In Process", path: "/cart/in-process" },
    { name: "To Receive", path: "/cart/to-receive" },
    { name: "Completed", path: "/cart/completed" },
    { name: "Cancelled", path: "/cart/cancelled" },
    { name: "Refund", path: "/cart/refund" },
    { name: "Refunded", path: "/cart/refunded" },
  ];

  // Updated function to check if the tab is active
  const isActiveTab = (path) => {
    if (path === "/cart") {
      // Make Cart tab active by default or when explicitly on /cart
      return location.pathname === "/cart" || location.pathname === "/cart/";
    }
    return location.pathname === path;
  };

  return (
    <div className="relative">
      {/* Gradient indicators for scroll - only show on mobile */}
      <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-gray-200 to-transparent md:hidden z-0"></div>
      <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-gray-200 to-transparent md:hidden z-0"></div>

      {/* Scrollable container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div
          className={`
          flex rounded-xl p-3 md:p-4 bg-gray-200
          min-w-min md:min-w-full
          md:justify-between
        `}
        >
          {tabs.map((tab, index) => (
            <NavLink
              key={index}
              to={tab.path}
              className={`
                whitespace-nowrap
                px-4 md:px-6 lg:px-8
                py-2 md:py-2.5 
                rounded-lg 
                font-semibold 
                text-xs md:text-sm lg:text-base
                ${
                  isActiveTab(tab.path)
                    ? "bg-gray-100 text-primary"
                    : "text-black"
                }
                ${index !== tabs.length - 1 ? "mr-2 md:mr-0" : ""}
                transition-colors duration-200 hover:bg-gray-100
              `}
            >
              {tab.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartTabs;
