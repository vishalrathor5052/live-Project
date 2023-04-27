import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../../components/carousel/Carousel";
import NavBar from "../../components/navBar/NavBar";
import MoreThanJust from "../../components/moreThanJustCakes/MoreThanJust";
import Footer from "../../components/footer/Footer";
import CustomeReview from "../../components/customerReview/CustomeReview";
import CircularCategories from "../../components/circularCategory/CircularCategory";
import LandingMenu from "../../components/landing-menu/LandingMenu";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import Image from "../../constant/Images";
import { landingConstants } from "../../constant/Constant";
import MobileMoreThanJust from "../../components/mobileMoreThanJust/MobileMoreThanJust";
import CustomerReviewMobile from "../../components/customerReviewMobile/CustomerReviewMobile";
import FooterMenuTab from "../../components/footerMenuTab/FooterMenuTab";
import { useState, useEffect, memo, useCallback, useRef } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";

const Landing = () => {
  let show = true;
  const [productItems, setProductItems] = useState([]);
  const [isLoader, setIsLoading] = useState<any>(false);
  const {
    apiResponse: { categoryList },
  } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [showCategory, setShowCategory] = useState<boolean>(false);

  // console.log("selectedCategory", selectedCategory, productItems);

  // const handleShowCategory = () => {
  //   setShowCategory((prevState: boolean) => !prevState);
  // };

  // const handleSelectedCategory = (data: any) => {
  //   var element = document.getElementById("scrollRef");
  //   element?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  //   element?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  //   setSelectedCategory({ [data.categoryName]: true });
  //   // getProduct(data.id);
  //   setShowCategory((prevState) => !prevState);
  //   setPage(0);
  // };

  return (
    <>
      <div className="landing-main">
        {isLoader ? (
          <Loader />
        ) : (
          <>
            <NavBar />
            <MobileHeader />
            <div className="main-screen">
              <div className="circle-image-slide">
                <CircularCategories color={true} />
              </div>
              <div className="circular-img">
                <div className="circle-img">
                  <div className="text-div">
                    {landingConstants.mainHeading.map((elm, index) => {
                      return (
                        <p key={index} className={elm.class}>
                          {elm.text}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* -----START SLIDER SECTION-----*/}
              <div className="slider-section">
                <div
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    width: "100%",
                    height: "100%",
                    zIndex: 11,
                  }}
                >
                  <Carousel data={landingConstants.carouselData} />
                </div>
              </div>
              {/*-----END SLIDER SECTION-----*/}
            </div>

            <div className="web_landing">
              <LandingMenu menu={false} />
            </div>
            <MoreThanJust data={landingConstants.moreThanJust} />
            <CustomeReview data={landingConstants.customerReviews} />

            {/* ...................mobile container...................... */}
            <div className="mobile-circular-main">
              <CircularCategories />
            </div>
            <div className="landing-mobile-container">
              {landingConstants.mainHeading.map((elm: any, index: number) => {
                return (
                  <p key={index} className={elm.class}>
                    {elm.text}
                  </p>
                );
              })}
              <div className="slider-container-div" id="scrollRef">
                <div className="slider-section">
                  <Carousel data={landingConstants.carouselData} />
                </div>
              </div>
              <div className="heading-div-mobile">
                <div
                  style={{
                    marginTop: "40px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="mobile-main-menu-heading"
                    // style={{
                    //   display: "flex",
                    //   position: "relative",0
                    //   margin: "0px 127px",
                    // }}
                  >
                    <div className="cat-heading-div">
                      <h4 className="heading-category">
                        {landingConstants.categories}
                      </h4>
                    </div>
                    <div className="cake-logo-div">
                      <img
                        className="cake-logo"
                        src={Image.logo}
                        alt="cake-logo"
                      />
                    </div>
                  </div>
                  <div className="menu-landing-heading-bottom-div"></div>
                </div>
              </div>
              {/* <LandingMenu show={show} menu={false} /> */}
              <div className="mobile-catagory-div-container">
                <div className="mobile-card-section-div">
                  <div className="mobile-card-main">
                    {isLoader ? (
                      <Loader />
                    ) : (
                      <div className="category-right-div">
                        {categoryList?.map((elm: any) => {
                          return (
                            <div
                              id={`${elm.categoryName}-${elm.id}`}
                              key={`${elm.categoryName}-${elm.id}`}
                              // style={{ marginTop: props.menu === false ? "0" : "95px" }}
                              className=""
                            >
                              {categoryList?.length === 0 && (
                                <div style={{ margin: "auto" }}>
                                  <img
                                    className="search-image"
                                    src={Image.searchImage}
                                    alt="search-image"
                                  />
                                </div>
                              )}
                              <h3 className="cat-heading-landing">
                                {elm.categoryName}
                              </h3>
                              <div
                                // style={{ marginTop: props.menu === false ? "0" : "95px" }}
                                className="landing-card-section"
                              >
                                {elm?.categoryDetails?.map(
                                  (elm: any, index: any) => {
                                    return (
                                      <div
                                        key={index}
                                        className="card-landing-page"
                                      >
                                        <ProductCard items={elm} />
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          );
                        })}
                        {/* {
                          productItems?.map((elm: any, index: any) => {
                            return (
                              <div key={index} className="card-landing-page">
                                <ProductCard items={elm} />
                              </div>
                            );
                          })} */}
                      </div>
                    )}
                  </div>
                  <div className="mobile-card-main">
                    <div className="mobile-card-content"></div>
                  </div>
                </div>
              </div>
              <div className="mobile-more-than-just-div">
                <MobileMoreThanJust data={landingConstants.moreThanJust} />
              </div>
              <div className="customer-review-mobile-div">
                <CustomerReviewMobile data={landingConstants.customerReviews} />
              </div>
            </div>
            <MobileFooter data={landingConstants.footerData} />
            <FooterMenuTab />
            <Footer data={landingConstants.footerData} />
          </>
        )}
      </div>
    </>
  );
};

export default memo(Landing);
