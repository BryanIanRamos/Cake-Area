import React, { useState } from "react";

const BakerBusinessCard = () => {
  // Sample user data with 20 entries
  const users = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
  }));

  // State to track the current page and page group
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Number of pagination buttons to display at a time
  const buttonsPerPage = 5;

  // Calculate the start and end index of users to be displayed
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Function to change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers based on the number of users
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Calculate the start and end page numbers for the current group of buttons
  const startPage =
    Math.floor((currentPage - 1) / buttonsPerPage) * buttonsPerPage + 1;
  const endPage = Math.min(startPage + buttonsPerPage - 1, totalPages);

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-8">
        User List (Page {currentPage})
      </h2>
      <ul className="space-y-4">
        {currentUsers.map((user) => (
          <li
            key={user.id}
            className="p-4 bg-gray-100 rounded-lg shadow-md text-lg text-gray-800"
          >
            {user.name}
          </li>
        ))}
      </ul>

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
                ? "bg-blue-500 text-white"
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
