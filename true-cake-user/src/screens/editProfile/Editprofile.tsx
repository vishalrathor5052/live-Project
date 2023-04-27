import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navBar/NavBar";
import ButtonComponent from "../../components/button/Button";
import MobileHeader from "../../components/mobileHeader/MobileHeader";
import MobileFooter from "../../components/mobileFooter/MobileFooter";
import "./style.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState, memo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Images from "../../constant/Images";
import { landingConstants, PATH } from "../../constant/Constant";
import { addUserDetails } from "../reduxSetup/UserDetailsSlice";
import FooterMenuTab from "../../components/footerMenuTab/FooterMenuTab";
import axios from "axios";
import ToastAlert from "../../components/Toast/Toast";
import CircularCategory from "../../components/circularCategory/CircularCategory";
import Loader from "../../components/loader/Loader";

//validation for input field
const signUpSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .typeError("That doesn't look like a name")
    .min(3)
    .required("Name is required"),
  email: Yup.string()
    .typeError("That doesn't look like an email address")
    .min(5)
    .email()
    .matches(
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]+[.com]{2,}))$/,
      "*Enter valid email"
    )
    .required("Email is required"),
  // mobile: Yup.string()
  //   .typeError("That doesn't look like a mobile number")
  //   .min(10)
  //   .max(10)
  //   .required("Enter mobile number")
  //   .matches(/(^[0-9]{10}$)/, "*enter valid mobile number"),
});

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [test, setTest] = useState(false);
  const { userDetail } = useSelector((state: any) => state.userDetails);
  const [isLoader, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    setIsLoading(true);
    await axios(PATH + "user/getOneUsers", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then((response) => {
        console.log("response in edit profile", response?.data?.data);
        handleChange({
          name: "firstName",
          value: response?.data?.data?.firstName ?? "",
        });
        handleChange({ name: "lastName", value: response?.data?.data ?? "" });
        handleChange({
          name: "email",
          value: response?.data?.data?.email ?? "",
        });
        handleChange({
          name: "mobileNo",
          value: response?.data?.data?.mobileNo ?? "",
        });
      })
      .catch((error) => {
        return error.response;
      })
      .finally(() => setIsLoading(false));
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
  };

  const handleChange = useCallback((event: any): any => {
    const { name, value } = event.target ?? event;
    setFieldValue(name, value);
    // setFieldTouched(name, true);
    dispatch(addUserDetails({ [name]: value }));
  }, []);

  const { values, errors, touched, handleSubmit, setFieldValue }: any =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        values.firstName = values.firstName.trim();
        const updatedProfile = {
          name: values?.firstName.trim(),
          email: values?.email,
          mobileNo: values?.mobileNo,
        };

        console.log("values in profile", values, updatedProfile);
        //dispatch updated details of user
        await dispatch(addUserDetails(values));
        //calling sendUserDetails function to call signUp api
        await sendUserDetails(values);
      },
    });

  //signUp api to update the details of a user
  const sendUserDetails = async (value: any) => {
    setIsLoading(true);
    await axios(PATH + "user/editProfile", {
      method: "put",
      data: value,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail?.tokenId?.data,
      },
    })
      .then((response) => {
        navigate("/profile"); //after update the values navigate to landing page
      })
      .catch((error) => {
        return error.response;
      })
      .finally(() => setIsLoading(false));
  };
  const handleNavigate = () => {
    navigate("/profile");
  };

  return (
    <div className="delivery-address-main">
      <NavBar />
      <MobileHeader />
      {/* <div className="circular-cat-main">
        <CircularCategory />
      </div> */}
      {test && (
        <ToastAlert
          handleSnackBar={undefined}
          openBar={undefined}
          message={undefined}
        />
      )}
      <div className="editprofile-container">
        <div className="delivery-div">
          <div className="cat-heading-container">
            <div className="back-arrow-icon">
              <img
                src={Images.arrowCard}
                alt="IconCheckbox"
                onClick={() => handleNavigate()}
              />
            </div>
            <div style={{ display: "flex", position: "relative" }}>
              <div className="cat-heading-div">
                <h4 className="heading-category">EDIT PROFILE</h4>
              </div>
              <div className="cake-logo-div">
                <img className="cake-logo" src={Images.logo} alt="cake-logo" />
              </div>
            </div>
            <div className="edit-profile-bottom-div"></div>
          </div>
        </div>
        {isLoader ? (
          <div style={{ marginTop: "100px" }}>
            {" "}
            <Loader />{" "}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="inputbox-main-div">
              <div>
                <label className="input-lable ">Name</label>
                <input
                  className="inputbox-txt"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && touched.firstName ? (
                  <p className="delivery-address-foam">{errors.firstName}</p>
                ) : null}
              </div>
              <div className="label-div">
                <label className="input-lable ">Email*</label>
                <input
                  className="inputbox-txt "
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email ? (
                  <p className="delivery-address-foam">{errors.email}</p>
                ) : null}
              </div>
              <div className="label-div">
                <label className="input-lable ">Mobile No.</label>
                <input
                  className="inputbox-txt "
                  type="number"
                  name="mobile"
                  value={values?.mobileNo}
                  onChange={handleChange}
                  // readOnly
                />
              </div>
              <div className="time-slot-btn">
                <ButtonComponent
                  title="Save"
                  type="button"
                  onClick={handleSubmit}
                  isPadding={true}
                />
              </div>
            </div>
          </form>
        )}
      </div>
      <Footer data={landingConstants.footerData} />
      <MobileFooter data={landingConstants.footerData} />
      <FooterMenuTab />
    </div>
  );
};
export default memo(EditProfile);
