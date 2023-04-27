import React, { useEffect } from 'react'

export default function KycvarificationBlock() {


  return (
    <div className="bg-white p-5 text-sm">
      <h3>Identity Verification - KYC</h3>
      <p>To comply with regulation, participant will have to go through indentity verification.</p>
      <p className="font-light">You have not submitted your KYC application to verify your indentity.</p>
      <a href="/kycverification" className="btn w-full max-w-full block leading-9 text-white hover:text-white mt-5 mb-3">Click to Proceed</a>
      <h6 className="text-red-200 text-center">* KYC verification required for purchase token</h6>
    </div>
  )
}
