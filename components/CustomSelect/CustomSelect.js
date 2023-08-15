import React from "react";
import Select from "react-select";

const CustomSelect = ({ options, onChange, value, placeholder, styles, name, onBlur }) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      styles={styles}
      className={styles}
      name={name}
      onBlur={onBlur}
    />
  );
};

export default CustomSelect;
