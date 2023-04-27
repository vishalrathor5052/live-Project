import React from 'react'

export default function TransactionDetails() {
  return (
    <>
      <div className='mt-7'>
            <div className="flex justify-between items-center wallet-title">
                <h4>Transaction Details</h4>
                <div>
                    <a href='#' className='btn btn-small btn-gray !hidden'>Drop Token</a>
                    <a href='#' className='btn btn-small'>Drop Token</a>
                </div>
                
            </div>

            <div className="transaction-detail-wrap mt-4 pt-4 border border-solid border-green-400 rounded">

                <div className="table-wrap transaction-detail-wrap">

                <table className="data-table table-space-0 border-separate w-full text-sm text-black text-left">
                        <thead>
                            <tr className="data-item data-head" role="row">
                            <th className="data-col dt-user">Tranx NO</th>
                            <th className="data-col dt-token">Tokens</th>
                            <th className="data-col dt-amount">Amount</th>
                            <th className="data-col dt-usd-amount">USD Amount</th>
                            <th className="data-col dt-account">From</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="data-item" role="row">
                                <td className="data-col dt-tnxno">
                                    <div className="flex items-center">
                                    <div className="data-state data-state-pending">
                                        <span className="hidden">Pending</span>
                                    </div>
                                    <div className="fake-class">
                                        <span className="lead tnx-id">TNX1002</span>
                                        <span className="sub sub-date">2018-08-24 10:45PM</span>
                                    </div>
                                    </div>
                                </td>
                                <td className="data-col dt-token">
                                    <span className="lead token-amount">18,750</span>
                                    <span className="sub sub-symbol">TWZ</span>
                                </td>
                                <td className="data-col dt-amount">
                                    <span className="lead amount-pay">50.00</span>
                                    <span className="sub sub-symbol">
                                    ETH
                                    <span className="relative">
                                        <em className="tooltip-on-hover fas fa-info-circle text-[10px] text-green-400" />
                                        <span className="tooltip hidden">1 ETH = 100 TWZ</span>
                                    </span>
                                    </span>
                                </td>
                                <td className="data-col dt-usd-amount">
                                    <span className="lead amount-pay">245.52</span>
                                    <span className="sub sub-symbol">
                                    USD
                                    <span className="relative">
                                        <em className="tooltip-on-hover fas fa-info-circle text-[10px] text-green-400" />
                                        <span className="tooltip hidden">1 ETH = 100 TWZ</span>
                                    </span>
                                    </span>
                                </td>
                                <td className="data-col dt-from">
                                    <span className="lead amount-pay">1F1T....4XQX</span>
                                    <span className="sub sub-symbol">08 Jul, 18 10:20PM</span>
                                </td>
                            </tr>
                            <tr className="data-item" role="row">
                                <td className="data-col dt-tnxno">
                                    <div className="flex items-center">
                                    <div className="data-state data-state-pending">
                                        <span className="hidden">Pending</span>
                                    </div>
                                    <div className="fake-class">
                                        <span className="lead tnx-id">TNX1002</span>
                                        <span className="sub sub-date">2018-08-24 10:45PM</span>
                                    </div>
                                    </div>
                                </td>
                                <td className="data-col dt-token">
                                    <span className="lead token-amount">18,750</span>
                                    <span className="sub sub-symbol">TWZ</span>
                                </td>
                                <td className="data-col dt-amount">
                                    <span className="lead amount-pay">50.00</span>
                                    <span className="sub sub-symbol">
                                    ETH
                                    <span className="relative">
                                        <em className="tooltip-on-hover fas fa-info-circle text-[10px] text-green-400" />
                                        <span className="tooltip hidden">1 ETH = 100 TWZ</span>
                                    </span>
                                    </span>
                                </td>
                                <td className="data-col dt-usd-amount">
                                    <span className="lead amount-pay">245.52</span>
                                    <span className="sub sub-symbol">
                                    USD
                                    <span className="relative">
                                        <em className="tooltip-on-hover fas fa-info-circle text-[10px] text-green-400" />
                                        <span className="tooltip hidden">1 ETH = 100 TWZ</span>
                                    </span>
                                    </span>
                                </td>
                                <td className="data-col dt-from">
                                    <span className="lead amount-pay">1F1T....4XQX</span>
                                    <span className="sub sub-symbol">08 Jul, 18 10:20PM</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                   
                </div>
            </div>

        </div>
    </>
  )
}
