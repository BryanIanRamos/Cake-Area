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
  const [businesses, setBusinesses] = useState([]);
  const [lastVisitedStore, setLastVisitedStore] = useState(
    localStorage.getItem('lastVisitedStore') || null
  );

  // Modified useEffect to fetch both orders and business data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [ordersResponse, businessResponse, productsResponse] =
          await Promise.all([
            fetch("http://localhost:3000/orders"),
            fetch("http://localhost:3000/businesses"),
            fetch("http://localhost:3000/products"),
          ]);

        const orders = await ordersResponse.json();
        const businesses = await businessResponse.json();
        const products = await productsResponse.json();

        // Store businesses in state
        setBusinesses(businesses);

        // Filter orders for customer_id 2
        const userOrders = orders.filter((order) => order.customer_id === 2);

        // Map orders with business details and correct product images
        const ordersWithDetails = userOrders.map((order) => ({
          ...order,
          business: businesses.find(
            (b) => b.id === order.business_id.toString()
          ),
          products: order.products.map((orderProduct) => {
            // Find the matching product from products array
            const fullProduct = products.find(
              (p) => p.id === orderProduct.prod_id
            );
            return {
              ...orderProduct,
            };
          }),
        }));

        // Set cart items (Pending orders)
        setCartItems(
          ordersWithDetails.filter((order) => order.status === "Pending")
        );
        setProcessingOrders(
          ordersWithDetails.filter((order) => order.status === "Processing")
        );
        setToReceiveOrders(
          ordersWithDetails.filter((order) => order.status === "To Receive")
        );
        setCompletedOrders(
          ordersWithDetails.filter((order) => order.status === "Completed")
        );
        setCancelledOrders(
          ordersWithDetails.filter((order) => order.status === "Cancelled")
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load orders");
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

  // Update useEffect to consider both location state and cart items
  useEffect(() => {
    // If we have a business ID from location state, use that
    if (lastVisitedStore) {
      setLastVisitedStore(lastVisitedStore);
    }
    // Otherwise, try to get it from cart items
    else if (cartItems.length > 0) {
      setLastVisitedStore(cartItems[0].business_id);
    }
  }, [lastVisitedStore, cartItems]);

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

  // Update handleConfirmCheckout to include address
  const handleConfirmCheckout = async (receiveDate, placedAddress) => {
    try {
      const selectedOrders = cartItems.filter((order) =>
        order.products.some((product) =>
          selectedItems.includes(`${order.order_id}_${product.prod_id}`)
        )
      );

      for (const order of selectedOrders) {
        // Create clean order object with receiveDate and address
        const updatedOrder = {
          id: order.id,
          order_id: order.order_id,
          customer_id: order.customer_id,
          business_id: order.business_id,
          products: order.products,
          total_amount: order.total_amount,
          status: "Processing",
          created_at: order.created_at,
          checkoutDate: new Date().toISOString(),
          receiveDate: receiveDate.toISOString(),
          downPayment: order.total_amount * 0.5,
          remainingPayment: order.total_amount * 0.5,
          paymentStatus: "paid",
          placedAddress: placedAddress,
        };

        console.log("Updating order with data:", updatedOrder);

        // Update order in the database
        const response = await fetch(
          `http://localhost:3000/orders/${order.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedOrder),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to update order ${order.id}`);
        }

        // Update local state with clean order object
        setProcessingOrders((prev) => [...prev, updatedOrder]);
      }

      // Remove processed orders from cart
      setCartItems((prev) =>
        prev.filter(
          (order) =>
            !selectedOrders.some((processed) => processed.id === order.id)
        )
      );

      // Reset selections and close modal
      setSelectedItems([]);
      setCheckOutConfirm(false);

      // Show success message and navigate
      toast.success(
        "Down payment received! Order has been placed successfully!"
      );
      navigate("/cart/in-process");
    } catch (error) {
      console.error("Error processing checkout:", error);
      toast.error("Failed to process payment. Please try again.");
    }
  };

  // Update handleSelectAll for business groups
  const handleSelectAll = (businessId, orderId) => {
    console.log("Select all for business:", businessId, "order:", orderId); // Debug log

    const businessOrders = cartItems.filter(
      (order) => order.business_id === businessId && order.order_id === orderId
    );

    const allOrderProductIds = businessOrders.flatMap((order) =>
      order.products.map((product) => `${order.order_id}_${product.prod_id}`)
    );

    console.log("All product IDs for business:", allOrderProductIds); // Debug log

    const allSelected = allOrderProductIds.every((id) =>
      selectedItems.includes(id)
    );

    setSelectedItems((prev) => {
      if (allSelected) {
        // Unselect all items from this order
        return prev.filter((id) => !allOrderProductIds.includes(id));
      } else {
        // Select all items from this order
        const newSelections = [...new Set([...prev, ...allOrderProductIds])];
        console.log("New selections:", newSelections); // Debug log
        return newSelections;
      }
    });
  };

  // Update handleSelectItem
  const handleSelectItem = (orderId, prodId) => {
    console.log("Selecting item:", orderId, prodId); // Debug log
    const selectionId = `${orderId}_${prodId}`;

    setSelectedItems((prev) => {
      if (prev.includes(selectionId)) {
        console.log("Removing item:", selectionId); // Debug log
        return prev.filter((id) => id !== selectionId);
      } else {
        console.log("Adding item:", selectionId); // Debug log
        return [...prev, selectionId];
      }
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
        .filter((product) =>
          selectedItems.includes(`${order.order_id}_${product.prod_id}`)
        )
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
    // "/cart": "Pending",              // Items in cart, not yet checked out
    // "/cart/in-process": "Processing", // Orders being prepared by the baker
    // "/cart/to-receive": "To Receive", // Orders ready for delivery/pickup
    // "/cart/completed": "Completed",   // Successfully delivered/received orders
    // "/cart/cancelled": "Cancelled"    // Cancelled orders
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
    // Find the business details from the businesses array
    const business = businesses.find(
      (b) => b.id === order.business_id.toString()
    );

    return (
      <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm">
        {/* Business Header */}
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold">
              {business?.name || "Business Name Not Found"}
            </h2>
            <div className="text-sm text-gray-500">
              Service Rating: {business?.service_rating?.toFixed(1) || "N/A"} |{" "}
              {business?.total_sold || 0} sold
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
            <p>Down Payments: ₱{order.downPayment.toFixed(2)}</p>
            <p>Remaining Payment: ₱{order.remainingPayment.toFixed(2)}</p>
          </div>
          <div className="text-lg font-semibold">
            Total Amount: ₱{order.total_amount.toFixed(2)}
          </div>
        </div>

        {/* Order Status */}
        <div className="flex justify-end mt-4">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "Processing"
                ? "bg-yellow-100 text-yellow-800"
                : order.status === "To Receive"
                ? "bg-blue-100 text-blue-800"
                : order.status === "Completed"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {order.status}
          </div>
        </div>
      </div>
    );
  };

  // Update the back button click handler
  const handleBackClick = () => {
    const storedBusinessId = localStorage.getItem('lastVisitedStore');
    
    if (storedBusinessId) {
      // Get the business details to find the user_id
      fetch(`http://localhost:3000/businesses/${storedBusinessId}`)
        .then(response => response.json())
        .then(business => {
          // Navigate to store with the user_id
          navigate(`/store/${business.user_id}`);
        })
        .catch(error => {
          console.error('Error fetching business details:', error);
          navigate('/'); // Fallback to home page if there's an error
        });
    } else {
      // Fallback to home page if no store ID is found
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <Toaster richColors closeButton position="top-center" />
      <CartHeader />

      {/* Main content area - matched padding with parent container */}
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
              onClick={handleBackClick}
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
                      key={order.order_id}
                      storeData={{
                        order_id: order.order_id,
                        business: order.business,
                        products: order.products,
                        total_amount: order.total_amount,
                        status: order.status,
                        created_at: order.created_at,
                      }}
                      selectedItems={selectedItems}
                      onSelectItem={handleSelectItem}
                      onSelectAll={handleSelectAll}
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
                  processingOrders.map((order) =>
                    renderSimplifiedOrderCard(order)
                  )
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
                  toReceiveOrders.map((order) =>
                    renderSimplifiedOrderCard(order)
                  )
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
                  completedOrders.map((order) =>
                    renderSimplifiedOrderCard(order)
                  )
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
                  cancelledOrders.map((order) =>
                    renderSimplifiedOrderCard(order)
                  )
                ) : (
                  <div className="text-center py-8">No cancelled orders</div>
                )}
              </div>
            }
          />
        </Routes>
      </div>

      {/* CartSummary container - matched padding with parent */}
      <div className="fixed bottom-0 left-0 right-0 shadow-lg ">
        <div className="px-4 md:px-8 lg:px-12 xl:px-32 2xl:px-72">
          <CartSummary
            totalAmount={totalAmount}
            itemCount={selectedItems.length}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
