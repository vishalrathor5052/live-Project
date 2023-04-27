import React from 'react'

export default function TransactionTableRow() {
  return (
    <>
        <tr>
            <td>
                <div className="flex items-center">
                    <div className="data-state data-state-pending"></div>
                    <span className="lead">18,750</span>
                </div>
            </td>
            <td>
                <span>
                    <span className="lead">3.543</span>
                    <span className="sub text-xs pl-1 text-gray-500">ETH 
                        <span className='relative ml-1'>
                            <em className="tooltip-on-hover fas fa-info-circle text-[10px] text-green-400"></em>
                            <span className="tooltip hidden">1 ETH = 100 TWZ</span>
                        </span>
                    </span>
                </span>
            </td>
            <td className="hidden sm:table-cell tnx-date">
                <span className="sub sub-s2">2018-08-24 10:20 PM</span>
            </td>
            <td className="tnx-type">
                <span className="badge badge-outline badge-success hidden sm:block ml-auto">Purchase</span>
                <span className="badge badge-outline badge-success inline-block sm:hidden ml-auto">P</span>
            </td>
        </tr>
    </>
  )
}
