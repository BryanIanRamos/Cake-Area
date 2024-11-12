import React from "react";
import { useState, useEffect } from "react";

// Add this CSS class to hide the spinners
const inputStyles = `
  /* For Chrome, Safari, Edge */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* For Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

export default function CardProducts({ data, isSelected }) {
  const [quantity, setQuantity] = useState(data.quantity || 1);
  const [isChecked, setIsChecked] = useState(false);

  // Add useEffect to sync with parent's isSelected prop
  useEffect(() => {
    setIsChecked(isSelected);
  }, [isSelected]);

  // Add handler for individual checkbox
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value < 1 ? 1 : value);
  };

  return (
    <>
      <style>{inputStyles}</style>
      <div className="flex flex-row items-start py-4 md:py-6 px-4 md:px-8 justify-between gap-4 md:gap-0">
        <div className="flex flex-row items-center gap-4">
          <div>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="w-4 h-4 md:w-5 md:h-5"
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
                  onClick={handleDecrement}
                  className="bg-gray-100 px-3 py-1 rounded-l-lg border border-gray-300"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-12 text-center border-gray-300"
                />
                <button
                  onClick={handleIncrement}
                  className="bg-gray-100 px-3 py-1 rounded-r-lg border border-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
