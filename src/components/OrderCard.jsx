import React from 'react';
import { LuMessagesSquare } from "react-icons/lu";
import { LuChefHat } from "react-icons/lu";
import CardProducts from './CardProducts';
import InProcess from './InProcess';

const OrderCard = ({ data, type }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl">
      {/* Header */}
      <div className="flex flex-row gap-4 md:gap-8 items-start md:items-center justify-between bg-secondary rounded-t-xl py-6 px-4 md:px-8 text-white">
        <div className='flex gap-4 md:gap-8 items-center'>
          <input type="checkbox" name="" id=""/>
          <div className="flex gap-2 items-center text-xs md:text-lg font-semibold">
            <LuChefHat size={32} className="md:size-42" />Baker |  {data.bakerName}
          </div>
          <LuMessagesSquare size={26} className="text-primary" />
        </div>
        <div>
          <div className="text-xs md:text-sm font-semibold">Order ID: {data.id}</div>
        </div>
      </div>

      <div className='flex-col'>
        {type === 'cart' ? (
          // Render CardProducts for Cart tab
          data.products.map((product, index) => (
            <CardProducts key={index} data={product} />
          ))
        ) : (
          // For In Process tab
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
              {/* Cancel Button */}
              <div className="flex justify-end px-8 pb-4">
                <button className="bg-[#DC3545] text-white px-8 py-2 rounded">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
