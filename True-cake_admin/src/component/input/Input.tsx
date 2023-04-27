import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { InputProps } from "../../Interface/Interface";
import "./style.css";
import formatInput from "./KeyDisable";
const Input: FC<InputProps> = ({
  label,
  placeholder,
  type,
  customStyles,
  getValue,
  error,
  value,
  onHandleChange,
  id,
  name,
  labelClass,
  disabled,
  customWidth,
  onBlur,

}) => {
  const handleKeyDown = (event: any) => {
    const keyCode = event.keyCode || event.which;
    if (
      keyCode === 38 ||
      keyCode === 40 ||
      keyCode === 46 ||
      keyCode === 43 ||
      keyCode === 45
    ) {
      // 38 is up arrow, 40 is down arrow
      event.preventDefault();
    }
  };
  
  const numberInputOnWheelPreventChange = (e: any) => {
    e.target.blur();
    e.stopPropagation();
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };
  return (
    <>
      <div className="input-main">
        <div className="input-label-div">
          <label className={labelClass}>{label}</label>
        </div>
        <div className="input-box-container">
          <Box sx={{ width: customWidth ?? "auto" }}>
            <input
              readOnly={disabled}
              value={value}
              name={name}
              id={id}
              type={type ?? "text"}
              placeholder={placeholder}
              onWheel={numberInputOnWheelPreventChange}
              onChange={onHandleChange}
              // disabled={disabled}
              className={customStyles}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              onBlur={onBlur}
            />
          </Box>
        </div>
        {error ? <p className="error-message">{error}</p> : null}
      </div>
    </>
  );
};

export default Input;
