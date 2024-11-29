import React from 'react';

const ProductModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#E88F2A]">Order Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Order Information */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-medium">{order.order_id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Customer Name</p>
            <p className="font-medium">{order.placedAddress.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-medium">{order.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Order Date</p>
            <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Receive Date</p>
            <p className="font-medium">{new Date(order.receiveDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Payment Status</p>
            <p className="font-medium">{order.paymentStatus}</p>
          </div>
        </div>

        {/* Customer Address */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Delivery Address</h3>
          <div className="bg-gray-50 p-3 rounded">
            <p>{order.placedAddress.fullName}</p>
            <p>{order.placedAddress.phoneNumber}</p>
            <p>{order.placedAddress.streetAddress}</p>
            <p>{order.placedAddress.cityBarangay}</p>
            <p>{order.placedAddress.postalCode}</p>
          </div>
        </div>

        {/* Products List */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Products</h3>
          <div className="space-y-4">
            {order.products.map((product, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-4">
                <img
                  src={product.images}
                  alt={product.prod_name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.prod_name}</p>
                  <p className="text-sm text-gray-600">Quantity: {product.qty}</p>
                  <p className="text-sm text-gray-600">Price: ₱{product.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₱{(product.price * product.qty).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Information */}
        <div className="border-t pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Down Payment</p>
              <p>₱{order.downPayment.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Total Amount</p>
              <p>₱{order.total_amount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 