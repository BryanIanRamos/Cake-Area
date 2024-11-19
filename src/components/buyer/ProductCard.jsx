import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ image, price, productId, name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col gap-1 cursor-pointer hover:opacity-90 transition-opacity relative group"
    >
      <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 whitespace-nowrap">
        {name}
      </div>
      <div className="">
        <img
          src={image}
          alt="Product Image"
          className="w-[100px] h-[100px] object-cover rounded-lg"
        />
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium">₱ {price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductCard;
