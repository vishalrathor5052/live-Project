import React from 'react'
import "./style.css"
import Images from "../../constant/Images";
const Crossbtn = (props: any) => {
  return (
    <>
      {/* <div className='cross-main'> */}
      {/* <button className='cross-btn'> */}
      <img src={Images.crossbtn} alt="cross" width={"100%"} onClick={props.handleClick} />
      {/* </button> */}
      {/* </div> */}
    </>
  )
}
export default Crossbtn;