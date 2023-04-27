import { useNavigate } from "react-router-dom";
import * as IMG from "../../components/common/Images";

const Footer = () => {
  const footerText = localStorage.getItem("footerText")

  const navigate = useNavigate();
  const HandleTerms = () => {
    navigate("/terms");
  };
  const HandlePolicy = () => {
    navigate("/privacypolicy");
  };
  return (
    <div className="footer-container">
      <div className="footer-main">
        <div>
          {/* <h1>Stock Trading</h1> */}
          {/* <div className="login-logo"> */}
          <button style={{ width: "200px", height: "40px" }}>
            <img src={IMG.stocklogo} alt="" className="logo-image" />
          </button>
          <div className="footer-para">
            <p className="footer-para mobile-footer-pera">
              Address- 26,First Floor ,Laxmi Complex, Ashok Marg,Jaipur - 302001
            </p>
            <p className="footer-para mobile-footer-pera"> Mail- info@stakehub.in</p>
            <p className="footer-para mobile-footer-pera"> Mobile- 9950510599</p>
          </div>
        </div>
        <div>
          <h3 className="feature-heading mobile-feature-heading-div">Features</h3>
          <div className="footer-menu mobile-feature-heading">
            <a href="javascript:void(0)">Procedure</a>
          </div>
          <div className="footer-menu mobile-feature-heading">
            <a href="javascript:void(0)">About Us</a>
          </div>
          <div className="footer-menu mobile-feature-heading">
            <a href="javascript:void(0)">Support</a>
          </div>
          <div className="footer-menu mobile-feature-heading">
            <a href="javascript:void(0)">Pricing</a>
          </div>
        </div>

        <div>
          <h3 className="feature-heading mobile-feature-heading-div">Solution</h3>
          <div>
            <div className="footer-menu mobile-feature-heading">
              <a href="javascript:void(0)" onClick={HandleTerms}>
                Terms & Conditions
              </a>
            </div>
            <div className="footer-menu mobile-feature-heading">
              <a href="javascript:void(0)" onClick={HandlePolicy}>
                Privacy Policy
              </a>
            </div>
            <div className="footer-menu mobile-feature-heading">
              <a href="javascript:void(0)">Refund Policy</a>
            </div> 
          </div>
        </div>
      </div>
      <div className="footer-powered-by">
        <p>
          Powered by{" "}
          <a href="javascript:void(0)" className="stocktrading-footer">
            StakeHub{" "}
          </a>
          Infotech Private Limited © 2022
        </p>
      </div>
    </div>
  );
};

export default Footer;
