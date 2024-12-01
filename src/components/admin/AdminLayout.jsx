import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin Name");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminData = localStorage.getItem("adminData");
        if (adminData) {
          const { admin_id } = JSON.parse(adminData);

          // Fetch user data from JSON server
          const userResponse = await fetch(
            `http://localhost:3000/users/${admin_id}`
          );
          const userData = await userResponse.json();

          // Fetch profile data from JSON server
          const profileResponse = await fetch(
            `http://localhost:3000/profiles?user_id=${admin_id}`
          );
          const profiles = await profileResponse.json();

          if (profiles.length > 0) {
            const { first_name, last_name } = profiles[0];
            setAdminName(`${first_name} ${last_name}`);
          } else {
            // Fallback to email if no profile found
            const name = userData.email.split("@")[0];
            const formattedName = name
              .split(".")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            setAdminName(formattedName);
          }
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  const showToast = (message, type) => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2000);
  };

  const handleLogout = () => {
    showToast("Logged out successfully!", "success");

    setTimeout(() => {
      localStorage.removeItem("adminData");
      navigate("/admin/login");
    }, 1000);
  };

  const navigation = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      name: "Accounts Monitoring",
      path: "/admin/accounts",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      name: "Refund Requests",
      path: "/admin/refunds",
      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    },
    {
      name: "Business Verification",
      path: "/admin/verification",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
      name: "Reported Content",
      path: "/admin/reports",
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    },
    {
      name: "Account Management",
      path: "/admin/management",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed h-screen w-64 bg-purple-800">
          <div className="flex h-16 items-center justify-center">
            <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
          </div>
          <nav className="mt-5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm ${
                  location.pathname === item.path
                    ? "bg-purple-900 text-white"
                    : "text-purple-100 hover:bg-purple-700"
                }`}
              >
                <svg
                  className="h-5 w-5 mr-3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d={item.icon}></path>
                </svg>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              {/* Welcome Message - Left Side */}
              <div className="flex items-center bg-purple-50 rounded-lg px-4 py-2">
                <svg
                  className="h-5 w-5 text-purple-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xs text-purple-600 font-medium">
                    Welcome back
                  </span>
                  <span className="text-sm text-purple-800 font-semibold">
                    {adminName}
                  </span>
                </div>
              </div>

              {/* Logout Button - Right Side */}
              <button
                className="flex items-center text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors duration-150"
                onClick={handleLogout}
              >
                <svg
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg
            ${toast.type === "success" ? "bg-green-500" : "bg-red-500"} 
            text-white
            transition-opacity duration-300 ease-in-out`}
        >
          <p>{toast.message}</p>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
