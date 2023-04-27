import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import * as IMG from "../components/common/Images";
import { useFormik } from "formik";
import axios from "../components/common/constants";
import { ToastContainer, toast } from "react-toastify";

const LoginSchema = Yup.object({
  mobileNo: Yup.string()
    .required("Please Enter a Valid Number.")
    .matches(/^[0-9]+$/, "Please Enter a Valid Number.")
    .min(10, "Please Enter a Valid Number.")
    .max(10, "Please Enter a Valid Number."),
});

const initialValues = {
  mobileNo: "",
};
const LoginWithOtp = () => {
  const checkSkip = localStorage.getItem("displaySkip");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginSchema,

      onSubmit: async (value) => {
        let payload = {
          mobileNo: values.mobileNo,
        };
        axios
          .post("/auth/loginWithOtp", payload)
          .then((res: any) => {
            if (res?.status === 200) {
              const userId = res?.data?.data.userId;
              const otp1 = res.data.otp;
              const name = res?.data?.data?.name;
              localStorage.setItem("userId", JSON.stringify(userId));
              localStorage.setItem("UserName", JSON.stringify(name));
              localStorage.setItem("otp", JSON.stringify(otp1));
              navigate("/loginotp", { state: value.mobileNo });
            }
          })
          .catch((err: any) => {
            if (err?.response?.status === 404) {
              toast.error(err?.response?.data?.message);
            } else {
              toast.error(err?.response?.data?.message);
            }
          });
      },
    });

  const navigate = useNavigate();

  const HandleSkip = () => {
    localStorage.clear();
    navigate("/dashboard");
  };
  const HandleHome = () => {
    navigate("/");
  };
  const HandleBack = () => {
    navigate(-1);
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
  return (
    <div className="login-wrapper">
      <div className="login-sidebar" style={{ position: "relative" }}>
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
              onClick={HandleBack}
              style={{ borderStyle: "none", backgroundColor: "transparent" }}
            >
              <img src={IMG.back} alt="" />
            </button>
          </div>
          <div>
          {checkSkip !== "0" &&  <button onClick={HandleSkip} className="skip">
              Skip
            </button>}
          </div>
        </div>
        <div className="main signup-main">
          <h1 className="signup-heaing">Login With Otp</h1>
          <div className="loginContainer">
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <label className="label-title space-bottom">
                  Mobile Number
                </label>
                <input
                  maxLength={10}
                  type="number"
                  className="input-txt"
                  placeholder="Enter Mobile Number Here"
                  name="mobileNo"
                  value={values.mobileNo}
                  onWheel={numberInputOnWheelPreventChange}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={formatInput}
                />
                {errors.mobileNo && touched.mobileNo && (
                  <p className="form-signup-error">{errors.mobileNo}</p>
                )}
              </div>
              <button className="login-btn" type="submit">
                GET OTP
              </button>
            </form>
          </div>
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
export default LoginWithOtp;
