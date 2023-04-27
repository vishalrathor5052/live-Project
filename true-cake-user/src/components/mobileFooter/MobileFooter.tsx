import React, { useCallback } from "react";
import Images from "../../constant/Images";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectMobileCat } from "../../screens/reduxSetup/UserDetailsSlice";

const MobileFooter = (props: any) => {
  const { data } = props;
  const navigates = useNavigate();
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state: any) => state.apiResponse);

  const handleNavigate = useCallback((id: number) => {
    navigates("/menu", { state: { num: id } });
    dispatch(selectMobileCat({ [data.categoryName]: true }));
    //window.scrollTo(0, 0);
  }, []);

  const handleNavigateInfo = (elm: any) => {
    if (elm?.item === "Offers") {
      navigates("/offers");
    }
  };

  return (
    <div className="mobile-footer-container">
      <div style={{ padding: "25px 15px" }}>
        <div>
          <img src={Images.truecakelogo} alt="" style={{ width: "30%" }} />
        </div>
        <div style={{ marginTop: "25px" }}>
          <p className="bring">{data?.bring}</p>
          <p className="cakesss">{data?.cakess}</p>
        </div>
        <div className="locations-div">
          <img
            className="location-img"
            src={Images.locationIcon}
            alt="location"
          />
          <p className="location-text">
            {data?.add1}
            <br /> {data?.add2}
          </p>
        </div>
        <div className="contact-div">
          <img
            className="location-img"
            src={Images.contactIcon}
            alt="location"
          />

          <p className="contact-no">{data?.phone}</p>
        </div>
        <div className="gst-div">
          <img className="location-img" src={Images.gstIcon} alt="location" />
          <p className="contact-no">{data?.gst}</p>
        </div>
      </div>
      <div className="horizontal-line"></div>
      <div className="mobile-menu-container">
        <div className="mobile-menu-subdiv">
          <p className="MENU">{data?.menuhead}</p>
          <div>
            <ul className="footer-menu-category">
              {categoryList?.map((elm: any, index: any) => {
                return (
                  <div key={index}>
                    <li
                      key={elm?.id}
                      className="menu-list"
                      onClick={() => handleNavigate(elm?.id)}
                    >
                      {elm?.categoryName}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="mobile-information-subdiv">
          <p className="MENU">{data?.infohead}</p>
          <div>
            <ul>
              {data?.infolist?.length > 0 &&
                data?.infolist.map((elm: any, index: number) => {
                  return (
                    <div key={elm?.id}>
                      <li
                        className="infolist"
                        onClick={() => handleNavigateInfo(elm)}
                      >
                        {elm?.item}
                      </li>
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      <div className="powered-by">
        <p>
          {data?.poweredby1} <span>{data?.poweredby2}</span> {data?.poweredby3}
        </p>
      </div>
    </div>
  );
};

export default MobileFooter;
