import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Icon } from "@iconify/react";

// Add this modal component for viewing activity/history details
const DetailModal = ({ isOpen, onClose, data, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {type === "activity" ? "Activity Details" : "Account History Details"}
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">
              User Information
            </h4>
            <p className="mt-1 text-sm text-gray-900">
              <span className="font-medium">Name:</span>{" "}
              {data.user || data.name}
            </p>
            <p className="mt-1 text-sm text-gray-900">
              <span className="font-medium">Type:</span> {data.type}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">
              Action Details
            </h4>
            <p className="mt-1 text-sm text-gray-900">
              <span className="font-medium">Action:</span> {data.action}
            </p>
            <p className="mt-1 text-sm text-gray-900">
              <span className="font-medium">Time:</span> {data.timestamp}
            </p>
            {data.amount && (
              <p className="mt-1 text-sm text-gray-900">
                <span className="font-medium">Amount:</span> {data.amount}
              </p>
            )}
            {data.status && (
              <p className="mt-1 text-sm text-gray-900">
                <span className="font-medium">Status:</span> {data.status}
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [onlineUsers, setOnlineUsers] = useState({
    total: 156,
    bakers: 42,
    customers: 114,
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      user: "John Baker",
      type: "Baker",
      action: "Listed new product",
      timestamp: "2 minutes ago",
    },
    {
      id: 2,
      user: "Sarah Customer",
      type: "Customer",
      action: "Placed an order",
      timestamp: "5 minutes ago",
    },
    {
      id: 3,
      user: "Sweet Delights",
      type: "Baker",
      action: "Requested withdrawal of ₱5,000",
      timestamp: "7 minutes ago",
    },
    {
      id: 4,
      user: "Cake Haven",
      type: "Baker",
      action: "Withdrawal of ₱3,500 approved",
      timestamp: "8 minutes ago",
    },
    {
      id: 5,
      user: "Sweet Delights",
      type: "Baker",
      action: "Updated shop status",
      timestamp: "10 minutes ago",
    },
  ]);

  const [accountHistory, setAccountHistory] = useState([
    {
      id: 1,
      name: "Sweet Delights",
      type: "Baker",
      action: "Withdrawal Request",
      status: "Pending",
      amount: "₱5,000",
      timestamp: "2024-03-15 10:30",
    },
    {
      id: 2,
      name: "Cake Haven",
      type: "Baker",
      action: "Withdrawal",
      status: "Completed",
      amount: "₱3,500",
      timestamp: "2024-03-15 10:15",
    },
    {
      id: 3,
      name: "Mike Baker",
      type: "Baker",
      action: "Account created",
      status: "Pending verification",
      amount: "₱5,000",
      timestamp: "2024-03-15 09:30",
    },
    {
      id: 4,
      name: "Lisa Customer",
      type: "Customer",
      action: "Profile updated",
      status: "Active",
      amount: "₱3,500",
      timestamp: "2024-03-15 09:15",
    },
  ]);

  const [withdrawalActivities] = useState([
    {
      id: 1,
      bakerName: "Sweet Delights",
      amount: "₱5,000",
      status: "Pending",
      requestDate: "2024-03-15 10:30",
      accountNumber: "****-****-1234",
      bank: "BDO",
    },
    {
      id: 2,
      bakerName: "Cake Haven",
      amount: "₱3,500",
      status: "Completed",
      requestDate: "2024-03-15 09:45",
      accountNumber: "****-****-5678",
      bank: "BPI",
    },
    {
      id: 3,
      bakerName: "Flour Power",
      amount: "₱2,800",
      status: "Processing",
      requestDate: "2024-03-15 08:15",
      accountNumber: "****-****-9012",
      bank: "Metrobank",
    },
    {
      id: 4,
      bakerName: "Sweet Dreams Bakery",
      amount: "₱4,200",
      status: "Completed",
      requestDate: "2024-03-14 16:30",
      accountNumber: "****-****-3456",
      bank: "UnionBank",
    },
  ]);

  // Add these new state variables
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Add these new state variables at the top with other states
  const [companyFinances, setCompanyFinances] = useState({
    totalBalance: 125750.50,
    totalEarnings: 8847.78, // Platform fees from transactions
    transactionFeeRate: 0.05, // 5% transaction fee
    todayEarnings: 750.25, // Today's platform earnings
    totalTransactions: 1250 // Total number of transactions
  });

  // Add these to your existing state
  const [userStats, setUserStats] = useState({
    totalRegistered: 2500,
    newToday: 15,
    activeLastWeek: 850
  });

  const [bakerStats, setBakerStats] = useState({
    totalVerified: 150,
    pendingVerification: 8,
    topPerformer: "Sweet Delights"
  });

  const [customerStats, setCustomerStats] = useState({
    totalActive: 2350,
    ordersToday: 45,
    averageOrderValue: 1250.00
  });

  // Add click handlers for activities and history items
  const handleActivityClick = (activity) => {
    setSelectedItem(activity);
    setModalType("activity");
    setModalOpen(true);
  };

  const handleHistoryClick = (historyItem) => {
    setSelectedItem(historyItem);
    setModalType("history");
    setModalOpen(true);
  };

  // Add filtered data getters
  const getFilteredActivities = () => {
    return recentActivities.filter((activity) => {
      const matchesSearch =
        activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.action.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterType === "all" ||
        activity.type.toLowerCase() === filterType.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  };

  const getFilteredHistory = () => {
    return accountHistory.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.action.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterType === "all" ||
        item.type.toLowerCase() === filterType.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  };

  // Add these useEffect hooks for real-time simulations
  useEffect(() => {
    // Simulate real-time online users updates
    const userInterval = setInterval(() => {
      setOnlineUsers(prev => ({
        total: Math.floor(Math.random() * 50) + 150,
        bakers: Math.floor(Math.random() * 20) + 35,
        customers: Math.floor(Math.random() * 30) + 100,
      }));
    }, 5000);

    return () => clearInterval(userInterval);
  }, []);

  useEffect(() => {
    // Simulate real-time activity updates
    const activityInterval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        user: ["John Baker", "Sarah Customer", "Sweet Delights", "Cake Haven"][
          Math.floor(Math.random() * 4)
        ],
        type: Math.random() > 0.5 ? "Baker" : "Customer",
        action: [
          "Updated profile",
          "Listed new product",
          "Placed an order",
          "Requested withdrawal",
          "Updated shop status",
        ][Math.floor(Math.random() * 5)],
        timestamp: "Just now",
      };

      setRecentActivities(prev => {
        const updated = [newActivity, ...prev.slice(0, 4)];
        return updated;
      });

      // Update timestamps
      setRecentActivities(prev =>
        prev.map(activity => ({
          ...activity,
          timestamp: activity.timestamp === "Just now"
            ? "Just now"
            : activity.timestamp === "1 minute ago"
            ? "2 minutes ago"
            : activity.timestamp === "2 minutes ago"
            ? "3 minutes ago"
            : activity.timestamp
        }))
      );
    }, 8000);

    return () => clearInterval(activityInterval);
  }, []);

  useEffect(() => {
    // Simulate real-time withdrawal status updates
    const withdrawalInterval = setInterval(() => {
      setWithdrawalActivities(prev => 
        prev.map(withdrawal => {
          if (withdrawal.status === "Pending") {
            const randomStatus = Math.random();
            if (randomStatus > 0.7) {
              return { ...withdrawal, status: "Processing" };
            }
          } else if (withdrawal.status === "Processing") {
            const randomStatus = Math.random();
            if (randomStatus > 0.7) {
              return { ...withdrawal, status: "Completed" };
            }
          }
          return withdrawal;
        })
      );

      // Add new withdrawal requests occasionally
      if (Math.random() > 0.8) {
        const newWithdrawal = {
          id: Date.now(),
          bakerName: ["Sweet Delights", "Cake Haven", "Flour Power", "Sweet Dreams Bakery"][
            Math.floor(Math.random() * 4)
          ],
          amount: `₱${(Math.floor(Math.random() * 50) + 20) * 100}`,
          status: "Pending",
          requestDate: new Date().toLocaleString(),
          accountNumber: `****-****-${Math.floor(Math.random() * 9000) + 1000}`,
          bank: ["BDO", "BPI", "Metrobank", "UnionBank"][Math.floor(Math.random() * 4)],
        };

        setWithdrawalActivities(prev => [newWithdrawal, ...prev.slice(0, -1)]);
      }
    }, 10000);

    return () => clearInterval(withdrawalInterval);
  }, []);

  useEffect(() => {
    // Simulate real-time Account History updates
    const historyInterval = setInterval(() => {
      // Generate random history entry
      const newHistoryEntry = {
        id: Date.now(),
        name: [
          "Sweet Delights",
          "Cake Haven",
          "Flour Power",
          "Sweet Dreams Bakery",
          "John Baker",
          "Sarah Customer",
          "Mike Customer",
          "Lisa Baker"
        ][Math.floor(Math.random() * 8)],
        type: Math.random() > 0.5 ? "Baker" : "Customer",
        action: [
          "Account created",
          "Profile updated",
          "Password changed",
          "Withdrawal Request",
          "Shop status updated",
          "Email verified",
          "Phone verified",
          "Documents submitted"
        ][Math.floor(Math.random() * 8)],
        status: [
          "Pending",
          "Completed",
          "Active",
          "Pending verification",
          "Processing"
        ][Math.floor(Math.random() * 5)],
        amount: Math.random() > 0.7 ? `₱${(Math.floor(Math.random() * 50) + 10) * 100}` : null,
        timestamp: new Date().toLocaleString(),
      };

      // Update history with new entry
      setAccountHistory(prev => {
        const updated = [newHistoryEntry, ...prev.slice(0, 9)]; // Keep last 10 entries
        return updated;
      });

      // Randomly update existing entries' status
      setAccountHistory(prev =>
        prev.map(entry => {
          if (Math.random() > 0.8) { // 20% chance to update status
            return {
              ...entry,
              status: entry.status === "Pending" ? "Completed" :
                      entry.status === "Pending verification" ? "Active" :
                      entry.status === "Processing" ? "Completed" :
                      entry.status
            };
          }
          return entry;
        })
      );
    }, 12000); // Update every 12 seconds

    return () => clearInterval(historyInterval);
  }, []);

  // Fix the formatTimestamp function
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return date.toLocaleDateString();
  };

  // Add this effect to simulate finance updates
  useEffect(() => {
    const financeInterval = setInterval(() => {
      setCompanyFinances(prev => {
        // Simulate random changes in finances
        const newEarnings = prev.totalEarnings + (Math.random() * 100);
        const newPendingWithdrawals = Math.max(0, prev.pendingWithdrawals + (Math.random() > 0.5 ? 1000 : -1000));
        
        return {
          ...prev,
          totalBalance: prev.totalBalance + (Math.random() * 200) - (Math.random() * 100),
          pendingWithdrawals: newPendingWithdrawals,
          totalEarnings: newEarnings,
        };
      });
    }, 15000); // Update every 15 seconds

    return () => clearInterval(financeInterval);
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Add search and filter controls */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search activities and history..."
              className="w-full px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-md"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="baker">Bakers</option>
            <option value="customer">Customers</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Company Balance Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-green-100">
                <Icon 
                  icon="ph:money-bold" 
                  className="h-6 w-6 text-green-600"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Company Balance</h3>
                <p className="text-2xl font-semibold">
                  ₱ {companyFinances.totalBalance.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Platform Earnings:</span>
                <span className="font-medium text-green-500">
                  ₱ {companyFinances.totalEarnings.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Transaction Fee:</span>
                <span className="font-medium text-gray-600">
                  {(companyFinances.transactionFeeRate * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Updated Total Users Online Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-purple-100">
                <Icon 
                  icon="ph:users-bold" 
                  className="h-6 w-6 text-purple-600"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Total Users Online</h3>
                <p className="text-2xl font-semibold">{onlineUsers.total}</p>
              </div>
            </div>
          </div>

          {/* Existing Online Bakers Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-yellow-100">
                <svg
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Online Bakers</h3>
                <p className="text-2xl font-semibold">{onlineUsers.bakers}</p>
              </div>
            </div>
          </div>

          {/* Existing Online Customers Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Online Customers</h3>
                <p className="text-2xl font-semibold">
                  {onlineUsers.customers}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modified Activity and History Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Real-time Activity Feed with click handlers */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Real-time Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="flow-root">
                <ul className="-mb-8">
                  {getFilteredActivities().map((activity, activityIdx) => (
                    <li
                      key={activity.id}
                      onClick={() => handleActivityClick(activity)}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <div className="relative pb-8">
                        {activityIdx !== recentActivities.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                activity.type === "Baker"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                            >
                              <svg
                                className="h-5 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {activity.user}
                                </span>{" "}
                                {activity.action}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {activity.timestamp}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Account History table with click handlers */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Account History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredHistory().map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleHistoryClick(item)}
                      className="cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {item.type}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {item.action}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === "Active" || item.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : item.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatTimestamp(item.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add the detail modal */}
      <DetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedItem}
        type={modalType}
      />
    </AdminLayout>
  );
};

export default Dashboard;
