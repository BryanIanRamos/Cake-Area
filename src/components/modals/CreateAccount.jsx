import React, { useState } from "react";
import { Icon } from "@iconify/react";
import TextInput from "../TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OrangeCheckbox from "../OrangeCheckbox";
import AddressModal from "./AddressModal";

const CreateAccount = ({ goBackToSelect }) => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: null,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Handle input changes
  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Required fields
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.birthDate) newErrors.birthDate = "Birth date is required";
    if (!isChecked) newErrors.terms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Next button clicked");
    setShowAddressModal(true);
    console.log("showAddressModal set to:", true);
  };

  // Handle address submission
  const handleAddressSubmit = (addressData) => {
    console.log("Address submitted:", addressData);
    setShowAddressModal(false);
  };

  return (
    <div className="border h-fit p-3 sm:p-6 lg:p-7 bg-white w-[85vw] sm:w-[88vw] md:w-[75vw] lg:w-[55vw] xl:w-[48vw] 2xl:w-[40vw]">
      <div className="text-center w-full border-[3px] border-primary h-full p-5">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-primary font-bold text-[18px] sm:text-[1.6rem] 2xl:text-[2rem]">
            Create Account
          </h2>
          <p className="text-gray-600 text-[12px] sm:text-[14px] lg:text-[16px]">
            Let's set up your account! Please fill in your information to get
            started.
          </p>
        </div>

        {/* Form Grid */}
        <div className="sm:grid grid-cols-2 gap-6">
          {/* Left Column - Personal Info */}
          <div className="space-y-4">
            <div className="sm:flex gap-3">
              <TextInput
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                placeholder="Ex. Bryan"
                error={errors.firstName}
              />
              <TextInput
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                placeholder="Ex. Ramos"
                error={errors.lastName}
              />
            </div>
            <TextInput
              label="Email"
              value={formData.email}
              onChange={handleInputChange("email")}
              placeholder="Ex. Sample@gmail.com"
              error={errors.email}
            />
            <TextInput
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              error={errors.password}
            />
            <TextInput
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              error={errors.confirmPassword}
            />
          </div>

          {/* Right Column - Birth Date & Terms */}
          <div className="flex flex-col items-start sm:items-center justify-center space-y-4 mt-4 sm:mt-0">
            {/* Birth Date Section */}
            <div className="w-full space-y-3 flex flex-col items-start p-4">
              {/* DatePicker Container with Header */}
              <div className="relative w-full space-y-3 flex flex-col items-start">
                {/* Birthday Header */}
                <div className="flex items-center gap-2 text-primary  self-start w-fit px-2">
                  <Icon
                    icon="ri:cake-3-line"
                    className="text-[20px] sm:text-[24px] lg:text-[28px]"
                  />
                  <h3 className="font-semibold text-[14px] sm:text-[16px] lg:text-[18px]">
                    Birth date
                  </h3>
                </div>

                {/* DatePicker Input */}
                <div className="w-full flex flex-col items-start">
                  <DatePicker
                    selected={formData.birthDate}
                    onChange={(date) =>
                      setFormData({ ...formData, birthDate: date })
                    }
                    dateFormat="MM/d/yyyy"
                    placeholderText="Select your birth date"
                    className="w-full border border-primary rounded py-1.5 px-3 text-[12px] sm:text-[14px] lg:text-[16px] text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    showYearDropdown
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                  />
                  {errors.birthDate && (
                    <p className="text-red-500 text-[10px] sm:text-[12px] mt-1 self-start">
                      {errors.birthDate}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="w-full px-4">
              <div className="flex items-start gap-1">
                <div className="mt-1">
                  <OrangeCheckbox
                    isChecked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  By creating this account, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="px-8 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            Next
          </button>
          <button
            onClick={goBackToSelect}
            className="px-8 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors"
          >
            Back
          </button>
        </div>
      </div>
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSubmit={handleAddressSubmit}
      />
    </div>
  );
};

export default CreateAccount;
