import * as IMG from "../components/common/Images";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "../components/common/constants";
import { password } from "./ReduxSetup/CartSlice";
import { useDispatch } from "react-redux";
import { Slide, toast, ToastContainer } from "react-toastify";
const confirmpassSchema = Yup.object({
  password: Yup.string()
    .min(4)
    .max(12)
    .required("Please enter your password")
    .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Please enter your password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
const initialValues = {
  password: "",
  confirm_password: "",
};
const ConfirmPassword = () => {
  const checkSkip = localStorage.getItem("displaySkip");

  const emailVal: any = localStorage.getItem("emailUser");
  const userNameVal: any = localStorage.getItem("UserName");
  const UserId: any = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const roleValue = localStorage.getItem("role");
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: confirmpassSchema,
      onSubmit: async (values, action) => {
        const payload = {
          role: roleValue,
          password: values.password,
          name: JSON.parse(userNameVal),
          email: JSON.parse(emailVal),
          id: UserId,
        };
        if (Number(roleValue) === 4) {
          axios
            .put("/auth/updateUser", payload)
            .then((value: any) => {
              toast.success(
                `Congrats Your Account Has Been Created Succesfully`
              );
              setTimeout(() => {
                navigate("/dashboard");
              }, 5000);
              return value;
            })
            .catch((err: any) => {
              return err.response;
            });
        } else {
          axios.put("/auth/updateUser", payload).then((value: any) => {
            navigate("/kycForm");
          });
        }
        dispatch(password({ password: values.password }));
        localStorage.setItem("passWord", JSON.stringify(values.password));
        action.resetForm();
      },
    });
  const skip = () => {
    localStorage.clear();
    navigate("/dashboard");
  };
  const BackButton = () => {
    navigate("/emailsignup");
  };
  const HandleHome = () => {
    navigate("/");
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
          {checkSkip !== "0" && <div>
            <button onClick={skip} className="skip">
              Skip
            </button>
          </div>}
        </div>
        <form onSubmit={handleSubmit}>
          <h1 className="confirm-pwd-heading">Confirm Password</h1>
          <div className="main">
            <div className="inputBox">
              <label className="label-title">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="input-txt"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.password && touched.password && (
              <p className="form-error">{errors.password}</p>
            )}
            <div className="inputBox">
              <label className="label-title">Confirm Password</label>
              <input
                type="password"
                placeholder="confirm Password"
                className="input-txt"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.confirm_password && touched.confirm_password && (
              <p className="form-error">{errors.confirm_password}</p>
            )}
            <button className="login-btn" type="submit">
              SIGN UP
            </button>
          </div>
        </form>
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
export default ConfirmPassword;
