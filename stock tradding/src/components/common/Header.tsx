import { Link, useNavigate } from "react-router-dom";
import { stocklogo } from "../common/Images";
const Header = () => {
  const navigate = useNavigate();
  const HandleHome = () => {
    navigate("/");
  };
  return (
    <>
      <div
        className="header show-header"
        style={{ position: "fixed", zIndex: "111" }}
      >
        <div className="logo">
          <button className="logobtn" onClick={HandleHome}>
            <img src={stocklogo} alt="" className="stock-logo" />
          </button>
        </div>
        <div className="header-menu">
          <ul className="header-ul">
            <li className="header-list">Proccedure</li>
            <li className="header-list">About us</li>
            <li className="header-list">Support</li>
            <li className="header-list">Pricing</li>
            <li>
              <Link to="/login">
                <button className="login-menu">Login</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
