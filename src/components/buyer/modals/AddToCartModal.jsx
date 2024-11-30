import React, { useState } from 'react';
import { Icon } from "@iconify/react";

const AddToCartModal = ({ isOpen, closeModal, product, quantity, onConfirm }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!isOpen) return null;

  // Calculate prices
  const totalPrice = product.price * quantity;
  const downPayment = totalPrice * 0.5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add to Cart</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <Icon icon="mdi:close" className="text-2xl" />
          </button>
        </div>

        {/* Product Info */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">{product.prod_name}</h3>
          <div className="flex items-center gap-4 py-2 border-y border-gray-200">
            {/* Price and Down Payment Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-gray-500 text-sm">₱</span>
                <span className="text-lg font-semibold">
                  {totalPrice.toFixed(2)}
                </span>
                <span className="text-gray-500 text-sm">Price</span>
              </div>
              <div className="text-gray-300">|</div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500 text-sm">₱</span>
                <span className="text-lg font-semibold">
                  {downPayment.toFixed(2)}
                </span>
                <span className="text-gray-500 text-sm">Down payment</span>
              </div>
              <div className="bg-[#F4A340] text-white px-2 py-1 rounded">
                50%
              </div>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Quantity: {quantity}
          </div>
        </div>

        {/* Image Selection */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Select product image:</p>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImageIndex === index
                    ? 'border-primary'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.prod_name} view ${index + 1}`}
                  className="w-full h-16 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Selected Image Preview */}
        <div className="mb-4">
          <img
            src={product.images[selectedImageIndex]}
            alt={product.prod_name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onConfirm(selectedImageIndex)}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={closeModal}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal; 