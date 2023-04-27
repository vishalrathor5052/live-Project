import React from "react";
import * as IMG from "../../components/common/Images";

const Loader = () => {
  return (
    <div className="loader-main">
      <div className="loader">
        <div className="loader-image">
          <div className="loader-coin">
            <img src={IMG.coinLoader} alt="" />
          </div>
          <div className="loader-hand">
            <img src={IMG.handLoader} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
