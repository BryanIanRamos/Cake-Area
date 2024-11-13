import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { LuArrowUpDown } from "react-icons/lu";

// To be Cleaned
// import ToReceive from "../../components/ToReceive"; -U
// import Completed from "../../components/Completed"; -u
// import Cancelled from "../../components/Cancelled"; -u
// import Refund from "../../components/Refund"; -u
// import InProcess from "../../components/InProcess"; -u

import CartHeader from "../../components/buyer/CartHeader";
import CartTabs from "../../components/buyer/CartTabs";
import OrderCard from "../../components/buyer/OrderCard";
import CartSummary from "../../components/buyer/CartSummary";
import CartData from "../../data/CartData.json";
import InProcessData from "../../data/InProcessData.json";
import ToReceiveData from "../../data/ToRecieveData.json";
import CompletedData from "../../data/CompleteData.json";
import CancelledData from "../../data/CancelledData.json";
import RefundData from "../../data/RefundData.json";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const handleSelectItem = (id, price, quantity) => {
    setSelectedItems((prev) => {
      const isSelected = prev.find(item => item.id === id);
      if (isSelected) {
        const updatedItems = prev.filter(item => item.id !== id);
        // Check if all items are deselected
        if (updatedItems.length === 0) {
          return [];
        }
        return updatedItems;
      } else {
        return [...prev, { id, price, quantity }];
      }
    });
  };

  const handleSelectAll = (isSelected, products) => {
    if (isSelected) {
      const allItems = products.map(item => ({
        id: item.productId,
        price: item.price * item.quantity,
        quantity: item.quantity
      }));
      setSelectedItems(allItems);
    } else {
      setSelectedItems([]);
    }
  };

  useEffect(() => {
    const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
    const quantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalAmount(total);
    setTotalQuantity(quantity);
  }, [selectedItems]);

  const getOrderCount = () => {
    switch(location.pathname) {
      case '/cart':
      case '/':
        return CartData.data.length;
      case '/cart/in-process':
        return InProcessData.data.length;
      case '/cart/to-receive':
        return ToReceiveData.data.length;
      case '/cart/completed':
        return CompletedData.data.length;
      case '/cart/cancelled':
        return CancelledData.data.length;
      case '/cart/refund':
        return RefundData.data.length;
      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col justify-center gap-8">
      <CartHeader />
      <div className="flex flex-col px-4 md:px-8 lg:px-12 xl:px-32 2xl:px-72 justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between pt-24 md:pt-36">
            <div className="flex gap-2 items-center text-xl md:text-3xl font-semibold">
              <h1>My Orders</h1>
              <h1 className="bg-gray-300 px-3 rounded-md">{getOrderCount()}</h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-primary py-2 px-10 text-white rounded-lg font-semibold mt-4 md:mt-0"
            >
              Back
            </button>
          </div>
          <CartTabs />
          <hr className="bg-black" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <button className="bg-gray-100 py-2 px-4 border border-gray-300 text-gray-500 rounded-lg font-semibold flex items-center gap-2">
              <LuArrowUpDown size={20} /> Sort by
            </button>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <div className="overflow-y-auto flex-1">
                  <div className="flex flex-col gap-4 pb-36">
                    {CartData.data.map((data, index) => (
                      <OrderCard 
                        key={index} 
                        data={data} 
                        type="cart" 
                        onSelectItem={handleSelectItem}
                        onSelectAll={handleSelectAll}
                        selectedItems={selectedItems}
                      />
                    ))}
                  </div>
                </div>
              }
            />
            <Route
              path="/in-process"
              element={
                <div className="overflow-y-auto flex-1">
                  <div className="flex flex-col gap-4 pb-36">
                    {InProcessData.data.map((data, index) => (
                      <OrderCard key={index} data={data} type="in-process" />
                    ))}
                  </div>
                </div>
              }
            />
            <Route
              path="/to-receive"
              element={
                <div className="overflow-y-auto flex-1">
                  <div className="flex flex-col gap-4 pb-36">
                    {ToReceiveData.data.map((data, index) => (
                      <OrderCard key={index} data={data} type="to-receive" />
                    ))}
                  </div>
                </div>
              }
            />
            <Route
              path="/completed"
              element={
                <div className="overflow-y-auto flex-1">
                  <div className="flex flex-col gap-4 pb-36">
                    {CompletedData.data.map((data, index) => (
                      <OrderCard key={index} data={data} type="completed" />
                    ))}
                  </div>
                </div>
              }
            />
            <Route
              path="/cancelled"
              element={
                <div className="overflow-y-auto flex-1">
                  <div className="flex flex-col gap-4 pb-36">
                    {CancelledData.data.map((data, index) => (
                      <OrderCard key={index} data={data} type="cancelled" />
                    ))}
                  </div>
                </div>
              }
            />
            <Route
              path="/refund"
              element={
                <div className="overflow-y-auto flex-1">
                  <div className="flex flex-col gap-4 pb-36">
                    {RefundData.data.map((data, index) => (
                      <OrderCard key={index} data={data} type="refund" />
                    ))}
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
      <CartSummary totalAmount={totalAmount} totalQuantity={totalQuantity} />
    </div>
  );
};

export default Cart;
