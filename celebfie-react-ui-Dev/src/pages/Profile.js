import React, { useContext, useEffect, useState } from 'react'
import Container from '../components/Container'
import Header from '../components/Header'

import 'react-tabs/style/react-tabs.css';
import Footer from '../components/Footer';
import ProfileEdit from '../components/ProfileEdit';
import TwoFactor from '../components/TwoFactor';
import AccountStatus from '../components/AccountStatus';
import Earnrefrral from '../components/Earnrefrral';
import KycvarificationBlock from '../components/KycvarificationBlock';
import { UserContext } from '../utility/context';
import KycVarifications from '../services/Kyc.varification';
import { varificationstatus } from '../utility/Strings';
import ReceiveWallet from '../components/ReceiveWallet';


export default function Profile() {

  const {currentUserData} = useContext(UserContext);

  const[varifictionstatus,setvarificationset] = useState(false);

  useEffect(()=>{
 
   KycVarifications.getKycDetails(currentUserData.userId).then((response)=>{
             
     if(response?.status==200 && response?.data?.users?.status ==varificationstatus.success)
     { 
       setvarificationset(true);
     } 
   })
  })


  return (
    <>
        <div className=''>
            <Header />

            <div className='main'>
              <div className='py-5 md:pt-14 md:pb-8'>

                <Container>
                    <div className="grid grid-cols-5 gap-4">
                        <div className='col-span-12 dd:col-span-3'>
                          <ProfileEdit/>
                          <TwoFactor />                      
                        </div>
                        <div className='col-span-12 dd:col-span-2'>
                          <AccountStatus />
                          <ReceiveWallet />
                          <Earnrefrral />
                         {!varifictionstatus ? <KycvarificationBlock /> :""}
                        </div>
                    </div>
                </Container>
              </div>
            </div>

            <Footer />
        </div>
    </>
  )
}
