import React, { useEffect } from 'react';

const SuccessModal = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Modal */}
      <div className="bg-white rounded-2xl p-6 shadow-xl w-80 relative z-10 animate-scale-up">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-10 h-10 text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          {/* Message */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Update Complete
          </h3>
          <p className="text-gray-600">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 