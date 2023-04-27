import React, { memo, useCallback, useEffect, useState } from "react";
import Images from "../../constant/Images";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addUserDetails,
  selectMenuTab,
  selectMobileCat,
} from "../../screens/reduxSetup/UserDetailsSlice";
import SignIn from "../../screens/signIn/SignIn";

import "./style.css";

const FooterMenuTab = (props: any) => {
  // const { onHandleShowCategory } = props;
  const { userDetail, selectedMenu, selectedMobileCat } = useSelector(
    (state: any) => state.userDetails
  );
  const [btnId, setBtnId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [showCategory, setShowCategory] = useState<boolean>(false);
  // const [selectedMenu, setSelectedMenu] = useState<any>({});
  const {
    apiResponse: { categoryList },
  } = useSelector((state: any) => state);
  const { cartDataQuantity } = useSelector((state: any) => state.addToCart);

  console.log("selectedMenu: ", selectedMenu);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    const updateHeading: any = path.includes("landing")
      ? { home: true }
      : path.includes("profile")
      ? { profile: true }
      : path.includes("cart")
      ? { cart: true }
      : path.includes("search")
      ? { search: true }
      : path.includes("")
      ? { home: true }
      : {};

    if (path === "profile") {
      console.log("in profile----------");
    }
    if (path === "search") {
      console.log("in search----------");
    }
    // setSelectedItem(updateHeading);
    dispatch(selectMenuTab(updateHeading));
  }, [location]);

  const loginLink = () => {
    setShowModal(true);
    dispatch(
      addUserDetails({
        isVerify: false,
      })
    );
  };

  const handleShowCategory = async () => {
    setShowCategory((prevState) => !prevState);
    // await onHandleShowCategory((prevState: any) => !prevState);
    // await handleSelectedTab("home");
  };

  const handleSelectedTab = (data: any) => {
    // setSelectedMenu({ [data]: true });
    // dispatch(selectMenuTab({ [data]: true }));
  };

  const handleSelectedCategory = useCallback(
    (data: any) => {
      // var element = document.getElementById("scrollRef");
      // element?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
      // element?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
      dispatch(selectMobileCat({ [data.categoryName]: true }));
      // setSelectedCategory({ [data.categoryName]: true });
      navigate("/menu", { state: { num: data?.id } });
      // window.scrollTo(0, 0);
      // getProduct(data.id);
      setShowCategory((prevState) => !prevState);
      // setPage(0);
    },
    [selectedMobileCat]
  );
  console.log("setcategory", showCategory, selectedMobileCat);
  return (
    <>
      {showModal && <SignIn id={btnId} newShow={setShowModal} />}
      <div className="bottom-footer-menu">
        {showCategory && (
          <div className="showCategoryClass">
            {categoryList.map((elm: any, idx: number) => (
              <p
                key={idx}
                onClick={() => handleSelectedCategory(elm)}
                style={{
                  fontSize: "15px",
                  color:
                    selectedMobileCat && selectedMobileCat[elm.categoryName]
                      ? "#F8D40C"
                      : "#FFFFFF",
                  marginBottom: "15px",
                  fontFamily: "Source Sans Pro",
                }}
              >
                {elm?.categoryName}
              </p>
            ))}
          </div>
        )}
        <Navbar>
          <Container>
            <Nav className="me-auto">
              {/* Link for landing page  */}
              <Link
                to="/"
                onClick={() => handleSelectedTab("home")}
                className={
                  selectedMenu?.home ? "selected-menuicon-div" : "nav-link-div"
                }
              >
                <>{console.log("rendering....")}</>
                <img
                  src={selectedMenu?.home ? Images.yellowHome : Images.home}
                  alt=""
                />

                <p>Home</p>
              </Link>

              {/* Link for profile page */}
              {userDetail?.tokenId?.isVerify === true ? (
                // if user if already logedIn
                <Link
                  onClick={() => handleSelectedTab("profile")}
                  to="/profile"
                  className={
                    selectedMenu?.profile
                      ? "selected-menuicon-div"
                      : "nav-link-div"
                  }
                >
                  <img
                    src={
                      selectedMenu?.profile
                        ? Images.yellowProfile
                        : Images.profile
                    }
                    alt=""
                    className="search-footer-icon"
                  />

                  <p>Profile</p>
                </Link>
              ) : (
                // if user is not loge In
                <Link
                  to=""
                  className={
                    selectedMenu?.login
                      ? "selected-menuicon-div"
                      : "nav-link-div"
                  }
                >
                  <div
                    onClick={() => {
                      loginLink();
                      handleSelectedTab("login");
                    }}
                  >
                    <img
                      src={
                        selectedMenu?.login
                          ? Images.yellowProfile
                          : Images.profile
                      }
                      alt=""
                      className="search-footer-icon"
                    />

                    <p>Login</p>
                  </div>
                </Link>
              )}

              {/* Link for Menu page */}
              <Link to="" className="menuicon-div">
                <div onClick={() => handleShowCategory()}>
                  <img
                    src={Images.menuIcon}
                    alt=""
                    className="search-footer-icon"
                  />
                  <p>Menu</p>
                </div>
              </Link>

              {/* Link for cart page */}
              {userDetail?.tokenId?.isVerify === true ? (
                // if user if already logedIn
                <Link
                  to="/cart"
                  className={
                    selectedMenu?.cart
                      ? "selected-menuicon-div"
                      : "nav-link-div"
                  }
                >
                  <div onClick={() => handleSelectedTab("cart")}>
                    <div>
                      {" "}
                      {cartDataQuantity > 0 ? cartDataQuantity : ""}
                      <img
                        src={
                          selectedMenu?.cart ? Images.yellowCart : Images.cart
                        }
                        alt=""
                        className="search-footer-icon"
                      />
                    </div>
                    <p>Cart</p>
                  </div>
                </Link>
              ) : (
                // if user is not loge In
                <Link
                  to=""
                  className={
                    selectedMenu?.cart
                      ? "selected-menuicon-div"
                      : "nav-link-div"
                  }
                >
                  <div
                    onClick={() => {
                      handleSelectedTab("cart");
                      loginLink();
                    }}
                  >
                    <img
                      src={selectedMenu?.cart ? Images.yellowCart : Images.cart}
                      alt=""
                      className="search-footer-icon"
                    />
                    <p>Cart</p>
                  </div>
                </Link>
              )}
              <Link
                to="/search"
                className={
                  selectedMenu?.search
                    ? "selected-menuicon-div"
                    : "nav-link-div"
                }
              >
                <div onClick={() => handleSelectedTab("search")}>
                  <img
                    src={
                      selectedMenu?.search
                        ? Images.yellowSearch
                        : Images.searchIcon
                    }
                    alt=""
                    className="search-footer-icon"
                  />
                  <p>Search</p>
                  <>
                    {console.log(
                      "selectedMenu?.search: ",
                      selectedMenu?.search
                    )}
                  </>
                </div>
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default memo(FooterMenuTab);
