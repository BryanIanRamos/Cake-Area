import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const BakerLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if user is logged in and has baker role
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");
    const storedUserName = localStorage.getItem("userName");

    if (!isLoggedIn || userRole !== "2") {
      navigate('/');
    } else {
      setUserName(storedUserName || "User");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
        userName={userName}
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