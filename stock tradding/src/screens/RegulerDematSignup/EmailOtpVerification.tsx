import React, { useEffect } from "react";
import * as IMG from "../../components/common/Images";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useState } from "react";
import CountdownTimer from ".././Verification/OtpTimer";
import axios from "../../components/common/constants";
import { ToastContainer, toast } from "react-toastify";
const EmailOtpVerifcation = () => {
  const [userEmail, setUserEmail] = useState("");
  const emailVal: any = localStorage.getItem("emailUser");
  const userNameVal: any = localStorage.getItem("UserName");
  const UserId: any = localStorage.getItem("userId");

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
    navigate("/emailsignup");
  };
  //.............validateOtp Api............................
  const confirmpassword = () => {
    const payload = {
      name: JSON.parse(userNameVal),
      email: JSON.parse(emailVal),
      id: UserId,
    };
    const otpSend = {
      type: 2,
      otp: code,
      userId: JSON.parse(localStorage.getItem("userId") ?? ""),
    };
    axios
      .post("/auth/validateOtp", otpSend)
      .then((res: any) => {
        if (res?.status === 200) {
          axios
            .put("/auth/updateUser", payload)
            .then((response: any) => {
              if (response.data.status) {
              }
            })
            .catch((err: any) => {
              if (err?.response?.status === 500) {
                toast.error("Something Went Wrong");
              }
            });
          localStorage.setItem(
            "authToken",
            JSON.stringify(res?.data?.authToken)
          );
          navigate("/confirmpassword");
        }
      })
      .catch((err: any) => {
        if (err?.response?.status === 422) {
          toast.error("OTP Mismatch");
        }
      });
  };

  // ............................resendOtpApi....................................

  const ResendOtp = () => {
    

    const otpSend = {
      otp: code,
      userId: JSON.parse(localStorage.getItem("userId") ?? ""),
    };

    axios
      .post("/auth/resendOtp", otpSend)
      .then((res: any) => {
        if (res?.status === 200) {
          navigate("/emailotpverification");
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

  useEffect(() => {
    setUserEmail(JSON.parse(localStorage.getItem("emailUser") ?? ""));
  }, []);
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
        <h1 className="broker-heading">OTP EMAIL</h1>
        <p className="login-para">Code is sent to :- {userEmail}</p>
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
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default EmailOtpVerifcation;
