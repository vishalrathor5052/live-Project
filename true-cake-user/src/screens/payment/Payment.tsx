import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navBar/NavBar";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import Image from "../../constant/Images";
import "./style.css";
import Images from "../../constant/Images";
import { landingConstants } from "../../constant/Constant";
const Payment = () => {
  return (
    <div className="profile-main">
      <NavBar />
      <MobileHeader />
      <div className="profile-container">
        <div className="payment-container">
          <div className="cat-heading-container">
            <div style={{ display: "flex", position: "relative" }}>
              <div className="cat-heading-div">
                <h4 className="heading-category">PAYMENT</h4>
              </div>
              <div className="cake-logo-div">
                <img className="cake-logo" src={Images.logo} alt="cake-logo" />
              </div>
            </div>
            <div className="payment-bottom-div"></div>
          </div>
          <div className="payment-right-div">
            <div className="payment-mobile-number-div">
              <p className="payment-mobile-title">MOBILE NO. : 1234567890</p>
              <img src={Images.paymentEdit} alt="" className="ms-2" />
            </div>
            <div className="truecake-right-div">
              <p className="truecake-txt">Truecakes </p>
              <p className="truecake-txt">$625.00</p>
            </div>
          </div>
        </div>
        <div className="profile-div">
          <Link
            to="/deliveryAddress"
            state={{ show: true }}
            className="main-input-div"
          >
            <div className="add-address-container">
              <div className="add-address-div">
                <p className="add-address-title">CARD</p>
              </div>
              <div>
                <img src={Image.rightarrow} alt="" className="rightArrow" />
              </div>
            </div>
          </Link>
          <Link to="/orderHistory" className="main-input-div">
            <div className="add-address-container">
              <div className="add-address-div">
                <p className="add-address-title">UPI/QR</p>
              </div>
              <div>
                <img src={Image.rightarrow} alt="" className="rightArrow" />
              </div>
            </div>
          </Link>
          <Link to="" className="main-input-div">
            <div className="add-address-container">
              <div className="add-address-div">
                <p className="add-address-title">NET BANKING</p>
              </div>
              <div>
                <img src={Image.rightarrow} alt="" className="rightArrow" />
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer data={landingConstants.footerData} />
    </div>
  );
};
export default Payment;
