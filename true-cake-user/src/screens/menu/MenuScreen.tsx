import "./style.css";
import NavBar from "../../components/navBar/NavBar";
import ProductCard from "../../components/productCard/ProductCard";
import Footer from "../../components/footer/Footer";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import Images from "../../constant/Images";
import { landingConstants, PATH } from "../../constant/Constant";
import { useEffect, useState, memo, useRef } from "react";
import FooterMenuTab from "../../components/footerMenuTab/FooterMenuTab";
import LandingMenu from "../../components/landing-menu/LandingMenu";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";

const MenuScreen = () => {
  // const [selectedMenu, setSelectedMenu] = useState(0);
  const {
    apiResponse: { categoryList },
    userDetails: { selectedMobileCat },
  } = useSelector((state: any) => state);
  // const { userDetail, selectedMenu, selectedMobileCat } = useSelector(
  //   (state: any) => state.userDetails;
  const ref = useRef<HTMLDivElement>(document.createElement("div"));
  let show = false;

  const location = useLocation();
  const locationId = location?.state?.num;

  // useEffect(() => {
  //   setSelectedMenu(locationId);
  // }, []);

  // useEffect(() => {
  //   const selectedMenu = categoryList.find(
  //     (elm: any) => elm.categoryName === Object.keys(selectedMobileCat)[0]
  //   );
  //   if (selectedMenu) {
  //     var element = document.getElementById(
  //       `${selectedMenu.categoryName}-${selectedMenu.id}`
  //     );
  //     element?.scrollIntoView({
  //       behavior: "smooth",
  //       inline: "nearest",
  //       // block:"nearest"
  //     });

  //     console.log("element on change selectedMobileCat", element);
  //   }

  //   console.log(
  //     "selectedMenu on change selectedMobileCat",
  //     locationId,
  //     selectedMenu
  //   );
  // }, [selectedMobileCat]);

  const handleSelectedCategory = async (data: any) => {
    // await setSelectedMenu(data?.id);
    var element = document.getElementById(`${data.categoryName}-${data.id}`);
    element?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "start",
    });
    console.log("handleSelectedCategory", data, element);
  };

  return (
    <>
      <NavBar />
      <MobileHeader />
      <div ref={ref} className="main-menu-screen">
        <div className="menu-heading-mobile-sc">
          <div className="cat-heading-container">
            <div style={{ display: "flex", position: "relative" }}>
              <div className="cat-heading-div">
                <h4 className="heading-category">
                  {landingConstants.categories}
                </h4>
              </div>
              <div className="cake-logo-div">
                <img className="cake-logo" src={Images.logo} alt="cake-logo" />
              </div>
            </div>
            <div className="menu-heading-bottom-div"></div>
          </div>

          {/* <LandingMenu show={show} id={location?.state?.num} /> */}
          {/* {categoryList?.map((elm: any, idx: number) => {
            return (
              <div className="main-menu-div" key={idx}>
                <div className="list-div">
                  <a href="#">
                    <li>
                      <p
                        className={
                          elm.id === selectedMenu ? "select" : "default-color"
                        }
                        onClick={async () => {
                          await setSelectedMenu(elm.id);
                          // getProduct(elm.id);
                        }}
                      >
                        {elm.name}
                      </p>
                    </li>
                  </a>
                </div>
              </div>
            );
          })} */}
          {/* <div className="category-right-div">
            <div className="Add-to-card-section">
              {categoryList?.map((elm: any) => {
                return (
                  <div
                    id={`${elm.categoryName}-${elm.id}`}
                    key={`${elm.categoryName}-${elm.id}`}
                    // style={{ marginTop: props.menu === false ? "0" : "95px" }}
                    className="scroll-div"
                  >
                    {categoryList?.length === 0 && (
                      <div className="d-flex justify-content-center">
                        <img
                          className="search-image"
                          src={Images.searchImage}
                          alt="search-image"
                        />
                      </div>
                    )}
                    <h3 className="cat-heading-landing">{elm.categoryName}</h3>
                    <div
                      // style={{ marginTop: props.menu === false ? "0" : "95px" }}
                      className="landing-card-section"
                    >
                      {elm?.categoryDetails?.map((elm: any, index: any) => {
                        return (
                          <div key={index} className="card-landing-page">
                            <ProductCard items={elm} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>
      <div style={{ paddingTop: "0px" }}>
        <LandingMenu show={show} id={location?.state?.num} />
      </div>
      <Footer data={landingConstants.footerData} />
      <MobileFooter data={landingConstants.footerData} />
      <FooterMenuTab />
    </>
  );
};

export default memo(MenuScreen);
