import React from "react";
import * as IMG from "../components/common/Images";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useState } from "react";
import CountdownTimer from "./Verification/OtpTimer";
import axios from "../components/common/constants";
import { ToastContainer, toast } from "react-toastify";
const OtpVerifcation = () => {
  const newRole: any = localStorage.getItem("role");
  const MobileNumber: any = localStorage.getItem("MobileNumber");
  const [code, setCode] = useState("");
  const handleChange = (code: React.SetStateAction<string>) => {
    setCode(code);
  };
  const navigate = useNavigate();
  const skip = () => {
    localStorage.clear();
    navigate("/dashboard");
  };
  const BackButton = () => {
    navigate("/signup");
  };

  // ...................ValidateOtp api.........................
  const confirmpassword = () => {
    const otpSend = {
      type: 1,
      otp: code,
      userId: JSON.parse(localStorage.getItem("userId") ?? ""),
    };
    axios
      .post("/auth/validateOtp", otpSend)
      .then((res: any) => {
        if (res?.status === 200) {
          localStorage.setItem(
            "authToken",
            JSON.stringify(res?.data?.authToken)
          );
          if (Number(newRole) === 4) {
            navigate("/confirmpassword");
          } else {
            navigate("/emailsignup");
          }
        }
      })
      .catch((err: any) => {
        if (err?.response?.status === 422) {
          toast.error("OTP Mismatch");
        }
      });
  };
  const otpSend = {
    otp: code,
    userId: JSON.parse(localStorage.getItem("userId") ?? ""),
  };

  //...........................Resend OTP Api.........................

  const ResendOtp = () => {
    axios
      .post("/auth/resendOtp", otpSend)
      .then((res: any) => {
        if (res?.status === 200) {
          navigate("/otpverification");
        }
      })
      .catch((err: any) => {
        if (err?.response?.status === 422) {
          toast.error(err?.response?.data?.message);
        }
      });
  };

  const HandleHome = () => {
    navigate("/");
  };
  const checkSkip = localStorage.getItem("displaySkip");

  return (
    <div className="login-wrapper">
      <div className="login-sidebar">
        <div className="login-logo">
          <button className="logobtn" onClick={HandleHome}>
            <img src={IMG.stocklogo} alt="" className="logo-image" />
          </button>
        </div>
        <div className="login-container-div">
          <img src={IMG.signup} alt="" className="login-sidebar-img" />
        </div>
      </div>
      <div className="login-right-section">
        <div className="top-view">
          <div className="back-button">
            <button
              onClick={BackButton}
              style={{ borderStyle: "none", backgroundColor: "transparent" }}
            >
              <img src={IMG.back} alt="" />
            </button>
          </div>
          <div>
           {checkSkip !== "0" && <button onClick={skip} className="skip">
              Skip
            </button>}
          </div>
        </div>
        <h1 className="broker-heading">OTP Verification</h1>

        <p className="login-para">Code is sent to + {MobileNumber}</p>

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
          <button className="login-btn" onClick={confirmpassword}>
            Next
          </button>

          <p className="signup-link">
            Didn't receive code?
            <div>
              <button onClick={ResendOtp} className="otp-link">
                <a href="#" className="otp-link">
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

export default OtpVerifcation;
