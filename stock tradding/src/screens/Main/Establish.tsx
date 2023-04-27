import * as IMG from "../../components/common/Images";
const Establish = () => {
  return (
    <>
      <div className="how-to-start-section">
        <div className="how-to-start-left-section">
          <div className="how-to-start-div">
            <p className="simple-pricing-line"></p>
            <p className="how-to-start-title">How to start with us</p>
          </div>
          <div className="how-to-start-para">
            {/* <p>
              Description of how to start with us Lorem ipsum <br />
              dolor sit amet, consetetur sadipscing elitr.
            </p> */}
            {/* <p>How to Jumpstart Your investments</p> */}
            <img src={IMG.howtostart} alt="" className="how-to-start-image" />
          </div>
        </div>
        <div className="how-to-start-right-section">
          <div className="how-to-start-right-div">
            <div className="how-to-start-right-para">
              <img src={IMG.rightSquare} alt="" />
              <p className="how-to-start-content">
                Open account on the basis on Demat choice of account.
              </p>
            </div>
          </div>
          <div className="how-to-start-right-div">
            <div className="how-to-start-right-para">
              <img src={IMG.rightSquare} alt="" />
              <p className="how-to-start-content">
                Verify Your account by entering the details of PAN and Bank
                details which would be verified with penny drop verification.
              </p>
            </div>
          </div>
          <div className="how-to-start-right-div">
            <div className="how-to-start-right-para">
              <img src={IMG.rightSquare} alt="" />
              <p className="how-to-start-content">
                You would be able to login with your registered email id. After
                that you are good to go for buying and selling of the
                securities.
              </p>
            </div>
          </div>
          <div className="how-to-start-right-div">
            <div className="how-to-start-right-para">
              <img src={IMG.rightSquare} alt="" />
              <p className="how-to-start-content">
                Give money only when the order is executed through the facility
                of the E-mandate and sell only when the order is executed
                through CDSL easiest Facility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Establish;
