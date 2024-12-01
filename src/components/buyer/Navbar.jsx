import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import BALogo from "/assets/logo/BA-logo.png";
import DummyProfile from "../../assets/Dummy_Profile.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user profile data
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`http://localhost:3000/profiles?user_id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setUserProfile(data[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  const getUserFullName = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name} ${userProfile.last_name}`;
    }
    return "Guest User";
  };

  const getProfileImage = () => {
    if (userProfile?.img && userProfile.img !== "dummy_profile_url") {
      return userProfile.img;
    }
    return DummyProfile;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    if (path === "/store") {
      const lastVisitedStore = localStorage.getItem('lastVisitedStore');
      if (lastVisitedStore) {
        navigate(`/store/${lastVisitedStore}`);
      } else {
        navigate(-1);
      }
    } else if (path === "/orders") {
      navigate("/cart");
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section - Left */}
          <div className="flex-shrink-0 flex items-center w-1/4">
            <img
              src={BALogo}
              alt="Baker's Area Logo"
              className="h-12 w-auto cursor-pointer"
              onClick={() => handleNavigation("/")}
            />
          </div>

          {/* Center Navigation */}
          <div className="hidden sm:flex justify-center items-center space-x-8 flex-1">
            <a
              onClick={() => handleNavigation("/")}
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1"
            >
              <Icon icon="ph:house" className="text-xl" />
              Home
            </a>
            <a
              onClick={() => handleNavigation("/store")}
              className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1 ${
                isActivePath('/store') 
                  ? "text-primary" 
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              <Icon icon="ph:storefront" className="text-xl" />
              Store
            </a>
            <a
              onClick={() => handleNavigation("/orders")}
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1"
            >
              <Icon icon="ph:shopping-cart-simple" className="text-xl" />
              My Cart
            </a>
          </div>

          {/* Profile Section - Right */}
          <div className="hidden sm:flex items-center w-1/4 justify-end">
            <a
              onClick={() => handleNavigation("/profile")}
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={getProfileImage()} 
                  alt={getUserFullName()}
                  className="w-full h-full object-cover"
                />
              </div>
              {getUserFullName()}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
            >
              <Icon
                icon={isMobileMenuOpen ? "ph:x-bold" : "ph:list-bold"}
                className="text-2xl"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              onClick={() => handleNavigation("/")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
            >
              <Icon icon="ph:house" className="text-xl" />
              Home
            </a>
            <a
              onClick={() => handleNavigation("/store")}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 ${
                isActivePath('/store') 
                  ? "text-primary" 
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              <Icon icon="ph:storefront" className="text-xl" />
              Store
            </a>
            <a
              onClick={() => handleNavigation("/orders")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
            >
              <Icon icon="ph:shopping-cart-simple" className="text-xl" />
              My Cart
            </a>
            <a
              onClick={() => handleNavigation("/profile")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={getProfileImage()} 
                  alt={getUserFullName()}
                  className="w-full h-full object-cover"
                />
              </div>
              {getUserFullName()}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
