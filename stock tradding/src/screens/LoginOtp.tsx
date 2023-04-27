import React from "react";
import * as IMG from "../components/common/Images";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useState } from "react";
import CountdownTimer from "./Verification/OtpTimer";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "../components/common/constants";
import { useLocation } from "react-router-dom";
import { StoreCookie } from "../components/common/sessionStore";
import { authTokenValue } from "./ReduxSetup/CartSlice";
const LoginOtp = () => {
  const checkSkip = localStorage.getItem("displaySkip");

  const location = useLocation();
  const mobileNo = location?.state;
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const handleChange = (code: React.SetStateAction<string>) => {
    setCode(code);
  };
  const navigate = useNavigate();
  const skip = () => {
    localStorage.clear();
    navigate("/dashboard");
  };
  const Handlelogo = () => {
    navigate("/");
  };
  const BackButton = () => {
    navigate(-1);
  };
  const HandleNext = () => {
    const otpSend = {
      otp: code,
      userId: JSON.parse(localStorage.getItem("userId") ?? ""),
    };
    axios
      .post("/auth/loginWithValidateOtp", otpSend)
      .then((res: any) => {
        const res_data = res?.data?.data;
        const authToken = res?.data?.authToken;
        const userId = res_data?.userId;
        const name = res_data?.name;
        const role = res_data?.role;

        localStorage.setItem("userId", JSON.stringify(userId));
        localStorage.setItem("UserName", JSON.stringify(name));
        localStorage.setItem("role", role);
        dispatch(authTokenValue(res?.data?.authToken));

        localStorage.setItem("authToken", JSON.stringify(authToken));
        if (res?.status === 200) {
          axios.get("/auth/getUserProfile").then((response: any) => {
            if (response?.data?.data?.name && response?.data?.data?.email) {
              if (response?.data?.data?.password) {
                if (response?.data?.data?.pancardNo) {
                  if (response?.data?.data?.bankAccountNo) {
                    if (response?.data?.data !== "") {
                      StoreCookie.setItem(
                        "userData",
                        JSON.stringify(response?.data?.data)
                      );
                      StoreCookie.setItem(
                        "email",
                        JSON.stringify(response?.data?.data?.email)
                      );
                      toast.success(`Login successfully`);
                      setTimeout(() => {
                        navigate("/dashboard");
                        // window.location.reload();
                      }, 2000);
                    }
                  } else {
                    //no data in bank
                    navigate("/bankdetails");
                  }
                } else {
                  //no data in pancard
                  navigate("/kycform");
                }
              } else {
                navigate("/confirmpassword");
              }
            } else {
              navigate("/emailsignup");
            }
          });
        }
      })
      .catch((err: any) => {
        toast.error(err?.response?.data?.message);
        return err.response;
      });
  };

  const ResendBtn = () => {
    const otpSend = {
      otp: code,
      userId: JSON.parse(localStorage.getItem("userId") ?? ""),
    };

    axios
      .post("/auth/resendOtp", otpSend)
      .then((res: any) => {
        if (res?.status === 200) {
        }
      })
      .catch((err: any) => {
        if (err?.response?.status === 422) {
          toast.error("OTP Missmatch");
        } else {
          toast.error(err?.response?.data?.message);
        }
      });
  };
  return (
    <div className="login-wrapper">
      <div className="login-sidebar">
        <div className="login-logo">
          <button className="logobtn" onClick={Handlelogo}>
            <img src={IMG.stocklogo} alt="" className="logo-image" />
          </button>
        </div>
        <div className="login-container-div">
          <img src={IMG.signup} alt="" className="login-sidebar-img" />
        </div>
      </div>
      <div className="login-right-section">
        <div className="top-view">
          <div className="back-btn">
            <button onClick={BackButton} className="back-btn">
              <img src={IMG.back} alt="back" />
            </button>
          </div>
          {checkSkip !== "0" && (
            <div>
              <button onClick={skip} className="skip">
                Skip
              </button>
            </div>
          )}
        </div>
        <h1 className="broker-heading">OTP Verification</h1>
        <p className="login-para">Code is sent to +{mobileNo}</p>
        <div className="otp-main">
          <div className="otp-input-box">
            <div className="otp-text">
              <OtpInput
                className="otp-box input-txt"
                value={code}
                onChange={handleChange}
                numInputs={6}
                isInputNum={true}
                shouldAutoFocus={true}
              />
            </div>
          </div>
          <a onClick={HandleNext} className="otp-link">
            <button className="login-btn">Next</button>
          </a>
          <p className="signup-link">
            Didn't receive code?
            {/* {mobileNo} */}
            <div>
              <button onClick={ResendBtn} className="otp-link">
                <a href="javascript:void(0)" className="otp-link">
                  <CountdownTimer />
                </a>
              </button>
            </div>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginOtp;
