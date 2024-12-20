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

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="text-center">
          {/* Warning Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Icon icon="mdi:alert" className="h-6 w-6 text-red-600" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Delete Product
          </h3>

          {/* Message */}
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete "{productName}"? This action cannot
            be undone.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  // Group all useState declarations at the top
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [businessId, setBusinessId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    prod_name: "",
    description: "",
    price: "",
    qty: "",
    rate: 0,
    images: [],
    is_available: true,
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Refs
  const categoriesRef = useRef(null);

  // Initialize localProducts as a regular state without localStorage
  const [localProducts, setLocalProducts] = useState([]);

  // Add tempProducts state
  const [tempProducts, setTempProducts] = useState([]);

  // Add deleteMode state
  const [deleteMode, setDeleteMode] = useState(false);

  // Combine products in useMemo
  const filteredProducts = useMemo(() => {
    console.log("Filtering products with:", {
      localProducts,
      products,
      businessId,
    });

    if (loading) return [];

    const combined = [...localProducts, ...products].filter(
      (product) => product.business_id === parseInt(businessId)
    );

    console.log("Combined products:", combined);
    return combined;
  }, [products, localProducts, businessId, loading]);

  // Add useEffect to fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        console.log("Fetched categories:", data);
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
    const storedBusinessId = localStorage.getItem("business_id");
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
    // Combine temporary and permanent products
    const allProducts = [...tempProducts, ...products];

    let filtered = allProducts.filter((product) => {
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

  // Modify handleEdit function to properly handle existing images
  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      prod_name: product.prod_name,
      description: product.description,
      price: product.price.toString(),
      qty: product.qty.toString(),
      is_available: product.is_available,
      cat_id: product.cat_id.toString(),
      images: product.images,
    });
    setSelectedImages([]);
    setIsModalOpen(true);
  };

  // Add function to handle replacing specific images
  const handleReplaceImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newSelectedImages = [...selectedImages];
    newSelectedImages[index] = file;
    setSelectedImages(newSelectedImages);

    const newImages = [...newProduct.images];
    newImages[index] = URL.createObjectURL(file);
    setNewProduct((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  // Update isFormValid to be less restrictive about images
  const isFormValid = () => {
    const requiredFields = {
      prod_name: newProduct.prod_name,
      description: newProduct.description,
      price: newProduct.price,
      qty: newProduct.qty,
      cat_id: newProduct.cat_id,
    };

    // Check if all required fields are filled
    const fieldsValid = Object.values(requiredFields).every(
      (field) => field !== "" && field !== null
    );

    // Require at least one image for both new and edited products
    const hasAtLeastOneImage = editingProduct
      ? editingProduct.images.length > 0
      : selectedImages.length > 0;

    return fieldsValid && hasAtLeastOneImage;
  };

  // Update handleSubmit to remove the 3-image check
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentBusinessId = parseInt(localStorage.getItem("businessId"));

      if (editingProduct) {
        // Handle Edit
        const updatedProduct = {
          ...editingProduct,
          prod_name: newProduct.prod_name,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          qty: parseInt(newProduct.qty),
          is_available: newProduct.is_available,
          cat_id: parseInt(newProduct.cat_id),
          images: editingProduct.images,
        };

        setTempProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? updatedProduct : p))
        );
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? updatedProduct : p))
        );
      } else {
        // Handle Add
        const tempProduct = {
          id: `temp_${Date.now()}`,
          business_id: currentBusinessId,
          cat_id: parseInt(newProduct.cat_id),
          prod_name: newProduct.prod_name,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          rate: 0,
          qty: parseInt(newProduct.qty),
          images: selectedImages.map((file) => URL.createObjectURL(file)),
          is_available: newProduct.is_available,
          num_visits: 0,
          num_orders: 0,
        };

        setTempProducts((prev) => [tempProduct, ...prev]);
      }

      // Reset form
      setNewProduct({
        prod_name: "",
        description: "",
        price: "",
        qty: "",
        cat_id: "",
        images: [],
        is_available: true,
      });
      setSelectedImages([]);
      setEditingProduct(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error handling product:", error);
      alert("Failed to process product. Please try again.");
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

  // Modify handleImageSelect to properly update states
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImages((prev) => [...prev, file]);

    if (editingProduct) {
      setEditingProduct((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));
    }
  };

  // Add this handler for form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Update handleDelete
  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  // Add confirmation handler
  const confirmDelete = () => {
    if (productToDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setTempProducts((prev) =>
        prev.filter((p) => p.id !== productToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

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
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#E88F2A] text-white rounded-lg hover:bg-[#E88F2A]/90"
              >
                <Icon icon="mdi:plus" />
                Add Goods
              </button>

              {/* Modified Delete Mode Toggle Button */}
              <button
                onClick={() => setDeleteMode(!deleteMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  deleteMode
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                <Icon icon="mdi:delete" />
                {deleteMode ? "Done" : "Delete"}
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
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
                deleteMode={deleteMode}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full">
            <h2 className="text-2xl text-center font-medium text-[#E88F2A] mb-2">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-center text-gray-600 mb-4">
              {editingProduct
                ? "Update your product information"
                : "Please fill in the product information to get started"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Product Name and Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="prod_name"
                    placeholder="Enter product name"
                    value={newProduct.prod_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#E88F2A] text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#E88F2A] text-sm"
                    required
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="cat_id"
                  value={newProduct.cat_id || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#E88F2A] text-sm"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.cat_id} value={category.cat_id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Enter product description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#E88F2A] text-sm"
                  required
                />
              </div>

              {/* Quantity and Images in One Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="qty"
                    placeholder="Enter quantity"
                    value={newProduct.qty}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#E88F2A] text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Product Images <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#E88F2A] text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {editingProduct
                      ? `${editingProduct.images.length} image(s) uploaded. You can add more or replace existing ones.`
                      : "Upload at least one image. You can add more later."}
                  </p>
                </div>
              </div>

              {/* Image Preview */}
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-2">Selected Images</p>
                <div className="grid grid-cols-3 gap-2">
                  {(editingProduct
                    ? editingProduct.images
                    : newProduct.images
                  ).map((imageUrl, index) => (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <div className="absolute top-1 right-1 flex gap-1">
                        <label className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleReplaceImage(e, index)}
                            className="hidden"
                          />
                          <Icon icon="mdi:pencil" className="text-xs" />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = editingProduct
                              ? editingProduct.images.filter(
                                  (_, i) => i !== index
                                )
                              : newProduct.images.filter((_, i) => i !== index);

                            if (editingProduct) {
                              setEditingProduct((prev) => ({
                                ...prev,
                                images: newImages,
                              }));
                            }
                            setNewProduct((prev) => ({
                              ...prev,
                              images: newImages,
                            }));
                            setSelectedImages((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                          className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <Icon icon="mdi:close" className="text-xs" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={newProduct.is_available}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-[#E88F2A] focus:ring-[#E88F2A]"
                />
                <label className="text-sm text-gray-700">
                  Available for Sale
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                    setNewProduct({
                      prod_name: "",
                      description: "",
                      price: "",
                      qty: "",
                      images: [],
                      is_available: true,
                    });
                    setSelectedImages([]);
                  }}
                  className="px-8 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`px-8 py-2 rounded-lg bg-[#E88F2A] text-white hover:bg-[#E88F2A]/90 
                    ${!isFormValid() ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {editingProduct ? "Save Changes" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add DeleteConfirmationModal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={confirmDelete}
        productName={productToDelete?.prod_name}
      />
    </BakerLayout>
  );
};

const ProductCard = ({ product, onEdit, onDelete, deleteMode }) => {
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
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
      <div
        className="relative w-full h-40 mb-4 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Modified delete button to only show in delete mode */}
        {deleteMode && (
          <button
            onClick={() => onDelete(product)}
            className="absolute top-2 left-2 z-20 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
          >
            <Icon icon="mdi:delete" className="text-sm" />
          </button>
        )}

        {/* Not Available badge */}
        {!product.is_available && (
          <div className="absolute top-2 right-2 z-20">
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
              Not Available
            </span>
          </div>
        )}

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
        <h3 className="font-medium text-lg mb-2">{product.prod_name}</h3>
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
          onClick={() => onEdit(product)}
          className="bg-[#FF9F0D] text-white px-4 py-1 rounded hover:bg-[#FF9F0D]/80"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Products;
