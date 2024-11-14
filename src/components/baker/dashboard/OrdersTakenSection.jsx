import React from 'react';

const OrdersTakenSection = ({ orders }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Orders Taken</h2>
      <div className="w-full overflow-x-auto">
        <div className="inline-flex gap-4 pb-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-400 min-w-[250px]"
            >
              <div className="space-y-2">
                <p className="font-bold">Order ID: {order.id}</p>
                <p className="font-semibold">Receive at:</p>
                <p>{order.deadline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersTakenSection; 