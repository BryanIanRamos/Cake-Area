import React from "react";

const SecurityForm = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-2xl mb-6">Security</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">
            Current Password
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div className="opacity-0">
          {/* Empty div to maintain grid alignment */}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            New Password
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Confirm New Password
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Password requirements:</p>
        <ul className="list-disc ml-5 mt-2">
          <li>At least 8 characters long</li>
          <li>Must contain at least one uppercase letter</li>
          <li>Must contain at least one number</li>
          <li>Must contain at least one special character</li>
        </ul>
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

export default SecurityForm;
