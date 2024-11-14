import React, { useState } from "react";
import Sidebar from "../../components/baker/Sidebar";
import { Icon } from "@iconify/react";
import profileImage from "../../assets/Dummy_Profile.png";

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
        <div className="max-w-4xl mx-auto">
          {/* Cover Photo and Profile Section */}
          <div className="relative mb-20 bg-white rounded-lg shadow-sm">
            <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1607478900766-efe13248b125"
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/90 transition-colors">
                <Icon icon="material-symbols:edit" />
                Edit cover photo
              </button>
            </div>
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white"
                />
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                  <Icon icon="material-symbols:edit" className="text-xl" />
                </button>
              </div>
            </div>
            <div className="absolute -bottom-16 left-44 flex items-center gap-2">
              <h2 className="text-2xl font-bold">{formData.storeName}</h2>
              {formData.verified && (
                <span className="bg-[#E88F2A] text-white text-sm px-3 py-1 rounded">
                  Get Verified
                </span>
              )}
            </div>
          </div>

          {/* Settings Navigation */}
          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "profile"
                  ? "bg-[#E88F2A] text-white"
                  : "bg-white text-gray-600"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Personal Information
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "business"
                  ? "bg-[#E88F2A] text-white"
                  : "bg-white text-gray-600"
              }`}
              onClick={() => setActiveTab("business")}
            >
              Business Information
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "security"
                  ? "bg-[#E88F2A] text-white"
                  : "bg-white text-gray-600"
              }`}
              onClick={() => setActiveTab("security")}
            >
              Security
            </button>
          </div>

          {/* Settings Content */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <form onSubmit={handleSubmit}>
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-500">
                    Display as your profile information
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Birth date
                      </label>
                      <input
                        type="text"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Keep your existing store and security tabs */}
              {activeTab === "business" && (
                // Your existing store settings
                <div className="space-y-6">
                  {/* ... existing store settings ... */}
                </div>
              )}

              {activeTab === "security" && (
                // Your existing security settings
                <div className="space-y-6">
                  {/* ... existing security settings ... */}
                </div>
              )}

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