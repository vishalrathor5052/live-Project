import React from "react";
import "./style.css";
const CardDeliveryAddress = () => {
  return (
    <div>
      <form>
        <div>
          <div className="cart-input-div">
            <label className="cart-input-label">Name</label>
            <input
              type="text"
              name="firstname"
              className="card-input"
              placeholder="Name"
            />
          </div>
          <div className="cart-input-div mt-3">
            <label className="cart-input-label">Email*</label>
            <input
              type="text"
              name="firstname"
              className="card-input"
              placeholder="Email"
            />
          </div>
          <div className="cart-input-div mt-3">
            <label className="cart-input-label">Mobile No.</label>
            <input
              type="text"
              name="firstname"
              className="card-input"
              placeholder="0124563789"
            />
          </div>
          <div className="cart-input-div mt-3">
            <label className="cart-input-label">Location</label>
            <input
              type="text"
              name="firstname"
              className="card-input"
              placeholder="Location"
            />
          </div>
          <div className="cart-input-div mt-3">
            <label className="cart-input-label">Landmark</label>
            <input
              type="text"
              name="firstname"
              className="card-input"
              placeholder="Landmark"
            />
          </div>
          
        </div>
      </form>
    </div>
  );
};

export default CardDeliveryAddress;
