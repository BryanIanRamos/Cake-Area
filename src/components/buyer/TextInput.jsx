// TextInput.jsx
import React from "react";
import { Icon } from "@iconify/react";

const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  icon,
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {icon && (
          <Icon
            icon={icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 ${icon ? 'pl-10' : 'pl-4'} py-2 border rounded-lg
          focus:ring-2 focus:ring-primary/50 focus:border-primary
          ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextInput;
