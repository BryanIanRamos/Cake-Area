import React from "react";

const BusinessInfoForm = ({ formData, handleInputChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const updates = {
      name: formData.businessName,
      email: formData.businessEmail,
      description: formData.businessDescription,
    };

    onSubmit(updates);
  };

  return (
    <div>
      <h2 className="text-2xl mb-6">Business Information</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">
            Business Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Business Email
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="email"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-gray-700 mb-2">
          Business Description
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          name="businessDescription"
          value={formData.businessDescription}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          type="button"
          className="bg-[#E88F2A] text-white px-6 py-2.5 rounded-lg hover:bg-[#E88F2A]/90 
            transition-colors duration-200 shadow-sm"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default BusinessInfoForm;
