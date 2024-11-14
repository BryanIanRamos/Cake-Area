import React, { useState } from "react";
import Sidebar from "../../components/baker/Sidebar";
import { Icon } from "@iconify/react";
import { bakerProducts } from "../../data/productDetails";

const Products = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Cakes");
  const [sortBy, setSortBy] = useState("name");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { categories, products } = bakerProducts;

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort the filtered products
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "ordered":
          return b.ordered - a.ordered;
        case "viewed":
          return b.viewed - a.viewed;
        default:
          return 0;
      }
    });
  };

  const filteredProducts = getFilteredAndSortedProducts();

  // Sort options
  const sortOptions = [
    { value: "name", label: "Name (A-Z)", icon: "material-symbols:sort-by-alpha" },
    { value: "nameDesc", label: "Name (Z-A)", icon: "material-symbols:sort-by-alpha" },
    { value: "priceAsc", label: "Price (Low to High)", icon: "mdi:sort-numeric-ascending" },
    { value: "priceDesc", label: "Price (High to Low)", icon: "mdi:sort-numeric-descending" },
    { value: "rating", label: "Highest Rating", icon: "material-symbols:star" },
    { value: "ordered", label: "Most Ordered", icon: "mdi:shopping-outline" },
    { value: "viewed", label: "Most Viewed", icon: "mdi:eye-outline" },
  ];

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
            <h1 className="text-2xl font-bold">Keep an Eye on Your Stock</h1>
            <button
              className="bg-[#E88F2A] text-white px-4 py-2 rounded-lg hover:bg-[#E88F2A]/90 flex items-center gap-2"
              onClick={() => {
                /* Add new product logic */
              }}
            >
              <Icon icon="mdi:plus" />
              Add Goods
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === category.name
                    ? "text-[#E88F2A] font-medium"
                    : "text-gray-600"
                }`}
              >
                {category.name}({category.count})
              </button>
            ))}
          </div>

          {/* Search and Sort Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Look for your products here..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Icon
                icon="material-symbols:search"
                className="absolute left-3 top-2.5 text-gray-400 text-xl"
              />
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Icon icon="material-symbols:sort" />
                Sort By: {sortOptions.find(option => option.value === sortBy)?.label}
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 ${
                        sortBy === option.value ? 'text-[#E88F2A]' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Icon icon={option.icon} className="text-lg" />
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="bg-white rounded-lg shadow">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 border-b hover:bg-gray-50 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Icon icon="ph:star-fill" className="text-[#F4A340]" />
                      {product.rating}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{product.price}</div>
                  <div className="text-sm text-gray-500">Price</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{product.ordered}</div>
                  <div className="text-sm text-gray-500">Ordered</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{product.viewed}</div>
                  <div className="text-sm text-gray-500">Viewed</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-1 bg-[#E88F2A] text-white rounded hover:bg-[#E88F2A]/90">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Icon icon="mdi:delete" className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
