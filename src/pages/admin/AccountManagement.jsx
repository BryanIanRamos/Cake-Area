import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const AccountManagement = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountType, setAccountType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const accounts = [
    {
      id: 1,
      name: "Jane Baker",
      email: "jane@sweetdelights.com",
      type: "Baker",
      status: "Active",
      joinDate: "2024-01-15",
      lastActive: "2024-03-15",
      details: {
        businessName: "Sweet Delights Bakery",
        phone: "+1 234-567-8900",
        address: "123 Baker Street",
        totalOrders: 156,
        rating: 4.8,
        verificationStatus: "Verified",
        warnings: 0
      }
    },
    {
      id: 2,
      name: "John Customer",
      email: "john@email.com",
      type: "Customer",
      status: "Active",
      joinDate: "2024-02-01",
      lastActive: "2024-03-16",
      details: {
        phone: "+1 234-567-8901",
        totalOrders: 12,
        totalSpent: 450.00,
        savedAddresses: 2,
        paymentMethods: 1
      }
    },
    // Add more mock data
  ];

  const filteredAccounts = accounts.filter(account => {
    const matchesType = accountType === 'all' || account.type.toLowerCase() === accountType;
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleStatusChange = (id, newStatus) => {
    // Implement status change logic
    console.log(`Changing status for account ${id} to ${newStatus}`);
  };

  const handleSendWarning = (id) => {
    // Implement warning logic
    console.log(`Sending warning to account ${id}`);
  };

  const handleBanAccount = (id) => {
    // Implement ban logic
    console.log(`Banning account ${id}`);
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <h2 className="text-lg font-medium text-gray-900">Account Management</h2>
                <div className="flex space-x-2">
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  >
                    <option value="all">All Accounts</option>
                    <option value="baker">Bakers</option>
                    <option value="customer">Customers</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search accounts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name/Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAccounts.map((account) => (
                    <tr
                      key={account.id}
                      onClick={() => setSelectedAccount(account)}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{account.name}</div>
                        <div className="text-sm text-gray-500">{account.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          account.type === 'Baker' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {account.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          account.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {account.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {account.lastActive}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(account.id, account.status === 'Active' ? 'Suspended' : 'Active');
                          }}
                          className="text-purple-600 hover:text-purple-900 mr-2"
                        >
                          {account.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Account Details</h2>
            </div>
            <div className="p-6">
              {selectedAccount ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Basic Information</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Join Date:</span> {selectedAccount.joinDate}
                      </p>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Last Active:</span> {selectedAccount.lastActive}
                      </p>
                    </div>
                  </div>

                  {selectedAccount.type === 'Baker' && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Business Information</h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">Business Name:</span> {selectedAccount.details.businessName}
                        </p>
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">Total Orders:</span> {selectedAccount.details.totalOrders}
                        </p>
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">Rating:</span> {selectedAccount.details.rating}/5.0
                        </p>
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">Warnings:</span> {selectedAccount.details.warnings}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedAccount.type === 'Customer' && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">Total Orders:</span> {selectedAccount.details.totalOrders}
                        </p>
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">Total Spent:</span> ${selectedAccount.details.totalSpent}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 space-y-3">
                    <button
                      onClick={() => handleSendWarning(selectedAccount.id)}
                      className="w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                    >
                      Send Warning
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedAccount.id, selectedAccount.status === 'Active' ? 'Suspended' : 'Active')}
                      className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                    >
                      {selectedAccount.status === 'Active' ? 'Suspend Account' : 'Activate Account'}
                    </button>
                    <button
                      onClick={() => handleBanAccount(selectedAccount.id)}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Ban Account
                    </button>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Account Activity Log</h3>
                    <div className="bg-gray-50 rounded-md p-3 max-h-40 overflow-y-auto">
                      <div className="space-y-2">
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">2024-03-15 14:30</span> - Logged in
                        </div>
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">2024-03-14 09:15</span> - Updated profile
                        </div>
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">2024-03-13 11:45</span> - Changed password
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Select an account to view details</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AccountManagement; 