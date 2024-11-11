import { useState, useEffect } from "react";
import BakerProf from "../../data/bakerProf.json";
import DumProfile from "../../assets/Dummy_Profile.png";
import { Icon } from "@iconify/react";
import Rating from "./Rating";

const BakerBusinessCard = ({ selectedFilter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const baker = BakerProf.bakersProfile;

  // Add filtering logic
  const getFilteredBakers = () => {
    if (!selectedFilter) return baker;

    return [...baker].sort((a, b) => {
      switch (selectedFilter) {
        case "rate":
          return b.StoreRate - a.StoreRate;
        case "service":
          return b.productRate - a.productRate;
        case "sold":
          return b.sold - a.sold;
        case "goods":
          return b.available - a.available;
        default:
          return 0;
      }
    });
  };

  // Get filtered bakers
  const filteredBakers = getFilteredBakers();

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

  const itemsPerPage = 5;
  const buttonsPerPage = 5;

  // Use filtered bakers for pagination
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentBakers = filteredBakers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredBakers.length / itemsPerPage);

  // Function to change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the start and end page numbers for the current group of buttons
  const startPage =
    Math.floor((currentPage - 1) / buttonsPerPage) * buttonsPerPage + 1;
  const endPage = Math.min(startPage + buttonsPerPage - 1, totalPages);

  return (
    <div className="p-8 text-center">
      <div className="space-y-4">
        {currentBakers.map((baker) => (
          <div
            key={baker.id}
            className="p-4 bg-gray-100 shadow-md text-lg text-gray-800 grid grid-cols-12 items-start gap-5 
            transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white 
            cursor-pointer rounded-lg border border-transparent hover:border-gray-200"
          >
            {/* Profile image */}
            <div
              className="col-span-2 hidden sm:flex justify-center items-center lg:p-3 
              transition-transform duration-300 hover:scale-105"
            >
              <img
                src={baker.image}
                alt="profile"
                className="rounded-lg hover:shadow-md transition-all duration-300"
              />
            </div>

            {/* Information */}
            <div className="col-span-12 sm:col-span-9 flex flex-col justify-start items-start text-left">
              <div className="grid grid-cols-2 w-full text-[12px] sm:text-[1.5vw] md:text-[1.5vw] xl:text-[1.4vw]">
                <div
                  className="font-[oswald] font-semibold md:pb-2 
                 "
                >
                  {baker.name}
                </div>
                <div className="ont-[NotoSerif] flex items-center gap-1 text-[8px] sm:text-[1.5vw] md:text-[1.5vw] xl:text-[1.4vw]">
                  <Icon
                    icon="lsicon:location-outline"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                  <p>{baker.location}</p>
                </div>
              </div>

              {/* Description */}
              <div
                className="font-[NotoSerif] sm:h-[6vw] lg:h-[5vw] xl:h-[6vw] w-full overflow-hidden 
                text-ellipsis text-[10px] sm:text-[1.5vw] md:text-[1.3vw] lg:text-[1.3vw] xl:text-[1.4vw] 2xl:text-[1.5vw] 
                leading-[15px] sm:leading-[12px] md:leading-[13px] lg:leading-[15px] xl:leading-[22px] 2xl:leading-[25px]
                hover:text-gray-700 transition-colors duration-300"
              >
                <p className="m-0 overflow-hidden text-ellipsis line-clamp-3">
                  {baker.StoreDescription}
                </p>
              </div>

              {/* Ratings */}
              <div
                className="grid grid-cols-2 w-full text-[6px] h-fit sm:text-[0.8vw] md:text-[1vw] xl:text-[1vw]
                "
              >
                {/* Sold and store rate */}
                <div className="flex font-[oswald] items-center gap-1 sm-gap-2">
                  <div className="group-hover:font-semibold transition-all duration-300">
                    {baker.sold} Sold |
                  </div>
                  <Rating
                    icon="ph:star-fill"
                    clickable={false}
                    initialRating={baker.StoreRate}
                  />
                  <span className="group-hover:font-semibold">
                    ({baker.StoreRate} Rate)
                  </span>
                </div>
                {/* Product and Service Rate */}
                <div className="flex font-[oswald] items-center gap-1 sm-gap-2">
                  <div className="group-hover:font-semibold transition-all duration-300">
                    {baker.available} Available |
                  </div>
                  <Rating clickable={false} initialRating={baker.productRate} />
                  <span className="group-hover:font-semibold">
                    ({baker.productRate} Service)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="mt-6 flex justify-start space-x-2">
        {/* Previous button */}
        {startPage > 1 && (
          <button
            onClick={() => handlePageChange(startPage - 1)}
            className="px-4 py-2 rounded-lg shadow-md bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Previous
          </button>
        )}

        {/* Page number buttons */}
        {[...Array(endPage - startPage + 1).keys()].map((_, index) => (
          <button
            key={index + startPage}
            onClick={() => handlePageChange(index + startPage)}
            className={`px-4 py-2 rounded-lg shadow-md transition ${
              currentPage === index + startPage
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {index + startPage}
          </button>
        ))}

        {/* Next button */}
        {endPage < totalPages && (
          <button
            onClick={() => handlePageChange(endPage + 1)}
            className="px-4 py-2 rounded-lg shadow-md bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default BakerBusinessCard;