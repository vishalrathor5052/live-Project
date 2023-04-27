import React from 'react'

export default function UserDetailsTop() {
  return (
    <>
        <div className="userdetails-top px-5 py-4 border border-solid border-green-400 rounded my-8">
            <div className="flex space-x-4 justify-between items-center"> 
                <div>
                    <p>Token Balance</p>
                    <h2>10,000</h2>
                </div>
                <div>
                    <p>Year Contributed</p>
                    <h2>10 BTC</h2>
                </div>
                <div>
                    <p>Tranx Status</p>
                    <div class="bg-green-400 h-[25px] max-w-[80px] w-full text-white text-xs normal-case leading-[8px] text-center rounded-md p-2 cursor-default">Approved</div>
                </div>
                <div>
                    <ul class="data-vr-list">
                        <li><div class="data-state data-state-sm data-state-approved"></div>Email</li>
                        <li><div class="data-state data-state-sm data-state-pending"></div>KYC</li>
                        <li><div class="data-state data-state-sm data-state-approved"></div>WL</li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}
