import React, { useState, useEffect } from "react";
import Sidebar from "../../components/baker/Sidebar";
import { ordersData, updateOrder } from "../../data/orderDataTbl";
import ProductModal from "../../components/baker/ProductModal";
import AcceptOrderModal from "../../components/baker/AcceptOrderModal";
import Toast from "../../components/baker/Toast";

const Orders = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeOrderTab") || "pending"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [selectedOrderForAccept, setSelectedOrderForAccept] = useState(null);
  const [orders, setOrders] = useState(ordersData);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Filter orders based on active tab and search query
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = searchQuery 
      ? order.products.some(product =>
          product.prod_name.toLowerCase().includes(searchQuery.toLowerCase())
        ) || order.order_id.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Strict status matching based on tab
    const statusMatch = (() => {
      switch(activeTab) {
        case 'pending':
          return order.status === 'Pending';
        case 'processing':
          return order.status === 'Processing';
        case 'to receive':
          return order.status === 'To Receive';
        case 'completed':
          return order.status === 'Completed';
        case 'cancelled':
          return order.status === 'Cancelled';
        case 'refunded':
          return order.status === 'Refunded';
        default:
          return false;
      }
    })();

    return matchesSearch && statusMatch;
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
    const orderToUpdate = orders.find(order => order.order_id === orderId);
    if (orderToUpdate) {
      const updatedOrder = {
        ...orderToUpdate,
        status: "Processing",
        updated_at: new Date().toISOString()
      };
      
      // Update in localStorage
      updateOrder(updatedOrder);
      
      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.order_id === orderId ? updatedOrder : order
        )
      );
      
      // Close the modal
      setIsAcceptModalOpen(false);
      
      // Show toast notification
      setToastMessage("Order successfully accepted and moved to Processing!");
      setShowToast(true);
      
      // Switch to Processing tab
      setActiveTab("processing");
    }
  };

  const handleMarkAsDone = (orderId) => {
    // Implement mark as done logic here
    console.log(`Mark order ${orderId} as done`);
  };

  const handleReview = (orderId) => {
    // Implement review logic here
    console.log(`Review order ${orderId}`);
  };

  // Action buttons should only show based on exact status match
  const renderActionButtons = (order) => {
    const status = order.status;
    return (
      <div className="flex gap-2">
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={() => handleView(order)}
        >
          View
        </button>
        {status === "Pending" && (
          <button
            className="text-green-600 hover:text-green-800"
            onClick={() => handleAccept(order)}
          >
            Accept
          </button>
        )}
        {status === "Processing" && (
          <button
            className="text-yellow-600 hover:text-yellow-800"
            onClick={() => handleMarkAsDone(order.order_id)}
          >
            Mark as Done
          </button>
        )}
        {status === "Completed" && (
          <button
            className="text-purple-600 hover:text-purple-800"
            onClick={() => handleReview(order.order_id)}
          >
            Review
          </button>
        )}
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Order Management</h1>
            <div className="flex gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <select
                className="border rounded-lg px-4 py-2"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="to receive">To Receive</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Order Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b px-4">
              <div className="flex gap-4">
                {["pending", "processing", "to receive", "completed", "cancelled", "refunded"].map(
                  (tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-3 font-medium border-b-2 -mb-px ${
                        activeTab === tab
                          ? "border-[#E88F2A] text-[#E88F2A]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4">Order ID</th>
                    <th className="text-left p-4">Customer</th>
                    <th className="text-left p-4">Products</th>
                    <th className="text-left p-4">Total</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.order_id} className="border-t hover:bg-gray-50">
                      <td className="p-4">{order.order_id}</td>
                      <td className="p-4">{order.customer_name}</td>
                      <td className="p-4">
                        {order.products.map((product, index) => (
                          <div key={index} className="flex items-center gap-2 mb-2">
                            <img
                              src={order.images[0].link}
                              alt={product.prod_name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{product.prod_name}</p>
                              <p className="text-sm text-gray-500">
                                Qty: {product.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </td>
                      <td className="p-4">₱{order.total_amount.toFixed(2)}</td>
                      <td className="p-4">{order.status}</td>
                      <td className="p-4">
                        {renderActionButtons(order)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4 border-t">
              <div className="text-sm text-gray-500">
                Showing 1 to 10 of {filteredOrders.length} entries
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded bg-[#E88F2A] text-white">
                  1
                </button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />

      <AcceptOrderModal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        order={selectedOrderForAccept}
        onAccept={handleAcceptConfirm}
      />

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
      />
    </div>
  );
};

export default Orders; 