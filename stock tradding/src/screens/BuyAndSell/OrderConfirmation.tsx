import { useState } from "react";
import * as IMG from "../../components/common/Images";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../components/common/constants";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const emandatebutton = localStorage.getItem("emandatebutton");

  const handleCancel = () => {
    navigate(-1);
  };
  const location = useLocation();
  const {
    companyName,
    companyISINNO,
    typeOfOrder,
    price,
    quantity,
    brokerageAmount,
    netAmount,
    totalOrderAmount,
    validity,
    typeOfData,
  } = location?.state?.buyData;

  const handleConfirm = () => {
    const user_ID = JSON.parse(localStorage.getItem("userId") ?? "");
    const buy_data = location?.state?.buyData;
    const buyorderData = {
      companyId: buy_data?.companyId,
      userId: user_ID,
      companyName: buy_data?.companyName,
      companyISINNO: buy_data?.companyISINNO,
      orderType: buy_data?.typeOfOrder.toLowerCase() === "limit" ? 2 : 1,
      typeOfData: buy_data?.typeOfData,
      minPrice: buy_data?.price,
      maxPrice: buy_data?.price,
      lotSize: buy_data?.quantity,
      brAmount: 0,
      validity: 1,
      netAmount: buy_data?.netAmount,
      price: buy_data?.price,
      quantity: buy_data?.quantity,
      orderStatus: buy_data?.orderStatus,
      particulars: buy_data?.particulars,
    };
    const updateData = {
      id: buy_data?.update_order_id,
      companyId: buy_data?.companyId,
      userId: user_ID,
      companyName: buy_data?.companyName,
      companyISINNO: buy_data?.companyISINNO,
      orderType: buy_data?.typeOfOrder.toLowerCase() === "limit" ? 2 : 1,
      typeOfData: buy_data?.typeOfData,
      minPrice: buy_data?.price,
      maxPrice: buy_data?.price,
      lotSize: buy_data?.quantity,
      brAmount: 0,
      validity: 1,
      netAmount: buy_data?.updated_Net_Amount,
      price: buy_data?.price,
      quantity: buy_data?.quantity,
      orderStatus: buy_data?.orderStatus,
      particulars: buy_data?.particulars,
    };

    buy_data.isUpdating
      ? axios
          .put("/companies/updateOrderBook", updateData)
          .then((res: any) => {
            if (res.status === 200) {
              navigate("/orderbook", {
                state: { buyData: location?.state?.buyData },
              });
            }
          })
          .catch((err: any) => {
            return err.response;
          })
      : axios.post("/companies/orderBook", buyorderData).then((res: any) => {
          if (res?.status === 200) {
            navigate("/orderbook", {
              state: { buyData: location?.state?.buyData },
            });
          }
        });
  };

  return (
    <div className="order-main-container">
      <div className="order-main">
        <div className="sell-advance-container buy-line">
          <div className="sell-advance-left-content ">
            <p>
              <img
                src={`http://34.203.56.127:3000/stockTradingUploads/Image1669275918056favicon.png`}
                alt=""
              />
            </p>
            <p className="advance-payment-detail-para">{companyName}</p>
          </div>
          <div className="sell-advance-right-content">
            <p className="reference-number">
              Order Total: <span>{totalOrderAmount}</span>
            </p>
          </div>
        </div>
        <div className="order-conformation-main">
          <div className="sell-summarybox">
            <div className="sell-summary-main">
              <div className="sell-payment-title">
                <p>Order Information:</p>
              </div>
              <div></div>
            </div>
            <div className="summarybox">
              <div className="sell-summary-content">
                <p className="company-name">Company Name</p>
                <p className="company-detail">{companyName}</p>
              </div>
              <div className="sell-summary-content">
                <p className="company-name">ISIN Number</p>
                <p className="company-detail">{companyISINNO}</p>
              </div>
              <div className="sell-summary-content">
                <p className="company-name">Type of order</p>
                <p className="company-detail">{typeOfOrder}</p>
              </div>
              <div className="sell-summary-content">
                <p className="company-name">Price</p>
                <p className="company-detail">{price}</p>
              </div>
              <div className="sell-summary-content">
                <p className="company-name">Quantity</p>
                <p className="company-detail">{quantity}</p>
              </div>
              <div className="sell-summary-content">
                <p className="company-name">Brokerage Amount</p>
                <p className="company-detail">{brokerageAmount}</p>
              </div>
              <div className="sell-summary-content">
                <p className="company-name">Net Amount</p>
                <p className="company-detail">{netAmount}</p>
              </div>
              <div className="sell-summary-content">
                <p className="company-name">Validity</p>
                <p className="company-detail">{validity}</p>
              </div>
            </div>
          </div>
          <div className="payment-upi-div">
            <div className="upi-right-div">
              <div className="advance-payment-container">
                <div className="advance-payment">
                  <p>Payment:</p>
                </div>
                <div
                  className="order-info-content"
                  style={{ marginTop: "40px" }}
                >
                  <div
                    className="payment-container"
                    style={{ width: "100%", cursor: "pointer" }}
                    onClick={() => handleConfirm()}
                  >
                    <div className="upi-title">
                      <p>UPI</p>
                    </div>
                    <div className="arrow-div">
                      <button>
                        <img
                          src={IMG.arrowRight}
                          alt=""
                          style={{
                            textDecoration: "none",
                            borderStyle: "none",
                          }}
                        />
                      </button>
                    </div>
                  </div>
                  {emandatebutton !== "2" && (
                    <div
                      onClick={() =>
                        emandatebutton === "0"
                          ? console.log("disable")
                          : console.log("not disable", emandatebutton)
                      }
                      className="payment-container"
                      style={{ width: "100%", marginTop: "20px" }}
                    >
                      <div className="upi-title">
                        <p>E-mandate</p>
                      </div>
                      <div className="arrow-div">
                        <img src={IMG.arrowRight} alt="" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className="cancle-button"
              style={{ float: "right", marginRight: "35px" }}
            >
              <button className="cancle-order" onClick={handleCancel}>
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderConfirmation;
