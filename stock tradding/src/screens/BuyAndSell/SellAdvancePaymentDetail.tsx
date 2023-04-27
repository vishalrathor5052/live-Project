import { useNavigate, useLocation } from "react-router-dom";
import * as IMG from "../../components/common/Images";
const SellAdvancePaymentDetail = () => {
  const location = useLocation();

  const {
    companyName,
    ISIN_Number,
    typeOfOrder,
    price,
    quantity,
    brokerageAmount,
    netAmount,
    transactionId,
    validity,
  } = location?.state?.sellData;

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="sell-advance-main">
        <div className="sell-advance-container">
          <div className="sell-advance-left-content">
            <img src={IMG.back} alt="" onClick={handleCancel} />
            <p className="advance-payment-detail-para">
            CDSL sell E-dis details
            </p>
          </div>
          <div className="sell-advance-right-content">
            <p className="reference-number">
            Payment Reference Number:{' '}
              <span>12FNG56</span>
            </p>
          </div>
        </div>
        <div className="sell-advance-bottom-section">
          <div className="sell-paymentbox-main ">
            <div className="sell-paymentbox sell-summary-main" style={{height: 60}}>
              <div className="sell-payment-title">
                <p>Payments:</p>
              </div>
              <div>
                <p>200.00</p>
              </div>
            </div>
            <div className="advance-payment-container">
              <div className="advance-payment">
                <p>ADVANCE PAYMENT</p>
              </div>
              <div className="sell-date-content">
                <p className="company-name">Execution Date/Date of transfer</p>
                <p className="company-detail">20 july, 2022</p>
              </div>
              <div className="sell-date-content">
                <p className="company-name">Amount</p>
                <p className="company-detail">{"\u20B9"} 1000</p>
              </div>
              <div className="sell-date-content">
                <p className="company-name">Counter BOID</p>
                <p className="company-detail">DeMat acc no to be shown</p>
              </div>
              <div className="sell-date-content">
                <p className="company-name">Reason for trade</p>
                <p className="company-detail">For off market sale/Purchase</p>
              </div>
              <div className="sell-date-content">
                <p className="company-name">Payment Mode</p>
                <p className="company-detail">Electronic</p>
              </div>
              <div className="sell-date-content">
                <p className="company-name">Bank Name</p>
                <p className="company-detail">HDFC bank pvt ltd</p>
              </div>
              <div className="sell-date-content">
                <p className="company-name"> Bank A/c Number</p>
                <p className="company-detail">1234567890</p>
              </div>
             
              <div className="cancle-button" style={{marginTop: 25}}>
                <button className="cancle-order" onClick={handleCancel}>
                  Cancel Order
                </button>
              </div>
            </div>
          </div>

          <div className="sell-summarybox">
            <div className="sell-summary-main" style={{height: 60}}>
              <div className="sell-payment-title">
                <p>Summary:</p>
              </div>
              <div>
                <img
                  src={`http://34.203.56.127:3000/stockTradingUploads/Image1669275918056favicon.png`}
                  alt=""
                  className="companyLogo"
                />
              </div>
            </div>
            <div className="summarybox">
              <div className="sell-summary-content">
                <p className="company-name">Company Name</p>
                <p className="company-detail">{companyName}</p>
              </div>
              <div className="sell-summary-content">
                <p className="company-name">ISIN Number</p>
                <p className="company-detail">{ISIN_Number}</p>
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
                <p className="company-name">Consideration Amount</p>
                <p className="company-detail">{netAmount}</p>
              </div>
              
              <div className="cancle-button place-order-btn">
                <button className="cancle-order" onClick={handleCancel}>
                I have placed the order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellAdvancePaymentDetail;
