import React, { useState, useEffect } from "react";
import BakerLayout from "../../components/baker/BakerLayout";
import Toast from "../../components/baker/Toast";
import ProductModal from "../../components/baker/ProductModal";
import AcceptOrderModal from "../../components/baker/AcceptOrderModal";
import MarkAsDoneModal from "../../components/baker/MarkAsDoneModal";
import MarkAsDeliveredModal from "../../components/baker/MarkAsDeliveredModal";
import CancelOrderModal from "../../components/baker/CancelOrderModal";
import MarkAsCompletedModal from "../../components/baker/MarkAsCompletedModal";
import { Icon } from "@iconify/react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [selectedOrderForAccept, setSelectedOrderForAccept] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [isMarkAsDoneModalOpen, setIsMarkAsDoneModalOpen] = useState(false);
  const [isMarkAsDeliveredModalOpen, setIsMarkAsDeliveredModalOpen] =
    useState(false);
  const [selectedOrderForDone, setSelectedOrderForDone] = useState(null);
  const [selectedOrderForDelivered, setSelectedOrderForDelivered] =
    useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedOrderForCancel, setSelectedOrderForCancel] = useState(null);
  const [isMarkAsCompletedModalOpen, setIsMarkAsCompletedModalOpen] =
    useState(false);
  const [selectedOrderForCompleted, setSelectedOrderForCompleted] =
    useState(null);

  useEffect(() => {
    const businessId = localStorage.getItem("business_id");
    let isSubscribed = true; // Flag to prevent updates if component unmounts

    const fetchOrders = async () => {
      if (!businessId) return; // Don't fetch if no businessId

      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/orders");
        const data = await response.json();

        // Only update state if component is still mounted
        if (isSubscribed) {
          const businessOrders = data.filter(
            (order) => order.business_id.toString() === businessId
          );

          console.log("Business ID:", businessId);
          console.log("Filtered Orders:", businessOrders);

          setOrders(businessOrders);
          setLoading(false);
        }
      } catch (error) {
        if (isSubscribed) {
          console.error("Error fetching orders:", error);
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchOrders();
    // Use a longer interval (e.g., 30 seconds) to prevent too frequent updates
    const interval = setInterval(fetchOrders, 30000);

    // Cleanup function
    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, []);

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order) => {
    switch (activeTab) {
      case "pending":
        return order.status === "Pending";
      case "processing":
        return order.status === "Processing";
      case "to receive":
        return order.status === "To Receive";
      case "completed":
        return order.status === "Completed";
      case "cancelled":
        return order.status === "Cancelled";
      default:
        return true;
    }
  });

  // Save activeTab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeOrderTab", activeTab);
  }, [activeTab]);

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleAccept = (order) => {
    setSelectedOrderForAccept(order);
    setIsAcceptModalOpen(true);
  };

  const handleAcceptConfirm = async (orderId) => {
    try {
      const orderToUpdate = orders.find((order) => order.order_id === orderId);

      if (orderToUpdate) {
        const updatedOrder = {
          ...orderToUpdate,
          status: "Processing",
          updated_at: new Date().toISOString(),
        };

        const response = await fetch(
          `http://localhost:3000/orders/${orderToUpdate.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedOrder),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to accept order");
        }

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderToUpdate.id ? updatedOrder : order
          )
        );

        setIsAcceptModalOpen(false);
        setToast({
          show: true,
          message: `Order ${orderId} has been accepted successfully!`,
          type: "success",
        });

        setActiveTab("processing");
      }
    } catch (error) {
      console.error("Error accepting order:", error);
      setToast({
        show: true,
        message: "Failed to accept order. Please try again.",
        type: "error",
      });
    }
  };

  const handleMarkAsDone = (order) => {
    setSelectedOrderForDone(order);
    setIsMarkAsDoneModalOpen(true);
  };

  const handleMarkAsDoneConfirm = async (orderId) => {
    try {
      // Find the order to update
      const orderToUpdate = orders.find((order) => order.order_id === orderId);

      if (orderToUpdate) {
        // Prepare updated order data
        const updatedOrder = {
          ...orderToUpdate,
          status: "To Receive",
          updated_at: new Date().toISOString(),
        };

        // Send PUT request to update the order
        const response = await fetch(
          `http://localhost:3000/orders/${orderToUpdate.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedOrder),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update order status");
        }

        // Update local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderToUpdate.id ? updatedOrder : order
          )
        );

        // Close modal and show success message
        setIsMarkAsDoneModalOpen(false);
        setToast({
          show: true,
          message: `Order ${orderId} has been marked as done!`,
          type: "success",
        });

        // Switch to "to receive" tab
        setActiveTab("to receive");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      setToast({
        show: true,
        message: "Failed to update order status. Please try again.",
        type: "error",
      });
    }
  };

  const handleMarkAsDelivered = (order) => {
    setSelectedOrderForCompleted(order);
    setIsMarkAsCompletedModalOpen(true);
  };

  const handleMarkAsCompletedConfirm = async (orderId) => {
    try {
      const orderToUpdate = orders.find((order) => order.order_id === orderId);

      if (orderToUpdate) {
        const updatedOrder = {
          ...orderToUpdate,
          status: "Completed",
          updated_at: new Date().toISOString(),
        };

        const response = await fetch(
          `http://localhost:3000/orders/${orderToUpdate.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedOrder),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update order status");
        }

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderToUpdate.id ? updatedOrder : order
          )
        );

        setIsMarkAsCompletedModalOpen(false);
        setToast({
          show: true,
          message: `Order ${orderId} has been marked as completed!`,
          type: "success",
        });

        setActiveTab("completed");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      setToast({
        show: true,
        message: "Failed to update order status. Please try again.",
        type: "error",
      });
    }
  };

  const handleReview = (orderId) => {
    // Implement review logic here
    console.log(`Review order ${orderId}`);
  };

  const handleCancel = (order) => {
    setSelectedOrderForCancel(order);
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = async (orderId, cancelReason) => {
    try {
      // Find the order to update
      const orderToUpdate = orders.find((order) => order.order_id === orderId);

      if (orderToUpdate) {
        // Prepare updated order data
        const updatedOrder = {
          ...orderToUpdate,
          status: "Cancelled",
          cancelReason: cancelReason, // Add the cancellation reason
          updated_at: new Date().toISOString(),
        };

        // Send PUT request to update the order
        const response = await fetch(
          `http://localhost:3000/orders/${orderToUpdate.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedOrder),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to cancel order");
        }

        // Update local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderToUpdate.id ? updatedOrder : order
          )
        );

        // Close modal and show success message
        setIsCancelModalOpen(false);
        setToast({
          show: true,
          message: `Order ${orderId} has been cancelled.`,
          type: "success",
        });

        // Switch to "cancelled" tab
        setActiveTab("cancelled");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      setToast({
        show: true,
        message: "Failed to cancel order. Please try again.",
        type: "error",
      });
    }
  };

  const OrderCard = ({ order }) => {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-3">
        {/* Header - Date and Status */}
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600">
            Checkout: {new Date(order.checkoutDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            Receive By: {new Date(order.receiveDate).toLocaleDateString()}
          </p>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              order.status === "Completed"
                ? "bg-green-100 text-green-800"
                : order.status === "Processing"
                ? "bg-blue-100 text-blue-800"
                : order.status === "To Receive"
                ? "bg-yellow-100 text-yellow-800"
                : order.status === "Cancelled"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {order.status}
          </span>
        </div>

        {/* Products List */}
        {order.products?.map((product, index) => (
          <div
            key={index}
            className="flex items-start gap-3 py-3 border-t border-gray-100"
          >
            <img
              src={product.images}
              alt={product.prod_name}
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800">{product.prod_name}</h4>
              <p className="text-sm text-gray-600 line-clamp-1">
                {product.description}
              </p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600">
                  Qty: {product.qty}
                </span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm font-medium text-[#E88F2A]">
                  ₱{product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Footer - Total and Actions */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div className="text-lg font-semibold">
            ₱{order.total_amount.toFixed(2)}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleView(order)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              View Details
            </button>

            {order.status === "Pending" && (
              <>
                <button
                  onClick={() => handleAccept(order)}
                  className="px-3 py-1 text-sm bg-[#E88F2A] text-white rounded hover:bg-[#E88F2A]/90"
                >
                  Accept Order
                </button>
                <button
                  onClick={() => handleCancel(order)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </>
            )}

            {order.status === "To Receive" && (
              <>
                <button
                  onClick={() => handleMarkAsDelivered(order)}
                  className="px-3 py-1 text-sm bg-[#E88F2A] text-white rounded hover:bg-[#E88F2A]/90"
                >
                  Mark as Completed
                </button>
                <button
                  onClick={() => handleCancel(order)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </>
            )}

            {order.status === "Processing" && (
              <button
                onClick={() => handleMarkAsDone(order)}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                Mark as Done
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Update the tab click handler to include refresh
  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setOrders(ordersData); // Refresh the orders data
    }
  };

  return (
    <BakerLayout>
      <div className="p-8">
        {/* Welcome Section with Filter Button */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Manage Your Orders
          </h1>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Keep track of all your bakery orders and their status in one
              place.
            </p>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              onClick={() => {
                /* Add filter logic here */
              }}
            >
              <Icon icon="uil:filter" className="text-gray-600" />
              <span className="text-gray-600">Filter</span>
            </button>
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Rest of the content */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Tabs */}
          <div className="mb-4 border-b border-gray-200">
            <nav className="flex space-x-4">
              {[
                "pending",
                "processing",
                "to receive",
                "completed",
                "cancelled",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-3 py-2 text-sm font-medium capitalize ${
                    activeTab === tab
                      ? "border-b-2 border-[#E88F2A] text-[#E88F2A]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full px-4 py-2 border rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Orders List */}
          <div className="space-y-2">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : filteredOrders.length === 0 ? (
              <p>No orders yet</p>
            ) : (
              filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
          </div>
        </div>

        {/* Keep existing modals */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={selectedOrder}
        />

        {/* Add or update the MarkAsDoneModal */}
        <MarkAsDoneModal
          isOpen={isMarkAsDoneModalOpen}
          onClose={() => setIsMarkAsDoneModalOpen(false)}
          onConfirm={handleMarkAsDoneConfirm}
          order={selectedOrderForDone}
        />

        {/* Add or update the CancelOrderModal */}
        <CancelOrderModal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={handleCancelConfirm}
          order={selectedOrderForCancel}
        />

        {/* Add or update the MarkAsCompletedModal */}
        <MarkAsCompletedModal
          isOpen={isMarkAsCompletedModalOpen}
          onClose={() => setIsMarkAsCompletedModalOpen(false)}
          onConfirm={handleMarkAsCompletedConfirm}
          order={selectedOrderForCompleted}
        />

        <AcceptOrderModal
          isOpen={isAcceptModalOpen}
          onClose={() => setIsAcceptModalOpen(false)}
          onConfirm={handleAcceptConfirm}
          order={selectedOrderForAccept}
        />

        {/* ... other modals ... */}
      </div>
    </BakerLayout>
  );
};

export default Orders;
