import React, { useState, useRef } from "react";

const OTPInput = ({ length = 6, onOtpSubmit }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef(new Array(length).fill(null));

  const handleChange = (e, index) => {
    const { value } = e.target;

    // Handle pasting or typing full OTP
    if (value.length > 1) {
      const otpArray = value
        .slice(0, length)
        .split("")
        .map((char) => (isNaN(char) ? "" : char));
      setOtp(otpArray);
      onOtpSubmit(otpArray.join(""));
      return;
    }

    // Handle single character input
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onOtpSubmit(newOtp.join(""));

      // Move focus to next input if filled
      if (value && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      onOtpSubmit(newOtp.join(""));

      // Move focus to previous input if current is empty
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className="grid grid-flow-col gap-[2%] w-full">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="
            w-full 
            aspect-square 
            border 
            border-tertiary 
            text-center 
            text-[4vw] 
            sm:text-[2vw] 
            lg:text-[1.2vw] 
            outline-primary
            rounded-sm
            transition-all
            duration-200
            focus:border-primary
            focus:shadow-sm
          "
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};

export default OTPInput;
