import React, { useState, useEffect, memo } from "react";
import "./style.css";
import ProductDetailCake from "../../components/productDetail/ProductDetailCake";
import AddOnCard from "../../components/addOnCard/AddOnCard";
import ProductCard from "../../components/productCard/ProductCard";
import Footer from "../../components/footer/Footer";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import Image from "../../constant/Images";
import FooterMenuTab from "../../components/footerMenuTab/FooterMenuTab";
import { landingConstants } from "../../constant/Constant";
import axios from "axios";
import { PATH } from "../../constant/Constant";
import { useLocation } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
// import Loader from "../loader/Loader";

const ProductDetail1 = () => {
  const location = useLocation();
  const [productItems, setProductItems] = useState([]);
  const [isLoader, setIsLoading] = useState(false);
  const {
    apiResponse: { categoryList },
  } = useSelector((state: any) => state);
  const productId = location?.state?.productId;

  const getProduct = () => {
    setIsLoading(true);
    axios
      .get(`${PATH}product/list`)
      .then((res: any) => {
        setProductItems(res?.data?.data?.rows ?? res?.data?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {});
    setIsLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {isLoader ? (
        <Loader />
      ) : (
        <div className="container-product-detail-screen">
          <ProductDetailCake />
          <div className="screen-Addons">
            <AddOnCard productId={productId} />
          </div>
          <div className="product-detail-screen-heading">
            <div className="cat-heading-container">
              <div style={{ display: "flex", position: "relative" }}>
                <div className="cat-heading-div">
                  <h4 className="heading-category">RELATED CAKE</h4>
                </div>
                <div className="cake-logo-div">
                  <img className="cake-logo" src={Image.logo} alt="cake-logo" />
                </div>
              </div>
              <div className="related-bottom-div"></div>
            </div>
          </div>
          <div className="product-screen-card">
            <div className="product-card-div-section">
              {/* {categoryList.map((category: any) => {
                category.categoryDetails
                  // ?.filter((data: any) => data.id !== productId)
                  ?.map((elm: any, idx: number) => {
                    {console.log("categoryList-------", elm)}
                    return (
                      <div key={idx} className="product-cart-container ">
                        <ProductCard items={elm} isRelatedCake={true} />
                      </div>
                    );
                  });
              })} */}
              {productItems
                .filter((data: any) => data.id !== productId)
                .map((elm: any) => {
                  return (
                    <div className="product-cart-container ">
                      <ProductCard items={elm} isRelatedCake={true} />
                    </div>
                  );
                })}
            </div>
          </div>
          <Footer data={landingConstants.footerData} />
          <MobileFooter data={landingConstants.footerData} />
          <FooterMenuTab menuData={true} />
        </div>
      )}
    </>
  );
};
export default memo(ProductDetail1);
