import { useState, useEffect, memo } from "react";
import "./style.css";
import ProductCard from "../../components/productCard/ProductCard";
import Images from "../../constant/Images";
import { landingConstants } from "../../constant/Constant";
import { useSelector } from "react-redux";

const LandingMenu = (props: any) => {
  const [selectedMenu, setSelectedMenu] = useState(props.id);

  const {
    apiResponse: { categoryList },
    userDetails: { selectedMobileCat },
  } = useSelector((state: any) => state);

  useEffect(() => {
    setSelectedMenu(props.id ?? categoryList[0]?.id);
    const redirect = categoryList.find((elm: any) => elm.id === props.id);
    if (redirect) {
      var element = document.getElementById(
        `${redirect.categoryName}-${redirect.id}`
      );
      element?.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "start",
      });
      handleScroll("");
      console.log("redirect", redirect, element, "props.id", props.id);
    }
  }, [selectedMobileCat]);

  const handleScroll = (e: any) => {
    console.log("handleScroll", e);
  };

  const handleSelectedCategory = async (data: any) => {
    await setSelectedMenu(data?.id);
    var element = document.getElementById(`${data.categoryName}-${data.id}`);
    element?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "start",
    });
    console.log("handleSelectedCategory", data, element);
  };

  return (
    <div
      className="landing-offer-mai landing-offer-main-mobile scroll-div-web-parent"
      id="landingTop"
      onScroll={(e: any) => handleScroll(e)}
    >
      <div className="category-left-div">
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
          <div className="menu-bottom-div"></div>
        </div>
        <div className="landing-menu-section">
          {categoryList?.length > 0 &&
            categoryList?.map((elm: any, idx: number) => {
              return (
                <div className="main-menu-div" key={idx}>
                  <div className="list-div">
                    <li>
                      <p
                        className={
                          elm?.id === selectedMenu ? "select" : "default-color"
                        }
                        onClick={() => handleSelectedCategory(elm)}
                      >
                        <p
                          style={{
                            display: "inline-block",
                            cursor: "pointer",
                            // textTransform: "capitalize",
                          }}
                        >
                          {" "}
                          {elm.categoryName}
                        </p>
                      </p>
                    </li>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="category-right-div">
        {categoryList?.map((elm: any) => {
          return (
            <div
              id={`${elm.categoryName}-${elm.id}`}
              key={`${elm.categoryName}-${elm.id}`}
              // style={{ marginTop: props.menu === false ? "0" : "95px" }}
              className="scroll-div-web"
            >
              {categoryList?.length === 0 && (
                <div style={{ margin: "auto" }}>
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
    </div>
  );
};

export default memo(LandingMenu);
