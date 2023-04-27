import { useNavigate } from "react-router-dom";
import * as IMG from "../components/common/Images";
import { useFormik } from "formik";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { StoreCookie } from "../components/common/sessionStore";
import axios from "../components/common/constants";
import { authTokenValue } from "./ReduxSetup/CartSlice";
import { useState } from "react";
import Loader from "../components/common/Loader";
const signInSchema = Yup.object({
  Email: Yup.string()
    .typeError("That doesn't look like a phone number or email")
    .required("Please enter valid mobile/email number")
    .matches(
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/,
      "Please enter valid mobile number"
    ),
  Password: Yup.string()
    .min(6)
    .max(30)
    .required("Please Enter Your Password")
    .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Please Enter Valid Password"),
});
const initialValues = {
  Email: "",
  Password: "",
};
const Login = () => {
  const checkSkip = localStorage.getItem("displaySkip");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signInSchema,
      onSubmit: async (value) => {
        let newvalue = {};
        if (value.Email) {
          newvalue = {
            mobileNo: Number(value.Email),
            email: value.Email,
            password: value.Password,
          };
          localStorage.setItem("MobileNumber", value.Email);
        }
        setLoader(true);
        axios
          .post("/auth/loginWithPassword", newvalue)
          .then((res: any) => {
            setLoader(false);
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
                const refferalCode = response?.data?.data.refferalCode;
                localStorage.setItem(
                  "refferalCode",
                  JSON.stringify(refferalCode)
                );
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
                          // setLoader(false);
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
            toast.error("Invalid Mobile Number Or Password !!!");

            return err.response;
          });
      },
    });
  const HandleSkip = () => {
    localStorage.clear();
    navigate("/dashboard");
  };
  const OtpHandle = () => {
    navigate("/loginwithotp");
  };
  const HandleSignUp = () => {
    navigate("/chooseaccount");
  };
  const HandleHome = () => {
    navigate("/");
  };
  const HandleBack = () => {
    navigate(-1);
  };

  return (
    <div className="login-wrapper">
      <div className="login-sidebar">
        <div className="login-logo">
          <button className="logobtn" onClick={HandleHome}>
            <img src={IMG.stocklogo} alt="" className="logo-image" />
          </button>
        </div>
        <div className="login-container-div">
          <img src={IMG.login} alt="" className="login-sidebar-img" />
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
            {/* ............................Skip Button.......................*/}
            {checkSkip !== "0" && <button onClick={HandleSkip} className="skip">
              Skip
            </button>}
          </div>
        </div>
        {/* {loader ? (
          <Loader />
        ) : ( */}
        <div className="main">
          <h1 className="login-heading">Log in</h1>
          <form onSubmit={handleSubmit}>
            <div className="loginContainer">
              <div className="inputBox">
                <label className="label-title mobile-view-label-title">E-mail/Mobile Number</label>
                <input
                  type="text"
                  placeholder="Enter E-mail or Mobile No. Here"
                  className="input-txt"
                  autoComplete="off"
                  name="Email"
                  value={values.Email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.Email && touched.Email && (
                <p
                  className="form-error"
                  style={{ textTransform: "capitalize" }}
                >
                  {errors.Email}
                </p>
              )}
              <div className="inputBox">
                <label className="label-title mobile-view-label-title">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password Here"
                  className="input-txt"
                  autoComplete="off"
                  name="Password"
                  value={values.Password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.Password && touched.Password && (
                <p
                  className="form-error"
                  style={{ textTransform: "capitalize" }}
                >
                  {errors.Password}
                </p>
              )}
              <div className="button-div">
                <div></div>
              </div>
              <button className="login-btn" type="submit">
                LOG IN
              </button>
              <p className="signup-link space-0">
                Don't have an account?{' '}
                <button className="otp-link" onClick={HandleSignUp}>
                  Sign Up
                </button>
              </p>
              <p className="log-otp space-0">
                Log in with{' '}
                <button className="otp-link space-0" onClick={OtpHandle}>
                  OTP
                </button>
              </p>
            </div>
          </form>
        </div>
        {/* )} */}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  );
};

export default Login;
