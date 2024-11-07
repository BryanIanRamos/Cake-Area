import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CartHeader from "../components/CartHeader";
import CartTabs from "../components/CartTabs";
import OrderCard from "../components/OrderCard";
import { LuArrowUpDown } from "react-icons/lu";
import CartSummary from "../components/CartSummary";
import ToReceive from "../components/ToReceive";
import Completed from "../components/Completed";
import Cancelled from "../components/Cancelled";
import Refund from "../components/Refund";
import CartData from "../data/CartData.json"
import InProcessData from "../data/InProcessData.json"
import InProcess from "../components/InProcess";
import ToReceiveData from "../data/ToReceiveData.json"


const Cart = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center gap-8">
      <CartHeader />
      <div className="flex flex-col px-4 md:px-8 lg:px-72 justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between pt-24 md:pt-36">
            <div className="flex gap-2 items-center text-xl md:text-3xl font-semibold">
              <h1>My Orders</h1>
              <h1 className="bg-gray-300 px-3 rounded-md">2</h1>
            </div>
            <button 
              onClick={() => navigate(-1)} 
              className="bg-primary py-2 px-10 text-white rounded-lg font-semibold mt-4 md:mt-0"
            >
              Back
            </button>
          </div>
          <CartTabs />
          <hr className="bg-black"/>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <button className="bg-gray-100 py-2 px-4 border border-gray-300 text-gray-500 rounded-lg font-semibold flex items-center gap-2">
              <LuArrowUpDown size={20} /> Sort by
            </button>
          </div>
          
          <Routes>
            <Route path="/" element={
              <div className="overflow-y-auto flex-1">
                <div className="flex flex-col gap-4 pb-36">
                  {CartData.data.map((data, index) => (
                    <OrderCard 
                      key={index} 
                      data={data} 
                      type="cart" 
                    />
                  ))}
                </div>
              </div>
            } />
            <Route path="/in-process" element={
              <div className="overflow-y-auto flex-1">
                <div className="flex flex-col gap-4 pb-36">
                  {InProcessData.data.map((data, index) => (
                    <OrderCard 
                      key={index} 
                      data={data} 
                      type="in-process" 
                    />
                  ))}
                </div>
              </div>
            } />
            <Route path="/to-receive" element={
              <div className="overflow-y-auto flex-1">
                <div className="flex flex-col gap-4 pb-36">
                  {ToReceiveData.data.map((data, index) => (
                    <OrderCard 
                      key={index} 
                      data={data} 
                      type="to-receive" 
                    />
                  ))}
                </div>
              </div>
            } />
            <Route path="/completed" element={<Completed />} />
            <Route path="/cancelled" element={<Cancelled />} />
            <Route path="/return-refund" element={<Refund />} />
          </Routes>
        </div>
      </div>
      <CartSummary totalAmount={356.5} />
    </div>
  );
};

export default Cart;
