import { Box, Modal } from "@mui/material";
import React from "react";
import ButtonComponent from "../button/Button";
import "./style.css";

const ConfirmationPopup = ({ onHandleConfirm, onHandleCancle }: any) => {
  return (
    <Modal
      open={true}
      onClose={() => onHandleCancle()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="confirmation-modal-outside"
    >
      <Box className="confirmation-modal">
        <p>Are you sure you want to change it?</p>
        <Box
          className="confirm-modal"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "30px",
          }}
        >
          <div className="confirm-button">
            <ButtonComponent
              type="button"
              title="Yes"
              onClick={() => onHandleConfirm()}
            />
          </div>
          <div className="confirm-button">
            <ButtonComponent
              type="button"
              title="No"
              onClick={() => onHandleCancle()}
            />
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationPopup;
