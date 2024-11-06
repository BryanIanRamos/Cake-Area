import React from "react";

function OrangeCheckbox({ label, isChecked, onChange }) {
  return (
    <label className="flex items-center cursor-pointer space-x-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="hidden" // Hide the default checkbox
      />
      <span
        className={`w-3 h-3 border-2 rounded flex items-center justify-center ${
          isChecked ? "bg-primary border-primary" : "border-gray-400"
        } transition-colors duration-300`}
      >
        {isChecked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </span>
      {/* <span>{label}</span> */}
    </label>
  );
}

export default OrangeCheckbox;
