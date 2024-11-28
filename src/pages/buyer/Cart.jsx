import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { LuArrowUpDown } from "react-icons/lu";
import { Toaster, toast } from "sonner";
import { FiAlertCircle } from "react-icons/fi";

// Import data
import { ordersData } from "../../data/orderDataTbl";
import { productData } from "../../data/productDataTbl";
import { businessData } from "../../data/businessDataTbl";
import { imagesData } from "../../data/imagesDataTbl";

// Components
import CartHeader from "../../components/buyer/CartHeader";
import CartTabs from "../../components/buyer/CartTabs";
import OrderCard from "../../components/buyer/OrderCard";
import CartSummary from "../../components/buyer/CartSummary";
import OrderConfirmation from "../../components/buyer/modals/OrderConfirmation";
import StoreOrderCard from "../../components/buyer/StoreOrderCard";

// Add these utility functions at the top of the file, outside the component
const STORAGE_KEYS = {
  CART_ITEMS: "cartItems",
  PROCESSING_ORDERS: "processingOrders",
  TO_RECEIVE_ORDERS: "toReceiveOrders",
  COMPLETED_ORDERS: "completedOrders",
  CANCELLED_ORDERS: "cancelledOrders",
  REFUNDED_ORDERS: "refundedOrders",
};

const getStorageData = (key) => {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return [];
    }
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return [];
  }
};

const setStorageData = (key, data) => {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Add this import at the top of the file
import CakeSample from "../../assets/CakeSample.png";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkOutConfirm, setCheckOutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingOrders, setProcessingOrders] = useState([]);
  const [toReceiveOrders, setToReceiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [refundOrders, setRefundOrders] = useState([]);

  // Modified useEffect to properly use the order data from db.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders");
        const orders = await response.json();

        // Filter orders for customer_id 2
        const userOrders = orders.filter((order) => order.customer_id === 2);

        // Set orders based on their status
        setCartItems(userOrders.filter((order) => order.status === "Pending"));
        setProcessingOrders(
          userOrders.filter((order) => order.status === "Processing")
        );
        setToReceiveOrders(
          userOrders.filter((order) => order.status === "To Receive")
        );
        setCompletedOrders(
          userOrders.filter((order) => order.status === "Completed")
        );
        setCancelledOrders(
          userOrders.filter((order) => order.status === "Cancelled")
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      }
    };

    fetchData();
  }, []);

  // Save cart items whenever they change
  useEffect(() => {
    setStorageData(STORAGE_KEYS.CART_ITEMS, cartItems);
  }, [cartItems]);

  // Save processing orders whenever they change
  useEffect(() => {
    setStorageData(STORAGE_KEYS.PROCESSING_ORDERS, processingOrders);
  }, [processingOrders]);

  // Update the grouping logic
  const groupOrdersByBusiness = (orders) => {
    return orders.reduce((acc, order) => {
      const busId = order.business?.bus_id;
      if (!busId) return acc;

      if (!acc[busId]) {
        acc[busId] = {
          business: order.business,
          order_id: order.order_id,
          products: [],
          images: order.images,
          status: order.status,
          total_amount: 0,
        };
      }

      // Add all products from this order
      acc[busId].products = [...acc[busId].products, ...order.products];
      acc[busId].total_amount += order.total_amount || 0;

      return acc;
    }, {});
  };

  // Update handleConfirmCheckout
  const handleConfirmCheckout = (receiveDate) => {
    // Create new orders in "Processing" status
    const newOrders = cartItems.reduce((acc, order) => {
      const selectedProducts = order.products.filter((p) =>
        selectedItems.includes(p.prod_id)
      );

      if (selectedProducts.length > 0) {
        acc.push({
          order_id: `ORD${Date.now()}-${order.business.bus_id}`,
          business_id: order.business.bus_id,
          business: order.business,
          products: selectedProducts,
          images: order.images,
          total_amount: selectedProducts.reduce(
            (sum, p) => sum + p.price * p.quantity,
            0
          ),
          status: "Processing",
          created_at: new Date().toISOString(),
          checkoutDate: new Date().toISOString(),
          receiveDate: receiveDate.toISOString(),
          downPayment:
            selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0) *
            0.5,
          remainingPayment:
            selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0) *
            0.5,
          paymentStatus: "Partial - Down Payment Received",
        });
      }
      return acc;
    }, []);

    // Add to processing orders
    setProcessingOrders((prev) => [...prev, ...newOrders]);

    // Remove selected items from cart
    setCartItems((prev) =>
      prev
        .map((order) => ({
          ...order,
          products: order.products.filter(
            (p) => !selectedItems.includes(p.prod_id)
          ),
        }))
        .filter((order) => order.products.length > 0)
    );

    // Reset selections and close modal
    setSelectedItems([]);
    setCheckOutConfirm(false);

    // Show success message and navigate
    toast.success("Down payment received! Order has been placed successfully!");
    navigate("/cart/in-process");
  };

  // Update handleSelectAll for business groups
  const handleSelectAll = (businessId) => {
    const businessProducts =
      cartItems.find((order) => order.business?.bus_id === businessId)
        ?.products || [];

    const allProductIds = businessProducts.map((p) => p.prod_id);
    const allSelected = allProductIds.every((id) => selectedItems.includes(id));

    setSelectedItems((prev) => {
      if (allSelected) {
        return prev.filter((id) => !allProductIds.includes(id));
      }
      return [...new Set([...prev, ...allProductIds])];
    });
  };

  // Update handleSelectItem
  const handleSelectItem = (prodId) => {
    setSelectedItems((prev) => {
      if (prev.includes(prodId)) {
        return prev.filter((id) => id !== prodId);
      }
      return [...prev, prodId];
    });
  };

  const handleUpdateQuantity = (orderId, newQty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.order_id === orderId
          ? {
              ...item,
              quantity: newQty,
              total_amount: (item.price || 0) * newQty,
            }
          : item
      )
    );
  };

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, order) => {
      const orderTotal = order.products
        .filter((product) => selectedItems.includes(product.prod_id))
        .reduce(
          (orderSum, product) =>
            orderSum + (product.price || 0) * (product.quantity || 1),
          0
        );
      return sum + orderTotal;
    }, 0);

    setTotalAmount(newTotal);
  }, [selectedItems, cartItems]);

  // Update handleCheckout to show confirmation modal
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select items to checkout");
      return;
    }

    // Get selected products with their current quantities
    const selectedOrders = cartItems.reduce((acc, order) => {
      const selectedProducts = order.products.filter((p) =>
        selectedItems.includes(p.prod_id)
      );

      if (selectedProducts.length > 0) {
        acc.push({
          business: order.business,
          products: selectedProducts,
          total_amount: selectedProducts.reduce(
            (sum, p) => sum + p.price * p.quantity,
            0
          ),
        });
      }
      return acc;
    }, []);

    // Show confirmation modal with selected orders
    setCheckOutConfirm(true);
  };

  const getOrderCount = () => {
    switch (location.pathname) {
      case "/cart":
        return cartItems.length;
      case "/cart/in-process":
        return processingOrders.length;
      case "/cart/to-receive":
        return toReceiveOrders.length;
      case "/cart/completed":
        return completedOrders.length;
      case "/cart/cancelled":
        return cancelledOrders.length;
      default:
        return 0;
    }
  };

  // Group cart items by store
  const groupedCartItems = React.useMemo(() => {
    const grouped = cartItems.reduce((acc, item) => {
      const busId = item.business?.bus_id;
      if (!busId) return acc;

      if (!acc[busId]) {
        acc[busId] = {
          business: item.business,
          items: [],
        };
      }
      acc[busId].items.push(item);
      return acc;
    }, {});

    return Object.values(grouped);
  }, [cartItems]);

  // Add this useEffect to initialize the dummy data
  useEffect(() => {
    // Dummy data for to-receive orders
    const dummyToReceive = [
      {
        order_id: "TR001",
        business_id: 1,
        business: {
          bus_id: 1,
          name: "Sarah's Sweet Creations",
          rating: 4.8,
          total_sold: 1250,
        },
        product: {
          prod_id: 8,
          prod_name: "Red Velvet Cake",
          description: "Classic red velvet with cream cheese frosting",
          price: 649.99,
        },
        images: [{ link: CakeSample }],
        quantity: 2,
        price: 649.99,
        total_amount: 1299.98,
        status: "To Receive",
        created_at: "2024-03-19T08:00:00Z",
        receiveDate: "2024-03-21T15:00:00Z",
      },
    ];

    // Dummy data for completed orders
    const dummyCompleted = [
      {
        order_id: "CO001",
        business_id: 2,
        business: {
          bus_id: 2,
          name: "Bella's Bakeshop",
          rating: 4.9,
          total_sold: 2000,
        },
        product: {
          prod_id: 15,
          prod_name: "Chocolate Truffle Cake",
          description: "Rich chocolate cake with truffle ganache",
          price: 799.99,
        },
        images: [{ link: CakeSample }],
        quantity: 1,
        price: 799.99,
        total_amount: 799.99,
        status: "Completed",
        created_at: "2024-03-15T10:00:00Z",
        completedDate: "2024-03-17T14:30:00Z",
      },
    ];

    // Dummy data for cancelled orders
    const dummyCancelled = [
      {
        order_id: "CA001",
        business_id: 3,
        business: {
          bus_id: 3,
          name: "Peter's Pastry Paradise",
          rating: 4.7,
          total_sold: 1500,
        },
        product: {
          prod_id: 30,
          prod_name: "Pain au Chocolat",
          description: "Chocolate-filled croissant pastry",
          price: 99.99,
        },
        images: [{ link: CakeSample }],
        quantity: 6,
        price: 99.99,
        total_amount: 599.94,
        status: "Cancelled",
        created_at: "2024-03-18T09:00:00Z",
        cancellationReason: "Delivery date not suitable",
        cancelledDate: "2024-03-18T10:30:00Z",
      },
    ];

    // Dummy data for refund orders
    const dummyRefund = [
      {
        order_id: "RF001",
        business_id: 4,
        business: {
          bus_id: 4,
          name: "Marie's Macarons",
          rating: 4.6,
          total_sold: 800,
        },
        product: {
          prod_id: 45,
          prod_name: "Assorted Macarons",
          description: "Box of 12 assorted flavored macarons",
          price: 499.99,
        },
        images: [{ link: CakeSample }],
        quantity: 3,
        price: 499.99,
        total_amount: 1499.97,
        status: "Refund",
        created_at: "2024-03-16T11:00:00Z",
        refundReason: "Wrong flavor selection delivered",
        refundStatus: "Processing Refund",
        refundNotes: "Customer received different flavors than ordered",
      },
    ];

    setToReceiveOrders(dummyToReceive);
    setCompletedOrders(dummyCompleted);
    setCancelledOrders(dummyCancelled);
    setRefundOrders(dummyRefund);
  }, []);

  console.log("Current refunded orders:", refundOrders);

  // Add quantity handler
  const handleQuantityChange = (prodId, newQty) => {
    if (newQty < 1) return; // Prevent quantities less than 1

    setCartItems((prev) =>
      prev.map((order) => ({
        ...order,
        products: order.products.map((product) =>
          product.prod_id === prodId
            ? { ...product, quantity: newQty }
            : product
        ),
      }))
    );
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <Toaster richColors closeButton position="top-center" />
      <CartHeader />

      {/* Main content area */}
      <div className="flex-1 px-4 md:px-8 lg:px-12 xl:px-32 2xl:px-72 mb-24">
        {" "}
        {/* Added mb-24 for CartSummary space */}
        {checkOutConfirm && (
          <OrderConfirmation
            isOpen={checkOutConfirm}
            onClose={() => setCheckOutConfirm(false)}
            onConfirm={handleConfirmCheckout}
            orders={cartItems.filter((order) =>
              order.products.some((p) => selectedItems.includes(p.prod_id))
            )}
            selectedItems={selectedItems}
            totalAmount={totalAmount}
          />
        )}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between pt-24 md:pt-36">
            <div className="flex gap-2 items-center text-xl md:text-3xl font-semibold">
              <h1>My Orders</h1>
              <h1 className="bg-gray-300 px-3 rounded-md">{getOrderCount()}</h1>
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-primary py-2 px-10 text-white rounded-lg font-semibold"
            >
              Back
            </button>
          </div>
          <CartTabs />
          <hr className="bg-black" />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {isLoading ? (
                  <div>Loading...</div>
                ) : cartItems && cartItems.length > 0 ? (
                  cartItems.map((order) => (
                    <StoreOrderCard
                      key={order.id}
                      storeData={{
                        business: order.business,
                        products: order.products,
                        total_amount: order.total_amount,
                        status: order.status,
                        created_at: order.created_at,
                      }}
                      selectedItems={selectedItems}
                      onSelectItem={handleSelectItem}
                      onSelectAll={() => handleSelectAll(order.business_id)}
                      onUpdateQuantity={handleQuantityChange}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p>Your cart is empty</p>
                  </div>
                )}
              </div>
            }
          />
          <Route
            path="/in-process"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {processingOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">
                        {order.business?.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">★</span>
                        <span>{order.business?.rating}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-600">
                          {order.business?.total_sold} sold
                        </span>
                      </div>
                    </div>

                    {order.products.map((product) => (
                      <div key={product.prod_id} className="flex gap-4 mt-4">
                        <img
                          src={product.images}
                          alt={product.prod_name}
                          className="w-24 h-24 object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = CakeSample;
                            e.target.onerror = null;
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">
                            {product.prod_name}
                          </h3>
                          <p className="text-gray-600">{product.description}</p>
                          <div className="flex justify-between items-end mt-2">
                            <p className="text-primary text-lg font-semibold">
                              ₱{product.price.toFixed(2)}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-600">
                                Quantity: {product.qty}
                              </span>
                              <span className="text-gray-600">
                                Total: ₱
                                {(product.price * product.qty).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <div className="text-gray-600">
                        <p>Down Payment: ₱{order.downPayment.toFixed(2)}</p>
                        <p>
                          Remaining Payment: ₱
                          {order.remainingPayment.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-lg font-semibold">
                        Total Amount: ₱{order.total_amount.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        Processing
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
          <Route
            path="/to-receive"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {toReceiveOrders.map((order, index) => (
                  <div key={index}>
                    <div className="bg-white rounded-lg p-4">
                      {/* Store Name Header */}
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">
                          {order.business?.name}
                        </h2>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">★</span>
                          <span>{order.business?.rating}</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-600">
                            {order.business?.total_sold} sold
                          </span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex gap-4">
                        <img
                          src={order.images?.[0]?.link || CakeSample}
                          alt={order.product?.prod_name || "Product Image"}
                          className="w-24 h-24 object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = CakeSample;
                            e.target.onerror = null;
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">
                            {order.product?.prod_name}
                          </h3>
                          <p className="text-gray-600">
                            {order.product?.description}
                          </p>
                          <div className="flex justify-between items-end mt-2">
                            <p className="text-primary text-lg font-semibold">
                              ₱{(order.price || 0).toFixed(2)}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-600">
                                Quantity: {order.quantity || 0}
                              </span>
                              <span className="text-gray-600">
                                Total: ₱{(order.total_amount || 0).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex justify-end mt-4">
                        <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          Ready for Pickup
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />

          <Route
            path="/completed"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {completedOrders.map((order, index) => (
                  <div key={index}>
                    <div className="bg-white rounded-lg p-4">
                      {/* Store Name Header */}
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">
                          {order.business?.name}
                        </h2>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">★</span>
                          <span>{order.business?.rating}</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-600">
                            {order.business?.total_sold} sold
                          </span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex gap-4">
                        <img
                          src={order.images?.[0]?.link || CakeSample}
                          alt={order.product?.prod_name || "Product Image"}
                          className="w-24 h-24 object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = CakeSample;
                            e.target.onerror = null;
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">
                            {order.product?.prod_name}
                          </h3>
                          <p className="text-gray-600">
                            {order.product?.description}
                          </p>
                          <div className="flex justify-between items-end mt-2">
                            <p className="text-primary text-lg font-semibold">
                              ₱{(order.price || 0).toFixed(2)}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-600">
                                Quantity: {order.quantity || 0}
                              </span>
                              <span className="text-gray-600">
                                Total: ₱{(order.total_amount || 0).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Completion Date */}
                      <div className="mt-2 text-gray-500 text-sm">
                        Completed on:{" "}
                        {new Date(order.completedDate).toLocaleDateString()}
                      </div>

                      {/* Status Badge */}
                      <div className="flex justify-end mt-4">
                        <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Completed
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />

          <Route
            path="/cancelled"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {cancelledOrders.map((order, index) => (
                  <div key={index}>
                    <div className="bg-white rounded-lg p-4">
                      {/* Store Name Header */}
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">
                          {order.business?.name}
                        </h2>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">★</span>
                          <span>{order.business?.rating}</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-600">
                            {order.business?.total_sold} sold
                          </span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex gap-4">
                        <img
                          src={order.images?.[0]?.link || CakeSample}
                          alt={order.product?.prod_name || "Product Image"}
                          className="w-24 h-24 object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = CakeSample;
                            e.target.onerror = null;
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">
                            {order.product?.prod_name}
                          </h3>
                          <p className="text-gray-600">
                            {order.product?.description}
                          </p>
                          <div className="flex justify-between items-end mt-2">
                            <p className="text-primary text-lg font-semibold">
                              ₱{(order.price || 0).toFixed(2)}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-600">
                                Quantity: {order.quantity || 0}
                              </span>
                              <span className="text-gray-600">
                                Total: ₱{(order.total_amount || 0).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cancellation Details */}
                      <div className="mt-2">
                        <p className="text-red-600 text-sm">
                          Reason:{" "}
                          {order.cancellationReason || "No reason provided"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Cancelled on:{" "}
                          {new Date(order.cancelledDate).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div className="flex justify-end mt-4">
                        <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                          Cancelled
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />

          <Route
            path="/refund"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {isLoading ? (
                  <div>Loading...</div>
                ) : refundOrders && refundOrders.length > 0 ? (
                  refundOrders.map((order, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      {/* Store Name Header */}
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">
                          {order.business?.name}
                        </h2>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">★</span>
                          <span>{order.business?.rating}</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-600">
                            {order.business?.total_sold} sold
                          </span>
                        </div>
                      </div>

                      {/* Order Date */}
                      <div className="text-sm text-gray-500 mb-3">
                        Order Date:{" "}
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>

                      {/* Product Details */}
                      <div className="flex gap-4">
                        <img
                          src={order.images?.[0]?.link || CakeSample}
                          alt={order.product?.prod_name || "Product Image"}
                          className="w-24 h-24 object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = CakeSample;
                            e.target.onerror = null;
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">
                            {order.product?.prod_name}
                          </h3>
                          <p className="text-gray-600">
                            {order.product?.description}
                          </p>
                          <div className="flex justify-between items-end mt-2">
                            <p className="text-primary text-lg font-semibold">
                              ₱{(order.price || 0).toFixed(2)}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-600">
                                Quantity: {order.quantity || 0}
                              </span>
                              <span className="text-gray-600">
                                Total: ₱{(order.total_amount || 0).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Refund Information */}
                      <div className="mt-2 space-y-2 border-t pt-2">
                        <div className="flex justify-between items-center">
                          <p className="text-yellow-600 font-medium">
                            Status: {order.refundStatus}
                          </p>
                          {order.refundAmount && (
                            <p className="text-primary font-semibold">
                              Refund Amount: ₱{order.refundAmount.toFixed(2)}
                            </p>
                          )}
                        </div>

                        <div className="bg-yellow-50 p-3 rounded-md">
                          <p className="text-yellow-700 text-sm font-medium">
                            Reason: {order.refundReason}
                          </p>
                          {order.refundNotes && (
                            <p className="text-yellow-600 text-sm mt-1">
                              Notes: {order.refundNotes}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex justify-end mt-4">
                        <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          {order.refundStatus}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p>No refund requests</p>
                  </div>
                )}
              </div>
            }
          />
        </Routes>
      </div>

      {/* CartSummary at the bottom */}
      <div className="fixed bottom-0 left-0 right-0">
        <CartSummary
          totalAmount={totalAmount}
          itemCount={selectedItems.length}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default Cart;
