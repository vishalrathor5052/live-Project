import React from "react";
import Images from "../../constant/Images";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
const MobileHeader = () => {
  const navigate = useNavigate();
  const phoneNumber = 8073015044;
  const { userDetail } = useSelector((state: any) => state.userDetails);
  return (
    <div className="mobile-header-main">
      {/* <p>{userDetail?.location}</p> */}
    {/* <div className="mobile-header-main-inner"> */}
      <div
        onClick={() => {
          navigate("/location", {
            state: { heading: "Deliver To", showbutton: false },
          });
        }}
        className="location-icon"
      >
        <img src={Images.address} alt="" className="address-images" />
      </div>

      <img
        className="true-cake-logo"
        src={Images.truecakelogo}
        alt="location"
      />
      <div>
        <Link to={`https://wa.me/${phoneNumber}`}>
        <img src={Images.whatsapp} className="whatsapp-icon" />
        </Link>

        <Link to="/offers">
          <img src={Images.offerYellow} alt="" className="offer-image" />
        </Link>
      </div>
    {/* </div> */}
    </div>
  );
};

export default MobileHeader;
