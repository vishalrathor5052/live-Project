import React from 'react'

export default function AdminTransactionTableHead() {
  return (
    <>
        <thead>
            <tr className="data-item data-head" role="row">
                <th className="data-col dt-user">Tranx NO</th>
                <th className="data-col dt-token">Tokens</th>
                <th className="data-col dt-amount">Amount</th>
                <th className="data-col dt-usd-amount">USD Amount</th>
                <th className="data-col dt-account">From</th>
                <th className="data-col dt-type">
                    <div className="dt-type-text">Type</div>
                </th>
                <th className="data-col" />
            </tr>
        </thead>
      
    </>
  )
}
