import React, { useState } from "react";
import Sidebar from "../../components/baker/Sidebar";
import { ordersTaken } from "../../data/ordersTaken.json";
import { pendingOrders } from "../../data/pendingOrders.json";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [tableLimit, setTableLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(pendingOrders.length / tableLimit);
  const startIndex = (currentPage - 1) * tableLimit;
  const paginatedOrders = pendingOrders.slice(
    startIndex,
    startIndex + tableLimit
  );

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
        {/* Welcome Section */}
        <div className="mb-6">
          <p className="text-gray-600">Welcome Back</p>
          <h1 className="text-2xl font-bold">Bryan Ramos</h1>
        </div>

        {/* Sales Card */}
        <div className="bg-[#E88F2A] rounded-lg p-6 mb-8 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Here's Happening in your
              </h2>
              <p>sales this week</p>
              <p className="text-2xl font-bold mt-2">₱ 8,251.21</p>
            </div>
            <Link to="/dashboard/orders">
              <button className="bg-white text-[#E88F2A] px-4 py-2 rounded-lg hover:bg-gray-100 whitespace-nowrap">
                Manage Orders
              </button>
            </Link>
          </div>
        </div>

        {/* Orders Taken Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Orders Taken</h2>
          <div className="w-full overflow-x-auto">
            <div className="inline-flex gap-4 pb-4">
              {ordersTaken.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-400 min-w-[250px]"
                >
                  <div className="space-y-2">
                    <p className="font-bold">Order ID: {order.id}</p>
                    <p className="font-semibold">Receive at:</p>
                    <p>{order.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Orders Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Pending Orders</h2>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Show entries:</label>
              <select
                value={tableLimit}
                onChange={(e) => {
                  setTableLimit(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when limit changes
                }}
                className="border rounded-md px-2 py-1 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-[#3F3F3F] text-white">
                  <th className="text-left p-4">Cake Name</th>
                  <th className="text-left p-4">Location</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Quantity</th>
                  <th className="text-left p-4">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">{order.name}</td>
                    <td className="p-4">{order.location}</td>
                    <td className="p-4">{order.price}</td>
                    <td className="p-4">{order.quantity}</td>
                    <td className="p-4">{order.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <div className="text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + tableLimit, pendingOrders.length)} of{" "}
              {pendingOrders.length} entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border`}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
