import { useState } from "react";
import BakerProf from "../data/bakerProf.json";
import DumProfile from "../assets/Dummy_Profile.png";
import { Icon } from "@iconify/react";
import Rating from "./Rating";

const BakerBusinessCard = () => {
  // Sample user data with 20 entries
  // const baker = Array.from({ length: 40 }, (_, i) => ({
  //   id: i + 1,
  //   name: `User ${i + 1}`,
  // }));

  const baker = BakerProf.bakersProfile;

  // State to track the current page and page group
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Number of pagination buttons to display at a time
  const buttonsPerPage = 5;

  // Calculate the start and end index of Baker to be displayed
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentBaker = baker.slice(indexOfFirstUser, indexOfLastUser);

  // Function to change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers based on the number of Baker
  const totalPages = Math.ceil(baker.length / itemsPerPage);

  // Calculate the start and end page numbers for the current group of buttons
  const startPage =
    Math.floor((currentPage - 1) / buttonsPerPage) * buttonsPerPage + 1;
  const endPage = Math.min(startPage + buttonsPerPage - 1, totalPages);

  return (
    <div className="p-8 text-center">
      {/* <h2 className="text-2xl font-bold mb-8">
        User List (Page {currentPage})
      </h2> */}
      <div className="space-y-4">
        {currentBaker.map((baker) => (
          <div
            key={baker.id}
            className="p-4 bg-gray-100 shadow-md text-lg text-gray-800 h-[13vw] grid grid-cols-12 items-center"
          >
            {/* Profile image  */}
            <div className="border col-span-2 flex justify-center items-center p-6">
              <img src={baker.image} alt="profile" />
            </div>
            {/* Information  */}
            <div className="border col-span-9 flex flex-col justify-start items-start text-left">
              <div className="grid grid-cols-2 w-full">
                <div className="border font-[oswald] font-semibold">
                  {baker.name}
                </div>
                <div className="border ont-[NotoSerif] flex items-center gap-1">
                  <Icon icon="lsicon:location-outline" />{" "}
                  <p>{baker.location}</p>
                </div>
              </div>
              <div>
                <div className="font-[NotoSerif]">{baker.StoreDescription}</div>
                <div className="grid grid-cols-2 w-full border border-yellow-500">
                  {/* Sold and store rate  */}
                  <div className="border flex font-[oswald] items-center gap-2">
                    <div>{baker.sold} Sold | </div>
                    <Rating
                      icon="ph:star-fill"
                      clickable={false}
                      initialRating={baker.StoreRate}
                    />
                    <span>({baker.StoreRate} Rate)</span>
                  </div>
                  <div className="border flex font-[oswald] items-center gap-2">
                    <div>{baker.available} Available | </div>
                    <Rating
                      clickable={false}
                      initialRating={baker.productRate}
                    />
                    <span>({baker.productRate} Service)</span>
                  </div>{" "}
                </div>
              </div>
              <div className="grid grid-cols-2 w-full border"></div>
            </div>

            <div className="border"></div>
            {/* <p>{user.name}</p> */}
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
