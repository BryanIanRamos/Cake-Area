import React, { useState, useEffect } from "react";
import Cake_BG from "../../assets/Cake_BG.png";
import BakerBusinessCard from "../../components/buyer/BakerBusinessCard";
import SelectAccount from "../../components/buyer/SelectAccount";
import LoginModal from "../../components/buyer/LoginModal";
import Header from "../../components/buyer/Header";
import FeedbackPopup from "../../components/buyer/FeedbackPopup";
import { userData } from "../../data/userDataTbl";
import { profileData } from "../../data/profileDataTbl";

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

  const handleLogin = (email, password) => {
    // Find user with matching email and password
    const user = userData.users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Find the corresponding profile
      const userProfile = profileData.profiles.find(
        (profile) => profile.user_id === user.user_id
      );

      setIsLoggedIn(true);
      setUserId(user.id);
      setUserName(
        userProfile
          ? `${userProfile.first_name} ${userProfile.last_name}`
          : user.email
      );

      // Store login state in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : user.email);

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
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setUserId(null);

    // Clear login state from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");

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

  console.log("selectBarangay: ", selectBarangay);
  console.log("selectStreet: ", selectMunicipality);

  const handleBarangayOption = (event) => {
    setSelectBarangay(event.target.value);
  };

  const handleMunicipalityOption = (event) => {
    setSelectMunicipality(event.target.value);
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
            <div className="flex flex-col justify-center items-center border-green-700 mt-[30px] sm:mt-[7vh]">
              <div className=" border-red-400 h-[8vw] sm:h-[4vw] grid sm:grid-cols-3 w-[200px] sm:w-fit">
                <div className="border bg-white grid grid-cols-3 sm:grid grid-rows-3-col justify-center items-center px-2 sm:px-5 gap-1 max-sm:py-2 ">
                  <h3 className="text-primary font-semibold text-[9px] sm:text-[1vw] ml-1 col-span-1">
                    {"  "}Municipality{"  "}
                  </h3>
                  <select
                    value={selectMunicipality}
                    onChange={handleMunicipalityOption}
                    className="text-tertiary text-[1.7vw] sm:text-[1vw] col-span-2"
                  >
                    <option value={""} disabled>
                      -- Choose an option --
                    </option>
                    <option value={"Barangay Ambago"}>Barangay Ambago</option>
                    <option value={"Barangay Tiniwisan"}>
                      Barangay Tiniwisan
                    </option>
                  </select>
                </div>
                <div className="border bg-white grid grid-cols-3 sm:grid grid-rows-3-col justify-center items-center px-2 sm:px-5 gap-1 max-sm:py-2 ">
                  <h3 className="text-primary font-semibold text-[9px] sm:text-[1vw] ml-1 col-span-1">
                    {"  "}Barangay{"  "}
                  </h3>
                  <select
                    value={selectBarangay}
                    onChange={handleBarangayOption}
                    className="text-tertiary text-[1.7vw] sm:text-[1vw] col-span-2"
                  >
                    <option value={""} disabled>
                      -- Choose an option --
                    </option>
                    <option value={"Barangay Ambago"}>Barangay Ambago</option>
                    <option value={"Barangay Tiniwisan"}>
                      Barangay Tiniwisan
                    </option>
                  </select>
                </div>
                <button className="bg-primary  text-[2vw] sm:text-[1.5vw] font-semibold text-white hover:text-primary hover:bg-white hover:border-l-2   max-sm:h-8">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-[5vw] md:px-[15vw] py-[2vw]">
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
        />
      </section>
    </div>
  );
};

export default MainPage;
