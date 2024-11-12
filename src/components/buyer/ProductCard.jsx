import React from "react";
import { Icon } from "@iconify/react";

const ProductCard = ({ image, price }) => {
  return (
    <div className="w-full min-w-[70px] max-w-[120px] flex flex-col gap-1">
      <div className="aspect-square w-full">
        <img
          src={image}
          alt="Product Image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium">₱ {price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductCard;
