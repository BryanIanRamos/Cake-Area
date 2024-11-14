import React, { useState } from "react";
import Sidebar from "../../components/baker/Sidebar";

const Reviews = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <main
        className={`transition-all duration-300 flex-1 overflow-y-auto p-6
          ${isSidebarExpanded ? "ml-64" : "ml-20"}`}
      >
        <h1 className="text-2xl font-bold mb-6">Reviews</h1>
        {/* Add your reviews content here */}
      </main>
    </div>
  );
};

export default Reviews; 