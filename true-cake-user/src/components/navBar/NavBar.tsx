import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Images from "../../constant/Images";
import { navItems } from "../../constant/Constant";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "../../screens/signIn/SignIn";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../../screens/reduxSetup/UserDetailsSlice";

const NavBar = (props: any) => {
  const { cartDataQuantity } = useSelector((state: any) => state.addToCart);
  const { userDetail } = useSelector((state: any) => state.userDetails);
  const [btnId, setBtnId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // const [message, setMessage] = useState("");
  // const [open, setOpen] = useState(false);
  const phoneNumber = 8073015044;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navData = navItems.filter(
    (elm: any) =>
      elm.name !== "cart" && elm.name !== "profile" && elm.name !== "login"
  );
  const navCartData = navItems.filter((elm: any) => elm.name === "cart");
  const profileData = navItems.filter((elm: any) => elm.name === "profile");
  const loginData = navItems.filter((elm: any) => elm.name === "login");

  const loginLink = () => {
    setShowModal(true);
    dispatch(
      addUserDetails({
        isVerify: false,
      })
    );
  };

  // const handleSnackBar = () => {
  //   setOpen(false);
  // };

  const callFunction = () => {
    navigate("/");
  };
  return (
    <>
      {/* {open ? (
        <ToastAlert
          openBar={open}
          message={message}
          handleSnackBar={() => handleSnackBar()}
        />
      ) : null} */}
      {showModal && <SignIn id={btnId} newShow={setShowModal} />}

      <div className="header-main">
        <div className="header-logo">
          <Link to="/">
            <img
              className="true-cake-logo"
              src={Images?.truecakelogo}
              alt="location"
            />
          </Link>
        </div>
        <div className="header-search">
          <Link
            to="/location"
            state={{ heading: "Deliver To", showbutton: false }}
          >
            <div>
              <input
                className="header-input"
                type="text"
                placeholder={
                  userDetail?.location && userDetail?.location
                }
              />
              <img
                className="location-image"
                src={Images?.location}
                alt="location"
              />
            </div>
          </Link>
          {/* <div>{userDetail.location}</div> */}
        </div>
        <div className="header-menu">
          <Link to={`https://web.whatsapp.com/send?phone=${phoneNumber}`}>
            <img src={Images.whatsapp} className="whatsapp-icon" />
          </Link>
          {navData?.map((elm: any, idx: number) => {
            return (
              <Link className="menu-text" key={idx} to={`/${elm?.name}`}>
                <img className="menu-image" src={elm?.image} alt={elm?.name} />
                <div className="text-distance">{elm?.name}</div>
              </Link>
            );
          })}
          {profileData?.map((elm: any, idx: number) => {
            return userDetail?.tokenId?.isVerify === true ? (
              <Link className="menu-text" key={idx} to={`/${elm?.name}`}>
                <img className="menu-image" src={elm?.image} alt={elm?.name} />
                <div className="text-distance">{elm?.name}</div>
              </Link>
            ) : (
              loginData?.map((elm: any, idx: number) => {
                return (
                  <Link to="" key={idx}>
                    <div
                      onClick={() => loginLink()}
                      className="text-distance menu-text"
                    >
                      <img
                        className="menu-image"
                        style={{marginRight:"5px"}}
                        src={elm?.image}
                        alt={elm?.name}
                      />
                      {elm?.name}
                    </div>
                  </Link>
                );
              })
            );
          })}
          {navCartData?.map((elm: any, idx: number) => {
            return userDetail?.tokenId?.isVerify === true ? (
              <Link to={`/${elm?.name}`}>
                <div className="menu-text" key={idx}>
                  <div>
                    {cartDataQuantity > 0 ? cartDataQuantity : ""}
                    <img
                      className="menu-image"
                      src={elm.image}
                      alt={elm.name}
                    />
                  </div>
                  <div className="text-distance">{elm?.name}</div>
                </div>
              </Link>
            ) : (
              <Link to="">
                <div className="menu-text" key={idx}>
                  <div>
                    <img
                      className="menu-image"
                      src={elm.image}
                      alt={elm.name}
                    />
                  </div>
                  <div onClick={() => loginLink()} className="text-distance">
                    {elm?.name}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <Link to="/menu">
          <div className="header-endlogo">
            <img
              className="header-endlogo-img"
              src={Images?.menuIcon}
              alt="location"
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
