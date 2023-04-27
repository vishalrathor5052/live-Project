import React from 'react'

export default function AdmintransactionTableRow() {
  return (
    <>

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
                    <span className='relative'>
                        <em className="tooltip-on-hover fas fa-info-circle text-[10px] text-green-400"></em>
                        <span className="tooltip hidden">1 ETH = 100 TWZ</span>
                    </span>
                </span>
            </td>
            <td className="data-col dt-verify">
                <ul className="data-vr-list">
                    <li>
                        <div className="data-state data-state-sm data-state-approved" />Email
                    </li>
                    <li>
                        <div className="data-state data-state-sm data-state-pending" />KYC
                    </li>
                </ul>
            </td>
            <td className="data-col dt-usd-amount">
                <span className="lead amount-pay">245.52</span>
                <span className="sub sub-symbol">
                    USD
                    <span className='relative'>
                        <em className="tooltip-on-hover fas fa-info-circle text-[10px] text-green-400"></em>
                        <span className="tooltip hidden">1 ETH = 100 TWZ</span>
                    </span>
                </span>
            </td>
            <td className="data-col dt-account">
                <span className="lead user-info">1F1T....4XQX</span>
                <span className="sub sub-date">08 Jul, 18 10:20PM</span>
            </td>
            <td className="data-col dt-type">
                <span className="badge badge-outline badge-success hidden sm:block">Active</span>
                <span className="badge badge-outline badge-success inline-block sm:hidden">A</span>
            </td>
            <td className="data-col">
                <div className="relative d-inline-block">
                    <a href="#" className="w-9 h-8 flex items-center justify-center p-1 bg-neutral-100 hover:bg-gray-400 text-yellow-400 hover:text-white rounded ml-auto"><em className="ti ti-more-alt" /></a>
                    <div className="toggle-class dropdown-content dropdown-content-top-left hidden">
                        <ul className="dropdown-list">
                            <li>
                                <a href="#"><em className="ti ti-eye" />View Details</a>
                            </li>
                            <li>
                                <a href="#"><em className="ti ti-na" />Suspend </a>
                            </li>
                            <li>
                                <a href="#"><em className="ti ti-trash" />Delete </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </td>

        </tr>
      
    </>
  )
}
