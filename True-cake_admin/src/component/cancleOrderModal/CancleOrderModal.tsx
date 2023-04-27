import React, { memo, useState } from "react";
import ApiComponents from "../../constant/ApiComponents";
import ButtonComponent from "../button/ButtonComponent";
import "./style.css";
import { useDispatch } from "react-redux";
import { ClosePopup } from "../../Store/CartSlice";
import { Modal } from "@mui/material";
import Image from "../../constant/Image";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
const CancleOrderModal = ({
  // onHandleAddItems,
  isOpen,
  data,
  // close,
  onHandleClose,
}: any) => {
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    onHandleClose();
    // onHandleAddItems(false);
  };

  //cancalOrder..........

  const cancalOrder = () => {
    updateOrder(data);
    // close();
  };
  const updateOrder = async (payload: any) => {
    await ApiComponents.orderStatusUpdate(payload).then((res: any) => {
      if (res?.response?.data?.message) {
        setMessage(res?.response?.data?.message);
        setOpen(true);
      } else {
        dispatch(ClosePopup(res));
        onHandleClose();
        // onHandleAddItems(false);
      }
      // dispatch(ClosePopup(res));
      // onHandleClose();
      // onHandleAddItems(false);
    });
    // close();
  };
  return (
    <>
      {open && (
        <CustomizedSnackbars
          openBar={open}
          message={message}
          handleSnackBar={() => setOpen(false)}
        />
      )}
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="cancle-order-container-modal">
          <div
            style={{
              background: "#313131",
              position: "relative",
              padding: "10px",
              textAlign: "center",
              color: "#FFFFFF",
              fontSize: "20px",
            }}
          >
            <h4>Cancel Order</h4>
            <div
              style={{
                position: "absolute",
                right: "10px",
                top: "5px",
                cursor: "pointer",
              }}
            >
              <img src={Image.cross} alt="" onClick={() => onHandleClose()} />
            </div>
          </div>
          <div className="cancle-order-modal-contained">
            <p className="cancle-order-pera">
              Are you sure you want to cancel the order. The order value is {"\u20B9"}
              {data?.refundAmount} and the refund is accepted.
            </p>
            <div className="cancle-order-bottom-div">
              <ButtonComponent
                type="button"
                title="Back"
                onClick={handleClose}
                customStyles={{
                  background: "white",
                  border: "1px solid #F8D40C !important",
                }}
              />
              <ButtonComponent
                type="button"
                title="CANCEL ORDER"
                onClick={() => cancalOrder()}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(CancleOrderModal);
