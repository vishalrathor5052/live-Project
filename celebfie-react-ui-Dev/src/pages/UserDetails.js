import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PersonalInfo from '../components/PersonalInfo';
import TransactionDetails from '../components/TransactionDetails';
import UserDetailsTop from '../components/UserDetailsTop';
import WalletDetails from '../components/WalletDetails';


export default function UserDetails() {


    function toggleClass() {
        document.querySelector('.toggle-class').classList.toggle('active');
    }

  return (
    <>
        <Header />
        

        <div className='main'>
            <div className="py-8 w-full">
                <div className='container'>
                    <div className="bg-white p-7">

                        <div className="flex justify-between items-center userlist-title">
                            <h3 className='mb-0'>User Details</h3>
                            <a href='/users' className='btn btn-small'><em className='ti ti-arrow-left'></em>Back</a>
                        </div>

                        <UserDetailsTop />

                        <PersonalInfo />

                        <WalletDetails />

                        <TransactionDetails />

                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </>
  )
}
