import React from "react";
import Buttom from "../components/Button";
import Button from "../components/Button";
import HideContact from "../components/HideContact";

const Profile = () => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1 border border-red-500">Margin</div>
      {/* Main Content  */}
      <div className="col-span-3 bg-trinary flex flex-col gap-4 px-10 pt-10">
        <div className="border flex justify-end">
          <Button label="Back" paddingX={10} paddingY={2} />
        </div>
        <div className="border bg-white p-7">
          <div className="border border-green-600 ">
            <div className="font-[oswald]">
              <div className="border  font-semibold text-[20px]">Profile</div>
              <div className="border text-[15px] text-gray-400">
                Manage and protect your account.
              </div>
            </div>
            {/* Line  */}
            <div className="border-2 border-gray-600 my-5"></div>
            <div className="border border-yellow-500 text-gray-400 font-[poppins] flex flex-col gap-4 text-[16px]">
              <div className="border flex gap-4 items-center">
                <p className="w-[160px] border text-end">Name</p>
                <input
                  type="text"
                  placeholder="Type something..."
                  className="border bg-gray-100 p-1"
                />
              </div>
              <div className="border flex gap-4 items-center">
                <p className="w-[160px] border text-end">Email</p>
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
              <div className="border flex gap-4 items-center">
                <p className="w-[160px] border text-end">Phone Number</p>
                <div>
                  <HideContact contact={"0987654321"} type={"phone"} />
                </div>
                <button className="text-[13px] underline text-blue-500 hover:text-blue-300">
                  Change
                </button>
              </div>
              <div className="border flex gap-4 items-center">
                <p className="w-[160px] border text-end">Gender</p>
                <input
                  type="text"
                  placeholder="Type something..."
                  className="border bg-gray-100"
                />
              </div>
              <div className="border flex gap-4 items-center">
                <p className="w-[160px] border text-end">Date of Birth</p>
                <input
                  type="text"
                  placeholder="Type something..."
                  className="border bg-gray-100"
                />
              </div>
              <div className="flex gap-4 items-center h-fit mb-5">
                <div className="w-[160px] text-end"></div>
                <Button label="Save" paddingX={5} paddingY={1} />
              </div>
            </div>
          </div>
        </div>
        <div className="border bg-white p-10">Box2</div>
      </div>
      <div className="border border-red-500 col-span-1">Margin</div>
    </div>
  );
};

export default Profile;
