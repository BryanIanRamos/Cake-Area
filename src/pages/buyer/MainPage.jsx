import React, { useState, useEffect, useRef } from "react";
import Cake_BG from "../../assets/Cake_BG.png";
import BakerBusinessCard from "../../components/buyer/BakerBusinessCard";
import SelectAccount from "../../components/buyer/SelectAccount";
import LoginModal from "../../components/buyer/LoginModal";
import Header from "../../components/buyer/Header";
import FeedbackPopup from "../../components/buyer/FeedbackPopup";
import { userData } from "../../data/userDataTbl";
import { profileData } from "../../data/profileDataTbl";
import { municipalities } from "../../data/location";

const MainPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("rate");
  const [selectBarangay, setSelectBarangay] = useState("");
  const [selectMunicipality, setSelectMunicipality] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState("success");

  const [filteredByLocation, setFilteredByLocation] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const cardsRef = useRef(null);

  useEffect(() => {
    // Check login state from localStorage on component mount
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserName = localStorage.getItem("userName") || "";
    const storedUserId = localStorage.getItem("userId") || null;

    setIsLoggedIn(storedIsLoggedIn);
    setUserName(storedUserName);
    setUserId(storedUserId);
  }, []);

  // Function to open the modal
  // account type
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Functions for login modal
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleLogin = async (email, password) => {
    try {
      // Get all users and find matching email (case-insensitive)
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const user = users.find(
        (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim()
      );

      if (user) {
        // Find the corresponding profile
        const profileResponse = await fetch(
          `http://localhost:3000/profiles?user_id=${user.id}`
        );
        const profiles = await profileResponse.json();
        const userProfile = profiles[0];

        // Store user data in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userRole", user.role.toString());
        localStorage.setItem(
          "userName",
          userProfile
            ? `${userProfile.first_name} ${userProfile.last_name}`
            : user.email
        );

        setIsLoggedIn(true);
        setUserId(user.id);
        setUserName(
          userProfile
            ? `${userProfile.first_name} ${userProfile.last_name}`
            : user.email
        );

        closeLoginModal();

        // Show success feedback
        setFeedbackMessage("Successfully logged in!");
        setFeedbackType("success");
        setShowFeedback(true);
      } else {
        // Show error feedback
        setFeedbackMessage("Invalid email or password!");
        setFeedbackType("error");
        setShowFeedback(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setFeedbackMessage("An error occurred during login");
      setFeedbackType("error");
      setShowFeedback(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setUserId(null);

    // Clear login state from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("business_id");

    // Show feedback
    setFeedbackMessage("Successfully logged out!");
    setFeedbackType("info");
    setShowFeedback(true);
  };

  const handleCloseFeedback = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowFeedback(false);
  };

  console.log("selectMunicipality: ", selectMunicipality);

  const handleBarangayOption = (event) => {
    setSelectBarangay(event.target.value);
  };

  const handleMunicipalityOption = (event) => {
    setSelectMunicipality(event.target.value);
  };

  const handleSearch = () => {
    if (selectMunicipality === "All") {
      setFilteredByLocation(false);
    } else {
      setFilteredByLocation(!!selectMunicipality);
    }
    setSearchActive(!!searchQuery);

    // Scroll to cards section
    cardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handler function for selecting a filter
  const handleFilterClick = (filter) => {
    if (selectedFilter === filter) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter(filter);
    }
  };

  return (
    <div className="h-screen">
      {/* Feedback Popup */}
      <FeedbackPopup
        message={feedbackMessage}
        type={feedbackType}
        open={showFeedback}
        onClose={handleCloseFeedback}
      />

      {/* Render both modals */}
      {isModalOpen && (
        <SelectAccount isOpen={isModalOpen} closeModal={closeModal} />
      )}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          closeModal={closeLoginModal}
          onLogin={handleLogin}
        />
      )}
      <section
        className="h-[60%] sm:h-full flex flex-col"
        style={{
          backgroundImage: `url(${Cake_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header
          isLoggedIn={isLoggedIn}
          userName={userName}
          openLoginModal={openLoginModal}
          openModal={openModal}
          onLogout={handleLogout}
        />
        {/* Body Content */}
        <div className="flex-grow flex justify-center items-center ">
          <div className="text-white font-[poppins] text-center  border-green-400">
            <h2 className="text-[4.5vw] sm:text-[3.5vw] 2xl:text-[3vw] ">
              Order Online From Bakeries Around You
            </h2>
            <h3 className="text-[2vw] sm:text-[1.5vw] 2xl:text-[1vw] px-3  sm:px-0">
              Get Fresh Cakes Delivered for Your Celebrations—Order Online from
              Local Bakeries!
            </h3>
            {/* Location Section  */}
            <div className="flex flex-col justify-center items-center mt-[30px] sm:mt-[7vh]">
              <div className="w-full max-w-xl">
                <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Location Icon and Municipality Select */}
                  <div className="flex-1 flex items-center px-4 py-3">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <select
                      value={selectMunicipality}
                      onChange={handleMunicipalityOption}
                      className="flex-1 text-gray-700 text-sm sm:text-base font-medium focus:outline-none"
                    >
                      <option value="" disabled>
                        Select Municipality
                      </option>
                      <option value="All">All</option>
                      {municipalities.map((municipality) => (
                        <option
                          key={municipality.name}
                          value={municipality.name}
                        >
                          {municipality.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    className="px-6 py-3 bg-primary hover:bg-primary-dark transition-colors duration-200 text-white font-semibold text-sm sm:text-base flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span>Search</span>
                  </button>
                </div>

                {/* Optional: Add helper text below */}
                <p className="text-white text-xs sm:text-sm mt-2 text-center opacity-80">
                  Find bakeries and cake shops in your area
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-[5vw] md:px-[15vw] py-[2vw]" ref={cardsRef}>
        {/* Content Header */}
        <div className="text-secondary ">
          <h2 className="font-[oswald] text-[3vw]">Find Cake Near You</h2>
          <h3 className="font-[poppins] ">
            Discover Delicious Cakes for Every Occasion, Birthdays, Parties, and
            More, Right Near You!
          </h3>
        </div>
        {/* Filter option  */}
        <div className="flex justify-end my-5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6 border border-gray-300 rounded-lg px-[6px] sm:px-[8px] md:px-[10px] py-[3px] sm:py-[4px] md:py-[5px] w-fit text-secondary font-poppins shadow-sm">
            <button
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md transition-colors duration-300 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] ${
                selectedFilter === "rate"
                  ? "bg-[#D9D9D9] text-primary font-medium"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleFilterClick("rate")}
            >
              Rate
            </button>
            <button
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md transition-colors duration-300 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] ${
                selectedFilter === "service"
                  ? "bg-[#D9D9D9] text-primary font-medium"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleFilterClick("service")}
            >
              Service
            </button>
            <button
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md transition-colors duration-300 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] ${
                selectedFilter === "sold"
                  ? "bg-[#D9D9D9] text-primary font-medium"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleFilterClick("sold")}
            >
              Sold
            </button>
            <button
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md transition-colors duration-300 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] ${
                selectedFilter === "goods"
                  ? "bg-[#D9D9D9] text-primary font-medium"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleFilterClick("goods")}
            >
              Goods
            </button>
          </div>
        </div>

        <div className="w-full border border-gray-400 "></div>
        {/* Baker Business Card  */}
        <BakerBusinessCard
          selectedFilter={selectedFilter}
          openLoginModal={openLoginModal}
          selectedMunicipality={selectMunicipality}
          filteredByLocation={filteredByLocation}
          searchQuery={searchQuery}
          searchActive={searchActive}
        />
      </section>
    </div>
  );
};

export default MainPage;
