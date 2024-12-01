import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const MarkAsCompletedModal = ({ isOpen, onClose, onConfirm, order }) => {
  const [customerName, setCustomerName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Fetch customer name when order changes
    const fetchCustomerName = async () => {
      if (order?.customer_id) {
        try {
          const response = await fetch(`http://localhost:3000/profiles?user_id=${order.customer_id}`);
          const profiles = await response.json();
          if (profiles.length > 0) {
            setCustomerName(`${profiles[0].first_name} ${profiles[0].last_name}`);
          }
        } catch (error) {
          console.error("Error fetching customer name:", error);
          setCustomerName("Unknown Customer");
        }
      }
    };

    fetchCustomerName();
  }, [order?.customer_id]);

  const handleConfirm = async () => {
    try {
      setIsUpdating(true);
      await onConfirm(order.order_id);
    } catch (error) {
      console.error('Error completing order:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Mark Order as Completed
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>
          </div>

          {/* Order Information */}
          <div className="text-left space-y-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{order.order_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-medium">{customerName}</p>
                </div>
              </div>

              {/* Products List */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Products</p>
                <div className="space-y-2">
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-2 rounded"
                    >
                      <div className="flex items-center space-x-2">
                        <img
                          src={product.images}
                          alt={product.prod_name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">{product.prod_name}</p>
                          <p className="text-xs text-gray-500">
                            ₱{product.price.toFixed(2)} per item
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          Qty: {product.qty}
                        </p>
                        <p className="text-sm text-[#E88F2A]">
                          ₱{(product.price * product.qty).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Amount */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-500">Total Amount</p>
                  <p className="text-lg font-semibold text-[#E88F2A]">
                    ₱{order.total_amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Message */}
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to mark this order as completed? This action cannot be
            undone.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              disabled={isUpdating}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isUpdating}
              className="px-4 py-2 text-sm font-medium text-white bg-[#E88F2A] rounded-md hover:bg-[#E88F2A]/90 focus:outline-none disabled:opacity-50 flex items-center gap-2"
            >
              {isUpdating ? (
                <>
                  <Icon icon="eos-icons:loading" className="animate-spin" />
                  Updating...
                </>
              ) : (
                'Complete Order'
              )}
            </button>
          </div>
        </div>

        {/* Loading Overlay */}
        {isUpdating && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-lg">
            <div className="text-[#E88F2A] flex items-center gap-2">
              <Icon icon="eos-icons:loading" className="animate-spin text-2xl" />
              <span>Completing order...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkAsCompletedModal; 