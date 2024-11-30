import React from "react";

const PendingOrdersTable = ({
  orders,
  tableLimit,
  setTableLimit,
  setCurrentPage,
  startIndex,
  currentPage,
  totalPages,
  totalOrders,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Pending Orders</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Show entries:</label>
          <select
            value={tableLimit}
            onChange={(e) => {
              setTableLimit(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-[#3F3F3F] text-white">
              <th className="text-left p-4">Cake Name</th>
              <th className="text-left p-4">Location</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Quantity</th>
              <th className="text-left p-4">Received at</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">{order.name}</td>
                <td className="p-4">{order.location}</td>
                <td className="p-4">{order.price}</td>
                <td className="p-4">{order.quantity}</td>
                <td className="p-4">{order.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="text-gray-600">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + tableLimit, totalOrders)} of {totalOrders}{" "}
          entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border`}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingOrdersTable;
