import React, { useEffect, useState } from 'react'
// import ImgData from '../Common/Imges'
import "./style.scss"
// import headerLogo from "../../assets/images/Vector.png";
const headerLogo = require("../../assets/images/Vector.png")
const TabSide = require("../../assets/MobileIcon/icons.png")
const Closebtn = require("../../assets/MobileIcon/Close.png")
const Headers = () => {
  const [Active, setActive] = useState(true)

  const HandleSideMenu = () => {
    setActive(false)
  }
  const HandleCloseMenu = () => {
    setActive(true)
  }

  // useEffect(()=>{
  //   if(!Active){
  //   document.body.style.overflow="hidden"
  // }else{
  //     document.body.style.overflow=""

  //   }
  // },[Active])

  return (
    <>
      {Active ?
        <div className="dashboard-header">
          <div className='header-logo'>
            <img src={headerLogo} alt="header" />
          </div>
          <div className='Header-list'>
            <ul className='Header-Menu'>
              <li>
                Our Story
              </li>
              <li>
                Our Chef
              </li>
              <li>Cook with us
              </li>
              <li>
                Order meals
              </li>
              <li>
                Support
              </li>
              <li>
                EN
              </li>
              <div className='header-signup'>
                {/* <img src={} alt="signin" /> */}
                Sign up

              </div>
            </ul>
            <div className="MoblieMenu" >
              <span>EN</span>
              <img src={TabSide} alt="" onClick={HandleSideMenu} />
            </div>

          </div>

        </div>
        :
        <div className='mobile-menu-list'>
          <div className='menuItem'><p>Menu</p> <img src={Closebtn} alt="" onClick={HandleCloseMenu} /></div>
          <div className='listMenu'>
            <p>Our Story</p>
            <p>Our Chef</p>
            <p>Cook with us</p>
            <p>Order meals</p>
            <p>Support</p>
          </div>
          <hr></hr>
          <div className='mobile-last'>
            <div className='mobile-signup'>
              {/* <img src={} alt="signin" /> */}
              Sign up

            </div>
            <p className='pTag'>Become a Chef</p>
            <p className='pTag'>An Individual</p>
          </div>
        </div>
      }
    </>
  )
}

export default Headers