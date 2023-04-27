import React from 'react'
import "./style.css";
import Images from "../../constant/Images";
import DeliveryTimeSlot from '../deliveryTimeSlot/DeliveryTimeSlot';
import ButtonComponent from '../button/Button';

const ModalDeliveryTime = () => {
  return (
    <>
      <div className='modal-delivery-time-main'>
        <div className='modal-delivery-time-sub'>
          <div className='modal-delivery-time-container'>
            <div className='modal-delivery-time-content'>

              <div className='modal-delivery-time-heading'>
                <div className='modal-delivery-text'>DELIVERY TIME</div>
                <img src={Images.crossbtn} alt="location" />
              </div>
              <div className='modal-date-text-main'>
                <div><p className='delivery-date-text'>4 AUGUST 2022</p></div>
                <div><p className='delivery-change-date'>CHANGE DATE</p></div>
              </div>
              <div className='delivery-slot-main'>
                <div className='delivery-img-text'>
                  <img className='img-radiobtn' src={Images.radioBtn} alt="location" />
                  <div><p className='choose-delivery-text'>Choose the deliver slot</p></div>
                </div>
                <div className='delivery-text-free'>FREE</div>
              </div>
              <div className='time-slot-delivery'>
                <DeliveryTimeSlot />
              </div>
              <div className='modal-delivery-btn'><ButtonComponent title="CONTINUE" type="button" customStyles={{ width: "327px" }} onClick={() => { console.log("test") }} /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ModalDeliveryTime;