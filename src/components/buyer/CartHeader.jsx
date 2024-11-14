import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import whiteLogo from "../../assets/white-logo.png";

const CartHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="bg-secondary text-white py-4 px-4 md:px-8 lg:px-40 fixed top-0 w-full z-10">
      <div className="flex justify-between items-center">
        {/* Logo - hidden when search is open on mobile */}
        <div
          className={`flex gap-2 items-center text-2xl md:text-3xl font-bold ${
            isSearchOpen ? "hidden md:flex" : "flex"
          }`}
        >
          <img
            className="w-12 h-12 md:w-16 md:h-16"
            src={whiteLogo}
            alt="logo"
          />
          Bakers' Area
        </div>

        {/* Search Bar Container */}
        <div className="relative flex items-center ml-auto">
          {/* Full Search Bar - Hidden on mobile unless expanded */}
          <div
            className={`${
              isSearchOpen ? "flex w-full" : "hidden md:flex"
            } relative w-full md:w-auto`}
          >
            <input
              type="text"
              className="text-black p-4 py-3 rounded-lg w-full md:w-80"
              placeholder="Search"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-lg">
              <FaMagnifyingGlass />
            </button>
          </div>

          {/* Mobile Search Icon - Only visible on mobile when search is closed */}
          <button
            className={`md:hidden ${isSearchOpen ? "hidden" : "block"}`}
            onClick={() => setIsSearchOpen(true)}
          >
            <FaMagnifyingGlass size={24} />
          </button>

          {/* Close Search Button - Only visible on mobile when search is open */}
          {isSearchOpen && (
            <button
              className="md:hidden ml-4 text-white"
              onClick={() => setIsSearchOpen(false)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
