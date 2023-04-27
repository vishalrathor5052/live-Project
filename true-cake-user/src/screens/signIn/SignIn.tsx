import { useState, memo } from "react";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Verification from "../../components/verificationcode/Verification";
import ButtonComponent from "../../components/button/Button";
import Image from "../../constant/Images";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../reduxSetup/UserDetailsSlice";
import axios from "axios";
import { PATH } from "../../constant/Constant";
import ToastAlert from "../../components/Toast/Toast";
import Loader from "../../components/loader/Loader";

const signInSchema = Yup.object({
  mobile: Yup.string()
    .typeError("That doesn't look like a mobile number")
    .min(10)
    .max(10)
    .required("Enter mobile number")
    .matches(/(^[0-9]{10}$)/, "*enter valid mobile number"),
});

const initialValues = {
  mobile: "",
};

const SignIn = (props: any) => {
  const { newShow } = props;
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [isLoader, setIsLoading] = useState(false);

  const handleClose = () => {
    newShow(false);
  };
 
  const handleSnackBar = () => {
  setOpen(false);
  }; 

  const sendMobileNo = (value: any) => {
    setIsLoading(true);
    return axios(PATH + "user/signIn", {
      method: "post",
      data: value,
    })
      .then(async (response) => {
        if (response.data?.success){
          await dispatch(
            addUserDetails({
              orderId: response?.data?.data?.orderDetails?.orderId,
            })
          );
          setModal(true);
        }
        return response;
      })
      .catch((error) => {
        if (error) {
          setOpen(true);
          setMessage(error?.response?.data?.message ??  "Please enter valid mobile number");
          } else {
            setOpen(false);
          }
        return error.response;
      }).finally(()=> setIsLoading(false));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signInSchema,

      onSubmit: async (values) => {
        let payload = {
          mobileNo: values.mobile,
        };
        const response = await sendMobileNo(payload);
        dispatch(
          addUserDetails({
            userId: response?.data?.data?.id,
            firstName: response?.data?.data?.firstName,
            mobileNo: payload?.mobileNo,
            email: response?.data?.data?.email,
            address: response?.data?.data?.address,
            landmark: response?.data?.data?.landmark,
            pinCode: response?.data?.data?.pinCode,
            userExist: response?.data?.data?.userExist,
          })
        );
       
      },
    });

  let mobile1 = +values.mobile;
  let mobile2 = String(mobile1).length;

  return (
    <Modal
      show={newShow}
      onHide={handleClose}
      centered
      className="sign-in-modal"
      style={{}}
    >
     
      <Modal.Header closeButton>
        <Modal.Title className="modal-title-div">
          <div>
            <h4 className="sign-in-title">SIGN IN</h4>
            <p className="sign-in-pera">
              You'll receive a 4 digit code
              <br /> to verify next
            </p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <InputGroup className="input-box-signin">
            <InputGroup.Text id="basic-addon1">
              <img src={Image?.flag} alt="" />{" "}
              <span className="ms-2"> +91</span>
            </InputGroup.Text>
            <Form.Control
              placeholder="Mobile Number"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="mobile"
              type="text"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {mobile2 === 10 && (
              <img src={Image.checkmark} alt="" className="checkmark-img" />
            )}
          </InputGroup>
        </div>
      </Modal.Body>
      <div className="error-div">
        {errors.mobile && touched.mobile ? (
          <p className="delivery-address-foam text-danger">{errors.mobile}</p>
        ) : null}
      </div>
      <Modal.Footer className="request-opt">
        {/* <div> */}
          <ButtonComponent
            isPadding={true}
            type="button"
            title="Request OTP"
            onClick={handleSubmit}
          />
          {  modal && <Verification number={values.mobile} show={setModal} />}
          {<ToastAlert
          openBar={open}
          message={message}
          handleSnackBar={() => handleSnackBar()}
        />}
        {/* </div> */}
      </Modal.Footer>
    
    </Modal>
  );
};

export default memo(SignIn);
