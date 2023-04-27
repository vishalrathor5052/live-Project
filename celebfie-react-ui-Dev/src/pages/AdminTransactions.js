import React from 'react'
import AdminTransactionTableHead from '../components/AdminTransactionTableHead'
import AdmintransactionTableRow from '../components/AdmintransactionTableRow'
import Footer from '../components/Footer'
import Header from '../components/Header'
import TablePagination from '../components/TablePagination'

export default function AdminTransactions() {
  return (
    <>

        <Header />

        <div className='main'>
            <div className="py-8 w-full">
                <div className='container'>
                    <div className="bg-white p-5">

                        <h3>Admin Transactions</h3>

                        <div className="table-wrap">
                            <table className="data-table table-space-0 border-separate w-full text-sm text-black text-left">
                                
                                <AdminTransactionTableHead />

                                <tbody>
                                    <AdmintransactionTableRow />
                                    <AdmintransactionTableRow />
                                    <AdmintransactionTableRow />
                                    <AdmintransactionTableRow />
                                    <AdmintransactionTableRow />
                                </tbody>
                            </table>

                            <TablePagination />

                        </div>

                    </div>
                </div>
            </div>
        </div>

        <Footer />
      
    </>
  )
}
