import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index) => {
    setRating(index + 1); // Update rating on click
  };

  const handleMouseEnter = (index) => {
    setHoverRating(index + 1); // Update hover rating
  };

  const handleMouseLeave = () => {
    setHoverRating(0); // Reset hover state
  };
  return (
    <div>
      <div className="border py-2 flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Icon
            key={index}
            icon="ri:cake-3-fill"
            className={`cursor-pointer text-[20px] transition duration-300 ease-in-out transform ${
              index < (hoverRating || rating)
                ? "text-orange-500 scale-110"
                : "text-gray-400"
            } hover:text-orange-500 hover:scale-110`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;
