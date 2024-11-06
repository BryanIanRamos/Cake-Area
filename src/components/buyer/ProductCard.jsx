import React from "react";
import { Icon } from "@iconify/react";

const ProductCard = ({ image, title, description, price, rating }) => {
  return (
    <div className="w-full max-w-[240px] h-[240px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="w-full h-[120px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-2.5 h-[120px] relative">
        {/* Title */}
        <h3 className="text-sm font-[Oswald] font-medium text-gray-800 mb-1 truncate">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 font-[Noto-Serif] mb-1.5 line-clamp-2">
          {description}
        </p>

        {/* Price and Rating */}
        <div className="flex justify-between items-center absolute bottom-2.5 left-2.5 right-2.5">
          <div className="text-sm text-gray-800 font-[Oswald]">
            ₱ {price.toFixed(1)}
          </div>
          <div className="flex items-center gap-1 text-gray-700">
            <Icon icon="material-symbols:star" className="text-amber-400 text-sm" />
            <span className="font-[Oswald] text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
