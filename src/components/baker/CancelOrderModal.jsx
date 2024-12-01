import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const CancelOrderModal = ({ isOpen, onClose, onConfirm, order }) => {
  const [customerName, setCustomerName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [showError, setShowError] = useState(false);

  // Check if form is valid
  const isFormValid = () => {
    if (!cancelReason) return false;
    if (cancelReason === "Other" && !otherReason.trim()) return false;
    return true;
  };

  const cancelReasons = [
    "Out of stock ingredients",
    "Equipment malfunction",
    "Too many orders to handle",
    "Customer requested cancellation",
    "Unable to meet delivery timeline",
    "Other"
  ];

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
    if (!isFormValid()) {
      setShowError(true);
      return;
    }

    try {
      setIsUpdating(true);
      const finalReason = cancelReason === "Other" ? otherReason : cancelReason;
      await onConfirm(order.order_id, finalReason);
    } catch (error) {
      console.error('Error cancelling order:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Reset states when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCancelReason("");
      setOtherReason("");
      setShowError(false);
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Cancel Order
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

          {/* Cancellation Reason Section */}
          <div className="mt-6 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Cancellation<span className="text-red-500">*</span>
            </label>
            <select
              value={cancelReason}
              onChange={(e) => {
                setCancelReason(e.target.value);
                setShowError(false);
              }}
              className={`w-full p-2 border rounded-md ${
                showError && !cancelReason ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a reason</option>
              {cancelReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>

            {/* Other Reason Text Input */}
            {cancelReason === "Other" && (
              <div className="mt-3">
                <textarea
                  value={otherReason}
                  onChange={(e) => {
                    setOtherReason(e.target.value);
                    setShowError(false);
                  }}
                  placeholder="Please specify the reason..."
                  className={`w-full p-2 border rounded-md ${
                    showError && !otherReason.trim() ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={3}
                />
              </div>
            )}

            {/* Error Message */}
            {showError && (
              <p className="text-red-500 text-sm mt-1">
                {cancelReason === "Other" && !otherReason.trim()
                  ? "Please specify the reason for cancellation"
                  : "Please select a reason for cancellation"}
              </p>
            )}
          </div>

          {/* Warning Message */}
          <p className="text-sm text-red-500 mt-6 mb-6">
            Are you sure you want to cancel this order? This action cannot be
            undone.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              disabled={isUpdating}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none disabled:opacity-50"
            >
              Close
            </button>
            <button
              onClick={handleConfirm}
              disabled={isUpdating || !isFormValid()}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none flex items-center gap-2 ${
                isFormValid() 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isUpdating ? (
                <>
                  <Icon icon="eos-icons:loading" className="animate-spin" />
                  Cancelling...
                </>
              ) : (
                'Cancel Order'
              )}
            </button>
          </div>
        </div>

        {/* Loading Overlay */}
        {isUpdating && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-lg">
            <div className="text-red-600 flex items-center gap-2">
              <Icon icon="eos-icons:loading" className="animate-spin text-2xl" />
              <span>Cancelling order...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelOrderModal; 