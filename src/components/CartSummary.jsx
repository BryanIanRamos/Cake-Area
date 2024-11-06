import React from 'react';

const CartSummary = ({ totalAmount }) => {
  return (
    <div className="bg-secondary py-1 md:py-2 fixed bottom-0 w-full px-4 md:px-40">
      <p className="text-xs md:text-sm lg:text-base text-white">
        Before you check out, please double-check your order details.
      </p>
      <div className="flex flex-row justify-between items-center my-1 md:my-2">
        <span className="font-bold text-md sm:text-lg md:text-xl lg:text-2xl text-white">
          Total Down Payment: ₱{totalAmount}
        </span>
        <div className="flex space-x-2">
          <button className="mr-3 text-xs md:text-base text-white rounded-lg">
            Remove
          </button>
          <button className="px-2 md:px-4 py-2 md:py-2.5 text-xs md:text-base bg-primary text-white rounded-lg">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
