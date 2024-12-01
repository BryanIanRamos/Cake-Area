import React, { useState, useEffect } from "react";

const RadioOption = ({ options, defaultValue, onChange }) => {
  const [selected, setSelected] = useState(defaultValue || "");

  useEffect(() => {
    setSelected(defaultValue || "");
  }, [defaultValue]);

  const handleChange = (value) => {
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex gap-4">
      {options.map((option, index) => (
        <div key={index} className="flex items-center gap-1">
          <input
            type="radio"
            id={option}
            value={option}
            checked={selected === option}
            onChange={() => handleChange(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioOption;
