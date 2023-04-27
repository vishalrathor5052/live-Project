import React, {
  useState,
  useCallback,
  useEffect,
  memo,
  useLayoutEffect,
} from "react";
import ButtonComponent from "../../component/button/ButtonComponent";
import Input from "../../component/input/Input";
import "./style.css";
import Browser from "../../component/browser/browser";
import axios from "axios";
import ApiComponents from "../../constant/ApiComponents";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import CustomizedSnackbars from "../../utils/CustomizedSnackbars";
import { AddCategory, isHeader, getAdminProfile } from "../../Store/CartSlice";
import { useNavigate } from "react-router-dom";
import Image from "../../constant/Image";
import { useAppDispatch } from "../../Store/Store";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const signUpSchema = Yup.object().shape({
  name: Yup.string().nullable().min(3).max(50).required("Name is required"),
  mobileNo: Yup.string()
    .nullable()
    .min(10)
    .max(10)
    .required("Please enter your valid mobile number")
    .matches(phoneRegExp,"Mobile number is not valid"),
});

const ProfileSetting = () => {
  const { addCategory } = useSelector((state: any) => state.trueCake);
  const dispatch = useAppDispatch();
  const [url, setUrl] = useState<any>();
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();
  const EditButton = () => {
    setProfile(true);
  };
  const newFile = useCallback(async (data: any) => {
    const formData: any = new FormData();
    formData.append("image", data);

    await axios
      .post(`http://34.200.195.34:7000/api/uploads`, formData)
      .then((res: any) => {
        setUrl(res?.data?.data.url);
      })
      .catch((err) => console.log("err", err));
  }, []);

  const handleSnackBar = () => {
    setOpen(false);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  }: any = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNo: "",
    },
    validationSchema: signUpSchema,
    // validateOnChange: false,
    // validateOnBlur: false,

    onSubmit: (values) => {
      dispatch(AddCategory("" as any));
      // dispatch(isHeader(false));
      let newvalue = {
        name: values?.name,
        email: values?.email,
        mobileNo: values?.mobileNo,
        image: url,
      };

      ApiComponents.ProfileEdit(newvalue).then((res: any) => {
        if (res?.response?.data?.message) {
          setMessage(res?.response?.data?.message);
          setOpen(true);
          return null;
        }
        setMessage(res);
        setOpen(true);
        setProfile(false);
        dispatch(getAdminProfile());
        dispatch(AddCategory(res));
        // dispatch(AddCategory(!addCategory));

        // navigate("/orders");
      });
    },
  });

  // useEffect(() => {
  //   dispatch(isHeader(true));
  // }, [addCategory]);
  useEffect(() => {
    ApiComponents.GetAdmin().then((res: any) => {
      setFieldValue("name", res?.data?.name);
      setFieldValue("email", res?.data?.email);
      setFieldValue("mobileNo", res?.data?.mobileNo);
      setUrl(res?.data?.image);
    });
  }, [message]);
  const CancalProfile = () => {};
  return (
    <div className="profile-setting-main">
      <p className="ProfileText">Profile Settings</p>
      {open ? (
        <CustomizedSnackbars
          openBar={open}
          message={message}
          handleSnackBar={() => handleSnackBar()}
        />
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="profile-setting-from-container">
          <div className="profile-setting-top-view">
            <div className="profile-setting-image">
              {!url ? (
                <img
                  className="profile-setting-image"
                  src={Image.UserProfile}
                  alt=""
                />
              ) : (
                <img
                  className="profile-setting-image"
                  src={`http://34.200.195.34/upload/${url}`}
                  alt=""
                />
              )}
              <div className="Browser">
                <Browser
                  disabled={profile ? false : true}
                  handleImage={(e: any) => {
                    newFile(e);
                  }}
                  customDisplay={"none"}
                />
              </div>
            </div>
            <div className="editSaveButton">
              {profile ? null : (
                <ButtonComponent
                  type="button"
                  title="Edit"
                  onClick={EditButton}
                />
              )}
              {profile ? (
                <ButtonComponent
                  type="button"
                  title="SAVE"
                  onClick={handleSubmit}
                />
              ) : null}
            </div>
          </div>

          <div className="input-box-profile-setting">
            <Input
              label="Full Name"
              placeholder="Full Name"
              type="text"
              id="name"
              name="name"
              value={values?.name}
              onHandleChange={(e: React.FormEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              error={errors?.name && touched?.name && errors?.name}
              disabled={profile === false ? true : false}
            />
          </div>
          <div className="input-box-profile-setting">
            <Input
              label="Email"
              placeholder="Enter Email Id"
              type="email"
              // value={values?.email}
              value={values?.email}
              id="email"
              name="email"
              onHandleChange={(e: React.FormEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              error={errors?.email && touched?.email && errors?.email}
              disabled
            />
          </div>
          <div className="input-box-profile-setting">
            <Input
              label="Mobile No."
              customStyles="mobileNo"
              placeholder="Enter Mobile No."
              type="number"
              id="mobileNo"
              name="mobileNo"
              value={values?.mobileNo}
              onHandleChange={(e: React.FormEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              error={errors?.mobileNo && touched?.mobileNo && errors?.mobileNo}
              disabled={profile === false ? true : false}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(ProfileSetting);
