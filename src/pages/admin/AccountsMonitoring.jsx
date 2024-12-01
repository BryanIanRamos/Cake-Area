import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FeedbackModal = ({ isOpen, onClose, onConfirm, action, userId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Confirm {action}
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to {action.toLowerCase()} this account?
          {action === "Ban" &&
            " This will permanently restrict the account access."}
          {action === "Warn" &&
            " A warning notification will be sent to the user."}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md text-white ${
              action === "Ban"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-yellow-600 hover:bg-yellow-700"
            }`}
          >
            Confirm {action}
          </button>
        </div>
      </div>
    </div>
  );
};

const ActivityDetailModal = ({ isOpen, onClose, activity, onWarn, onBan }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Activity Details
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">
              User Information
            </h4>
            <p className="mt-1 text-sm text-gray-900">
              <span className="font-medium">Name:</span> {activity.user}
            </p>
            <p className="mt-1 text-sm text-gray-900">
              <span className="font-medium">Account Type:</span> {activity.type}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">
              Activity Details
            </h4>
            <p className="mt-1 text-sm text-gray-900">
              <span className="font-medium">Action:</span> {activity.action}
            </p>
            <p className="mt-1 text-sm text-gray-900">
              <span className="font-medium">Time:</span> {activity.timestamp}
            </p>
          </div>
          <div className="pt-4 flex space-x-3">
            <button
              onClick={onWarn}
              className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
            >
              Warn User
            </button>
            <button
              onClick={onBan}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Ban Account
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountsMonitoring = () => {
  const [onlineUsers, setOnlineUsers] = useState({
    total: 156,
    bakers: 42,
    customers: 114,
  });

  const [registrationData, setRegistrationData] = useState([
    { date: "Mon", bakers: 5, customers: 25 },
    { date: "Tue", bakers: 8, customers: 35 },
    { date: "Wed", bakers: 12, customers: 45 },
    { date: "Thu", bakers: 7, customers: 30 },
    { date: "Fri", bakers: 10, customers: 40 },
    { date: "Sat", bakers: 15, customers: 55 },
    { date: "Sun", bakers: 9, customers: 38 },
  ]);

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      user: "John Baker",
      type: "Baker",
      action: "Updated product listing",
      timestamp: "2 minutes ago",
    },
    // ... other initial activities
  ]);

  // Add static user activity data
  const userActivityData = [
    { time: "00:00", users: 85 },
    { time: "03:00", users: 45 },
    { time: "06:00", users: 30 },
    { time: "09:00", users: 120 },
    { time: "12:00", users: 165 },
    { time: "15:00", users: 180 },
    { time: "18:00", users: 150 },
    { time: "21:00", users: 110 },
  ];

  // Simulate real-time user count updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newBakers = Math.floor(Math.random() * 20) + 35;
      const newCustomers = Math.floor(Math.random() * 30) + 100;
      setOnlineUsers({
        total: newBakers + newCustomers,
        bakers: newBakers,
        customers: newCustomers,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate real-time registration updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRegistrationData((prev) => {
        const newData = [...prev];
        const randomIndex = Math.floor(Math.random() * newData.length);
        newData[randomIndex] = {
          ...newData[randomIndex],
          bakers: newData[randomIndex].bakers + Math.floor(Math.random() * 3),
          customers:
            newData[randomIndex].customers + Math.floor(Math.random() * 5),
        };
        return newData;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Simulate real-time activity feed updates
  useEffect(() => {
    const activities = [
      { user: "Emma Baker", type: "Baker", action: "Added new cake design" },
      { user: "Mike Customer", type: "Customer", action: "Left a review" },
      { user: "Sweet Treats", type: "Baker", action: "Updated shop hours" },
      { user: "Lisa Wilson", type: "Customer", action: "Made a purchase" },
      { user: "Cake Master", type: "Baker", action: "Responded to inquiry" },
    ];

    const interval = setInterval(() => {
      const randomActivity =
        activities[Math.floor(Math.random() * activities.length)];
      const newActivity = {
        id: Date.now(),
        ...randomActivity,
        timestamp: "Just now",
      };

      setRecentActivity((prev) => {
        // Update timestamps
        const updatedActivities = prev.map((activity) => ({
          ...activity,
          timestamp: updateTimestamp(activity.timestamp),
        }));

        // Add new activity and keep only the last 5
        return [newActivity, ...updatedActivities].slice(0, 5);
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Helper function to update timestamps
  const updateTimestamp = (timestamp) => {
    if (timestamp === "Just now") return "1 minute ago";
    if (timestamp === "1 minute ago") return "2 minutes ago";
    if (timestamp.includes("minutes")) {
      const minutes = parseInt(timestamp) + 1;
      if (minutes >= 60) return "1 hour ago";
      return `${minutes} minutes ago`;
    }
    return timestamp;
  };

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setModalOpen(true);
  };

  const handleWarnUser = () => {
    setModalOpen(false);
    setActionType("Warn");
    setActionModalOpen(true);
  };

  const handleBanUser = () => {
    setModalOpen(false);
    setActionType("Ban");
    setActionModalOpen(true);
  };

  const handleActionConfirm = () => {
    // Implement the actual warning/banning logic here
    console.log(`${actionType} confirmed for user: ${selectedActivity.user}`);
    setActionModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Real-time Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-purple-100">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-4.745M8 8h8m0 0a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-lg leading-8 font-medium text-gray-900">
                  Online Users
                </div>
                <div className="text-sm leading-5 font-medium text-gray-500">
                  Total: {onlineUsers.total}
                </div>
                <div className="text-sm leading-5 font-medium text-gray-500">
                  Bakers: {onlineUsers.bakers}
                </div>
                <div className="text-sm leading-5 font-medium text-gray-500">
                  Customers: {onlineUsers.customers}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-pink-100">
                <svg
                  className="h-6 w-6 text-pink-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-lg leading-8 font-medium text-gray-900">
                  Active Sessions
                </div>
                <div className="text-sm leading-5 font-medium text-gray-500">
                  Desktop: 65%
                </div>
                <div className="text-sm leading-5 font-medium text-gray-500">
                  Mobile: 35%
                </div>
              </div>
            </div>
          </div>

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
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-lg leading-8 font-medium text-gray-900">
                  System Status
                </div>
                <div className="text-sm leading-5 font-medium text-green-500">
                  All Systems Operational
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Activity Chart (Static) */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              24-Hour User Activity
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Registrations Chart (Real-time) */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Weekly Registrations
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={registrationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="customers"
                    stackId="1"
                    stroke="#EC4899"
                    fill="#FBD5E5"
                  />
                  <Area
                    type="monotone"
                    dataKey="bakers"
                    stackId="1"
                    stroke="#8B5CF6"
                    fill="#DDD6FE"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="px-6 py-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleActivityClick(activity)}
              >
                <div className="flex items-center">
                  <div
                    className={`rounded-full p-2 ${
                      activity.type === "Baker"
                        ? "bg-purple-100"
                        : "bg-pink-100"
                    }`}
                  >
                    <svg
                      className={`h-5 w-5 ${
                        activity.type === "Baker"
                          ? "text-purple-600"
                          : "text-pink-600"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={
                          activity.type === "Baker"
                            ? "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            : "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        }
                      />
                    </svg>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">
                          {activity.user}
                        </span>
                        <span className="text-gray-500">
                          {" "}
                          {activity.action}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ActivityDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        activity={selectedActivity}
        onWarn={handleWarnUser}
        onBan={handleBanUser}
      />

      <FeedbackModal
        isOpen={actionModalOpen}
        onClose={() => setActionModalOpen(false)}
        onConfirm={handleActionConfirm}
        action={actionType}
        userId={selectedActivity?.user}
      />
    </AdminLayout>
  );
};

export default AccountsMonitoring;
