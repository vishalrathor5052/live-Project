import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import DataTable from 'react-data-table-component';
import AdminServices from '../services/admin.services';
import HTMLReactParser from 'html-react-parser';
import parse from 'html-react-parser';




export default function UserList() {

    const[Users,setUsers] = useState([]);
    let status = '';

    const columns = [
      {
        id: 1,
        name: "NAME",
        selector: (row) => parse(`<a href="/userdetails" className="userlist-a"> ${row.users.fullName} </a>`),
        sortable: true,
        reorder: true
      },
      {
        id: 2,
        name: "EMAIL",
        selector: (row) => row.users.email,
        sortable: true,
        reorder: true,
        width: '270px',
      },
      {
          id: 3,
          name: "CONTACT NUMBER",
          selector: (row) => row.users.contactNumber,
          sortable: true,
          reorder: true
        },
      
     
      {
          id: 4,
          name: "VERIFIED STATUS",
          selector: (row) =>
           
          parse(`<ul className="data-vr-list">
                                    <li><div className="data-state data-state-${row.users.identityStatus}" /></div>Email</li>
                                    <li><div className="data-state data-state-${row?.verificationStatus[0]?.status}" /></div>KYC</li>
                                    </ul>`),
          sortable: true,
          reorder: true,
          width: '180px',
        },
        {
          id: 5,
          name: "Investment",
          selector: (row) => row.users.investmentInterest,
          sortable: true,
          reorder: true
        },
        {
          id: 6,
          name: "Two Factor",
          selector: (row) => 
          parse(`<ul className="data-vr-list">
                                    <li><div className="data-state data-state-${row.users.twoFactorVarification}" /></div></li>
                                    </ul>`),
                                 
          sortable: true,
          reorder: true
        },
    ];
  

    useEffect(()=>{

        AdminServices.getusers().then((response)=>{
            
            setUsers(response?.data?.data?.getAllUser?.users);

        })
    },[]);

  return (
    <>

        <Header />
        

        <div className='main'>
            <div className="py-8 w-full">
                <div className='container'>
                    <div className="bg-white p-5">
                        <div className="table-wrap">
                          
                          <DataTable title="Users" columns={columns} data={Users} defaultSortFieldId={1} pagination responsive />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </>
  )
}
