import React, { useState } from "react";
import Sidebar from "../../components/baker/Sidebar";
import ProfileHeader from "../../components/baker/settings/ProfileHeader";
import PersonalInfoForm from "../../components/baker/settings/PersonalInfoForm";
import BusinessInfoForm from "../../components/baker/settings/BusinessInfoForm";
import SecurityForm from "../../components/baker/settings/SecurityForm";
import DummyProfile from "../../assets/Dummy_Profile.png";

const Settings = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    firstName: "Bryan",
    lastName: "Ramos",
    email: "bryanramos@gmail.com",
    phone: "0912 345 6789",
    birthDate: "04/20/2001",
    password: "••••••••••••",
    newPassword: "",
    storeName: "Bryan's Bakeria",
    verified: true,
    businessName: "Bryan's Bakeria",
    businessEmail: "business@bryansbakeria.com",
    businessDescription:
      "A premium bakery offering delicious pastries and custom cakes for all occasions.",
    currentPassword: "",
    confirmPassword: "",
    profileImage: DummyProfile,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const tabs = [
    { id: "profile", label: "Personal Information", icon: "👤" },
    { id: "business", label: "Business Information", icon: "🏪" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <main
        className={`transition-all duration-300 flex-1 overflow-y-auto p-8
          ${isSidebarExpanded ? "ml-64" : "ml-20"}`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Account Settings
            </h1>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <ProfileHeader
              profileImage={formData.profileImage}
              storeName={formData.storeName}
              verified={formData.verified}
            />
          </div>

          {/* Navigation and Form Container */}
          <div className="flex gap-4">
            {/* Left Navigation */}
            <div className="w-64 shrink-0">
              <nav className="bg-white rounded-xl border border-gray-200 p-4">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center gap-3
                    ${
                      activeTab === "profile"
                        ? "bg-[#FDF3E7] text-[#E88F2A]"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                >
                  <span>👤</span> Personal Information
                </button>
                <button
                  onClick={() => setActiveTab("business")}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center gap-3
                    ${
                      activeTab === "business"
                        ? "bg-[#FDF3E7] text-[#E88F2A]"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                >
                  <span>🏪</span> Business Information
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3
                    ${
                      activeTab === "security"
                        ? "bg-[#FDF3E7] text-[#E88F2A]"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                >
                  <span>🔒</span> Security
                </button>
              </nav>
            </div>

            {/* Right Form Section */}
            <div className="flex-1">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <form>
                  {activeTab === "profile" && (
                    <PersonalInfoForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />
                  )}
                  {activeTab === "business" && (
                    <BusinessInfoForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />
                  )}
                  {activeTab === "security" && (
                    <SecurityForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
