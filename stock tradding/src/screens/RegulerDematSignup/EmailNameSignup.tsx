import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import * as IMG from "../../components/common/Images";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { email } from ".././ReduxSetup/CartSlice";
import { ToastContainer } from "react-toastify";
import axios from "../../components/common/constants";

const signUpSchema = Yup.object({
  email: Yup.string().email().required("Please Enter Your Email"),
  name: Yup.string().required("Please Enter Your Name"),
});

const initialValues = {
  name: "",
  email: "",
};

const EmailSignUp = () => {
  const checkSkip = localStorage.getItem("displaySkip");

  // .................redux singup Api Store in reducer.........................
  const usedispatch = useDispatch();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,

      onSubmit: async (values) => {
        console.log("submitmmm",values);
        
        const otpSend = {
          // userId: uidVal,;
          email: values.email,
        };
        axios.post("/auth/emailOtpSend", otpSend).then((res: any) => { 
          if (res?.status === 200) {
            usedispatch(email(values));
            localStorage.setItem("emailUser", JSON.stringify(values.email));
            localStorage.setItem("UserName", JSON.stringify(values.name));
            navigate("/emailotpverification");
          }
        });
      },
    });
  const navigate = useNavigate();
  const uidVal = localStorage.getItem("userId");
  const HandleSkip = () => {
    localStorage.clear();
    navigate("/dashboard");
  };

  const HandleHome = () => {
    navigate("/");
  };
  const HandleBack = () => {
    navigate("/signup");
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
          <h1 className="signup-heading">Name & Email</h1>
          <div className="loginContainer">
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <label className="label-title space-bottom">Name</label>
                <input
                  type="text"
                  className="input-txt"
                  placeholder="Enter Name Here"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <p className="form-signup-error">{errors.name}</p>
                ) : null}
              </div>
              <div className="inputBox space-top">
                <label className="label-title">Email</label>
                <input
                  type="text"
                  className="input-txt"
                  placeholder="Enter Your Email Here"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="form-signup-error">{errors.email}</p>
                ) : null}
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
export default EmailSignUp;
