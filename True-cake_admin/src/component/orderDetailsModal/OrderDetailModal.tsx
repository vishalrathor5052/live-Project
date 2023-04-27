import { FC, memo, useCallback, useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import Image from "../../constant/Image";
import ButtonComponent from "../button/ButtonComponent";
import Input from "../input/Input";
import TrackOrderComponent from "../trackOrderComponent/TrackOrderComponent";
import "./style.css";
import axios from "axios";
import ApiComponents from "../../constant/ApiComponents";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import defaultImg from "../../assets/Images/common/profile.png"
import moment from "moment";
import CancleOrderModal from "../cancleOrderModal/CancleOrderModal";
import { useDispatch, useSelector } from "react-redux";
import { ClosePopup } from "../../Store/CartSlice";
interface OrderDetailModalProps {
  data?: any;
  onHandleAddItems?: any;
  isOpen?: any;
  setCancelOrder?: any;
  onHandleClose?: any;
  setUpdateOrder?: any;
}
const OrderDetailModal: FC<OrderDetailModalProps> = ({
  onHandleAddItems,
  isOpen,
  setCancelOrder,
  data,
  onHandleClose,
  setUpdateOrder,
}: any) => {
  const { closePopup } = useSelector((State: any) => State?.trueCake);
  const [url, setUrl] = useState();
  const [imageUrls, setImageUrl] = useState<any>();
  const [orderDetail, setOrderDetail] = useState<any>();
  const [customerInstruction, setCustomerInstruction] = useState<string>("");
  const [cancalOrder, setCancalOrder] = useState();
  const [refundAmount, setRefundAmount] = useState<any>();
  const [Instruction, setInstruction] = useState<string>(customerInstruction);
  const [isModal, setIsModal] = useState(false);
  const [cancalOrderPopup, setCancalOrderPopup] = useState<any>();
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, string | any>>({});
  const dispatch = useDispatch();
  const status: any =
    data?.orderStatus === 1
      ? "Order Placed"
      : data?.orderStatus === 2
      ? "Order Confirmed"
      : data?.orderStatus === 3
      ? "Order Processed"
      : data?.orderStatus === 4
      ? "Ready to pickups"
      : data?.orderStatus === 5
      ? "Cancel"
      : "";

  const paymentStatus = data?.paymentStatus === 1 ? "Paid" : "unPaid";

  const newFile = useCallback(async (data: any) => {
    const formData: any = new FormData();
    formData.append("image", data);

    await axios
      .post(`http://34.200.195.34:7000/api/uploads`, formData)
      .then((res: any) => {
        setUrl(res?.data?.data.url);
      })
      .catch((err) => console.log(err));
  }, []);

  const hadleFile = (e: any) => {
    setImageUrl(e.target.files[0].name);
    newFile(e.target.files[0]);
  };
  // getOrderDeatial.........order...........................
  const getOrderDeatial = (payload: any) => {
    ApiComponents.getOrderDeatial(payload).then((res: any) => {
      setCustomerInstruction(res[0]?.razorOrderDeatails[0]?.message);
      setOrderDetail(res[0]?.razorOrderDeatails);
    });
  };

  useEffect(() => {
    getOrderDeatial(data?.id);
  }, []);
  /**validation Refund amount
   *
   */
  const isValidated = () => {
    let isValid = true;
    let updateError = { ...error };
    if (!refundAmount) {
      updateError.refundAmount = "This field is required.";
    }
    if (refundAmount === " ") {
      updateError.refundAmount = "This field is required.";
    }

    setError(updateError);
    return isValid;
  };

  /**
   * Update your order........
   */

  const CreateProduct = () => {
    if (!(cancalOrder || refundAmount)) {
      const payload = {
        id: data?.id,
        image: url,
        message: Instruction,
      };
      updateOrder(payload);
    } else {
      // if (isValidated()) {
      const payload = {
        id: data?.id,
        orderStatus: 5,
        cancelReason: cancalOrder,
        refundAmount: +refundAmount,
      };
      // if (isValidated()) {

      setCancalOrderPopup(payload);
      setIsModal(true);
      // }
      // }
    }
  };

  const updateOrder = (payload: any) => {
    ApiComponents.orderStatusUpdate(payload).then((res: any) => {
      if (res?.response?.data?.message) {
        setMessage(res?.response?.data?.message);
        setOpen(true);
      } else {
        setMessage(res);
        setOpen(true);
        // setInstruction("");
        // setImageUrl("")
      }
    });
  };

  //close popup.......

  const handleClose = () => {
    setIsModal(false);
    // onHandleAddItems(false);
  };
  const AddItem = (boolean: boolean) => {
    setIsModal(boolean);
  };
  const handleCancal = () => {
    onHandleClose();
  };
  useEffect(() => {
    if (closePopup) {
      setMessage(closePopup);
      setOpen(true);
      // dispatch(ClosePopup(""));
    }
  }, [closePopup]);
  return (
    <>
      <div>
        {open && (
          <CustomizedSnackbars
            openBar={open}
            message={message}
            handleSnackBar={() => setOpen(false)}
          />
        )}
      </div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="order-Detail-Container">
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
            <h4>Order Details</h4>
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
          <div className="order-detail-modal-main">
            <div className="order-detail-modal-left-div">
              <h4 className="order-detail-modal-heading">
                Order Number: #{data?.razorpayOrderId}
              </h4>
              <p className="order-detail-modal-pera">Items Summary-</p>
              <div className="orderdetail">
                <div>
                  {orderDetail?.map((elm: any) => {
                    return (
                      <div className="orderHistory-card-div">
                        <div className="orderHistory-left-div">
                          <p
                            className=" orderHistory-para"
                            // style={{
                            //   width: "70px",
                            //   height: "80px",
                            //   objectFit: "cover",
                            // }}
                          >
                            <img
                              src={`http://34.200.195.34/upload/${elm?.image}`}
                              alt="cake"
                              className="cakeImage"
                            />
                          </p>
                          <p
                            className="orderHistory-para "
                            id="orderHistory-heading"
                          >
                            {elm?.productName}
                          </p>
                          <p className="orderHistory-para">
                            {elm?.measurmentSymbol}
                          </p>
                          <p className="orderHistory-para">
                            Quantity:- {elm?.quantity}
                          </p>
                          <p className="orderHistory-price">
                            Price:- ${elm?.price}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="order-detail-modal-content-div">
                  <p className="order-detail-modal-pera order-detail-modal-date-content">
                    Date of Order:{" "}
                    {moment(data?.dateOfOrder).format("DD/MMMM/YYYY")}
                  </p>
                  <p className="order-detail-modal-pera">
                    Delivery Date/Time:{" "}
                    {data?.deliveryDateAndTime &&
                      moment(data?.deliveryDateAndTime?.slice(0, 24)).format(
                        "YYYY-MM-DD"
                      ) +
                        " " +
                        data?.deliveryDateAndTime
                          ?.replace(/2.*m/, " ")
                          .replace(/t.*M/, "")}
                    {/* {moment
                      .utc((data?.deliveryDateAndTime).slice(0, 7))
                      .format("DD MMMM YYYY") +
                      "," +
                      moment((data?.deliveryDateAndTime).slice(28, 35)).format(
                        "HH:MM"
                      )} */}
                  </p>
                  <p className="order-detail-modal-pera">
                    Address: {data?.address}{" "}
                  </p>
                  <p className="order-detail-modal-pera">
                    {" "}
                    Phone No.: {data?.mobileNo}
                  </p>
                  <p className="order-detail-modal-pera">
                    Customer Name: {data?.customername}{" "}
                  </p>
                  <p className="order-detail-modal-pera">
                    Payment Status: {paymentStatus}{" "}
                  </p>
                  <p className="order-detail-modal-pera">Status: {status}</p>
                </div>
              </div>
              <div className="order-detail-modal-upload-image-div">
                <h4 className="order-detail-modal-update-image-heading">
                  Upload Image:
                </h4>
                <div className="order-detail-modal-sub-div">
                  <div className="order-detail-modal-sub-main">
                    <div className="order-detail-modal-input-box">
                      {imageUrls}
                    </div>
                    <div className="">
                      <Button
                        variant="outlined"
                        component="label"
                        className="browse-button-order-detail-modal"
                      >
                        Browse
                        <input
                          hidden
                          accept="image/*"
                          multiple
                          type="file"
                          onChange={(e: any) => {
                            // setError((prev) => ({ ...prev, imageUrls: "" }));
                            hadleFile(e);
                          }}
                        />
                      </Button>
                    </div>
                  </div>
                  <div className="order-detail-modal-image">
                      <img
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={ url ? `http://34.200.195.34/upload/${url}` :defaultImg}
                        alt=""
                      />
                  </div>
                </div>
                <div className="order-detail-customer-instruction-div">
                  <h4
                    className="customer-instruction-heading"
                    placeholder="Happy Birthday, John!"
                  >
                    Customer Instruction
                  </h4>
                  <div className="order-detail-modal-refund-amount">
                    <Input
                      value={Instruction}
                      placeholder=""
                      onHandleChange={(e: any) =>
                        setInstruction(e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="order-detail-cancle-order-div">
                  <h4
                    className="cancle-order-heading"
                    placeholder="Reason for Cancellation"
                  >
                    Cancel Order
                  </h4>
                  <div className="order-detail-modal-refund-amount">
                    <Input
                      value={cancalOrder}
                      placeholder="Reason for Cancellation"
                      onHandleChange={(e: any) =>
                        setCancalOrder(e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="refund-accept-order-detail-div">
                  <img src={Image.tickSquare} alt="" />
                  <p className="order-detail-refund-accepted-pera">
                    Refund Accepted
                  </p>
                </div>
                <div className="order-detail-modal-refund-amount">
                  <Input
                    value={refundAmount}
                    type="number"
                    placeholder="Refund Amount"
                    onHandleChange={(e: any) => {
                      setError((prev) => ({ ...prev, offerPrice: "" }));
                      setRefundAmount(e.target.value);
                    }}
                    error={error.refundAmount}
                  />
                </div>
              </div>
            </div>

            <div className="order-detail-modal-right-div">
              <h4 className="track-order-heading">Track Order:</h4>
              <TrackOrderComponent data={data} />
              <div className="track-order-bottom-div">
                <ButtonComponent
                  type="button"
                  title="CANCEL"
                  onClick={() => handleCancal()}
                  customStyles={{
                    background: "white",
                    border: "1px solid #F8D40C !important",
                    paddingLeft: "25px",
                  }}
                />
                <ButtonComponent
                  type="button"
                  title="SAVE"
                  onClick={() => CreateProduct()}
                  customStyles={{
                    paddingLeft: "25px",
                  }}
                />
              </div>
            </div>
            {isModal && (
              <CancleOrderModal
                onHandleClose={handleClose}
                data={cancalOrderPopup ? cancalOrderPopup : ""}
                setUpdateOrder={setUpdateOrder}
              />
            )}
            {/* {isModal && (
              <ModalComponent
                Children="cancleOrder"
                isModal={setIsModal}
                ispopup={setIsModal}
                isPopupLable={isModal}
                CloseAll={() => {
                  setCancelOrder("cancel");
                  handleClose();
                  isOpen();
                }}
                // CloseAll={isModal}
                modaltitle="Add Lable"
                addItems={(boolean: boolean) => AddItem(boolean)}
                data={cancalOrderPopup}
              />
            )} */}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(OrderDetailModal);
