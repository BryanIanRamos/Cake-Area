import React from "react";

const RadioOption = ({ options, selected, onChange }) => {
  return (
    <div className="flex gap-4">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name="gender"
            value={option}
            checked={selected === option}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-primary"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioOption;
