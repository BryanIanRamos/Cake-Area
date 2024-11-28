import React from "react";
import { Link } from "react-router-dom";
import CakeSample from "../../assets/CakeSample.png";
import { FiMinus, FiPlus } from "react-icons/fi";

const StoreOrderCard = ({
  storeData,
  selectedItems,
  onSelectItem,
  onSelectAll,
  onUpdateQuantity,
}) => {
  const products = storeData?.products || [];
  const business = storeData?.business;

  const allSelected =
    products.length > 0 &&
    products.every((product) => selectedItems.includes(product.prod_id));

  const handleQuantityChange = (orderId, newQty) => {
    if (newQty >= 1) {
      onUpdateQuantity(orderId, newQty);
    }
  };

  const renderPrice = (product) => {
    const price = product?.price || 0;
    const originalPrice = product?.orig_price || price;
    const hasDiscount = originalPrice > price;

    return (
      <div className="flex flex-col">
        {hasDiscount && (
          <span className="text-sm text-gray-500 line-through">
            ₱{originalPrice.toFixed(2)}
          </span>
        )}
        <span className="text-primary font-semibold text-lg">
          ₱{price.toFixed(2)}
        </span>
        {hasDiscount && (
          <span className="text-xs text-green-600">
            {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      {/* Store Header with Checkbox - updated rating display */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() => onSelectAll(business?.bus_id)}
            className="w-5 h-5"
          />
          <h2 className="text-lg font-semibold">
            {business?.name || "Unknown Store"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Service Rating:</span>
          <span>{business?.service_rating || "0.0"}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">
            {business?.total_sold || 0} sold
          </span>
        </div>
      </div>

      {/* Products List - keeping existing styles */}
      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex gap-4 border-t pt-4 first:border-t-0 first:pt-0"
          >
            <input
              type="checkbox"
              checked={selectedItems.includes(product.prod_id)}
              onChange={() => onSelectItem(product.prod_id)}
              className="w-5 h-5 mt-8"
            />
            <div className="flex gap-4 flex-1">
              <img
                src={product.images || CakeSample}
                alt={product.prod_name}
                className="w-24 h-24 object-cover rounded-md"
                onError={(e) => {
                  e.target.src = CakeSample;
                  e.target.onerror = null;
                }}
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium">{product.prod_name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <div className="flex justify-between items-end mt-2">
                  <p className="text-primary text-lg font-semibold">
                    ₱{(product.price || 0).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Quantity:</span>
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              product.prod_id,
                              (product.quantity || 1) - 1
                            )
                          }
                          className="px-2 py-1 hover:bg-gray-100 rounded-l-lg"
                        >
                          <FiMinus />
                        </button>
                        <span className="px-4 py-1 border-x">
                          {product.quantity || 1}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              product.prod_id,
                              (product.quantity || 1) + 1
                            )
                          }
                          className="px-2 py-1 hover:bg-gray-100 rounded-r-lg"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>
                    <span className="text-gray-600">
                      Total: ₱
                      {((product.price || 0) * (product.quantity || 1)).toFixed(
                        2
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreOrderCard;
