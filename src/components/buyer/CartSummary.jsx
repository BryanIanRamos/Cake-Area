import React, { useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";

const CartSummary = ({ totalAmount, totalQuantity }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="fixed bottom-0 w-full">
      <div
        className={`transform transition-all duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="absolute -top-8 right-4 md:right-40 bg-secondary px-6 py-1 rounded-t-lg hover:bg-secondary/90 transition-all duration-300 cursor-pointer flex items-center gap-2"
        >
          <span className="text-white text-sm">Summary</span>
          <LuArrowUpDown
            className={`text-white transform transition-transform duration-300 ${
              isVisible ? "rotate-0" : "rotate-180"
            }`}
            size={20}
          />
        </button>

        {/* Summary Content */}
        <div className="bg-secondary w-full">
          <div className="px-4 md:px-40 py-3">
            <p className="text-xs md:text-sm lg:text-base text-white">
              Before you check out, please double-check your order details.
            </p>
            {/* Add Total Items Row */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm md:text-base text-white">
                Total Items: {totalQuantity || 0}
              </span>
            </div>
            <div className="flex flex-row justify-between items-center my-1 md:my-2">
              <span className="font-bold text-md sm:text-lg md:text-xl lg:text-2xl text-white">
                Total Down Payment: ₱{totalAmount?.toFixed(2) || "0.00"}
              </span>
              <div className="flex space-x-2">
                <button className="mr-3 text-xs md:text-base text-white rounded-lg hover:text-gray-200 transition-colors">
                  Remove
                </button>
                <button className="px-2 md:px-4 py-2 md:py-2.5 text-xs md:text-base bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`absolute bottom-0 right-4 md:right-40 bg-secondary px-6 py-1 rounded-t-lg hover:bg-secondary/90 transition-opacity duration-300 cursor-pointer flex items-center gap-2 ${
          isVisible ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="text-white text-sm">
          Summary ({totalQuantity || 0} items)
        </span>
        <LuArrowUpDown className="text-white transform rotate-180" size={20} />
      </button>
    </div>
  );
};

export default CartSummary;
