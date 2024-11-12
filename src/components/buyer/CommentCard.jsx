import React from 'react';
import { Icon } from "@iconify/react";
import Rating from "./Rating";

const CommentCard = ({ user, rating, date, comment, images, likes }) => {
  return (
    <div className="w-full h-fit border mt-4">
      <div className="grid grid-cols-12 gap-4">
        {/* User Profile Picture */}
        <div className="col-span-2 flex justify-end items-start">
          <div className="border overflow-hidden w-[100px] h-[100px] rounded-full justify-center items-center flex object-cover">
            <img
              src={user.profilePic}
              alt="Profile Pic"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Comment Content */}
        <div className="col-span-10 flex flex-col gap-2">
          {/* User/Rate Info Section */}
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-semibold">{user.name}</div>
            <div>
              <Rating
                icon="ph:star-fill"
                clickable={false}
                initialRating={rating}
                className="text-[#F4A340]"
              />
            </div>
            <div>{date}</div>
          </div>

          {/* User Comment Section */}
          <div className="text-sm">{comment}</div>

          {/* Uploaded Image Section */}
          {images && images.length > 0 && (
            <div className="flex gap-2 mt-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Review Image ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              ))}
            </div>
          )}

          {/* Like button */}
          <div className="flex justify-start mt-4 items-center gap-2">
            <button className="text-[25px] text-gray-400">
              <Icon icon="mdi:like" />
            </button>
            <span className="text-gray-400">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard; 