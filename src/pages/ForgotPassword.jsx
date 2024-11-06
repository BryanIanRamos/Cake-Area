import React, { useState } from "react";
import { Icon } from "@iconify/react";
import OTPInput from "../components/OTPinput";
import { useNavigate } from "react-router-dom";

const Content = ({ icon = "", title, description }) => {
  return (
    <div className="font-[Oswald] flex flex-col items-center">
      <div className="border rounded p-2 text-[4vw] sm:text-[3vw] lg:text-[2vw] mt-3">
        <Icon icon={icon} />
      </div>
      <h2 className="text-[3.2vw] md:text-[2.5vw] lg:text-[1.7vw]">{title}</h2>
      <p className="text-[2.2vw] sm:text-[1.5vw] lg:text-[1vw] text-center">
        {description}
      </p>
    </div>
  );
};

const Step1 = ({ onNext, email, emailHandler }) => {
  const navigate = useNavigate();

  // New function to validate email format
  const isValidEmail = (email) => {
    return (
      email.trim().toLowerCase().endsWith("@gmail.com") && email.length > 10
    ); // '@gmail.com' is 10 characters
  };

  // New function to get border color based on email validity
  const getEmailBorderColor = () => {
    if (!email) return "border-tertiary";
    return isValidEmail(email) ? "border-green-500" : "border-red-500";
  };

  return (
    <>
      <div className="font-[Oswald] flex flex-col items-center">
        <div className="w-[85%] sm:w-[28vw] lg:w-[22vw] flex flex-col items-center">
          <Content
            icon="heroicons:finger-print-solid"
            title="Forgot Password?"
            description="No worries, we'll send you reset instructions."
          />
          <div className="relative w-full">
            <label className="mt:3 lg:mt-4 w-full text-[2vw] sm:text-[1.5vw] lg:text-[1vw]">
              <p className="text-tertiary">Email</p>
              <input
                className={`border w-full h-6 sm:h-7 lg:h-8 p-1 ${getEmailBorderColor()}`}
                type="text"
                value={email}
                onChange={emailHandler}
                placeholder="Sample123@gmail.com"
              />
            </label>
            {email && !isValidEmail(email) && (
              <div className="absolute left-[105%] top-1/2 -translate-y-1/2 bg-white border rounded-lg p-3 shadow-lg w-max">
                {/* Triangle pointer */}
                <div className="absolute left-0 top-1/2 -translate-x-[100%] -translate-y-1/2">
                  <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-white relative left-[1px]"></div>
                  <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-gray-200 absolute right-[1px]"></div>
                </div>
                <div className="text-[1.8vw] sm:text-[1.2vw] lg:text-[0.8vw] whitespace-nowrap">
                  <p className="text-red-500">
                    <Icon icon="mdi:close-circle" className="inline mr-1" />
                    Must end with @gmail.com
                  </p>
                </div>
              </div>
            )}
          </div>
          <button
            className={`w-full py-[3px] md:py-1 lg:py-2 rounded mt-2 sm:mt-3 lg:mt-5 max-sm:text-[2vw] max-lg:text-[1.4vw] ${
              isValidEmail(email)
                ? "bg-primary text-white hover:text-primary hover:bg-white border hover:border-tertiary"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
            onClick={() => isValidEmail(email) && onNext()}
            disabled={!isValidEmail(email)}
          >
            Submit
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex gap-1 items-center text-tertiary text-[1.6vw] sm:text-[1.2vw] lg:text-[.8vw] my-1 sm:my-2 hover:underline"
          >
            <Icon icon="tabler:arrow-left" />
            <p>Back to Login</p>
          </button>
          <div className="grid grid-cols-3 gap-1 w-full h-[7px] my-1 lg:my-3">
            <div className="border w-full h-full bg-primary rounded-full"></div>
            <div className="border w-full h-full bg-gray-500 rounded-full"></div>
            <div className="border w-full h-full bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const Step2 = ({ onNext, onBack, email }) => {
  const [otpValue, setOtpValue] = useState("");

  const handleOtpSubmit = (value) => {
    setOtpValue(value);
    console.log("OTP entered:", value);
  };

  return (
    <div className="font-[Oswald] flex flex-col items-center">
      <div className="w-[85%] sm:w-[28vw] lg:w-[22vw] flex flex-col items-center">
        <Content
          icon="mdi:email-open-outline"
          title="Reset your Password"
          description={`We sent a code to ${email}.`}
        />
        <div className="mt-3 lg:mt-4 w-full">
          <OTPInput length={6} onOtpSubmit={handleOtpSubmit} />
        </div>
        <button
          className={`w-full py-[3px] md:py-1 lg:py-2 rounded mt-2 sm:mt-3 lg:mt-5 max-sm:text-[2vw] max-lg:text-[1.4vw] ${
            otpValue.length === 6
              ? "bg-primary text-white hover:text-primary hover:bg-white border hover:border-tertiary"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
          onClick={() => otpValue.length === 6 && onNext()}
          disabled={otpValue.length !== 6}
        >
          Next
        </button>
        <button
          onClick={onBack}
          className="flex gap-1 items-center text-tertiary text-[1.6vw] sm:text-[1.2vw] lg:text-[.8vw] my-1 sm:my-2 hover:underline"
        >
          <p>Change Email</p>
        </button>

        <div className="grid grid-cols-3 gap-1 w-full h-[7px] my-1 lg:my-3">
          <div className="border w-full h-full bg-primary rounded-full"></div>
          <div className="border w-full h-full bg-primary rounded-full"></div>
          <div className="border w-full h-full bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const Step3 = ({
  onBack,
  password,
  confirmPassword,
  passwordHandler,
  confirmPasswordHandler,
}) => {
  const navigate = useNavigate();

  const isValidPassword = () => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password) && password === confirmPassword;
  };

  // Password validation checks
  const hasMinLength = password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[@$!%*#?&]/.test(password);
  const passwordsMatch = password === confirmPassword;

  const getPasswordBorderColor = () => {
    if (!password) return "border-tertiary";
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password) ? "border-green-500" : "border-red-500";
  };

  const getConfirmBorderColor = () => {
    if (!confirmPassword) return "border-tertiary";
    return password === confirmPassword ? "border-green-500" : "border-red-500";
  };

  // New function to check if all password requirements are met
  const allPasswordRequirementsMet = () => {
    return hasMinLength && hasLetter && hasNumber && hasSymbol;
  };

  return (
    <div className="font-[Oswald] flex flex-col items-center">
      <div className="w-[85%] sm:w-[28vw] lg:w-[22vw] flex flex-col">
        <Content
          icon="mdi:email-open-outline"
          title="Reset your Password"
          description="Must be 8+ characters, with at least one letter, number, and symbol."
        />
        <div className="w-full px-[5%] flex flex-col items-center">
          <div className="relative w-full mt-3">
            <label className="mt:3 lg:mt-4 w-full text-[2vw] sm:text-[1.5vw] lg:text-[1vw]">
              <p className="text-tertiary">Password</p>
              <input
                className={`border w-full h-6 sm:h-7 lg:h-8 p-1 ${getPasswordBorderColor()}`}
                type="password"
                value={password}
                onChange={passwordHandler}
                placeholder="Enter your password"
              />
            </label>
            {password && !allPasswordRequirementsMet() && (
              <div className="absolute left-[105%] top-1/2 -translate-y-1/2 bg-white border rounded-lg p-3 shadow-lg w-max">
                {/* Triangle pointer */}
                <div className="absolute left-0 top-1/2 -translate-x-[100%] -translate-y-1/2">
                  <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-white relative left-[1px]"></div>
                  <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-gray-200 absolute right-[1px]"></div>
                </div>
                <div className="text-[1.8vw] sm:text-[1.2vw] lg:text-[0.8vw] whitespace-nowrap">
                  <p
                    className={hasMinLength ? "text-green-500" : "text-red-500"}
                  >
                    <Icon
                      icon={
                        hasMinLength ? "mdi:check-circle" : "mdi:close-circle"
                      }
                      className="inline mr-1"
                    />
                    Minimum 8 characters
                  </p>
                  <p className={hasLetter ? "text-green-500" : "text-red-500"}>
                    <Icon
                      icon={hasLetter ? "mdi:check-circle" : "mdi:close-circle"}
                      className="inline mr-1"
                    />
                    At least one letter
                  </p>
                  <p className={hasNumber ? "text-green-500" : "text-red-500"}>
                    <Icon
                      icon={hasNumber ? "mdi:check-circle" : "mdi:close-circle"}
                      className="inline mr-1"
                    />
                    At least one number
                  </p>
                  <p className={hasSymbol ? "text-green-500" : "text-red-500"}>
                    <Icon
                      icon={hasSymbol ? "mdi:check-circle" : "mdi:close-circle"}
                      className="inline mr-1"
                    />
                    At least one symbol (@$!%*#?&)
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="relative w-full mt-2">
            <label className="mt:3 lg:mt-4 w-full text-[2vw] sm:text-[1.5vw] lg:text-[1vw]">
              <p className="text-tertiary">Confirm Password</p>
              <input
                className={`border w-full h-6 sm:h-7 lg:h-8 p-1 ${getConfirmBorderColor()}`}
                type="password"
                value={confirmPassword}
                onChange={confirmPasswordHandler}
                placeholder="Confirm your password"
              />
            </label>
            {confirmPassword && !passwordsMatch && (
              <div className="absolute left-[105%] top-1/2 -translate-y-1/2 bg-white border rounded-lg p-3 shadow-lg w-max">
                {/* Triangle pointer */}
                <div className="absolute left-0 top-1/2 -translate-x-[100%] -translate-y-1/2">
                  <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-white relative left-[1px]"></div>
                  <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-gray-200 absolute right-[1px]"></div>
                </div>
                <div className="text-[1.8vw] sm:text-[1.2vw] lg:text-[0.8vw] whitespace-nowrap">
                  <p className="text-red-500">
                    <Icon icon="mdi:close-circle" className="inline mr-1" />
                    Passwords do not match
                  </p>
                </div>
              </div>
            )}
          </div>
          <button
            className={`w-full py-[3px] md:py-1 lg:py-2 rounded mt-2 sm:mt-3 lg:mt-5 text-[2vw] sm:text-[1.4vw] lg:text-[1vw] ${
              isValidPassword()
                ? "bg-primary text-white hover:text-primary hover:bg-white border hover:border-tertiary"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
            onClick={() => isValidPassword() && console.log("Reset password")}
            disabled={!isValidPassword()}
          >
            Reset Password
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex gap-1 items-center text-tertiary text-[1.6vw] sm:text-[1.2vw] lg:text-[.8vw] my-1 sm:my-2 hover:underline"
          >
            <Icon icon="tabler:arrow-left" />
            <p>Back to Login</p>
          </button>
          <div className="grid grid-cols-3 gap-1 w-full h-[7px] my-1 lg:my-3">
            <div className="border w-full h-full bg-primary rounded-full"></div>
            <div className="border w-full h-full bg-primary rounded-full"></div>
            <div className="border w-full h-full bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);

  // Add console.log statements
  const emailHandler = (event) => {
    setEmail(event.target.value);
    console.log("Email:", event.target.value);
  };

  const otpHandler = (value) => {
    setOtp(value);
    console.log("OTP:", value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    console.log("Password:", event.target.value);
  };

  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
    console.log("Confirm Password:", event.target.value);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#F5F5F5]">
      <div className="border w-[80%] sm:w-[60vw] lg:w-[40vw] h-fit bg-white p-3 ms:p-6">
        <div className=" w-full h-full border-[3px] border-primary p-4">
          <div className=" grid grid-cols-2 text-[1.7vw] sm:text-[1.4vw] lg:text-[1.3vw]"></div>
          {step === 1 && (
            <Step1
              onNext={handleNext}
              email={email}
              emailHandler={emailHandler}
            />
          )}
          {step === 2 && (
            <Step2 onNext={handleNext} onBack={handleBack} email={email} />
          )}
          {step === 3 && (
            <Step3
              onBack={handleBack}
              password={password}
              confirmPassword={confirmPassword}
              passwordHandler={passwordHandler}
              confirmPasswordHandler={confirmPasswordHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
