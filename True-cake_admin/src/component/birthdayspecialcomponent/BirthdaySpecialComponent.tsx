import { Modal } from "@mui/material";
import { memo } from "react";
import "./birthdaySpicalStyle.css";
import Image from "../../constant/Image";
const BirthdaySpecialComponent = ({
  onHandleAddItems,
  isOpen,
  data,
  onHandleClose,
}: any) => {
  const handleClose = () => {
    onHandleClose();
  };
  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="birthdaySpecal-container">
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
            <h4>Birthday Spical: Items(Cakes)</h4>
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
          <div className="birthday-special-main">
            {data?.data?.map((data: any) => {
              return (
                <div className="birthday-special-modal-container">
                  <div className="birthday-special-left-content">
                    <div className="birthday-cake-sub-left-image">
                      <img
                        src={`http://34.200.195.34/upload/${data?.image}`}
                        alt=""
                        className="birthday-cake-img"
                      />
                    </div>
                    <div className="birthday-cake-sub-right-content">
                      <p className="chocolate-truffle">{data?.productName}</p>
                      <p className="chocolate-truffle">${data?.productPrice}</p>
                    </div>
                  </div>
                  <div className="birthday-special-right-content">
                    <button className="added-btn-birthday-special">
                      Added
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="birthday-special-button-div-modal">
            <div className="birthday-special-button-left-modal">
              <p className="item-added-pera-birthday">
                {data?.count} Item Added
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(BirthdaySpecialComponent);
