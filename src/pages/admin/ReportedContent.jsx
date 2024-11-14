import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const ReportedContent = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all', 'content', 'baker'

  const reports = [
    {
      id: 1,
      type: "content",
      reportedItem: "Chocolate Cake Listing",
      reportedUser: "Sweet Bakery",
      reportedBy: "John Customer",
      reason: "Misleading product description",
      date: "2024-03-15",
      status: "Pending",
      evidence: "screenshot.jpg",
      details: {
        description: "The cake description doesn't match the actual product...",
        category: "Product Listing",
        additionalNotes: "Customer provided photo evidence of the difference",
        previousViolations: 0
      }
    },
    {
      id: 2,
      type: "baker",
      reportedItem: "Baker Business",
      reportedUser: "Cake Haven",
      reportedBy: "Sarah Wilson",
      reason: "Unprofessional conduct",
      date: "2024-03-16",
      status: "Under Review",
      evidence: "chat_logs.pdf",
      details: {
        description: "Baker has been rude to customers and delayed orders without communication",
        category: "Business Conduct",
        additionalNotes: "Multiple customers have reported similar experiences",
        previousViolations: 1,
        businessDetails: {
          registrationDate: "2023-12-01",
          totalOrders: 45,
          averageRating: 2.8
        }
      }
    },
    {
      id: 3,
      type: "baker",
      reportedItem: "Baker Business",
      reportedUser: "Sweet Dreams Bakery",
      reportedBy: "Mike Thompson",
      reason: "Food safety concern",
      date: "2024-03-14",
      status: "Urgent",
      evidence: "food_images.jpg",
      details: {
        description: "Received cake with signs of spoilage",
        category: "Food Safety",
        additionalNotes: "Customer reported feeling unwell after consumption",
        previousViolations: 0,
        businessDetails: {
          registrationDate: "2024-01-15",
          totalOrders: 28,
          averageRating: 4.2
        }
      }
    },
    {
      id: 4,
      type: "content",
      reportedItem: "Wedding Cake Advertisement",
      reportedUser: "Flour Power",
      reportedBy: "Lisa Baker",
      reason: "Copyright infringement",
      date: "2024-03-13",
      status: "Pending",
      evidence: "original_image.jpg",
      details: {
        description: "Using copyrighted images without permission",
        category: "Intellectual Property",
        additionalNotes: "Original photographer has provided proof of ownership",
        previousViolations: 0
      }
    }
  ];

  const handleTakeAction = (action, id) => {
    // Implement action logic (remove content, warn user, ban account)
    console.log(`Taking action: ${action} on report:`, id);
  };

  const handleDismiss = (id) => {
    // Implement dismiss logic
    console.log('Dismissed report:', id);
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Reported Content</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reported Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reported User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reported By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
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
                  {reports.map((report) => (
                    <tr
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{report.reportedItem}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{report.reportedUser}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{report.reportedBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{report.reason}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{report.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTakeAction('remove', report.id);
                          }}
                          className="text-red-600 hover:text-red-900 mr-3"
                        >
                          Remove
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDismiss(report.id);
                          }}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Dismiss
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Report Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Report Details</h2>
            </div>
            <div className="p-6">
              {selectedReport ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Description</h3>
                    <p className="mt-2 text-sm text-gray-900">{selectedReport.details.description}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="mt-2 text-sm text-gray-900">{selectedReport.details.category}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Additional Notes</h3>
                    <p className="mt-2 text-sm text-gray-900">{selectedReport.details.additionalNotes}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Previous Violations</h3>
                    <p className="mt-2 text-sm text-gray-900">{selectedReport.details.previousViolations}</p>
                  </div>

                  <div className="pt-4 flex space-x-3">
                    <button
                      onClick={() => handleTakeAction('remove', selectedReport.id)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Remove Content
                    </button>
                    <button
                      onClick={() => handleDismiss(selectedReport.id)}
                      className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                      Dismiss Report
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Select a report to view details</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportedContent; 