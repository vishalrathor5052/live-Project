import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as IMG from "../../components/common/Images";
import LandingCorousel from "../../components/common/LandingCorousel";
import PieChartAnimation from "../../components/common/PieChartAnime";

const Feature = (data: any) => {
  const landingPrice = localStorage.getItem("landingPrice")
  const navigates = useNavigate();
  const [seconds, setSeconds] = useState<number>(0);

  const handleSignUp = () => {
    navigates("/chooseaccount");
  };
  useEffect(() => {
    const interval = setInterval(() => {
      seconds === 100 ? setSeconds(0) : setSeconds((seconds) => seconds + 1);
    }, 74.1);
    return () => clearInterval(interval);
  }, [seconds]);
  return (
    <>
      <div className="your-stock-container">
        <div className="chart">
          <h1 className="parcentage">{seconds}</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="500px"
            height="500px"
          >
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stop-color="#e91e63" />
                <stop offset="100%" stop-color="#673ab7" />
              </linearGradient>
            </defs>
            <circle cx="150" cy="150" r="140" stroke-linecap="round" />
          </svg>
          {/* <PieChartAnimation/> */}
        </div>
        <div className="animation-main"></div>
        {/* <p className="hero-text">Hassle free Process for Investing Journey</p> */}
        <p className="hero-text">
          The Easiest Way To <span className="buy-sell-text">Buy And Sell</span>
          Your Stocks
        </p>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <button className="hero-button" onClick={handleSignUp}>
            Sign up
          </button>
        </div>
      </div>
      <div style={{ height: "300px", marginTop: 94, position:"relative", }}>
        <LandingCorousel result={data} />
      </div>

      <div className="pricing-section">
        <div className="pricing-top-heading">
          <div className="simple-pricing">
            <div style={{ display: "flex", alignItems: "center" }}>
              <p className="simple-pricing-line"></p>
              <p className="simple-pricing-para">
                Simple <span className="pricing">pricing</span> that
                <br /> works at any scale
              </p>
            </div>
            <div style={{ marginTop: 62 }}>
              <img src={IMG.pricing} alt="pricing" width={"100%"}/>
            </div>
          </div>
          <div className="lite-title-div">
            <div>
            <p className="lite">Processing Fees</p>
            <div style={{width: 40, height: 2, backgroundColor: '#7522de'}}></div>
            </div>
            <div className="plan-includes">
              <p>Plan Includes</p>
            </div>
            <div>
              <div className="lite-sub-section">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.226"
                  height="13.235"
                  viewBox="0 0 18.226 13.235"
                >
                  <path
                    id="Icon_feather-check"
                    data-name="Icon feather-check"
                    d="M19.983,9,10.37,18.613,6,14.244"
                    transform="translate(-3.879 -6.879)"
                    fill="none"
                    stroke="var(--textColor)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                </svg>

                <p className="pricing-option-text">Stamp Duty</p>
              </div>
              <div className="lite-sub-section">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.226"
                  height="13.235"
                  viewBox="0 0 18.226 13.235"
                >
                  <path
                    id="Icon_feather-check"
                    data-name="Icon feather-check"
                    d="M19.983,9,10.37,18.613,6,14.244"
                    transform="translate(-3.879 -6.879)"
                    fill="none"
                    stroke="var(--textColor)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                </svg>
                <p className="pricing-option-text">
                  Credit Instruction Charges
                </p>
              </div>
              <div className="lite-sub-section">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.226"
                  height="13.235"
                  viewBox="0 0 18.226 13.235"
                >
                  <path
                    id="Icon_feather-check"
                    data-name="Icon feather-check"
                    d="M19.983,9,10.37,18.613,6,14.244"
                    transform="translate(-3.879 -6.879)"
                    fill="none"
                    stroke="var(--textColor)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                </svg>
                <p className="pricing-option-text">Convince Fees</p>
              </div>
              <div className="lite-sub-section">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.226"
                  height="13.235"
                  viewBox="0 0 18.226 13.235"
                >
                  <path
                    id="Icon_feather-check"
                    data-name="Icon feather-check"
                    d="M19.983,9,10.37,18.613,6,14.244"
                    transform="translate(-3.879 -6.879)"
                    fill="none"
                    stroke="var(--textColor)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                </svg>
                <p className="pricing-option-text">
                  All related Charges -and taxes
                </p>
              </div>
            </div>
          </div>
          <div className="flat-title">
            <p>
              {"\u20B9"} {landingPrice}<span>Flat</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature;
