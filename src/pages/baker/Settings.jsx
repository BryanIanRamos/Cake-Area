import React, { useState, useEffect } from "react";
import BakerLayout from "../../components/baker/BakerLayout";
import ProfileHeader from "../../components/baker/settings/ProfileHeader";
import PersonalInfoForm from "../../components/baker/settings/PersonalInfoForm";
import BusinessInfoForm from "../../components/baker/settings/BusinessInfoForm";
import SecurityForm from "../../components/baker/settings/SecurityForm";
import DummyProfile from "../../assets/Dummy_Profile.png";
import {
  updateProfile,
  updateBusiness,
  updateSecurity,
} from "../../utils/updateProfile";
import SuccessModal from "../../components/common/SuccessModal";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "••••••••••••",
    newPassword: "",
    storeName: "",
    verified: false,
    businessName: "",
    businessEmail: "",
    businessDescription: "",
    currentPassword: "",
    confirmPassword: "",
    profileImage: DummyProfile,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successModal, setSuccessModal] = useState(null);

  useEffect(() => {
    const fetchBakerData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const businessId = localStorage.getItem("business_id");

        if (!userId || !businessId) {
          throw new Error("User ID or Business ID not found");
        }

        // Fetch user data
        const userResponse = await fetch(
          `http://localhost:3000/users/${userId}`
        );
        const userData = await userResponse.json();

        // Fetch profile data
        const profileResponse = await fetch(
          `http://localhost:3000/profiles?user_id=${userId}`
        );
        const profileData = await profileResponse.json();

        // Fetch business data
        const businessResponse = await fetch(
          `http://localhost:3000/businesses?user_id=${userId}`
        );
        const businessData = await businessResponse.json();

        if (profileData.length > 0 && businessData.length > 0) {
          const profile = profileData[0];
          const business = businessData[0];

          setFormData({
            firstName: profile.first_name || "",
            lastName: profile.last_name || "",
            email: userData.email || "",
            phone: profile.phone_number || "",
            birthDate: profile.date_of_birth || "",
            password: "••••••••••••",
            newPassword: "",
            storeName: business.name || "",
            verified: business.is_active || false,
            businessName: business.name || "",
            businessEmail: userData.email || "",
            businessDescription: business.description || "",
            currentPassword: "",
            confirmPassword: "",
            profileImage: profile.img || DummyProfile,
          });
        } else {
          throw new Error("Profile or business data not found");
        }
      } catch (error) {
        console.error("Error fetching baker data:", error);
        setError("Failed to load baker information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBakerData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data immediately when input changes
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Optional: You can also update the database in real-time
    // but it's generally better to wait for form submission
    // to avoid too many API calls
  };

  const showSuccessModal = (message) => {
    setSuccessModal(message);
  };

  const handleProfileUpdate = async (updates) => {
    try {
      const userId = localStorage.getItem("userId");
      await updateProfile(userId, updates);

      setFormData((prev) => ({
        ...prev,
        firstName: updates.first_name,
        lastName: updates.last_name,
        phone: updates.phone_number,
        birthDate: updates.date_of_birth,
        email: updates.email,
      }));

      showSuccessModal("Your profile has been successfully updated");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleBusinessUpdate = async (updates) => {
    try {
      const userId = localStorage.getItem("userId");
      await updateBusiness(userId, updates);

      setFormData((prev) => ({
        ...prev,
        businessName: updates.name,
        businessEmail: updates.email,
        businessDescription: updates.description,
      }));

      showSuccessModal(
        "Your business information has been successfully updated"
      );
    } catch (error) {
      console.error("Error updating business:", error);
      alert("Failed to update business information. Please try again.");
    }
  };

  const handleSecurityUpdate = async (updates) => {
    try {
      const userId = localStorage.getItem("userId");
      await updateSecurity(userId, updates);

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      showSuccessModal("Your password has been successfully updated");
    } catch (error) {
      console.error("Error updating security:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  const handleImageUpdate = (tempImageUrl) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: tempImageUrl,
    }));
  };

  const tabs = [
    { id: "profile", label: "Personal Information", icon: "👤" },
    { id: "business", label: "Business Information", icon: "🏪" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  if (isLoading) {
    return (
      <BakerLayout>
        <div className="p-8 flex justify-center items-center">
          <div className="text-[#E88F2A] flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading baker information...</span>
          </div>
        </div>
      </BakerLayout>
    );
  }

  if (error) {
    return (
      <BakerLayout>
        <div className="p-8 flex justify-center items-center">
          <div className="text-red-500">{error}</div>
        </div>
      </BakerLayout>
    );
  }

  return (
    <BakerLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Account Settings</h1>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <ProfileHeader
              profileImage={formData.profileImage}
              fullName={`${formData.firstName} ${formData.lastName}`}
              storeName={formData.storeName}
              onImageUpdate={handleImageUpdate}
            />
          </div>

          {/* Navigation and Form Container */}
          <div className="flex gap-4">
            {/* Left Navigation */}
            <div className="w-64 shrink-0">
              <nav className="bg-white rounded-xl border border-gray-200 p-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center gap-3
                      ${
                        activeTab === tab.id
                          ? "bg-[#FDF3E7] text-[#E88F2A]"
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                  >
                    <span>{tab.icon}</span> {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Form Section */}
            <div className="flex-1">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <form onSubmit={(e) => e.preventDefault()}>
                  {activeTab === "profile" && (
                    <PersonalInfoForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      onSubmit={handleProfileUpdate}
                    />
                  )}
                  {activeTab === "business" && (
                    <BusinessInfoForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      onSubmit={handleBusinessUpdate}
                    />
                  )}
                  {activeTab === "security" && (
                    <SecurityForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      onSubmit={handleSecurityUpdate}
                    />
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {successModal && (
        <SuccessModal
          message={successModal}
          onClose={() => setSuccessModal(null)}
        />
      )}
    </BakerLayout>
  );
};

export default Settings;
