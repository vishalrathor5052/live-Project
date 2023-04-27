import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Images from "../../constant/Images";
import "./style.css";
import axios from "axios";
import { PATH } from "../../constant/Constant";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { objectCheck } from "../../constant/Constant";

const MobileLandingSlider = () => {
  const [offer, setOffer] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getOffers = () => {
    axios
      .get(`${PATH}offer/list`)
      .then((res) => {
        setOffer(res?.data?.data?.row);
      })
      .catch((err) => {
      });
  };

  useEffect(() => {
    getOffers();
  }, []);
  // const renderMapData = (): any => {
  //   objectCheck?.MobileSlider?.map((elm: any) => {
  //     return (
  //       <div className="slider-img-mobile">
  //         <img
  //           src={Images.sliderImage}
  //           alt=""
  //           width={"100%"}
  //           className="slide-image"
  //         />
  //         <p className="slide-pera">{elm?.offerCode}</p>
  //         <p className="offer-per">
  //           <img src={Images.persentage} alt="" />
  //           <span className="off-per">{elm?.offerAmount}</span>
  //         </p>
  //         <p className="amount">Rs{elm?.price}</p>
  //       </div>
  //     );
  //   });
  // };

  return (
    <>
      {/* {offer?.length === 1 ? (
        offer.map(() => {
          return (
            <div className="slider-img-mobile">
              <img src={Images.sliderImage} alt="" width={"100%"} />
              <p className="slide-pera">
                Dreamy <br />
                Banana Cake
              </p>
              <p className="offer-per">
                <img src={Images.persentage} alt="" />
                <span className="off-per">10% OFF</span>
              </p>
              <p className="amount">$29.99</p>
            </div>
          );
        }) */}
      {/* ) : ( */}
      <Slider {...settings}>
        {offer?.map((elm: any) => {
          return (
            <div className="slider-img-mobile" key={elm.id}>
              <img
                src={Images.sliderImage}
                alt=""
                width={"100%"}
                className="slide-image"
              />
              <p className="slide-pera">{elm?.offerCode}</p>
              <p className="offer-per">
                <img src={Images.persentage} alt="" />
                <span className="off-per">{elm?.offerAmount}</span>
              </p>
              <p className="amount">Rs{elm?.price}</p>
            </div>
          );
        })}
        {/* <div className="slider-img-mobile">
            <img
              src={Images.sliderImage}
              alt=""
              width={"100%"}
              className="slide-image"
            />
            <p className="slide-pera">
              Dreamy <br />
              Banana Cake
            </p>
            <p className="offer-per">
              <img src={Images.persentage} alt="" />
              <span className="off-per">10% OFF</span>
            </p>
            <p className="amount">$29.99</p>
          </div> */}
      </Slider>
      {/* )} */}

      {/* <div className="slider-img-mobile">
          <img src={Images.sliderImage} alt="" width={"100%"} />
          <p className="slide-pera">
            Dreamy <br />
            Banana Cake
          </p>
          <p className="offer-per">
            <img src={Images.persentage} alt="" />
            <span className="off-per">10% OFF</span>
          </p>
          <p className="amount">$29.99</p>
        </div> */}
      {/* <div className="slider-img-mobile">
          <img src={Images.sliderImage} alt="" width={"100%"} />
          <p className="slide-pera">
            Dreamy <br />
            Banana Cake
          </p>  
          <p className="offer-per">
            <img src={Images.persentage} alt="" />
            <span className="off-per">10% OFF</span>
          </p>
          <p className="amount">$29.99</p>
        </div> */}

      {/* Hard coded divs */}
      {/* <Slider {...settings}>
        <div className="slider-img-mobile">
          <img
            src={Images.sliderImage}
            alt=""
            width={"100%"}
            className="slide-image"
          />
          <p className="slide-pera">
            Dreamy <br />
            Banana Cake
          </p>
          <p className="offer-per">
            <img src={Images.persentage} alt="" />
            <span className="off-per">10% OFF</span>
          </p>
          <p className="amount">$29.99</p>
        </div>
        <div className="slider-img-mobile">
          <img src={Images.sliderImage} alt="" width={"100%"} />
          <p className="slide-pera">
            Dreamy <br />
            Banana Cake
          </p>
          <p className="offer-per">
            <img src={Images.persentage} alt="" />
            <span className="off-per">10% OFF</span>
          </p>
          <p className="amount">$29.99</p>
        </div>
        <div className="slider-img-mobile">
          <img src={Images.sliderImage} alt="" width={"100%"} />
          <p className="slide-pera">
            Dreamy <br />
            Banana Cake
          </p>
          <p className="offer-per">
            <img src={Images.persentage} alt="" />
            <span className="off-per">10% OFF</span>
          </p>
          <p className="amount">$29.99</p>
        </div>
        {objectCheck?.MobileSlider?.map((elm: any) => {
          return (
            <div className="slider-img-mobile">
              <img
                src={Images.sliderImage}
                alt=""
                width={"100%"}
                className="slide-image"
              />
              <p className="slide-pera">{elm?.offerCode}</p>
              <p className="offer-per">
                <img src={Images.persentage} alt="" />
                <span className="off-per">{elm?.offerAmount}</span>
              </p>
              <p className="amount">Rs{elm?.price}</p>
            </div>
          );
        })}
      </Slider> */}
    </>
  );
};

export default MobileLandingSlider;
