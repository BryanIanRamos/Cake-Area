import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Cake_BG from "../assets/Cake_BG.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "../App.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MainPage = () => {
  const [selectBarangay, setSelectBarangay] = useState("");
  const [selectStreet, setSelectStreet] = useState("");
  const [rating, setRating] = useState(0);

  const box = ["Box1", "Box2", "Box3", "Box4", "Box2", "Box3", "Box4"];
  const busCard = [
    { id: 1, name: "John Doe", address: "123 Main St" },
    { id: 2, name: "Jane Smith", address: "456 Oak Ave" },
    { id: 3, name: "Alice Johnson", address: "789 Pine Dr" },
    { id: 4, name: "Bob Brown", address: "321 Cedar St" },
    { id: 5, name: "Bob Brown", address: "321 Cedar St" },
    { id: 6, name: "Bob Brown", address: "321 Cedar St" },
    { id: 7, name: "Alice Johnson", address: "789 Pine Dr" },
    { id: 8, name: "Bob Brown", address: "321 Cedar St" },
  ];

  const handleBarangayOption = (event) => {
    setSelectBarangay(event.target.value);
  };

  const handleStreetOption = (event) => {
    setSelectStreet(event.target.value);
  };

  const handleClick = (index) => {
    setRating(index + 1); // Set rating when an icon is clicked
  };

  return (
    <>
      <section className="bg-[url('http://127.0.0.1:5173/src/assets/Cake_BG.png')] bg-cover bg-center h-[60vh] sm:h-screen ">
        <div className="border flex flex-col justify-center items-center h-full font-['poppins'] relative">
          <div className="absolute top-0 w-full grid grid-cols-2 text-white py-15">
            {/* Brand Name  */}
            <div>
              <div className="relative flex gap-1 sm:gap-2  font-semibold font-[Oswald] items-center text-[20px] md:text-[25px] lg:text-[30px] 2xl:text-[35px] pl-[7%] pt-[10%] sm:pt-[8%] lg:pt-[3%] ">
                <Icon icon="ic:baseline-cake" />
                <p>Cake Area</p>
              </div>
            </div>
            <div className=" flex gap-1 text-[14px] md:text-[18px] lg:text-[20px]">
              <div className=" absolute flex sm:gap-0 lg:gap-5 bottom-0 right-[7%]">
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
            <h2 className="sm:text-[26px] md:text-[30px] lg:text-[38px] xl:text-[50px] font-semibold">
              Order Online From Bakeries Around You
            </h2>
            <h3 className="text-[9px] sm:text-[14px] md:text-[18px] xl:text-[22px] mx-[15%] sm:mx-[10%] lg:mx-[10%]">
              Get Fresh Cakes Delivered for Your Celebrations—Order Online from
              Local Bakeries!
            </h3>
          </div>
          {/* Address Bar  */}
          <div className="mt-[6%] flex overflow-hidden w-20">
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
      <section className="border h-fit border-3 border-yellow-300">
        {/* Header Content  */}
        <div className="text-center flex flex-col items-center h-fit">
          <h2 className="mt-7 text-[20px] sm:text-[28px] md:text-[32px] lg:text-[38px] font-bold">
            Find Cake Near You
          </h2>
          <h3 className="mx-[25%] md:mx-[30%] lg:mx-[35%] text-[12px] sm:text-[14px] md:text-[15px] lg:text-[18px] ">
            Discover Delicious Cakes for Every Occasion, Birthdays, Parties, and
            More, Right Near You!
          </h3>
          <div className="h-2 md:h-3 lg:h-4 w-[83px] md:w-[86px] lg:w-[120px] xl:w-[173px] bg-primary flex items-center relative my-5">
            <div className=" absolute h-1 w-[167px] md:w-[170px] lg:w-[240px] xl:w-[347px] bg-primary left-[-50%]"></div>
          </div>
        </div>
        {/* Body of the content  */}
        <div className="border border-red-500 my-6 overflow-hidden grid grid-cols-3 md:h-[450px] lg:h-[470px] w-full bg-gray-600 px-10">
          {/* Left Side Content */}
          <div className="border border-green-400 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3 col-span-3 sm:col-span-3 md:col-span-1 px-5 lg:px-7 xl:px-[50px] 2xl:px-[80px] md:px-2 overflow-y-auto">
            {busCard.map((card) => (
              <div
                key={card.id}
                className="h-[100px] border py-8 px-10 sm:px-5 flex justify-start items-center bg-white"
              >
                <div className="flex gap-3 justify-center items-center border border-red-600 w-full ">
                  <div className=" sm:block">
                    <Icon
                      icon="iconamoon:profile-circle-fill"
                      className="text-[50px] sm:text-[50px] "
                    />
                  </div>
                  <div className="w-full">
                    <h3 className="text-[15px] lg:text-[18px]  font-semibold">
                      {card.name}
                    </h3>
                    <p className="text-gray-600 w-[100px] sm:w-[120px] md:w-[108px] lg:w-[150px] xl:w-[200px] whitespace-nowrap overflow-hidden text-ellipsis text-[10px] lg:text-[14px]  border">
                      {card.address}ssssssssssssssssssssssssssssssssssss
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Content */}
          <div className="border border-gray-400 col-span-2  md:block h-full hidden md:px-3 2xl:px-[70px] gap-5">
            <div className="relative h-fit border bg-white p-5 lg:mx-6">
              <div className="text-[15px] lg:text-[20px] font-bold font-[Oswald]">
                SAMANTHA BAKES
              </div>
              <div className="flex items-center text-[12px] lg:text-[14px]">
                <Icon icon="humbleicons:location" s />
                <div className="font-[Noto-Serif] ">
                  Purok 3C, Liboon, Ampayon.
                </div>
              </div>
              {/* Carousel */}
              <div className="border border-red-600 h-[100px] mt-2 flex justify-start items-center p-4 gap-4">
                <Swiper
                  pagination={{
                    type: "fraction",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper w-full h-full"
                >
                  <SwiperSlide className="flex gap-2">
                    <img
                      src="http://127.0.0.1:5173/assets/cake1.png"
                      alt="Sample Image"
                      className="border"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
              <h2 className="text-[20px] font-semibold font-[Oswald]">
                Flourish Cake Near You!
              </h2>
              <h3 className="text-[12px] lg:text-[14px] font-[poppins]">
                Best selling in Ampayon.
              </h3>
              {/* Rating Component */}
              <div className="border py-2 flex gap-1 ">
                {[...Array(5)].map((_, index) => (
                  <Icon
                    key={index}
                    icon="ri:cake-3-fill"
                    className={`cursor-pointer text-[20px] lg:-text-[90px] ${
                      index < rating ? "text-orange-500" : "text-gray-400"
                    }`}
                    onClick={() => handleClick(index)}
                  />
                ))}
              </div>
              <div className="flex border h-fit justify-end pr-5">
                <button className=" py-1 px-4 text-white bg-primary hover:bg-[#EFB571] text-[12px]">
                  Visit Shop
                </button>
              </div>
            </div>
            <div className="mt-5 h-[120px] border bg-white p-5 lg:mx-6">
              asdsa
            </div>
          </div>
        </div>
      </section>
      {/* Footer of the content  */}
      <footer className="border ">
        <div className=" bg-[#242324] mt-4 flex justify-center items-center py-5">
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
