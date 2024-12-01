import React, { useState, useRef, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import BakerLayout from "../../components/baker/BakerLayout";
import Toast from "../../components/baker/Toast";

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
        const response = await fetch('http://localhost:3000/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Compute all categories with counts
  const allCategories = useMemo(() => {
    return [
      { name: "All", count: products.length },
      ...categories.map(cat => ({
        name: cat.name,
        count: products.filter(product => product.cat_id === cat.cat_id).length
      }))
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
        categories.find((cat) => cat.cat_id === product.cat_id)?.name === selectedCategory;
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
          return (b.views || 0) - (a.views || 0);
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
              <div className="relative">
                {/* ... keep your existing sort dropdown code ... */}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="bg-white rounded-lg shadow">
            {loading ? (
              <div className="p-6 text-center">Loading products...</div>
            ) : (
              getFilteredAndSortedProducts().map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 border-b hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={product.images?.[0] || "default-image-path.jpg"}
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
              ))
            )}
          </div>
        </div>
      </div>
    </BakerLayout>
  );
};

export default Products;
