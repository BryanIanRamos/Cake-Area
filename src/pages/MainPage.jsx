import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Cake_BG from "../assets/Cake_BG.png";

const MainPage = () => {
  const [selectBarangay, setSelectBarangay] = useState("");
  const [selectStreet, setSelectStreet] = useState("");

  const box = ["Box1", "Box2", "Box3", "Box4", "Box2", "Box3", "Box4"];
  const busCard = [
    {
      profile: "P",
      name: "SAMANTHA BAKES",
      address: "Purok 3C, Liboon, Ampayon",
    },
    {
      profile: "P",
      name: "SAMANTHA BAKES",
      address: "Purok 3C, Liboon, Ampayon",
    },
    {
      profile: "P",
      name: "SAMANTHA BAKES",
      address: "Purok 3C, Liboon, Ampayon",
    },
    {
      profile: "P",
      name: "SAMANTHA BAKES",
      address: "Purok 3C, Liboon, Ampayon",
    },
    {
      profile: "P",
      name: "SAMANTHA BAKES",
      address: "Purok 3C, Liboon, Ampayon",
    },
  ];

  const handleBarangayOption = (event) => {
    setSelectBarangay(event.target.value);
  };

  const handleStreetOption = (event) => {
    setSelectStreet(event.target.value);
  };

  return (
    <>
      <section className="bg-[url('http://127.0.0.1:5173/src/assets/Cake_BG.png')] bg-cover bg-center  h-screen">
        <div className="border flex flex-col justify-center items-center h-full font-['poppins'] relative">
          <div className="absolute top-0 w-full grid grid-cols-2 text-white py-15">
            {/* Brand Name  */}
            <div>
              <div className="relative flex gap-2  font-semibold font-[Oswald] items-center text-[30px] pl-[7%] pt-[3%]">
                <Icon
                  icon="ic:baseline-cake"
                  style={{ fontSize: "45px", color: "white" }}
                />
                <p>Cake Area</p>
              </div>
            </div>
            <div className=" flex gap-1 text-[20px]">
              <div className=" absolute flex gap-5 bottom-0 right-[7%]">
                <a href="#" className="px-3 hover:text-primary">
                  Log in
                </a>
                <a href="#" className="px-3 hover:text-primary">
                  Sign up
                </a>
              </div>
            </div>
          </div>
          {/* Header Content  */}
          <div className="text-white text-center ">
            <h2 className="text-[50px]">
              Order Online From Bakeries Around You
            </h2>
            <h3 className="text-[25px]  px-[5%]">
              Get Fresh Cakes Delivered for Your Celebrations—Order Online from
              Local Bakeries!
            </h3>
          </div>
          {/* Address Bar  */}
          <div className="mt-[6%] flex">
            <div className="pl-2 pr-10  bg-white py-2">
              <h2 className="pl-1 text-primary font-semibold text-[15px]">
                Barangay
              </h2>
              <select
                value={selectBarangay}
                onChange={handleBarangayOption}
                className="text-trinary"
              >
                <option value={""} disabled>
                  -- Choose an option --
                </option>
                <option value={"Barangay Ambago"}>Barangay Ambago</option>
                <option value={"Barangay Tiniwisan"}>Barangay Tiniwisan</option>
              </select>
            </div>
            <div className="pl-2 pr-10  bg-white py-2">
              <h2 className="pl-1 text-primary font-semibold text-[15px]">
                Street
              </h2>
              <select
                value={selectStreet}
                onChange={handleStreetOption}
                className="text-trinary"
              >
                <option value={""} disabled>
                  -- Choose an option --
                </option>
                <option value={"Barangay Ambago"}>Barangay Ambago</option>
                <option value={"Barangay Tiniwisan"}>Barangay Tiniwisan</option>
              </select>
            </div>
            <button className="bg-primary w-[230px] text-[25px] font-semibold text-white hover:text-primary hover:bg-white hover:border-l-2">
              Search
            </button>
          </div>
        </div>
      </section>
      <section className="h-screen bg-[#F5F5F5] ">
        {/* Header Content  */}
        <div className="border text-center flex flex-col items-center h-[30%]">
          <h2 className="mt-5 text-[34px] font-bold">Find Cake Near You</h2>
          <h3 className="w-[300px] text-[16px]">
            Discover Delicious Cakes for Every Occasion, Birthdays, Parties, and
            More, Right Near You!
          </h3>
          <div className="h-4 w-[173px] bg-primary flex items-center relative my-5">
            <div className=" absolute h-1 w-[347px] bg-primary left-[-50%]"></div>
          </div>
        </div>
        {/* Body of the content  */}
        <div className="border border-red-500 my-6 h-[65%]">
          <div className="grid grid-cols-3 mx-[7%] py-2 gap-10 h-full">
            <div className="border border-green-400 overflow-auto ">
              <div className="px-10 py-3 gap-5 flex flex-col">
                {busCard.map((obj, index) => (
                  <div
                    className="border h-[100px]  bg-[#FFFFFF] text-black hover:shadow-lg px-3 py-2 flex gap-3 justify-center items-center"
                    key={index}
                  >
                    <Icon
                      icon="iconamoon:profile-circle-fill"
                      className="text-[68px]"
                    />
                    <div>
                      <h3 className="text-[20px] font-[oswald] font-semibold">
                        {obj.name}
                      </h3>
                      <div className="flex gap-1 items-center">
                        <p className="text-[11px]">{obj.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-gray-400 col-span-2  px-[5%] bg-[#FFFFFF] py-5 h-full">
              <div className="relative">
                <div className="text-[20px] font-bold font-[Oswald]">
                  SAMANTHA BAKES
                </div>
                <div className="flex items-center">
                  <Icon
                    icon="humbleicons:location"
                    style={{ fontSize: "20px", color: "black" }}
                  />
                  <div className="font-[Noto-Serif]">
                    Purok 3C, Liboon, Ampayon.
                  </div>
                </div>
                {/* Carousel */}
                <div className="border h-[200px] mt-2"></div>
                <h2 className="text-[26px] font-semibold font-[oswald]">
                  Flourish Cake Near You!
                </h2>
                <h3 className="text-[16px] font-[poppins]">
                  Best selling in ampayon.
                </h3>
                <div className="border py-2">RATING--------</div>
                <button className="absolute border right-0 py-2 px-7 text-white bg-primary hover:bg-[#EFB571]">
                  Visit Shop
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[5%]"></div>
      </section>
      {/* Footer of the content  */}
      <footer className="border ">
        <div className="h-[100px] bg-[#242324] mt-4 flex justify-center items-center">
          <p className="text-center text-[20px] text-white font-[poppins]">
            ⓒCake Area. All Right Reserved. Created By Group 6
          </p>
        </div>
      </footer>
    </>
  );
};

export default MainPage;

{
  /* <h1 className="text-[20px]">Main Page</h1>
<Icon icon="mdi:home" style={{ fontSize: '24px', color: 'blue' }} />
<h1>Hello World!</h1> */
}
