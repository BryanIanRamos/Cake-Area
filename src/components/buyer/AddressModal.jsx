import React, { useState } from "react";
import TextInput from "./TextInput";
import { Icon } from "@iconify/react";

const AddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [addressData, setAddressData] = useState({
    fullName: "",
    phoneNumber: "",
    city: "",
    barangay: "",
    postalCode: "",
    streetAddress: "",
    addressType: "",
  });
  const [errors, setErrors] = useState({});
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  const handleInputChange = (field) => (event) => {
    setAddressData({ ...addressData, [field]: event.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleNumberInput = (field, maxLength) => (event) => {
    const value = event.target.value;
    if (value === "" || (/^\d+$/.test(value) && value.length <= maxLength)) {
      setAddressData({ ...addressData, [field]: value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: null });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!addressData.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!addressData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!validatePhoneNumber(addressData.phoneNumber.trim()))
      newErrors.phoneNumber = "Please enter a valid phone number";
    if (!addressData.city.trim()) newErrors.city = "City is required";
    if (!addressData.barangay.trim())
      newErrors.barangay = "Barangay is required";
    if (!addressData.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    if (!/^\d{4}$/.test(addressData.postalCode.trim()))
      newErrors.postalCode = "Please enter a valid 4-digit postal code";
    if (!addressData.addressType)
      newErrors.addressType = "Please select an address type";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(addressData);
    }
  };

  // Validate Philippine phone number
  const validatePhoneNumber = (phone) => {
    const cleanPhone = phone.replace(/\D/g, "");
    return /^09\d{9}$/.test(cleanPhone);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 w-[90vw] max-w-xl">
        <div className="border-2 border-primary p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-primary font-bold text-xl mb-1">
              Delivery Address
            </h2>
            <p className="text-gray-600 text-xs">
              Please fill in your delivery details
            </p>
          </div>

          <div className="space-y-4">
            {/* Full Name and Phone Number */}
            <div className="grid grid-cols-2 gap-3">
              <TextInput
                label="Full Name"
                value={addressData.fullName}
                onChange={handleInputChange("fullName")}
                placeholder="Enter your full name"
                error={errors.fullName}
                required={true}
              />
              <div className="relative">
                <TextInput
                  label="Phone Number"
                  value={addressData.phoneNumber}
                  onChange={handleNumberInput("phoneNumber", 11)}
                  placeholder="Enter 11-digit phone number"
                  error={errors.phoneNumber}
                  required={true}
                  type="number"
                  pattern="\d*"
                  maxLength="11"
                  onFocus={() => setIsPhoneFocused(true)}
                  onBlur={() => setIsPhoneFocused(false)}
                />

                {/* Phone Number Requirements Popup */}
                {isPhoneFocused && (
                  <div className="absolute left-full ml-4 top-0 w-48 bg-white p-3 rounded-md shadow-lg border text-sm">
                    <h4 className="font-semibold mb-2">Phone number format:</h4>
                    <ul className="space-y-1">
                      <li
                        className={`flex items-center gap-2 ${
                          validatePhoneNumber(addressData.phoneNumber)
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {validatePhoneNumber(addressData.phoneNumber)
                          ? "✓"
                          : "×"}
                        Must start with 09
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          addressData.phoneNumber.length === 11
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {addressData.phoneNumber.length === 11 ? "✓" : "×"}
                        Must be 11 digits
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          /^\d+$/.test(addressData.phoneNumber)
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {/^\d+$/.test(addressData.phoneNumber) ? "✓" : "×"}
                        Numbers only
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* City, Barangay, and Postal Code */}
            <div className="grid grid-cols-3 gap-3">
              <TextInput
                label="City"
                value={addressData.city}
                onChange={handleInputChange("city")}
                placeholder="Enter city"
                error={errors.city}
                required={true}
              />
              <TextInput
                label="Barangay"
                value={addressData.barangay}
                onChange={handleInputChange("barangay")}
                placeholder="Enter barangay"
                error={errors.barangay}
                required={true}
              />
              <TextInput
                label="Postal Code"
                value={addressData.postalCode}
                onChange={handleNumberInput("postalCode", 4)}
                placeholder="Enter 4-digit postal code"
                error={errors.postalCode}
                required={true}
                type="number"
                pattern="\d*"
                maxLength="4"
              />
            </div>

            {/* Street Address */}
            <TextInput
              label="Street Name / Building Name"
              value={addressData.streetAddress}
              onChange={handleInputChange("streetAddress")}
              placeholder="Enter complete street address"
              error={errors.streetAddress}
              required={false}
            />

            {/* Address Type Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">
                Address Type
                {!addressData.addressType && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAddressData({ ...addressData, addressType: "home" })}
                  className={`flex-1 py-1.5 px-4 rounded border-2 transition-colors duration-200 text-sm
                    ${addressData.addressType === "home" || !addressData.addressType
                      ? "border-primary bg-primary text-white"
                      : "border-primary text-primary hover:bg-primary/5"
                    }`}
                >
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => setAddressData({ ...addressData, addressType: "work" })}
                  className={`flex-1 py-1.5 px-4 rounded border-2 transition-colors duration-200 text-sm
                    ${addressData.addressType === "work"
                      ? "border-primary bg-primary text-white"
                      : "border-primary text-primary hover:bg-primary/5"
                    }`}
                >
                  Work
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="px-6 py-1.5 bg-primary text-white text-sm rounded hover:bg-primary/90 transition-colors"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                className="px-6 py-1.5 border border-primary text-primary text-sm rounded hover:bg-primary hover:text-white transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
