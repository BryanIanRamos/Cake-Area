import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from 'sonner';
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
import { FiAlertCircle } from 'react-icons/fi';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Get the product data based on the route parameter
  const product = productData.products.find(
    (p) => p.prod_id === parseInt(productId)
  );

  // Get product images for this specific product
  const productImages = imagesData.images.filter(
    (img) => img.prod_id === parseInt(productId)
  );

  console.log("Product ID:", productId);
  console.log("Found Images:", productImages);

  // If product not found, show error
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
        >
          Return to Home
        </button>
      </div>
    );
  }

  console.log("Product:", product); // Debug log
  console.log("Product Images:", productImages); // Debug log

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [orderConfirmOpen, setOrderConfirmOpen] = useState(false);

  const downPayment = product.price * 0.5;

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;

  const getFilteredComments = () => {
    let filtered =
      selectedFilter === "all"
        ? commentData
        : commentData.filter(
            (comment) => Math.floor(comment.rating) === parseInt(selectedFilter)
          );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        case "mostLiked":
          return b.likes - a.likes;
        default:
          return 0;
      }
    });
  };

  const filteredComments = getFilteredComments();
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handleQuantityChange = (newValue) => {
    let value = parseInt(newValue);
    
    if (isNaN(value)) {
      value = 1;
    }
    
    if (value < 1) value = 1;
    if (value > product.qty) value = product.qty;
    
    setQuantity(value);
  };

  const handleAddToCart = () => {
    toast.success('Added to cart successfully!', {
      icon: <FiAlertCircle className="text-lg" />,
      className: 'font-[Oswald]',
      position: 'bottom-right',
      duration: 2000,
    });
  };

  const handleOrderNow = () => {
    setOrderConfirmOpen(true);
  };

  const handleConfirmOrder = (receiveDate) => {
    const orderDetails = {
      ...product,
      qty: quantity,
      status: "Processing",
      checkoutDate: new Date().toISOString(),
      receiveDate: receiveDate.toISOString(),
      totalAmount: product.price * quantity,
      downPayment: product.price * quantity * 0.5,
      remainingPayment: product.price * quantity * 0.5,
      paymentStatus: "Partial - Down Payment Received"
    };

    navigate("/cart/in-process");
    toast.success('Order placed successfully!', {
      icon: <FiAlertCircle className="text-lg" />,
      className: 'font-[Oswald]',
      position: 'bottom-right',
      duration: 2000,
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    setCurrentPage(1);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  const handleStoreClick = (busId) => {
    navigate(`/store/${busId}`);
  };

  const recommendedProducts = useMemo(() => {
    return productData.products
      .filter(p => p.bus_id === product.bus_id && p.prod_id !== product.prod_id)
      .slice(0, 4); // Show up to 4 recommended products
  }, [product.bus_id, product.prod_id]);

  return (
    <div className="flex flex-col items-center justify-start h-full w-full px-4 py-6 md:px-10 md:py-8">
      <Toaster richColors position="bottom-right" />
      <Navbar businessId={product.bus_id} />

      {orderConfirmOpen && (
        <OrderConfirmation 
          isOpen={orderConfirmOpen}
          closeModal={() => setOrderConfirmOpen(false)}
          totalAmount={product.price * quantity}
          selectedItems={[{
            ...product,
            qty: quantity,
            overall_pay: product.price * quantity
          }]}
          onConfirm={handleConfirmOrder}
        />
      )}

      <div className="w-full h-fit max-w-6xl mx-auto flex flex-col gap-2 mt-[5%]">
        {/* Top Content */}
        <div className="bg-white grid grid-cols-1 md:grid-cols-3 w-full gap-4 p-4 rounded-lg shadow-md">
          {/* Image Section */}
          <div className="w-full h-[400px]">
            <div className="w-full h-full">
              {/* Main Large Image */}
              <div className="w-full h-[75%] mb-2">
                <img
                  src={productImages[selectedImageIndex]?.link || CakeSample}
                  alt={product.prod_name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 h-[23%] gap-2">
                {productImages.slice(0, 3).map((image, index) => (
                  <div
                    key={image.image_id}
                    onClick={() => handleImageClick(index)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image.link}
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
                <div className="flex items-center gap-1">
                  <span className="text-gray-500 text-sm">₱</span>
                  <span className="text-lg font-semibold">
                    {product.price.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-sm">Price</span>
                </div>
                <div className="h-5 w-[1px] bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500 text-sm">₱</span>
                  <span className="text-lg font-semibold">
                    {downPayment.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-sm">Down payment</span>
                </div>
                <span className="bg-[#F4A340] text-white text-sm px-4 py-1 rounded">
                  50%
                </span>
              </div>

              {/* Rating and Sold Count */}
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

              {/* Quantity Section */}
              <div className="space-y-1">
                <span className="text-gray-600 text-sm">Quantity</span>
                <div className="flex items-center gap-2">
                  <button
                    className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="w-14 h-7 border border-gray-300 rounded text-center text-sm"
                    min="1"
                    max={product.qty || 99}
                  />
                  <button
                    className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                    onClick={() => setQuantity(Math.min(product.qty || 99, quantity + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
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

        {/* Recommended Products Section */}
        <div className="w-full bg-white max-w-6xl h-[210px] mx-auto p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recommend</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {recommendedProducts.map((recommendedProduct) => (
              <div 
                key={recommendedProduct.prod_id}
                onClick={() => handleProductClick(recommendedProduct.prod_id)}
                className="cursor-pointer transform transition-transform duration-200 hover:scale-105"
              >
                <ProductCard
                  productId={recommendedProduct.prod_id}
                  name={recommendedProduct.prod_name}
                  price={recommendedProduct.price}
                  image={imagesData.images.find(
                    img => img.prod_id === recommendedProduct.prod_id
                  )?.link || CakeSample}
                  className="min-w-[200px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="flex justify-center items-center w-full bg-white max-w-6xl mx-auto p-4">
          <div className="w-full">
            <h2 className="text-xl font-semibold">Product Rating</h2>
            <div className="items-center gap-2 bg-[#FAF3EB] w-full h-[180px] mt-3 p-5 grid grid-cols-1 md:grid-cols-4 rounded-lg shadow-md">
              {/* Rating Section */}
              <div className="w-full h-full col-span-1 font-[Oswald] flex justify-center items-center">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-[34px] font-semibold">3.4</span>
                    <p className="text-[28px]">out of 5</p>
                  </div>
                  <div className="flex justify-center items-center w-full">
                    <Rating
                      icon="ph:star-fill"
                      clickable={false}
                      initialRating={3.4}
                      className="text-[#F4A340] text-[20%]"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-full col-span-3">
                <div className="font-[Oswald] grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
                  <div className="flex justify-center items-center px-4">
                    <button
                      className={`border py-2 px-4 rounded-md w-full h-fit text-center transition-colors ${
                        selectedFilter === "all"
                          ? "bg-primary text-white"
                          : "border-gray-400 text-gray-400 hover:bg-gray-50"
                      }`}
                      onClick={() => handleFilterChange("all")}
                    >
                      All
                    </button>
                  </div>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      className="flex justify-center items-center px-4"
                    >
                      <button
                        className={`border py-2 px-4 rounded-md w-full h-fit text-center transition-colors ${
                          selectedFilter === rating.toString()
                            ? "bg-primary text-white"
                            : "border-gray-400 text-gray-400 hover:bg-gray-50"
                        }`}
                        onClick={() => handleFilterChange(rating.toString())}
                      >
                        {rating} star
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Add Sort Dropdown before Comments Section */}
            <div className="flex justify-between items-center mt-6 mb-4">
              <h3 className="text-lg font-semibold">Customer Reviews</h3>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
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
            {/* Comments Section */}
            <div id="comments-section" className="space-y-4">
              {currentComments.length > 0 ? (
                <>
                  {currentComments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      user={comment.user}
                      rating={comment.rating}
                      date={comment.date}
                      comment={comment.comment}
                      images={comment.images}
                      likes={comment.likes}
                    />
                  ))}

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No reviews found for this rating
                </div>
              )}
            </div>
            <hr className="border-gray-400 my-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
