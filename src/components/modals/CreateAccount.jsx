import React from "react";
import { Icon } from "@iconify/react";

const CreateAccount = ({ goBackToSelect }) => {
  return (
    <div className="text-center">
      <h2 className="text-primary font-bold text-lg">Customer Details</h2>
      <p className="text-gray-600 mt-2">
        This is a different view for the Customer account creation.
      </p>
      <button
        onClick={goBackToSelect} // Return to account selection view
        className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
      >
        Back
      </button>
    </div>
  );
};

export default CreateAccount;
