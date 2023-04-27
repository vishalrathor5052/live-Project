import React, { useEffect, useState, memo } from "react";
import "./style.css";
import { PATH, landingConstants } from "../../constant/Constant";
import axios from "axios";
import Images from "../../constant/Images";
import { useSelector } from "react-redux";
import ProductCard from "../productCard/ProductCard";
import Loader from "../loader/Loader";

const Menu = () => {
  const [productItems, setProductItems] = useState([]);
  const [selected, setSelected] = useState();
  const { categoryList } = useSelector((state: any) => state.apiResponse);
  const [isLoader, setIsLoading] = useState(true);
  const {
    userDetails: { userDetail },
  } = useSelector((state: any) => state);


  //get product api to get all products
  const getProduct = (elm?: any) => {
    setIsLoading(true);
    axios
      .get(`${PATH}product/list/${elm.id}`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + userDetail.tokenId?.data
              ? userDetail.tokenId?.data
              : "",
        },
      })
      .then((res: any) => {
        setProductItems(res?.data?.data?.data);
      })
      .catch((err) => {
      });
      setIsLoading(false);
  };

  useEffect(() => {
    // getProduct()
  }, []);

  return (
    <>
    
      <div className="cat-heading-container">
        <div style={{ display: "flex", position: "relative" }}>
          <div className="cat-heading-div">
            <h4 className="heading-category">{landingConstants.categories}</h4>
          </div>
          <div className="cake-logo-div">
            <img className="cake-logo" src={Images.logo} alt="cake-logo" />
          </div>
        </div>
        <div className="menu-heading-bottom-div"></div>
      </div>
      {isLoader ? (
          <Loader />
        ) : (
          <>
      {categoryList?.map((elm: any, idx: number) => {
        return (
          <div className="main-menu-div" key={idx}>
            <div className="list-div">
              <a href="#">
                <li>
                  <p
                    className={elm.id === selected ? "select" : "default-color"}
                    // onClick={() => getProduct(elm.id)}
                  >
                    {elm.name}
                  </p>
                </li>
              </a>
            </div>
            <div className="category-right-div">
              <div className="Add-to-card-section">
                {categoryList?.length === 0 ||
                  (productItems?.length === 0 && (
                    <div className="d-flex justify-content-center">
                      {/* <h3 className="">Data not found</h3> */}
                       <img className="search-image" src={Images.searchImage} alt="search-image" />
                    </div>
                  ))} 
                {productItems?.map((elm: any, index: any) => {
                  return (
                    <div key={index} className="card-landing-page">
                      <ProductCard items={elm} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
        );
      })}
      </>
      )}
    </>
  );
};

export default memo(Menu);
