import React from "react";

const formatInput = (e: any) => {
  //   const formatInput = (e: any) => {
  let checkIfNum;
  if (e.key !== undefined) {
    checkIfNum =
      e.key === "e" ||
      e.key === "." ||
      e.key === "+" ||
      e.key === "-" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowUp";
  } else if (e.keyCode !== undefined) {
    checkIfNum =
      e.keyCode === 69 ||
      e.keyCode === 190 ||
      e.keyCode === 187 ||
      e.keyCode === 38 ||
      e.keyCode === 40 ||
      e.keyCode === 189;
  }
};

export default formatInput;
