import React, { useState, useEffect } from "react";
import BakerLayout from "../../components/baker/BakerLayout";
import { orders } from "../../data/db.json";
import { pendingOrders } from "../../data/pendingOrders.json";
import { Icon } from "@iconify/react";
import OrdersTakenSection from "../../components/baker/dashboard/OrdersTakenSection";
import PendingOrdersTable from "../../components/baker/dashboard/PendingOrdersTable";

const Dashboard = () => {
  const [tableLimit, setTableLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [userFullName, setUserFullName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/profiles?user_id=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user profile');
        const profiles = await response.json();
        
        if (profiles.length > 0) {
          const { first_name, last_name } = profiles[0];
          setUserFullName(`${first_name} ${last_name}`);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUserFullName('User'); // Fallback name
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(pendingOrders.length / tableLimit);
  const startIndex = (currentPage - 1) * tableLimit;
  const paginatedOrders = pendingOrders.slice(
    startIndex,
    startIndex + tableLimit
  );

  // Calculate priority level for sorting
  const getPriorityLevel = (receiveDate) => {
    const today = new Date();
    const receiveDay = new Date(receiveDate);
    const daysUntil = Math.ceil((receiveDay - today) / (1000 * 60 * 60 * 24));

    if (daysUntil <= 2) return 1; // Urgent (red)
    if (daysUntil <= 5) return 2; // Medium (green)
    return 3; // Normal (blue)
  };

  // Create dates for different priority levels
  const today = new Date();

  // Create different dates
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const twoDaysLater = new Date(today);
  twoDaysLater.setDate(today.getDate() + 2);

  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  const fourDaysLater = new Date(today);
  fourDaysLater.setDate(today.getDate() + 4);

  const fiveDaysLater = new Date(today);
  fiveDaysLater.setDate(today.getDate() + 5);

  const sixDaysLater = new Date(today);
  sixDaysLater.setDate(today.getDate() + 6);

  const weekLater = new Date(today);
  weekLater.setDate(today.getDate() + 7);

  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + 14);

  // Sample orders with different priorities
  const sampleOrders = [
    {
      order_id: "ORD001",
      status: "Processing",
      receiveDate: tomorrow.toISOString(), // Urgent (red)
    },
    {
      order_id: "ORD002",
      status: "Processing",
      receiveDate: twoDaysLater.toISOString(), // Urgent (red)
    },
    {
      order_id: "ORD003",
      status: "Processing",
      receiveDate: threeDaysLater.toISOString(), // Medium (green)
    },
    {
      order_id: "ORD004",
      status: "To Receive",
      receiveDate: fourDaysLater.toISOString(), // Medium (green)
    },
    {
      order_id: "ORD005",
      status: "Processing",
      receiveDate: fiveDaysLater.toISOString(), // Medium (green)
    },
    {
      order_id: "ORD006",
      status: "To Receive",
      receiveDate: sixDaysLater.toISOString(), // Normal (blue)
    },
    {
      order_id: "ORD007",
      status: "Processing",
      receiveDate: weekLater.toISOString(), // Normal (blue)
    },
    {
      order_id: "ORD008",
      status: "To Receive",
      receiveDate: twoWeeksLater.toISOString(), // Normal (blue)
    },
  ];

  // Use sample orders instead of db orders for testing
  const ordersTaken = sampleOrders
    .map((order) => ({
      ...order,
      priorityLevel: getPriorityLevel(order.receiveDate),
    }))
    .sort((a, b) => {
      // First sort by priority level
      if (a.priorityLevel !== b.priorityLevel) {
        return a.priorityLevel - b.priorityLevel;
      }
      // If same priority, sort by date
      return new Date(a.receiveDate) - new Date(b.receiveDate);
    });

  return (
    <BakerLayout>
      <main className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back, {loading ? "..." : userFullName}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your bakery today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Balance Card */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl p-6 text-white shadow-lg relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold opacity-90">
                Current Balance
              </h3>
              <Icon icon="ph:wallet-bold" className="text-2xl opacity-80" />
            </div>
            <p className="text-3xl font-bold">₱ 12,435.50</p>
            <p className="text-sm opacity-80 mt-2">Available for withdrawal</p>

            {/* Withdraw Button */}
            <button className="absolute bottom-4 right-4 bg-white text-orange-500 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors duration-200">
              Withdraw
            </button>
          </div>

          {/* Weekly Sales Card */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg relative">
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

            {/* View Button */}
            <button className="absolute bottom-4 right-4 bg-white text-blue-500 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors duration-200">
              View
            </button>
          </div>

          {/* Orders Card */}
          <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-xl p-6 text-white shadow-lg relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold opacity-90">
                Active Orders
              </h3>
              <Icon icon="ph:package-bold" className="text-2xl opacity-80" />
            </div>
            <p className="text-3xl font-bold">{pendingOrders.length}</p>
            <p className="text-sm opacity-80 mt-2">Orders pending delivery</p>

            {/* View Button */}
            <button className="absolute bottom-4 right-4 bg-white text-green-500 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors duration-200">
              View
            </button>
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
    </BakerLayout>
  );
};

export default Dashboard;
