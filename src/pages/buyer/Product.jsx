import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Navbar from "../../components/buyer/Navbar";
import CakeSample from "../../assets/CakeSample.png";
import Rating from "../../components/buyer/Rating";
import { Icon } from "@iconify/react";
import ProductCard from "../../components/buyer/ProductCard";
import { commentData } from "../../data/commentData";
import CommentCard from "../../components/buyer/CommentCard";
import Pagination from "../../components/buyer/Pagination";
import { productData } from "../../data/productDataTbl";
import { imagesData } from "../../data/imagesDataTbl";
import OrderConfirmation from "../../components/buyer/modals/OrderConfirmation";
import { FiAlertCircle } from "react-icons/fi";
import AddToCartModal from "../../components/buyer/modals/AddToCartModal";
import ProductOrderConfirmation from "../../components/buyer/modals/ProductOrderConfirmation";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [orderConfirmOpen, setOrderConfirmOpen] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedComments, setLikedComments] = useState(new Set());
  const [comments, setComments] = useState(commentData);
  const [filterOption, setFilterOption] = useState("newest");
  const commentsPerPage = 5;
  const [addToCartModalOpen, setAddToCartModalOpen] = useState(false);
  const [productOrderConfirmOpen, setProductOrderConfirmOpen] = useState(false);

  // Filter comments based on selected option
  useEffect(() => {
    let filteredComments = [...commentData];

    switch (filterOption) {
      case "newest":
        filteredComments.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        filteredComments.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "highest":
        filteredComments.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        filteredComments.sort((a, b) => a.rating - b.rating);
        break;
      case "mostLiked":
        filteredComments.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }

    setComments(filteredComments);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [filterOption]);

  // Fetch product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const products = await response.json();
        const foundProduct = products.find(
          (p) => String(p.id) === String(productId)
        );

        if (!foundProduct) {
          throw new Error("Product not found");
        }

        // Find recommended products (same category, excluding current product)
        const recommended = products
          .filter(
            (p) =>
              p.cat_id === foundProduct.cat_id &&
              String(p.id) !== String(productId)
          )
          .slice(0, 4); // Get up to 4 recommended products

        console.log("Found product:", foundProduct);
        console.log("Recommended products:", recommended);

        setProduct(foundProduct);
        setRecommendedProducts(recommended);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  const handleQuantityChange = (newValue) => {
    let value = parseInt(newValue);
    if (isNaN(value)) value = 1;
    if (value < 1) value = 1;
    if (value > product.qty) value = product.qty;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    // Validate product availability
    if (!product.is_available) {
      toast.error("This product is currently unavailable", {
        icon: <FiAlertCircle className="text-lg" />,
        className: "font-[Oswald]",
        position: "bottom-right",
        duration: 2000,
      });
      return;
    }

    // Validate quantity
    if (quantity > product.qty) {
      toast.error("Selected quantity exceeds available stock", {
        icon: <FiAlertCircle className="text-lg" />,
        className: "font-[Oswald]",
        position: "bottom-right",
        duration: 2000,
      });
      return;
    }

    setAddToCartModalOpen(true);
  };

  const handleOrderNow = () => {
    setProductOrderConfirmOpen(true);
  };

  const handleConfirmProductOrder = async (paymentMethod, selectedImageIndex) => {
    try {
      console.log('Starting order creation with image index:', selectedImageIndex);
      
      // Get existing orders to determine next ID
      const response = await fetch('http://localhost:3000/orders');
      const existingOrders = await response.json();
      const nextId = (existingOrders.length + 1).toString();
      const nextOrderId = `ORD${nextId.padStart(3, '0')}`;

      const currentDate = new Date().toISOString();

      // Log the selected image before creating order
      console.log('Selected image URL:', product.images[selectedImageIndex]);

      const newOrder = {
        id: nextId,
        order_id: nextOrderId,
        customer_id: 2,
        business_id: product.business_id,
        products: [
          {
            prod_id: product.id,
            cat_id: product.cat_id,
            prod_name: product.prod_name,
            description: product.description,
            price: product.price,
            rate: product.rate,
            qty: quantity,
            images: product.images[selectedImageIndex]
          }
        ],
        total_amount: product.price * quantity,
        status: "Processing",
        created_at: currentDate,
        checkoutDate: currentDate,
        receiveDate: "null",
        downPayment: 0,
        remainingPayment: 0,
        paymentStatus: "paid"
      };

      // Log the final order before sending
      console.log('Final order being sent:', newOrder);

      // Add new order to json-server
      const addOrderResponse = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder)
      });

      if (!addOrderResponse.ok) {
        throw new Error('Failed to add order');
      }

      setProductOrderConfirmOpen(false);

      // Show success toast
      toast.success("Order placed successfully!", {
        icon: <FiAlertCircle className="text-lg" />,
        className: "font-[Oswald]",
        position: "bottom-right",
        duration: 2000,
      });

      // Navigate to orders page
      navigate("/cart/in-process");

    } catch (error) {
      console.error('Error with order creation:', error);
      toast.error("Failed to place order. Please try again.", {
        icon: <FiAlertCircle className="text-lg" />,
        className: "font-[Oswald]",
        position: "bottom-right",
        duration: 2000,
      });
    }
  };

  // Handle like click
  const handleLike = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likes: likedComments.has(commentId)
                ? comment.likes - 1
                : comment.likes + 1,
            }
          : comment
      )
    );

    setLikedComments((prevLiked) => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(commentId)) {
        newLiked.delete(commentId);
      } else {
        newLiked.add(commentId);
      }
      return newLiked;
    });
  };

  // Handle report click
  const handleReport = (commentId) => {
    // You can implement your report logic here
    alert(`Comment ${commentId} has been reported`);
  };

  // Calculate the current comments to display
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleConfirmAddToCart = async (selectedImageIndex) => {
    try {
      console.log("Starting handleConfirmAddToCart..."); // Debug log

      // Get existing orders to determine next ID
      const response = await fetch("http://localhost:3000/orders");
      console.log("Fetched existing orders response:", response); // Debug log

      const existingOrders = await response.json();
      console.log("Existing orders:", existingOrders); // Debug log

      const nextId = (existingOrders.length + 1).toString();
      const nextOrderId = `ORD${nextId.padStart(3, "0")}`;

      // Create new order object
      const newOrder = {
        id: nextId,
        order_id: nextOrderId,
        customer_id: 2,
        business_id: product.business_id,
        products: [
          {
            prod_id: product.id,
            cat_id: product.cat_id,
            prod_name: product.prod_name,
            description: product.description,
            price: product.price,
            rate: product.rate,
            qty: quantity,
            images: product.images[selectedImageIndex],
          },
        ],
        total_amount: product.price * quantity,
        status: "Pending",
        created_at: new Date().toISOString(),
        checkoutDate: "null",
        receiveDate: "null",
        downPayment: 0,
        remainingPayment: product.price * quantity,
        paymentStatus: "null",
      };

      console.log("New order to be added:", newOrder); // Debug log

      // Add new order to json-server
      const addOrderResponse = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      console.log("Add order response:", addOrderResponse); // Debug log

      if (!addOrderResponse.ok) {
        throw new Error("Failed to add order");
      }

      // Close modal
      setAddToCartModalOpen(false);

      // Show success toast
      toast.success("Added to cart successfully!", {
        icon: <FiAlertCircle className="text-lg" />,
        className: "font-[Oswald]",
        position: "bottom-right",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart. Please try again.", {
        icon: <FiAlertCircle className="text-lg" />,
        className: "font-[Oswald]",
        position: "bottom-right",
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-full w-full px-4 py-6 md:px-10 md:py-8">
      <Toaster richColors position="bottom-right" />
      <Navbar businessId={product.business_id} />

      <ProductOrderConfirmation
        isOpen={productOrderConfirmOpen}
        closeModal={() => setProductOrderConfirmOpen(false)}
        product={product}
        quantity={quantity}
        onConfirm={handleConfirmProductOrder}
      />

      <div className="w-full h-fit max-w-6xl mx-auto flex flex-col gap-2 mt-[5%]">
        <div className="bg-white grid grid-cols-1 md:grid-cols-3 w-full gap-4 p-4 rounded-lg shadow-md">
          {/* Image Section */}
          <div className="w-full h-[400px]">
            <div className="w-full h-full">
              <div className="w-full h-[75%] mb-2">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.prod_name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-3 h-[23%] gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.prod_name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="col-span-2 p-4 space-y-3">
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.prod_name}</h2>
              <p className="text-gray-600 text-base h-[120px]">
                {product.description}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 py-2 border-y border-gray-200 w-fit">
                {/* Price and Down Payment Section */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 text-sm">₱</span>
                    <span className="text-lg font-semibold">
                      {product.price.toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-sm">Price</span>
                  </div>
                  <div className="text-gray-300">|</div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 text-sm">₱</span>
                    <span className="text-lg font-semibold">
                      {(product.price * 0.5).toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-sm">Down payment</span>
                  </div>
                  <div className="bg-[#F4A340] text-white px-2 py-1 rounded">
                    50%
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#F4A340] font-bold">{product.rate}</span>
                <Rating
                  icon="ph:star-fill"
                  clickable={false}
                  initialRating={product.rate}
                  className="text-[#F4A340]"
                />
                <span className="text-gray-500 text-sm">
                  | Stock: {product.qty}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-gray-600 text-sm">Quantity</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="w-14 h-7 border border-gray-300 rounded text-center text-sm"
                    min="1"
                    max={product.qty}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleOrderNow}
                  className="px-5 py-1.5 bg-primary text-white text-sm rounded hover:bg-primary/90 transition-colors"
                >
                  Order Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="px-5 py-1.5 border border-gray-300 text-sm rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Icon icon="mdi:cart-outline" className="text-base" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Updated recommended products section with white background */}
      <div className="w-full h-fit max-w-6xl mx-auto mt-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((recProduct) => (
              <div
                key={recProduct.id}
                onClick={() => navigate(`/product/${recProduct.id}`)}
                className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="w-full h-48">
                  <img
                    src={recProduct.images[0]}
                    alt={recProduct.prod_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 truncate">
                    {recProduct.prod_name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {recProduct.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold">
                      ₱{recProduct.price.toFixed(2)}
                    </span>
                    <div className="flex items-center">
                      <Rating
                        icon="ph:star-fill"
                        clickable={false}
                        initialRating={recProduct.rate}
                        className="text-[#F4A340]"
                      />
                      <span className="text-gray-600 ml-1">
                        ({recProduct.rate})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="w-full h-fit max-w-6xl mx-auto mt-8 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="mostLiked">Most Liked</option>
              </select>
              <Icon
                icon="mdi:chevron-down"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Review Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  {(
                    comments.reduce((acc, curr) => acc + curr.rating, 0) /
                    comments.length
                  ).toFixed(1)}
                </span>
                <div className="flex flex-col">
                  <Rating
                    icon="ph:star-fill"
                    clickable={false}
                    initialRating={Number(
                      (
                        comments.reduce((acc, curr) => acc + curr.rating, 0) /
                        comments.length
                      ).toFixed(1)
                    )}
                    className="text-[#F4A340]"
                  />
                  <span className="text-sm text-gray-500">
                    Based on {comments.length} reviews
                  </span>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="flex flex-col gap-1">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = comments.filter(
                    (c) => Math.floor(c.rating) === rating
                  ).length;
                  const percentage = (count / comments.length) * 100;
                  return (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 w-8">
                        {rating}★
                      </span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {currentComments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start gap-3">
                    {/* Profile Picture */}
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={comment.user.profilePic}
                        alt={comment.user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* User Info and Rating */}
                    <div>
                      <h3 className="font-semibold text-lg">
                        {comment.user.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Rating
                          icon="ph:star-fill"
                          clickable={false}
                          initialRating={comment.rating}
                          className="text-[#F4A340]"
                        />
                        <span className="text-gray-500 text-sm">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Report Button */}
                  <button
                    onClick={() => handleReport(comment.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Icon icon="mdi:flag-outline" className="text-xl" />
                  </button>
                </div>

                <p className="text-gray-600 mb-3 ml-13">{comment.comment}</p>

                {/* Comment Images */}
                {comment.images && comment.images.length > 0 && (
                  <div className="flex gap-2 mt-2 ml-13">
                    {comment.images.map((image, index) => (
                      <div key={index} className="w-20 h-20">
                        <img
                          src={image}
                          alt={`Review ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Like Button and Count */}
                <div className="flex items-center gap-2 mt-3 ml-13">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
                      likedComments.has(comment.id)
                        ? "border-primary text-primary bg-primary/10"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    } transition-colors`}
                  >
                    <Icon
                      icon={
                        likedComments.has(comment.id)
                          ? "mdi:heart"
                          : "mdi:heart-outline"
                      }
                      className="text-lg"
                    />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from(
              { length: Math.ceil(comments.length / commentsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 mx-1 rounded ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {addToCartModalOpen && (
        <AddToCartModal
          isOpen={addToCartModalOpen}
          closeModal={() => setAddToCartModalOpen(false)}
          product={product}
          quantity={quantity}
          onConfirm={handleConfirmAddToCart}
        />
      )}
    </div>
  );
};

export default Product;
