import React from 'react'

export default function WalletDetails() {
  return (
    <>
        
        <div className='mt-7'>
            <div className="flex justify-between items-center wallet-title">
                <h4>Wallet Details</h4>
                <div>
                    <a href='#' className='btn btn-small btn-gray !hidden'>Add Token</a>
                    <a href='#' className='btn btn-small'>Add Token</a>
                </div>
                
            </div>

            <div className="userdetails-top px-5 py-4 border border-solid border-green-400 rounded my-8 hidden">

            </div>

            <div className="wallet-detail-wrap mt-4">

                <div className="table-wrap personal-info-wrap">
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td>Wallet Address</td>
                                <td>0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae</td>
                            </tr>
                            <tr>
                                <td>Withdraw Address</td>
                                <td>0xa058106537340385156d3342d5c87d264f935920</td>
                            </tr>
                            <tr>
                                <td>Tx Hash</td>
                                <td>Tx156d3342d5c87d264f9359200xa058106537340385c87d264f93</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    </>
  )
}
