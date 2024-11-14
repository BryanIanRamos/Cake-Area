import React, { useState } from "react";
import Sidebar from "../../components/baker/Sidebar";
import { ordersTaken } from "../../data/ordersTaken.json";
import { pendingOrders } from "../../data/pendingOrders.json";
import WelcomeSection from "../../components/baker/dashboard/WelcomeSection";
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
    <div className="flex h-screen bg-[#F5F5F5]">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <main
        className={`transition-all duration-300 flex-1 overflow-y-auto p-6
          ${isSidebarExpanded ? "ml-64" : "ml-20"}`}
      >
        <WelcomeSection name="Bryan Ramos" salesAmount="8,251.21" />
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
