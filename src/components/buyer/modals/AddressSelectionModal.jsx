import React from 'react';
import { FiX } from 'react-icons/fi';

const AddressSelectionModal = ({ isOpen, onClose, addresses, selectedAddress, onSelectAddress }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Confirm your address</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Address List */}
          <div className="space-y-4">
            {addresses.map((address, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border cursor-pointer ${
                  selectedAddress?.name === address.name
                    ? 'border-primary bg-orange-50'
                    : 'border-gray-200 hover:border-primary'
                }`}
                onClick={() => onSelectAddress(address)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={selectedAddress?.name === address.name}
                    onChange={() => onSelectAddress(address)}
                    className="w-4 h-4 text-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{address.name}</span>
                      <span className="text-gray-500">|</span>
                      <span className="text-gray-600">{address.phone}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {address.address.line1}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {address.address.line2}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Confirm Button */}
          <button
            onClick={onClose}
            className="w-full mt-6 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressSelectionModal; 