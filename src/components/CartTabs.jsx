import React from 'react';

const CartTabs = () => {
  const tabs = ['Cart', 'In Process', 'To Receive', 'Completed', 'Cancelled', 'Return/Refund'];

  return (
    <div className="relative">
      {/* Gradient indicators for scroll - only show on mobile */}
      <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-gray-200 to-transparent md:hidden z-0"></div>
      <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-gray-200 to-transparent md:hidden z-0"></div>

      {/* Scrollable container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className={`
          flex rounded-xl p-3 md:p-4 bg-gray-200
          min-w-min md:min-w-full
          md:justify-between
        `}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`
                whitespace-nowrap
                px-4 md:px-6 lg:px-8
                py-2 md:py-2.5 
                rounded-lg 
                font-semibold 
                text-xs md:text-sm lg:text-base
                ${index === 0 ? 'bg-gray-100 text-primary' : 'text-black'}
                ${index !== tabs.length - 1 ? 'mr-2 md:mr-0' : ''} // Remove margin on md screens
                transition-colors duration-200 hover:bg-gray-100
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartTabs;
