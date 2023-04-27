import { useState, useEffect, memo, useCallback } from "react";
import "./style.css";
import ButtonComponent from "../button/Button";
import NavBar from "../navBar/NavBar";
import Images from "../../constant/Images";
import CircularCategories from "../circularCategory/CircularCategory";
import Checkboxs from "../checkbox/Checkbox";
import Weight from "../weight/Weight";
import MobileHeader from "../mobileHeader/MobileHeader";
import SignIn from "../../screens/signIn/SignIn";
import { PATH } from "../../constant/Constant";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  addProduct,
  addStepperSatate,
} from "../../screens/reduxSetup/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Select, MenuItem } from "@mui/material";
import Loader from "../loader/Loader";

const ProductDetailCake = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const [selectWeight, setSelectedWeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [product, setProduct] = useState<any>({});
  const [cakeMessage, setCakeMessage] = useState("");
  const navigate = useNavigate();
  const [btnId, setBtnId] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [isLoader, setIsLoader] = useState(true);
  const [error, setError] = useState<Record<string, string | any>>({});
  const location = useLocation();
  const productId = location?.state?.productId;
  const dispatch = useDispatch();
  const { products, addons, options, addToCartData } = useSelector(
    (state: any) => state.addToCart
  );
  const {
    userDetails: { userDetail },
  } = useSelector((state: any) => state);

  console.log("product in productDetails", products, addons);

  useEffect(() => {
    if (product) {
      const productMessageDatafromCart = addToCartData?.cartDetails?.filter(
        (elm: any) => elm.productType === 1
      );
      console.log(
        "productMessageDatafromCart",
        productMessageDatafromCart,
        product?.id
      );
      const productMessageData = productMessageDatafromCart?.filter(
        (elm: any) =>
          elm?.productId === product?.id && (elm.message !== null ?? "")
      );
      console.log("productMessageData", productMessageData);
      productMessageData &&
        productMessageData?.length !== 0 &&
        setCakeMessage(productMessageData[0]?.message);
    }
  }, [product]);
  // console.log("productMessageData",productMessageData ,products)

  //show menu and selected product's details by useEffect
  useEffect(() => {
    // getMenu();
    // productId && getProductDetails();
    productId && getProductDetails();
  }, [productId]);

  //handleChange for ADD TO CART button
  const handleChange = async () => {
    if (isValidated()) {
      setBtnId(product?.id);
      if (userDetail?.tokenId?.isVerify === true) {
        //if user is logedIn product will add in redux and cart
        // if (product?.isAdded === true) {
        //   // if product is already added in cart : navigate on cart page
        //   navigate("/cart");
        // } else {
        // let productDetails = [ ...addons, ...options];
        //create an empty array to store api payload
        let apiData: any = [];

        // getting data for api payload from productDetails
        let temp: any = {};

        // let filterData = productDetails.find()
        let data = addons?.map((elm: any) => {
          console.log("elm in addons", elm);
          let temp: any = {};
          //An empty object to store teperary data
          temp.productId = elm?.id; //sif elm.productType is equal to 3 pass elm.productId otherwise elm.id
          temp.productType = elm?.productType;
          temp.productQuantity = elm?.productQuantity; //if elm.productType is not equal to 3 pass 0  otherwise  elm.productQuantity
          temp.productPrice = +elm?.price;
          apiData.push(temp); //push temp data in apiData (empty array)
        });

        console.log("api data in 80", apiData);
        temp.productId = product?.id; //sif elm.productType is equal to 3 pass elm.productId otherwise elm.id
        temp.productType = product?.type ?? product?.productType;
        temp.productQuantity = product?.productQuantity ?? 1; //if elm.productType is not equal to 3 pass 0  otherwise  elm.productQuantity
        temp.productPrice = selectedPrice;
        temp.measurementId = selectWeight;
        temp.message = cakeMessage;
        apiData.push(temp);

        console.log("api data in 90", apiData);

        let optionData: any = [];

        options.map((elm: any) => {
          //An empty object to store temperary data
          let temp: any = {};
          temp.optionId = elm?.id;
          temp.optionQuantity = elm?.productQuantity;
          temp.optionPrice = +elm?.price;
          optionData.push(temp); //push temp data in apiData (empty array)
        });

        console.log("apiData in 101", apiData);

        // let optionDataInCart = productDetails?.filter(
        //   (elm: any) => elm.productType === 3 && elm?.productQuantity > 0
        // );

        let orderValue = {
          productsList: apiData,
          optionsList: optionData,
        };
        if (apiData?.length > 0) {
          product?.isAdded === true
            ? await updateAddToCart()
            : await addToCartApi(orderValue);
        }
        // }
        await dispatch(addStepperSatate(1));
        navigate("/cart");
      } else {
        //else user is not logedIn open Authentication flow
        product.isproduct = true;
        product.productType = 1;
        product.message = cakeMessage;
        product.productPrice = selectedPrice;
        product.measurementId = selectWeight;
        // product.isAdded = true;
        await dispatch(addProduct({ data: product })); //dispatch product in redux before Authentication flow
        setShowModal(true); //Open signIn popUp
      }
    }
  };

  const isValidated = () => {
    let isValid = true;
    let updateError = { ...error };
    if (!cakeMessage) {
      updateError.cakeMessage = "Please fill the Message.";
      isValid = false;
    }
    setError(updateError);
    return isValid;
  };

  //selectWeightHandler for select weight of product and stor it in a state(setWeight)
  const selectWeightHandler = (elm?: any, index?: any, value?: any) => {
    setSelectedWeight(elm.id);
    setWeight(elm.measurementSymbol);
    product.lablesName = elm.measurementSymbol;
    setSelectedPrice(product.measurementDetails[index]?.productPrice);
    dispatch(addProduct({ data: product, increment: true }));
  };

  //selectWeightHandler function to slect or update wight of product
  const selectWeightHandlerDropdown = (value: any) => {
    //find selected weight object from elm
    const measurmentData = product.measurementDetails.find(
      (elm: any) => +elm.id === +value
    );
    //updating selectWieight state
    setSelectedWeight(value);
    setWeight(measurmentData.measurementSymbol);
    //updating productAmount state
    setSelectedPrice(measurmentData?.productPrice);
    //updating productQuantity state
    dispatch(addProduct({ data: product, increment: true }));
    //calling updateAddons api
    // updateAddons(elm, value, index, measurmentData.productPrice);
  };

  //handleCakeMessage for store product message in a state (setCakeMessage)
  const handleCakeMessage = (e: any) => {
    // toString(e.target.value);
    console.log(e.target.value, "toString(e.target.value)");
    let message = cakeMessage;
    if (e.target.value.toString().length > 30) {
      // message = message.substring(0, 18);
      console.log(
        "message in condition-------",
        message,
        message.length,
        "cakeMessage.length",
        cakeMessage.length
      );
      return;
    } else {
      console.log(
        "message in else condition",
        message,
        message.length,
        "cakeMessage.length",
        cakeMessage.length
      );
      message = e.target.value;
    }
    setCakeMessage(message);
    //  setCakeMessage(e.target.value);
    // product.message = e.target.value
    // dispatch(addProduct({ data: product }));
  };
  console.log("cake message", cakeMessage, cakeMessage.length);
  //getProductDetails for get one product details by productId
  const getProductDetails = useCallback(async () => {
    setIsLoader(true);
    await axios
      .get(`${PATH}product/details/${productId}`, {
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
      .then((res) => {
        console.log("res.data.data.", res.data.data);
        setSelectedPrice(+res.data.data?.measurementDetails[0].productPrice);
        setSelectedWeight(res?.data?.data?.measurementDetails[0]?.id);
        setProduct(res?.data?.data?.rows ?? res?.data?.data); //store response in a state (setProduct)
        setIsLoader(false);
      })
      .catch((error) => {});
  }, [productId]);

  //addToCartApi To add product in cart after user login
  const addToCartApi = async (productDetails: any) => {
    await axios(PATH + "cart/orderItem", {
      method: "post",
      data: productDetails,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then(async (res) => {
        if (res?.data?.success === true) {
          product.productQuantity = 1;
          // await dispatch(addProduct({ data: product, increment: true })); //dispatch(add) product in redux after add it in the  cart
          await dispatch(addStepperSatate(1));
        }
      })
      .catch((error) => {
        return error.value;
      });
  };
  const handleNavigate = () => {
    navigate("/");
  };

  //update addons api to update the quantity of product
  const updateAddToCart = async () => {
    let data: any = {
      orderId: userDetail?.orderId,
      productId: productId,
      productPrice: selectedPrice,
      measurementId: selectWeight,
      message: cakeMessage,
    };
    await axios(PATH + "cart/update", {
      method: "put",
      data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then((res: any) => {
        console.log("updateAddToCart res", res);
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="">
        <div className="dash-line-background-img">
          <NavBar />
          <MobileHeader />
          <div className="circular-flex">
            <CircularCategories />
          </div>
          <div>
            <div className="product-detail-container">
              <div className="product-detail-heading-div">
                {/* <div className="back-arrow-icon">
                  <img
                    src={Images.arrowCard}
                    alt="IconCheckbox"
                    onClick={() => handleNavigate()}
                  />
                </div> */}
                <div className="profile-heading-container">
                  <div style={{ display: "flex", position: "relative" }}>
                    <div className="cat-heading-div">
                      <h4 className="heading-category">PRODUCT DETAIL</h4>
                    </div>
                    <div className="cake-logo-div">
                      <img
                        className="cake-logo"
                        src={Images.logo}
                        alt="cake-logo"
                      />
                    </div>
                  </div>
                  <div className="product-detail-bottom-div"></div>
                </div>
              </div>
              <div className="product-detail-right-div">
                <div className="chocolate-truffle-heading-product-deatil">
                  <p>{product?.productName}</p>
                </div>
                {/* if productId have any value then showing calculated value of calculatePrice() and product?.price otherwise product?.price
                <div className="mobile-price-main">
                  <p>{"\u20B9" + selectedPrice}</p>
                </div> */}
                <div>
                  <div className="add-to-cart-btn-main">
                    <ButtonComponent
                      title={
                        product?.isAdded === true ? "ADDED" : "ADD TO CART"
                      }
                      type="button"
                      onClick={handleChange}
                    />
                    {/* Used this popup as the flow  */}
                  </div>
                </div>
              </div>
            </div>
            {isLoader ? (
              <div style={{ margin: "50px 0px 350px" }}>
                {" "}
                <Loader />{" "}
              </div>
            ) : (
              <div className="cake-img-main">
                <div className="cake-img-section">
                  <img
                    className="cake-img"
                    src={`http://34.200.195.34/upload/${product?.image}`}
                    alt="productCake"
                  />
                  <div className="mobile-price-main">
                    <p style={{ lineHeight: "30px" }}>
                      {"\u20B9" + selectedPrice}
                    </p>
                  </div>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Checkboxs name="Pure Veg" />
                    </Grid>
                    <Grid item xs={6}>
                      <Checkboxs name="100% Fresh" />
                    </Grid>
                    <Grid item xs={6}>
                      <Checkboxs name="On Time Delivery" />
                    </Grid>
                    <Grid item xs={6}>
                      <Checkboxs name="Secure Payments" />
                    </Grid>
                    {/* <div className="checkBox-col">
                    <Checkboxs name="100% Fresh" />
                    </div>
                    <div className="checkBox-col">
                    <Checkboxs name="On Time Delivery" />
                    </div>
                    <div className="checkBox-col">
                    <Checkboxs name="Secure Payments" />
                    </div> */}
                  </Grid>
                  {/* <div className="checkbox-row1">
                  <div className="pure-veg">
                    <Checkboxs name="Pure Veg" />
                  </div>
                  <div className="pure-veg">
                    <Checkboxs name="100% Fresh" />
                  </div>
                </div>
                <div className="checkbox-row2">
                  <div className="pure-veg">
                    <Checkboxs name="On Time Delivery" />
                  </div>
                  <div className="pure-veg">
                    <Checkboxs name="Secure Payments" />
                  </div>
                </div> */}
                </div>
                <div className="weight-content">
                  <div className="cake-price-main">
                    <div>
                      {/* if productId have any value then showing calculated value of calculatePrice() and product?.price otherwise product?.price*/}
                      <p className="price">{"\u20B9" + selectedPrice}</p>
                    </div>
                    {/* <div className="inclusive-text">Inclusive of all taxes</div> */}
                  </div>
                  <div className="select-weight-lable">
                    {/* {product?.lableDetails?.labelNames === "Weight" ? (
                    <p className="select-weight"> Select Weight : </p>
                  ) : (
                    <p className="select-weight"> Select Size : </p>
                  )} */}
                    <p className="select-weight">
                      Select {product?.lableDetails?.labelNames} :
                    </p>
                    <div style={{ overflowX: "auto" }}>
                      <div className="weight-category">
                        {product?.measurementDetails?.map(
                          (elm: any, idx: number) => {
                            return (
                              <div
                                style={{ marginRight: "20px" }}
                                key={elm?.id}
                                onClick={() => selectWeightHandler(elm, idx)}
                              >
                                <Weight
                                  selectWeight={selectWeight}
                                  id={elm.id}
                                  kilogram={elm?.measurementSymbol}
                                />
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="weight-category-mob">
                    {product?.lableDetails?.labelNames === "Weight" ? (
                      <p className="select-weight"> Select Weight : </p>
                    ) : (
                      <p className="select-weight"> Select Size : </p>
                    )}
                    <div>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectWeight}
                        onChange={(e) =>
                          selectWeightHandlerDropdown(e.target.value)
                        }
                      >
                        {product?.measurementDetails?.map((elm: any) => (
                          <MenuItem value={elm.id}>
                            {elm?.measurementSymbol}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div> */}

                  <div className="cake-msg-limit-main">
                    <div className="message-heading">Cake Message:</div>
                    <div className="mobile-max-char-limit">
                      Max. limit :- 30 characters
                    </div>
                  </div>
                  <div className="message-inputs">
                    <input
                      className="message-input"
                      type="text"
                      value={cakeMessage}
                      onChange={(e: any) => {
                        handleCakeMessage(e);
                        setError((prev: any) => ({ ...prev, cakeMessage: "" }));
                      }}
                      placeholder="Message on cake"
                      // maxLength={20}
                    />
                    <p style={{ color: "red" }}>{error.cakeMessage}</p>
                  </div>
                  <div></div>
                  <div className="write-msg-main">
                    <div style={{ display: "flex" }}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="Write the message on the cake"
                          className="write-msg"
                        />
                      </FormGroup>
                    </div>
                    <div className="max-char-limit">
                      Maximum limit :- 30 characters
                    </div>
                  </div>
                  <div>
                    <hr className="write-msg-line"></hr>
                  </div>
                  <div className="mobile-add-to-cart-btn">
                    <ButtonComponent
                      title={
                        product?.isAdded === true ? "ADDED" : "ADD TO CART"
                      }
                      type="button"
                      onClick={handleChange}
                    />
                    {/* Used this popup as the flow  */}
                  </div>
                  <div>
                    <p className="product-discription">Product Description:</p>
                    <p className="discription">{product?.productDescription}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && <SignIn id={btnId} newShow={setShowModal} />}
    </>
  );
};
export default memo(ProductDetailCake);
