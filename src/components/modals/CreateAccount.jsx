import React, { useState } from "react";
import { Icon } from "@iconify/react"; // Assuming you still need this for icons
import TextInput from "../TextInput";
import dayjs from "dayjs";
import DatePicker from "react-datepicker"; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS file for styling
import OrangeCheckbox from "../OrangeCheckbox";

const CreateAccount = ({ goBackToSelect }) => {
  const [fname, setFname] = React.useState("");
  const [birthDate, setBirthDate] = React.useState(null); // Initialize birthDate as null

  const handleFnameChange = (event) => {
    setFname(event.target.value);
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="border h-fit p-3 sm:p-6 lg:p-7 bg-white w-[85vw] sm:w-[88vw] md:w-[75vw] lg:w-[55vw] xl:w-[48vw] 2xl:w-[40vw]">
      <div className="text-center w-full border-[3px] border-primary h-full p-5">
        <p className="text-primary font-bold text-[18px] sm:text-[1.6rem] 2xl:text-[2rem] ">
          Create Account
        </p>
        <p className="text-gray-600 mb-3 mx-3 max-sm:text-[10px]">
          Let’s set up your account! Please fill in your information to get
          started.
        </p>

        {/* Set parent height */}
        <div className="sm:grid grid-cols-2 sm:w-fit gap-3">
          {/* TextField  */}
          <div className="">
            <div className="sm:flex gap-3 ">
              <TextInput
                label={"First Name"}
                value={fname}
                onChange={handleFnameChange}
                placeholder={"Ex. Bryan"}
              />
              <TextInput
                label={"Last Name"}
                value={fname}
                onChange={handleFnameChange}
                placeholder={"Ex. Ramos"}
              />
            </div>
            <TextInput
              label={"Email"}
              value={fname}
              onChange={handleFnameChange}
              placeholder={"Ex. Sample@gmail.com"}
            />
            <TextInput
              label={"Password"}
              value={fname}
              type="password"
              onChange={handleFnameChange}
            />
            <TextInput
              label={"Retype Password"}
              value={fname}
              type="password"
              onChange={handleFnameChange}
            />
          </div>
          <div className=" flex flex-col items-start sm:items-center justify-center max-sm:mt-2">
            <div className="flex justify-center items-center text-primary  font-semibold font-[poppins]">
              <Icon
                icon="ri:cake-3-line"
                className="sm:text-[5vw] md:text-[4vw] lg:text-[3vw] xl:text-[2.5vw]"
              />
              <p className="sm:text-[2.8vw] md:text-[2.6vw] lg:text-[2.1vw] xl:text-[1.7vw] 2xl:text-[1.4vw]">
                Birth date
              </p>
            </div>
            <p className="text-primary text-[10px] sm:text-[2vw] md:text-[1.7vw] lg:text-[1.4vw] xl:text-[1vw] 2xl:text-[0.8vw] text-center">
              Tell us about your birthday.
            </p>
            <div className="w-full flex flex-col justify-center items-start sm:items-center">
              <div className="sm:w-[25vw] md:w-[20vw] lg:w-[17vw] xl:w-[13vw] 2xl:w-[10vw] max-w-xs border border-primary flex items-center justify-center text-[14px]">
                <DatePicker
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
                  dateFormat="MM/d/yyyy" // Customize date format
                  placeholderText="October 18, 2001" // Placeholder text
                  className="w-full text-primary rounded p-2 focus:outline-none focus:shadow-none" // Add styling
                />
                <Icon
                  icon="heroicons:calendar-date-range-16-solid"
                  className="lg:text-[3vw] xl:text-[2vw] text-primary mx-2"
                />
              </div>
              <div className="flex gap-1 mt-4 items-start text-[10px] text-start px-5">
                <div className="mt-[0.5px]">
                  <OrangeCheckbox
                    label="Option 1"
                    isChecked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <p className="text-gray-600 font-[poppins]  ">
                  By creating this account, you agree to our{" "}
                  <a href="#" className="text-primary font-medium">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="" className="text-primary font-medium">
                    Privacy Policy.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 sm:gap-10 justify-center items-center  w-full mt-2">
          <button
            onClick={null}
            className="mt-4 px-8 py-2 border border-primary  text-primary  rounded hover:bg-primary hover:text-white"
          >
            Proceed
          </button>
          <button
            onClick={goBackToSelect}
            className="mt-4 px-8 py-2 border border-primary  text-primary  rounded hover:bg-primary hover:text-white"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
