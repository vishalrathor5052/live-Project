import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navBar/NavBar";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import ImageObj from "../../constant/Images";
import "./style.css";
import React, { memo, useEffect } from "react";
import Images from "../../constant/Images";
import { landingConstants, PATH } from "../../constant/Constant";
import FooterMenuTab from "../../components/footerMenuTab/FooterMenuTab";
import { useDispatch, useSelector } from "react-redux";
import { resetProduct } from "../reduxSetup/ProductInfoSlice";
import axios from "axios";
import CircularCategory from "../../components/circularCategory/CircularCategory";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import { resetUserDetailsState } from "../../screens/reduxSetup/UserDetailsSlice";
import { resetCartState } from "../../screens/reduxSetup/CartSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state: any) => state.userDetails);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const onLogOut = () => {
    dispatch(resetUserDetailsState("logout"));
    dispatch(resetCartState("logout"));
    dispatch(resetProduct("logout"));
    axios(PATH + "user/logout", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail.tokenId?.data,
      },
    })
      .then((response) => {})
      .catch((error) => {});
  };
  return (
    <div className="profile-main">
      <NavBar />
      <MobileHeader />
      {/* <div className="circular-cat-main">
        <CircularCategory />
      </div> */}
      <div className="profile-container">
        <div className="cat-heading-container">
          <div style={{ display: "flex", position: "relative" }}>
            <div className="cat-heading-div">
              <h4 className="heading-category">PROFILE</h4>
            </div>
            <div className="cake-logo-div">
              <img className="cake-logo" src={Images.logo} alt="cake-logo" />
            </div>
          </div>
          <div className="profile-bottom-div"></div>
        </div>
        <div className="profile-div">
          <Link
            to="/editProfile"
            state={{ show: true }}
            className="profile-main-input-div"
          >
            <div className="add-address-container">
              <div className="add-address-div">
                <img src={ImageObj.edit} alt="" className="addressImages" />
                <p className="add-address-title ms-3">EDIT PROFILE</p>
              </div>
              <div>
                <img src={ImageObj.rightarrow} alt="" className="rightArrow" />
              </div>
            </div>
          </Link>
          <Link
            to="/deliveryAddressess"
            state={{ show: true }}
            className="profile-main-input-div"
          >
            <div className="add-address-container">
              <div className="add-address-div">
                <img src={ImageObj.address} alt="" className="addressImages" />
                <p className="add-address-title ms-3">ADDRESS</p>
              </div>
              <div>
                <img src={ImageObj.rightarrow} alt="" className="rightArrow" />
              </div>
            </div>
          </Link>
          <Link to="/orderhistory" className="profile-main-input-div">
            <div className="add-address-container">
              <div className="add-address-div">
                <img
                  src={ImageObj.orderHistory}
                  alt=""
                  className="addressImages"
                />
                <p className="add-address-title ms-3">ORDER HISTORY</p>
              </div>
              <div>
                <img src={ImageObj.rightarrow} alt="" className="rightArrow" />
              </div>
            </div>
          </Link>
          <Link
            to="/"
            className="profile-main-input-div"
            onClick={() => {
              onLogOut();
            }}
          >
            <div className="add-address-container">
              <div className="add-address-div">
                <img src={ImageObj.logout} alt="" className="addressImages" />
                <p className="add-address-title ms-3">LOGOUT</p>
              </div>
              <div>
                <img src={ImageObj.rightarrow} alt="" className="rightArrow" />
              </div>
            </div>
          </Link>
        </div>
      </div>
      <MobileFooter data={landingConstants.footerData} />
      <FooterMenuTab menuData={true} />
      <Footer data={landingConstants.footerData} />
    </div>
  );
};

export default memo(Profile);
