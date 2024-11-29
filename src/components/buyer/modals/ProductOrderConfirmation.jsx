import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import { FiAlertCircle } from "react-icons/fi";

const ProductOrderConfirmation = ({ isOpen, closeModal, product, quantity, onConfirm }) => {
  const [selectedPayment, setSelectedPayment] = useState('gcash');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  if (!isOpen) return null;

  const totalAmount = product.price * quantity;
  const downPayment = totalAmount * 0.5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order Confirmation</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <Icon icon="mdi:close" className="text-2xl" />
          </button>
        </div>

        {/* Product Summary */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">{product.prod_name}</h3>
          <div className="flex items-center gap-4 py-2 border-y border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-gray-500 text-sm">₱</span>
                <span className="text-lg font-semibold">
                  {totalAmount.toFixed(2)}
                </span>
                <span className="text-gray-500 text-sm">Total</span>
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
          <div className="grid grid-cols-3 gap-2">
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
                  className="w-full h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Payment Method</h3>
          <div className="space-y-2">
            <div className="flex gap-3">
              <button
                className="flex-1 py-2 px-4 rounded-lg border border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                disabled={true}
              >
                Cash on Delivery (Not Available)
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedPayment('gcash')}
                className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                  selectedPayment === 'gcash'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                GCash
              </button>
              <button
                onClick={() => setSelectedPayment('credit')}
                className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                  selectedPayment === 'credit'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Credit Card
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * Only customers with loyalty badge can avail COD payment method
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              console.log('Confirming with image index:', selectedImageIndex);
              onConfirm(selectedPayment, selectedImageIndex);
            }}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Confirm Order
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

export default ProductOrderConfirmation; 