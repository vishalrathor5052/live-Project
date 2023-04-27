import React, { memo, useState } from "react";
import ButtonComponent from "../../button/ButtonComponent";
import "./style.css";
const conformMoal = ({ apiCall, closePop }: any) => {
  const handleClose = () => {
    closePop(false);
  };
  return (
    <div className="cancle-order-container-modal">
      <div className="cancle-order-modal-contained">
        <p className="cancle-order-pera">
          Are you sure you want to cancel the order. The order value is $ and
          the refund is accepted.
        </p>
        <div className="cancle-order-bottom-div">
          <ButtonComponent
            type="button"
            title="CANCEL"
            onClick={handleClose}
            customStyles={{
              background: "white",
              border: "1px solid #F8D40C !important",
              marginRight: "10px",
            }}
          />
          <ButtonComponent
            type="button"
            title="Confirm"
            onClick={() => {
              closePop(false);
              apiCall();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(conformMoal);
