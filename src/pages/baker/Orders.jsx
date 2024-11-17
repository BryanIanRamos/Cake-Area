import React, { useState } from "react";
import Sidebar from "../../components/baker/Sidebar";
import { orders, orderStats } from "../../data/orders.json";

const Orders = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter orders based on active tab and search query
  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "all" || order.status === activeTab;
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

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
                <option value="preparing">Preparing</option>
                <option value="ready">Ready for Pickup</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Order Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm">Pending Orders</h3>
              <p className="text-2xl font-bold">{orderStats.pending}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm">Preparing</h3>
              <p className="text-2xl font-bold">{orderStats.preparing}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm">Ready for Pickup</h3>
              <p className="text-2xl font-bold">{orderStats.ready}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm">Completed Today</h3>
              <p className="text-2xl font-bold">{orderStats.completed}</p>
            </div>
          </div>

          {/* Order Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b px-4">
              <div className="flex gap-4">
                {["pending", "preparing", "ready", "completed", "cancelled"].map(
                  (tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-3 font-medium border-b-2 -mb-px ${
                        activeTab === tab
                          ? "border-[#E88F2A] text-[#E88F2A]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab(tab)}
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
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">Total</th>
                    <th className="text-left p-4">Delivery Date</th>
                    <th className="text-left p-4">Payment</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="p-4">{order.id}</td>
                      <td className="p-4">{order.customerName}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={order.image}
                            alt={order.product}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{order.product}</p>
                            <p className="text-sm text-gray-500">
                              Qty: {order.quantity}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{order.total}</td>
                      <td className="p-4">{order.deliveryDate}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : order.paymentStatus === "refunded"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            View
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4 border-t">
              <div className="text-sm text-gray-500">
                Showing 1 to 10 of 50 entries
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
    </div>
  );
};

export default Orders; 