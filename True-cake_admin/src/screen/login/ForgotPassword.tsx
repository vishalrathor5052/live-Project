import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../component/button/ButtonComponent";
import Heading from "../../component/heading/Heading";
import Input from "../../component/input/Input";
import Image from "../../constant/Image";
import * as Yup from "yup";
import "./style.css";
import { useFormik } from "formik";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import { useDispatch } from "react-redux";
import ApiComponents from "../../constant/ApiComponents";
import { useAppDispatch } from "../../Store/Store";
import { setOtp } from "../../Store/CartSlice";
const signUpSchema = Yup.object({
  email: Yup.string()
    .typeError("That doesn't look like an email address")
    .min(5)
    .required("Enter valid email")
    .matches(
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Enter valid email"
    ),
});

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const handleSnackBar = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        let newvalue = {
          email: values.email,
        };
        ApiComponents.ForgotPassword(newvalue).then((res: any) => {
          if (res?.status == 200) {
            dispatch(setOtp(res?.data?.data));
            navigate("/otpverification");
          } else {
            setOpen(true);
            setMessage(res?.response?.data?.message);
          }
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
        <Heading title="FORGOT PASSWORD" />

        <form onSubmit={handleSubmit}>
          <div className="loginInput">
            <Input
              placeholder="Email"
              type="email"
              value={values.email}
              id="email"
              name="email"
              onHandleChange={(e: React.FormEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              error={errors.email}
            />
          </div>
          <div className="button-div-singin">
            <ButtonComponent
              title="GET RESET OTP"
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

export default ForgotPassword;
