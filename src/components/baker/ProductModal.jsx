import React from 'react';

const ProductModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#E88F2A]">Order Details</h2>
        </div>
        <div>
          {order.products.map((product, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium text-[#E88F2A]">{product.prod_name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-sm">Quantity: {product.quantity}</p>
              <p className="text-sm">Price: ₱{product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#E88F2A] text-white py-2 rounded-lg hover:bg-[#d77f1f]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal; 