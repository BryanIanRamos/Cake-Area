import React, { useState } from "react";
import Cake_BG from "../assets/Cake_BG.png";
import Cake_area_logo from "../assets/cake_area_logo.png";
const MainPage = () => {
  const [selectBarangay, setSelectBarangay] = useState("");
  const [selectStreet, setSelectStreet] = useState("");
  const [rating, setRating] = useState(0);

  const handleBarangayOption = (event) => {
    setSelectBarangay(event.target.value);
  };

  const handleStreetOption = (event) => {
    setSelectStreet(event.target.value);
  };

  return (
    <div className="h-screen">
      <div
        className="h-full flex flex-col"
        style={{
          backgroundImage: `url(${Cake_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Top Bar */}
        <div className="grid grid-cols-2 border-red-500 h-[4vw] text-white pt-5">
          {/* Logo Section */}
          <div className="w-full flex items-center gap-[2vw] border-green-600 pl-[10vw]">
            <img
              src={Cake_area_logo}
              alt="Cake Area Logo"
              className="h-[3vw]"
            />
            <h1 className="font-[Oswald] text-[2vw] font-semibold">
              Cake Area
            </h1>
          </div>
          {/* Account Section */}
          <div className="flex justify-end items-center right-0 border-blue-600 pr-[10vw] gap-[2vw] font-[poppins] text-[1vw]">
            <h2>Log in</h2>
            <h2>Sign up</h2>
          </div>
        </div>
        {/* Body Content */}
        <div className="flex-grow flex justify-center items-center ">
          <div className="text-white font-[poppins] text-center  border-green-400">
            <h2 className="text-[3vw]">
              Order Online From Bakeries Around You
            </h2>
            <h3 className="text-[1vw]">
              Get Fresh Cakes Delivered for Your Celebrations—Order Online from
              Local Bakeries!
            </h3>
            {/* Location Section  */}
            <div className="flex justify-center">
              <div className="border h-[4vw] mt-[7vh] grid grid-cols-3 w-fit">
                <div className="border bg-white flex flex-col justify-center items-start px-5 gap-1">
                  <h3 className="text-primary font-semibold text-[1vw] ml-1">
                    Municipality
                  </h3>
                  <select
                    value={selectBarangay}
                    onChange={handleBarangayOption}
                    className="text-tertiary text-[1vw]"
                  >
                    <option value={""} disabled>
                      -- Choose an option --
                    </option>
                    <option value={"Barangay Ambago"}>Barangay Ambago</option>
                    <option value={"Barangay Tiniwisan"}>
                      Barangay Tiniwisan
                    </option>
                  </select>
                </div>
                <div className="border bg-white flex flex-col justify-center items-start px-5 gap-1">
                  <h3 className="text-primary font-semibold text-[1vw] ml-1">
                    Municipality
                  </h3>
                  <select
                    value={selectStreet}
                    onChange={handleStreetOption}
                    className="text-tertiary text-[1vw]"
                  >
                    <option value={""} disabled>
                      -- Choose an option --
                    </option>
                    <option value={"Barangay Ambago"}>Barangay Ambago</option>
                    <option value={"Barangay Tiniwisan"}>
                      Barangay Tiniwisan
                    </option>
                  </select>
                </div>
                <button className="bg-primary  text-[1.5vw] font-semibold text-white hover:text-primary hover:bg-white hover:border-l-2">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
