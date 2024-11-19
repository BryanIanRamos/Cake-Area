import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const OrderConfirmation = ({ isOpen, closeModal, totalAmount, selectedItems, onConfirm }) => {
  const [receiveDate, setReceiveDate] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Confirm Order</h2>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Selected Items:</h3>
          {selectedItems?.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{item?.product?.prod_name || 'Unknown Product'}</span>
              <span>₱{item?.overall_pay?.toFixed(2) || '0.00'}</span>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Select Receive Date:</h3>
          <DatePicker
            selected={receiveDate}
            onChange={date => setReceiveDate(date)}
            minDate={new Date()}
            className="w-full border rounded-lg p-2"
            placeholderText="Select date"
            required
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total Amount:</span>
          <span className="text-xl font-bold">₱{totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={closeModal}
            className="flex-1 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(receiveDate)}
            disabled={!receiveDate}
            className={`flex-1 py-2 rounded-lg text-white ${
              receiveDate ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-400'
            }`}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;