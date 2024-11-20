import React, { useState } from 'react';

const CancelOrderModal = ({ isOpen, onClose, order, onCancel }) => {
  const [cancelReason, setCancelReason] = useState('');

  if (!isOpen || !order) return null;

  const handleSubmit = () => {
    if (!cancelReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }
    onCancel(order.order_id, cancelReason);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Cancel Order</h2>
        
        {/* Order Details */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Order Details</h3>
          <p className="text-sm">Order ID: {order.order_id}</p>
          <p className="text-sm">Customer: {order.customer_name}</p>
          <div className="mt-2">
            <p className="text-sm font-medium">Products:</p>
            {order.products.map((product, index) => (
              <div key={index} className="ml-4 text-sm">
                • {product.prod_name} (Qty: {product.quantity})
              </div>
            ))}
          </div>
        </div>

        {/* Cancellation Reason */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Cancellation
          </label>
          <textarea
            className="w-full border rounded-lg p-2 text-sm"
            rows="3"
            placeholder="Enter your reason for cancellation"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={handleSubmit}
          >
            Confirm Cancellation
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal; 