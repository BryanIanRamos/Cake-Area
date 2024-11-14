import React from 'react';
import { Icon } from "@iconify/react";

const ReviewStats = ({ stats }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#E88F2A]">
            {stats.average.toFixed(1)}
          </h2>
          <div className="flex justify-center my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                icon="ph:star-fill"
                className={`text-2xl ${
                  star <= Math.round(stats.average)
                    ? "text-[#F4A340]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600">Based on {stats.total} reviews</p>
        </div>

        <div className="col-span-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2 mb-2">
              <span className="w-12">{rating} stars</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F4A340]"
                  style={{
                    width: `${(stats.distribution[rating] / stats.total) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="w-12 text-sm text-gray-600 text-right">
                {stats.distribution[rating]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewStats; 