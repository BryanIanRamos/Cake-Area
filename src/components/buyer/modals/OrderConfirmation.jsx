import React from 'react';
import { Icon } from "@iconify/react";

function OrderConfirmation({ closeModal, totalAmount}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="border w-[73vw] sm:w-[53vw] md:w-[43vw] lg:w-[35vw] h-fit p-4 sm:p-5 md:p-6 lg:p-7 bg-white">
      <div className="border-[3px] border-primary h-full p-2 md:p-3 lg:p-4 relative">
        <button
          className="absolute right-1 md:right-2 lg:right-3 top-1 md:top-2 lg:top-3 text-[3.6vw] sm:text-[3vh] md:text-[2.6vw] lg:text-[1.6vw] text-primary hover:text-red-400"
          onClick={closeModal}
          aria-label="Close modal"
        >
          <Icon icon="icon-park-solid:close-one" />
        </button>
        <div className="mb-6 flex flex-col items-center">
          <h2 className="text-primary font-bold text-[18px] sm:text-[1.6rem] 2xl:text-[2rem]">
            Confirm Order
          </h2>
          <p className="text-gray-600 text-[12px] sm:text-[14px] lg:text-[16px]">
            Do you want to checkout?
          </p>
        </div>
        <p className="text-center text-gray-500 text-[12px] sm:text-[14px] lg:text-[16px]">
          Total amount: <span className='font-bold text-2xl'>₱{totalAmount}.00</span>
        </p>
        <div className='flex gap-2 mt-5'>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 text-[2vw] sm:text-[1.5vw] lg:text-[1vw]"
          >
            Confirm
          </button>
          <button
            onClick={closeModal}
            className="w-full bg-gray-300 text-gray-600 py-2 rounded hover:bg-gray-200 text-[2vw] sm:text-[1.5vw] lg:text-[1vw]"
          >
            Cancel
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default OrderConfirmation