import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buyer/Button";
import HideContact from "../../components/buyer/HideContact";
import RadioOption from "../../components/buyer/RadioOption";

import DummyProfile from "../../assets/Dummy_Profile.png";
import dataAddress from "../../data/address.json";

const handleBack = (navigate) => {
  navigate("/");
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  }
};

const Profile = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const gender = ["Male", "Female", "Prefer not to say"];

  return (
    <div className="grid grid-cols-12">
      <div className="max-lg:hidden col-span-1 xl:col-span-2"></div>
      {/* Main Content of profile */}
      <div className="col-span-12 lg:col-span-10 xl:col-span-8 bg-trinary flex flex-col gap-4 px-10 pt-5">
        <div className="flex justify-end">
          <Button
            label="Back"
            paddingX={10}
            paddingY={2}
            onClick={() => handleBack(navigate)}
          />
        </div>
        <div className="border bg-white p-7 ">
          <div className=" border-green-600">
            <div className="font-[oswald]">
              <div className="font-semibold text-[3vw] sm:text-[2.2vw] md:text-[2.1vw] lg:text-[1.9vw] xl:text-[1.8vw] 2xl:text-[1.6vw]">
                Profile
              </div>
              <div className="text-[1.3vw] text-gray-400">
                Manage and protect your account.
              </div>
            </div>
            {/* Line  */}
            <div className="">
              <div className="border border-gray-400 my-3 lg:my-5"></div>
            </div>

            {/* Information */}
            <div className="grid grid-cols-2">
              <div className=" border-yellow-500 text-gray-400 font-[poppins] flex flex-col gap-4  text-[1.1vw]">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-end col-span-1">Name</p>
                  <input
                    type="text"
                    placeholder="Type something..."
                    className="border bg-gray-100 p-1 col-span-2"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-end">Email</p>
                  <div className="col-span-2 flex gap-4">
                    <div className=" text-gray-800 ">
                      <HideContact
                        contact={"ianramos3367@gmail.com"}
                        type={"email"}
                      />
                    </div>
                    <button className=" underline text-blue-500 hover:text-blue-300">
                      Change
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-end">Phone Number</p>
                  <div className="flex gap-4 col-span-2">
                    <div>
                      <HideContact contact={"0987654321"} type={"phone"} />
                    </div>
                    <button className="underline text-blue-500 hover:text-blue-300">
                      Change
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-end">Gender</p>

                  <div className="col-span-2 text-[0.9vw]">
                    <RadioOption options={gender} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-end">Date of Birth</p>
                  <div className="flex gap-4">
                    <p>10/20/2001</p>
                    <button className="underline text-blue-500 hover:text-blue-300">
                      Change
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center h-fit my-3">
                  <div></div>
                  <Button label="Save" paddingX={2} paddingY={1} />
                  <div></div>
                </div>
              </div>
              {/* Profile Image */}
              <div className="flex flex-col items-center justify-center">
                <img
                  src={image || DummyProfile}
                  alt="Profile"
                  className="w-[9vw] xl:w-[7.5vw] rounded-full object-cover border-2 border-gray-300"
                />
                <label
                  htmlFor="imageUpload"
                  className="mt-2 px-4 py-2 text-[1vw] xl:text-[0.7vw] hover:bg-primary cursor-pointer hover:text-white text-gray-600 border border-gray-600"
                >
                  Upload Image
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="text-center text-gray-600 mt-2 text-[1vw] xl:text-[0.8vw]">
                  <p>File size: maximum 1 MB</p>
                  <p>File extemtsion: .JPEG, .PNG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Address  */}
        <div className="border bg-white p-10">
          <div className="grid grid-cols-2">
            <div>
              <h3 className="font-semibold text-[3vw] sm:text-[2.2vw] md:text-[2.1vw] lg:text-[1.9vw] xl:text-[1.8vw] 2xl:text-[1.6vw]">
                My Address
              </h3>
              <p className="">Set your address</p>
            </div>
            <div className="flex justify-end p-2">
              <Button label="Add" paddingY="2" paddingX="5" />
            </div>
          </div>
          <div className="border border-gray-400 my-5"></div>
          {dataAddress.map((info, index) => (
            <div key={index}>
              <div className="grid grid-cols-5">
                <div className="col-span-3">
                  <div className="flex gap-2">
                    <h3>{info.name}</h3>
                    <p>|</p>
                    <p>{info.phone}</p>
                  </div>
                  <p>{info.address.line1}</p>
                  <p>{info.address.line2}</p>
                </div>
                <div className="grid grid-rows-2 justify-end  text-start">
                  <button className="text-[13px] underline text-blue-500 hover:text-blue-300">
                    Change
                  </button>
                  <button className="text-[13px] underline text-red-500 hover:text-red-300">
                    Delete
                  </button>
                </div>
              </div>
              <div className="border border-gray-400 my-5"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-lg:hidden col-span-1 xl:col-span-2"></div>
    </div>
  );
};

export default Profile;
