import React, { useState } from "react";
import { Icon } from "@iconify/react";

const VerificationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    permitNumber: "",
    expiryDate: "",
    businessPermitImage: null,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      businessPermitImage: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
    // Handle form submission here
    console.log(formData);
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {!showSuccessModal ? (
        <div className="bg-white rounded-lg p-8 max-w-xl w-full mx-4">
          <div className="border border-[#E88F2A] rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-[#E88F2A] text-center mb-2">
              Get Verified
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Please provide your business permit information to verify your
              account
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-1">
                  Business Permit Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="permitNumber"
                  value={formData.permitNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your permit number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#E88F2A]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#E88F2A]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Business Permit Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="businessPermitImage"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#E88F2A]"
                  accept="image/*"
                  required
                />
                <p className="mt-4 text-sm text-gray-600 italic">
                  Once verified, your business will be visible to customers in
                  the public Bakers' Area
                </p>
              </div>

              <div className="flex gap-4 justify-center mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-8 py-2 rounded-lg bg-[#E88F2A] text-white hover:bg-[#da852b]"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="mb-4">
            <Icon
              icon="lets-icons:check-fill"
              className="text-green-500 text-6xl mx-auto"
            />
          </div>
          <h3 className="text-xl font-semibold mb-4">
            Verification Request Sent!
          </h3>
          <p className="text-gray-600 mb-6">
            We will let you know the status of your request through email.
          </p>
          <button
            onClick={handleClose}
            className="px-8 py-2 rounded-lg bg-[#E88F2A] text-white hover:bg-[#da852b]"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default VerificationModal;
