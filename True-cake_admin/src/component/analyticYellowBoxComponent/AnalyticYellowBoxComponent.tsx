import React, { FC } from "react";
import "./style.css";
import { analyiticYellowprops } from "../../Interface/Interface";
const AnalyticYellowBoxComponent : FC<analyiticYellowprops> = ({ title, label }) => {
  return (
   <div className='analytic-yellow-box-container'>
     <h4 className='analytic-yellow-box-heading'>{title}</h4>
     <p className='analytic-yellow-box-total-order'>{label}</p>
   </div>
  )
}

export default AnalyticYellowBoxComponent