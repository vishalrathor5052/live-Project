import React from "react";
import "./style.css";
import Images from "../../constant/Images";
const CustomerReviewMobile = (props: any) => {
  const { data } = props;
  return (
    <div>
      <div className="cat-heading-container cat-heading-container-more">
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
      <div className="customer-reviews-card-mobile-div">
        <div className="customer-review-mobile-top">
          <img src={Images.testimony} alt="" className="arrow-image" />
          <p className="customer-review-heading-mobile ms-3">John Doe</p>
        </div>
        <div className="customer-review-main-container-mobile">
          <p className="customer-review-pera-mobile">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </p>
        </div>
        <div className="customer-review-profile-img-mobile">
          <img
            src={Images.customerReview}
            alt=""
            className="customer-review-profile-image"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewMobile;
