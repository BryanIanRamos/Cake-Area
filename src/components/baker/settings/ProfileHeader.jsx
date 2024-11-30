import React, { useState } from "react";
import { Icon } from "@iconify/react";
import VerificationModal from "./VerificationModal";

const ProfileHeader = ({ profileImage, storeName, verified }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative mb-20 bg-white rounded-lg shadow-sm">
        <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
          <img
            src="../../../../public/assets/bg/Cake_BG.png"
            alt="Cover"
            className="w-full h-full object-cover"
          />
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
        <div className="flex justify-between items-center absolute -bottom-16 left-44 right-8">
          <div className="flex flex-col pt-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">Bryan Ian C. Ramos</h2>
              <div className="relative group">
                <Icon
                  icon="codicon:verified-filled"
                  className="text-gray-400 text-xl cursor-help"
                />
                <div className="absolute left-0 w-64 p-2 mt-2 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  Your business won't be visible in the public Bakers' Area
                  until verified
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="uil:store-alt" />
              <p className="text-md">{storeName}</p>
            </div>
          </div>
          <div className="relative group">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#E88F2A] text-white text-sm px-3 py-1 rounded hover:bg-[#da852b]"
            >
              Get Verified
            </button>
            <div className="absolute right-0 w-40 p-2 mt-2 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              Verify your business now
            </div>
          </div>
        </div>
      </div>

      <VerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProfileHeader;
