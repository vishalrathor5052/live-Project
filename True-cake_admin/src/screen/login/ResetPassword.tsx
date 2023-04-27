import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../component/button/ButtonComponent";
import Heading from "../../component/heading/Heading";
import Input from "../../component/input/Input";
import Image from "../../constant/Image";
import * as Yup from "yup";
import "./style.css";
import { useFormik } from "formik";

import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import ApiComponents from "../../constant/ApiComponents";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const signUpSchema = Yup.object({
  newPassword: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Please choose a stronger password. Try a mix of letters, numbers, and symbols."
    ),

  confirmPassword: Yup.string()
    .required("No password provided.")
    .oneOf([Yup.ref("newPassword"), null], "Password must match"),
});

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const { resetPassword } = useSelector((state: any) => state?.trueCake);
  const [open, setOpen] = useState<boolean>(false);
  const [isVisible, setVisible] = useState(false);
  const [isVisibleConfirm, setVisibleConfirm] = useState(false);
  const location = useLocation();
  const [result, setResult] = useState(resetPassword);
  const [message, setMessage] = useState<string>(result);

  // useEffect(() => {
  //   if (result) {
  //     setOpen(true);
  //     setMessage(result);
  //   }
  // }, []);
  const handleSnackBar = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        setMessage("");
        let newvalue = {
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        };
        ApiComponents.ResetPassword(newvalue).then((res: any) => {
          if (res?.response?.data?.message) {
            setMessage(res?.response?.data?.message);
            setOpen(true);
            return;
          }
          setMessage(res?.message);
          setOpen(true);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        });
      },
    });

  return (
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
        <Heading title="RESET PASSWORD" />

        <form onSubmit={handleSubmit}>
          <div className="loginInput">
            <Input
              placeholder="New Password"
              type={!isVisible ? "password" : "text"}
              value={values.newPassword}
              id="newPassword"
              name="newPassword"
              onHandleChange={(e: React.FormEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              // getValue={setPassword}
              error={
                errors?.newPassword &&
                touched?.newPassword &&
                errors.newPassword
              }
            />
          </div>
          {!isVisible ? (
            <img
              src={Image.hiddenpass}
              alt="logo"
              className="newPassword-hiddenpassword"
              onClick={() => setVisible(true)}
            />
          ) : (
            <img
              src={Image.ShowPassword}
              alt="logo"
              className="newPassword-hiddenpassword"
              onClick={() => setVisible(false)}
            />
          )}
          <div className="loginInput">
            <Input
              placeholder="Confirm Password"
              type={!isVisibleConfirm ? "password" : "text"}
              value={values.confirmPassword}
              id=" confirmPassword"
              name="confirmPassword"
              onHandleChange={(e: React.FormEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              // getValue={setPassword}
              error={
                errors?.confirmPassword &&
                touched?.confirmPassword &&
                errors.confirmPassword
              }
            />
            {!isVisibleConfirm ? (
              <img
                src={Image.hiddenpass}
                alt="logo"
                className="cofirm-hiddenpassword"
                onClick={() => setVisibleConfirm(true)}
              />
            ) : (
              <img
                src={Image.ShowPassword}
                alt="logo"
                className="cofirm-hiddenpassword"
                onClick={() => setVisibleConfirm(false)}
              />
            )}
          </div>
          <div className="button-div-singin">
            <ButtonComponent
              title="RESET PASSWORD"
              type="button"
              isPadding={true}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
