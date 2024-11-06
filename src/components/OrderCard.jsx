import React from 'react';
import { LuMessagesSquare } from "react-icons/lu";
import { LuChefHat } from "react-icons/lu";
import CardProducts from './CardProducts';

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl">

      <div className="flex flex-row gap-4 md:gap-8 items-start md:items-center justify-between bg-secondary rounded-t-xl py-6 px-4 md:px-8 text-white">
        <div className='flex gap-4 md:gap-8 items-center'>
          <input type="checkbox" name="" id=""/>
          <div className="flex gap-2 items-center text-xs md:text-lg font-semibold">
            <LuChefHat size={32} className="md:size-42" />Baker |  {order.bakerName}
          </div>
          <LuMessagesSquare size={26} className="text-primary" />
        </div>
        <div>
          <div className="text-xs md:text-sm font-semibold">Order ID: {order.id}</div>
        </div>
      </div>

      <div className='flex-col'>
        {order.products.map((product, index) => (
          <CardProducts key={index} product={product} />
        ))}
       </div>

    </div>
  );
};

export default OrderCard;
