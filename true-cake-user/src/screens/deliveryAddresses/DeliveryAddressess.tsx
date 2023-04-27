import React, { useEffect, useState, memo } from "react";
import CircularCategories from "../../components/circularCategory/CircularCategory";
import Footer from "../../components/footer/Footer";
import FooterMenuTab from "../../components/footerMenuTab/FooterMenuTab";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import NavBar from "../../components/navBar/NavBar";
import Images from "../../constant/Images";
// import Radio from "@mui/material/Radio";
import { Radio } from "@mui/material";
import "./style.css";
import axios from "axios";
import { PATH } from "../../constant/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails } from "../reduxSetup/UserDetailsSlice";
import CalenderDate from "../../components/calendar/CalenderDate";
import ButtonComponent from "../../components/button/Button";
import DeliveryTimeSlot from "../../components/deliveryTimeSlot/DeliveryTimeSlot";
import { useNavigate, useLocation } from "react-router-dom";
// import CalenderDate from "../../components/calendar/CalenderDate";
import { landingConstants } from "../../constant/Constant";
import Crossbtn from "../../components/croossbtn/Crossbtn";
import {
  addStepperSatate,
  defultAddress,
  selectAddress,
} from "../../screens/reduxSetup/CartSlice";
import Loader from "../../components/loader/Loader";
import ToastAlert from "../../components/Toast/Toast";
import ConfirmationPopup from "../../components/confirmationPopup/ConfirmationPopup";

const DeliveryAddressess = () => {
  const {
    deliveryDate,
    addToCartData,
    selectAddressData,
    steppersState,
    selectDefultAddress,
  } = useSelector((state: any) => state.addToCart);
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isSelected, setIsSelected] = useState("0");

  const { userDetail } = useSelector((state: any) => state.userDetails);
  const [isLoader, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [isDelete, setIsDelete] = useState<any>({});
  const { isShow, isTop } = location?.state ?? {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    console.log("address", event.target.value);
    dispatch(selectAddress(event.target.value));
    setIsSelected(event.target.value);
  };
  console.log("select address", selectAddressData);
  console.log("isTop", isTop);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAddresses();
  }, []);

  const getAddresses = async () => {
    setIsLoading(true);

    console.log("checking ----------- ");
    return axios
      .get(`${PATH}address/list`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail?.tokenId?.data,
        },
      })
      .then((response) => {
        setIsLoading(false);
        console.log("selected data", response?.data?.data);
        // response.data.data.length === 0
        //   ? navigate("/deliveryaddress")
        //   :
        setAddresses(response?.data?.data);
        dispatch(defultAddress(response?.data?.data[0].id));
        selectAddressData?.length === 0 &&
          dispatch(selectAddress(response?.data?.data[0].id));
        console.log("response?.data?.data", response?.data?.data[0]);
        setIsSelected(response?.data?.data[0]?.id);
      })
      .catch((error) => {
        console.log("error msg", error);
      });
  };

  const handleSnackBar = () => {
    setOpen(false);
  };

  const updateShippingAddress = async (selectedAddress: any) => {
    return axios(
      `${PATH}shippingDetails/update/${addToCartData?.shipping?.id}`,
      {
        method: "put",
        data: {
          shippingAddress: selectedAddress?.addresses,
          landmark: selectedAddress?.landmark,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail?.tokenId?.data,
        },
      }
    )
      .then(async (response) => {
        if (response?.data?.success) {
          if (steppersState === 2) {
            await dispatch(addStepperSatate(2));
            navigate("/cart");
          } else {
            await dispatch(addStepperSatate(3));
            navigate("/cart");
          }
        }
        // return response;
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

  //removeItemsInCart api to remove the product in cart
  const removeItemsInCart = async (id: any) => {
    return axios
      .delete(`${PATH}address/delete/${id}`, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail.tokenId?.data,
        },
      })
      .catch((err: any) => {});
  };
  console.log("address", addresses);
  const continueHandler = async () => {
    const selectedAddress: any = addresses.find(
      (elm: any) => elm.id == isSelected
    );
    console.log("selected", selectedAddress);
    dispatch(
      addUserDetails({
        name: selectedAddress?.name,
        address: selectedAddress?.addresses,
        landmark: selectedAddress?.landmark,
      })
    );
    if (deliveryDate) {
      console.log("deliveryData", deliveryDate);
      await updateShippingAddress(selectedAddress);
      // await dispatch(addStepperSatate(1))
      // navigate("/cart ")
    }
    // else {
    // setModal(true);

    // }
  };

  const removeItems = (id: any) => {
    let addressData = [...addresses];
    let productItemsIndex = addressData?.findIndex(
      (elm: any) => elm?.id === id
    );
    removeItemsInCart(id);
    addressData?.splice(productItemsIndex, 1);
    setAddresses(addressData);
  };

  const handleDeliveryTimeSlot = (elm?: any) => {
    navigate(`/deliveryaddress/${elm.id}`, {
      state: {
        data: elm,
        isNewAdded: elm ? false : true,
      },
    });
  };

  const handleNavigate = () => {
    navigate("/profile");
  };

  const handleDelete = (id: any) => {
    setIsDelete({ id: id, confirm: true });
  };
  const handleConfirm = () => {
    removeItems(isDelete.id);
    setIsDelete({ confirm: false });
  };

  const handleCancle = () => {
    setIsDelete({ confirm: false });
  };

  return (
    <>
      {isDelete.confirm && (
        <ConfirmationPopup
          onHandleConfirm={handleConfirm}
          onHandleCancle={handleCancle}
        />
      )}
      {modal && <CalenderDate show={setModal} timeMod={setTimeModal} />}
      {timeModal && (
        <DeliveryTimeSlot showCal={setModal} timeMod={setTimeModal} />
      )}
      <div className="delivery-addresses-container">
        <NavBar />
        <MobileHeader />
        {/* <div className="circular-cat-main">
          <CircularCategories color={true} />
        </div> */}
        <div className="delivery-addresssess-main">
          <div className="delivery-addressess-heading-div">
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
                  <h4 className="heading-category">ADDRESSES</h4>
                </div>
                <div className="cake-logo-div">
                  <img
                    className="cake-logo"
                    src={Images.logo}
                    alt="cake-logo"
                  />
                </div>
              </div>
              <div className="delivery-addressess-heading-bottom-div"></div>
            </div>
          </div>
          <div className="delivery-addressess-edit-main">
            {isLoader ? (
              <Loader />
            ) : (
              <>
                {addresses?.map((elm: any, idx: number) => {
                  return (
                    <div
                      key={elm.id}
                      className="delivery-addressess-edit-main-div mt-4"
                    >
                      <div className="radio-btn-delivery-address">
                        {isShow && (
                          <Radio
                            // checked={isRadioSelected(elm.id)}
                            value={elm.id}
                            checked={selectAddressData == elm.id ? true : false}
                            onChange={(e: any) => handleChange(e)}
                            name="radio-buttons"
                            inputProps={{ "aria-label": "A" }}
                          />
                        )}
                      </div>

                      <div
                        className={
                          // !isShow
                          //   ? "delivery-addressess-right-div-mobile justify-content-between"
                          //   :
                          "delivery-addressess-right-div justify-content-between"
                        }
                      >
                        <div className="delivery-addressess-right-content">
                          <img
                            style={{ width: "20px", height: "20px" }}
                            src={Images.locationBlack}
                            alt=""
                          />
                          <p className="delivery-address-pera-div ms-3">
                            {elm?.addresses}, <br /> {elm?.landmark}
                          </p>
                        </div>
                        {selectDefultAddress && isSelected === elm.id ? null : (
                          <div className="delivery-address-edit-section">
                            <img
                              className="delivery-address-edit-section-img"
                              // style={{ width: "15px", height: "15 px" }}
                              src={Images.editBlack}
                              onClick={() => handleDeliveryTimeSlot(elm)}
                              alt=""
                            />
                          </div>
                        )}
                        {selectDefultAddress && isSelected === elm.id ? null : (
                          <div
                            className="delivery-address-cross-btn"
                            // style={{ width: "25px", height: "25px" }}
                          >
                            <Crossbtn
                              handleClick={() => handleDelete(elm.id)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className="time-slot-btn mt-5">
            <ButtonComponent
              customClass={
                isShow ? "continue-common-button" : "add-delivery-address-btn"
              }
              title="ADD NEW DELIVERY ADDRESS"
              type="submit"
              onClick={() => navigate("/deliveryaddress")}
            />

            {isShow && (
              <ButtonComponent
                customClass="continue-common-button"
                title="Continue"
                type="submit"
                onClick={continueHandler}
              />
            )}
          </div>
        </div>
        <Footer data={landingConstants.footerData} />
        <MobileFooter data={landingConstants.footerData} />
        <FooterMenuTab />

        <ToastAlert
          openBar={open}
          message={message}
          handleSnackBar={() => handleSnackBar()}
        />
      </div>
    </>
  );
};

export default memo(DeliveryAddressess);
