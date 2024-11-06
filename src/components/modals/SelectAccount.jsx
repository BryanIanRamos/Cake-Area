import React, { useState } from "react";
import { Icon } from "@iconify/react";
import CreateAccount from "./CreateAccount";
import PropTypes from "prop-types";

const SelectAccount = ({ isOpen, closeModal }) => {
  const [modalView, setModalView] = useState("select"); // Track which view is open

  // Function to switch to the Customer view
  const openCustomerView = () => {
    setModalView("customer");
  };

  // Function to switch to the Baker view
  const openBakerView = () => {
    setModalView("baker");
  };

  // Reset to the Select Account view
  const goBackToSelect = () => {
    setModalView("select");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {modalView === "select" ? (
        <div className="border w-[73vw] sm:w-[53vw] md:w-[43vw] lg:w-[35vw] h-fit p-4 sm:p-5 md:p-6 lg:p-7 bg-white">
          <div className="border-[3px] border-primary h-full p-2 md:p-3 lg:p-4 relative">
            {/* Close Button */}
            <button
              className="absolute right-1 md:right-2 lg:right-3 top-1 md:top-2 lg:top-3 text-[3.6vw] sm:text-[3vh] md:text-[2.6vw] lg:text-[1.6vw] text-primary hover:text-red-400"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <Icon icon="icon-park-solid:close-one" />
            </button>
            {/* Account type selection view */}
            <div className="text-center">
              <h2 className="w-full text-[3.6vw] sm:text-[2.5vw] md:text-[2.1vw] lg:text-[1.6vw] font-semibold text-primary">
                Create Account
              </h2>
              <h3 className="text-[1.9vw] sm:text-[1.3vw] md:text-[1vw] lg:text-[0.7vw] px-4 lg:px-8 text-gray-600">
                Let’s get started! Select the type of account that matches your
                goals.
              </h3>
              <div className="grid grid-rows-2 mt-3 sm:mt-2 md:mt-1 lg:mt-3  mx-5 md:mx-8 md:py-2 lg:py-3">
                <div className="grid grid-cols-2 items-center justify-center">
                  <div className="flex justify-center items-center">
                    <Icon
                      icon="fluent:person-48-filled"
                      className="text-[8.5vw] sm:text-[6vw] md:text-[7vw] lg:text-[5vw] text-primary"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <Icon
                      icon="ph:chef-hat-fill"
                      className="text-[8.5vw] sm:text-[6vw] md:text-[5vw] lg:text-[5vw] text-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 items-center justify-center sm:gap-3">
                  <div className="flex flex-col items-center justify-center">
                    <button
                      onClick={openCustomerView} // Switch to customer details view
                      className="hover:bg-primary w-[17vw] sm:w-[12vw] md:w-[10vw] lg:w-[8vw] py-1 text-[2vw] sm:text-[1vw] hover:text-white text-primary border-2 border-primary"
                      aria-label="Select Customer Account"
                    >
                      Customer
                    </button>
                  </div>
                  <div className=" flex flex-col items-center justify-center">
                    <button
                      onClick={openBakerView} // Switch to baker details view
                      className="hover:bg-primary w-[17vw] sm:w-[12vw] md:w-[10vw] lg:w-[8vw] py-1 text-[2vw] sm:text-[1vw] hover:text-white text-primary border-2 border-primary"
                      aria-label="Select Baker Account"
                    >
                      Baker
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : // Display account details based on selection
      modalView === "customer" ? (
        <CreateAccount goBackToSelect={goBackToSelect} />
      ) : (
        // Here you would render the Baker view component
        <div>Baker View Content</div> // Placeholder for the Baker view
      )}
    </div>
  );
};

SelectAccount.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default SelectAccount;
