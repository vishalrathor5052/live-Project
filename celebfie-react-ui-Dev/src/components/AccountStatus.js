import React, { useContext, useEffect, useState } from 'react'

import KycVarifications from '../services/Kyc.varification';
import { UserContext } from '../utility/context';
import { varificationstatus } from '../utility/Strings';

export default function AccountStatus() {
  
  const {currentUserData} = useContext(UserContext);
  

  const[ckystatus,setkycstaus] = useState(false);
  const[ckystatusMessage,setkycstausMessage] = useState('Pending');
  useEffect(()=>{
    KycVarifications.getKycDetails(currentUserData.userId).then((response)=>{
      
      if(response?.status===200 && response?.data?.users?.status === varificationstatus.success)
        {
          setkycstaus(true)
          setkycstausMessage(response?.data?.users?.status)
        }else
        {
          setkycstausMessage(response?.data?.users?.status)
        }
  })
  })
  return (
    <div className='bg-white p-5 mb-5 text-sm'>
          <h3>Your Account Status</h3>
          <ul className="flex -mx-2">
          
          
            {currentUserData.identityStatus ? <li className='px-2'><span className="btn btn-xs bg-green-300">Email Verified</span></li> : ''}
            {ckystatusMessage===varificationstatus.failed ? <li className='px-2'><span className="btn btn-xs bg-red-400">KYC Failed</span></li> :'' }
            {ckystatusMessage===varificationstatus.success ? <li className='px-2'><span className="btn btn-xs bg-green-300">KYC Success</span></li> :'' }
            {ckystatusMessage!==varificationstatus.success &&  ckystatusMessage !==varificationstatus.failed ? <li className='px-2'><span className="btn btn-xs bg-neutral-400">KYC Pending</span></li> :'' }
            
          </ul>
          {/* <h3 className='mt-5 text-yellow-400'>Receiving Wallet</h3>
          <div className="flex justify-between">
            <span><span>0x39deb3.....e2ac64rd</span>
            <span className='relative'>
            <em className="tooltip-on-hover fas fa-info-circle text-[10px] text-green-400"></em>
            <span className="tooltip hidden">1 ETH = 100 TWZ</span></span>
            </span><a href="#" className="uppercase">Edit</a></div> */}
      </div>
  )
}
