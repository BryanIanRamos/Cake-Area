import React from "react";
import HideEmail from "../components/HideContact";
import RadioOption from "../components/RadioOption";

const Product = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  return (
    <div>
      <p>== Product ==</p>
      <HideEmail email={"BryanRamos3367@gmail.com"} />
      <RadioOption options={options} />
    </div>
  );
};

export default Product;
