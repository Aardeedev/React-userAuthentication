import React from "react";

const CheckBox2 = ({ value, checked, handleClick }) => (
  <>
    <span>{value}</span>
    <input
      type="checkbox"
      name={value}
      checked={checked}
      onClick={() => handleClick(value)}
    />
  </>
);

export default CheckBox2;
