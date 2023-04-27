import { useCallback, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import * as IMG from "./../../components/common/Images";
import Form from "react-bootstrap/Form";
import axios from "../../components/common/constants";
import { ToastContainer, toast, Slide } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import Loader from "../../components/common/Loader";

const confirmpassSchema = Yup.object({
  oldPassword: Yup.string().required("Please enter your password"),
  newPassword: Yup.string()
    .min(6)
    .max(12)
    .required("Please enter your password")
    .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Please enter your password"),
  confirmPassword: Yup.string()
    .required("Confirm Password Is Required")
    .oneOf([Yup.ref("newPassword"), null], "Password must match"),
});
const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const ProfileSetting = () => {
  const [theme, setTheme] = useState<string>("light-theme");
  const [user, setUser] = useState<any>({});
  const [loader, setLoader] = useState(true);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: confirmpassSchema,
      onSubmit: async (values, action) => {
        const payload = {
          oldPassword: values.oldPassword,
          newPassword: values.confirmPassword,
        };
        axios
          .post("/auth/changePassword", payload)
          .then((res: any) => {
            if (res?.status === 200) {
              toast.success("Password Change successfully");
              return res;
            }
          })
          .catch((err: any) => {
            toast.error(err?.response?.data?.message);
            return err.response;
          });

        action.resetForm();
      },
    });
  const getUserProfileInfo = useCallback(() => {
    axios
      .get("auth/getUserProfile")
      .then((res: any) => {
        if (res.status === 200) {
          setLoader(false);
          setUser(res?.data?.data);
        }
      })
      .catch((err: any) => {
        return err.response;
      });
  }, []);
  useEffect(() => {
    getUserProfileInfo();
  }, []);

  useEffect(() => {
    const fetchTheme = localStorage.getItem("theme");
    setTheme(fetchTheme ?? "light-theme");
  }, []);

  // ............night and Darkmode toggle ...................
  const toggletheme = () => {
    theme === "light-theme" ? setTheme("dark-theme") : setTheme("light-theme");
    theme === "light-theme"
      ? localStorage.setItem("theme", JSON.stringify("dark-theme"))
      : localStorage.setItem("theme", JSON.stringify("light-theme"));
  };
  useEffect(() => {
    const themeChoosen: any =
      localStorage.getItem("theme") ?? JSON.stringify(theme);
    document.body.className = JSON.parse(themeChoosen);
  }, [theme]);
  // -----------------------<<<Profile Name First Latter>>> ----------------------------
  const UserName: any = localStorage.getItem("UserName") ?? "--- ---";
  const name = UserName.split(" ");
  const initials =
    name.shift().charAt(1).toUpperCase() + name.pop().charAt(0).toUpperCase();

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="profile-setting-container">
          <div className="profile-setting-top-view">
            <div className="profile-setting-heading">
              <h4>Profile Setting</h4>
            </div>
            <div className="night-mode">
              <p className="night-mode-heading">Night Mode</p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={theme === "light-theme" ? false : true}
                  onClick={() => toggletheme()}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="profile-setting-bottom-div">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <div className="profile-setting-left-div">
                <div className="profile-img" style={{ color: "white" }}>
                  {initials}{" "}
                </div>
                <p className="customer-name">{user?.name ?? "--- ---"}</p>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item className="tab-button-div">
                    <Nav.Link eventKey="first">
                      Basic Details
                      <img
                        src={IMG.arrowRight}
                        alt=""
                        className="select-hide"
                      />
                      <img
                        src={IMG.arrowRightWhite}
                        alt=""
                        className="select-show"
                      />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="tab-button-div">
                    <Nav.Link eventKey="second">
                      Demat Details
                      <img
                        src={IMG.arrowRight}
                        alt=""
                        className="select-hide"
                      />
                      <img
                        src={IMG.arrowRightWhite}
                        alt=""
                        className="select-show"
                      />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="tab-button-div">
                    <Nav.Link eventKey="third">
                      Bank Account Details
                      <img
                        src={IMG.arrowRight}
                        alt=""
                        className="select-hide"
                      />
                      <img
                        src={IMG.arrowRightWhite}
                        alt=""
                        className="select-show"
                      />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="tab-button-div">
                    <Nav.Link eventKey="fourth">
                      Change Password
                      <img
                        src={IMG.arrowRight}
                        alt=""
                        className="select-hide"
                      />
                      <img
                        src={IMG.arrowRightWhite}
                        alt=""
                        className="select-show"
                      />
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className="profile-setting-right-div">
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <p className="basic-detail-heading">Basic Details</p>
                    <div className="account-detail-div">
                      <p className="account-id">Account ID:</p>
                      <p className="account-detail-data">
                        {user?.id ?? "--- ---"}
                      </p>
                    </div>
                    <div className="account-detail-div">
                      <p className="account-id">Name:</p>
                      <p className="account-detail-data">
                        {user?.name ?? "--- ---"}
                      </p>
                    </div>
                    <div className="account-detail-div">
                      <p className="account-id">Email ID:</p>
                      <p className="account-detail-data">
                        {user?.email ?? "--- ---"}
                      </p>
                    </div>
                    <div className="account-detail-div">
                      <p className="account-id">Mobile No. :</p>
                      <p className="account-detail-data">
                        {user?.mobileNo ?? "--- ---"}
                      </p>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <p className="basic-detail-heading">Demat Details</p>
                    <div className="account-detail-div">
                      <p className="account-id">Demat Ac No. :</p>
                      <p className="account-detail-data">
                        {user?.dematAccNo ?? "--- ---"}
                      </p>
                    </div>
                    <div className="account-detail-div">
                      <p className="account-id">Pan card:</p>
                      <p className="account-detail-data">
                        {user?.pancardNo ?? "--- ---"}
                      </p>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <p className="basic-detail-heading">Bank Account Details</p>
                    <div className="account-detail-div">
                      <p className="account-id">
                        {user?.bankAccountNo ?? "--- ---"}
                      </p>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                    <p className="basic-detail-heading">Change Password</p>
                    <div style={{ marginTop: "25px" }}>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group
                          className="input-div mb-2"
                          controlId="formBasicEmail"
                        >
                          <Form.Label className="lable-tsx">
                            Old Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Old password"
                            name="oldPassword"
                            value={values.oldPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.oldPassword && touched.oldPassword && (
                            <p className="form-error">{errors.oldPassword}</p>
                          )}
                        </Form.Group>
                        <Form.Group
                          className="input-div mb-2"
                          controlId="formBasicEmail"
                        >
                          <Form.Label className="lable-tsx">
                            New Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            name="newPassword"
                            placeholder="Enter new password here"
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.newPassword && touched.newPassword && (
                            <p className="form-error">{errors.newPassword}</p>
                          )}
                        </Form.Group>
                        <Form.Group
                          className="input-div mb-2"
                          controlId="formBasicEmail"
                        >
                          <Form.Label className="lable-tsx">
                            Confirm Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter confirm password here"
                            value={values.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Form.Group>
                        {errors.confirmPassword && touched.confirmPassword && (
                          <p className="form-error">{errors.confirmPassword}</p>
                        )}
                        <div className="change-password-btn">
                          <Button type="submit">CHANGE PASSWORD</Button>
                        </div>
                      </Form>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
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
      )}
    </div>
  );
};

export default ProfileSetting;
