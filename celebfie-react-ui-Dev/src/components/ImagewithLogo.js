import React from 'react'
import SignupImage from '../images/person-coin.png'
// import BrandLogo from '../images/brand-logo.png'

export default function ImagewithLogo() {
  return (
    <>
        <div className='coin-logo relative h-full xl:-ml-24'>
          {/* <img src={BrandLogo} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[40%]" /> */}
          <img src={SignupImage} className="mx-auto xl:mx-0 max-w-xs dd:max-w-none dd:mr-auto" />
        </div>
    </>
  )
}
