import React from 'react'
import { isEmail } from "validator";

export const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          This field is required!
        </div>
      );
    }
  };

export const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="invalid-feedback d-block">
          This is not a valid email.
        </div>
      );
    }
  };
  
  export const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="invalid-feedback d-block">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };
  
  export  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="invalid-feedback d-block">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };

  export  const vrepassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="invalid-feedback d-block">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };


  export const confirmpassword = (value, props, components) => {

    if (value !== components['password'][0].value) { 
      return <span className="invalid-feedback d-block">Passwords are not equal.</span>
    }
  };