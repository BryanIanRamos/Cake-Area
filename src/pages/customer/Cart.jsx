import React from "react";
import { useNavigate } from "react-router-dom";
import CartHeader from "../../components/buyer/CartHeader";
import CartTabs from "../../components/buyer/CartTabs";
import OrderCard from "../../components/buyer/OrderCard";
import { LuArrowUpDown } from "react-icons/lu";
import CartSummary from "../../components/buyer/CartSummary";

const orders = [
  {
    id: "01234",
    bakerName: "Bryan Ramos",
    products: [
      {
        productName: "Choco-Berry Surprise Cake",
        description:
          "We all have that one friend who only wants the most unique, creative gifts (or cakes). For that friend, there is this textured and delicious chocolate meringue cake. Its as beautiful as it is different.",
        price: 718.0,
        orderDate: "June 3, 2023",
        receiveDate: "June 6, 2023",
        image: "src/assets/Cake_BG.png",
      },
      {
        productName: "Choco-Berry Surprise Cake",
        description:
          "We all have that one friend who only wants the most unique, creative gifts (or cakes). For that friend, there is this textured and delicious chocolate meringue cake. Its as beautiful as it is different.",
        price: 718.0,
        orderDate: "June 3, 2023",
        receiveDate: "June 6, 2023",
        image: "src/assets/Cake_BG.png",
      },
    ],
  },
  {
    id: "012345",
    bakerName: "Aubriel Bolotaolo",
    products: [
      {
        productName: "Choco-Berry Surprise Cake",
        description:
          "We all have that one friend who only wants the most unique, creative gifts (or cakes). For that friend, there is this textured and delicious chocolate meringue cake. Its as beautiful as it is different.",
        price: 718.0,
        orderDate: "June 3, 2023",
        receiveDate: "June 6, 2023",
        image: "src/assets/Cake_BG.png",
      },
    ],
  },
  {
    id: "0123456",
    bakerName: "Angelo Galope",
    products: [
      {
        productName: "Choco-Berry Surprise Cake",
        description:
          "We all have that one friend who only wants the most unique, creative gifts (or cakes). For that friend, there is this textured and delicious chocolate meringue cake. Its as beautiful as it is different.",
        price: 718.0,
        orderDate: "June 3, 2023",
        receiveDate: "June 6, 2023",
        image: "src/assets/Cake_BG.png",
      },
      {
        productName: "Choco-Berry Surprise Cake",
        description:
          "We all have that one friend who only wants the most unique, creative gifts (or cakes). For that friend, there is this textured and delicious chocolate meringue cake. Its as beautiful as it is different.",
        price: 718.0,
        orderDate: "June 3, 2023",
        receiveDate: "June 6, 2023",
        image: "src/assets/Cake_BG.png",
      },
    ],
  },
];

const Cart = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

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
              onClick={handleBack}
              className="bg-primary py-2 px-10 text-white rounded-lg font-semibold mt-4 md:mt-0 hover:bg-primary/90 transition-colors"
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
          <div className="overflow-y-auto flex-1">
            <div className="flex flex-col gap-4 pb-36">
              {orders.map((order, index) => (
                <OrderCard key={index} order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <CartSummary totalAmount={356.5} />
    </div>
  );
};

export default Cart;
