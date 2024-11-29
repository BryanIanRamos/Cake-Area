import React, { useState } from "react";
import { Icon } from "@iconify/react";
import TextInput from "./TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OrangeCheckbox from "./OrangeCheckbox";
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
    <div className="bg-white p-6 w-[90vw] max-w-2xl mx-auto">
      <div className="border-2 border-primary p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-primary font-bold text-2xl mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 text-sm">
            Please fill in your information to get started
          </p>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange("firstName")}
              placeholder="Enter your first name"
              error={errors.firstName}
            />
            <TextInput
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              placeholder="Enter your last name"
              error={errors.lastName}
            />
          </div>

          {/* Email Field */}
          <TextInput
            label="Email Address"
            value={formData.email}
            onChange={handleInputChange("email")}
            placeholder="Enter your email"
            error={errors.email}
          />

          {/* Password Fields */}
          <div className="grid grid-cols-2 gap-4">
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

          {/* Birth Date */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Birth Date
            </label>
            <DatePicker
              selected={formData.birthDate}
              onChange={(date) => setFormData({ ...formData, birthDate: date })}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select your birth date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
              showYearDropdown
              yearDropdownItemNumber={100}
              scrollableYearDropdown
            />
            {errors.birthDate && (
              <p className="text-sm text-red-600">{errors.birthDate}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-2">
            <div className="mt-1">
              <OrangeCheckbox
                isChecked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            </div>
            <p className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-600 mt-1">{errors.terms}</p>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
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
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSubmit={handleAddressSubmit}
      />
    </div>
  );
};

export default CreateAccount;
