import React from 'react';
import { Link } from 'react-router-dom';
import CakeSample from '../../assets/CakeSample.png'; // Import a default image

const OrderCard = ({ data, isSelected, onSelect, onSelectAll }) => {
  if (!data || !data.product || !data.business) {
    return null; // Or return a loading/error state
  }

  const { product, business, images, qty, overall_pay } = data;

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-5 h-5"
          />
          <Link to={`/store/${business.bus_id}`} className="font-semibold hover:text-primary">
            {business.name}
          </Link>
        </div>
        <button
          onClick={onSelectAll}
          className="text-sm text-gray-500 hover:text-primary"
        >
          Select All from Store
        </button>
      </div>

      <div className="flex gap-4">
        <img
          src={images?.[0]?.link || CakeSample}
          alt={product.prod_name}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{product.prod_name}</h3>
          <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-primary font-semibold">₱{overall_pay?.toFixed(2) || '0.00'}</p>
            <p>Quantity: {qty || 1}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;