import { useEffect, useState } from "react";
import * as IMG from "../common/Images";
import {
  ProfileDropDown,
  ReportDropDown,
  HeaderLinks,
} from "../common/constants";
import { Link, useNavigate } from "react-router-dom";
import { StoreCookie } from "./sessionStore";
import { authTokenValue } from "../../screens/ReduxSetup/CartSlice";
import { useDispatch } from "react-redux";
import Overlay from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const DashboardHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth: any = localStorage.getItem("authToken");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const handleLogout = () => {
    StoreCookie.removeItem("userData");
    StoreCookie.removeItem("email");
    localStorage.clear();
    dispatch(authTokenValue(null));

    navigate("/login");
  };
  const HandleHome = () => {
    if (auth) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    if (auth) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, []);
  const HandleDisable = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      You Need To Signup Or Login For Access.
    </Tooltip>
  );
  return (
    <div className="header">
      <div className="logo">
        <button className="logobtn" onClick={HandleHome}>                 
          <img src={IMG.stocklogo} alt="" className="stock-logo" />
        </button>
      </div>
      <div className="header-menu">
        <ul className="header-ul">
          {HeaderLinks.map((head) => {
            return (
              <li className="header-list">
                {auth === null ? (
                  <Overlay
                    placement="bottom"
                    delay={{ show: 100, hide: 300 }}
                    overlay={HandleDisable}
                  >
                    <Link
                      to={head.linkid}
                      className="link-menu"
                      onClick={(event) => {
                        if (isDisabled) {
                          event.preventDefault();
                        }
                      }}
                    >
                      {head.name}
                    </Link>
                  </Overlay>
                ) : (
                  <Link to={head.linkid} className="link-menu">
                    {head.name}
                  </Link>
                )}
              </li>
            );
          })}
          <li className="header-list">
            <div className="dropdown">
              <button
                className="dropdown-toggle dropdown-btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                disabled={isDisabled}
              >
                Reports
              </button>

              <ul className="dropdown-menu dropdown-ul">
                {ReportDropDown.map((elm) => {
                  return (
                    <li>
                      <Link className="dropdown-item" to={elm.linkid}>
                        {elm.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
          <div>
            <Link
              className="dropdown-item"
              to={"/balance"}
              onClick={(event) => {
                if (isDisabled) {
                  event.preventDefault();
                }
              }}
            >
              {auth === null ? (
                <Overlay
                  placement="bottom"
                  delay={{ show: 100, hide: 300 }}
                  overlay={HandleDisable}
                >
                  <button className="header-list">
                    <img src={IMG.wallet} alt="" />
                  </button>
                </Overlay>
              ) : (
                <img src={IMG.wallet} alt="" />
              )}
            </Link>
          </div>
          <li className="header-list">
            <div className="dropdown">
              <button
                className="dropdown-toggle dropdown-btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={IMG.profile} alt="" />
              </button>
              <ul className="dropdown-menu dropdown-ul">
                {ProfileDropDown.map((elm) => {
                  return (
                    <>
                      {auth === null ? null : (
                        <li>
                          <Link className="dropdown-item" to={elm.linkid}>
                            {elm.name}
                          </Link>
                        </li>
                      )}
                    </>
                  );
                })}
                {auth === null ? null : (
                  <li
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Log Out
                  </li>
                )}

                <li>
                  {auth === null ? (
                    <Link className="dropdown-item" to={"/chooseaccount"}>
                      Signup
                    </Link>
                  ) : null}
                </li>
                <li>
                  {auth === null ? (
                    <Link className="dropdown-item" to={"/login"}>
                      Login
                    </Link>
                  ) : null}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHeader;
