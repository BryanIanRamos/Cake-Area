import React from 'react';
import { Link } from 'react-router-dom';

const StoreProductCard = ({ id, image, title, description, price, rating }) => {
  return (
    <Link to={`/product/${id}`} className="w-full max-w-[280px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="w-full h-[180px] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {description}
        </p>

        {/* Price and Rating */}
        <div className="flex items-center justify-between">
          <span className="text-[#713000] font-semibold">
            ₱ {price.toFixed(2)}
          </span>
          {rating && (
            <div className="flex items-center gap-1">
              <span className="text-amber-400">★</span>
              <span className="text-sm text-gray-600">{rating}</span>
            </div>
          )}
        </div>

        {/* Quantity */}
        <div className="text-sm text-gray-500 mt-1">
          Quantity: 1
        </div>
      </div>
    </Link>
  );
};

export default StoreProductCard; 