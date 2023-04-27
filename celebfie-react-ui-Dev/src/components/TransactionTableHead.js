import React from 'react'

export default function TransactionTableHead() {
  return (
    <>
        <thead>
            <tr className="data-item data-head">
                <th className="data-col">TWZ Tokens</th>
                <th className="data-col">Amount</th>
                <th className="hidden sm:table-cell data-col tnx-date">Date</th>
                <th className="tnx-type data-co"></th>
            </tr>
        </thead>
      
    </>
  )
}
