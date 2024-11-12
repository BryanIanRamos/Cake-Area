import React, { useState, useEffect } from 'react';
import { LuMessagesSquare } from "react-icons/lu";
import { LuChefHat } from "react-icons/lu";
import CardProducts from "./CardProducts";
import InProcess from "./InProcess";
import ToReceive from "./ToRecieve";
import Completed from "./Completed";
import Cancelled from "./Cancelled";
import Refund from "./Refund";

const OrderCard = ({ data, type, onTotalChange }) => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Update total calculations whenever selectedProducts changes
  useEffect(() => {
    if (onTotalChange) {
      const totalAmount = selectedProducts.reduce((sum, product) => {
        return sum + (product.price * product.quantity);
      }, 0);

      onTotalChange({
        amount: totalAmount,
        selectedProducts: selectedProducts,
        quantity: selectedProducts.reduce((sum, product) => sum + product.quantity, 0)
      });
    }
  }, [selectedProducts, onTotalChange]);

  // Handle header checkbox change
  const handleHeaderCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsAllSelected(checked);
    
    if (checked) {
      // Select all products with their current quantities
      const allProducts = data.products.map(product => ({
        ...product,
        quantity: product.quantity || 1
      }));
      setSelectedProducts(allProducts);
    } else {
      setSelectedProducts([]);
    }
  };

  // Handle individual product selection and quantity changes
  const handleProductChange = (product, isChecked, quantity = 1) => {
    setSelectedProducts(prev => {
      let newSelected;
      if (isChecked) {
        // Add or update product with current quantity and calculated total
        const updatedProduct = {
          ...product,
          quantity,
          totalPrice: product.price * quantity
        };
        newSelected = [...prev.filter(p => p.id !== product.id), updatedProduct];
      } else {
        // Remove product if unchecked
        newSelected = prev.filter(p => p.id !== product.id);
      }
      
      // Calculate and update total amount
      const totalAmount = newSelected.reduce((sum, p) => sum + p.totalPrice, 0);
      const totalQuantity = newSelected.reduce((sum, p) => sum + p.quantity, 0);
      
      if (onTotalChange) {
        onTotalChange({
          amount: totalAmount,
          quantity: totalQuantity,
          selectedProducts: newSelected
        });
      }
      
      return newSelected;
    });

    // Update isAllSelected based on whether all products are selected
    const allProducts = data.products.length;
    const selectedCount = isChecked 
      ? selectedProducts.length + 1 
      : selectedProducts.length - 1;
    setIsAllSelected(selectedCount === allProducts);
  };

  // Helper function to render the order content based on type
  const renderOrderContent = () => {
    switch(type) {
      case 'cart':
        return data.products.map((product, index) => (
          <div key={index}>
            <CardProducts 
              data={product} 
              isSelected={isAllSelected}
              onProductChange={handleProductChange}
            />
          </div>
        ));
      
      case 'in-process':
        return (
          <div className="flex justify-between">
            {/* Products */}
            <div>
              {data.products.map((product, index) => (
                <InProcess 
                  key={index} 
                  data={{
                    ...data,
                    products: product
                  }} 
                />
              ))}
            </div>
            <div className="flex flex-col justify-between my-8">
              {/* Order Dates */}
              <div className="flex justify-end gap-8 px-8 pt-4 font-semibold">
                <div>
                  <p className="text-orange-400 text-base">Order Placed</p>
                  <p className="text-sm">{data.orderDate}</p>
                </div>
                <div>
                  <p className="text-orange-400 text-base">To Receive</p>
                  <p className="text-sm">{data.receiveDate}</p>
                </div>
              </div>
              {/* Cancel Button - Only show for in-process */}
              {type === 'in-process' && (
                <div className="flex justify-end px-8 pb-4">
                  <button className="bg-[#DC3545] text-white px-8 py-2 rounded">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      case 'to-receive':
        return (
          <div className="flex justify-between">
            {/* Products */}
            <div>
              {data.products.map((product, index) => (
                <ToReceive 
                  key={index} 
                  data={{
                    ...data,
                    products: product
                  }} 
                />
              ))}
            </div>
            <div className="flex flex-col justify-between my-8">
              {/* Order Dates */}
              <div className="flex justify-end gap-8 px-8 pt-4 font-semibold">
                <div>
                  <p className="text-orange-400 text-base">Order Placed</p>
                  <p className="text-sm">{data.orderDate}</p>
                </div>
                <div>
                  <p className="text-orange-400 text-base">To Receive</p>
                  <p className="text-sm">{data.receiveDate}</p>
                </div>
              </div>
              {/* Cancel Button - Only show for in-process */}
                <div className="flex justify-end px-8 pb-4">
                  <button className="bg-[#DC3545] text-white px-8 py-2 rounded">
                    Request Refund
                  </button>
                </div>
            </div>
          </div>
        );
      case 'completed':
        return (
          <div className="flex justify-between">
            {/* Products */}
            <div>
              {data.products.map((product, index) => (
                <Completed 
                  key={index} 
                  data={{
                    ...data,
                    products: product
                  }} 
                />
              ))}
            </div>
            <div className="flex flex-col justify-between my-8">
              {/* Order Dates */}
              <div className="flex justify-end gap-8 px-8 pt-4 font-semibold">
                <div>
                  <p className="text-orange-400 text-base">Order Placed</p>
                  <p className="text-sm">{data.orderDate}</p>
                </div>
                <div>
                  <p className="text-orange-400 text-base">To Receive</p>
                  <p className="text-sm">{data.receiveDate}</p>
                </div>
              </div>
              {/* Cancel Button - Only show for in-process */}
                <div className="flex justify-end px-8 pb-4 gap-4">
                  <button className="bg-[#DC3545] text-white px-8 py-2 rounded">
                    Request Refund
                  </button>
                  <button className="bg-primary text-white px-8 py-2 rounded">
                    Rate
                  </button>
                </div>
            </div>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex justify-between">
            {/* Products */}
            <div>
              {data.products.map((product, index) => (
                <Cancelled 
                  key={index} 
                  data={{
                    ...data,
                    products: product
                  }} 
                />
              ))}
            </div>
            <div className="flex flex-col justify-between my-8">
              {/* Order Dates */}
              <div className="flex justify-end gap-8 px-8 pt-4 font-semibold">
                <div>
                  <p className="text-orange-400 text-base">Order Placed</p>
                  <p className="text-sm">{data.orderDate}</p>
                </div>
                <div>
                  <p className="text-orange-400 text-base">To Receive</p>
                  <p className="text-sm">{data.receiveDate}</p>
                </div>
              </div>
              {/* Cancel Button - Only show for in-process */}
                <div className="flex justify-end px-8 pb-4 gap-4">
                  <button className="bg-gray-300 text-black px-8 py-2 rounded">
                    Visit Shop
                  </button>
                </div>
            </div>
          </div>
        );
        case 'refund':
        return (
          <div className="flex justify-between">
            {/* Products */}
            <div>
              {data.products.map((product, index) => (
                <Refund 
                  key={index} 
                  data={{
                    ...data,
                    products: product
                  }} 
                />
              ))}
            </div>
            <div className="flex flex-col justify-between my-8">
              {/* Order Dates */}
              <div className="flex justify-end gap-8 px-8 pt-4 font-semibold">
                <div>
                  <p className="text-orange-400 text-base">Request at</p>
                  <p className="text-sm">{data.requestDate}</p>
                </div>
                <div>
                  <p className="text-[#00B517] text-base">Approved at</p>
                  <p className="text-sm">{data.completeDate}</p>
                </div>
              </div>
              {/* Details Button */}
              <div className="flex justify-end px-8 pb-4">
                <button className="bg-gray-300 text-black px-8 py-2 rounded">
                  Details
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Helper function to get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'On Delivery':
        return 'bg-[#0057E4] text-white';
      case 'Pending':
        return 'bg-[#FFB800] text-white';
      case 'Delivered':
        return 'bg-[#00B517] text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl">
      {/* Header */}
      <div className="flex flex-row gap-4 md:gap-8 items-center justify-between bg-secondary rounded-t-xl py-6 px-4 md:px-8 text-white">
        <div className='flex gap-4 md:gap-8 items-center'>
          {type === 'cart' && (
            <>
              <input 
                type="checkbox" 
                checked={isAllSelected}
                onChange={handleHeaderCheckboxChange}
                className="w-4 h-4 md:w-5 md:h-5"
              />
            </>
          )}
          <div className="flex gap-2 items-center text-xs md:text-lg font-semibold">
            <LuChefHat size={32} className="md:size-42" />Baker |  {data.bakerName}
          </div>
          <LuMessagesSquare size={26} className="text-primary cursor-pointer" />
        </div>


        <div className="flex gap-8 items-center">
          {type === 'to-receive' && data.status && (
            <div className={`px-4 py-1 rounded-md text-sm ${getStatusColor(data.status)}`}>
              {data.status}
            </div>
          )}
          {type === 'completed' && data.status && (
            <div className={`px-4 py-1 rounded-md text-sm ${getStatusColor(data.status)}`}>
              {data.status}
            </div>
          )}
          {type === 'cancelled' && data.status && (
            <div className={`px-4 py-1 rounded-md text-sm ${getStatusColor(data.status)}`}>
              {data.status}
            </div>
          )}
          <div className="text-xs md:text-sm font-semibold">Order ID: {data.id}</div>
        </div>
      </div>

      <div className='flex-col'>
        {renderOrderContent()}
      </div>
    </div>
  );
};

export default OrderCard;
