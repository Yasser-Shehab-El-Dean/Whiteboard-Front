import React from "react";

const Button = ({ type, onClick, children, className }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
