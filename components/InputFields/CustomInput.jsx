import React from "react";

const CustomInput = ({ name, className, type, onChange, ...restProps }) => {
  // You can use the `name`, `classes`, and `type` props as needed
  return (
    <input
      name={name}
      className={className}
      type={type}
      onChange={onChange}
      {...restProps} // Pass any additional props to the input element
    />
  );
};

export default CustomInput;
