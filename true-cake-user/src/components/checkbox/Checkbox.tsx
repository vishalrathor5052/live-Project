import React from "react";
import "./style.css";
import Images from "../../constant/Images";
import { FC } from "react";

interface CheckboxComponentProps {
  name: string;
}
const Checkbox: FC<CheckboxComponentProps> = ({ name }) => {
  return (
    <>
      <div className="checkbox-main">
        <div className="check-box">
          <img
            className="check-img checkbox-div"
            src={Images.yellowCheckbox}
            alt="productCake"
          />
          <div className="checkbox-line">
            <p>{name}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Checkbox;
