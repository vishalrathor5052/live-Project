import "./style.css";
import { useState, useEffect, memo } from "react";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import ImageObj from "../../constant/Images";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import Images from "../../constant/Images";
import { landingConstants, PATH } from "../../constant/Constant";
import { objectCheck } from "../../constant/Constant";
import FooterMenuTab from "../../components/footerMenuTab/FooterMenuTab";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import CircularCategory from "../../components/circularCategory/CircularCategory";

const Offers = () => {
  const [offer, setOffer] = useState([]);
  const [isLoader, setisLoader] = useState(true);

  const getOffers = () => {
    axios
      .get(`${PATH}offer/list`)
      .then((res) => {
        setisLoader(false);
        setOffer(res?.data?.data?.rows);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div className="offer-screen-main">
      {isLoader ? (
        <Loader />
      ) : (
        <>
          <NavBar />
          <MobileHeader />
          <div className="circular-cat-main">
            <CircularCategory />
          </div>
          <div className="offer-container">
            <div className="cat-heading-container">
              <div style={{ display: "flex", position: "relative" }}>
                <div className="cat-heading-div">
                  <h4 className="heading-category">
                    {objectCheck?.OffersScreen?.heading}
                  </h4>
                </div>
                <div className="cake-logo-div">
                  <img
                    className="cake-logo"
                    src={Images.logo}
                    alt="cake-logo"
                  />
                </div>
              </div>
              <div className="offer-bottom-div"></div>
            </div>
            <div className="offer-card-main">
              {offer.length === 0 ? (
                <div style={{ margin: "auto" }}>
                  {/* <h3 className="">Data not found</h3> */}
                  <img
                    className="search-image"
                    src={Images.searchImage}
                    alt="search-image"
                  />
                  <h1 className="No-Offer">NO RECORD FOUND</h1>
                </div>
              ) : (
                offer.map((elm: any) => {
                  return (
                    <div
                      style={{
                        backgroundImage: `url(http://34.200.195.34/upload/${elm.image})`,
                      }}
                      className="offer-card"
                      key={elm.id}
                    >
                      {/* <div className="offer-card "> */}
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0,0,0,0.5)",
                          borderRadius: "10px",
                          padding: "35px 20px",
                        }}
                      >
                        {/* <img height="50px" width="50px" src={`url(http://34.200.195.34/upload/${elm.image.trim()})`}></img> */}
                        <div className="offer-heading">
                          <p className="offer-dreamy-title">{elm.offerCode}</p>
                          <p className="offer-dreamy-title">
                            {/* {elm.offer_dreamy_title2} */}
                          </p>
                        </div>
                        <div className="offer-persentage">
                          <img src={ImageObj.persentage} alt="persentage" />
                          {/* {elm?.offerCategory === "1" ? ( */}
                          <p style={{ marginLeft: "7px" }}>
                            {elm?.offerDescription}
                          </p>
                          {/* ) : (
                            <p style={{ marginLeft: "7px" }}>
                               60% off upto Rs.120 | Use code TRYNEW 
                            </p>
                          )} */}
                        </div>
                        {/* <div className="offer-amount">
                          <p>{elm.price}</p>
                        </div> */}
                      </div>
                      {/* </div> */}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <Footer data={landingConstants.footerData} />
          <MobileFooter data={landingConstants.footerData} />
          {/* <div style={{marginTop:"100px"}}> */}
          <FooterMenuTab />
          {/* </div> */}
        </>
      )}
    </div>
  );
};
export default memo(Offers);
