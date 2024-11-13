import React from "react";

export default function CardProducts({ data, onSelectItem, isSelected }) {
  const handleQuantityChange = (change) => {
    // Logic to handle quantity change
    // This can be implemented to notify the parent component
  };

  return (
    <div className="flex flex-row items-start py-4 md:py-6 px-4 md:px-8 justify-between gap-4 md:gap-0">
      <div className="flex flex-row items-center gap-4">
        <div>
          <input
            type="checkbox"
            className="w-4 h-4 md:w-5 md:h-5"
            onChange={() => onSelectItem(data.productId, data.price * data.quantity, data.quantity)}
            checked={isSelected}
          />
        </div>

        {/* Product Image Container */}
        <div className="flex flex-col items-center w-24 md:w-40">
          <img
            src={data.image}
            alt="cake"
            className="object-cover rounded-t-lg"
          />
          <p className="font-bold text-sm md:text-base lg:text-lg rounded-b-lg bg-primary w-full text-white text-center py-1">
            ₱{data.price}
          </p>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-start items-start gap-2 max-w-xl">
          <h3 className="font-bold text-base md:text-xl lg:text-2xl line-clamp-2">
            {data.productName}
          </h3>
          <p className="text-sm text-gray-500">
            {data.description}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <button
                className="bg-gray-100 px-3 py-1 rounded-l-lg border border-gray-300"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <input
                type="number"
                value={data.quantity}
                className="w-12 text-center border-gray-300"
                readOnly
              />
              <button
                className="bg-gray-100 px-3 py-1 rounded-r-lg border border-gray-300"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
