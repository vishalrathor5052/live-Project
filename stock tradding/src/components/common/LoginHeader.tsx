import { useState } from "react";
import { stocklogo } from "../common/Images";
import { mobilemenu } from "../common/Images";
import { Link } from "react-router-dom";

const LoginHeader = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    // <div className='login-header-mobile'>
    //   <div></div>
    //   <div></div>
    // </div>
    <div className="login-mobile-header" style={{ position: "relative" }}>
      <div>
        <img src={stocklogo} alt="" className="stock-logo" />
      </div>
      <div>
        <img
          src={mobilemenu}
          width="100%"
          onClick={() => {
            setShowMobileMenu(!showMobileMenu);
          }}
        />
      </div>
      {showMobileMenu && (
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "white",
            position: "absolute",
            top: 70,
            right: 0,
          }}
        >
          <ul className="mobile-header-ul">
            <li className="mobile-header-list">Proccedure</li>
            <li className="mobile-header-list">About us</li>
            <li className="mobile-header-list">Support</li>
            <li className="mobile-header-list">Pricing</li>
            <li>
              <Link to="/login">
                <button className="login-menu">Login</button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default LoginHeader;
