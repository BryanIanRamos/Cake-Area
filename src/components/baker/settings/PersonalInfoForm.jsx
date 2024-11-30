import React from "react";

const PersonalInfoForm = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-2xl mb-6">Personal Information</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">
            First name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Last name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Phone Number
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Birth date
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-gray-700 mb-2">
          Email
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="bg-[#E88F2A] text-white px-6 py-2.5 rounded-lg hover:bg-[#E88F2A]/90 
            transition-colors duration-200 shadow-sm"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
