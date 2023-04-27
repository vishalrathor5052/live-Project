import { useEffect, useState } from "react";
import * as IMG from "../components/common/Images";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { bankAccountNumber } from "./ReduxSetup/CartSlice";
import axios from "../components/common/constants";
import { Slide, toast, ToastContainer } from "react-toastify";

const BankDetailsSchema = Yup.object({
  bank_ac: Yup.string()
    .min(10, "Bank Account Number Must Be At Least 10 Characters")
    .max(14, "Bank Account Number Maximum  14 Characters")
    .required("*Please Enter Your Account Number")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "*Enter Valid Account Number"
    ),
  confirm_bank: Yup.string()
    .required()
    .oneOf([Yup.ref("bank_ac"), null], "*Account Number Miss Match"),
});
const initialValues = {
  bank_ac: "",
  confirm_bank: "",
  ifsc: "",
};
const BankDetails = () => {
  const [pancardNo, setPanCardNo] = useState("");
  const dispatch = useDispatch();
  const navigates = useNavigate();
  const roleVal: any = localStorage.getItem("role");
  const emailVal: any = localStorage.getItem("emailUser");
  const mobileNumberVal: any = localStorage.getItem("MobileNumber");
  const demateNumberVal: any = localStorage.getItem("DematNumber");
  const panNumberVal: any = localStorage.getItem("panNumber");
  const userNameVal: any = localStorage.getItem("UserName");
  const passwordVal: any = localStorage.getItem("passWord");
  const UserId: any = localStorage.getItem("userId");
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: BankDetailsSchema,
      onSubmit: (values, action) => {
        let payload = {
          pancardNo: JSON.parse(pancardNo),
          bankAccountNo: values.bank_ac,
          id: UserId,
        };
        dispatch(bankAccountNumber({ bankAccNo: values.bank_ac }));
        axios
          .put("/auth/updateUser", payload)
          .then((res: any) => {
            if (res.status === 200) {
              toast.success(
                `Congrats Your Account Has Been Created Succesfully`
              );
              setTimeout(() => {
                navigates("/dashboard");
              }, 5000);
            }
          })
          .catch((err: any) => {
            return err.response;
          });
        action.resetForm();
      },
    });
  const BackButton = () => {
    navigates("/kycForm");
  };
  const HandleHome = () => {
    navigates("/");
  };
  useEffect(() => {
    setPanCardNo(panNumberVal);
  }, []);
  // -------------------------------Remove Spacial Character And MouseScroll in number-----------------
  const numberInputOnWheelPreventChange = (e: any) => {
    e.target.blur();
    e.stopPropagation();
    setTimeout(() => {
      e.target.focus();
    }, 1000);
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
          <div className="back-btn">
            <button onClick={BackButton} className="back-btn">
              <img src={IMG.back} alt="back" />
            </button>
          </div>
          <div></div>
        </div>
        <h1 className="login-heading">Bank Details</h1>
        <p className="bank-details-para">
          Get access to exclusive features by creating an account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="main">
            <div className="inputBox">
              <label className="label-title">Bank AC no</label>
              <input
                type="text"
                className="input-txt"
                placeholder="Enter bank ac no here"
                name="bank_ac"
                value={values.bank_ac}
                onWheel={numberInputOnWheelPreventChange}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={formatInput}
              />
            </div>
            {errors.bank_ac && touched.bank_ac && (
              <p className="form-error">{errors.bank_ac}</p>
            )}
            <div className="inputBox">
              <label className="label-title">Confirm Bank AC no</label>
              <input
                type="text"
                className="input-txt"
                placeholder="Enter bank ac no here"
                name="confirm_bank"
                onWheel={numberInputOnWheelPreventChange}
                value={values.confirm_bank}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={formatInput}
              />
            </div>
            {errors.confirm_bank && touched.confirm_bank && (
              <p className="form-error">{errors.confirm_bank}</p>
            )}

            <div className="inputBox">
              <label className="label-title">IFSC</label>
              <input
                type="text"
                className="input-txt"
                placeholder="Enter IFSC here"
                name="ifsc"
                onWheel={numberInputOnWheelPreventChange}
                value={values.ifsc}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={formatInput}
              />
            </div>
            {/* {errors.confirm_bank && touched.confirm_bank && (
              <p className="form-error">{errors.confirm_bank}</p>
            )} */}
            <button className="login-btn" type="submit">
              NEXT
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

export default BankDetails;
