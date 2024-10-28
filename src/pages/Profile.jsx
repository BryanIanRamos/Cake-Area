import React, { useState } from "react";
import Buttom from "../components/Button";
import Button from "../components/Button";
import HideContact from "../components/HideContact";
import RadioOption from "../components/RadioOption";

import DummyProfile from "../assets/Dummy_Profile.png";

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  }
};

const Profile = () => {
  const [image, setImage] = useState(null);
  const gender = ["Male", "Female", "Prefer not to say"];

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 border border-red-500">Margin</div>
      {/* Main Content  */}
      <div className="col-span-8 bg-trinary flex flex-col gap-4 px-10 pt-10">
        <div className="border flex justify-end">
          <Button label="Back" paddingX={10} paddingY={2} />
        </div>
        <div className="border bg-white p-7 ">
          <div className=" border-green-600">
            <div className="font-[oswald]">
              <div className="font-semibold text-[20px]">Profile</div>
              <div className="text-[15px] text-gray-400">
                Manage and protect your account.
              </div>
            </div>
            {/* Line  */}
            <div className="border border-gray-400 my-5"></div>
            <div className="border border-green-500 grid grid-cols-2">
              <div className=" border-yellow-500 text-gray-400 font-[poppins] flex flex-col gap-4 text-[16px]">
                <div className=" flex gap-4 items-center">
                  <p className="w-[160px]  text-end">Name</p>
                  <input
                    type="text"
                    placeholder="Type something..."
                    className="border bg-gray-100 p-1"
                  />
                </div>
                <div className=" flex gap-4 items-center">
                  <p className="w-[160px]  text-end">Email</p>
                  <div className="text-[14px] text-gray-800 ">
                    <HideContact
                      contact={"ianramos3367@gmail.com"}
                      type={"email"}
                    />
                  </div>
                  <button className="text-[13px] underline text-blue-500 hover:text-blue-300">
                    Change
                  </button>
                </div>
                <div className="flex gap-4 items-center">
                  <p className="w-[160px] text-end">Phone Number</p>
                  <div>
                    <HideContact contact={"0987654321"} type={"phone"} />
                  </div>
                  <button className="text-[13px] underline text-blue-500 hover:text-blue-300">
                    Change
                  </button>
                </div>
                <div className="flex gap-4 items-center">
                  <p className="w-[160px] text-end">Gender</p>

                  <RadioOption options={gender} />
                </div>
                <div className="flex gap-4 items-center">
                  <p className="w-[160px] text-end">Date of Birth</p>
                  <p>10/20/2001</p>
                  <button className="text-[13px] underline text-blue-500 hover:text-blue-300">
                    Change
                  </button>
                </div>
                <div className="flex gap-4 items-center h-fit mb-5">
                  <div className="w-[160px] text-end"></div>
                  <Button label="Save" paddingX={5} paddingY={1} />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={image || DummyProfile}
                  alt="Profile"
                  className="w-[7vw] rounded-full object-cover border-2 border-gray-300"
                />
                <label
                  htmlFor="imageUpload"
                  className="mt-2 px-4 py-2 text-[0.9vw] hover:bg-primary cursor-pointer hover:text-white text-gray-600 border border-gray-600"
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
                <div className="text-center text-gray-600 mt-2 text-[0.8vw]">
                  <p>File size: maximum 1 MB</p>
                  <p>File extemtsion: .JPEG, .PNG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Address  */}
        <div className="border bg-white p-10">
          <div className="border border-violet-800 grid grid-cols-2">
            <div>
              <h3 className="text-[1.2vw] font-semibold">My Address</h3>
              <p className="">Set your address</p>
            </div>
            <div className="flex justify-end p-2">
              <Button label="Add" paddingY="2" paddingX="5" />
            </div>
          </div>
          <div className="border border-gray-400 my-5"></div>
          <div className="border border-blue-700 grid grid-cols-2">
            <div>
              <div className="flex gap-2">
                <h3>Bryan Ramos</h3>
                <p>|</p>
                <p>(+63) 0987654321</p>
              </div>
              <p>P-3C Rigners Boarding House</p>
              <p>Lemon, Butuan City, Agusan Del Norte, Mindanao, 8600</p>
            </div>
            <div>asdasd</div>
          </div>
        </div>
      </div>
      <div className="border border-red-500 col-span-2">Margin</div>
    </div>
  );
};

export default Profile;
