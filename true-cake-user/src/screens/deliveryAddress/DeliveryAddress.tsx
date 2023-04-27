import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navBar/NavBar";
import ButtonComponent from "../../components/button/Button";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import "./style.css";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import { useState, memo, useEffect, forwardRef, useCallback } from "react";
import CalenderDate from "../../components/calendar/CalenderDate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Images from "../../constant/Images";
import DeliveryTimeSlot from "../../components/deliveryTimeSlot/DeliveryTimeSlot";
import { landingConstants, PATH } from "../../constant/Constant";
import { addUserDetails } from "../reduxSetup/UserDetailsSlice";
import FooterMenuTab from "../../components/footerMenuTab/FooterMenuTab";
import axios from "axios";
import ToastAlert from "../../components/Toast/Toast";
import CircularCategory from "../../components/circularCategory/CircularCategory";
import Loader from "../../components/loader/Loader";
import userEvent from "@testing-library/user-event";

const DeliveryAddress = forwardRef((props: any, ref: any) => {
  const { selectAddressData } = useSelector((state: any) => state.addToCart);
  const navigate = useNavigate();
  const location = useLocation();
  const isCart = props.isCart;
  const [modal, setModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const { data, delivery } = location?.state ?? {};
  const { userDetail } = useSelector((state: any) => state.userDetails);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const params = useParams();
  const [input, setInput] = useState<any>({});
  const [error, setError] = useState<any>({});
  // const [locations, setLocation] = useState<string>("");
  console.log(
    "addAddress props.submitAddress",
    props.submitAddress,
    "userDetail?.location",
    userDetail,
    params,
    location?.state
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("userDetail", userDetail?.address, isCart);
    params.id && getAddressById();
    if (isCart) {
      const inputdata = {
        firstName: userDetail?.name ?? userDetail?.firstName ?? "",
        address: userDetail?.address ?? props?.selectAddres ?? "",
        mobile: userDetail?.mobileNo ?? "",
        // address: userDetail?.address ?? "",
        landmark: userDetail?.landmark ?? props.selectLandMark ?? "",
        // pinCode:userDetail?.pinCode ?? ""
      };
      setInput(inputdata);
    }
  }, []);
  console.log("propes data", props);
  const getAddressById = () => {
    setIsLoader(true);
    return axios
      .get(`${PATH}address/list/${params.id ? params.id : selectAddressData}`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail?.tokenId?.data,
        },
      })
      .then((response) => {
        console.log("Response by id", response?.data?.data);
        const inputData = {
          firstName: response?.data?.data?.name,
          address: delivery
            ? userDetail.location
            : response?.data?.data?.addresses,
          mobile: userDetail?.mobileNo,
          landmark: response?.data?.data?.landmark,
          // pincode:response?.data?.data?.pinCode,
        };
        setInput(inputData);
        setIsLoader(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // useeffect with dependency
  useEffect(() => {
    console.log("changing submitAddress", props.submitAddress);
    if (props.submitAddress) {
      console.log("submit", props.submitAddress);
      handleSubmit(false);
    }
  }, [props.submitAddress]);

  const handleChange = useCallback((event: any): any => {
    const { name, value } = event.target ?? event;
    console.log("handlechangr", event?.target);
    setInput((prev: any) => ({ ...prev, [name]: value }));
    setError((prev: any) => ({ ...prev, [name]: "" }));
    // dispatch(addUserDetails({ [name]: value }));
  }, []);

  //validation for input field
  const validation = () => {
    let isValid = true;
    let updateError = { ...error };

    if (!input.firstName || input.firstName === " ") {
      updateError.firstName = "Please enter the Name.";
      isValid = false;
    } else if (input.firstName.toString().length < 3) {
      updateError.firstName = "Minimum 3 letter is required.";
      isValid = false;
    }

    if (input.Altmobile && input.Altmobile.length !== 10) {
      updateError.Altmobile = "Enter a valid number.";
      isValid = false;
    }

    if (!input.address || input.address === " ") {
      updateError.address = "Please enter the address.";
      isValid = false;
    }

    if (!input.landmark || input.landmark === " ") {
      updateError.landmark = "Please enter the Landmark.";
      isValid = false;
    }

    setError(updateError);
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e && e.preventDefault();
    console.log("validation", validation());
    if (validation()) {
      // values.mobileNo = userDetail?.mobileNo;
      const addAddress = {
        name: input?.firstName?.trim(),
        // email: values?.email,
        mobileNo: userDetail?.mobileNo,
        alternateNo: input?.Altmobile,
        address: input?.address?.trim(),
        landmark: input?.landmark.trim(),
        // pinCode: +values?.pinCode,
      };

      const signupPayload = {
        firstName: input?.firstName?.trim(),
        // email: values?.email,
        mobileNo: userDetail?.mobileNo,
        alternateNo: input?.Altmobile,
        address: input?.address?.trim(),
        landmark: input?.landmark.trim(),
        // pinCode: +values?.pinCode,
      };

      console.log(
        "addAddress props.submitAddress in onsubmit",
        addAddress,
        props.submitAddress
      );
      userDetail?.address?.length === 0 && dispatch(addUserDetails(addAddress));
      props.submitAddress
        ? props.sendUserDetails(signupPayload)
        : data
        ? await updateShippingAddress(addAddress) // update address, when we want to update profile of the user
        : await addDeliveryAddress(addAddress); // add adress like want to send on another address then need to add it
    }
    props.submitAddress && props.setSubmitAddress(false);
  };
  console.log("data", data);
  //updateShippingAddress to update shipping address of user
  const updateShippingAddress = async (addAddress: any) => {
    await axios(`${PATH}address/update/${data?.id}`, {
      method: "put",
      data: {
        name: addAddress.name,
        email: addAddress.email,
        mobileNo: addAddress.mobileNo,
        address: addAddress?.address,
        landmark: addAddress?.landmark,
        // pinCode: addAddress.pinCode,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then((response) => {
        if (response?.data?.success) {
          // props.submitAddress
          //   ? props.setCalenderDateModal(true)
          //   :
          handleNavigate();
        }
        // return response;
      })
      .catch((error) => {
        if (error) {
          setOpen(true);
          setMessage("Nothing To Update");
        } else {
          setOpen(false);
        }
        // return error.response;
      });
  };

  //addDeliveryAddress to add new address of a user
  const addDeliveryAddress = async (value: any) => {
    await axios(PATH + "address/add", {
      method: "post",
      data: value,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then(async (response) => {
        console.log("resposne", response?.data?.message);
        setOpen(true);
        setMessage(response?.data?.message);
        if (response?.data?.success) {
          console.log("resposne", response);
          handleNavigate();
        }
      })
      .catch((error) => {
        if (error) {
          setOpen(true);
          setMessage(error?.response?.data?.message);
        } else {
          setOpen(false);
        }
      });
  };

  const handleSnackBar = () => {
    setOpen(false);
  };

  const handleNavigate = () => {
    navigate("/deliveryAddressess");
  };

  const handleClick = (boolean: Boolean) => {
    const MapAddress = isCart ? "Location" : "Address";
    navigate("/location", {
      state: { heading: MapAddress, showbutton: boolean, id: params.id },
    });
  };
  console.log("location", location?.state?.address?.replace(/d*/, " "));

  // const onHandleLocateMe = () => {
  //   if (window.navigator.geolocation) {
  //     window.navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const pos = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };
  //         getAddress(pos.lat, pos.lng);
  //         setLocation(pos);
  //         map && map.setCenter(pos);
  //       },
  //       (error: any) => {}
  //     );
  //   }
  // };

  useEffect(() => {
    if (location?.state?.address) {
      setInput((prev: any) => ({ ...prev, address: location?.state?.address }));
    }
  }, [location?.state?.address]);

  return (
    <>
      <div className="delivery-address-main">
        {!isCart && (
          <>
            <NavBar /> <MobileHeader />
            <div className="circular-cat-main">
              {/* <CircularCategory /> */}
            </div>
          </>
        )}
        <div
          className={isCart ? "delivery-container" : "cart-delivery-container"}
        >
          {!isCart && (
            <div className="delivery-div">
              <div className="cat-heading-container">
                <div className="back-arrow-icon">
                  <img
                    src={Images.arrowCard}
                    alt="IconCheckbox"
                    onClick={() => handleNavigate()}
                  />
                </div>
                <div style={{ display: "flex", position: "relative" }}>
                  <div className="cat-heading-div">
                    <h4 className="heading-category">ADD ADDRESS</h4>
                  </div>
                  <div className="cake-logo-div">
                    <img
                      className="cake-logo"
                      src={Images.logo}
                      alt="cake-logo"
                    />
                  </div>
                </div>
                <div className="delivery-address-bottom-div"></div>
              </div>
            </div>
          )}
          {isLoader ? (
            <Loader />
          ) : (
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="inputbox-main-div">
                <div>
                  <label className="input-lable ">Name*</label>
                  <input
                    className="inputbox-txt"
                    type="text"
                    name="firstName"
                    disabled={
                      isCart && (userDetail.name || userDetail?.firstName)
                        ? true
                        : false
                    }
                    value={
                      !isCart
                        ? input.firstName
                        : (userDetail.name?.length > 0 && userDetail.name) ||
                          (userDetail?.firstName?.length > 0 &&
                            userDetail?.firstName) ||
                          input.firstName
                    }
                    onChange={handleChange}
                  />
                  {error.firstName && (
                    <p className="delivery-address-foam">{error.firstName}</p>
                  )}
                </div>

                <div className="label-div">
                  <label className="input-lable ">Mobile No.*</label>
                  <input
                    className="inputbox-txt "
                    disabled={true}
                    type="number"
                    name="mobile"
                    defaultValue={userDetail?.mobileNo}
                    // onChange={handleChange}
                  />
                </div>
                <div className="label-div">
                  <label className="input-lable ">Alternate Mobile No.*</label>
                  <input
                    className="inputbox-txt "
                    type="number"
                    name="Altmobile"
                    value={input.Altmobile}
                    onChange={handleChange}
                  />
                  {error.Altmobile && (
                    <p className="delivery-address-foam">{error.Altmobile}</p>
                  )}
                </div>
                <div className="label-div">
                  <label className="input-lable ">Location*</label>
                  <input
                    className="inputbox-txt "
                    type="text"
                    name="address"
                    placeholder="Search street, locality..."
                    value={input.address}
                    onChange={handleChange}
                    onClick={() => handleClick(false)}
                  />
                  {error.address && (
                    <p className="delivery-address-foam">{error.address}</p>
                  )}
                </div>
                <div className="gps-main-div">
                  <div className="use-current-location-address">
                    <img
                      className="gps-img"
                      src={Images.gpsIcon}
                      alt="location"
                    />
                    <p
                      className="use-my-current-location ms-2"
                      onClick={() => handleClick(true)}
                    >
                      Use my current location
                    </p>
                  </div>
                </div>

                <div className="label-div">
                  <label className="input-lable ">Landmark*</label>
                  <input
                    className="inputbox-txt"
                    type="text"
                    name="landmark"
                    value={input.landmark}
                    onChange={handleChange}
                  />
                  {error.landmark && (
                    <p className="delivery-address-foam">{error.landmark}</p>
                  )}
                </div>

                <div className="time-slot-btn">
                  {!isCart && (
                    <ButtonComponent
                      title={"SAVE"}
                      type="submit"
                      isPadding={true}
                      customClass="add-delivery-address-btn "
                    />
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
        {!isCart && <Footer data={landingConstants.footerData} />}
        {!isCart && <MobileFooter data={landingConstants.footerData} />}
        {!isCart && <FooterMenuTab />}
      </div>

      {modal && <CalenderDate show={setModal} timeMod={setTimeModal} />}
      {timeModal && (
        <DeliveryTimeSlot showCal={setModal} timeMod={setTimeModal} />
      )}
      {open ? (
        <ToastAlert
          openBar={open}
          message={message}
          handleSnackBar={() => handleSnackBar()}
        />
      ) : null}
    </>
  );
});
export default memo(DeliveryAddress);
