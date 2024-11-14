import React, { useState } from "react";
import logo from "../../assets/cake_area_logo.png";
import profile from "../../assets/Dummy_Profile.png";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: "material-symbols:dashboard", path: "/dashboard" },
    { title: "Orders", icon: "mdi:cart", path: "/dashboard/orders" },
    { title: "Products", icon: "mdi:cake", path: "/dashboard/products" },
    { title: "Statistics", icon: "mdi:chart-bar", path: "/dashboard/statistics" },
    { title: "Reviews", icon: "material-symbols:rate-review", path: "/dashboard/reviews" },
    { title: "Settings", icon: "material-symbols:settings", path: "/dashboard/settings" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#3A3531] flex flex-col items-center p-5 
        transition-all duration-300 ease-in-out
        ${isExpanded ? "w-[15%]" : "w-[5%]"}`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-4 top-10 bg-[#3A3531] p-2 rounded-full hover:bg-[#4a443f] transition-colors cursor-pointer z-50"
      >
        <Icon
          icon={isExpanded ? "ph:caret-left-bold" : "ph:caret-right-bold"}
          className="text-white text-xl"
        />
      </button>

      {/* Logo  */}
      <div className="border w-fit h-fit text-center text-white">
        <img
          src={logo}
          alt="logo"
          className={`${isExpanded ? "w-[70px]" : "w-[40px]"} transition-all duration-300`}
        />
      </div>

      {/* Title  */}
      {isExpanded && (
        <div className="font-[Oswald] text-white text-[25px] font-semibold my-3">
          Baker's Area
        </div>
      )}

      {/* Profile  */}
      <div
        className={`flex items-center gap-2 bg-white rounded-sm py-2 ${
          isExpanded ? "px-3" : "px-1"
        } mt-3`}
      >
        <img
          src={profile}
          alt="profile"
          className="rounded-full w-[40px] h-[40px] object-cover"
        />
        {isExpanded && <p>Bryan Ramos</p>}
      </div>

      <hr className="w-full my-5 border-gray-600" />

      {/* Menu Items */}
      <div className="w-full flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 p-2 rounded-md transition-colors
              ${isExpanded ? "px-4" : "px-2 justify-center"}
              ${
                location.pathname === item.path
                  ? "bg-[#FF9F0D] text-white"
                  : "text-gray-300 hover:bg-[#4a443f] hover:text-white"
              }`}
          >
            <Icon icon={item.icon} className="text-2xl" />
            {isExpanded && <span>{item.title}</span>}
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <div className="mt-auto w-full">
        <button
          className={`flex items-center gap-3 p-2 rounded-md text-gray-300 hover:bg-[#4a443f] hover:text-white transition-colors w-full
            ${isExpanded ? "px-4" : "px-2 justify-center"}`}
        >
          <Icon icon="material-symbols:logout" className="text-2xl" />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 