import React, { useState } from "react";
import { Icon } from "@iconify/react";

const SuccessFeedback = ({ amount, gcashNumber, onClose }) => {
  return (
    <div className="text-center space-y-4">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="bg-green-100 p-3 rounded-full">
          <Icon 
            icon="ph:check-circle-fill" 
            className="text-5xl text-green-500"
          />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-800">
          Withdrawal Successful!
        </h3>
        <p className="text-gray-600">
          Your withdrawal has been processed successfully.
        </p>
      </div>

      {/* Transaction Details */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Amount:</span>
          <span className="font-medium">₱ {parseFloat(amount).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">GCash Number:</span>
          <span className="font-medium">{gcashNumber}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Transaction ID:</span>
          <span className="font-medium">{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Done
      </button>
    </div>
  );
};

const WithdrawModal = ({ isOpen, onClose, balance }) => {
  const [amount, setAmount] = useState("");
  const [gcashNumber, setGcashNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: Initial form, 2: OTP verification, 3: Success
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    
    // Validate amount
    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    } else if (parseFloat(amount) > balance) {
      newErrors.amount = "Amount exceeds available balance";
    }

    // Validate GCash number
    if (!gcashNumber) {
      newErrors.gcashNumber = "GCash number is required";
    } else if (!/^09\d{9}$/.test(gcashNumber)) {
      newErrors.gcashNumber = "Please enter a valid GCash number (e.g., 09123456789)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Move to OTP step
      setStep(2);
      // Simulate sending OTP
      setIsOtpSent(true);
      // Here you would typically make an API call to send the OTP
      console.log("OTP sent to:", gcashNumber);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace if current input is empty
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      setOtpError("Please enter all 6 digits");
      return;
    }

    // Here you would verify the OTP with your backend
    console.log("Withdrawal requested:", { amount, gcashNumber, otp: otpValue });
    // Move to success step
    setStep(3);
  };

  const handleResendOtp = () => {
    // Reset OTP fields
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    // Here you would make an API call to resend the OTP
    console.log("Resending OTP to:", gcashNumber);
  };

  const handleClose = () => {
    // Reset all states
    setAmount("");
    setGcashNumber("");
    setErrors({});
    setStep(1);
    setOtp(["", "", "", "", "", ""]);
    setIsOtpSent(false);
    setOtpError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {step !== 3 && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {step === 1 ? "Withdraw Funds" : "Verify OTP"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <Icon icon="ph:x-bold" className="text-xl" />
            </button>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleInitialSubmit} className="space-y-4">
            {/* Available Balance */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-bold text-gray-800">₱ {balance.toFixed(2)}</p>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount to Withdraw
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₱</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="0.00"
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
              )}
            </div>

            {/* GCash Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GCash Number
              </label>
              <input
                type="text"
                value={gcashNumber}
                onChange={(e) => setGcashNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="09123456789"
              />
              {errors.gcashNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.gcashNumber}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Continue
            </button>
          </form>
        ) : step === 2 ? (
          <div className="space-y-4">
            {/* OTP Information */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Please enter the 6-digit code sent to
              </p>
              <p className="font-medium text-gray-800">{gcashNumber}</p>
            </div>

            {/* OTP Input Fields */}
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-red-500 text-xs text-center">{otpError}</p>
              )}

              {/* Resend OTP */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-primary text-sm hover:underline"
                >
                  Resend Code
                </button>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Verify & Withdraw
              </button>
            </form>
          </div>
        ) : (
          <SuccessFeedback 
            amount={amount}
            gcashNumber={gcashNumber}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default WithdrawModal; 