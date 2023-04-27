import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as IMG from "../components/common/Images";
import { useFormik } from "formik";
import axios from "../components/common/constants";
import { useDispatch } from "react-redux";
import { signUp } from "./ReduxSetup/CartSlice";
import { ToastContainer, toast } from "react-toastify";
const signUpSchema = Yup.object({
  MobileNumber: Yup.string()
    .min(10, "Mobile Number Must Be At Least 10 Characters")
    .max(10, "Mobile NumberMaximum Only 10 Characters")
    .required("Please Enter Your Mobile Number")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please Enter Valid Mobile Number"
    ),

  dematAccNo: Yup.string()
    .min(10, "Demat Account Number Must Be At Least 10 Characters")
    .max(20, "Demat Account Number Maximum Only 20 Characters")
    .required("Please Enter Your Demat Account Number")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please Enter Valid Demat Account Number"
    ),
});

const initialValues = {
  email: "",
  name: "",
  MobileNumber: "",
  dematAccNo: "",
};
const SignUp = () => {
  const newRole = localStorage.getItem("role");
  const [role, setRole] = useState(newRole);
  const dispatch = useDispatch();

  // .................redux singup Api Store in reducer.........................

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        if (!agree) {
          toast.warn("Please Accept Terms & Condition!");
          return;
        }
        localStorage.setItem("MobileNumber", values.MobileNumber);
        localStorage.setItem("DematNumber", values.dematAccNo);
        dispatch(signUp(values));
        let payload = {
          role: Number(role),
          mobileNo: values.MobileNumber,
          dematAccNo: values.dematAccNo,
          email: "",
          name: "",
        };

        axios
          .post("/auth/signUp", payload)
          .then((res: any) => {
            if (res?.status === 200) {
              const userId = res?.data?.data.userId;
              // const id = res?.data?.data.userId;
              const otp1 = res.data.otp;
              // localStorage.setItem("ID", JSON.stringify(id));
              localStorage.setItem("userId", JSON.stringify(userId));
              localStorage.setItem("otp", JSON.stringify(otp1));
              navigate("/otpverification");
            }
          })
          .catch((err: any) => {
            if (err?.response?.status === 422) {
              toast.error(err?.response?.data?.message);
              setTimeout(() => {
                toast.info("already register!");
                navigate("/login");
              }, 2000);
            } else {
              toast.error(err?.response?.data?.message);
            }
          });
      },
    });
  const navigate = useNavigate();

  const [agree, setAgree] = useState(false);
  const checkboxHandler = () => {
    if (agree) {
      setAgree(false);
    } else {
      setAgree(true);
    }
    setAgree(!agree);
  };
  const HandleSkip = () => {
    localStorage.clear();
    navigate("/dashboard");
  };
  const HandleHome = () => {
    navigate("/");
  };
  const HandleBack = () => {
    navigate("/chooseaccount");
  };
  const HandleLogin = () => {
    navigate("/login");
  };
  const HandleSignUp = () => {
    navigate("/signup");
  };
  const HandleTerms = () => {
    navigate("/terms");
  };

  // -------------------------------Remove Spacial Character And MouseScroll in number-----------------
  const numberInputOnWheelPreventChange = (e: any) => {
    e.target.blur();
    e.stopPropagation();
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };
  const formatInput = (e: any) => {
    let checkIfNum;
    if (e.key !== undefined) {
      checkIfNum =
        e.key === "e" ||
        e.key === "." ||
        e.key === "+" ||
        e.key === "-" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowUp";
    } else if (e.keyCode !== undefined) {
      checkIfNum =
        e.keyCode === 69 ||
        e.keyCode === 190 ||
        e.keyCode === 187 ||
        e.keyCode === 38 ||
        e.keyCode === 40 ||
        e.keyCode === 189;
    }
    return checkIfNum && e.preventDefault();
  };
  const checkSkip = localStorage.getItem("displaySkip");

  return (
    <div className="login-wrapper">
      <div className="login-sidebar" style={{ position: "relative" }}>
        <div className="login-logo">
          <button className="logobtn" onClick={HandleHome}>
            <img src={IMG.stocklogo} alt="" className="logo-image " />
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
              onClick={HandleBack}
              style={{ borderStyle: "none", backgroundColor: "transparent" }}
            >
              <img src={IMG.back} alt="" />
            </button>
          </div>
          <div>
            {checkSkip !== "0" && <button onClick={HandleSkip} className="skip">
              Skip
            </button>}
          </div>
        </div>
        <div className="main signup-main">
          <h1 className="signup-heaing">Create an account</h1>
          <div className="loginContainer">
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <label className="label-title space-bottom">
                  Mobile Number
                </label>
                <input
                  maxLength={10}
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                  className="input-txt"
                  placeholder="Enter Mobile Number Here"
                  name="MobileNumber"
                  value={values.MobileNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={formatInput}
                />
                {errors.MobileNumber && touched.MobileNumber && (
                  <p className="form-signup-error">{errors.MobileNumber}</p>
                )}
              </div>
              <div className="inputBox space-top">
                <label className="label-title">Demat Ac. Number</label>
                <input
                  type="text"
                  className="input-txt"
                  placeholder="Enter Demat Ac. Number Here"
                  name="dematAccNo"
                  value={values.dematAccNo}
                  onWheel={numberInputOnWheelPreventChange}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={formatInput}
                />
                {errors.dematAccNo && touched.dematAccNo && (
                  <p className="form-signup-error">{errors.dematAccNo}</p>
                )}
              </div>
              <div className="button-div">
                <input
                  id="agree"
                  onChange={checkboxHandler}
                  type="checkbox"
                  checked={agree}
                  name="remember"
                  className="check"
                />
                <p style={{ marginLeft: "15px" }}>
                  By clicking, you will get OTP & you are accepting the<br></br>
                  <span>
                    <a
                      href="javascript:void(0)"
                      className="tandc"
                      onClick={HandleTerms}
                    >
                      Terms & Conditions policy.
                    </a>
                  </span>
                </p>
              </div>
              <button className="login-btn" type="submit">
                GET OTP
              </button>
            </form>
            <p className="signup-link space-0">
              Already have an account?{' '}
              <button onClick={HandleLogin} className="otp-link">
                Log in
              </button>
            </p>
            <p className="log-otp space-0">
              If you don't have Demat Ac.{' '}
              <button onClick={HandleSignUp} className="otp-link space-0">
                Open Now
              </button>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
export default SignUp;
