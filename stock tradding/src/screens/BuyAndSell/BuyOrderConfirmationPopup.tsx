import * as IMG from "../../components/common/Images";
const BuyOrderConfirmationPopup = () => {
  return (
    <div className="buy-popup-main">
      <div className="buy-order-container">
        <div className="buy-order-popup">
          <img src={IMG.successesfull} alt="" />
          <p className="but-order-para">
            The money request sent to your UPI app
          </p>
          <img src={IMG.IconlyBroken} alt="" className="iconlybroker" />
        </div>
      </div>
    </div>
  );
};

export default BuyOrderConfirmationPopup;
