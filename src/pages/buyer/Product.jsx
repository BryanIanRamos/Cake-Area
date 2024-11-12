import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/buyer/Navbar";
import neapolitanBrownie from "../../assets/CakeSample.png";
import Rating from "../../components/buyer/Rating";
import { Icon } from "@iconify/react";
import ProductCard from "../../components/buyer/ProductCard";
import { commentData } from "../../data/commentData";
import CommentCard from "../../components/buyer/CommentCard";
import Pagination from "../../components/buyer/Pagination";

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(neapolitanBrownie);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3; // Number of comments to show per page
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Calculate pagination
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;

  const getFilteredComments = () => {
    if (selectedFilter === "all") {
      return commentData;
    }
    const ratingFilter = parseInt(selectedFilter);
    return commentData.filter(
      (comment) => Math.floor(comment.rating) === ratingFilter
    );
  };

  const filteredComments = getFilteredComments();
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(99, value));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    toast.success("Added to cart successfully!");
  };

  const handleOrderNow = () => {
    navigate("/checkout", {
      state: {
        product: {
          id: 1,
          name: "Choco-Berry Surprise Cake",
          price: 713.0,
          quantity: quantity,
        },
      },
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    document
      .getElementById("comments-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="flex flex-col items-center justify-start h-full w-full px-4 py-6 md:px-10 md:py-8">
      <Navbar />

      <div className="w-full h-fit max-w-6xl mx-auto flex flex-col gap-2 mt-[5%]">
        {/* Top Content  */}
        <div className="bg-white grid grid-cols-1 md:grid-cols-3 w-full gap-4 p-4 rounded-lg shadow-md ">
          {/* Image Section - Left Column */}
          <div className="w-full h-[400px]">
            <div className="w-full h-full">
              {/* Main Image Container */}
              <div className="w-full h-[75%] mb-2">
                <img
                  src={neapolitanBrownie}
                  alt="Main Product Image"
                  className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-105"
                />
              </div>

              {/* Thumbnail Images Container */}
              <div className="grid grid-cols-3 h-[23%] gap-2">
                {[...Array(3)].map((_, index) => (
                  <img
                    key={index}
                    src={neapolitanBrownie}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content Section - Right Columns */}
          <div className="col-span-2 p-4 space-y-3">
            {/* Title & Description */}
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Choco-Berry Surprise Cake
              </h2>
              <p className="text-gray-600 text-base h-[120px]">
                This whimsical and elegant cake would impress just about anyone,
                and the gorgeous chocolate details just scream "party."
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 py-2 border-y border-gray-200 w-fit">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500 text-sm">₱</span>
                  <span className="text-lg font-semibold">713.00</span>
                  <span className="text-gray-500 text-sm">Price</span>
                </div>
                <div className="h-5 w-[1px] bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500 text-sm">₱</span>
                  <span className="text-lg font-semibold">356.50</span>
                  <span className="text-gray-500 text-sm">Down payment</span>
                </div>
                <span className="bg-[#F4A340] text-white text-sm px-4 py-1 rounded">
                  50%
                </span>
              </div>

              {/* Rating and Sold Count */}
              <div className="flex items-center gap-2">
                <span className="text-[#F4A340] font-bold">4.7</span>
                <Rating
                  icon="ph:star-fill"
                  clickable={false}
                  initialRating={4.7}
                  className="text-[#F4A340]"
                />
                <span className="text-gray-500 text-sm">| 54 Sold</span>
              </div>

              {/* Quantity Section */}
              <div className="space-y-1">
                <span className="text-gray-600 text-sm">Quantity</span>
                <div className="flex items-center gap-2">
                  <button
                    className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value) || 1)
                    }
                    className="w-14 h-7 border border-gray-300 rounded text-center text-sm"
                    min="1"
                    max="99"
                  />
                  <button
                    className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleOrderNow}
                  className="px-5 py-1.5 bg-primary text-white text-sm rounded hover:bg-primary/90 transition-colors"
                >
                  Order Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="px-5 py-1.5 border border-gray-300 text-sm rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Icon icon="mdi:cart-outline" className="text-base" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mid Content  */}
        <div className="w-full bg-white max-w-6xl h-[210px] mx-auto p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recommend</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[669, 669, 669, 669, 669].map((price, index) => (
              <ProductCard
                key={index}
                image={neapolitanBrownie}
                price={price}
              />
            ))}
          </div>
        </div>

        {/* Bottom Content  */}
        <div className="flex justify-center items-center w-full bg-white max-w-6xl mx-auto p-4">
          <div className="w-full">
            <h2 className="text-xl font-semibold">Product Rating</h2>
            <div className="items-center gap-2 bg-[#FAF3EB] w-full h-[180px] mt-3 p-5 grid grid-cols-1 md:grid-cols-4 rounded-lg shadow-md">
              {/* Rating Section  */}
              <div className="w-full h-full col-span-1 font-[Oswald] flex justify-center items-center">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[34px] font-semibold">3.4</span>
                    <p className="text-[28px]">out of 5</p>
                  </div>
                  <div className="flex justify-center items-center w-full">
                    <Rating
                      icon="ph:star-fill"
                      clickable={false}
                      initialRating={3.4}
                      className="text-[#F4A340] text-[20%]"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-full col-span-3">
                <div className="font-[Oswald] grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
                  <div className="flex justify-center items-center px-4">
                    <button
                      className={`border py-2 px-4 rounded-md w-full h-fit text-center transition-colors ${
                        selectedFilter === "all"
                          ? "bg-primary text-white"
                          : "border-gray-400 text-gray-400 hover:bg-gray-50"
                      }`}
                      onClick={() => handleFilterChange("all")}
                    >
                      All
                    </button>
                  </div>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      className="flex justify-center items-center px-4"
                    >
                      <button
                        className={`border py-2 px-4 rounded-md w-full h-fit text-center transition-colors ${
                          selectedFilter === rating.toString()
                            ? "bg-primary text-white"
                            : "border-gray-400 text-gray-400 hover:bg-gray-50"
                        }`}
                        onClick={() => handleFilterChange(rating.toString())}
                      >
                        {rating} star
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Comments Section */}
            <div id="comments-section" className="space-y-4">
              {currentComments.length > 0 ? (
                <>
                  {currentComments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      user={comment.user}
                      rating={comment.rating}
                      date={comment.date}
                      comment={comment.comment}
                      images={comment.images}
                      likes={comment.likes}
                    />
                  ))}

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No reviews found for this rating
                </div>
              )}
            </div>
            <hr className="border-gray-400 my-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
