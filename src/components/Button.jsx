import React from "react";

const Button = ({
  label = "Text",
  onClick,
  type = "button",
  disabled = false,
  paddingX = "3",
  paddingY = "1",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary py-${paddingY} px-${paddingX} text-white font-semibold rounded-[4px] hover:bg-tertiary`}
    >
      {label}
    </button>
  );
};

export default Button;
