import React from "react";
import "./style.css";
import Images from "../../constant/Images";

const MobileMoreThanJust = (props: any) => {
  const { data } = props;

  return (
    <div className="mobile-morethenjust-div">
      <div className="mobile-morethan-just-container">
        <div className="mobile-morethen-just-left-div">
          <div>
            <div className="cat-heading-container cat-heading-container-more">
              <div style={{ display: "flex", position: "relative" }}>
                <div className="cat-heading-div">
                  <h4 className="morethen-just-heading">{data?.heading}</h4>
                </div>
                <div className="cake-logo-div">
                  <img
                    className="cake-logo"
                    src={Images.logo}
                    alt="cake-logo"
                  />
                </div>
              </div>
              <div className="morethen-heading-bottom-div"></div>
            </div>
          </div>
          <p className="mobile-morethen-pera">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt
          </p>
        </div>
        <div className="mobile-morethen-just-right-div">
          <div>
            <img src={Images.moreright} alt="" width={"100%"} />
          </div>
          <div style={{ width: "80%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default MobileMoreThanJust;
