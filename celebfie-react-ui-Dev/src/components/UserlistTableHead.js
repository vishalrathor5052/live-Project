import React from 'react'

export default function UserlistTableHead() {
  return (
    <>
        <thead>
            <tr className="data-item data-head">
                <th className="data-col dt-user">User</th>
                <th className="data-col dt-email">Email</th>
                <th className="data-col dt-token">Tokens</th>
                <th className="data-col dt-verify">Verified Status</th>
                <th className="data-col dt-login">Last Login</th>
                <th className="data-col dt-status"><div className="hidden">Status</div></th>
                <th className="data-col" />
            </tr>
        </thead>
    </>
  )
}
