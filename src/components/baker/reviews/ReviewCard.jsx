import React from 'react';
import { Icon } from "@iconify/react";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-4">
          <img
            src={review.profileImage}
            alt={review.customerName}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-medium">{review.customerName}</h3>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  icon="ph:star-fill"
                  className={`${
                    star <= review.rating
                      ? "text-[#F4A340]"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500">{review.date}</div>
      </div>

      <div className="flex gap-4 mb-4">
        <img
          src={review.image}
          alt={review.productName}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <h4 className="font-medium mb-2">{review.productName}</h4>
          <p className="text-gray-600">{review.comment}</p>
        </div>
      </div>

      {review.reply && (
        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon="mdi:reply" className="text-gray-500" />
            <span className="font-medium">Your Reply</span>
          </div>
          <p className="text-gray-600">{review.reply}</p>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:thumb-up-outline" />
          <span>{review.helpful} Helpful</span>
        </button>
        {!review.reply && (
          <button className="text-[#E88F2A] hover:text-[#E88F2A]/80">
            Reply to review
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewCard; 