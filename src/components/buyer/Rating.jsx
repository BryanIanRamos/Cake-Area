import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Rating = ({
  initialRating = 0,
  clickable,
  onRatingChange,
  icon = "ri:cake-3-fill",
}) => {
  // Round initialRating to the nearest integer and set it as the starting rating
  const [rating, setRating] = useState(Math.round(initialRating));
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index) => {
    if (clickable) {
      const newRating = index + 1; // Update rating on click (1-5 scale)
      setRating(newRating);
      if (onRatingChange) {
        onRatingChange(newRating); // Pass the new rating value to the parent
      }
    }
  };

  const handleMouseEnter = (index) => {
    if (clickable) {
      setHoverRating(index + 1); // Update hover rating
    }
  };

  const handleMouseLeave = () => {
    if (clickable) {
      setHoverRating(0); // Reset hover state
    }
  };

  return (
    <div>
      <div className="border flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Icon
            key={index}
            icon={icon} // Use the specified icon
            className={`cursor-pointer transition duration-300 ease-in-out transform ${
              index < (hoverRating || rating)
                ? "text-orange-500 scale-110"
                : "text-gray-400"
            } ${clickable ? "hover:text-orange-500 hover:scale-110" : ""}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: clickable ? "pointer" : "default" }} // Change cursor based on clickability
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;
