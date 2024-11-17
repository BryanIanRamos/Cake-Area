import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const BusinessVerification = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewImage, setViewImage] = useState(null);

  const verificationRequests = [
    {
      id: 1,
      businessName: "Sweet Delights Bakery",
      ownerName: "Jane Smith",
      dateSubmitted: "2024-03-15",
      status: "Pending",
      documents: {
        permit: "business-permit.jpg",
        license: "food-license.jpg",
        certification: "health-cert.jpg"
      },
      details: {
        address: "123 Baker Street, Cake City",
        phone: "+44 1234 567890",
        email: "jane@sweetdelights.com",
        businessType: "Bakery",
        yearsInOperation: "2",
        taxId: "TAX123456789"
      }
    },
    {
      id: 2,
      businessName: "Cake Haven",
      ownerName: "Mike Johnson",
      dateSubmitted: "2024-03-14",
      status: "Pending",
      documents: {
        permit: "permit-ch.jpg",
        license: "license-ch.jpg",
        certification: "cert-ch.jpg"
      },
      details: {
        address: "456 Pastry Lane, Dessert Town",
        phone: "+44 9876 543210",
        email: "mike@cakehaven.com",
        businessType: "Home Bakery",
        yearsInOperation: "1",
        taxId: "TAX987654321"
      }
    }
  ];

  const handleVerification = (id, action) => {
    console.log(`${action} application:`, id);
    // Implement verification logic
  };

  const handleImageView = (imageUrl) => {
    setViewImage(imageUrl);
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Business Verification Requests</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {verificationRequests.map((request) => (
                    <tr
                      key={request.id}
                      onClick={() => setSelectedApplication(request)}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{request.businessName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{request.ownerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{request.dateSubmitted}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVerification(request.id, 'approve');
                          }}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Approve
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVerification(request.id, 'reject');
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Application Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Application Details</h2>
            </div>
            <div className="p-6">
              {selectedApplication ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Business Information</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Address:</span> {selectedApplication.details.address}
                      </p>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Phone:</span> {selectedApplication.details.phone}
                      </p>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Email:</span> {selectedApplication.details.email}
                      </p>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Business Type:</span> {selectedApplication.details.businessType}
                      </p>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Years in Operation:</span> {selectedApplication.details.yearsInOperation}
                      </p>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Tax ID:</span> {selectedApplication.details.taxId}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Documents</h3>
                    <div className="mt-2 grid grid-cols-1 gap-4">
                      {Object.entries(selectedApplication.documents).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => handleImageView(value)}
                          className="flex items-center p-2 border rounded-md hover:bg-gray-50"
                        >
                          <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <button
                      onClick={() => handleVerification(selectedApplication.id, 'approve')}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Approve Application
                    </button>
                    <button
                      onClick={() => handleVerification(selectedApplication.id, 'reject')}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Reject Application
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Select an application to view details</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {viewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setViewImage(null)}>
          <div className="bg-white p-4 rounded-lg max-w-2xl max-h-[90vh] overflow-auto">
            <img src={viewImage} alt="Document Preview" className="max-w-full h-auto" />
            <button
              className="mt-4 w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              onClick={() => setViewImage(null)}
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default BusinessVerification; 