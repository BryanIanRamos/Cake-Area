import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

const RefundRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const refundRequests = [
    {
      id: 1,
      orderNumber: "ORD001",
      customer: "John Doe",
      baker: "Sweet Bakery",
      amount: 449.99,
      reason: "Product not as described",
      status: "Pending",
      date: "2024-03-15",
      product: "Chocolate Dream Layer Cake",
      evidence: "../assets/ChocolateDreamLayerCakev1.jpg",
    },
    {
      id: 3,
      orderNumber: "ORD003",
      customer: "Sarah Lee",
      baker: "Daily Bread",
      amount: 119.99,
      reason: "Quality issues",
      status: "Pending",
      date: "2024-03-13",
      product: "Premium Almond Croissant",
      evidence: "../assets/AlmondCroissantv2.jpg",
    },
    {
      id: 4,
      orderNumber: "ORD004",
      customer: "Mike Tyson",
      baker: "Sweet Delights",
      amount: 449.99,
      reason: "Damaged during delivery",
      status: "Pending",
      date: "2024-03-12",
      product: "Carrot Spice Cake",
      evidence: "../assets/CarrotSpiceCakev1.jpg",
    },
  ];

  const handleApprove = (id) => {
    // Implement approve logic
    console.log("Approved request:", id);
  };

  const handleReject = (id) => {
    // Implement reject logic
    console.log("Rejected request:", id);
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Refund Requests List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Refund Requests
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {refundRequests.map((request) => (
                    <tr
                      key={request.id}
                      onClick={() => setSelectedRequest(request)}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request.orderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request.product}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ₱{request.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Request Details
              </h2>
            </div>
            <div className="p-6">
              {selectedRequest ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Order Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedRequest.orderNumber}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Product
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedRequest.product}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Baker</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedRequest.baker}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Reason
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedRequest.reason}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Evidence
                    </h3>
                    <div className="mt-1">
                      <img
                        src={selectedRequest.evidence}
                        alt={selectedRequest.product}
                        className="h-48 w-full object-cover rounded"
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex space-x-3">
                    <button
                      onClick={() => handleApprove(selectedRequest.id)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Approve Refund
                    </button>
                    <button
                      onClick={() => handleReject(selectedRequest.id)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Reject Refund
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Select a request to view details
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RefundRequests;
