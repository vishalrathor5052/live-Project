import "./style.css";
import Images from "../../constant/Images";
import NavBar from "../../components/navBar/NavBar";
import CircularCategories from "../../components/circularCategory/CircularCategory";
import Footer from "../../components/footer/Footer";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import FooterMenuTab from "../../components/footerMenuTab/FooterMenuTab";
import QuantityCounter from "../../components/quantityCounter/QuantityCounter";
import ButtonComponent from "../../components/button/Button";
import axios from "axios";
import Addons from "../../components/addons/addons";
import ModalBallons from "../../components/ModalBallon/ModalBallons";
import Crossbtn from "../../components/croossbtn/Crossbtn";
import { PATH } from "../../constant/Constant";
import { useSelector, useDispatch } from "react-redux";
import { landingConstants } from "../../constant/Constant";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, memo, useRef } from "react";
import {
  addAddon,
  addProduct,
  addOption,
  addCartDataQuantity,
  addStepperSatate,
  addAddToCartData,
  resetOptions,
} from "../../screens/reduxSetup/CartSlice";
import { resetCartData } from "../reduxSetup/CartSlice";
import { resetProduct } from "../reduxSetup/ProductInfoSlice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Loader from "../../components/loader/Loader";
import Moment from "react-moment";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CalenderDate from "../../components/calendar/CalenderDate";
import DeliveryTimeSlot from "../../components/deliveryTimeSlot/DeliveryTimeSlot";
import ToastAlert from "../../components/Toast/Toast";
import { FormControl, Hidden, MenuItem, Select } from "@mui/material";
import DeliveryAddress from "../deliveryAddress/DeliveryAddress";
// import { setCartOfferMessage } from "../reduxSetup/CartSlice";
import {
  resetUserDetailsState,
  addUserDetails,
} from "../../screens/reduxSetup/UserDetailsSlice";
import { resetCartState } from "../reduxSetup/CartSlice";
import { RouteList } from "../../utils/Routes";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const AddToCart = (props: any) => {
  const { deliveryDate, steppersState, addToCartData, selectAddressData } =
    useSelector((state: any) => state?.addToCart);
  const {
    userDetails: { userDetail },
  } = useSelector((state: any) => state);
  const [showDiscount, setShowDiscount] = useState(false);
  const [modal, setModal] = useState(false);
  const [calenderDateModal, setCalenderDateModal] = useState(false);
  const [blModal, setBlModal] = useState(false);
  const [addonId, setAddonId] = useState(0);
  const [cartData, setCartData] = useState<Record<string, string | any>>({});
  const [count, setCount] = useState<Record<string, string | any>>({});
  const [stepper, setStepper] = useState<Record<string, string | any>>({});
  const dispatch = useDispatch();
  const [timeModal, setTimeModal] = useState(false);
  const [productAmount, setProductAmount] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [cartDataTotal, setCartDataTotal] = useState(0);
  const [isLoader, setIsLoading] = useState(true);
  const [isAlert, setIsAlert] = useState(false);
  const [selectWeight, setSelectedWeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [offer, setOffer] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [coupanId, setCoupanId] = useState(0);
  const [cakeMessage, setCakeMessage] = useState<any>({});
  const navigates = useNavigate();
  const [optionDetail, setOptionDetail] = useState({});
  const [submitAddress, setSubmitAddress] = useState(false);
  const [cartOfferMessage, setCartOfferMessage] = useState("");
  const ref: any = useRef();
  // console.log("userDetails in add to card", userDetail)
  // console.log("coupanId", coupanId, count);
  console.log(
    "add to cart cakeMessage",
    cakeMessage,
    cartOfferMessage,
    addToCartData
  );

  //define steps to cart
  const steps = ["CART", "ADDRESS", "PAYMENT"];

  //add total price\ of cart
  // const totalPrice = cartData?.carttotal + cartData?.gst;

  //distructiring of deliveryDate
  let dateToFormat = deliveryDate.deliveryDate;

  //filter product data for cart which type is 1
  const updatedProductInCart = cartData?.cartDetails?.filter(
    (elm: any) => elm.productType === 1
  );

  //get cart data from getCartData  to show the data at cart page
  useEffect(() => {
    console.log("update");
    getCartData(undefined, true);
  }, []);

  //open addons popUp
  const addAddonsByLink = () => {
    setModal(true);
  };

  //ShoeAddressStepper function to dispatch step 2 in addStepperSatate
  const ShoeAddressStepper = () => {
    const data = {
      productId: 1,
      productQuantity: 3,
    };
    // updateAddons();
    dispatch(addStepperSatate(2));
  };

  //----------------------------------stepper ---------1----------stepper------------------------------------//

  //handleChangeMessage function to update or write any message for the product
  const handleChangeMessage = (
    elm: any,
    index: any,
    text: string | number | boolean
  ) => {
    console.log(
      "in handleChangeMessage",
      elm,
      text,
      "cakeMessage-----",
      cakeMessage
    );
    // let updateCakeMessage = {...cakeMessage};
    // updateCakeMessage.map((cakeMessageData:any)=> {
    //   if(cakeMessageData.id === elm.productId){
    //     cakeMessageData.message = text;
    //   }
    //   console.log("cakeMessageData",elm , text , cakeMessageData );

    //  })

    let message = { ...cakeMessage };
    if (cakeMessage[elm.productId]?.length > 30) {
      message[elm.productId]?.substring(0, 30);
    } else {
      message[elm.productId] = text;
    }
    setCakeMessage(message);
    // setCakeMessage((prev: any) => ({ ...prev, [elm.productId]: text }));
    //copying cartData in copyCartData as object by Spread operator
    // const copyCartData = { ...cartData };
    // //copying copyCartData.cartDetails in copyCartDetails as array by Spread operator
    // const copyCartDetails = [...copyCartData.cartDetails];
    // //updateing message value of product in cart
    // copyCartDetails[index].message = text;
    // //set updated value of productDetails in copyCartData
    // copyCartData.cartDetails = copyCartDetails;
    // //updating cartData state
    // setCartData(cartData);
  };

  //selectWeightHandler function to slect or update wight of product
  const selectWeightHandler = (elm: any, index: any, value: any) => {
    //find selected weight object from elm
    const measurmentData = elm.productDetails.measurementDetails.find(
      (elm: any) => +elm.id === +value
    );
    //updating selectWieight state
    setSelectedWeight(value);
    //updating productAmount state
    setProductAmount(measurmentData?.productPrice);
    //updating productQuantity state
    setProductQuantity(elm?.productQuantity);
    //calling updateAddons api
    updateAddons(elm, value, index, measurmentData.productPrice, true);
  };

  const handleDiscount = (elm: any) => {
    // console.log("check message", elm);
    coupanDiscount(elm);
    // setCoupanId(elm?.id);
    setCartOfferMessage(elm?.offerDescription);
    // dispatch(setCartOfferMessage(elm?.offerDescription));
    setShowDiscount(!showDiscount);
  };

  const coupanDiscount = async (elm?: any, data?: any) => {
    console.log("coupanDiscount", elm?.id);
    console.log("cartdata", data);
    // const response = instance;
    await axios(`${PATH}cart/discount/${elm?.id}`, {
      method: "post",
      data: {
        carttotal: data?.carttotal ?? addToCartData.carttotal,
        gst: data?.gst ?? addToCartData?.gst,
        itemTotal: data?.itemTotal ?? addToCartData?.itemTotal,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then((response) => {
        if (response.data.success) {
          console.log("coupanDiscount api then", response);
          // setCoupanId(id);
          getCartData();
        }
        // setOfferMessage()
      })
      .catch(async (error: any) => {
        if (error) {
          setOpen(true);
          const message: any = `add  ${
            elm.price - cartData?.carttotal
          } Rs. more to get the offer `;
          setMessage(message);
          onOfferRemove();
          // getCartData();
          console.log("coupanDiscount api error", elm.id);
          await setCartOfferMessage("");
          // dispatch(setCartOfferMessage(elm?.offerDescription));
          await setShowDiscount(false);

          await setCoupanId(0);
          // await setMessage(error?.response?.data?.message);
          // await setOpen(true);
        } else {
          setOpen(false);
        }
        // return error.response;
      });
  };

  //addCounterHandler to increace the quantity of product
  const addCounterHandler = async (elm: any) => {
    //A temperary variable to distructure count's values
    let temp: any = { ...count };
    let copyProductQuantity: any = {};

    //if elm?.productDetails?.productName exist in temp enter in if condition
    if (elm?.productDetails?.productName in temp) {
      //if increased quantity is less then element quantity enterr in if condition
      // if (
      //   count[elm?.productDetails?.productName] < elm?.productDetails?.quantity
      // ) {

      //increasing the value of productQuantity in temp
      temp[elm?.productDetails?.productName] =
        temp[elm?.productDetails?.productName] + 1;
      copyProductQuantity = { ...elm };

      //increasing quantity in elm
      copyProductQuantity.productQuantity =
        +copyProductQuantity?.productQuantity + 1;
      // }
    } else {
      //increasing the value of productQuantity
      temp[elm?.productDetails?.productName] = elm?.productQuantity + 1;
      copyProductQuantity = { ...elm };
      //increasing quantity in elm
      copyProductQuantity.productQuantity =
        copyProductQuantity?.productQuantity + 1;
    }
    if (elm?.productType === 1) {
      //if productType is 1 then dispatch in addons
      //dispatch elm and increament true in addAddons state in redux to remove addon from redux
      dispatch(addProduct({ data: elm, increment: true }));
    } else if (elm?.productType === 2) {
      //if productType is 2 then dispatch in addons
      //dispatch elm and increament true in addAddons state in redux to remove addon from redux
      dispatch(addAddon({ data: elm, increment: true }));
    }
    //updating productAmount state
    setProductAmount(copyProductQuantity?.productPrice);
    //updating  productQuantity state
    setProductQuantity(copyProductQuantity?.productQuantity);
    //update count state
    setCount(temp);
    //calling updateAddons api
    // updateAddons(copyProductQuantity || elm);
    await updateAddons(copyProductQuantity ?? elm);
  };

  //subCounterHandler to decrease the quantity of product
  const subCounterHandler = async (elm: any) => {
    //distructuring of count
    let temp: any = { ...count };
    //creating an empty object
    let copyProductQuantity: any = {};
    //if elm?.productDetails?.productName exist in temp enter in if condition
    //decreasing quantity in temp
    temp[elm?.productDetails?.productName] =
      temp[elm?.productDetails?.productName] - 1;
    //distructuring of elm
    copyProductQuantity = { ...elm };
    //decreasing quantity in elm
    copyProductQuantity.productQuantity =
      copyProductQuantity?.productQuantity - 1;
    if (elm?.productType === 1) {
      //if productType is 1 then dispatch in addons
      //dispatch elm and increament true  in addAddons state in redux to remove addon from redux
      dispatch(addProduct({ data: elm, increment: false }));
    } else if (elm?.productType === 2) {
      //if productType is 2 then dispatch in addons
      //dispatch elm and increament true  in addAddons state in redux to remove addon from redux
      dispatch(addAddon({ data: elm, increment: false }));
    }
    //updating productAmount state
    setProductAmount(elm?.productPrice);
    //updating  productQuantity state
    setProductQuantity(elm?.productQuantity);
    //update count state
    setCount(temp);
    //calling updateAddons api
    console.log("subCounterHandler coupanId", coupanId);
    await updateAddons(copyProductQuantity ?? elm);
  };

  //update addons api to update the quantity of product
  const updateAddons = async (
    elm?: any,
    value?: any,
    index?: any,
    price?: any,
    weight?: any
  ) => {
    !weight && setIsLoading(true);
    let data: any = {
      orderId: userDetail?.orderId ?? elm?.orderId,
      productId: elm?.productId,
      productQuantity: elm?.productQuantity,
      productPrice:
        productQuantity !== elm?.productQuantity && 0
          ? +elm?.productPrice
          : +price || +elm?.productPrice,
    };
    if (value) {
      data.measurementId = value;
    }
    await axios(PATH + "cart/update", {
      method: "put",
      data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then(async (res: any) => {
        if (res?.data?.success)
          //set cartDataTotal state
          await setCartDataTotal(+cartData?.carttotal + +productAmount);
        //calling getCartData api to show updated data in cart

        await getCartData(undefined, true);

        // await getCartData(undefined, true);
        //updating isLoader false to stop loading
      })
      .catch((error) => {})
      .finally(() => setIsLoading(false));
  };

  //getCartData api to get all the data of cart
  const getCartData = async (productDetail?: any, isUpdateCoupon?: boolean) => {
    console.log("productDetail: add to cart", productDetail);
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
        setIsLoading(false);
        // if (res?.data?.data?.success) {

        //filter data from response to get productQuantity where productType is 1
        let productCakeDataInCart = await res?.data?.data?.cartDetails.filter(
          (elm: any) => elm.productType === 1
        );
        let updateDate = {};
        let updatedCakeMessages = productCakeDataInCart.map((elm: any) => {
          return (updateDate = { ...updateDate, [elm.productId]: elm.message });
        });
        await setCakeMessage(updateDate);
        console.log(
          "productCakeDataInCart",
          updatedCakeMessages,
          updateDate,
          productCakeDataInCart,
          res?.data?.data
        );
        //dispatch product quantity in addCartDataQuantity in redux to show product quantity in csrt
        await dispatch(addCartDataQuantity(productCakeDataInCart?.length));
        console.log("nulnullnull", res?.data?.data);
        setCoupanId(res?.data?.data?.offerId);
        setCartOfferMessage(res?.data?.data?.offerDescription);
        // setOfferMessage(elm?.offerDescription);
        //update setCartData state
        await setCartData(res?.data?.data);
        await setTotalPrice(res?.data?.data?.itemTotal);
        //dispatch api response in addAddToCartData in redux to show data in cart
        await dispatch(addAddToCartData(res?.data?.data));
        //updating isLoader false to stop loading

        if (isUpdateCoupon) {
          res?.data?.data?.offerId !== 0 &&
            (await coupanDiscount(res?.data?.data?.offerId, res?.data?.data));
        }

        if (productDetail) {
          await dispatch(resetOptions(productDetail));
        }
        // if (res?.data?.data.offerId != null) {
        //   coupanDiscount(res?.data?.data.offerId, res?.data?.data);
        // }
        // }
      })
      .catch((err: any) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  //removeItemsInCart api to remove the product in cart
  const removeItemsInCart = async (elm: any) => {
    setIsLoading(true);
    return axios
      .delete(`${PATH}cart/delete`, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail.tokenId?.data,
        },
        data: { id: elm[0]?.productId },
      })
      .then(async (res: any) => {
        if (res?.data?.success) await getCartData(undefined, true); //if response is success then calling getCart api
        if (elm[0]?.productType === 1) {
          await dispatch(addProduct({ data: elm[0], isRemoeve: true }));
        } else if (elm[0]?.productType === 2) {
          await dispatch(addAddon({ data: elm[0], isRemoeve: true }));
        }
      })
      .catch((err: any) => {})
      .finally(() => setIsLoading(false));
  };

  //removeOptionInCart api to remove the product in cart
  const removeOptionInCart = async (option: any) => {
    setIsLoading(true);
    return axios
      .delete(`${PATH}cartOption/delete/${option?.productId}`, {
        method: "delete",
        data: { id: option.id },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail.tokenId?.data,
        },
      })
      .then(async (res: any) => {
        if (res?.data?.success) getCartData(); //if response is success then calling getCart api
        await dispatch(addOption({ data: option, isRemoeve: true })); //dispatch in redux after to remove option from redux state
      })
      .catch((err: any) => {})
      .finally(() => setIsLoading(false));
  };

  //removeItemsInCart api to remove the product in cart
  const removeItems = async (data: any) => {
    console.log("remove", data);
    window.scrollTo(0, 0);
    let updateData = { ...cartData };
    let productItemsIndex = updateData?.cartDetails?.findIndex(
      (elm: any) => elm.id === data?.id
    );
    let filteredElmDetails = updateData?.cartDetails?.filter(
      (elm: any) => elm.id === data?.id
    );
    let updatedProductPriceInCart: any =
      updateData?.carttotal - filteredElmDetails[0]?.productPrice;
    let updatedGst = (updatedProductPriceInCart * 18) / 100;
    let itemTotal = updatedProductPriceInCart + updatedGst;
    removeItemsInCart(filteredElmDetails);
    let cartDetailsUpdate = [...updateData.cartDetails];

    cartDetailsUpdate?.splice(productItemsIndex, 1);
    updateData.cartDetails = cartDetailsUpdate;
    updateData.itemTotal = itemTotal;
    updateData.gst = updatedGst;
    updateData.carttotal = updatedProductPriceInCart;
    console.log("Cart updated cartDetailsUpdate", updateData.offerId);
    // dispatch(addCartDataQuantity(cartDetailsUpdate?.length));

    setCartData({
      updateData,
    });
    dispatch(addAddToCartData(updateData));
    const updatedProductInCart = await cartDetailsUpdate?.filter(
      (elm: any) => elm.productType === 1
    );
    if (updatedProductInCart?.length === 0) {
      dispatch(resetCartData());
      dispatch(addAddToCartData({}));
      navigates(RouteList[0].path);
    }
    // coupanDiscount(data?.orderId);
    // updateAddons(data);
    // getCartData();
  };

  //removeItemsInCart api to remove the product in cart
  const removeoptionsItems = (option: any) => {
    console.log("remove items is working");
    window.scrollTo(0, 0);
    let updateData = { ...cartData };
    const copyCartDetails = [...updateData.cartDetails];
    let filteredOptionsData = copyCartDetails?.filter(
      (elm: any) => elm?.productType === 3 && elm.productId === option.productId
    );
    let optionItemsIndex =
      filteredOptionsData[0].productDetails?.optionItemDetails.findIndex(
        (elm: any) => elm.id === option.id
      );
    let remainingdData = [
      ...filteredOptionsData[0]?.productDetails?.optionItemDetails,
    ];
    removeOptionInCart(option);
    remainingdData?.splice(optionItemsIndex, 1);
    let cartDatIndex = copyCartDetails.findIndex(
      (elm: any) => elm.id === filteredOptionsData[0].id
    );
    let cartDetailsUpdate = { ...updateData.cartDetails[cartDatIndex] };
    let copyproductDetails = { ...cartDetailsUpdate.productDetails };
    let optionItemDetails = [...copyproductDetails.optionItemDetails];
    optionItemDetails = remainingdData;
    copyproductDetails.optionItemDetails = optionItemDetails;
    cartDetailsUpdate.productDetails = copyproductDetails;
    copyCartDetails[cartDatIndex] = cartDetailsUpdate;
    updateData.cartDetails = copyCartDetails;
    console.log("updateData: ", updateData);
    if (updateData?.cartDetails?.length < 1) {
      navigates(RouteList[0].path);
    }
    setCartData(updateData);
  };

  const handleGetOffers = async () => {
    await getOffers();
    await setShowDiscount(!showDiscount);
  };

  //getCartData api to get all the data of cart
  const getOffers = async () => {
    return axios
      .get(`${PATH}offer/list`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail.tokenId?.data,
        },
      })
      .then(async (res: any) => {
        if (res.data.success) setOffer(res?.data?.data?.rows);
      })
      .catch((err: any) => {});
  };

  //----------------------------------stepper---------2----------stepper------------------------------------//

  // const validatingAddress = () => {
  //   let isValid = true;
  //   if (
  //     !userDetail?.firstName &&
  //     !userDetail?.email &&
  //     !userDetail?.address &&
  //     !userDetail?.mobileNo &&
  //     !userDetail?.landmark &&
  //     !userDetail?.pinCode
  //   ) {
  //     isValid = false;
  //   }
  //   if (userDetail?.firstName.length < 3 && userDetail?.firstName.trim()) {
  //     isValid = false;
  //   }
  //   if(userDetail?.email)
  // };

  const handleDeliveryTimeAndSlot = () => {
    setSubmitAddress(true);
    // values.mobileNo = userDetail?.mobileNo;
    const userDetailsPayload = {
      firstName: userDetail?.firstName,
      email: userDetail?.email,
      address: userDetail?.address,
      mobileNo: userDetail?.mobileNo,
      landmark: userDetail?.landmark,
      pinCode: userDetail?.pinCode,
      signupDiscount: 1,
    };
    // if (
    //   userDetailsPayload?.firstName &&
    //   userDetailsPayload?.firstName.trim() &&
    //   userDetailsPayload?.email &&
    //   userDetailsPayload?.address &&
    //   userDetailsPayload?.mobileNo &&
    //   userDetailsPayload?.landmark &&
    //   userDetail?.pinCode
    // ) {
    //   sendUserDetails(userDetailsPayload);
    // } else {
    //   setOpen(true);
    //   setMessage("Please Fill All Details");
    // }
    // setCalenderDateModal(true)
  };

  const handleSnackBar = () => {
    setOpen(false);
  };

  //need a toaster for popUp if any error in api
  //signUp api to update the details of a user
  const sendUserDetails = async (value: any) => {
    setIsLoading(true);
    setSubmitAddress(false);
    // const response = instance;
    // const value = {
    //   firstName: userDetail?.firstName,
    //   email: userDetail?.email,
    //   address: userDetail?.address,
    //   mobileNo: userDetail?.mobileNo,
    //   landmark: userDetail?.landmark,
    //   pinCode: userDetail?.pinCode,
    //   signupDiscount: 1,
    // };

    console.log("sendorderDetials", value, userDetail);
    await axios(PATH + "user/signUp", {
      method: "post",
      data: value,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then((response) => {
        if (response.data.success) {
          setCalenderDateModal(true);
          // setSubmitAddress(false);
        }
      })
      .catch((error: any) => {
        if (error) {
          setOpen(true);
          console.log("error setting", error);
          // setMessage("Please Fill All Details");
        } else {
          setOpen(false);
        }
        // return error.response;
      })
      .finally(() => setIsLoading(false));
  };

  //----------------------------------stepper---------3----------stepper------------------------------------//

  const loadScript = async (src: any) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const updateShippingAddress = async () => {
    setIsLoading(true);

    return axios(
      `${PATH}shippingDetails/update/${addToCartData?.shipping?.id}`,
      {
        method: "put",
        data: {
          shippingAddress: userDetail?.address,
          landmark: userDetail?.landmark,
          deliveryDate: deliveryDate?.deliveryDate,
          from: deliveryDate?.deliveryTime?.from,
          to: deliveryDate?.deliveryTime?.to,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail?.tokenId?.data,
        },
      }
    )
      .then(async (response) => {
        console.log("response in update ", response);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => setIsLoading(false));
  };

  const handlePlaceOrder = async () => {
    await updateShippingAddress();
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    await placeOrderPayment();
  };

  const placeOrderPayment = async () => {
    // const response = instance;
    await axios(PATH + "cart/payment", {
      method: "post",
      // data: { id: coupanId },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then(async (response) => {
        response.data.success && (await placeOrder());
      })
      .catch((error) => {
        console.log("message 614", error);
        if (error) {
          setOpen(true);
          setMessage(error?.response?.data?.message ?? "Cake is not available");
        } else {
          setOpen(false);
        }
        return error.response;
      });
  };

  const placeOrder = async () => {
    // const response = instance;
    await axios(PATH + "cart/order", {
      method: "post",
      data: { amount: Math.trunc(+addToCartData?.itemTotal) },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then((response) => {
        if (response.data.success) {
          let data = response?.data?.data;
          const { amount, id, currency } = data;
          const orderId = id;
          const options = {
            key: "rzp_test_uRmavPre1B9TTy", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "trueCake",
            description: "",
            // image: { logoSvg },
            order_id: id,
            handler: async function (response: any) {
              paymentVerify(response);
            },
            // prefill: {
            //   name: addressDetails.name,
            //   email: addressDetails.email,
            //   contact: `91${addressDetails.mobile}`,
            // },
            theme: {
              color: "#61DAFB",
            },
          };
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        }
      })
      .catch((error) => {
        return error.response;
      });
  };

  const paymentVerify = async (response: any) => {
    // const response = instance;
    await axios(PATH + "cart/paymentVerify", {
      method: "post",
      data: {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then((res) => {
        console.log(
          "orderId, razorpay_order_id, razorpay_payment_id, amount ",
          response
        );
        res.data.success && addOrder(response);
      })
      .catch((error) => {
        // return error.response;
      });
  };

  const addOrder = async (response: any) => {
    console.log(
      "response in addOrder api",
      Math.trunc(+addToCartData?.itemTotal)
    );
    await axios(PATH + "cart/addOrder", {
      method: "post",
      data: {
        orderId: userDetail?.orderId,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        amount: Math.trunc(+addToCartData?.itemTotal),
      },
      // data: { orderId, razorpay_order_id, razorpay_payment_id, amount  },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then(async (response) => {
        if (response.data.success) {
          setOpen(true);
          setMessage(response?.data?.message ?? "payment! done");
          // navigates("/")
          // await onLogOut()
          createCart();
        } else {
          setOpen(false);
        }
      })
      .catch((error) => {
        return error.response;
      });
  };

  //createCart api to create a cart for user
  const createCart = async () => {
    await axios(`${PATH}cart/addCart`, {
      method: "post",
      data: {
        userId: userDetail.id,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then((res: any) => {
        // dispatch(resetUserDetailsState(""));
        dispatch(resetCartState(""));
        dispatch(resetProduct(""));
        dispatch(addUserDetails({ orderId: res?.data?.data?.data?.id }));
        navigates("/");
      })
      .catch((err: any) => {});
  };

  const handleStepper = () => {
    navigates(-1);
    // steppersState <= 1
    //   ? dispatch(addStepperSatate(1))
    //   : dispatch(addStepperSatate(steppersState - 1));
  };

  const onOfferRemove = () => {
    console.log("remove button");
    setCoupanId(0);
    removeOffer();
  };
  const removeOffer = async (
    elm?: any,
    value?: any,
    index?: any,
    price?: any
  ) => {
    let data: any = {
      offerId: null,
      offerAmount: null,
      offerPrice: null,
    };
    await axios(PATH + "cart/updateCart", {
      method: "put",
      data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then(async (res: any) => {
        if (res?.data?.success)
          //set cartDataTotal state
          await setCartDataTotal(+cartData?.carttotal + +productAmount);
        //calling getCartData api to show updated data in cart
        await getCartData();
        //updating isLoader false to stop loading
        setIsLoading(false);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      console.log("className", event.target.className);
      if (
        event.target.className == "coupon-offer-img" ||
        event.target.className == "apply"
      ) {
        // setOpen(false);
      } else {
        setShowDiscount(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
  }, [ref]);
  return (
    <>
      <div
        style={{
          overflow: isLoader ? "hidden" : "auto",
          height: isLoader ? "100vh" : "auto",
          overflowX: "hidden",
        }}
        className="cart-background-img"
      >
        <>
          {isLoader && (
            <div
              style={{
                width: "100vw",
                height: "100vh",
                position: "absolute",
                background: "rgba(0,0,0,0.7)",
                zIndex: 10,
              }}
            >
              <Loader />
            </div>
          )}
          <>
            <NavBar />
            <MobileHeader />
            <div className="scroller-main" style={{ overflowX: "auto" }}>
              <div style={{ display: "flex" }}>
                {/* <CircularCategories /> */}
              </div>
            </div>
            {
              <ToastAlert
                openBar={open}
                message={message}
                handleSnackBar={() => handleSnackBar()}
              />
            }

            <div className="cart-heading-main">
              {/* <div className="back-arrow-icon">
              <img
                src={Images.arrowCard}
                alt="IconCheckbox"
                onClick={() => handleStepper()}
              />
            </div> */}
              <div className="cart-section">
                <div className="back-arrow-icon">
                  {/* <img
                    src={Images.arrowCard}
                    alt="IconCheckbox"
                    onClick={() => handleStepper()}
                  /> */}
                </div>
                <div className="cat-heading-container">
                  <div style={{ display: "flex", position: "relative" }}>
                    {steppersState === 1 ? (
                      <h4 className="heading-category">CART</h4>
                    ) : steppersState === 2 ? (
                      <h4 className="heading-category">ADDRESS</h4>
                    ) : steppersState === 3 ? (
                      <h4 className="heading-category">PAYMENT</h4>
                    ) : (
                      ""
                    )}
                    <div className="cake-logo-div">
                      <img
                        className="cake-logo"
                        src={Images.logo}
                        alt="cake-logo"
                      />
                    </div>
                  </div>
                  <div className="cart-bottom-div"></div>
                </div>
              </div>
              {/* updatedProductInCart === undefined ? (
                 <div
                 style={{
                   width: "100vw",
                   height: "100vh",
                   position:"absolute",
                   background:"rgba(0,0,0,0.7)"
                 }}
               >
                <Loader />
               </div>
              ) : */}
              {/* track location css */}
              {updatedProductInCart && updatedProductInCart.length === 0 ? (
                <div className="d-flex flex-column justify-content-center align-items-center mt-10">
                  <p>Your cart is empty</p>
                  <p style={{ textAlign: "center" }}>
                    {/* Add some delicious food available on our menu to checkout. */}
                    Best Experience for your speical occassion with TrueCakes
                    (Authentic Eggless Baking)
                  </p>
                  <ButtonComponent
                    customClass="balloon-mdl-btn"
                    customStyles={{ marginTop: "25px" }}
                    title="ORDER NOW"
                    type="button"
                    onClick={() => navigates(RouteList[5].path)}
                  />
                </div>
              ) : updatedProductInCart?.length > 0 ? (
                <>
                  <div className="track-location-div">
                    <Box sx={{ width: "100%" }}>
                      <Stepper activeStep={steppersState}>
                        {steps?.map((label, index) => (
                          <Step
                            key={label}
                            onClick={() => {
                              index < steppersState
                                ? dispatch(addStepperSatate(index + 1))
                                : deliveryDate?.deliveryTime
                                ? dispatch(addStepperSatate(index + 1))
                                : dispatch(addStepperSatate(steppersState));
                            }}
                          >
                            <StepLabel>{label}</StepLabel>
                            {/* {label && <div className="add-to-card-middle"></div>} */}
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  </div>
                  {/* cart view */}
                  <div className="add-to-cart-section-top-view">
                    {steppersState === 1 && (
                      <>
                        <div className="add-to-cart-left-view">
                          {cartData?.cartDetails.length > 0 &&
                            cartData?.cartDetails
                              ?.filter(
                                (filterData: any) =>
                                  filterData.productType === 1
                              )
                              ?.map((elm: any, index: number) => {
                                return (
                                  <>
                                    <div
                                      key={elm?.id}
                                      className="add-to-cart-dv mobile-add-to-cart-dv"
                                    >
                                      <div className="add-to-cart-left-sub-div">
                                        <img
                                          className="cart-cake-img"
                                          src={`http://34.200.195.34/upload/${elm?.productDetails?.image}`}
                                          alt="productCake"
                                        />
                                      </div>
                                      <div className="add-to-card-right-sub-div">
                                        <p className="cart-chocolate-truffle">
                                          {elm?.productDetails?.productName}
                                        </p>
                                        <div className="add-to-card-right-sub-text-div">
                                          <div>
                                            <p className="cart-price">
                                              {"\u20B9"}
                                              {elm?.productQuantity > 0
                                                ? elm?.productQuantity *
                                                  elm.productPrice
                                                : elm.productPrice}
                                            </p>
                                          </div>
                                          <div className="cart-inclusive-text">
                                            {/* Inclusive of all taxes */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="cart-quantity-category">
                                      <div>
                                        <input
                                          className="cart-input"
                                          type="text"
                                          value={cakeMessage[elm?.productId]}
                                          onChange={(e: any) =>
                                            handleChangeMessage(
                                              elm,
                                              index,
                                              e.target.value
                                            )
                                          }
                                          placeholder={"Happy Birthday !"}
                                          maxLength={30}
                                        />
                                      </div>
                                      <div>
                                        {elm?.productQuantity > 0 ? (
                                          <QuantityCounter
                                            count={elm?.productQuantity}
                                            addCounterHandler={() =>
                                              addCounterHandler(elm)
                                            }
                                            subCounterHandler={() =>
                                              subCounterHandler(elm)
                                            }
                                          />
                                        ) : (
                                          <>{removeItems(elm)}</>
                                        )}
                                      </div>
                                      <div>
                                        <>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={elm?.measurementId}
                                            onChange={(e) =>
                                              selectWeightHandler(
                                                elm,
                                                index,
                                                e.target.value
                                              )
                                            }
                                          >
                                            {elm?.productDetails?.measurementDetails?.map(
                                              (measurement: any) => (
                                                <MenuItem
                                                  value={measurement.id}
                                                >
                                                  {
                                                    measurement?.measurementSymbol
                                                  }
                                                </MenuItem>
                                              )
                                            )}
                                          </Select>
                                        </>
                                      </div>
                                      <div>
                                        <Crossbtn
                                          handleClick={() => removeItems(elm)}
                                        />
                                      </div>
                                    </div>
                                    <div className="mobile-cart-quantity-category">
                                      <div className="mobile-cart-input">
                                        <input
                                          className="cart-input"
                                          type="text"
                                          value={cakeMessage[elm?.productId]}
                                          onChange={(e: any) =>
                                            handleChangeMessage(
                                              elm,
                                              index,
                                              e.target.value
                                            )
                                          }
                                          placeholder={"Happy Birthday !"}
                                          maxLength={30}
                                        />
                                      </div>
                                    </div>
                                    <div className="mobile-quantity-weight-cross-main">
                                      <div className="mobile-quantity-counter-main">
                                        {elm?.productQuantity > 0 ? (
                                          <QuantityCounter
                                            count={elm?.productQuantity}
                                            addCounterHandler={() =>
                                              addCounterHandler(elm)
                                            }
                                            subCounterHandler={() =>
                                              subCounterHandler(elm)
                                            }
                                          />
                                        ) : (
                                          <>{removeItems(elm)}</>
                                        )}
                                      </div>
                                      <div className="mobile-select-weight-main">
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={
                                            elm?.measurementOrderDetails?.id
                                          }
                                          onChange={(e) =>
                                            selectWeightHandler(
                                              elm,
                                              index,
                                              e.target.value
                                            )
                                          }
                                        >
                                          {elm?.productDetails?.measurementDetails?.map(
                                            (measurement: any) => (
                                              <MenuItem
                                                key={measurement?.id}
                                                value={measurement.id}
                                              >
                                                {measurement?.measurementSymbol}
                                              </MenuItem>
                                            )
                                          )}
                                        </Select>
                                      </div>
                                      <div>
                                        <Crossbtn
                                          handleClick={() => removeItems(elm)}
                                        />
                                      </div>
                                    </div>
                                    <div className="add-to-card-middle "></div>
                                  </>
                                );
                              })}
                          {/* <div className="add-to-card-middle "></div> */}
                          <p
                            onClick={() => addAddonsByLink()}
                            className="Add-addons-cart"
                          >
                            Add Addons
                          </p>
                          {cartData?.cartDetails
                            ?.filter(
                              (filterData: any) => filterData?.productType === 2
                            )
                            ?.map((elm: any) => {
                              return (
                                <div key={elm?.id} className="cart-knife-main">
                                  <div
                                    style={{ display: "flex", width: "50%" }}
                                  >
                                    <div className="addons-img-cart">
                                      <img
                                        className="addons-img-cart"
                                        src={`http://34.200.195.34/upload/${elm?.productDetails?.image}`}
                                        alt="candle"
                                      />
                                    </div>
                                    <div className="text-knife-candle">
                                      <p>{elm?.productDetails?.productName}</p>
                                      <p className="cart-price-dollar">
                                        {"\u20B9"}
                                        {elm?.productPrice}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <QuantityCounter
                                      isShow={true}
                                      count={elm?.productQuantity}
                                    />
                                  </div>
                                  <div>
                                    <Crossbtn
                                      handleClick={() => removeItems(elm)}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          {cartData?.cartDetails
                            ?.filter(
                              (filterData: any) => filterData?.productType === 3
                            )
                            ?.map((elm: any) => {
                              return elm?.productDetails?.optionItemDetails?.map(
                                (elm: any) => {
                                  const {
                                    optionPrice,
                                    optionDetails,
                                    optionQuantity,
                                  } = JSON.parse(JSON.stringify(elm)) ?? {};
                                  return (
                                    <div
                                      key={elm?.id}
                                      className="cart-knife-main"
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          width: "50%",
                                        }}
                                      >
                                        <div className="addons-img-cart">
                                          <img
                                            className="addons-img-cart"
                                            src={`http://34.200.195.34/upload/${optionDetails?.image}`}
                                            alt="candle"
                                          />
                                        </div>
                                        <div className="text-knife-candle">
                                          <p>{optionDetails?.name}</p>
                                          <p className="cart-price-dollar">
                                            {"\u20B9"}
                                            {optionPrice}
                                          </p>
                                        </div>
                                      </div>
                                      <div>
                                        <QuantityCounter
                                          isShow={true}
                                          count={optionQuantity}
                                        />
                                      </div>
                                      <div>
                                        <Crossbtn
                                          handleClick={() =>
                                            removeoptionsItems(elm)
                                          }
                                        />
                                      </div>
                                    </div>
                                  );
                                }
                              );
                            })}
                        </div>
                        <div className="add-to-card-middle"></div>
                        <div className="add-to-cart-right-view">
                          {modal && (
                            <Addons
                              newShow={setModal}
                              ballonMod={setBlModal}
                              addonId={setAddonId}
                              handleGetCartData={getCartData}
                              handleIsAlert={setIsAlert}
                              optionDetail={setOptionDetail}
                            />
                          )}
                          {blModal && (
                            <ModalBallons
                              addonId={addonId}
                              ballonMod={setBlModal}
                              newShow={setModal}
                              handleGetCartData={getCartData}
                              optionDetail={optionDetail}
                            />
                          )}
                          <div className="place-order-btn-div">
                            <ButtonComponent
                              title="PLACE ORDER"
                              type="button"
                              onClick={() => {
                                window.scrollTo(0, 0);
                                ShoeAddressStepper();
                              }}
                              isPadding={true}
                              customClass="place-oreder-btn"
                            />
                          </div>
                          {/* </div> */}
                          <div className="cart-price-detail mt-5">
                            <h4 className="price-details-heading">
                              {/* Price Details */}
                              Bill Details
                            </h4>
                            <div className="mt-5">
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>
                                    {/* Cart Total */}
                                    Item Price
                                  </p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">
                                  {"\u20B9"} {+cartData?.carttotal}
                                </div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>GST</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">
                                  {"\u20B9"} {cartData?.gst.toFixed(2)}
                                </div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Packing Charges</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">Free</div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Delivery Fee</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">Free</div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Offer Apply</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">
                                  {"\u20B9"}
                                  {+cartData?.discount}
                                </div>
                              </div>
                              <div className="price-total-item">
                                <div>
                                  <p className="item-total">
                                    {/* Item Total */}
                                    Payable
                                  </p>
                                </div>
                                <div>
                                  <p className="price-amount">
                                    {"\u20B9"} {+totalPrice.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className="cart-coupon"
                            style={{ justifyContent: "space-between" }}
                          >
                            <div
                              onClick={() => handleGetOffers()}
                              id="ms-2 offer-discount-text"
                              // className="cart-coupon"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                className="coupon-offer-img"
                                src={Images.offerCoupon}
                                alt="candle"
                              />

                              <p
                                style={{ cursor: "pointer" }}
                                className="apply"
                              >
                                {addToCartData?.discount === null ||
                                addToCartData?.discount === 0
                                  ? "Apply Coupan"
                                  : cartOfferMessage}
                              </p>

                              {/* <p
                              style={{
                                position: "absolute",
                                left: "90%",
                                color: "#F8D40C",
                                cursor: "pointer",
                                fontWeight: "bold",
                              }}
                              onClick={()=> onOfferRemove()}
                            >
                              REMOVE
                            </p> */}
                            </div>
                            <div
                              style={{
                                // position: "absolute",
                                // left: "90%",
                                // color: "#F8D40C",
                                cursor: "pointer",
                                // fontWeight: "bold",
                              }}
                            >
                              <Crossbtn handleClick={() => onOfferRemove()} />
                            </div>
                          </div>

                          {showDiscount && (
                            <div className="apply-coupan-container">
                              <div className="apply-coupan-input">
                                <div
                                  className="offer-discount"
                                  style={{ width: "100%" }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      width: "100%",
                                    }}
                                  >
                                    <div className="apply-coupon-dropdown">
                                      <FormControl>
                                        <RadioGroup
                                          aria-labelledby="demo-radio-buttons-group-label"
                                          defaultValue={coupanId}
                                          name="radio-buttons-group"
                                        >
                                          {offer?.map((elm: any) => {
                                            console.log("offer Price", elm);
                                            return (
                                              <FormControlLabel
                                                key={elm?.id}
                                                value={elm?.id}
                                                control={<Radio />}
                                                label={elm?.offerDescription}
                                                // defaultChecked ={true}
                                                // defaultValue={coupanId}
                                                className="ms-2 offer-discount-text"
                                                onChange={() => {
                                                  console.log(
                                                    "offer Price",
                                                    elm.price,
                                                    "total price",
                                                    cartData.carttotal
                                                  );
                                                  if (
                                                    +cartData?.carttotal <=
                                                    (elm?.minPrice === null &&
                                                    elm?.minPrice === 0
                                                      ? elm?.price
                                                      : elm?.minPrice)
                                                  ) {
                                                    console.log(
                                                      "error message"
                                                    );
                                                    setOpen(true);
                                                    setMessage(
                                                      "Offer Invalid!!"
                                                    );
                                                    setShowDiscount(
                                                      !showDiscount
                                                    );
                                                  } else {
                                                    console.log(
                                                      "error message",
                                                      cartData?.carttotal,
                                                      "ssss",
                                                      elm?.price,
                                                      "min0",
                                                      elm?.minPrice
                                                    );
                                                    handleDiscount(elm);
                                                    console.log(
                                                      "ites big",
                                                      elm
                                                    );
                                                  }

                                                  //
                                                }}
                                                style={{
                                                  fontSize: 25,
                                                  fontFamily:
                                                    "Source Sans Pro, Regular",
                                                  fontWeight: 400,
                                                  color: "#313131",
                                                }}
                                              />
                                            );
                                          })}
                                        </RadioGroup>
                                      </FormControl>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* <div
                      id="ms-2 offer-discount-text "
                      onClick={() => handleGetOffers()}
                      // style={{ marginTop: "20px" }}
                    > */}
                          {/* <input
                        className="cart-coupon"
                        type="text"
                        placeholder={
                          offerMessage ? offerMessage : "Apply Coupan"
                        }
                      /> */}
                          {/* <div className="cart-coupon">
                      { offerMessage ? offerMessage : "Apply Coupan"}
                      </div> */}
                          {/* <div>
                        <img
                          className="coupon-offer-img"
                          src={Images.offerCoupon}
                          alt="candle"
                        />
                      </div> */}
                          {/* </div> */}

                          <div className="mobile-place-order-btn-div">
                            <ButtonComponent
                              title="PLACE ORDER"
                              type="button"
                              onClick={() => ShoeAddressStepper()}
                              isPadding={true}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {/* )} */}
                  </div>
                  {/* Address view */}
                  {/* ----------------------------------stepper---------2----------stepper------------------------------------ */}
                  <div className="add-to-cart-section-top-view">
                    {steppersState === 2 && (
                      <>
                        <div className="select-address">
                          <Link
                            to="/deliveryAddressess"
                            className="select-delivery-address-div"
                            state={{ isShow: true }}
                          >
                            Select Delivery Address
                          </Link>
                        </div>
                        <div className="add-to-cart-left-view">
                          <DeliveryAddress
                            isCart={true}
                            submitAddress={submitAddress}
                            selectName={cartData?.shipping?.name}
                            selectAddres={cartData?.shipping?.shippingAddress}
                            selectLandMark={cartData?.shipping?.landmark}
                            setSubmitAddress={setSubmitAddress}
                            // setCalenderDateModal={setCalenderDateModal}
                            sendUserDetails={sendUserDetails}
                          />
                        </div>
                        <div className="add-to-card-middle"></div>
                        <div className="add-to-cart-right-view">
                          <div className="save-delivery-btn">
                            <ButtonComponent
                              title="DELIVERY TIME AND SLOT"
                              type="button"
                              onClick={() => handleDeliveryTimeAndSlot()}
                            />
                          </div>
                          {calenderDateModal && (
                            <CalenderDate
                              show={setCalenderDateModal}
                              timeMod={setTimeModal}
                            />
                          )}
                          {timeModal && (
                            <DeliveryTimeSlot
                              show={setCalenderDateModal}
                              showCal={setModal}
                              timeMod={setTimeModal}
                              handleGetCartData={getCartData}
                              onClick={() => setStepper({ payment: true })}
                            />
                          )}
                          <div className="cart-price-detail">
                            <h4 className="price-details-heading">
                              {/* Price Details */}
                              Bill Details
                            </h4>
                            <div className="mt-5">
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>
                                    {/* Cart Total */}
                                    Item Price
                                  </p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">
                                  {"\u20B9"} {+cartData?.carttotal}
                                </div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>GST</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">
                                  {"\u20B9"} {cartData?.gst.toFixed(2)}
                                </div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Packing Charges</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">Free</div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Delivery Fee</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">Free</div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Offer Apply</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">
                                  {"\u20B9"}
                                  {+cartData?.discount}
                                </div>
                              </div>
                              <div className="price-total-item">
                                <div>
                                  <p className="item-total">
                                    {/* Item Total */}
                                    Payable
                                  </p>
                                </div>
                                <div>
                                  <p className="price-amount">
                                    {"\u20B9"} {+totalPrice.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {/* payment view */}
                  {/* ----------------------------------stepper---------3----------stepper------------------------------------ */}

                  <div className="add-to-cart-section-top-view">
                    {steppersState === 3 && (
                      <>
                        {window.scrollTo(0, 0)}
                        <div className="add-to-cart-payment-left-view">
                          <Link to="" className="main-input-div">
                            <div
                              className="add-address-container"
                              onClick={() => handlePlaceOrder()}
                            >
                              <div className="add-address-div">
                                <p className="add-address-title">RAZOR-PAY</p>
                              </div>
                              <div>
                                <img
                                  src={Images.rightarrow}
                                  alt=""
                                  className="rightArrow"
                                />
                              </div>
                            </div>
                          </Link>
                          {/* <Link
                      to=""
                      state={{ show: true }}
                      className="main-input-div mt-4"
                    >
                      <div className="add-address-container">
                        <div className="add-address-div">
                          <p className="add-address-title">BHIM UPI</p>
                        </div>
                        <div>
                          <img
                            src={Images.rightarrow}
                            alt=""
                            className="rightArrow"
                          />
                        </div>
                      </div>
                    </Link>
                    <Link to="" className="main-input-div mt-4">
                      <div className="add-address-container">
                        <div className="add-address-div">
                          <p className="add-address-title">PAYTM</p>
                        </div>
                        <div>
                          <img
                            src={Images.rightarrow}
                            alt=""
                            className="rightArrow"
                          />
                        </div>
                      </div>
                    </Link>
                    <Link to="" className="main-input-div mt-4">
                      <div className="add-address-container">
                        <div className="add-address-div">
                          <p className="add-address-title">NET BANKING</p>
                        </div>
                        <div>
                          <img
                            src={Images.rightarrow}
                            alt=""
                            className="rightArrow"
                          />
                        </div>
                      </div>
                    </Link> */}
                        </div>
                        <div className="add-to-card-middle"></div>
                        <div className="add-to-cart-payment-right-view">
                          {/* <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <ButtonComponent
                        title="PLACE ORDER"
                        type="button"
                        onClick={handlePlaceOrder}
                        isPadding={true}
                      />
                    </div> */}
                          <div className="cart-price-detail">
                            <div className="d-flex justify-content-between">
                              <h4 className="price-details-heading">
                                Delivery Address
                              </h4>
                              <Link
                                to="/deliveryAddressess"
                                className="change-delivery-address-div"
                                state={{ isShow: true }}
                              >
                                Change Delivery Address
                              </Link>
                            </div>
                            <div>
                              <div className="price-detail-div">
                                {/* <div className="cart-total">
                                  <p>Email Address</p>
                                </div>
                                <div className="card-middle"> : </div>
                                <div className="card-amount">
                                  {userDetail?.email}
                                </div> */}
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Mobile No.</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">
                                  {userDetail?.mobileNo}
                                </div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Alternate Mobile No.</p>
                                </div>
                                <div className="card-middle"> : </div>
                                <div className="card-amount">
                                  {cartData?.shipping?.mobileNo}
                                </div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Location</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">
                                  {cartData?.shipping?.shippingAddress}
                                </div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Landmark</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">
                                  {cartData?.shipping?.landmark}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="cart-price-detail">
                            <div className="d-flex justify-content-between">
                              <h4 className="price-details-heading">
                                Delivery Time
                              </h4>
                              <Link
                                to=""
                                className="change-delivery-address-div"
                                onClick={() => setCalenderDateModal(true)}
                              >
                                Change Delivery Time
                              </Link>
                              {calenderDateModal && (
                                <CalenderDate
                                  show={setCalenderDateModal}
                                  timeMod={setTimeModal}
                                />
                              )}
                              {timeModal && (
                                <DeliveryTimeSlot
                                  show={setCalenderDateModal}
                                  showCal={setModal}
                                  timeMod={setTimeModal}
                                  handleGetCartData={getCartData}
                                  onClick={() => setStepper({ payment: true })}
                                />
                              )}
                            </div>
                            <div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Time</p>
                                </div>
                                <div className="card-middle"> : </div>
                                {cartData?.shipping?.from ||
                                  deliveryDate?.deliveryTime?.from}{" "}
                                -{" "}
                                {cartData?.shipping?.to ??
                                  deliveryDate?.deliveryTime?.to}
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Delivery Date</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">
                                  <Moment format="YYYY/MM/DD">
                                    {dateToFormat}
                                  </Moment>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="cart-price-detail">
                            <h4 className="price-details-heading">
                              Price Details
                            </h4>
                            <div className="mt-5">
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Cart Total</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">
                                  {"\u20B9"} {+cartData?.carttotal}
                                </div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>GST</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">
                                  {"\u20B9"} {cartData?.gst}
                                </div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Packing Charges</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">Free</div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Delivery Fee</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">Free</div>
                              </div>
                              <div className="price-detail-div">
                                <div className="cart-total">
                                  <p>Offer Apply</p>
                                </div>
                                <div className="card-middle">:</div>
                                <div className="card-amount">
                                  {"\u20B9"}
                                  {+cartData?.discount}
                                </div>
                              </div>
                              <div className="price-total-item">
                                <div>
                                  <p className="item-total">Item Total</p>
                                </div>
                                <div>
                                  <p className="price-amount">
                                    {"\u20B9"} {+totalPrice.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <Footer data={landingConstants.footerData} />
            <MobileFooter data={landingConstants.footerData} />
          </>
        </>
      </div>
      <FooterMenuTab menuData={true} />
    </>
  );
};
export default memo(AddToCart);
