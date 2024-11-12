import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/buyer/ProductCard";
import neapolitanBrownie from "../../assets/CakeSample.png";
import Navbar from "../../components/buyer/Navbar";

const Store = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Cake");

  const categories = [
    { id: 1, name: "Cake" },
    { id: 2, name: "Bread" },
    { id: 3, name: "Pastries" },
    { id: 4, name: "Cookies" },
  ];

  const products = Array(15)
    .fill({
      image: neapolitanBrownie,
      title: "Neapolitan Brownie Ice Cream Cake",
      description:
        "Using brownie mix instead of cake mix makes this easy cake extra chocolatey.",
      price: 356.5,
      rating: 4.7,
    })
    .map((product, index) => ({ ...product, id: index + 1 }));

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    // Add your filter logic here
  };

  return (
    <div className="max-w-[1536px] mx-auto">
      <Navbar />
      <div className="w-full h-full flex flex-col items-start pt-12 sm:pt-14">
        {/* Main Content */}
        <div className="w-full flex flex-col sm:mt-10 justify-center items-center px-3 sm:px-0 gap-4 pt-2 overflow-x-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-5 w-full sm:w-[90%] lg:w-[80%] gap-3 sm:gap-6 bg-white rounded-md p-10">
            {/* Left header Content */}
            <div className="sm:col-span-2 font-[Oswald] text-center sm:text-left">
              <div className="flex gap-1 sm:gap-2 items-center justify-center sm:justify-start text-lg sm:text-2xl lg:text-3xl font-semibold">
                <Icon
                  icon="material-symbols:cake"
                  className="text-xl sm:text-3xl lg:text-4xl"
                />
                <p>Bryan Ramos</p>
              </div>
              <div className="my-2 sm:my-6">
                <h3 className="text-lg sm:text-2xl font-medium">
                  Flourish Cake Near You!
                </h3>
                <p className="text-base sm:text-xl mt-1 sm:mt-2">
                  Best Selling in Ampayon
                </p>
              </div>

              {/* Replace the Star Rating placeholder */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    icon="material-symbols:star"
                    className={`text-xl sm:text-2xl ${
                      star <= 4.5 ? "text-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm sm:text-base text-gray-600 ml-1">
                  (4.5)
                </span>
              </div>

              <button
                className="w-full sm:w-auto bg-primary py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-white text-sm sm:text-lg
                hover:bg-primary/90 transition-all duration-200 hover:shadow-md 
                active:scale-95"
              >
                Customize Order
              </button>
            </div>

            {/* Right header Content */}
            <div className="sm:col-span-3 font-[Oswald] mt-4 sm:mt-0">
              <div className="grid grid-cols-2 items-center">
                <p className="text-lg sm:text-2xl font-semibold">About</p>
                <div className="flex justify-end">
                  <button
                    className="bg-primary text-white rounded-md px-2 py-1.5 
                      flex items-center gap-1 hover:bg-primary/90 
                      transition-all duration-200 hover:shadow-md 
                      active:scale-95 text-xs sm:text-sm"
                  >
                    <Icon
                      icon="material-symbols:chat"
                      className="text-sm sm:text-base"
                    />
                    <span>Message</span>
                  </button>
                </div>
              </div>
              <div className="mt-2 sm:mt-4">
                <p className="text-sm sm:text-lg font-[Noto-Serif] leading-relaxed text-gray-700">
                  At our bakery, we pride ourselves on our signature chocolate
                  cake, crafted with the finest ingredients. Its moist layers,
                  rich ganache, and velvety buttercream make it the perfect
                  choice for any occasion.
                </p>
              </div>
            </div>
          </div>
          <div className="w-[90%] sm:w-[90%] lg:w-[80%] font-[Oswald] overflow-x-hidden">
            {/* Category  */}
            <div className="flex gap-10 font-light px-4 overflow-x-auto whitespace-nowrap ">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`text-sm sm:text-base lg:text-lg py-2 transition-colors duration-200 border-b-2 
                    ${
                      activeCategory === category.name
                        ? "text-primary border-primary"
                        : "text-gray-600 border-transparent hover:text-primary/70"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="w-full border border-gray-400"></div>
            <div className="w-full mt-5 h-[800px] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    image={product.image}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    rating={product.rating}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
