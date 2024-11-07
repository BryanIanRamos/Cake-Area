import React from "react";

export default function CardProducts({data}) {
  return (
    <div className='flex flex-row items-start py-4 md:py-6 px-4 md:px-8 justify-between gap-4 md:gap-0'>
      <div className="flex flex-row items-center gap-4 md:gap-8 w-full">
        <div>
          <input 
            type="checkbox" 
            name="" 
            id="" 
            className="w-4 h-4 md:w-5 md:h-5" 
          />
        </div>

        {/* Product Image Container */}
        <div className="flex flex-col items-center w-24 md:w-32">
          <img
            src={data.image}
            alt="cake"
            className="w-24 md:w-32 h-24 md:h-32 object-cover rounded-t-lg"
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
          
          {/* Description - Hidden on mobile */}
          <p className="hidden md:block text-xs lg:text-sm text-gray-500">
            {data.description}
          </p>

          {/* Quantity Controls */}
          <form>
            <div className="relative flex items-center max-w-[8rem]">
              <button
                type="button"
                id="decrement-button"
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-1.5 md:p-3 h-8 md:h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
              >
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                type="text"
                id="quantity-input"
                data-input-counter
                className="bg-gray-50 border-x-0 border-gray-300 h-8 md:h-11 text-center text-gray-900 text-xs md:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 md:py-2.5"
                placeholder="999"
                value="5"
                required
              />
              <button
                type="button"
                id="increment-button"
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-1.5 md:p-3 h-8 md:h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
              >
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Order Details */}
      {/* <div className="flex flex-col gap-2 md:gap-8 font-semibold w-auto">
        <div className="gap-1 md:gap-2">
          <p className="text-xs md:text-sm text-primary font-bold">Order Placed: </p>
          <p className="text-xs md:text-sm">{data.orderDate}</p>
        </div>
        <div className="gap-1 md:gap-2">
          <p className="text-xs md:text-sm text-primary font-bold">To Receive: </p>
          <p className="text-xs md:text-sm">{data.receiveDate}</p>
        </div>
      </div> */}
    </div>
  );
}
