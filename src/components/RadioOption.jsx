import React, { useState } from "react";

function RadioOption({ options }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex gap-3 text-[0.8vw]">
      {options.map((option, index) => (
        <div key={index} className="flex gap-1">
          <input
            type="radio"
            id={`option-${index}`}
            name="options"
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
          />
          <label htmlFor={`option-${index}`}>{option}</label>
        </div>
      ))}
    </div>
  );
}

export default RadioOption;
