import React, { useState } from "react";
import { Icon } from "@iconify/react";
import CreateAccount from "./CreateAccount";

const SelectAccount = ({ isOpen, closeModal }) => {
  // State to track the modal content view
  const [modalView, setModalView] = useState("select"); // "select" or "customer"

  // Function to switch to the Customer view
  const openCustomerView = () => {
    setModalView("customer");
  };

  // Function to reset to the Select Account view
  const goBackToSelect = () => {
    setModalView("select");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="border w-[73vw] sm:w-[53vw] md:w-[43vw] lg:w-[35vw] h-fit p-4 sm:p-5 md:p-6 lg:p-7 bg-white">
        <div className="border-[3px] border-primary h-full p-2 md:p-3 lg:p-4 relative">
          {/* Close Button */}
          <button
            className="absolute right-1 md:right-2 lg:right-3 top-1 md:top-2 lg:top-3 text-[3.6vw] sm:text-[3vh] md:text-[2.6vw] lg:text-[1.6vw] text-primary hover:text-red-400"
            onClick={closeModal}
          >
            <Icon icon="icon-park-solid:close-one" />
          </button>

          {modalView === "select" ? (
            // Initial "Select Account" Content
            <CreateAccount openCustomerView={openCustomerView} />
          ) : (
            // Customer Account Details Content
            <div className="text-center">
              <h2 className="text-primary font-bold text-lg">
                Customer Details
              </h2>
              <p className="text-gray-600 mt-2">
                This is a different view for the Customer account creation.
              </p>
              <button
                onClick={goBackToSelect} // Goes back to main view
                className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectAccount;
