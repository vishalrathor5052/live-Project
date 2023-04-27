import React from 'react'

export default function UserlistTableRow() {
  return (
    <>
        <tr className="data-item" role="row">
            <td className="data-col dt-user">
                <span className="lead user-name">Abu Bin Ishtiyak</span>
                <span className="sub user-id">UD102001</span>
            </td>
            <td className="data-col dt-email">
                <span className="sub sub-s2 sub-email">info(at)softnio.com</span>
            </td>
            <td className="data-col dt-token">
                <span className="lead lead-btoken">35,040</span>
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
            <td className="data-col dt-login">
                <span className="sub sub-s2 sub-time">2018-08-24 10:20 PM</span>
            </td>
            <td className="data-col dt-status">
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
