import React, { memo, useState } from "react";
import ButtonComponent from "../../component/button/ButtonComponent";
import Input from "../../component/input/Input";
import "./style.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import ApiComponents from "../../constant/ApiComponents";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
const signUpSchema = Yup.object({
  currentPassword: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Password can only contain latin letters."
    ),

  newPassword: Yup.string()
    .nullable()
    .required("No password provided.")

    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Password can only contain latin letters."
    ),
  confirmPassword: Yup.string()
    .nullable()
    .required("No password provided.")
    .oneOf([Yup.ref("newPassword"), null], "Password must match")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Password can only contain latin letters."
    ),
});

const initialValues: any = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const [message, setMessage] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, string | any>>({});
  const [curPassword, setCurPassword] = useState<any>("");
  const [newPassword, setNewPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");

  const handleSnackBar = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let newvalue = {
      currentPassword: curPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    if (isValidated()) {
      ApiComponents.ChangePassword(newvalue).then((res: any) => {
        if (res?.response?.data?.message) {
          setMessage(res?.response?.data?.message);
          setOpen(true);
          return;
        }
        setOpen(true);
        setMessage(res);
        setError({});
        setCurPassword("");
        setNewPassword("");
        setConfirmPassword("");
      });
    }
  };
  // const {
  //   values,
  //   errors,
  //   touched,
  //   handleBlur,
  //   handleChange,
  //   setFieldValue,
  // } = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: signUpSchema,
  //   validateOnChange: false,
  //   // validateOnBlur: false,
  //   onSubmit: (values, action) => {
  //     let newvalue = {
  //       currentPassword: values.currentPassword,
  //       newPassword: values.newPassword,
  //       confirmPassword: values.confirmPassword,
  //     };
  //     ApiComponents.ChangePassword(newvalue).then((res: any) => {
  //       if (res?.response?.data?.message) {
  //         setMessage(res?.response?.data?.message);
  //         setOpen(true);
  //         return;
  //       }
  //       setOpen(true);
  //       setMessage(res);
  //       action.resetForm();
  //     });
  //   },
  //   onReset: (values, action) => {
  //     action.resetForm();
  //   }
  // });

  const isValidated = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
    let isValid = true;
    let updateError = { ...error };
    if (!curPassword) {
      updateError.curPassword = "This field is required";
      isValid = false;
    } else if (curPassword.trim().length === 0) {
      updateError.curPassword = "This field is required";
      isValid = false;
    } else if (passwordRegex.test(curPassword)) {
      updateError.curPassword =
        "Please choose a stronger password. Try a mix of letters, numbers, and symbols.";
      isValid = false;
    } else if (curPassword.length < 8) {
      updateError.curPassword =
        "Password is too short - should be 8 chars minimum.";
      isValid = false;
    }

    if (!newPassword) {
      updateError.newPassword = "This field is required";
      isValid = false;
    } else if (newPassword.trim().length === 0) {
      updateError.newPassword = "This field is required";
      isValid = false;
    } else if (passwordRegex.test(newPassword)) {
      updateError.newPassword =
        "Please choose a stronger password. Try a mix of letters, numbers, and symbols.";
      isValid = false;
    } else if (newPassword.length < 8) {
      updateError.newPassword =
        "Password is too short - should be 8 chars minimum.";
      isValid = false;
    } else if (newPassword === curPassword) {
      updateError.newPassword = "Current  and new password can not be same.";
      isValid = false;
    }

    // if (!confirmPassword) {
    //   updateError.confirmPassword = "This field is required";
    //   isValid = false;
    // } else if (confirmPassword.trim().length === 0) {
    //   updateError.confirmPassword = "This field is required";
    //   isValid = false;
    // }else if (passwordRegex.test(confirmPassword)){
    //   updateError.confirmPassword = "Password can only contain latin letters.";
    //   isValid = false;
    // }else if (confirmPassword.length< 8 ){
    //   updateError.confirmPassword = "Password is too short - should be 8 chars minimum.";
    //   isValid = false;
    // }else
    if (newPassword !== confirmPassword) {
      updateError.confirmPassword = "Password must match.";
      isValid = false;
    }

    setError(updateError);
    return isValid;
  };

  const handleClose = () => {
    setError({});
    setCurPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  function handleCloseButton(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="change-password-container">
        {open ? (
          <CustomizedSnackbars
            openBar={open}
            message={message}
            handleSnackBar={() => handleSnackBar()}
          />
        ) : null}
        <form>
          <div className="change-pwd-input">
            <Input
              label="Current Password"
              placeholder="Current Password"
              type="password"
              value={curPassword}
              id="currentPassword"
              name="currentPassword"
              // onHandleChange={(e: React.FormEvent<HTMLInputElement>) => {
              //   handleChange(e);
              // }}
              onHandleChange={(e: any) => {
                const {
                  target: { name, value },
                } = e;
                setError((prev) => ({ ...prev, curPassword: "" }));
                setCurPassword(e.target.value);
              }}
              error={error.curPassword}
            />
          </div>
          <div className="change-pwd-input">
            <Input
              label="New Password"
              placeholder="New Password"
              type="password"
              value={newPassword}
              id="newPassword"
              name="newPassword"
              onHandleChange={(e: any) => {
                const {
                  target: { name, value },
                } = e;
                setError({});
                setNewPassword(e.target.value);
              }}
              error={error.newPassword}
            />
          </div>
          <div className="change-pwd-input">
            <Input
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              id=" confirmPassword"
              name="confirmPassword"
              onHandleChange={(e: any) => {
                const {
                  target: { name, value },
                } = e;

                setError((prev) => ({ ...prev, confirmPassword: "" }));
                setConfirmPassword(e.target.value);
              }}
              error={error.confirmPassword}
            />
          </div>
          <div className="change-pwd-bottom-div">
            <ButtonComponent
              title="CANCEL"
              type="button"
              onClick={() => handleCloseButton()}
              customStyles={{
                background: "white",
                border: "1px solid #F8D40C !important",
                width: "122px",
              }}
            />
            <ButtonComponent
              title="SAVE"
              type="button"
              onClick={handleSubmit}
              customStyles={{
                width: "122px",
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(ChangePassword);
