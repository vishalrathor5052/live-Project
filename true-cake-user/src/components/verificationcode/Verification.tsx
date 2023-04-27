import React from "react";
import "./style.css";
import ButtonComponent from "../button/Button";
import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import CalenderDate from "../calendar/CalenderDate";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PATH, verifyOtpInputList } from "../../constant/Constant";
import { addUserDetails } from "../../screens/reduxSetup/UserDetailsSlice";
import setUpInterceptor from "../axios/Interceptor";
import { addStepperSatate } from "../../screens/reduxSetup/CartSlice";
import { Link } from "react-router-dom";

const Verification = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { show } = props;
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState<Record<string, string | any>>({});
  const [error, setError] = useState("");
  const { userDetail } = useSelector((state: any) => state.userDetails);
  const {products,addons,options } = useSelector((state:any)=>state.addToCart)
  const handleClose = () => {
    show(false);
  };



  const handleSubmit = async () => {
    if (!value.opt1 || !value.opt2 || !value.opt3 || !value.opt4) {
      setError("Please enter 4 digit OTP");
    } else {
      setError("");
      const completeOtp: Number = Number(
        value.opt1?.concat(value.opt2, value.opt3, value.opt4)
      );
      const payload = {
        id: userDetail.userId,
        otp: completeOtp,
      };
      await sendOtp(payload);
    }
  };

  const handleChange = (e: any) => {
    setValue((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    const nextElementSibling = e.target
      .nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const sendOtp = (value: any) => {
    return axios(PATH + "user/verifyOtp", {
      method: "post",
      data: value,
    })
      .then(async (response) => {
        setUpInterceptor(response?.data?.data);
        await dispatch(
          addUserDetails({
            tokenId: response?.data?.data,
            isVerify: response?.data?.isVerify,
          })
        );
        //   ? navigate("/cart", { state: { show: false } })
        //   : navigate("/deliveryaddress", {
        //     state: { show: false, heading: true },
        //   });

        //payload for createCart api
        const User = {
          userId: userDetail.id,
        };
        if (!userDetail?.orderId) {
          await createCart(User, response?.data?.data?.data);
        }
        let productDetails = [...products, ...addons, ...options];
        //create an empty array to store api payload
        let apiData: any = [];

        //getting data for api payload from productDetails
        let data = productDetails?.map((elm: any) => {
          console.log("elm in productDetails",elm)
          //An empty object to store temperary data
          let temp: any = {};
          temp.productId = elm?.productId ?? elm?.id; //if elm.productType is equal to 3 pass elm.productId otherwise elm.id
          temp.productType = elm?.productType ?? elm?.type;
          temp.productQuantity = elm?.productType === 3 ? 0 : elm?.productQuantity; //if elm.productType is not equal to 3 pass 0  otherwise  elm.productQuantity
          temp.productPrice =elm?.type === 1 ? +elm?.measurementDetails[0]?.productPrice: elm?.productType === 2 ? +elm?.price: 0;
          temp.measurementId = elm?.type === 1 ?  elm?.measurementDetails[0]?.id : null;
          temp.message =  elm?.type === 1 ?  elm?.message : null ;
          apiData.push(temp); //push temp data in apiData (empty array)
        });

        console.log("apiData in 100",apiData)

        let optionData: any = [];

        options.map((elm: any) => {
          //An empty object to store temperary data
          let temp: any = {};
          temp.optionId = elm?.id;
          temp.optionQuantity = elm?.productQuantity;
          temp.optionPrice = +elm?.price;
          optionData.push(temp); //push temp data in apiData (empty array)
        });
        console.log("apiData in 100",options,optionData)

        let orderValue = {
          productsList: apiData,
          optionsList: optionData,
        };
        if (apiData?.length > 0) {
          await addToCartApi(orderValue, response?.data?.data?.data);
        }
        navigate("/cart");
      })
      .catch((error) => {
        console.error(error);
   
        setError("Enter Correct OTP.");
        return error.response;

      });
  };

  const resendOtp = () => {
    return axios(PATH + "user/resedOtp", {
      method: "post",
      data: { userId: userDetail.userId, mobileNo: userDetail.mobile },
    })
      .then((response) => {
        //   ? navigate("/deliveryAddressess", { state: { show: false } })
        return response;
      })
      .catch((error) => {
        setError("Enter Correct OPT.");
        return error.response;
      });
  };

  //createCart api to create a cart for user
  const createCart = async (User: any, tokenId: string) => {
    await axios(`${PATH}cart/addCart`, {
      method: "post",
      data: User,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenId,
      },
    })
      .then((res: any) => {
        dispatch(addUserDetails({ orderId: res?.data?.data?.data?.id }));
      })
      .catch((err: any) => {
      });
  };

  const addToCartApi = async (value: any, tokenId: string) => {
    await axios(PATH + "cart/orderItem", {
      method: "post",
      data: value,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenId,
      },
    })
      .then(async (value) => {
        await dispatch(addStepperSatate(1));
        await navigate("/cart");
      })
      .catch((error) => {
        return error.value;
      });
  };

  return (
    <>
      {/* Please use above design code for verification modal pop up */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="sign-in-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="verify-code-div">
            <div>
              <h4 className="verify-code-title">VERIFICATION CODE</h4>
              <p className="verify-code-pera">
                We have sent the code verification to your mobile number
              </p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="phone-number-txt">+91 {props.number}</p>
          </div>

          <div className="input-verify-container">
            {verifyOtpInputList.map((elm: any, idx: number) => {
              return (
                <input
                key={idx}
                  type="text"
                  name={elm.name}
                  min="0"
                  max="9"
                  maxLength={1}
                  minLength={1}
                  value={value[elm.name]}
                  step="1"
                  size={1}
                  inputMode="numeric"
                  autoComplete="off"
                  pattern="\d{1}"
                  onChange={handleChange}
                  className="verify-optinput"
                  autoFocus={idx === 0 ? true : false}
                />
              );
            })}
          </div>
        </Modal.Body>
        <div className="error-div">
          <p className="error-text">{error}</p>
        </div>
        <Modal.Footer className="verify-button">
          <div>
            <ButtonComponent
            customClass="verify-save-btn"
              type="button"
              title="Verify"
              onClick={handleSubmit}
              isPadding={true}
            />
            <p className="receive-code">
              Didn't receive code?{" "}
              <Link to="" onClick={()=>resendOtp()} className="request-again">
                Request again
              </Link>
            </p>

            {modal && <CalenderDate show={setModal} />}
          
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(Verification);
