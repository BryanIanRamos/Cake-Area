import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { LuArrowUpDown } from "react-icons/lu";
import { Toaster, toast } from "sonner";
import { FiAlertCircle } from "react-icons/fi";

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

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // All state declarations in one place
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkOutConfirm, setCheckOutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingOrders, setProcessingOrders] = useState([]);
  const [toReceiveOrders, setToReceiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);

  // Modified useEffect to fetch both orders and business data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [ordersResponse, businessResponse] = await Promise.all([
          fetch('http://localhost:3000/orders'),
          fetch('http://localhost:3000/businesses')
        ]);
        
        const orders = await ordersResponse.json();
        const businesses = await businessResponse.json();
        
        // Filter orders for customer_id 2
        const userOrders = orders.filter(order => order.customer_id === 2);

        // Map orders with business details
        const ordersWithBusinessDetails = userOrders.map(order => {
          const business = businesses.find(b => b.id === order.business_id.toString());
          return {
            ...order,
            business: {
              name: business?.name || "Unknown Store",
              store_rating: business?.store_rating || 0,
              service_rating: business?.service_rating || 0,
              total_sold: business?.total_sold || 0,
              description: business?.description || ""
            }
          };
        });

        // Set orders based on their status
        setCartItems(ordersWithBusinessDetails.filter(order => order.status === "Pending"));
        setProcessingOrders(ordersWithBusinessDetails.filter(order => order.status === "Processing"));
        setToReceiveOrders(ordersWithBusinessDetails.filter(order => order.status === "To Receive"));
        setCompletedOrders(ordersWithBusinessDetails.filter(order => order.status === "Completed"));
        setCancelledOrders(ordersWithBusinessDetails.filter(order => order.status === "Cancelled"));
        
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load orders');
      } finally {
        setIsLoading(false);
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

  // Simplified order card rendering for In Process, To Receive, Completed, and Cancelled
  const renderSimplifiedOrderCard = (order) => {
    return (
      <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm">
        {/* Business Header - Simplified */}
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold">{order.business?.name}</h2>
            <div className="text-sm text-gray-500">
              Service Rating: {order.business?.service_rating.toFixed(1)} | {order.business?.total_sold} sold
            </div>
          </div>
        </div>

        {/* Products */}
        {order.products.map((product) => (
          <div key={product.prod_id} className="flex gap-4 mt-4">
            <img
              src={product.images}
              alt={product.prod_name}
              className="w-24 h-24 object-cover rounded-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "";
              }}
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium">{product.prod_name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <div className="flex justify-between items-end mt-2">
                <p className="text-primary text-lg font-semibold">
                  ₱{product.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">Quantity: {product.qty}</span>
                  <span className="text-gray-600">
                    Total: ₱{(product.price * product.qty).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Order Summary */}
        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <div className="text-gray-600">
            <p>Down Payment: ₱{order.downPayment.toFixed(2)}</p>
            <p>Remaining Payment: ₱{order.remainingPayment.toFixed(2)}</p>
          </div>
          <div className="text-lg font-semibold">
            Total Amount: ₱{order.total_amount.toFixed(2)}
          </div>
        </div>

        {/* Order Status */}
        <div className="flex justify-end mt-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.status === "Processing" ? "bg-yellow-100 text-yellow-800" :
            order.status === "To Receive" ? "bg-blue-100 text-blue-800" :
            order.status === "Completed" ? "bg-green-100 text-green-800" :
            "bg-red-100 text-red-800"
          }`}>
            {order.status}
          </div>
        </div>
      </div>
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
                ) : cartItems?.length > 0 ? (
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
                {isLoading ? (
                  <div>Loading...</div>
                ) : processingOrders.length > 0 ? (
                  processingOrders.map(order => renderSimplifiedOrderCard(order))
                ) : (
                  <div className="text-center py-8">No orders in process</div>
                )}
              </div>
            }
          />
          <Route
            path="/to-receive"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {isLoading ? (
                  <div>Loading...</div>
                ) : toReceiveOrders.length > 0 ? (
                  toReceiveOrders.map(order => renderSimplifiedOrderCard(order))
                ) : (
                  <div className="text-center py-8">No orders to receive</div>
                )}
              </div>
            }
          />

          <Route
            path="/completed"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {isLoading ? (
                  <div>Loading...</div>
                ) : completedOrders.length > 0 ? (
                  completedOrders.map(order => renderSimplifiedOrderCard(order))
                ) : (
                  <div className="text-center py-8">No completed orders</div>
                )}
              </div>
            }
          />

          <Route
            path="/cancelled"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {isLoading ? (
                  <div>Loading...</div>
                ) : cancelledOrders.length > 0 ? (
                  cancelledOrders.map(order => renderSimplifiedOrderCard(order))
                ) : (
                  <div className="text-center py-8">No cancelled orders</div>
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
