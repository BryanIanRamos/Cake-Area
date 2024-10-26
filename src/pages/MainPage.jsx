import React, { useState } from "react";
import Cake_BG from "../assets/Cake_BG.png";
import Cake_area_logo from "../assets/cake_area_logo.png";
import BakerBusinessCard from "../components/BakerBusinessCard";
import SelectAccount from "../components/modals/SelectAccount";

const MainPage = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectBarangay, setSelectBarangay] = useState("");
  const [selectMunicipality, setSelectMunicipality] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  console.log("selectBarangay: ", selectBarangay);
  console.log("selectStreet: ", selectMunicipality);

  const handleBarangayOption = (event) => {
    setSelectBarangay(event.target.value);
  };

  const handleMunicipalityOption = (event) => {
    setSelectMunicipality(event.target.value);
  };

  // Handler function for selecting a filter
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="h-screen">
      {/* Render the modal if it's open */}
      {isModalOpen && (
        <SelectAccount isOpen={isModalOpen} closeModal={closeModal} />
      )}
      <section
        className="h-[60%] sm:h-full flex flex-col"
        style={{
          backgroundImage: `url(${Cake_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Top Bar */}
        <div className="grid grid-cols-2 border-red-500 h-fit text-white mt-5 ">
          {/* Logo Section */}
          <div className="w-full flex items-center gap-[2vw] border-green-600 pl-[10vw]">
            <img
              src={Cake_area_logo}
              alt="Cake Area Logo"
              className=" h-[7vw] sm:max-h-[5vw] xl:h-[3vw]"
            />
            <h1 className="font-[Oswald] text-[3vw] sm:text-[2vw] font-semibold">
              Bakers Area
            </h1>
          </div>
          {/* Account Section */}
          <div className="flex justify-end items-center right-0 border-blue-600 pr-[10vw] gap-[2vw] font-[poppins] text-[2.4vw] md:text-[2vw] lg:text-[1.6vw] xl:text-[1.3vw] 2xl:text-[1vw]">
            <button>Log in</button>
            <button onClick={openModal}>Sign up</button>
          </div>
        </div>
        {/* Body Content */}
        <div className="flex-grow flex justify-center items-center ">
          <div className="text-white font-[poppins] text-center  border-green-400">
            <h2 className="text-[4.5vw] sm:text-[3.5vw] 2xl:text-[3vw] ">
              Order Online From Bakeries Around You
            </h2>
            <h3 className="text-[2vw] sm:text-[1.5vw] 2xl:text-[1vw] px-3  sm:px-0">
              Get Fresh Cakes Delivered for Your Celebrations—Order Online from
              Local Bakeries!
            </h3>
            {/* Location Section  */}
            <div className="flex flex-col justify-center items-center border-green-700 mt-[30px] sm:mt-[7vh]">
              <div className=" border-red-400 h-[8vw] sm:h-[4vw] grid sm:grid-cols-3 w-[200px] sm:w-fit">
                <div className="border bg-white grid grid-cols-3 sm:grid grid-rows-3-col justify-center items-center px-2 sm:px-5 gap-1 max-sm:py-2 ">
                  <h3 className="text-primary font-semibold text-[9px] sm:text-[1vw] ml-1 col-span-1">
                    {"  "}Municipality{"  "}
                  </h3>
                  <select
                    value={selectMunicipality}
                    onChange={handleMunicipalityOption}
                    className="text-tertiary text-[1.7vw] sm:text-[1vw] col-span-2"
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
                <div className="border bg-white grid grid-cols-3 sm:grid grid-rows-3-col justify-center items-center px-2 sm:px-5 gap-1 max-sm:py-2 ">
                  <h3 className="text-primary font-semibold text-[9px] sm:text-[1vw] ml-1 col-span-1">
                    {"  "}Barangay{"  "}
                  </h3>
                  <select
                    value={selectBarangay}
                    onChange={handleBarangayOption}
                    className="text-tertiary text-[1.7vw] sm:text-[1vw] col-span-2"
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
                <button className="bg-primary  text-[2vw] sm:text-[1.5vw] font-semibold text-white hover:text-primary hover:bg-white hover:border-l-2   max-sm:h-8">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-[5vw] md:px-[15vw] py-[2vw]">
        {/* Content Header */}
        <div className="text-secondary ">
          <h2 className="font-[oswald] text-[3vw]">Find Cake Near You</h2>
          <h3 className="font-[poppins] ">
            Discover Delicious Cakes for Every Occasion, Birthdays, Parties, and
            More, Right Near You!
          </h3>
        </div>
        {/* Filter option  */}
        <div className="flex justify-end my-5">
          <div className="flex items-center gap-6 border border-gray-300 rounded-lg px-[10px] py-[5px] w-fit text-secondary font-poppins shadow-sm">
            <button
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                selectedFilter === "rate" ? "bg-[#D9D9D9]" : "hover:bg-gray-200"
              }`}
              onClick={() => handleFilterClick("rate")}
            >
              Rate
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                selectedFilter === "service"
                  ? "bg-[#D9D9D9]"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleFilterClick("service")}
            >
              Service
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                selectedFilter === "sold" ? "bg-[#D9D9D9]" : "hover:bg-gray-200"
              }`}
              onClick={() => handleFilterClick("sold")}
            >
              Sold
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                selectedFilter === "goods"
                  ? "bg-[#D9D9D9]"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleFilterClick("goods")}
            >
              Goods
            </button>
          </div>
        </div>

        <div className="w-full border border-gray-400 "></div>
        {/* Baker Business Card  */}
        <BakerBusinessCard />
      </section>
    </div>
  );
};

export default MainPage;
