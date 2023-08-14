import React from "react";
import Select from "react-select";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  // Add more options as needed
];

const CustomControl = ({ children, innerProps, innerRef, labelLeft, labelRight }) => (
  <div className='custom-select-control'>
    <div className='label-left'>{labelLeft}</div>
    <div className='select-container'>
      <Select {...innerProps} ref={innerRef}>
        {children}
      </Select>
    </div>
    <div className='label-right'>{labelRight}</div>
  </div>
);

const CustomSelect = () => {
  return (
    <Select
      options={options}
      components={{
        Control: ({ children, innerProps, innerRef }) => (
          <CustomControl
            innerProps={innerProps}
            innerRef={innerRef}
            labelLeft='Label on the Left'
            labelRight='Label on the Right'
          >
            {children}
          </CustomControl>
        ),
      }}
    />
  );
};

export default CustomSelect;
