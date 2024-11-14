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
  const [adjustedQuantities, setAdjustedQuantities] = useState({});

  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      const isSelected = prev.find(item => item.id === id);
      const adjustedQuantity = adjustedQuantities[id] || 0;

      // Find the product in CartData to get the original price and quantity
      const product = CartData.data.flatMap(order => order.products).find(product => product.productId === id);
      const price = product ? product.price : 0; // Get the original price from CartData
      const originalQuantity = product ? product.quantity : 0; // Get the original quantity from CartData

      if (isSelected) {
        return prev.filter(item => item.id !== id);
      } else {
        return [...prev, { id, price, quantity: adjustedQuantity || originalQuantity }];
      }
    });
  };

  const handleSelectAll = (isSelected, products) => {
    console.log("isSelected:", isSelected);
    console.log("products:", products);
    if (products && products.length > 0) {
      if (isSelected) {
        // When selecting all, ensure to add only unique items
        const allItems = products.map(item => ({
          id: item.productId,
          price: item.price,
          quantity: item.quantity
        }));

        // Check if any items are already selected
        const newSelectedItems = allItems.filter(item => !selectedItems.find(selected => selected.id === item.id));
        setSelectedItems(prev => [...prev, ...newSelectedItems]);
      } else {
        // Deselect all items from the current card
        const currentCardIds = products.map(item => item.productId);
        setSelectedItems(prev => prev.filter(item => !currentCardIds.includes(item.id)));
      }
    }
  };
  console.log("Selected: ", selectedItems);

  const handleQuantityChange = (id, newQuantity) => {
    setAdjustedQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }));

    const updatedItems = selectedItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Calculate total amount and quantity using updatedItems
    const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const quantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

    setTotalAmount(total);
    setTotalQuantity(quantity);
    setSelectedItems(updatedItems);
  };

  useEffect(() => {
    const total = selectedItems.reduce((sum, item) => sum + (item.price * (adjustedQuantities[item.id] || item.quantity)), 0);
    const quantity = selectedItems.reduce((sum, item) => sum + (adjustedQuantities[item.id] || item.quantity), 0);
    setTotalAmount(total);
    setTotalQuantity(quantity);
  }, [selectedItems, adjustedQuantities]);

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
                        onQuantityChange={handleQuantityChange}
                        quantity={adjustedQuantities[data.productId] || data.quantity}
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
