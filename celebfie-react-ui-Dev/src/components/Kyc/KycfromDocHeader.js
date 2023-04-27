import React from 'react'

export default function KycfromDocHeader(Props) {
  
  return (
    
            <div
            className="verification-title md:flex items-center justify-between uppercase md:space-x-3 p-3 md:p-5 font-medium rounded-md transition-all cursor-pointer bg-neutral-200 text-black"
            onClick={ e =>(Props.click(Props.Showstatus ? false : Props.dependency ? true:false ))}>
            <div className="flex items-center space-x-3 mb-3 md:mb-0">
            <img src={Props.Icon} />
            <p>{Props.label}</p>
            </div>

            <div className="bg-neutral-400 h-[30px] max-w-[140px] w-full text-white text-xs normal-case leading-[15px] text-center rounded-md p-2 cursor-default">
            {Props.status}
            </div>

            
        </div>
  )
}
