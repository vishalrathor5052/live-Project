import React from 'react'
import "./style.css"

import { FC,useState } from "react";

interface WeightComponentProps {
    kilogram: string
    id:number
    selectWeight:number
  }

  const Weight: FC<WeightComponentProps> = ({kilogram,id,selectWeight}) => {

const weight = selectWeight;

  return (
    <>
    <div className={id===weight?"weight-main-selected":"weight-main"}>
      <p className='weight-kilogram'>{kilogram}</p>
    </div>
    </>
  )
}
export default Weight;