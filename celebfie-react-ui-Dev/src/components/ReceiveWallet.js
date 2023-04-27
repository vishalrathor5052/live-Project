import React from 'react'

export default function ReceiveWallet() {
  return (
    <>
      <div className='bg-white p-5 mb-5 text-sm'>
          <h3>Receiving Wallet</h3>
          <div className="flex justify-between">
            <span><span>0x39deb3.....e2ac64rd</span>
            {/* <span className='relative'>
            <em className="tooltip-on-hover fas fa-info-circle text-[10px] text-green-400"></em>
            <span className="tooltip hidden">1 ETH = 100 TWZ</span></span> */}
            </span>
            <a href="#" className="uppercase">Edit</a></div>
      </div>
    </>
  )
}
