import React, { useState, memo, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ButtonComponent from "../button/Button";
import Modal from "react-bootstrap/Modal";
import "./style.css";
import { addDeliveryDate } from "../../screens/reduxSetup/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import DeliveryTimeSlot from "../deliveryTimeSlot/DeliveryTimeSlot";

function CalenderDate(props: any) {
  const { show, timeMod } = props; //distructuring of props
  const dispatch = useDispatch();
  const [value, setValue] = useState(new Date());
  const [error, setError] = useState("");
  const [deliveryTimeSlotModal, setDeliveryTimeSlotModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const { deliveryDate } = useSelector((state: any) => state.addToCart);


  //handleSubmit function to close Delivery Date popUp and open delivery  time popUp
  const handleSubmit = () => {
    if (!value) {
      setError("Please select a date");
    } else {
      setError("");
      timeMod(true); //open delivery time popUp
      show(false); //close  delivery date popUp
      //dispatch deliveryDate in addDeliveryDate (redux state)
      dispatch(addDeliveryDate({ deliveryDate: value }));
      <DeliveryTimeSlot
        showCal={setDeliveryTimeSlotModal}
        timeMod={setTimeModal}
      />;
    }
  };

  useEffect(() => setValue(new Date(deliveryDate?.deliveryDate || value)), []);

  const handleClose = () => {
    show(false);
  };

  //handleChange function for change delivery time
  const handleChange = (e: any) => {
    let myDate = e;
    setValue(myDate); //update state
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Calendar onChange={handleChange} value={value} minDate={new Date()} />
      </Modal.Body>
      <div className="error-div">
        <p className="error-text">{error}</p>
      </div>
      <Modal.Footer className="continue-button-calander">
        <div>
          <ButtonComponent
            title="CONTINUE"
            type="button"
            onClick={handleSubmit}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(CalenderDate);
