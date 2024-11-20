import React, { useEffect } from 'react';
import { Icon } from "@iconify/react";

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: "mdi:check-circle",
    error: "mdi:alert-circle",
    warning: "mdi:alert",
    info: "mdi:information"
  };

  const colors = {
    success: "bg-green-100 text-green-800 border-green-200",
    error: "bg-red-100 text-red-800 border-red-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    info: "bg-blue-100 text-blue-800 border-blue-200"
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`flex items-center p-4 rounded-lg border ${colors[type]} shadow-lg animate-fade-in-down`}>
        <Icon icon={icons[type]} className="text-xl mr-2" />
        <span className="font-medium">{message}</span>
        <button 
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          <Icon icon="mdi:close" />
        </button>
      </div>
    </div>
  );
};

export default Toast; 