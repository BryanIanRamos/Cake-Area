import React from 'react';
import Button from './Button';

const NameChangeModal = ({ 
  isOpen, 
  onClose, 
  firstName, 
  lastName, 
  onFirstNameChange, 
  onLastNameChange, 
  onSave 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Change Name</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter first name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <Button
            label="Save"
            onClick={onSave}
            paddingX={4}
            paddingY={2}
          />
        </div>
      </div>
    </div>
  );
};

export default NameChangeModal; 