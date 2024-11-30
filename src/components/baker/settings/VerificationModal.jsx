import React, { useState } from "react";
import { Icon } from "@iconify/react";

const VerificationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    businessType: "",
    yearsOperation: "",
    taxId: "",
    permit: null,
    license: null,
    certification: null,
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
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
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
        <div className="bg-white rounded-lg p-4 max-w-3xl w-full mx-4">
          <div className="border border-[#E88F2A] rounded-lg p-4">
            <h2 className="text-2xl font-semibold text-[#E88F2A] text-center mb-3">
              Business Application Details
            </h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              Please fill out all the required information below to complete
              your business verification.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Information
                  </h3>
                  <div>
                    <label className="block text-sm text-gray-700">
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      placeholder="Enter business type"
                      className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-[#E88F2A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700">
                      Years in Operation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="yearsOperation"
                      value={formData.yearsOperation}
                      onChange={handleInputChange}
                      placeholder="Enter years in operation"
                      className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-[#E88F2A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700">
                      Tax ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleInputChange}
                      placeholder="Enter Tax ID"
                      className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 focus:outline-none focus:border-[#E88F2A]"
                      required
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Documents
                  </h3>
                  <div>
                    <label className="block text-sm text-gray-700">
                      Permit <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="permit"
                      onChange={handleImageUpload}
                      className="w-full text-sm px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#E88F2A]"
                      accept="image/*,.pdf"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700">
                      License <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="license"
                      onChange={handleImageUpload}
                      className="w-full text-sm px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#E88F2A]"
                      accept="image/*,.pdf"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700">
                      Certification <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="certification"
                      onChange={handleImageUpload}
                      className="w-full text-sm px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#E88F2A]"
                      accept="image/*,.pdf"
                      required
                    />
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 italic text-center mt-6 mb-4">
                Once your business is verified, it will be displayed on the public baker area landing page
              </p>

              <div className="flex gap-3 justify-center mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-1.5 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-1.5 text-sm rounded-md bg-[#E88F2A] text-white hover:bg-[#da852b]"
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
