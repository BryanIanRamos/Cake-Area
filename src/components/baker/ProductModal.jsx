import React from 'react';

const ProductModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-8 sticky top-0 bg-white pb-4 border-b z-10">
          <h2 className="text-2xl font-bold text-[#E88F2A]">Order Details</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Order Summary Card */}
        <div className="bg-orange-50 rounded-xl p-6 mb-8 border border-orange-100 shadow-sm">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Order ID</p>
              <p className="font-bold text-[#E88F2A] text-lg">#{order.order_id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                ${order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'}`}>
                {order.status}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Payment Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {order.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Delivery Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Delivery Information</h3>
            <div className="space-y-3">
              <p className="text-sm">
                <span className="text-gray-500 font-medium">Name:</span>{' '}
                <span className="text-gray-800 font-semibold">{order.placedAddress?.fullName}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-500 font-medium">Phone:</span>{' '}
                <span className="text-gray-800 font-semibold">{order.placedAddress?.phoneNumber}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-500 font-medium">Address:</span>{' '}
                <span className="text-gray-800 font-semibold">
                  {order.placedAddress?.streetAddress}, {order.placedAddress?.cityBarangay}, {order.placedAddress?.postalCode}
                </span>
              </p>
            </div>
          </div>

          {/* Order Dates */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Order Timeline</h3>
            <div className="space-y-3">
              <p className="text-sm">
                <span className="text-gray-500 font-medium">Created:</span>{' '}
                <span className="text-gray-800 font-semibold">{new Date(order.created_at).toLocaleString()}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-500 font-medium">Checkout:</span>{' '}
                <span className="text-gray-800 font-semibold">{new Date(order.checkoutDate).toLocaleString()}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-500 font-medium">Receive By:</span>{' '}
                <span className="font-semibold text-[#E88F2A]">{new Date(order.receiveDate).toLocaleString()}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">Order Items</h3>
          <div className="bg-gray-50 rounded-xl border border-gray-200">
            {order.products.map((product, index) => (
              <div key={index} className={`flex items-center gap-6 p-6 ${index !== 0 ? 'border-t border-gray-200' : ''}`}>
                <img
                  src={product.images}
                  alt={product.prod_name}
                  className="w-24 h-24 rounded-xl object-cover border border-gray-200 shadow-sm"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-2">{product.prod_name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {product.qty}</p>
                  <p className="text-sm text-gray-600">Price per item: ₱{product.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-[#E88F2A]">₱{(product.price * product.qty).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">Payment Summary</h3>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Down Payment</span>
                <span className="font-semibold text-gray-800">₱{order.downPayment.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Remaining Payment</span>
                <span className="font-semibold text-gray-800">₱{order.remainingPayment.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
                <span className="font-semibold text-gray-800">Total Amount</span>
                <span className="font-bold text-xl text-[#E88F2A]">₱{order.total_amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 