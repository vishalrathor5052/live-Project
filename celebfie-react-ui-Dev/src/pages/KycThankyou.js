import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import CheckArrow from '../images/icons/check-arrow.png'
import KycVarifications from '../services/Kyc.varification';
import { UserContext } from '../utility/context';

export default function KycThankyou() {

    
    const {currentUserData} = useContext(UserContext);
    
    const[varifictionstatus,setvarificationset] = useState(false);
    const[error,seterorr] = useState('checking...');
    
    useEffect(()=>{

        KycVarifications.varifyReaquast().then((response)=>{
            if(!response?.errror || response?.errror!="Some thing Wrong Please Try Again")
            {
                
                setvarificationset(true);
               
            }else
            {
                seterorr(response?.errror);
            }
            
        })
    })

  return (
    <>
        <Header />

        <div className='main'>
            <div className="text-center py-8">
                <div className='max-w-[830px] px-4 mx-auto'>
                    <h1>Begin your ID-Verification</h1>
                    <p>Verify your identity to participate in tokensale.</p>

                    <div className='my-5 md:my-12'>
                        <div className="bg-white p-5 md:p-12 text-center mb-5">

                        {varifictionstatus ?
                            <>
                            <div className='max-w-xl mx-auto'>

                                <div className='w-[70px] h-[70px] flex items-center justify-center p-2 rounded-full border-2 border-solid border-yellow-400 mx-auto'>
                                    <img src={CheckArrow} />
                                </div>
                                <h3 className='mt-6 font-normal text-yellow-400'>You have completed the process of KYC</h3>
                                <p className='text-base mt-3 mb-5'>We are still waiting for your identity verification. Once our team verified your indentity, you will be notified by email. You can also check your KYC compliance status from your profile page.</p>
                            </div>
                            <button className='btn md:min-w-[350px] w-auto px-2'>Back to ProfileC</button>
                            </>
                        : 
                            <>


                                <div className="loader relative"></div>{error}
                            </>
                        
                        
                         }        
                            
                        </div>
                        <p>If you have any question, please contact our support team <a href="mailto:info@Celebfie.com">info@Celebfie.com</a></p>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
      
    </>
  )
}
