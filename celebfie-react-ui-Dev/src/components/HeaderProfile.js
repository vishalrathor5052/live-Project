import React, { useContext } from 'react'
//import Profilepic from '../images/profileimg.jpeg'
import { UserContext } from '../utility/context';

export default function HeaderProfile() {
  const {currentUserData} = useContext(UserContext);
  
  return (
    <>
      <div className='flex items-center text-white'>
          <p className='hidden dd:block'>{`Welcome! ${(currentUserData?.fullName) ? currentUserData.fullName : "" }`}</p>
          {/* <img src={Profilepic} className="ml-2 w-6 dd:w-11 h-6 dd:h-11 rounded-full" /> */}
      </div>
    </>
  )
}
