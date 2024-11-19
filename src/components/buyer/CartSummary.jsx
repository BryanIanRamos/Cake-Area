import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const CartSummary = ({ totalAmount, itemCount, onCheckout }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="bg-white border-t shadow-lg">
        {/* Toggle Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-12 h-8 bg-white rounded-t-lg border border-b-0 border-gray-200 -mt-8 transition-transform duration-300 hover:bg-gray-50"
          >
            {isExpanded ? <FiChevronDown size={20} /> : <FiChevronUp size={20} />}
          </button>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Summary Row (Always Visible) */}
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <span className="text-gray-500">Selected: {itemCount} items</span>
              <span className="font-semibold text-lg">₱{totalAmount.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              disabled={itemCount === 0}
              className={`px-8 py-2 rounded-lg font-semibold transition-colors ${
                itemCount === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              Checkout
            </button>
          </div>

          {/* Expandable Content */}
          <div 
            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="py-4 space-y-4 border-t">
              {/* Order Summary */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Order Summary</h3>
                <div className="flex justify-between text-gray-600">
                  <span>Items Subtotal:</span>
                  <span>₱{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee:</span>
                  <span>₱0.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee:</span>
                  <span>₱0.00</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total Payment:</span>
                  <span className="text-primary">₱{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Payment Method</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 border rounded-lg hover:border-primary hover:text-primary transition-colors">
                    Cash on Delivery
                  </button>
                  <button className="px-4 py-2 border rounded-lg hover:border-primary hover:text-primary transition-colors">
                    GCash
                  </button>
                  <button className="px-4 py-2 border rounded-lg hover:border-primary hover:text-primary transition-colors">
                    Credit Card
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="pt-4">
                <button
                  onClick={onCheckout}
                  disabled={itemCount === 0}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    itemCount === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  Checkout ({itemCount} items)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
