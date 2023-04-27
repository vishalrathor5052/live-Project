import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../component/button/ButtonComponent";
import Heading from "../../component/heading/Heading";
import Input from "../../component/input/Input";
import Image from "../../constant/Image";
import * as Yup from "yup";
import { useFormik } from "formik";
import instance from "../../component/axios/Axios";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import "./style.css";
import { setHeaders } from "../../Store/CartSlice";
import { StoreCookie } from "../../Auth/sessionStore";
import { useAppDispatch } from "../../Store/Store";
/**
 * @desc login Components
 * @returns
 * Validation Email And password useing Formik and yup
 * Show a mesage in CustomizedSnackbars
 *  */
/**
 *Show a mesage in CustomizedSnackbars
 * get message in Response and Show
 */
const signUpSchema = Yup.object({
  email: Yup.string()
    .typeError("That doesn't look like an email address")
    .min(5)
    .required("Enter valid email")
    .matches(
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Enter valid email"
    ),
  // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Please choose a stronger password. Try a mix of letters, numbers, and symbols."
    ),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [isVisible, setVisible] = useState(false);
  const handleSnackBar = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    // validateOnChange,
    // validateOnBlur,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    // validateOnChange: false,
    // validateOnBlur: false,

    onSubmit: (values) => {
      localStorage.clear();
      let newvalue = {
        role: 2,
        email: values.email,
        password: values.password,
      };
      //submit the data to server to generate token
      instance
        .post("admin/signUp", newvalue)
        .then(async (res: any) => {
          if (res?.status === 200) {
            setMessage(res?.data?.message);
            setOpen(true);
            const authToken = res?.data?.data?.uid
              ? res?.data?.data?.uid
              : res?.data?.data?.sessionData?.uid;
            //set Token in localStorage....//
            localStorage.setItem("authToken", JSON.stringify(authToken));
            StoreCookie.setItem("userToken", JSON.stringify(authToken));
            await dispatch(setHeaders({ text: "Order" } as never));
            setTimeout(() => {
              navigate("/orders", {
                state: { message: res?.data?.message },
              });
              window.location.reload();
            }, 500);
          }
          return;
        })
        .catch((err: any) => {
          setMessage(err?.response?.data?.message);
          setOpen(true);
          return err.response;
        });
    },
  });
  const forgotPassword = () => {
    navigate("/forgotpassword");
    window.location.reload();
  };
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
        <Heading title="sign in" />

        <form onSubmit={handleSubmit}>
          <div className="loginInput">
            <Input
              placeholder="johndoe@gmail.com"
              type="email"
              value={values.email}
              id="email"
              name="email"
              onHandleChange={(e: React.FormEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              error={errors?.email && touched?.email && errors?.email}
            />
          </div>
          <div className="loginInput">
            <Input
              placeholder="Password"
              type={!isVisible ? "password" : "text"}
              value={values.password}
              id="password"
              name="password"
              onHandleChange={(e: React.FormEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              error={errors?.password && touched?.password && errors.password}
            />
            {!isVisible ? (
              <img
                src={Image.hiddenpass}
                alt="logo"
                className="truecake-hiddenpassword"
                onClick={() => setVisible(true)}
              />
            ) : (
              <img
                src={Image.ShowPassword}
                alt="logo"
                className="truecake-hiddenpassword"
                onClick={() => setVisible(false)}
              />
            )}
          </div>

          <Link
            style={{ textDecoration: "none" }}
            to=""
            onClick={() => forgotPassword()}
          >
            <span className="forgot-pwd">Forgot Password?</span>
          </Link>

          <div className="button-div-singin">
            <ButtonComponent
              title="SIGN IN"
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

export default Login;
