import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../../data/userDataTbl";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Admin Name');
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });

  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      const { admin_id } = JSON.parse(adminData);
      const admin = userData.users.find(user => user.user_id === admin_id);
      if (admin) {
        const name = admin.email.split('@')[0];
        const formattedName = name
          .split('.')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        setAdminName(formattedName);
      }
    }
  }, []);

  const showToast = (message, type) => {
    setToast({
      show: true,
      message,
      type
    });

    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 2000);
  };

  const handleLogout = () => {
    showToast('Logged out successfully!', 'success');
    
    setTimeout(() => {
      localStorage.removeItem('adminData');
      navigate('/admin/login');
    }, 1000);
  };

  const navigation = [
    {
      name: "Dashboard",
      path: "/admin",
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
            <div className="flex justify-between items-center px-6 py-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                {navigation.find((item) => item.path === location.pathname)
                  ?.name || "Dashboard"}
              </h1>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-4">{adminName}</span>
                <span 
                  className="text-red-600 cursor-pointer" 
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </div>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div 
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg
            ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
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
