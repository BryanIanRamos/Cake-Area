import React, { useState } from "react";
import TextInput from "./TextInput";

const AddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [addressData, setAddressData] = useState({
    fullName: "",
    phoneNumber: "",
    city: "",
    barangay: "",
    postalCode: "",
    streetAddress: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (event) => {
    setAddressData({ ...addressData, [field]: event.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleNumberInput = (field, maxLength) => (event) => {
    const value = event.target.value;
    if (value === '' || (/^\d+$/.test(value) && value.length <= maxLength)) {
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
    if (!addressData.city.trim()) newErrors.city = "City is required";
    if (!addressData.barangay.trim())
      newErrors.barangay = "Barangay is required";
    if (!addressData.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    if (!/^\d{11}$/.test(addressData.phoneNumber.trim()))
      newErrors.phoneNumber = "Please enter a valid 11-digit phone number";
    if (!/^\d{4}$/.test(addressData.postalCode.trim()))
      newErrors.postalCode = "Please enter a valid 4-digit postal code";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(addressData);
    }
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
              />
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
