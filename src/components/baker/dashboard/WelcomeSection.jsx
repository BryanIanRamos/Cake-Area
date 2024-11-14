import React from 'react';
import { Link } from "react-router-dom";

const WelcomeSection = ({ name, salesAmount }) => {
  return (
    <>
      <div className="mb-6">
        <p className="text-gray-600">Welcome Back</p>
        <h1 className="text-2xl font-bold">{name}</h1>
      </div>

      <div className="bg-[#E88F2A] rounded-lg p-6 mb-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Here's Happening in your
            </h2>
            <p>sales this week</p>
            <p className="text-2xl font-bold mt-2">₱ {salesAmount}</p>
          </div>
          <Link to="/dashboard/orders">
            <button className="bg-white text-[#E88F2A] px-4 py-2 rounded-lg hover:bg-gray-100 whitespace-nowrap">
              Manage Orders
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default WelcomeSection; 