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
  required = false,
  pattern,
  maxLength,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-700">
        {label}
        {required && value.trim().length === 0 && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>
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
          pattern={pattern}
          maxLength={maxLength}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`w-full px-3 ${
            icon ? "pl-10" : "pl-4"
          } py-1.5 text-sm border rounded-lg
          focus:ring-2 focus:ring-primary/50 focus:border-primary
          ${error ? "border-red-500" : "border-gray-300"}
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default TextInput;
