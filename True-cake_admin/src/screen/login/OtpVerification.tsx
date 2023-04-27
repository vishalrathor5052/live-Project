import React, { useState } from "react";
import "./style.css";
import ButtonComponent from "../../component/button/ButtonComponent";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtpInputList } from "../../constant/String";
import Heading from "../../component/heading/Heading";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import Image from "../../constant/Image";
import ApiComponents from "../../constant/ApiComponents";
import { StoreCookie } from "../../Auth/sessionStore";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../Store/Store";
import { setResetPassword } from "../../Store/CartSlice";

const OtpVerification = (props: any) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const location = useLocation();
  const { otp } = useSelector((state: any) => state?.trueCake);
  const dispatch = useAppDispatch();
  const [result, setResult] = useState(otp);
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<Record<string, string | any>>({});
  const [error, setError] = useState("");

  const handleSnackBar = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!value.opt1 || !value.opt2 || !value.opt3 || !value.opt4) {
      setError("Please enter 4 digit OTP");
    } else {
      setError("");
      const completeOtp: Number = Number(
        value.opt1?.concat(value.opt2, value.opt3, value.opt4)
      );
      const payload = {
        id: otp?.id,
        otp: completeOtp,
      };

      ApiComponents.VerifyOTP(payload).then((res: any) => {
        setOpen(true);
        setMessage(res?.response?.data?.message);
        if (res?.status === 200) {
          const authToken = res?.data?.data?.uid;
          localStorage.setItem("authToken", JSON.stringify(authToken));
          // dispatch(setResetPassword(res?.data?.message));
          navigate("/resetpassword");
        }
        return;
      });
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

  return (
    <>
      <div className="signin-main">
        {open ? (
          <CustomizedSnackbars
            openBar={open}
            message={message}
            handleSnackBar={() => handleSnackBar()}
          />
        ) : null}
        <div className="logo-div">
          <img src={Image.logo} alt="logo" className="truecake-logo" />
        </div>
        <div className="signin-container">
          <Heading title="VERIFICATION CODE" />
          <form onSubmit={handleSubmit}>
            <div className="input-verify-container">
              {verifyOtpInputList.map((elm: any, idx: any) => {
                return (
                  <input
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
            <div className="error-div">
              <p className="error-text">{error}</p>
            </div>
            <div className="button-div-singin">
              <ButtonComponent
                title="VERIFY"
                type="button"
                isPadding={true}
                onClick={handleSubmit}
              />
            </div>
            {/* <div>
            <p className="receive-code">
              Didn't receive code?{" "}
              <Link to=""className="request-again">Request again</Link>
            </p>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
