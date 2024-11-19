import React, { useState } from "react";
import Sidebar from "../../components/baker/Sidebar";
import { ordersTaken } from "../../data/ordersTaken.json";
import { pendingOrders } from "../../data/pendingOrders.json";
import { Icon } from "@iconify/react";
import OrdersTakenSection from "../../components/baker/dashboard/OrdersTakenSection";
import PendingOrdersTable from "../../components/baker/dashboard/PendingOrdersTable";

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
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <main
        className={`transition-all duration-300 flex-1 overflow-y-auto p-8
          ${isSidebarExpanded ? "ml-64" : "ml-20"}`}
      >
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back, Bryan Ramos! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your bakery today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Balance Card */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold opacity-90">
                Current Balance
              </h3>
              <Icon icon="ph:wallet-bold" className="text-2xl opacity-80" />
            </div>
            <p className="text-3xl font-bold">₱ 12,435.50</p>
            <p className="text-sm opacity-80 mt-2">Available for withdrawal</p>
          </div>

          {/* Weekly Sales Card */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold opacity-90">
                Sales this Week
              </h3>
              <Icon
                icon="ph:chart-line-up-bold"
                className="text-2xl opacity-80"
              />
            </div>
            <p className="text-3xl font-bold">₱ 8,251.21</p>
            <p className="text-sm opacity-80 mt-2">+12% from last week</p>
          </div>

          {/* Orders Card */}
          <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold opacity-90">
                Active Orders
              </h3>
              <Icon icon="ph:package-bold" className="text-2xl opacity-80" />
            </div>
            <p className="text-3xl font-bold">{pendingOrders.length}</p>
            <p className="text-sm opacity-80 mt-2">Orders pending delivery</p>
          </div>
        </div>

        {/* Rest of your components */}
        <OrdersTakenSection orders={ordersTaken} />
        <PendingOrdersTable
          orders={paginatedOrders}
          tableLimit={tableLimit}
          setTableLimit={setTableLimit}
          setCurrentPage={setCurrentPage}
          startIndex={startIndex}
          currentPage={currentPage}
          totalPages={totalPages}
          totalOrders={pendingOrders.length}
        />
      </main>
    </div>
  );
};

export default Dashboard;
