import React from 'react';
import { Link } from 'react-router-dom';

const StoreProductCard = ({ id, image, title, description, price, rating }) => {
  // Format rating to always show one decimal place
  const formattedRating = rating.toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <div className="flex justify-between items-center mt-auto pt-3">
          <span className="text-primary font-semibold">₱ {price}</span>
          <div className="flex items-center">
            <span className="text-amber-400 mr-1">★</span>
            <span className="text-gray-600">{formattedRating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductCard; 