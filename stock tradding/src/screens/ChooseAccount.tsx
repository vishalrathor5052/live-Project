import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as IMG from "../components/common/Images";
import { useDispatch } from "react-redux";
import { roles } from "./ReduxSetup/CartSlice";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
const ChooseAccount = () => {
  const checkSkip = localStorage.getItem("displaySkip");

  const regularAccountTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Buy shares in your normal account opened with any broker.
    </Tooltip>
  );
  const partnerAccountTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      A complete account dedicated to your private equity investment. With this
      account you could buy and sell your investments. Also enjoy NO AMC or low
      AMC on basis of number of transactions
    </Tooltip>
  );

  useEffect(() => {
    const theme: any =
      localStorage.getItem("theme") ?? JSON.stringify("light-theme");
    if (theme) {
      document.body.className = JSON.parse(theme);
    } else {
      document.body.className = theme;
    }
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const skip = () => {
    localStorage.clear();
    navigate("/dashboard");
  };
  const HandleBack = () => {
    navigate(-1);
  };
  const navigateToSignup = () => {
    localStorage.setItem("role", "3");
    dispatch(roles(3));
    navigate("/signup");
  };
  const SignupToPartnerBrokerAccout = () => {
    localStorage.setItem("role", "4");
    dispatch(roles(4));
    navigate("/signup");
  };
  return (
    <div className="choose-ac-main">
      <div>
        {checkSkip !== "0" && (
          <button onClick={skip} className="skip">
            Skip
          </button>
        )}
      </div>
      <div className="choose-account-container">
        <div>
          <img src={IMG.blacklogo} alt="" className="mobile-view-logo" />
        </div>

        <div className="choose-signup">
          <div className="back-button">
            <button
              onClick={HandleBack}
              style={{ borderStyle: "none", backgroundColor: "transparent" }}
            >
              <img src={IMG.back} alt="" className="mobile-view-back" />
            </button>
          </div>

          <div className="choose-account-title">Choose account for sign up</div>
          <div className="back-right"></div>
        </div>
        <div className="choose-account-box-container mobile-view-choose-account-box-container">
          <div
            style={{
              width: "100%",
            }}
          >
            <div className="choose-account-middle-box">
              <OverlayTrigger
                placement="right"
                delay={{ show: 100, hide: 300 }}
                overlay={regularAccountTooltip}
              >
                <div className="icon-right">
                  <img
                    src={IMG.infoIcon}
                    alt="infoIcon"
                    className="regular-demat-hover-hide"
                  />
                  <img
                    src={IMG.infoIconWhite}
                    alt="infoIcon"
                    className="regular-demat-hover-show"
                  />
                </div>
              </OverlayTrigger>
              <button
                className="choose-account-content"
                onClick={navigateToSignup}
              >
                <div>
                  <img
                    src={IMG.regularDemat}
                    alt=""
                    className="regular-demat-hover-hide mobile-view-regular-demate-icon"
                  />
                  <img
                    src={IMG.regularDematWhite}
                    alt=""
                    className="regular-demat-hover-show mobile-view-regular-demate-icon"
                  />
                </div>
                <div>
                  <p className="regular-demat-ac">Regular Demat Account</p>
                </div>
              </button>
            </div>
          </div>
          <div
            style={{
              marginTop: 30,
              width: "100%",
            }}
          >
            <div className="choose-account-middle-box choose-account-two">
              <OverlayTrigger
                placement="right"
                delay={{ show: 100, hide: 300 }}
                overlay={partnerAccountTooltip}
              >
                <div className="icon-right">
                  <img
                    src={IMG.infoIcon}
                    alt="infoIcon"
                    className="regular-demat-hover-hide"
                  />
                  <img
                    src={IMG.infoIconWhite}
                    alt="infoIcon"
                    className="regular-demat-hover-show"
                  />
                </div>
              </OverlayTrigger>
              <button
                className="choose-account-content"
                onClick={SignupToPartnerBrokerAccout}
              >
                <div>
                  <img
                    src={IMG.partnerBroker}
                    alt=""
                    className="regular-demat-hover-hide mobile-view-regular-demate-icon"
                  />
                  <img
                    src={IMG.parterBrokerWhite}
                    alt=""
                    className="regular-demat-hover-show mobile-view-regular-demate-icon"
                  />
                </div>
                <div>
                  <p className="regular-demat-ac">Partner Broker Account</p>
                  <p className="hindustan-title">[Hindustan Tradecom]</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseAccount;
