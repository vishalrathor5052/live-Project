import * as IMG from "../components/common/Images";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { panCardNumber } from "./ReduxSetup/CartSlice";
import axios from "../components/common/constants";
import Verification from "./Verification/Verification";
import { useEffect } from "react";
import { toast } from "react-toastify";

const KycSchema = Yup.object({
  pancardNo: Yup.string()
    .max(10)
    .required("Please enter your PAN Number")
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "enter valid PAN number"),
});
const initialValues = {
  pancardNo: "",
};
const KycForm = () => {
  const pan_num: any = localStorage.getItem("panNumber");
  const mobile_Number = localStorage.getItem("MobileNumber");
  const UserId: any = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigates = useNavigate();
  const param = useLocation();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: KycSchema,
      onSubmit: (values, action) => {
        dispatch(panCardNumber(values));
        localStorage.setItem("panNumber", JSON.stringify(values.pancardNo));
        const verificationPayload = {
          customer_identifier: mobile_Number,
          id: UserId,
        };

        axios
          .post("/auth/pancardAndBankVerification", verificationPayload)
          .then((res: any) => {
            console.log(
              "res?.data?.succes===res?.data?.succes",
              res?.data?.success
            );
            if (res?.data?.success) {
              let PanVerfication = res?.data?.data;
              // console.log("PanVerfication__", PanVerfication)
              localStorage.setItem("verificationID", PanVerfication?.id);
              window.open(
                `https://ext.digio.in/#/gateway/login/${PanVerfication?.id}/${PanVerfication?.access_tokenId}/${PanVerfication?.customer_identifier}?redirect_url=http://localhost:3000/kycform`
              );
            }
          });

        // axios
        //   .put("/auth/updateUser", payload)
        //   .then((response: any) => {
        //     if (response.data.status) {
        //       navigates("/bankdetails");
        //     } else {
        //     }
        //   })
        //   .catch((err: any) => {
        //     return err.response;
        //   });
        action.resetForm();
      },
    });
  const BackButton = () => {
    navigates("/confirmpassword");
  };
  useEffect(() => {
    console.log("paramvvvv", param?.search);
    if (param?.search) {
      const payload = {
        request_id: localStorage.getItem("verificationID"),
        pancardNo: JSON.parse(pan_num),
      };
      console.log("verify payload", payload);
      axios
        .post("/auth/validatePancardAndBankVerification", payload)
        .then((response: any) => {
          console.log("rrrrrrrrrrrrr'''", response);
          if (response?.data?.data?.status) {
            navigates("/bankdetails");
          } else {
          }
        })
        .catch((err: any) => {
          return err.response;
        });
    }
  }, [param.search]);

  const HandleHome = () => {
    navigates("/");
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
          <div></div>
        </div>
        <h1 className="kyc-heading">KYC Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="main" onSubmit={() => handleSubmit()}>
            <div className="inputBox">
              <label className="label-title">Pan card</label>
              <input
                type="text"
                className="input-txt"
                placeholder="Enter pan card no here"
                name="pancardNo"
                value={values.pancardNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.pancardNo && touched.pancardNo && (
              <p className="form-error">{errors.pancardNo}</p>
            )}
            <button className="login-btn" type="submit">
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KycForm;
