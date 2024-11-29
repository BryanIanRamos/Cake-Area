import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiX } from "react-icons/fi";
import AddressSelectionModal from "./AddressSelectionModal";
import dataAddress from "../../../data/address.json";

const OrderConfirmation = ({
  isOpen,
  closeModal,
  selectedItems,
  totalAmount,
  onConfirm,
}) => {
  // Get current date and add 4 days
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 4);

  const [selectedDate, setSelectedDate] = useState(minDate);
  const [selectedAddress, setSelectedAddress] = useState(dataAddress[0]);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Calculate fees and totals
  const deliveryFee = 50;
  const serviceFee = 100;
  const subtotal = totalAmount;
  const total = subtotal + deliveryFee + serviceFee;
  const downPaymentAmount = total * 0.5;

  const handleConfirm = () => {
    // Create address object from selected address
    const placedAddress = {
      fullName: selectedAddress.name,
      phoneNumber: selectedAddress.phone,
      cityBarangay: selectedAddress.address.line2,
      postalCode: selectedAddress.address.postalCode || "8600",
      streetAddress: selectedAddress.address.line1
    };

    // Pass both the date and address to the onConfirm handler
    onConfirm(selectedDate, placedAddress);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Confirm Order</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Delivery Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={minDate}
                  dateFormat="MMMM d, yyyy"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                  placeholderText="Select a date"
                />
                <p className="mt-1 text-sm text-gray-500">
                  * Earliest delivery date is {minDate.toLocaleDateString()} to
                  allow preparation time
                </p>
              </div>
            </div>

            {/* Add Delivery Address Section */}
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Delivery Address</h3>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedAddress.name}</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-600">
                      {selectedAddress.phone}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {selectedAddress.address.line1}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {selectedAddress.address.line2}
                  </p>
                </div>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="text-primary hover:text-primary-dark text-sm underline"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Order Summary</h3>

              <div className="border-t mt-2 pt-2 space-y-1">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Items Subtotal:</span>
                  <span>₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee:</span>
                  <span>₱{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Service Fee:</span>
                  <span>₱{serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-1 border-t">
                  <span>Total Amount:</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary font-medium">
                  <span>Down Payment (50%):</span>
                  <span>₱{downPaymentAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Remaining Payment:</span>
                  <span>₱{downPaymentAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Confirmation Button */}
            <button
              onClick={handleConfirm}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Pay Down Payment (₱{downPaymentAmount.toFixed(2)})
            </button>
          </div>
        </div>
      </div>

      {/* Add Address Selection Modal */}
      <AddressSelectionModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        addresses={dataAddress}
        selectedAddress={selectedAddress}
        onSelectAddress={setSelectedAddress}
      />
    </div>
  );
};

export default OrderConfirmation;
