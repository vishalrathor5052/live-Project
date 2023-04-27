// import TimeSlotData from "../timeslot";
import React, { useEffect, useState, memo } from "react";
import "./style.css";
import axios from "axios";
import Moment from "react-moment";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../button/Button";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { PATH } from "../../constant/Constant";
import {
  addDeliveryDate,
  addStepperSatate,
} from "../../screens/reduxSetup/CartSlice";

const DeliveryTimeSlot = (props: any) => {
  //distructuring of props
  let setModal = props.showCal;
  const { timeMod, handleGetCartData } = props;
  const [time, setTime] = useState<Record<string, string | any>>({});
  const [timeSlot, setTimeSlot] = useState([]);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { deliveryDate, addToCartData } = useSelector(
    (state: any) => state.addToCart
  );
  const {
    userDetails: { userDetail },
  } = useSelector((state: any) => state);
  const [isLoader, setIsLoading] = useState(true);
  let dateToFormat = deliveryDate.deliveryDate;

  console.log(
    " deliveryDate?.deliveryTime in timeslot",
    deliveryDate?.deliveryTime,
    time
  );

  useEffect(() => {
    //call getTimeSlot function to call deliveryTime/list api
    getTimeSlot();

    // setSelected(elm.id);                                                         //update selected state
    // setTime(deliveryDate.deliveryTime);
  }, []);

  // useEffect(() => setValue(new Date(deliveryDate.deliveryDate )?? value), []);

  //getTimeSlot function to get data of timeSlot from deliveryTime/list
  const getTimeSlot = async () => {
    await axios
      .get(`${PATH}deliveryTime/list`)
      .then((res: any) => {
        //update timeSlot state
        setTimeSlot(res?.data?.data);
        // setValue(new Date(deliveryDate.deliveryTime )?? value)
        //update isLoading state as false to stop loading after get api response
        setIsLoading(false);
      })
      .catch((err) => {});
  };

  //handleChange function for continue button
  const handleChange = async () => {
    if (!(selected || deliveryDate.deliveryTimeId)) {
      // if your not select time slot show message
      setError("Please select delivery time slot"); //update error state to show message : please select delivery time slote
    } else {
      //create shippingAddress api payload
      let value = {
        name: userDetail?.name,
        mobileNo: userDetail?.alternateNo
          ? userDetail?.alternateNo
          : userDetail?.mobileNo,
        //shippingAddress from userDetail(redux state)
        shippingAddress: userDetail?.address,
        //landmark from userDetail(redux state)
        landmark: userDetail?.landmark,
        //shippingPin from userDetail(redux state)
        shippingPin: userDetail?.pinCode,
        //deliveryDate from  dateToFormat(deliveryDate.deliveryDate)
        deliveryDate: dateToFormat,
        //from (Start Time) from time state
        from: deliveryDate?.deliveryTime?.from || time?.from,
        //to (end time) from time state
        to: time?.to || deliveryDate?.deliveryTime?.to,
      };

      //update state as false to close delivery Time popUp
      setModal(false);
      timeMod(false);
      addToCartData?.shipping == null
        ? await addShippingAddress(value)
        : await updateShippingAddress(value); //call addShippingAddress function to call shippingDetails/add api
      //dispatch the deliveryTime in addDeliveryDate(redux state)
      await dispatch(
        addDeliveryDate(
          {
            deliveryTime: deliveryDate?.deliveryTime?.to
              ? deliveryDate?.deliveryTime
              : time,
          },
          { deliveryDate: dateToFormat }
        )
      );
      //dispatch the steper-3(payment) in addStepperSatate(redux state)
      await dispatch(addStepperSatate(3));
      //update error state as ""
      setError("");
    }
  };

  //handleClose function for close popUp
  const handleClose = () => {
    setModal(true);
    timeMod(false);
  };

  //handleClick function to select time
  const handleClick = async (elm: any) => {
    if (elm?.id) {
      setSelected(deliveryDate?.deliveryTimeId || elm?.id); //update selected state
      setTime({
        from: tConvert(elm?.from),
        to: tConvert(elm?.to),
      }); //upate time state
      await dispatch(
        addDeliveryDate({ deliveryTimeId: elm.id, deliveryTime: time })
      );
      setError(""); //update error state
    }
  };

  //handleChangeDate
  const handleChangeDate = () => {
    console.log("in change date");
    timeMod(false);
    setModal(true);
    props.show(true);
  };

  const addShippingAddress = (value: any) => {
    return axios(PATH + "shippingDetails/add", {
      method: "post",
      data: value,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail.tokenId?.data,
      },
    })
      .then(async (response) => {
        // dispatch(userDetail({ deliveryTime: response?.data?.data?.from }))
        if (response.data.success) await handleGetCartData();
        navigate("/cart");
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  };

  //updateShippingAddress to update shipping address of user
  const updateShippingAddress = async (addAddress: any) => {
    console.log("xbsjcxasjc", addAddress);
    await axios(
      `${PATH}shippingDetails/update/${addToCartData?.shipping?.id}`,
      {
        method: "put",
        data: {
          name: addAddress?.name,
          mobileNo: addAddress?.mobileNo,
          shippingAddress: addAddress?.shippingAddress,
          deliveryDate: dateToFormat,
          from: addAddress?.from,
          to: addAddress?.to,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userDetail?.tokenId?.data,
        },
      }
    )
      .then(async (response) => {
        if (response.data.success) await handleGetCartData();
        navigate("/cart");
        // return response;
      })
      .catch((error) => {
        return error.response;
      });
  };

  function tConvert(time: any) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  // tConvert("18:00:00");

  return (
    <Modal show={timeMod} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title className="delivery-time-div">
          <h4 className="delivery-time-title">Delivery Time</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoader ? (
          <Loader />
        ) : (
          <div>
            <div className="date-set-container">
              <div className="date-set-div">
                <p>
                  <Moment format="YYYY/MM/DD">{dateToFormat}</Moment>
                </p>
              </div>
              <div
                className="change-date-div"
                onClick={() => handleChangeDate()}
              >
                <p>Change Date</p>
              </div>
            </div>
            <div className="time-slot-container">
              {timeSlot.map((elm: any) => {
                return (
                  <div
                    // className="time-select-new-div"
                    className={
                      elm.id === deliveryDate.deliveryTimeId ?? selected
                        ? "time-select-new-div"
                        : "time-select-div"
                    }
                    key={elm.id}
                  >
                    <button
                      onClick={() => handleClick(elm)}
                      className={
                        new Date().getHours() >= parseInt(elm.from) &&
                        new Date() >= deliveryDate?.deliveryDate
                          ? "time-disabled-button-div"
                          : elm.id === deliveryDate?.deliveryTimeId || selected
                          ? "time-select-new-button"
                          : "time-select-button"
                      }
                      disabled={
                        new Date().getHours() >= parseInt(elm.from) &&
                        new Date() >= deliveryDate?.deliveryDate
                          ? true
                          : false
                      }
                    >
                      {tConvert(elm?.from)} -{tConvert(elm?.to)}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Modal.Body>
      <div className="error-div">
        <p className="error-text">{error}</p>
      </div>
      <Modal.Footer className="continue-btn-delivery-time">
        <ButtonComponent
          customClass="delivery-time-continue-btn"
          type="button"
          title="Continue"
          onClick={handleChange}
        />
        {/* {modal && <CalenderDate show={setModal} />} */}
      </Modal.Footer>
    </Modal>
  );
};

export default memo(DeliveryTimeSlot);
