import React, { useRef } from "react";
import "./style.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Images from "../../constant/Images";
import { PATH } from "../../constant/Constant";
import ButtonComponent from "../button/Button";
import SignIn from "../../screens/signIn/SignIn";
import { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddon,
  addAddToCartData,
  addCartDataQuantity,
  resetOptions,
} from "../../screens/reduxSetup/CartSlice";
import QuantityCounter from "../quantityCounter/QuantityCounter";
import ModalBallons from "../../components/ModalBallon/ModalBallons";
import TablePagination from "@mui/material/TablePagination";
// import cake_image4 from "../assets/images/addOnImages/sparkle-candle.png";
import searchImage from "../../assets/images/Group 14880 (1).png";
import Loader from "../loader/Loader";

const AddOnCard = (props: any) => {
  const balloonPriceRef = useRef(0);

  const { show } = props;
  // const { addonId } = props;
  const dispatch = useDispatch();
  const [btnId, setBtnId] = useState(0);
  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [blModal, setBlModal] = useState(false);
  const [addOnList, setAddOnList] = useState([]);
  const [count, setCount] = useState<Record<string, string | any>>({});
  const { addons, options, addToCartData } = useSelector(
    (state: any) => state.addToCart
  );
  const {
    userDetails: { userDetail },
  } = useSelector((state: any) => state);
  const [addonId, setAddonId] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [productCount, setProductCount] = useState(0);
  const [optionDetail, setOptionDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const filteredAddonsDataFromCart = addToCartData?.cartDetails?.filter(
    (elm: any) => elm.productType === 2
  );

  console.table(filteredAddonsDataFromCart);
  console.table(addons);

  useEffect(() => {
    //getAddOnItems function to call addOnsList api
    getAddOnItems();
  }, [page]);

  //if addon quantity is equal to 0 run switchToggle function
  const switchToggle = (elm: any) => {
    //update toggle state
    setToggle(elm.id);
    //call addCounterHandler funtionto increase quantity of selected addon
    addCounterHandler(elm);
  };

  //Addon Added...........
  const addToCartApi = async (elm: any) => {
    // ("elm in addToCart api", elm)
    const { id, productType, price, productQuantity } =
      JSON.parse(JSON.stringify(elm)) ?? {};
    let apiData: any = [
      {
        productId: id, //if elm.productType is equal to 3 pass elm.productId otherwise elm.id
        productType: productType ?? 2,
        productQuantity: productQuantity, //if elm.productType is not equal to 3 pass elm.productQuantity otherwise 0
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
        if (res?.data?.success) {
          console.log("Addon Added Succesufully");
        }
      })
      .catch((error) => {
        console.log("Addon Added unSuccesufully");
        return error.value;
      });
  };

  //addCounterHandler to increase the quantity of addon
  const addCounterHandler = async (elm: any) => {
    //A temperary variable to distructure count's values
    let temp: any = { ...count };
    //add productType as 2 in elm(selected addon)
    elm.productType = 2;
    if (elm.productQuantity) elm.productQuantity++;
    if (!elm.productQuantity) elm.productQuantity = 1;
    //dispatch the value of selected addon in redux state and passing increment : true
    dispatch(addAddon({ data: elm, increment: true }));
    addToCartApi(elm);
    //update count state
    setCount(temp);
  };

  //subCounterHandler to decrease the quantity of product
  const subCounterHandler = (elm: any, quantity: any) => {
    console.log("removeItemsInCart(elm.id)", elm);
    //A temperary variable to distructure count's values
    let temp: any = { ...count };
    //if elm.name is greater then 0
    if (count[elm.name] > 0) {
      //decrease the quantity of selected addon
      temp[elm.name] = temp[elm.name] - 1;
    }
    //dispatch the value of selected addon in redux state and passing increment : false
    dispatch(addAddon({ data: elm, increment: false }));
    elm.productQuantity--;
    //update count state
    setCount(temp);
    if (elm.productQuantity === 0) removeItemsInCart(elm.id);
    if (elm.productQuantity !== 0) addToCartApi(elm);
  };

  //BalloonsOption for open balloon popUp
  const BalloonsOption = async (elm: any) => {
    await getCartData(elm);
    setAddonId(elm.id);
    setOptionDetail(elm);
    setBlModal(true);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // window.scrollTo(0, 0);
    // getAddOnItems();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 3));
    setPage(0);
  };

  //getAddOnItems function to get all addons details
  const getAddOnItems = async () => {
    setIsLoading(true);
    setAddOnList([]);
    const offsets: number = page * rowsPerPage;
    await axios
      .get(`${PATH}product/addOnsList/?limt=${rowsPerPage}&offset=${offsets}`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + userDetail.tokenId?.data
              ? userDetail.tokenId?.data
              : "", //pass token is user token exist otherWise ""
        },
      })
      .then((res: any) => {
        // const addonList = res?.data?.data?.filter((elm: any) => elm?.type === 2 || elm?.type === 3);
        //update addonList state by api response
        setAddOnList(res?.data?.data.rows ?? res?.data?.data);
        setProductCount(res?.data?.data?.count ?? res?.data.data.length);
      })
      .catch((err) => {})
      .finally(() => setIsLoading(false));
  };

  //getCartData api to get all the data of cart
  const getCartData = async (productDetail?: boolean) => {
    return axios
      .get(`${PATH}cart/list`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail.tokenId?.data,
        },
      })
      .then(async (res: any) => {
        // if (res?.data?.data?.success) {

        //filter data from response to get productQuantity where productType is 1
        let productCakeDataInCart = await res?.data?.data?.cartDetails.filter(
          (elm: any) => elm.productType === 1
        );
        let updateDate = {};
        let updatedCakeMessages = productCakeDataInCart.map((elm: any) => {
          return (updateDate = { ...updateDate, [elm.productId]: elm.message });
        });

        //dispatch product quantity in addCartDataQuantity in redux to show product quantity in csrt
        await dispatch(addCartDataQuantity(productCakeDataInCart?.length));
        console.log("nulnullnull", res?.data?.data?.offerId);
        // setOfferMessage(elm?.offerDescription);
        //update setCartData state

        //dispatch api response in addAddToCartData in redux to show data in cart
        await dispatch(addAddToCartData(res?.data?.data));
        console.log("productDetail:");

        if (productDetail) {
          await dispatch(resetOptions(productDetail));
        }
        //updating isLoader false to stop loading
        // }
      })
      .catch((err: any) => {});
  };

  //removeItemsInCart api to remove the product in cart
  const removeItemsInCart = async (id: any) => {
    return axios
      .delete(`${PATH}cart/delete`, {
        method: "delete",
        headers: {
          Accept: "applicat ion/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail.tokenId?.data,
        },
        data: { id: id },
      })
      .then((res) => {
        console.log("resoisne", res);
        // if (res?.data?.success) handleGetCartData();
      })
      .catch((err: any) => {});
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
  return (
    <>
      <div className="line-horizontal"></div>
     {/* {!isLoading &&  */}
     <div className="Addon-main">
        <div>
          <div className="cat-heading-container">
            <div style={{ display: "flex", position: "relative" }}>
              <div className="cat-heading-div">
                <h4 className="heading-category">ADDONS</h4>
              </div>
              <div className="cake-logo-div">
                <img className="cake-logo" src={Images.logo} alt="cake-logo" />
              </div>
            </div>
            <div className="addons-bottom-div"></div>
          </div>
        </div>
        {/*filter data from addOnList(state) where elm.type is equal to 2 */}
        {isLoading && <div style={{marginTop:"50px"}}> <Loader /> </div>}
        {!isLoading &&
          addOnList
            ?.filter((elm: any) => elm.type === 2)
            .map((elm: any) => {
              // fins data from addedList where id is equal to elm.id
              return (
                <div className="cart-knife-main" key={elm.id}>
                  <div style={{ display: "flex", alignContent: "center" }}>
                    <img
                      className="addons-img-cart"
                      src={`http://34.200.195.34/upload/${elm.image}`}
                      alt="candle"
                    />
                    <div className="text-knife-candle">
                      <p>{elm.productName}</p>
                      <p className="cart-price-dollar">{"\u20B9" + elm.price}</p>
                    </div>
                  </div>
                  <div>
                    {elm?.productQuantity ? (
                      //where addedList?.productQuantity is greater then 0 handle QuantityCounter compnent
                      <QuantityCounter
                        //pass props count,addCounterHandler,subCounterHandler
                        //count - to quantity of product
                        count={elm?.productQuantity}
                        //addCounterHandler - to increase quantity of produc
                        addCounterHandler={() => addCounterHandler(elm)}
                        //subCounterHandler - to increase quantity of product
                        subCounterHandler={() =>
                          subCounterHandler(elm, elm?.productQuantity)
                        }
                      />
                    ) : (
                      //where addedList?.productQuantity is equal to or less then 0 handle Add button(switchToggle function)
                      <button
                        className="add-button-div"
                        onClick={() => switchToggle(elm)}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        {/* filter data from addOnList(state) where elm.type is equal to 3 */}
        {/* {menuItems?.length === 0 ||
          (productItems?.length === 0 && (
            <div className="d-flex justify-content-center">
              <h3 className="">Data not found</h3>
            </div>
          ))} */}
        {!isLoading &&
          addOnList
            ?.filter((elm: any) => elm.type === 3)
            ?.map((elm: any) => {
              return (
                <div className="cart-knife-main" key={elm.id}>
                  <div style={{ display: "flex" }}>
                    <img
                      className="addons-img-cart"
                      src={`http://34.200.195.34/upload/${elm?.image}`}
                      alt="candle"
                    />
                    <div className="text-knife-candle">
                      <p>{elm?.productName}</p>
                      {/* useRef to show current value of option amount */}
                      <p className="cart-price-dollar">
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
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={productCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <Modal.Footer>
        <div>
          {/* Used this popup as the authenctication flow  */}
          {modal && <SignIn id={props.productId} show={setModal} />}
        </div>
      </Modal.Footer>

      {blModal && (
        <ModalBallons
          addonId={addonId}
          ballonMod={setBlModal}
          optionDetail={optionDetail}
          onHandleNext={getAddOnItems}
          // newShow={setModal}
          handleGetCartData={getCartData}
        />
      )}
    </>
  );
};
export default memo(AddOnCard);
