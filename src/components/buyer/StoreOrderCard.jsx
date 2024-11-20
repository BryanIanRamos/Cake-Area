import React from 'react';
import { Link } from 'react-router-dom';
import CakeSample from '../../assets/CakeSample.png';
import { FiMinus, FiPlus } from 'react-icons/fi';

const StoreOrderCard = ({ storeData, selectedItems, onSelectItem, onSelectAll, onUpdateQuantity }) => {
  const { business, items } = storeData;
  
  const allSelected = items.every(item => 
    selectedItems.includes(item.order_id)
  );

  const handleQuantityChange = (orderId, newQty) => {
    if (newQty >= 1) {
      onUpdateQuantity(orderId, newQty);
    }
  };

  const renderPrice = (item) => {
    const originalPrice = item.product?.orig_price || item.product?.price;
    const currentPrice = item.product?.price;
    const hasDiscount = originalPrice > currentPrice;

    return (
      <div className="flex flex-col">
        {hasDiscount && (
          <span className="text-sm text-gray-500 line-through">
            ₱{originalPrice.toFixed(2)}
          </span>
        )}
        <span className="text-primary font-semibold text-lg">
          ₱{currentPrice.toFixed(2)}
        </span>
        {hasDiscount && (
          <span className="text-xs text-green-600">
            {Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}% OFF
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      {/* Store Header */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onSelectAll}
            className="w-5 h-5"
          />
          <Link 
            to={`/store/${business.bus_id}`} 
            className="font-semibold text-lg hover:text-primary"
          >
            {business.name}
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>⭐ {business.rating || business.store_rating || "0.0"}</span>
          <span>|</span>
          <span>{business.total_sold || 0} sold</span>
        </div>
      </div>

      {/* Order Items */}
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 py-2">
            <input
              type="checkbox"
              checked={selectedItems.includes(item.order_id)}
              onChange={() => onSelectItem(item.order_id)}
              className="w-5 h-5 mt-8"
            />
            
            <div className="flex gap-4 flex-1">
              <img
                src={item.images?.[0]?.link || CakeSample}
                alt={item.product?.prod_name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.product?.prod_name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {item.product?.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  {renderPrice(item)}
                  
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Quantity:</span>
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.order_id, (item.qty || 1) - 1)}
                        className="px-2 py-1 hover:bg-gray-100 rounded-l-lg"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4 py-1 border-x">
                        {item.qty || 1}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.order_id, (item.qty || 1) + 1)}
                        className="px-2 py-1 hover:bg-gray-100 rounded-r-lg"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-2 text-sm text-gray-600">
                  Total: ₱{((item.product?.price || 0) * (item.qty || 1)).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Store Footer */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t text-sm">
        <div className="text-gray-500">
          {items.length} item{items.length !== 1 ? 's' : ''} from this store
        </div>
        <div className="flex gap-4">
          <button className="text-gray-600 hover:text-primary">
            Chat with Seller
          </button>
          <button className="text-gray-600 hover:text-primary">
            View Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreOrderCard; 