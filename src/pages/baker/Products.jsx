import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/baker/Sidebar";
import { Icon } from "@iconify/react";
import { productData, updateProductData } from "../../data/productDataTbl";
import { categoryData, addCategory } from "../../data/catDataTbl";
import { imagesData, updateImages } from "../../data/imagesDataTbl";
import Toast from "../../components/baker/Toast";

const Products = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const categoriesRef = useRef(null);

  // Add sortOptions array
  const sortOptions = [
    {
      value: "name",
      label: "Name (A-Z)",
      icon: "material-symbols:sort-by-alpha",
    },
    {
      value: "nameDesc",
      label: "Name (Z-A)",
      icon: "material-symbols:sort-by-alpha",
    },
    {
      value: "priceAsc",
      label: "Price (Low to High)",
      icon: "material-symbols:price-change",
    },
    {
      value: "priceDesc",
      label: "Price (High to Low)",
      icon: "material-symbols:price-change",
    },
    { value: "rating", label: "Rating", icon: "material-symbols:star" },
    {
      value: "ordered",
      label: "Most Ordered",
      icon: "material-symbols:order-approve",
    },
    {
      value: "viewed",
      label: "Most Viewed",
      icon: "material-symbols:visibility",
    },
  ];

  // Get categories with count
  const categoriesWithCount = categoryData.categories.map((category) => {
    const count = productData.products.filter(
      (product) => product.cat_id === category.cat_id
    ).length;
    return { ...category, count };
  });

  // Add "All" category
  const allCategories = [
    { cat_id: 0, name: "All", count: productData.products.length },
    ...categoriesWithCount,
  ];

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    let filtered = productData.products.filter((product) => {
      const matchesSearch = product.prod_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        categoryData.categories.find((cat) => cat.cat_id === product.cat_id)
          ?.name === selectedCategory;
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
          return b.num_orders - a.num_orders;
        case "viewed":
          return b.views - a.views;
        default:
          return 0;
      }
    });
  };

  const filteredProducts = getFilteredAndSortedProducts();

  // Get first image for each product
  const getProductImage = (prod_id) => {
    const productImage = imagesData.images.find(
      (img) => img.prod_id === prod_id
    );
    return productImage?.link || "";
  };

  // Add this CSS to your component or in your global CSS file

  const scrollBarStyle = {
    // For the container with scrollbar
    overflow: "auto",
    scrollbarWidth: "thin", // For Firefox
    scrollbarColor: "#E88F2A #F5F5F5", // For Firefox: thumb and track colors

    // Webkit browsers (Chrome, Safari, Edge)
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "6px", // For horizontal scrollbar
    },

    "&::-webkit-scrollbar-track": {
      background: "#F5F5F5",
      borderRadius: "10px",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "#E88F2A",
      borderRadius: "10px",
      "&:hover": {
        background: "#d17d1e",
      },
    },
  };

  // Handle scroll with mouse wheel
  const handleWheel = (e) => {
    if (categoriesRef.current) {
      e.preventDefault();
      categoriesRef.current.scrollLeft += e.deltaY;
    }
  };

  // Handle scroll with mouse movement near edges
  const handleMouseMove = (e) => {
    if (!categoriesRef.current) return;

    const container = categoriesRef.current;
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const edgeWidth = 50; // Width of edge detection area

    if (mouseX < edgeWidth) {
      // Near left edge - scroll left
      container.scrollLeft -= 5;
    } else if (mouseX > containerRect.width - edgeWidth) {
      // Near right edge - scroll right
      container.scrollLeft += 5;
    }
  };

  // Add smooth scrolling behavior
  useEffect(() => {
    if (categoriesRef.current) {
      categoriesRef.current.style.scrollBehavior = "smooth";
    }
  }, []);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);

    // Find the clicked button element
    const buttons = categoriesRef.current?.querySelectorAll("button");
    const clickedButton = Array.from(buttons).find((button) =>
      button.textContent.includes(categoryName)
    );

    if (clickedButton) {
      clickedButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  // Add new state for validation errors
  const [errors, setErrors] = useState({
    prod_name: "",
    price: "",
    cat_id: "",
    description: "",
    images: "",
  });

  // Update handleEditSubmit with complete validation
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      prod_name: "",
      price: "",
      cat_id: "",
      description: "",
      images: "",
    });

    // Validate all fields
    let newErrors = {};
    let hasErrors = false;

    if (!editingProduct?.prod_name?.trim()) {
      newErrors.prod_name = "Product name is required";
      hasErrors = true;
    }

    if (!editingProduct?.price || editingProduct.price <= 0) {
      newErrors.price = "Valid price is required";
      hasErrors = true;
    }

    if (!editingProduct?.cat_id) {
      newErrors.cat_id = "Category is required";
      hasErrors = true;
    }

    if (!editingProduct?.description?.trim()) {
      newErrors.description = "Description is required";
      hasErrors = true;
    }

    // Image validation (if you want to require at least one image)
    const currentImages = imagesData.images.filter(
      (img) => img.prod_id === editingProduct?.prod_id
    );
    if (
      currentImages.length === 0 &&
      (!selectedImages || selectedImages.length === 0)
    ) {
      newErrors.images = "At least one image is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      showToast("Please fill in all required fields", "error");
      return;
    }

    try {
      // Update product data
      updateProductData({
        ...editingProduct,
        price: parseFloat(editingProduct.price),
        cat_id: parseInt(editingProduct.cat_id),
      });

      // Handle images if there are changes
      if (editingProduct.images?.length > 0) {
        updateImages(editingProduct.prod_id, editingProduct.images);
      }

      setIsEditModalOpen(false);
      setEditingProduct(null);
      setSelectedImages([]);
      setNewCategory("");
      setIsAddingCategory(false);
      showToast("Product updated successfully! 🎉");
    } catch (error) {
      console.error("Error updating product:", error);
      showToast("Error updating product. Please try again.", "error");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      showToast("Maximum 3 images allowed", "warning");
      return;
    }

    try {
      const imageFiles = files.slice(0, 3);
      const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
      setSelectedImages(imageUrls);
      setNewProduct({
        ...newProduct,
        images: imageFiles,
      });
    } catch (error) {
      console.error("Error processing images:", error);
      showToast("Error processing images. Please try again.", "error");
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);

    const newProductImages = [...newProduct.images];
    newProductImages.splice(index, 1);
    setNewProduct({
      ...newProduct,
      images: newProductImages,
    });
  };

  // Add this if you need to force re-renders
  const [, forceUpdate] = useState();
  const handleForceUpdate = () => {
    forceUpdate({});
  };

  // Add these new states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    prod_name: "",
    price: "",
    description: "",
    cat_id: "",
    images: [],
    bus_id: 1, // Set this to the actual baker's business ID
    rate: 0,
    views: 0,
    num_orders: 0,
  });

  // Add this function to handle adding new product
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      prod_name: "",
      price: "",
      cat_id: "",
      description: "",
      images: "",
    });

    // Validate all fields
    let newErrors = {};
    let hasErrors = false;

    if (!newProduct.prod_name?.trim()) {
      newErrors.prod_name = "Product name is required";
      hasErrors = true;
    }

    if (!newProduct.price || newProduct.price <= 0) {
      newErrors.price = "Valid price is required";
      hasErrors = true;
    }

    if (!newProduct.cat_id) {
      newErrors.cat_id = "Category is required";
      hasErrors = true;
    }

    if (!newProduct.description?.trim()) {
      newErrors.description = "Description is required";
      hasErrors = true;
    }

    if (!selectedImages || selectedImages.length === 0) {
      newErrors.images = "At least one image is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      showToast("Please fill in all required fields", "error");
      return;
    }

    try {
      // Generate new product ID
      const newProdId =
        Math.max(...productData.products.map((p) => p.prod_id)) + 1;

      // Create new product
      const productToAdd = {
        ...newProduct,
        prod_id: newProdId,
        price: parseFloat(newProduct.price),
        cat_id: parseInt(newProduct.cat_id),
        images: newProduct.images.map((img) => ({
          ...img,
          prod_id: newProdId,
        })),
      };

      // Add the new product to the productData
      productData.products.push(productToAdd);

      // Handle images if there are changes
      if (newProduct.images.length > 0) {
        updateImages(newProdId, newProduct.images);
      }

      setIsAddModalOpen(false);
      setNewProduct({
        prod_name: "",
        price: "",
        description: "",
        cat_id: "",
        images: [],
        bus_id: 1,
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

  // Add new state for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Add delete handler functions
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    try {
      // Remove product from productData
      const productIndex = productData.products.findIndex(
        (p) => p.prod_id === productToDelete.prod_id
      );
      if (productIndex !== -1) {
        productData.products.splice(productIndex, 1);
      }

      // Remove associated images
      const imagesToDelete = imagesData.images.filter(
        (img) => img.prod_id === productToDelete.prod_id
      );
      imagesToDelete.forEach((img) => {
        const imageIndex = imagesData.images.findIndex(
          (i) => i.img_id === img.img_id
        );
        if (imageIndex !== -1) {
          imagesData.images.splice(imageIndex, 1);
        }
      });

      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      showToast("Product deleted successfully! 🗑️");
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast("Error deleting product. Please try again.", "error");
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
            {/* Adjusted the layout to bring the button closer to the sort dropdown */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#E88F2A] text-white rounded-lg hover:bg-[#E88F2A]/90"
              >
                <Icon icon="mdi:plus" />
                Add Goods
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <Icon icon="material-symbols:sort" />
                  Sort By:{" "}
                  {sortOptions.find((option) => option.value === sortBy)?.label}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 ${
                          sortBy === option.value
                            ? "text-[#E88F2A]"
                            : "text-gray-700"
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
          </div>

          {/* Products Grid */}
          <div className="bg-white rounded-lg shadow">
            {filteredProducts.map((product) => (
              <div
                key={product.prod_id}
                className="flex items-center gap-4 p-4 border-b hover:bg-gray-50 transition-colors"
              >
                <img
                  src={getProductImage(product.prod_id)}
                  alt={product.prod_name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{product.prod_name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Icon icon="ph:star-fill" className="text-[#F4A340]" />
                      {product.rate}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-medium">₱{product.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">Price</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{product.num_orders || 0}</div>
                  <div className="text-sm text-gray-500">Ordered</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{product.views || 0}</div>
                  <div className="text-sm text-gray-500">Viewed</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="px-4 py-1 bg-[#E88F2A] text-white rounded hover:bg-[#E88F2A]/90"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Icon icon="mdi:delete" className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Edit Product</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Icon icon="mdi:close" className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="p-6 overflow-y-auto flex-1">
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editingProduct?.prod_name || ""}
                      onChange={(e) => {
                        setEditingProduct({
                          ...editingProduct,
                          prod_name: e.target.value,
                        });
                        // Clear error when user starts typing
                        if (errors.prod_name) {
                          setErrors({ ...errors, prod_name: "" });
                        }
                      }}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E88F2A] focus:border-[#E88F2A] outline-none 
                        ${
                          errors.prod_name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                    />
                    {errors.prod_name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.prod_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingProduct?.price || ""}
                      onChange={(e) => {
                        setEditingProduct({
                          ...editingProduct,
                          price: parseFloat(e.target.value),
                        });
                        if (errors.price) {
                          setErrors({ ...errors, price: "" });
                        }
                      }}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E88F2A] focus:border-[#E88F2A] outline-none
                        ${errors.price ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={editingProduct?.cat_id || ""}
                      onChange={(e) => {
                        setEditingProduct({
                          ...editingProduct,
                          cat_id: parseInt(e.target.value),
                        });
                        if (errors.cat_id) {
                          setErrors({ ...errors, cat_id: "" });
                        }
                      }}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E88F2A] focus:border-[#E88F2A] outline-none
                        ${
                          errors.cat_id ? "border-red-500" : "border-gray-300"
                        }`}
                    >
                      <option value="">Select a category</option>
                      {categoryData.categories.map((category) => (
                        <option key={category.cat_id} value={category.cat_id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.cat_id && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.cat_id}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={editingProduct?.description || ""}
                      onChange={(e) => {
                        setEditingProduct({
                          ...editingProduct,
                          description: e.target.value,
                        });
                        if (errors.description) {
                          setErrors({ ...errors, description: "" });
                        }
                      }}
                      rows="3"
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E88F2A] focus:border-[#E88F2A] outline-none
                        ${
                          errors.description
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Images Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images (Max 3){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 mb-2">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        className="relative w-32 h-32 border rounded-lg overflow-hidden"
                      >
                        {selectedImages[index] ? (
                          <>
                            <img
                              src={selectedImages[index]}
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <Icon icon="mdi:close" className="text-sm" />
                            </button>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <Icon
                              icon="mdi:image-plus"
                              className="text-3xl text-gray-400"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="new-product-images"
                      max="3"
                    />
                    <label
                      htmlFor="new-product-images"
                      className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                    >
                      <Icon icon="mdi:image-plus" />
                      Select Images
                    </label>
                    <span className="text-sm text-gray-500">
                      {selectedImages.length}/3 images selected
                    </span>
                  </div>
                  {errors.images && (
                    <p className="mt-1 text-sm text-red-500">{errors.images}</p>
                  )}
                </div>
              </form>
            </div>

            {/* Fixed footer */}
            <div className="p-6 border-t bg-white">
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2 bg-[#E88F2A] text-white rounded-lg hover:bg-[#E88F2A]/90"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Add New Product</h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Icon icon="mdi:close" className="text-2xl" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <form onSubmit={handleAddSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newProduct.prod_name}
                      onChange={(e) => {
                        setNewProduct({
                          ...newProduct,
                          prod_name: e.target.value,
                        });
                        if (errors.prod_name)
                          setErrors({ ...errors, prod_name: "" });
                      }}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E88F2A] focus:border-[#E88F2A] outline-none ${
                        errors.prod_name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.prod_name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.prod_name}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => {
                        setNewProduct({
                          ...newProduct,
                          price: e.target.value,
                        });
                        if (errors.price) setErrors({ ...errors, price: "" });
                      }}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E88F2A] focus:border-[#E88F2A] outline-none ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.price}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newProduct.cat_id}
                      onChange={(e) => {
                        setNewProduct({
                          ...newProduct,
                          cat_id: e.target.value,
                        });
                        if (errors.cat_id) setErrors({ ...errors, cat_id: "" });
                      }}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E88F2A] focus:border-[#E88F2A] outline-none ${
                        errors.cat_id ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a category</option>
                      {categoryData.categories.map((category) => (
                        <option key={category.cat_id} value={category.cat_id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.cat_id && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.cat_id}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => {
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        });
                        if (errors.description)
                          setErrors({ ...errors, description: "" });
                      }}
                      rows="3"
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E88F2A] focus:border-[#E88F2A] outline-none ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Images Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images (Max 3){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 mb-2">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        className="relative w-32 h-32 border rounded-lg overflow-hidden"
                      >
                        {selectedImages[index] ? (
                          <>
                            <img
                              src={selectedImages[index]}
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <Icon icon="mdi:close" className="text-sm" />
                            </button>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <Icon
                              icon="mdi:image-plus"
                              className="text-3xl text-gray-400"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="new-product-images"
                      max="3"
                    />
                    <label
                      htmlFor="new-product-images"
                      className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                    >
                      <Icon icon="mdi:image-plus" />
                      Select Images
                    </label>
                    <span className="text-sm text-gray-500">
                      {selectedImages.length}/3 images selected
                    </span>
                  </div>
                  {errors.images && (
                    <p className="mt-1 text-sm text-red-500">{errors.images}</p>
                  )}
                </div>
              </form>
            </div>

            {/* Fixed footer */}
            <div className="p-6 border-t bg-white">
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSubmit}
                  className="px-4 py-2 bg-[#E88F2A] text-white rounded-lg hover:bg-[#E88F2A]/90"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Delete Product</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{productToDelete?.prod_name}"?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

// CSS to hide scrollbar but maintain functionality
const styles = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-x: scroll;
    scroll-behavior: smooth;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Products;
