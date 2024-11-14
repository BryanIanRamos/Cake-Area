import React, { useState } from "react";
import Sidebar from "../../components/baker/Sidebar";
import { Icon } from "@iconify/react";
import profileImage from "../../assets/Dummy_Profile.png";

const Reviews = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [selectedRating, setSelectedRating] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample review data
  const reviews = [
    {
      id: 1,
      customerName: "John Doe",
      productName: "Choco-Berry Surprise Cake",
      rating: 5,
      comment: "Amazing cake! The taste was perfect and delivery was on time.",
      date: "2024-03-10",
      helpful: 12,
      reply: "",
      image: "/cakes/choco-berry.jpg",
    },
    {
      id: 2,
      customerName: "Alice Smith",
      productName: "Vanilla Dream Cake",
      rating: 4,
      comment: "Great cake but the frosting was a bit too sweet for my taste.",
      date: "2024-03-09",
      helpful: 8,
      reply: "Thank you for your feedback! We'll take note of the frosting sweetness.",
      image: "/cakes/vanilla-dream.jpg",
    },
    // Add more reviews...
  ];

  // Calculate rating statistics
  const stats = {
    total: reviews.length,
    average: reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length,
    distribution: {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length,
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <main
        className={`transition-all duration-300 flex-1 overflow-y-auto p-6
          ${isSidebarExpanded ? "ml-64" : "ml-20"}`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Customer Reviews</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search reviews..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Icon
                icon="material-symbols:search"
                className="absolute left-3 top-2.5 text-gray-400 text-xl"
              />
            </div>
          </div>

          {/* Rating Overview */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overall Rating */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#E88F2A]">
                  {stats.average.toFixed(1)}
                </h2>
                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      icon="ph:star-fill"
                      className={`text-2xl ${
                        star <= Math.round(stats.average)
                          ? "text-[#F4A340]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">Based on {stats.total} reviews</p>
              </div>

              {/* Rating Distribution */}
              <div className="col-span-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-4 mb-2">
                    <span className="w-12 text-sm text-gray-600">
                      {rating} stars
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E88F2A]"
                        style={{
                          width: `${(stats.distribution[rating] / stats.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="w-12 text-sm text-gray-600 text-right">
                      {stats.distribution[rating]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6">
            {["all", "5", "4", "3", "2", "1"].map((rating) => (
              <button
                key={rating}
                onClick={() => setSelectedRating(rating)}
                className={`px-4 py-2 rounded-lg ${
                  selectedRating === rating
                    ? "bg-[#E88F2A] text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                {rating === "all" ? "All Reviews" : `${rating} Stars`}
              </button>
            ))}
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={profileImage}
                      alt={review.customerName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{review.customerName}</h3>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon
                            key={star}
                            icon="ph:star-fill"
                            className={`${
                              star <= review.rating
                                ? "text-[#F4A340]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>

                <div className="flex gap-4 mb-4">
                  <img
                    src={review.image}
                    alt={review.productName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium mb-2">{review.productName}</h4>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>

                {review.reply && (
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon icon="mdi:reply" className="text-gray-500" />
                      <span className="font-medium">Your Reply</span>
                    </div>
                    <p className="text-gray-600">{review.reply}</p>
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                    <Icon icon="mdi:thumb-up-outline" />
                    <span>{review.helpful} Helpful</span>
                  </button>
                  {!review.reply && (
                    <button className="text-[#E88F2A] hover:text-[#E88F2A]/80">
                      Reply to review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reviews; 