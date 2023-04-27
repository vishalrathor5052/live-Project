import React, { memo, useState } from "react";
import "./style.css";
import Images from "../../constant/Images";

const QuantityCounter = (props: any) => {
  const isShow = props.isShow
  return (
    <>
      <div className="counter-main">
        <button
          className="btn-positive"
          onClick={props.subCounterHandler}
        >
          {!isShow   && <img
            className="cart-positive-btn"
            src={Images.iconMinus}
            alt="candle"
          />}
        </button>
        <div style={{marginLeft: isShow && 0}} className="quantity-number">{props.count ?? 0}</div>
        <button
          className="btn-positive"
          onClick={props.addCounterHandler}
        >
            {!isShow && <img
            className="cart-negative-btn"
            src={Images.iconPlus}
            alt="candle"
          />}
        </button>
      </div>
    </>
  );
};

export default memo(QuantityCounter);