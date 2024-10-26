import React from "react";
import { Icon } from "@iconify/react";

const CreateAccount = ({ openCustomerView }) => {
  return (
    <div className="text-center">
      <h2 className="w-full text-[3.6vw] sm:text-[2.5vw] md:text-[2.1vw] lg:text-[1.6vw] font-semibold text-primary">
        Create Account
      </h2>
      <h3 className="text-[1.9vw] sm:text-[1.3vw] md:text-[1vw] lg:text-[0.7vw] px-4 lg:px-8 text-gray-600">
        Let’s get started! Select the type of account that matches your
        goals—whether you’re here to create and share your craft or to discover
        and enjoy delicious treats.
      </h3>
      <div className="grid grid-rows-2 mt-3 sm:mt-2 md:mt-1 lg:mt-3 border mx-5 md:mx-8 md:py-2 lg:py-3">
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
          <div className="border flex flex-col items-center justify-center">
            <button
              onClick={openCustomerView} // Changes modal content
              className="hover:bg-primary w-[17vw] sm:w-[12vw] md:w-[10vw] lg:w-[8vw] py-1 text-[2vw] sm:text-[1vw] hover:text-white text-primary border-2 border-primary"
            >
              Customer
            </button>
          </div>
          <div className="border flex flex-col items-center justify-center">
            <button className="hover:bg-primary w-[17vw] sm:w-[12vw] md:w-[10vw] lg:w-[8vw] py-1 text-[2vw] sm:text-[1vw] hover:text-white text-primary border-2 border-primary">
              Baker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
