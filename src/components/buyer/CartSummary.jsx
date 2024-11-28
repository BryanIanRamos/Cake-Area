import React, { useState } from "react";
import { FiChevronUp, FiChevronDown, FiInfo } from "react-icons/fi";

const CartSummary = ({ totalAmount, itemCount, onCheckout }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('GCash');
  const deliveryFee = 50;
  const serviceFee = 100;
  const subtotal = totalAmount;
  const total = subtotal + deliveryFee + serviceFee;
  const downPaymentAmount = total * 0.5;

  return (
    <div className="bg-white border-t shadow-lg">
      {/* Toggle Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-12 h-8 bg-white rounded-t-lg border border-b-0 border-gray-200 -mt-8"
        >
          {isExpanded ? <FiChevronDown size={20} /> : <FiChevronUp size={20} />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Main Summary Row (Always Visible) */}
        <div className="flex justify-between items-center h-16 border-b">
          <div className="flex items-center gap-4">
            <span className="text-gray-500 pr-4 border-r border-gray-300">
              Selected: {itemCount} items
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Down Payment (50%)</span>
              <span className="font-semibold text-lg">
                ₱{itemCount > 0 ? downPaymentAmount.toFixed(2) : "0.00"}
              </span>
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        <div
          className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${isExpanded ? "max-h-[400px] py-4" : "max-h-0"}
        `}
        >
          {/* Order Summary */}
          <div className="space-y-3 mb-4">
            <h3 className="font-semibold text-lg">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Items Subtotal:</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee:</span>
                <span>₱{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee:</span>
                <span>₱{serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t font-medium">
                <span>Total Amount:</span>
                <span>₱{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-primary font-medium">
                <span>Down Payment (50%):</span>
                <span>₱{downPaymentAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Remaining Payment:</span>
                <span>₱{downPaymentAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Payment Method</h3>
              <p className="text-xs text-gray-500">
                * Down payment is required before order confirmation
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                disabled
                className="px-4 py-2 border rounded-lg text-gray-400 bg-gray-100 cursor-not-allowed"
              >
                Cash on Delivery (Not Available)
              </button>
              <button 
                onClick={() => setSelectedPayment('GCash')}
                className={`px-4 py-2 border rounded-lg transition-colors ${
                  selectedPayment === 'GCash' 
                    ? 'border-primary text-primary bg-primary/5' 
                    : 'hover:border-primary hover:text-primary'
                }`}
              >
                GCash
              </button>
              <button 
                onClick={() => setSelectedPayment('Credit Card')}
                className={`px-4 py-2 border rounded-lg transition-colors ${
                  selectedPayment === 'Credit Card' 
                    ? 'border-primary text-primary bg-primary/5' 
                    : 'hover:border-primary hover:text-primary'
                }`}
              >
                Credit Card
              </button>
            </div>
            <p className="text-xs text-gray-500">
              * Only customers with loyalty badge can avail COD payment method
            </p>
          </div>

          {/* Payment Terms */}
          <div className="relative group inline-block mb-20">
            <div className="flex items-center gap-2 text-gray-500 cursor-help">
              <FiInfo className="w-5 h-5" />
              <span className="text-sm">Payment Terms</span>
            </div>
            <div
              className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg 
              opacity-0 invisible group-hover:opacity-100 group-hover:visible 
              transition-all duration-200 z-[60]"
            >
              <ul className="space-y-1.5">
                <li>• 50% down payment required to confirm order</li>
                <li>• Remaining 50% to be paid upon delivery</li>
                <li>
                  • Down payment is non-refundable once order is confirmed
                </li>
              </ul>
              <div className="absolute -bottom-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Payment Button */}
      <div className="border-t bg-white">
        <div className="max-w-7xl mx-auto p-4">
          <button
            onClick={onCheckout}
            disabled={itemCount === 0}
            className={`w-full py-3 rounded-lg font-semibold ${
              itemCount === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary-dark"
            }`}
          >
            Pay Down Payment (₱{downPaymentAmount.toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
