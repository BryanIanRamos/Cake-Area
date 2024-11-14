import React from 'react';

const ReviewFilters = ({ selectedRating, setSelectedRating }) => {
  return (
    <div className="flex gap-2 mb-6">
      {["all", "5", "4", "3", "2", "1"].map((rating) => (
        <button
          key={rating}
          onClick={() => setSelectedRating(rating)}
          className={`px-4 py-2 rounded-lg ${
            selectedRating === rating
              ? "bg-[#E88F2A] text-white"
              : "bg-white text-gray-600"
          }`}
        >
          {rating === "all" ? "All Reviews" : `${rating} Stars`}
        </button>
      ))}
    </div>
  );
};

export default ReviewFilters; 