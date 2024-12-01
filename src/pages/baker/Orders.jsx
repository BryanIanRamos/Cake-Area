import React, { useState, useEffect } from "react";
import BakerLayout from "../../components/baker/BakerLayout";
import Toast from "../../components/baker/Toast";
import ProductModal from "../../components/baker/ProductModal";
import AcceptOrderModal from "../../components/baker/AcceptOrderModal";
import MarkAsDoneModal from "../../components/baker/MarkAsDoneModal";
import MarkAsDeliveredModal from "../../components/baker/MarkAsDeliveredModal";
import CancelOrderModal from "../../components/baker/CancelOrderModal";
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

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError(error);
        setLoading(false);
      });
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

  const handleAcceptConfirm = (orderId) => {
    const orderToUpdate = orders.find((order) => order.order_id === orderId);
    if (orderToUpdate) {
      const updatedOrder = {
        ...orderToUpdate,
        status: "Processing",
        updated_at: new Date().toISOString(),
      };

      // Update in localStorage
      updateOrder(updatedOrder);

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? updatedOrder : order
        )
      );

      // Close the modal
      setIsAcceptModalOpen(false);

      // Show toast notification using the toast object
      setToast({
        show: true,
        message: `Order ${orderId} has been accepted successfully!`,
        type: "success",
      });

      // Switch to Processing tab
      setActiveTab("processing");
    }
  };

  const handleMarkAsDone = (order) => {
    setSelectedOrderForDone(order);
    setIsMarkAsDoneModalOpen(true);
  };

  const handleMarkAsDoneConfirm = (orderId) => {
    const orderToUpdate = orders.find((order) => order.order_id === orderId);
    if (orderToUpdate) {
      const updatedOrder = {
        ...orderToUpdate,
        status: "To Receive",
        updated_at: new Date().toISOString(),
      };

      // Update in localStorage
      updateOrder(updatedOrder);

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? updatedOrder : order
        )
      );

      setIsMarkAsDoneModalOpen(false);
      setToast({
        show: true,
        message: `Order ${orderId} has been marked as done!`,
        type: "success",
      });

      setActiveTab("to receive");
    }
  };

  const handleMarkAsDelivered = (order) => {
    setSelectedOrderForDelivered(order);
    setIsMarkAsDeliveredModalOpen(true);
  };

  const handleMarkAsDeliveredConfirm = (orderId) => {
    const orderToUpdate = orders.find((order) => order.order_id === orderId);
    if (orderToUpdate) {
      const updatedOrder = {
        ...orderToUpdate,
        status: "Completed",
        updated_at: new Date().toISOString(),
      };

      // Update in localStorage
      updateOrder(updatedOrder);

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? updatedOrder : order
        )
      );

      setIsMarkAsDeliveredModalOpen(false);
      setToast({
        show: true,
        message: `Order ${orderId} has been marked as delivered!`,
        type: "success",
      });

      setActiveTab("completed");
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

  const handleCancelConfirm = (orderId, reason) => {
    const orderToUpdate = orders.find((order) => order.order_id === orderId);
    if (orderToUpdate) {
      const updatedOrder = {
        ...orderToUpdate,
        status: "Cancelled",
        cancel_reason: reason,
        updated_at: new Date().toISOString(),
      };

      // Update in localStorage
      updateOrder(updatedOrder);

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? updatedOrder : order
        )
      );

      setIsCancelModalOpen(false);
      setToast({
        show: true,
        message: `Order ${orderId} has been cancelled.`,
        type: "error",
      });

      setActiveTab("cancelled");
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

            {order.status === "Processing" && (
              <button
                onClick={() => handleMarkAsDone(order)}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                Mark as Done
              </button>
            )}

            {(order.status === "Pending" || order.status === "Processing") && (
              <button
                onClick={() => handleCancel(order)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
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
              <p>No orders found.</p>
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

        {/* ... other modals ... */}
      </div>
    </BakerLayout>
  );
};

export default Orders;
