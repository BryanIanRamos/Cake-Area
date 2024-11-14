import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import StoreProductCard from "../../components/buyer/StoreProductCard";
import Navbar from "../../components/buyer/Navbar";
import { bakerProducts } from "../../data/productDetails";

const Store = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular"); // popular, priceLow, priceHigh, rating

  const { categories: productCategories, products: bakerProductsList } =
    bakerProducts;

  // Create categories array with dynamically calculated counts
  const categories = productCategories.map((category) => ({
    name: category.name,
    count:
      category.name === "All"
        ? bakerProductsList.length
        : bakerProductsList.filter(
            (product) => product.category === category.name
          ).length,
  }));

  // Add the handleCategoryClick function
  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    // First filter by category
    let filtered =
      activeCategory === "All"
        ? bakerProductsList
        : bakerProductsList.filter(
            (product) => product.category === activeCategory
          );

    // Then filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "priceLow":
          return a.price - b.price;
        case "priceHigh":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popular":
        default:
          return b.ordered - a.ordered;
      }
    });
  };

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Get filtered and sorted products
  const filteredProducts = getFilteredAndSortedProducts();

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of products section
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  return (
    <div className="max-w-[1536px] mx-auto">
      <Navbar />
      <div className="w-full h-full flex flex-col items-start pt-12 sm:pt-14">
        {/* Store Header */}
        <div className="w-full flex flex-col sm:mt-10 justify-center items-center px-3 sm:px-0 gap-4 pt-2">
          {/* Baker Profile Section */}
          <div className="grid grid-cols-1 sm:grid-cols-5 w-full sm:w-[90%] lg:w-[80%] gap-3 sm:gap-6 bg-white rounded-md p-10">
            {/* Baker Info */}
            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                <img
                  src="/path-to-baker-image.jpg"
                  alt="Baker Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Bryan's Cake Area
                </h1>
                <p className="text-gray-600 mt-1">Master Baker: Bryan Ramos</p>
                <div className="flex items-center gap-2 justify-center sm:justify-start mt-2">
                  <div className="flex items-center text-amber-400">
                    <Icon icon="mdi:star" className="text-xl" />
                    <span className="ml-1 text-gray-700">4.8</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <div className="flex items-center text-gray-600">
                    <Icon icon="mdi:cake-variant" className="text-xl" />
                    <span className="ml-1">
                      {bakerProductsList.length} Products
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Baker Stats */}
            <div className="sm:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 sm:mt-0">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Icon
                  icon="mdi:store-check"
                  className="text-3xl text-primary mx-auto"
                />
                <p className="text-2xl font-semibold mt-2">1.2k+</p>
                <p className="text-gray-600 text-sm">Orders Completed</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Icon
                  icon="mdi:account-group"
                  className="text-3xl text-primary mx-auto"
                />
                <p className="text-2xl font-semibold mt-2">500+</p>
                <p className="text-gray-600 text-sm">Happy Customers</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center hidden sm:block">
                <Icon
                  icon="mdi:certificate"
                  className="text-3xl text-primary mx-auto"
                />
                <p className="text-2xl font-semibold mt-2">5+</p>
                <p className="text-gray-600 text-sm">Years Experience</p>
              </div>
            </div>

            {/* Baker Description */}
            <div className="sm:col-span-5 mt-6">
              <p className="text-gray-600 text-center sm:text-left">
                Welcome to Bryan's Cake Area! We specialize in creating
                delicious, handcrafted baked goods using only the finest
                ingredients. From custom cakes to fresh pastries, we put love
                and care into every creation.
              </p>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Custom Cakes
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Fresh Daily
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Special Events
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Local Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="w-[90%] sm:w-[90%] lg:w-[80%] bg-white rounded-md p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
              {/* Search Bar */}
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Icon
                  icon="material-symbols:search"
                  className="absolute left-3 top-2.5 text-gray-400 text-xl"
                />
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="popular">Most Popular</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-10 font-light overflow-x-auto whitespace-nowrap pb-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`text-sm sm:text-base lg:text-lg py-2 transition-colors duration-200 border-b-2 
                    ${
                      activeCategory === category.name
                        ? "text-primary border-primary font-medium"
                        : "text-gray-600 border-transparent hover:text-primary/70"
                    }`}
                >
                  {category.name}
                  <span className="ml-2 text-sm text-gray-500">
                    ({category.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-[90%] sm:w-[90%] lg:w-[80%] bg-white rounded-md p-6">
            {filteredProducts.length > 0 ? (
              <>
                <div className="text-sm text-gray-600 mb-4">
                  Showing {indexOfFirstProduct + 1}-
                  {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                  {filteredProducts.length} products
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <StoreProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      title={product.name}
                      description={product.description}
                      price={product.price}
                      rating={product.rating}
                      ordered={product.ordered}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-primary hover:bg-primary/10"
                      }`}
                    >
                      <Icon icon="mdi:chevron-left" className="text-xl" />
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`w-8 h-8 rounded-lg transition-colors duration-200 
                          ${
                            currentPage === index + 1
                              ? "bg-primary text-white"
                              : "text-gray-600 hover:bg-primary/10"
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-primary hover:bg-primary/10"
                      }`}
                    >
                      <Icon icon="mdi:chevron-right" className="text-xl" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Icon
                  icon="mdi:product-off"
                  className="text-6xl text-gray-400 mx-auto mb-4"
                />
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
