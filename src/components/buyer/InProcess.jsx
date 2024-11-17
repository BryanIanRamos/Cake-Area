import React from "react";

export default function InProcess({ data, quantity }) {
  return (
    <div className="flex flex-row items-start py-4 md:py-6 px-4 md:px-8">
      {/*Product Container*/}
      <div className="flex flex-row items-center gap-4">
        {/* Product Image Container */}
        <div className="flex flex-col items-center w-24 md:w-40">
          <img
            src={data.products.image}
            alt="cake"
            className="object-cover rounded-t-lg"
          />
          <p className="font-bold text-xs md:text-sm lg:text-lg rounded-b-lg bg-primary w-full text-white text-center py-1">
            ₱{data.products.price}
          </p>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-start items-start gap-2 max-w-xl">
          <h3 className="font-bold text-base md:text-xl lg:text-2xl line-clamp-2">
            {data.products.productName}
          </h3>

          {/* Description - Hidden on mobile */}
          <p className="hidden md:block text-xs lg:text-sm text-gray-500">
            {data.products.description}
          </p>

          {/* Quantity Display */}
          <div className="relative flex items-center max-w-[8rem]">
            <h1 className="text-gray-500 font-semibold">Quantity: {quantity}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
