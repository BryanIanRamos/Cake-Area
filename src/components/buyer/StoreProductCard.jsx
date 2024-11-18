import React from 'react';
import { useNavigate } from 'react-router-dom';

const StoreProductCard = ({ id, image, title, description, price, rating }) => {
  const navigate = useNavigate();
  const formattedRating = rating.toFixed(1);

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="group bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
    >
      <div className="overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <div className="flex justify-between items-center mt-auto pt-3">
          <span className="text-primary font-semibold group-hover:scale-105 transition-transform duration-200">
            ₱ {price}
          </span>
          <div className="flex items-center group-hover:scale-105 transition-transform duration-200">
            <span className="text-amber-400 mr-1">★</span>
            <span className="text-gray-600">{formattedRating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductCard; 