import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import StoreProductCard from "../../components/buyer/StoreProductCard";
import Navbar from "../../components/buyer/Navbar";
import { businessData } from "../../data/businessDataTbl";
import { productData } from "../../data/productDataTbl";
import { profileData } from "../../data/profileDataTbl";
import { categoryData } from "../../data/catDataTbl";
import CakeSample from "../../assets/CakeSample.png";

const Store = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  // Group all useState declarations together at the top
  const [business, setBusiness] = useState(null);
  const [profile, setProfile] = useState(null);
  const [storeProducts, setStoreProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Fetch data when component mounts
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        // Fetch all necessary data in parallel
        const [businessesRes, profilesRes, productsRes, categoriesRes] = await Promise.all([
          fetch(`http://localhost:3000/businesses`),
          fetch(`http://localhost:3000/profiles`),
          fetch(`http://localhost:3000/products`),
          fetch(`http://localhost:3000/categories`)
        ]);

        const businessesData = await businessesRes.json();
        const profilesData = await profilesRes.json();
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        // Find the business for this user
        const businessData = businessesData.find(b => b.user_id === parseInt(userId));
        const profileData = profilesData.find(p => p.user_id === parseInt(userId));
        
        // Get products for this business - Fix: Convert string ID to number
        const businessProducts = productsData.filter(p => 
          parseInt(p.business_id) === parseInt(businessData?.id)
        );

        console.log('Business Data:', businessData);
        console.log('Products:', productsData);
        console.log('Filtered Products:', businessProducts);

        setBusiness(businessData);
        setProfile(profileData);
        setStoreProducts(businessProducts);

        // Create categories array with counts
        const categoryList = [
          {
            name: "All",
            count: businessProducts.length
          },
          ...categoriesData.map(category => ({
            ...category,
            name: category.name,
            count: businessProducts.filter(product => 
              parseInt(product.cat_id) === parseInt(category.cat_id)
            ).length
          })).filter(cat => cat.count > 0)
        ];
        setCategories(categoryList);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError("Failed to load store data");
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [userId]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
      </div>
    );
  }

  // Show error state
  if (error || !business || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Store not found</h1>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Update the getFilteredAndSortedProducts function to use the new data structure
  const getFilteredAndSortedProducts = () => {
    let filtered = storeProducts;

    // Filter by category
    if (activeCategory !== "All") {
      const categoryId = categories.find(
        cat => cat.name === activeCategory
      )?.cat_id;
      filtered = filtered.filter(product => product.cat_id === categoryId);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        product =>
          product.prod_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
          return b.rate - a.rate;
        case "popular":
        default:
          return b.qty - a.qty;
      }
    });
  };

  const filteredProducts = getFilteredAndSortedProducts();
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Add the handleCategoryClick function
  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

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
            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                <img
                  src={profile.img}
                  alt={`${profile.first_name}'s Profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {business.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  Master Baker: {profile.first_name} {profile.last_name}
                </p>
                <div className="flex items-center gap-2 justify-center sm:justify-start mt-2">
                  <div className="flex items-center text-amber-400">
                    <Icon icon="mdi:star" className="text-xl" />
                    <span className="ml-1 text-gray-700">{business.store_rating}</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <div className="flex items-center text-gray-600">
                    <Icon icon="mdi:cake-variant" className="text-xl" />
                    <span className="ml-1">{business.available_items} Products</span>
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
                <p className="text-2xl font-semibold mt-2">{business.total_sold}+</p>
                <p className="text-gray-600 text-sm">Orders Completed</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Icon
                  icon="mdi:account-group"
                  className="text-3xl text-primary mx-auto"
                />
                <p className="text-2xl font-semibold mt-2">{business.no_visits}+</p>
                <p className="text-gray-600 text-sm">Store Visits</p>
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
                {business.description}
              </p>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-4">
                {categoryData.categories
                  .filter(cat => storeProducts.some(prod => prod.cat_id === cat.cat_id))
                  .slice(0, 4)
                  .map(cat => (
                    <span key={cat.cat_id} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {cat.name}
                    </span>
                  ))
                }
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
                    <div 
                      key={product.id}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="cursor-pointer"
                    >
                      <StoreProductCard
                        id={product.id}
                        image={product.images?.[0] || CakeSample}
                        title={product.prod_name}
                        description={product.description}
                        price={product.price}
                        rating={product.rate}
                      />
                    </div>
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
