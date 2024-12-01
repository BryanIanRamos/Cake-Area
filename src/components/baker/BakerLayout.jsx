import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const BakerLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        // Fetch profile data
        const response = await fetch(
          `http://localhost:3000/profiles?user_id=${userId}`
        );
        const profiles = await response.json();

        if (profiles.length > 0) {
          const profile = profiles[0];
          setProfileImage(profile.img || "../assets/profile/Sarah_Baker.png");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    // Check if user is logged in and has baker role
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");
    const storedUserName = localStorage.getItem("userName");

    if (!isLoggedIn || userRole !== "2") {
      navigate("/");
    } else {
      setUserName(storedUserName || "User");
      fetchUserProfile();
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
        userName={userName}
        profileImage={profileImage}
      />
      <main
        className={`transition-all duration-300 flex-1 overflow-y-auto
          ${isSidebarExpanded ? "ml-64" : "ml-20"}`}
      >
        {children}
      </main>
    </div>
  );
};

export default BakerLayout;
