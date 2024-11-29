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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Add focus states for validation feedback
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
    if (validateForm()) {
      setShowAddressModal(true);
      console.log("showAddressModal set to:", true);
    } else {
      console.log("Form validation failed");
    }
  };

  // Handle address submission
  const handleAddressSubmit = (addressData) => {
    console.log("Address submitted:", addressData);
    setShowAddressModal(false);
  };

  // Add this new function to check if form is complete
  const isFormComplete = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== "" &&
      formData.birthDate !== null &&
      isChecked
    );
  };

  return (
    <div className="bg-white p-4 w-[90vw] max-w-xl mx-auto">
      <div className="border-2 border-primary p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-primary font-bold text-xl mb-1">
            Create Account
          </h2>
          <p className="text-gray-600 text-xs">
            Please fill in your information to get started
          </p>
        </div>

        {/* Form Content */}
        <div className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <TextInput
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                placeholder="Enter your first name"
                error={errors.firstName}
                required={true}
              />
            </div>

            <div className="relative">
              <TextInput
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                placeholder="Enter your last name"
                error={errors.lastName}
                required={true}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <TextInput
              label="Email"
              value={formData.email}
              onChange={handleInputChange("email")}
              placeholder="Enter your email"
              error={errors.email}
              required={true}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
            {isEmailFocused && (
              <div className="absolute left-full ml-4 top-0 w-48 bg-white p-3 rounded-md shadow-lg border text-sm">
                <h4 className="font-semibold mb-2">Email requirements:</h4>
                <ul className="space-y-1">
                  <li
                    className={`flex items-center gap-2 ${
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                      ? "✓"
                      : "×"}
                    Valid email format
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Password Fields */}
          <div className="space-y-3">
            <div className="relative">
              <TextInput
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange("password")}
                error={errors.password}
                required={true}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[30px] text-gray-500 hover:text-gray-700"
              >
                <Icon
                  icon={showPassword ? "ph:eye-slash" : "ph:eye"}
                  className="w-4 h-4"
                />
              </button>
              {isPasswordFocused && (
                <div className="absolute left-full ml-4 top-0 w-48 bg-white p-3 rounded-md shadow-lg border text-sm">
                  <h4 className="font-semibold mb-2">Password requirements:</h4>
                  <ul className="space-y-1">
                    <li
                      className={`flex items-center gap-2 ${
                        formData.password.length >= 8
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formData.password.length >= 8 ? "✓" : "×"} At least 8
                      characters
                    </li>
                    <li
                      className={`flex items-center gap-2 ${
                        /[A-Z]/.test(formData.password)
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {/[A-Z]/.test(formData.password) ? "✓" : "×"} One
                      uppercase letter
                    </li>
                    <li
                      className={`flex items-center gap-2 ${
                        /[a-z]/.test(formData.password)
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {/[a-z]/.test(formData.password) ? "✓" : "×"} One
                      lowercase letter
                    </li>
                    <li
                      className={`flex items-center gap-2 ${
                        /\d/.test(formData.password)
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {/\d/.test(formData.password) ? "✓" : "×"} One number
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <TextInput
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                error={errors.confirmPassword}
                required={true}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[30px] text-gray-500 hover:text-gray-700"
              >
                <Icon
                  icon={showConfirmPassword ? "ph:eye-slash" : "ph:eye"}
                  className="w-4 h-4"
                />
              </button>
              {formData.confirmPassword && (
                <p
                  className={`text-xs mt-1 ${
                    formData.password === formData.confirmPassword
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formData.password === formData.confirmPassword
                    ? "✓ Passwords match"
                    : "× Passwords do not match"}
                </p>
              )}
            </div>
          </div>

          {/* Birth Date */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700">
              Birth Date
            </label>
            <DatePicker
              selected={formData.birthDate}
              onChange={(date) => setFormData({ ...formData, birthDate: date })}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select your birth date"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
              showYearDropdown
              yearDropdownItemNumber={100}
              scrollableYearDropdown
            />
            {errors.birthDate && (
              <p className="text-xs text-red-600">{errors.birthDate}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3">
            {/* Terms Description with Checkbox */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  <OrangeCheckbox
                    isChecked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  . You are responsible for your account and any activity under
                  it. We may suspend or terminate accounts for violations of our
                  terms.
                </p>
              </div>
              {errors.terms && (
                <p className="text-xs text-red-600 ml-7 mt-1">{errors.terms}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={handleSubmit}
              disabled={!isFormComplete()}
              className={`px-6 py-1.5 text-sm rounded transition-colors ${
                isFormComplete()
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next
            </button>
            <button
              onClick={goBackToSelect}
              className="px-6 py-1.5 border border-primary text-primary text-sm rounded hover:bg-primary hover:text-white transition-colors"
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
