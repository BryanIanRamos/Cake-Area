import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

const FeedbackModal = ({ isOpen, onClose, onConfirm, action, reportId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Confirm {action}
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to {action.toLowerCase()} report #{reportId}?
          This action cannot be undone.
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
              action === "Remove"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            Confirm {action}
          </button>
        </div>
      </div>
    </div>
  );
};

const ReportedContent = () => {
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
      evidence: "../../../public/assets/ChocolateDreamLayerCakev1.jpg",
      details: {
        description: "The cake description doesn't match the actual product...",
        category: "Product Listing",
        additionalNotes: "Customer provided photo evidence of the difference",
        previousViolations: 0,
      },
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
      evidence: "../../../public/assets/CarrotSpiceCakev3.jpg",
      details: {
        description:
          "Baker has been rude to customers and delayed orders without communication",
        category: "Business Conduct",
        additionalNotes: "Multiple customers have reported similar experiences",
        previousViolations: 1,
        businessDetails: {
          registrationDate: "2023-12-01",
          totalOrders: 45,
          averageRating: 2.8,
        },
      },
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
      evidence: "../../../public/assets/ClassicApplePiev1.jpg",
      details: {
        description: "Received cake with signs of spoilage",
        category: "Food Safety",
        additionalNotes: "Customer reported feeling unwell after consumption",
        previousViolations: 0,
        businessDetails: {
          registrationDate: "2024-01-15",
          totalOrders: 28,
          averageRating: 4.2,
        },
      },
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
      evidence: "../../../public/assets/ClassicChocolateChipCookiesv2.jpeg",
      details: {
        description: "Using copyrighted images without permission",
        category: "Intellectual Property",
        additionalNotes:
          "Original photographer has provided proof of ownership",
        previousViolations: 0,
      },
    },
  ];

  const [selectedReport, setSelectedReport] = useState(null);
  const [filterType, setFilterType] = useState("all"); // 'all', 'content', 'baker'
  const [activeReports, setActiveReports] = useState(reports);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [modalReportId, setModalReportId] = useState(null);

  const handleTakeAction = (action, id) => {
    setModalAction(action);
    setModalReportId(id);
    setModalOpen(true);
  };

  const handleDismiss = (id) => {
    setModalAction("Dismiss");
    setModalReportId(id);
    setModalOpen(true);
  };

  const handleModalConfirm = () => {
    if (modalAction === "Dismiss") {
      setActiveReports((prevReports) =>
        prevReports.filter((report) => report.id !== modalReportId)
      );
      if (selectedReport && selectedReport.id === modalReportId) {
        setSelectedReport(null);
      }
    } else {
      setActiveReports((prevReports) =>
        prevReports.filter((report) => report.id !== modalReportId)
      );
      if (selectedReport && selectedReport.id === modalReportId) {
        setSelectedReport(null);
      }
    }
    setModalOpen(false);
  };

  return (
    <AdminLayout>
      <FeedbackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleModalConfirm}
        action={modalAction}
        reportId={modalReportId}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Reported Content
              </h2>
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeReports.map((report) => (
                    <tr
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {report.reportedItem}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {report.reportedUser}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {report.reportedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {report.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {report.status}
                        </span>
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
              <h2 className="text-lg font-medium text-gray-900">
                Report Details
              </h2>
            </div>
            <div className="p-6">
              {selectedReport ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Description
                    </h3>
                    <p className="mt-2 text-sm text-gray-900">
                      {selectedReport.details.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Category
                    </h3>
                    <p className="mt-2 text-sm text-gray-900">
                      {selectedReport.details.category}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Additional Notes
                    </h3>
                    <p className="mt-2 text-sm text-gray-900">
                      {selectedReport.details.additionalNotes}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Previous Violations
                    </h3>
                    <p className="mt-2 text-sm text-gray-900">
                      {selectedReport.details.previousViolations}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Evidence
                    </h3>
                    <div className="mt-2">
                      <img
                        src={selectedReport.evidence}
                        alt="Report evidence"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex space-x-3">
                    <button
                      onClick={() =>
                        handleTakeAction("remove", selectedReport.id)
                      }
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
                <p className="text-gray-500 text-sm">
                  Select a report to view details
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportedContent;
