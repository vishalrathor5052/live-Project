import React, { FC } from "react";
import "./style.css";
import { analyiticprops } from "../../Interface/Interface";
const AnalyticBlackBoxComponent : FC<analyiticprops> = ({ title, label }) => {
  return (
   <div className='analytic-black-box-container'>
     <h4 className='analytic-black-box-heading'>{title}</h4>
     <p className='analytic-black-box-total-order'>{label}</p>
   </div>
  )
}

export default AnalyticBlackBoxComponent