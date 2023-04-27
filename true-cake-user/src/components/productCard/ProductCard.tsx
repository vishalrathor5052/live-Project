import "./style.css";
import { useState, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Addons from "../addons/addons";
import { useNavigate } from "react-router-dom";
import SignIn from "../../screens/signIn/SignIn";
import ModalBallons from "../ModalBallon/ModalBallons";
import ButtonComponent from "../button/Button";
import {
  addProduct,
  addStepperSatate,
} from "../../screens/reduxSetup/CartSlice";
import axios from "axios";
import { PATH } from "../../constant/Constant";
import Images from "../../constant/Images";
import { addCategoryList } from "../../screens/reduxSetup/ApiResponseSlice";

const ProductCard = (props: any) => {
  const navigate = useNavigate();
  const product = props.items;
  let categoryId = props?.items?.categoryId;
  const {
    userDetails: { userDetail },
  } = useSelector((state: any) => state);
  const [modal, setModal] = useState(false);
  const [signInModal, setSignInModal] = useState(false);
  const [blModal, setBlModal] = useState(false);
  const [addonId, setAddonId] = useState(0);
  const [btnId, setBtnId] = useState(0);
  const [optionDetail, setOptionDetail] = useState({});

  // console.log("in product card", product);

  // const [productPrice, setProductPrice] = useState(
  //   product?.measurementDetails[0]?.productPrice
  // );
  // const [measurementId, setMeasurementId] = useState(
  //   product?.measurementDetails[0]?.id
  // );
  const dispatch = useDispatch();
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(9);
  // console.log("response INPRODUCTcART", product);

  //handleChange for navigate  the page and at ADD and ADDED button
  const handleChange = async () => {
    console.log("response in handleChange", product);

    setBtnId(product.id);
    if (userDetail?.location) {
      if (userDetail?.tokenId?.isVerify === true) {
        if (product?.isAdded === true) {
          console.log("response in if", userDetail?.tokenId);
          await dispatch(addStepperSatate(1));
          navigate("/cart");
        } else {
          console.log("response in else", userDetail?.tokenId);
          addToCartApi();
        }
      } else {
        console.log("response in second else", userDetail?.tokenId);
        product.isproduct = true;
        product.productType = 1;
        dispatch(addProduct({ data: product }));
        setModal(true);
      }
    } else {
      navigate("/location");
    }
  };

  //handleProductDetail for navigate to productdetails
  const handleProductDetail = async (e: any) => {
    // await dispatch(addProduct({ data: product }));
    if (userDetail?.location) {
      navigate(`/productdetails`, {
        state: { productId: product.id, categoryId: categoryId },
      });
    } else {
      navigate("/location", {
        state: { heading: "Deliver to" },
      });
      // navigate("/location");
    }
    window.scrollTo(0, 0);
  };
  console.log("response", product.isAdded);
  //addToCart api for add data in cart
  const addToCartApi = async () => {
    console.log("session", userDetail?.tokenId?.data);
    console.log("api response");
    await axios(PATH + "cart/orderItem", {
      method: "post",
      data: {
        productsList: [
          {
            productId: product?.id,
            productType: product?.type,
            productQuantity: product?.productQuantity ?? 1,
            productPrice: product?.measurementDetails[0]?.productPrice,
            measurementId: product?.measurementDetails[0]?.id,
          },
        ],
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then(async (res) => {
        console.log("res in addToCArt api", res);
        if (res?.data?.success) {
          await dispatch(addStepperSatate(1));

          // await dispatch(addProduct({ data: product }));
          navigate("/cart");
          // dispatch(
          //   addCategoryList(...product.isAdded, (product.isAdded = true))
          // );
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      {signInModal && <SignIn id={btnId} newShow={setSignInModal} />}
      {modal && (
        <Addons
          newShow={setModal}
          switchs={setSignInModal}
          ballonMod={setBlModal}
          addonId={setAddonId}
          optionDetail={setOptionDetail}
          productId={btnId}
        />
      )}
      {blModal && (
        <ModalBallons
          productId={btnId}
          addonId={addonId}
          ballonMod={setBlModal}
          newShow={setModal}
          optionDetail={optionDetail}
        />
      )}
      <div
        className={
          props.isRelatedCake ? "product-card-div-container" : "card-main"
        }
      >
        <div className="card-image" onClick={handleProductDetail}>
          {/* <Link to={"/productdetails"}> */}{" "}
          <img
            width={"100%"}
            height={"280px"}
            src={`http://34.200.195.34/upload/${product?.image}`}
            alt=""
          />
          {/* </Link> */}
        </div>
        <div className="card-content-div mt-3 mb-5">
          <div className="card-bottom-content">
            <p className="card-heading">{product?.productName}</p>

            {product?.isVeg === 1 ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  width={"15px"}
                  height={"20px"}
                  src={Images?.greenicon}
                  alt=""
                />
                <p style={{ marginLeft: "4px" }}>
                  {"\u20B9" + product?.measurementDetails[0]?.productPrice}
                </p>
              </div>
            ) : (
              <div>
                <p style={{ marginLeft: "4px" }}>
                  {"\u20B9" + product?.measurementDetails[0]?.productPrice}
                </p>
              </div>
            )}
          </div>
          <div className="cart-btn-div">
            <ButtonComponent
              customClass="add-to-cart-btn"
              title={product?.isAdded === true ? "ADDED" : "ADD"}
              type="button"
              onClick={() => handleChange()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProductCard);
