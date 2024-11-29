import React, { useState } from "react";
import Sidebar from "../../components/baker/Sidebar";
import profileImage from "../../assets/Dummy_Profile.png";
import ProfileHeader from "../../components/baker/settings/ProfileHeader";
import SettingsTabs from "../../components/baker/settings/SettingsTabs";
import PersonalInfoForm from "../../components/baker/settings/PersonalInfoForm";

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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

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
        <div className="max-w-4xl mx-auto bg-[#f0eeee] rounded-xl shadow-md">
          <ProfileHeader
            profileImage={profileImage}
            storeName={formData.storeName}
            verified={formData.verified}
          />

          <div className="mt-6 bg-[#f0eeee] rounded-xl p-8 shadow-md">
            <form onSubmit={handleSubmit}>
              <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

              {activeTab === "profile" && (
                <PersonalInfoForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              {/* Add BusinessInfoForm and SecurityForm components later */}

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#E88F2A] text-white px-6 py-2 rounded-lg hover:bg-[#E88F2A]/90"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
