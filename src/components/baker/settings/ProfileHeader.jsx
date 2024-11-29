import React from "react";
import { Icon } from "@iconify/react";

const ProfileHeader = ({ profileImage, storeName, verified }) => {
  return (
    <div className="relative mb-20 bg-white rounded-lg shadow-sm">
      <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
        <img
          src="../../../../public/assets/bg/Cake_BG.png"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/90 transition-colors">
          <Icon icon="material-symbols:edit" />
          Edit cover photo
        </button> */}
      </div>
      <div className="absolute -bottom-16 left-8">
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
          <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
            <Icon icon="material-symbols:edit" className="text-xl" />
          </button>
        </div>
      </div>
      <div className="absolute -bottom-16 left-44 flex items-center gap-2">
        <h2 className="text-2xl font-bold">{storeName}</h2>
        {verified && (
          <span className="bg-[#E88F2A] text-white text-sm px-3 py-1 rounded">
            Get Verified
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
