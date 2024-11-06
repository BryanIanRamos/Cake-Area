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
      <div className="border h-fit p-3 sm:p-6 lg:p-7 bg-white w-[85vw] sm:w-[88vw] md:w-[75vw] lg:w-[55vw] xl:w-[48vw] 2xl:w-[40vw]">
        <div className="text-center w-full border-[3px] border-primary h-full p-5">
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-primary font-bold text-[18px] sm:text-[1.6rem] 2xl:text-[2rem]">
                Delivery Address
              </h2>
              <p className="text-gray-600 text-[12px] sm:text-[14px] lg:text-[16px]">
                Please fill in your delivery details
              </p>
            </div>

            <div className="space-y-4">
              {/* Full Name and Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Full Name *"
                  value={addressData.fullName}
                  onChange={handleInputChange("fullName")}
                  placeholder="Enter your full name"
                  error={errors.fullName}
                />
                <TextInput
                  label="Phone Number *"
                  value={addressData.phoneNumber}
                  onChange={handleInputChange("phoneNumber")}
                  placeholder="Enter 11-digit phone number"
                  error={errors.phoneNumber}
                />
              </div>

              {/* City, Barangay, and Postal Code */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextInput
                  label="City *"
                  value={addressData.city}
                  onChange={handleInputChange("city")}
                  placeholder="Enter city"
                  error={errors.city}
                />
                <TextInput
                  label="Barangay *"
                  value={addressData.barangay}
                  onChange={handleInputChange("barangay")}
                  placeholder="Enter barangay"
                  error={errors.barangay}
                />
                <TextInput
                  label="Postal Code *"
                  value={addressData.postalCode}
                  onChange={handleInputChange("postalCode")}
                  placeholder="Enter 4-digit postal code"
                  error={errors.postalCode}
                />
              </div>

              {/* Street Address (Optional) */}
              <TextInput
                label="Street Name / Building Name (Optional)"
                value={addressData.streetAddress}
                onChange={handleInputChange("streetAddress")}
                placeholder="Enter complete street address"
                error={errors.streetAddress}
                multiline={true}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                className="px-8 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors"
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
