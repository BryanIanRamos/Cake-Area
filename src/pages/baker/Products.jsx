import React, { useState, useRef, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import BakerLayout from "../../components/baker/BakerLayout";
import Toast from "../../components/baker/Toast";

const useImageCarousel = (images, hoverState) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (hoverState && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setCurrentImageIndex(0);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hoverState, images.length]);

  return currentImageIndex;
};

const Products = () => {
  // Add new state for products
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [businessId, setBusinessId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Add the missing ref
  const categoriesRef = useRef(null);

  // Add useEffect to fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Compute all categories with counts
  const allCategories = useMemo(() => {
    return [
      { name: "All", count: products.length },
      ...categories.map((cat) => ({
        name: cat.name,
        count: products.filter((product) => product.cat_id === cat.cat_id)
          .length,
      })),
    ];
  }, [categories, products]);

  // Add the missing click handler
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  // Add useEffect to fetch products
  useEffect(() => {
    const storedBusinessId = localStorage.getItem("businessId");
    console.log("Stored Business ID:", storedBusinessId);
    setBusinessId(storedBusinessId ? parseInt(storedBusinessId) : null);

    if (storedBusinessId) {
      fetchProducts(parseInt(storedBusinessId));
    } else {
      console.log("No business ID found in localStorage");
      setLoading(false);
    }
  }, []);

  const fetchProducts = async (busId) => {
    try {
      setLoading(true);
      console.log("Fetching products for business:", busId);
      const response = await fetch(
        `http://localhost:3000/products?business_id=${busId}`
      );
      console.log("Response status:", response.status);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      showToast("Error loading products", "error");
    } finally {
      setLoading(false);
    }
  };

  // Add this console log to see what's being rendered
  console.log("Current state:", { loading, products, businessId });

  // Modify getFilteredAndSortedProducts to use categories from db.json
  const getFilteredAndSortedProducts = () => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.prod_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        categories.find((cat) => cat.cat_id === product.cat_id)?.name ===
          selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.prod_name.localeCompare(b.prod_name);
        case "nameDesc":
          return b.prod_name.localeCompare(a.prod_name);
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "rating":
          return b.rate - a.rate;
        case "ordered":
          return (b.num_orders || 0) - (a.num_orders || 0);
        case "viewed":
          return (b.num_visits || 0) - (a.num_visits || 0);
        default:
          return 0;
      }
    });
  };

  // Update handleAddSubmit to use JSON server
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    // ... existing validation ...

    try {
      const productToAdd = {
        ...newProduct,
        business_id: businessId,
        price: parseFloat(newProduct.price),
        cat_id: parseInt(newProduct.cat_id),
      };

      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToAdd),
      });

      if (!response.ok) throw new Error("Failed to add product");
      const data = await response.json();

      // Update local state
      setProducts([...products, data]);

      setIsAddModalOpen(false);
      setNewProduct({
        prod_name: "",
        price: "",
        description: "",
        cat_id: "",
        images: [],
        rate: 0,
        views: 0,
        num_orders: 0,
      });
      setSelectedImages([]);
      showToast("Product added successfully! 🎉");
    } catch (error) {
      console.error("Error adding product:", error);
      showToast("Error adding product. Please try again.", "error");
    }
  };

  // Update handleEditSubmit to use JSON server
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // ... existing validation ...

    try {
      const response = await fetch(
        `http://localhost:3000/products/${editingProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingProduct),
        }
      );

      if (!response.ok) throw new Error("Failed to update product");
      const data = await response.json();

      // Update local state
      setProducts(products.map((p) => (p.id === editingProduct.id ? data : p)));

      setIsEditModalOpen(false);
      setEditingProduct(null);
      setSelectedImages([]);
      showToast("Product updated successfully! 🎉");
    } catch (error) {
      console.error("Error updating product:", error);
      showToast("Error updating product. Please try again.", "error");
    }
  };

  // Update handleDeleteConfirm to use JSON server
  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete product");

      // Update local state
      setProducts(products.filter((p) => p.id !== productToDelete.id));

      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      showToast("Product deleted successfully! 🗑️");
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast("Error deleting product. Please try again.", "error");
    }
  };

  // Add loading state to the JSX
  if (loading) {
    return (
      <BakerLayout>
        <div className="p-6 flex justify-center items-center">
          <p>Loading products...</p>
        </div>
      </BakerLayout>
    );
  }

  // ... rest of your component remains the same ...

  // Add the return statement to render the products
  return (
    <BakerLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Keep an Eye on Your Stock</h1>
          </div>

          {/* Categories */}
          <div
            ref={categoriesRef}
            className="flex gap-4 mb-6 overflow-x-auto hide-scrollbar"
          >
            {allCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
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
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#E88F2A] text-white rounded-lg hover:bg-[#E88F2A]/90"
              >
                <Icon icon="mdi:plus" />
                Add Goods
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white"
              >
                <option value="name">Name (A-Z)</option>
                <option value="nameDesc">Name (Z-A)</option>
                <option value="priceAsc">Price (Low to High)</option>
                <option value="priceDesc">Price (High to Low)</option>
                <option value="rating">Rating</option>
                <option value="ordered">Most Ordered</option>
                <option value="viewed">Most Viewed</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {getFilteredAndSortedProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </BakerLayout>
  );
};

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const currentImageIndex = useImageCarousel(product.images, isHovered);
  const [isScaling, setIsScaling] = useState(false);

  // Effect to handle scaling animation on hover
  useEffect(() => {
    if (isHovered) {
      setIsScaling(true);
      const timer = setTimeout(() => {
        setIsScaling(false);
      }, 4000); // Match this duration with the CSS transition duration

      return () => clearTimeout(timer);
    } else {
      setIsScaling(false); // Reset scaling when not hovered
    }
  }, [isHovered]);

  // Effect to reset scaling after the third image
  useEffect(() => {
    if (currentImageIndex === 2) {
      // Check if it's the third image (index 2)
      const timer = setTimeout(() => {
        setIsScaling(false); // Reset to normal scale after 2 seconds
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [currentImageIndex]);

  return (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full"
    >
      <div
        className="relative w-full h-40 mb-4 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={product.images?.[currentImageIndex] || "default-image-path.jpg"}
          alt={product.prod_name}
          className={`
            w-full h-full object-cover rounded-lg 
            transition-transform duration-[4000ms]
            ${isScaling ? "scale-125" : "scale-100"}
          `}
        />

        {product.images?.length > 1 && isHovered && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`
                  w-1.5 h-1.5 rounded-full 
                  ${
                    currentImageIndex === index
                      ? "bg-white scale-110"
                      : "bg-white/50 scale-100"
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="flex-grow">
        {/* Product Title */}
        <h3 className="font-medium text-lg mb-2">{product.prod_name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Icon icon="ph:star-fill" className="text-[#F4A340]" />
          <span>{product.rate}</span>
        </div>
      </div>

      {/* Stats and Edit Button */}
      <div className="flex justify-between items-center mt-3">
        <div className="text-sm text-gray-600">
          <div className="text-center">
            <div>₱{product.price.toFixed(2)}</div>
            <div className="text-xs">Price</div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <div className="text-center">
            <div>{product.num_orders || 0}</div>
            <div className="text-xs">Ordered</div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <div className="text-center">
            <div>{product.num_visits || 0}</div>
            <div className="text-xs">Viewed</div>
          </div>
        </div>

        <button
          onClick={() => handleEdit(product)}
          className="bg-[#FF9F0D] text-white px-4 py-1 rounded hover:bg-[#FF9F0D]/80"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Products;
