import React, {
  useState,
  useRef,
  useEffect,
  memo,
  useLayoutEffect,
} from "react";
import "./style.css";
import Image from "../../constant/Image";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ApiComponents from "../../constant/ApiComponents";
import { AddCategory, getAdminProfile, isHeader } from "../../Store/CartSlice";
import {StoreCookie} from "../../Auth/sessionStore"
import { useAppDispatch } from "../../Store/Store";


const Header = () => {
  const dispatch = useAppDispatch();
  const isAuthenticate = StoreCookie.getItem('userToken');
  const userData = useSelector((state:any)=>state.trueCake.adminProfile)
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [heading, setHeading] = useState<any>("");
  const {image,name}= userData?.data
  const location = useLocation();
  const { addCategory, resetHeader } = useSelector(
    (state: any) => state.trueCake
  );
  const navigator = useNavigate();
  const ref: any = useRef();


  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        event.target.className == "down-arrow" ||
        event.target.className == "change"
      ) {
        // setOpen(false);
      } else {
        setChangePassword(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
  }, [ref]);

  useEffect(() => {
    const path = location.pathname;
    const updateHeading =
      path === "/orders"
        ? "ORDERS"
        : path.includes("categorymenu")
        ? "CATEGORY/MENU"
        : path.includes("products")
        ? "PRODUCTS"
        : path.includes("offers")
        ? "OFFERS"
        : path.includes("user")
        ? "USERS"
        : path.includes("addons")
        ? "ADDONS"
        : path.includes("analytic")
        ? "ANALYTICS"
        : path.includes("config")
        ? "CONFIG"
        : path.includes("changepassword")
        ? "CHANGE PASSWORD"
        : path.includes("profilesetting")
        ? "PROFILE SETTING"
        : path.includes("/orders")
        ? "ORDERS"
        : null;

    setHeading(updateHeading);
  }, [location]);

  useEffect(() => {
    if (addCategory) {
      dispatch(AddCategory("" as any));
    }
  }, [addCategory]);

   

  useEffect(()=>{
    
  },[userData])
  

  const profileSetting = () => {
    if (changePassword == false) {
      setChangePassword(true);
    } else {
      setChangePassword(false);
    }
    // setChangePassword(true);
  };
  const handleLogOut = () => {
    localStorage.clear();
    StoreCookie.removeItem("userToken");
    StoreCookie.removeItem("userData");
    navigator("/");
    window.location.reload();
  };
  const openProfile = () => {
    navigator("/profilesetting");
  };
  return (
    <div className="dashboard-header">
      {/* for display page heading at the top left of the header */}
      <div className="">
        <h3 className="header-title">{heading}</h3>
      </div>

      <div className="dropDown" ref={ref}>
        <div
          className={`admin-content ${changePassword ? "open-dropdown" : ""}`}
        >
          {!image ? (
            <img
              className="user-profile"
              src={Image.UserProfile}
              alt=""
              onClick={openProfile}
            />
          ) : (
            <img
              className="user-profile"
              src={`http://34.200.195.34/upload/${image}`}
              alt=""
              onClick={openProfile}
            />
          )}
          <div className="user-content-div">
            <p className="login-user">{name}</p>
            <p className="admin-name">Admin</p>
          </div>
          <img
            className="down-arrow"
            src={Image.downArrow}
            alt="down arrow"
            onClick={() => profileSetting()}
          />
        </div>

        {changePassword ? (
          <div className="dropDownAdmin" ref={ref}>
            <Link ref={ref} className="change" to={"/changepassword"}>
              Change Password
            </Link>
            <Link className="change" ref={ref} to={"/"} onClick={handleLogOut}>
              Logout
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
