import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cake_area_logo from "../../assets/BA-logo.png";

const Header = ({
  isLoggedIn,
  userName,
  openLoginModal,
  openModal,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleSettingsClick = () => {
    navigate("/Profile");
    setIsDropdownOpen(false);
  };

  return (
    <div className="grid grid-cols-2 border-red-500 h-fit text-white mt-5">
      {/* Logo Section */}
      <div className="w-full flex items-center gap-[2vw] border-green-600 pl-[10vw]">
        <img
          src={Cake_area_logo}
          alt="Cake Area Logo"
          className="h-[7vw] sm:max-h-[5vw] xl:h-[4vw]"
        />
        <h1 className="font-[Oswald] text-[3vw] sm:text-[2vw] font-semibold">
          Bakers' Area
        </h1>
      </div>

      {/* Conditional Rendering for Auth/User Section */}
      <div className="flex justify-end items-center right-0 border-blue-600 pr-[10vw] gap-[2vw] font-[poppins] text-[2.4vw] md:text-[2vw] lg:text-[1.6vw] xl:text-[1.3vw] 2xl:text-[1vw]">
        {isLoggedIn ? (
          <>
            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-primary px-4 py-1 rounded-md transition-all duration-300 flex items-center gap-2"
              >
                {userName}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={handleSettingsClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleCartClick}
              className="hover:text-primary hover:bg-white px-4 py-1 rounded-md transition-all duration-300"
            >
              My Cart
            </button>
          </>
        ) : (
          <>
            <button
              onClick={openLoginModal}
              className="hover:text-primary hover:bg-white px-4 py-1 rounded-md transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={openModal}
              className="hover:text-primary hover:bg-white px-4 py-1 rounded-md transition-all duration-300"
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
