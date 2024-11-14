import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import Rating from "./Rating";

const CommentCard = ({ user, rating, date, comment, images, likes: initialLikes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full h-fit bg-white rounded-lg p-4">
      <div className="grid grid-cols-12 gap-4">
        {/* User Profile Picture */}
        <div className="col-span-2 flex justify-end items-start">
          <div className="overflow-hidden w-[100px] h-[100px] rounded-full">
            <img
              src={user.profilePic}
              alt={`${user.name}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Comment Content */}
        <div className="col-span-10 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-semibold">{user.name}</div>
            <div className="flex items-center gap-2">
              <Rating
                icon="ph:star-fill"
                clickable={false}
                initialRating={rating}
                className="text-[#F4A340]"
              />
              <span className="text-gray-500 text-sm">
                {formatDate(date)}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-700">{comment}</p>

          {/* Image Gallery */}
          {images?.length > 0 && (
            <div className="flex gap-2 mt-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Review Image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Like Section */}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                isLiked 
                  ? 'text-primary hover:bg-primary/10' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Icon 
                icon={isLiked ? "mdi:like-fill" : "mdi:like-outline"} 
                className="text-xl"
              />
              <span className="text-sm">{likes}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] p-2">
            <img
              src={selectedImage}
              alt="Enlarged review image"
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              <Icon icon="material-symbols:close" className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard; 