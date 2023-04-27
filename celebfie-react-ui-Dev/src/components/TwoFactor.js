import React, { useContext } from 'react'
import { UserContext } from '../utility/context';

export default function TwoFactor() {
  
  const {currentUserData} = useContext(UserContext);
  
  return (
    <div className='bg-white p-5 text-sm'>
      <h3>Two-Factor Verification</h3>
      <p>Two-factor authentication is a method for protection your web account. When it is activated you need to enter not only your password, but also a special code. You can receive this code by in mobile app. Even if third person will find your password, then can't access with that code.</p>

      <div className="flex justify-between items-center flex-wrap mt-6">
        <button className="btn btn-small order-3 sm:order-1">Enable 2FA</button>
        <div className='h-3 w-full sm:w-auto order-2' />
        <span className="flex items-center order-1 sm:order-3">
            <span className="mb-0 uppercase">Current Status:</span>
            {currentUserData.twoFactorVarification ? <span className="badge badge-disabled">Disabled</span> : <span className="badge badge-disabled">Disabled</span> }
            
        </span>
      </div>

    </div>
  )
}
