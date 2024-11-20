import React from 'react';

const MarkAsDeliveredModal = ({ isOpen, onClose, order, onMarkAsDelivered }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
        <h2 className="text-xl font-semibold text-[#E88F2A] mb-4">Mark Order as Delivered</h2>
        
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
          <p className="text-sm mt-2">Total Amount: ₱{order.total_amount.toFixed(2)}</p>
        </div>

        <p className="text-gray-600 mb-6">
          Confirm that this order has been delivered to the customer. 
          This will move the order to "Completed" status.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onMarkAsDelivered(order.order_id)}
            className="flex-1 bg-[#E88F2A] text-white py-2 rounded-lg hover:bg-[#d77f1f]"
          >
            Mark as Delivered
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkAsDeliveredModal; 