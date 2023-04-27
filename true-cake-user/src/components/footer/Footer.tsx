import React, { memo } from "react";
import "./style.css";
import ImageObj from "../../constant/Images";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectMobileCat } from "../../screens/reduxSetup/UserDetailsSlice";

const Footer = (props: any) => {
  const { data } = props;
  const navigates = useNavigate();
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state: any) => state.apiResponse);

  const handleNavigateMenu = (data: any) => {
    navigates("/menu", { state: { num: data?.id } });
    dispatch(selectMobileCat({ [data.categoryName]: true }));
    // window.scrollTo(0, 0);
    // var element = document.getElementById(
    //   `${data.categoryName}-${data.id}`
    // );
    // element?.scrollIntoView({
    //   behavior: "smooth",
    //   inline: "nearest",
    // });
  };

  const handleNavigateInfo = (elm: any) => {
    if (elm?.item === "Offers") {
      navigates("/offers");
    }
  };

  return (
    <div className="Footer-main-div">
      <div className="contacts-div">
        <div className="logo">
          <img src={data?.image1} alt="" />
        </div>
        <div className="contact">
          <div className="locations-div">
            <div>
              <img className="location-img" src={data?.image2} alt="location" />
            </div>
            <p className="location-text">
              {data?.add1}
              <br /> {data?.add2}
            </p>
          </div>
          <div className="contact-div">
            <div>
              <img className="location-img" src={data?.image3} alt="location" />
            </div>
            <p className="contact-no">{data?.phone}</p>
          </div>
          <div className="gst-div">
            <img
              className="location-img"
              src={ImageObj?.gstIcon}
              alt="location"
            />
            <p className="contact-no">{data?.gst}</p>
          </div>
        </div>
      </div>
      <div className="horizontal-line"></div>
      <div className="menu-main-div">
        <div className="text">
          <p className="bring">{data?.bring}</p>
          <p className="cakesss">{data?.cakess}</p>
        </div>
        <div className="menu">
          <div className="menu-subdiv">
            <p className="MENU">{data?.menuhead}</p>
            <div className="footer-menu-div-container">
              <ul>
                {categoryList?.map((elm: any, index: any) => {
                  return (
                    <div key={index}>
                      <li
                        key={elm?.id}
                        className="menu-list"
                        onClick={() => handleNavigateMenu(elm)}
                      >
                        <p
                          style={{
                            display: "inline-block",
                            cursor: "pointer",
                          }}
                        >
                          {elm.categoryName}
                        </p>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="information-subdiv">
            <p className="MENU">{data?.infohead}</p>
            <div className="information-menu-div">
              <ul>
                {data?.infolist?.length > 0 &&
                  data?.infolist.map((elm: any, index: number) => {
                    return (
                      <div key={elm?.id}>
                        <li
                          key={elm?.id}
                          className="infolist"
                          onClick={() => handleNavigateInfo(elm)}
                        >
                          <p
                            style={{
                              display: "inline-block",
                              cursor: "pointer",
                            }}
                          >
                            {elm?.item}
                          </p>
                        </li>
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
