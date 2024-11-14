import React, { useState } from "react";
import Sidebar from "../../components/baker/Sidebar";
import { Icon } from "@iconify/react";
import neapolitanBrownie from "../../assets/CakeSample.png";

const Products = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Cakes");

  // Sample categories with count
  const categories = [
    { name: "Cakes", count: 5 },
    { name: "Bread", count: 3 },
    { name: "Pantries", count: 2 },
    { name: "Cookies", count: 4 },
    { name: "Pies", count: 3 },
    { name: "Muffins", count: 1 },
  ];

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Choco-Berry Surprise Cake",
      price: "₱ 782.00",
      ordered: 26,
      viewed: 132,
      image: neapolitanBrownie,
      rating: 4.5,
    },
    // Add more products as needed
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
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Icon icon="material-symbols:sort" />
              Sort By
            </button>
          </div>

          {/* Products Grid */}
          <div className="bg-white rounded-lg shadow">
            {products.map((product) => (
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
