import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Cake_BG from "../assets/Cake_BG.png";

const MainPage = () => {
  const [selectBarangay, setSelectBarangay] = useState("");
  const [selectStreet, setSelectStreet] = useState("");

  const handleBarangayOption = (event) => {
    setSelectBarangay(event.target.value);
  };

  const handleStreetOption = (event) => {
    setSelectStreet(event.target.value);
  };

  return (
    <>
      <section className="bg-[url('http://127.0.0.1:5173/src/assets/Cake_BG.png')] bg-cover bg-center w-screen h-screen">
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
      <section></section>
    </>
  );
};

export default MainPage;

{
  /* <h1 className="text-[20px]">Main Page</h1>
<Icon icon="mdi:home" style={{ fontSize: '24px', color: 'blue' }} />
<h1>Hello World!</h1> */
}
