import React, { memo, useRef, useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import Loader from "../loader/Loader";
import "react-calendar/dist/Calendar.css";
import Modal from "react-bootstrap/Modal";
import Images from "../../constant/Images";
import { PATH } from "../../constant/Constant";
import ButtonComponent from "../button/Button";
import SignIn from "../../screens/signIn/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { addAddon, setAddonPage } from "../../screens/reduxSetup/CartSlice";
import QuantityCounter from "../../components/quantityCounter/QuantityCounter";
import TablePagination from "@mui/material/TablePagination";

const Addons = (props: any) => {
  const {
    newShow,
    switchs,
    ballonMod,
    addonId,
    handleGetCartData,
    handleIsAlert,
    optionDetail,
  } = props;
  const balloonPriceRef = useRef(0);
  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(0);
  // const [addonId, setAddonId] = useState(0)
  const [isLoader, setIsLoading] = useState(true);
  const [addOnList, setAddOnList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const { addons, options, addToCartData } = useSelector(
    (state: any) => state.addToCart
  );
  const {
    userDetails: { userDetail },
    addToCart : {addonPage = 0},
  } = useSelector((state: any) => state);
  const [count, setCount] = useState<Record<string, string | any>>({});
  const [productDetails, setProductDetails] = useState<
    Record<string, string | any>
  >({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(4);
  const [productCount, setProductCount] = useState(0);
  const dispatch = useDispatch();

  const filteredAddonsDataFromCart = addToCartData?.cartDetails?.filter(
    (elm: any) => elm.productType === 2
  );

  console.log("addonPage in addons", addonPage, useSelector((state: any) => state));
  useEffect(() => {
    //getProduct api in useEffect to get details of the product
    props.productId && getProduct(); //if props.productId exist call getProduct
    getAddOnItems(); //getAddOnItems to get All details of addons
  }, [addonPage]);

  // The below modal can be used to close the behind pop up
  const handleChange = async () => {
    switchs && switchs(true);
    newShow(false);
  };

  //BalloonsOption for open balloon popUp
  const BalloonsOption = async (elm: any) => {
    console.log("optionDetail clicked data",elm);
    await handleGetCartData(elm);
    addonId(elm?.id);
    optionDetail(elm);
    newShow(false);
    ballonMod(true);
  };

  //handleClose for close addon popUp
  const handleClose = async () => {
    newShow(false);
    dispatch(setAddonPage(0));
    if (userDetail?.tokenId?.isVerify === true) {
      await updateAddons();
    }
  };

  //if addon quantity is equal to 0 run switchToggle function
  const switchToggle = (elm: any, quantity: any) => {
    setToggle(elm.id); //update toggle state
    //if user is logged in and want to add product in cart call addToCartApi
    if (userDetail?.tokenId?.isVerify === true) {
      addToCartApi(elm);
    }

    addCounterHandler(elm, 1); //call addCounterHandler funtionto increase quantity of selected addon
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    // setIsLoading(true);
    // setPage(newPage);
    dispatch(setAddonPage(newPage));
    // getProduct();
    // window.scrollTo(0, 0);
    // getAddOnItems();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 3));
    // setPage(page + 1);
    // setPage(0);
  };

  //addCounterHandler to increase the quantity of addon
  const addCounterHandler = async (elm: any, quantity: Number) => {
    //A temperary variable to distructure count's values
    let temp: any = { ...count };
    //add productType as 2 in elm(selected addon)
    elm.productType = 2;
    console.log("add ons elm: ", elm);

    //dispatch the value of selected addon in redux state and passing increment : true
    dispatch(addAddon({ data: elm, increment: true }));
    setTotalPrice((prevPrice) => (prevPrice += +elm.price));
    //update count state
    setCount(temp);
  };

  //subCounterHandler to decrease the quantity of product
  const subCounterHandler = (elm: any, quantity: Number) => {
    //A temperary variable to distructure count's values
    let temp: any = { ...count };
    //if elm.name is greater then 0
    if (count[elm.name] > 0) {
      //decrease the quantity of selected addon
      temp[elm.name] = temp[elm.name] - 1;
    }
    //dispatch the value of selected addon in redux state and passing increment : false
    dispatch(addAddon({ data: elm, increment: false }));
    setTotalPrice((prevPrice) => (prevPrice -= +elm.price));
    //update count state
    setCount(temp);

    if (+quantity - 1 === 0) removeItemsInCart(elm?.id);
  };

  //calculateOptionPrice for calulate all price of addons and options
  const calculateOptionPrice = (id?: number) => {
    let filteredData = options.filter((elm: any) => elm.productId === id);
    let totalCalculateAmount = filteredData?.reduce(
      (acc: any, curr: any) => (acc += +curr?.price * +curr?.productQuantity),
      0
    );
    balloonPriceRef.current = totalCalculateAmount;
    return totalCalculateAmount;
  };

  //calculatePrice for calulate all price of addons and options
  const calculatePrice = () => {
    //calculate the amount of addons by price and quantity from addons state
    let calculateAmount = addons?.reduce(
      (acc: any, curr: any) => (acc += +curr?.price * +curr?.productQuantity),
      0
    );

    //calculate the amount of addons by price and quantity from addons state
    let totalCalculateAmount = options?.reduce(
      (acc: any, curr: any) => (acc += +curr?.price * +curr?.productQuantity),
      0
    );
    //useRef to show current value of option amount
    balloonPriceRef.current = totalCalculateAmount;
    //return total amount of addons and options
    const grossPrice: any = calculateAmount + totalCalculateAmount;

    //if  props?.productId returm calculated amount of grossPrice + +productDetails.price otherwise grossPrice
    return props?.productId ? grossPrice + +amount : grossPrice;
  };

  //getProduct function to get detail of one product by props.productId(params)
  const getProduct = () => {
    axios
      .get(`${PATH}product/details/${props.productId}`)
      .then((res: any) => {
        setProductDetails(res?.data?.data.rows ?? res?.data?.data); //update productDetails state by response
        setAmount(res?.data?.data?.measurementDetails[0]?.productPrice); //update amount state by response price
      })
      .catch((err) => {});
  };

  //getAddOnItems function to get all addons details
  const getAddOnItems = async () => {
    setIsLoading(true);
    const offsets: number = addonPage * rowsPerPage;
    // const offsets: number = page > 1 ? page * rowsPerPage : 1;

    await axios
      .get(
        `${PATH}product/addOnsList/?limit=${rowsPerPage}&offset=${offsets}`,
        {
          method: "get",
          //passing header to get isAdded key in api response
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
               userDetail.tokenId?.data
                ? "Bearer " + userDetail.tokenId?.data
                : "", //pass token is user token exist otherWise ""
          },
        }
      )
      // )
      .then((res: any) => {
        //update addonList state by api response
        setAddOnList(res?.data?.data?.rows ?? res?.data?.data);
        setProductCount(res?.data?.data?.count ?? res?.data?.data?.length);
        setTotalPrice(res?.data?.data?.totalPrice ?? 0);
        //close loader after get response from the api
        // setIsLoading(false);
      })
      .catch((err) => {});
      setIsLoading(false);
  };

  //update addons api to update the quantity of product
  const updateAddons = async () => {
    let updatedArray: any = [];
    let updatedAddonsList = addons?.map((elm: any) => {
      let temp: any = {}; //An empty object to store temperary data
      //add data in temp
      temp.orderId = userDetail?.orderId;
      temp.productId = elm?.id;
      temp.productQuantity = elm?.productQuantity;
      updatedArray.push(temp); //push temp data in apiData (empty array)
    });
    if (updatedArray.length > 0) {
      await axios(PATH + "cart/update", {
        method: "put",
        data: { addonDetails: updatedArray },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail?.tokenId?.data,
        },
      })
        .then((res: any) => {
          if (res?.data?.success) handleGetCartData();
        })
        .catch((error) => {});
    }
  };

  //addToCartApi function to add data in cart
  const addToCartApi = async (elm: any) => {
    // ("elm in addToCart api", elm)
    const { id, productType, price } = JSON.parse(JSON.stringify(elm)) ?? {};
    let apiData: any = [
      {
        productId: id, //if elm.productType is equal to 3 pass elm.productId otherwise elm.id
        productType: productType ?? 2,
        productQuantity: 1, //if elm.productType is not equal to 3 pass elm.productQuantity otherwise 0
        productPrice: price, //if elm.productType is equal to 3 pass totalCalculateAmount otherwise elm.price
      },
    ];

    await axios(PATH + "cart/orderItem", {
      method: "post",
      data: { productsList: apiData },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then((res) => {
        if (res?.data?.success) handleGetCartData();
      })
      .catch((error) => {
        return error.value;
      });
  };
  //removeItemsInCart api to remove the product in cart
  const removeItemsInCart = async (id: any) => {
    setIsLoading(true);
    return axios
      .delete(`${PATH}cart/delete`, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail.tokenId?.data,
        },
        data: { id: id },
      })
      .then((res) => {
        if (res?.data?.success) handleGetCartData();
      })
      .catch((err: any) => {})
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Modal
        show={newShow}
        onHide={handleClose}
        centered
        className="addon-modal"
      >
        <Modal.Header closeButton className="addon-header-popup">
          {/* 
        if props.productId exist show productDetails 
        */}
          {props.productId ? (
            <Modal.Title>
              <div className="addon-popup-main">
                <div className="addon-poup-left-view">
                  <img
                    className="addon-popup-img"
                    src={`http://34.200.195.34/upload/${productDetails?.image}`}
                    alt="productCake"
                  />
                </div>
                <div className="addon-popup-right-view">
                  <h4 className="chocolate-truffle-tsx">
                    {productDetails?.productName}
                  </h4>
                  <div className="inclusive-text-popup">
                    <p className="amount-inclusive">
                      {/* {productDetails.measurementDetails[0].productPrice} */}
                      {"\u20B9"}{amount}
                    </p>
                    <p className="inclusive-off-taxes">
                      Inclusive of all taxes
                    </p>
                  </div>
                </div>
              </div>
            </Modal.Title>
          ) : (
            ""
          )}
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="cat-heading-container cats-heading-container">
              <div style={{ display: "flex", position: "relative" }}>
                <div className="cat-heading-div">
                  <h4 className="heading-category">ADDONS</h4>
                </div>
                <div className="cake-logo-div">
                  <img
                    className="cake-logo"
                    src={Images.logo}
                    alt="cake-logo"
                  />
                </div>
              </div>
              <div className="addonss-bottom-div"></div>
            </div>
            {isLoader ? (
              <div className="mt-5">
              <Loader />
              </div>
            ) : (
              <>
                {/*filter data from addOnList(state) where elm.type is equal to 2 */}
                {addOnList
                  ?.filter((elm: any) => elm.type === 2)
                  ?.map((elm: any) => {
                    // fins data from addedList where id is equal to elm.id
                    const addedList = addons?.find(
                      (addOn: any) => addOn?.id === elm?.id
                    );
                    const filteredAddonsIds = filteredAddonsDataFromCart?.find(
                      (a: any) => a?.productId === elm?.id
                    );
                    return (
                      <div className="cart-knife-main" key={elm.id}>
                        <div
                          style={{ display: "flex", alignContent: "center" }}
                        >
                          <img
                            className="addons-img-cart"
                            src={`http://34.200.195.34/upload/${elm?.image}`}
                            alt="candle"
                          />
                          <div className="text-knife-candle">
                            <p>{elm.productName}</p>
                            <p className="cart-price-dollar">{"\u20B9"}{elm.price}</p>
                          </div>
                        </div>
                        <div>
                          {addedList?.productQuantity ||
                          filteredAddonsIds?.productQuantity > 0 ? (
                            //where addedList?.productQuantity is greater then 0 handle QuantityCounter compnent
                            <QuantityCounter
                              //pass props count,addCounterHandler,subCounterHandler
                              //count - to quantity of product
                              count={
                                addedList?.productQuantity ??
                                filteredAddonsIds?.productQuantity
                              }
                              //addCounterHandler - to increase quantity of product
                              addCounterHandler={() =>
                                addCounterHandler(
                                  elm,
                                  addedList?.productQuantity
                                )
                              }
                              //subCounterHandler - to decrease quantity of product
                              subCounterHandler={() =>
                                addedList?.productQuantity === 0
                                  ? removeItemsInCart(elm.id)
                                  : subCounterHandler(
                                      elm,
                                      addedList?.productQuantity
                                    )
                              }
                            />
                          ) : (
                            //where addedList?.productQuantity is equal to or less then 0 handle Add button(switchToggle function)
                            <button
                              className="add-button-div"
                              onClick={() =>
                                switchToggle(elm, addedList?.productQuantity)
                              }
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                {/* filter data from addOnList(state) where elm.type is equal to 3 */}
                {addOnList
                  ?.filter((elm: any) => elm.type === 3)
                  ?.map((elm: any) => {
                    return (
                      <div className="cart-knife-main">
                        <div style={{ display: "flex" }} key={elm.id}>
                          <img
                            className="addons-img-cart"
                            src={`http://34.200.195.34/upload/${elm?.image}`}
                            alt="candle"
                          />
                          <div className="text-knife-candle">
                            <p>{elm?.productName}</p>
                            {/* useRef to show current value of option amount */}
                            <p className="cart-price-dollar">
                              {/* ${balloonPriceRef?.current} */}
                              {"\u20B9"}{elm.totalPrice ?? 0}
                            </p>
                          </div>
                        </div>

                        <div>
                          {/* ButtonComponent to handle options */}
                          <ButtonComponent
                            title="Options"
                            type="button"
                            customClass="add-button-div"
                            onClick={() => BalloonsOption(elm)}
                          />
                        </div>
                      </div>
                    );
                  })}
             
            <div>
              <TablePagination
                rowsPerPageOptions={[7]}
                component="div"
                count={productCount}
                rowsPerPage={rowsPerPage}
                page={addonPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>

            <div className="card-total-main">
              <div className="cart-total-heading-div">
                {userDetail?.tokenId?.isVerify === true ? (
                  <p>Addons Total</p>
                ) : (
                  <p>Cart Total</p>
                )}
              </div>
              <div className="cart-dot">:</div>
              <div className="cart-total-heading-div">
                {/* if props?.productId - call calculatePrice and show the calculated amount of calculatePrice and productDetails?.price otherwise response of calculatePrice function */}
                <p>{totalPrice}</p>
              </div>
            </div>
            </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            {/* if user is on cart page will not show Add button */}
            {userDetail?.tokenId?.isVerify === true ? (
              ""
            ) : (
              <ButtonComponent
                customClass="balloon-mdl-btn"
                title="Go To Cart"
                type="button"
                onClick={() => handleChange()}
                // isPadding={true}
              />
            )}

            {/* Used this popup as the authenctication flow  */}
            {modal && <SignIn id={props?.productId} show={setModal} />}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(Addons);
