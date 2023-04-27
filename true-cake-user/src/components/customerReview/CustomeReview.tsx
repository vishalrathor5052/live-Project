import React from "react";
import "./style.css";
import Images from "../../constant/Images";
import Review from "../review/Review";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomeReview = (props: any) => {
  const { data } = props;
  return (
    <>
      <div className="customer-review-main">
        {/*.................... Heading div .............*/}
        <div className="customer-heading">
          <div className="cat-heading-container">
            <div style={{ display: "flex", position: "relative" }}>
              <div className="cat-heading-div">
                <h4 className="heading-category">{data.heading}</h4>
              </div>
              <div className="cake-logo-div">
                <img className="cake-logo" src={Images.logo} alt="cake-logo" />
              </div>
            </div>
            <div className="customer-reviews-heading-bottom-div"></div>
          </div>
          <div className="right-arrow">
            {data.rightArrow.map((elm: any, idx: number) => {
              return (
                <img
                  key={idx}
                  className="arrow-image"
                  src={elm}
                  alt="men"
                  // onClick={() => }
                />
              );
            })}
          </div>
        </div>

        <div className="card-slider">
          {/* <Slider dots={false}
        slidesToShow={10}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={1000}
        arrows={false}> */}
          {data.cardData.map((elm: any, idx: number) => {
            return (
              <div key={idx} className="review-card">
                <Review data={elm} />
              </div>
            );
          })}
          {/* </Slider> */}
        </div>
      </div>
    </>
  );
};

export default CustomeReview;
