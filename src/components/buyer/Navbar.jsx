import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full h-12 sm:h-14 bg-[#3A3531] grid grid-cols-2 py-2 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center pl-3 sm:pl-8">
        <p className="text-white text-sm sm:text-xl">Logo</p>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="sm:hidden flex justify-end items-center pr-3">
        <button
          className="text-white p-1 hover:bg-white/10 rounded-md transition-colors duration-200"
          onClick={toggleMobileMenu}
        >
          <Icon
            icon={
              isMobileMenuOpen
                ? "material-symbols:close"
                : "material-symbols:menu"
            }
            className="text-xl"
          />
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex gap-4 lg:gap-8 justify-end items-center font-[Oswald] text-white px-4 lg:px-32">
        <a
          onClick={() => handleNavigation("/")}
          className="cursor-pointer hover:text-primary transition-colors duration-200 text-base lg:text-lg"
        >
          Home
        </a>
        <a
          onClick={() => handleNavigation("/store")}
          className="cursor-pointer hover:text-primary transition-colors duration-200 text-base lg:text-lg"
        >
          Store
        </a>
        <a
          onClick={() => handleNavigation("/orders")}
          className="cursor-pointer hover:text-primary transition-colors duration-200 text-base lg:text-lg"
        >
          My Orders
        </a>
        <a
          onClick={() => handleNavigation("/profile")}
          className="cursor-pointer hover:text-primary transition-colors duration-200 text-base lg:text-lg"
        >
          Profile
        </a>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#3A3531] shadow-lg sm:hidden z-40">
          <div className="flex flex-col font-[Oswald] text-white">
            <a
              onClick={() => handleNavigation("/")}
              className="px-4 py-3 hover:bg-white/10 active:bg-white/20 transition-colors duration-200 text-sm"
            >
              Home
            </a>
            <a
              onClick={() => handleNavigation("/store")}
              className="px-4 py-3 hover:bg-white/10 active:bg-white/20 transition-colors duration-200 text-sm"
            >
              Store
            </a>
            <a
              onClick={() => handleNavigation("/orders")}
              className="px-4 py-3 hover:bg-white/10 active:bg-white/20 transition-colors duration-200 text-sm"
            >
              My Orders
            </a>
            <a
              onClick={() => handleNavigation("/profile")}
              className="px-4 py-3 hover:bg-white/10 active:bg-white/20 transition-colors duration-200 text-sm border-t border-white/10"
            >
              Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar; 