// TextInput.jsx
import React from "react";

const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  id,
  className,
  type = "text",
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`mr-2 absolute mx-3 px-1 text-[12px] bg-white text-primary ${className}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="border border-primary mt-2 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-[14px]" // Changed to w-full
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
