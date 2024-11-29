import React from "react";

const getPriorityColor = (receiveDate) => {
  const today = new Date();
  const receiveDay = new Date(receiveDate);
  const daysUntil = Math.ceil((receiveDay - today) / (1000 * 60 * 60 * 24));

  if (daysUntil <= 2) return { color: "red", text: "Urgent Priority" };
  if (daysUntil <= 5) return { color: "green", text: "Medium Priority" };
  return { color: "blue", text: "Normal Priority" };
};

const OrdersTakenSection = ({ orders }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Orders Taken</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {orders.map((order, index) => {
          const priority = getPriorityColor(order.receiveDate);

          return (
            <div
              key={index}
              className="min-w-[250px] bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer relative"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-800">
                  Order ID: {order.order_id}
                </h3>
              </div>
              <div className="text-gray-600">
                <p className="mb-2">Receive at:</p>
                <p>{new Date(order.receiveDate).toLocaleDateString()}</p>
              </div>

              {/* Priority Indicator */}
              <div className="absolute bottom-4 right-4 group">
                <div
                  className={`w-3 h-3 rounded-full bg-${priority.color}-500`}
                />
                {/* Hover Text */}
                <div
                  className={`absolute bottom-full right-0 mb-2 px-2 py-1 bg-${priority.color}-500 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap`}
                >
                  {priority.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersTakenSection;
