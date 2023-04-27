import React, { useRef, useState } from 'react'
import ImagewithLogo from '../components/ImagewithLogo'
import Logo from '../components/Logo'
import { SearchQueryString } from '../utility/global';
import Form from 'react-validation/build/form';
import Input from  'react-validation/build/input';
import CheckButton from "react-validation/build/button";
import { confirmpassword, required ,vpassword} from '../utility/validate'
import AuthService from '../services/auth.service';
import { Router } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

import RegisterBg from '../images/NFT_Images2.jpg'
import LogoLeft from '../components/LogoLeft';

export default function ResetPassword() {
    const form = useRef();
    const checkBtn = useRef();
  
    const [message, setMessage] = useState("");
    const [Errors, setErrorMessage] = useState("");
    const [ResetPassword, setResetPassword] = useState("");
    const [ResetRePassword, setReResetPassword] = useState("");
    let query = SearchQueryString();
    const [VerifyEmail, setVerifyEmail] = useState(query.get("email"));
    const [VerifyCode, SetVerifyCode] = useState(query.get("code"));
    const[after,setafter] =useState(false);
   /* user varificatin email check */
    const onChangeResetPassword =(e) => { 
        
        setResetPassword(e.target.value);
     }

     const onChangeverifyPassword =(e) => { 
        
        setReResetPassword(e.target.value);
     }
  

      
    const HandelRestPassword = (e) => { e.preventDefault();form.current.validateAll();
        
        if (checkBtn.current.context._errors.length === 0) {
            /* send request here */
            AuthService.ResetPassword(ResetPassword, ResetRePassword,VerifyEmail,VerifyCode).then((res)=>{

                const{data,status} = res;
                if(status ==200) 
                  {


                  if(res?.data?.data?.resetPassword?.errors !=null && "code" in res?.data?.data?.resetPassword?.errors)
                  {
                    setErrorMessage(res?.data?.data?.resetPassword?.errors?.message);
                    
                  }else
                  {

                    setMessage(res?.data?.data?.resetPassword?.data);
                    setafter(true);
                    
                  }  


                  }else
                  {
                    setErrorMessage('something Wrong!') 
                  }    
            })


        }    
    
    
    
    }  



  /* redirect login page if query sting not set  */
  
  
  if(VerifyEmail=='null' || VerifyCode=='null')
  {
 
  }

  return (
      
    <>
       <div className='accountWrap' style={{ backgroundImage: `url(${RegisterBg})` }}>

            <div className="h-full min-h-screen py-9 flex items-center justify-center">
                <div className="container">

                    <div className="grid grid-cols-12 items-end">

                        <div className="col-span-full dd:col-span-7 hidden dd:block">
                            <ImagewithLogo />
                        </div>
                        <div className="flex justify-center flex-col self-stretch col-span-full dd:col-span-5 bg-gray-50 rounded drop-shadow-md p-4 md:p-6">
                                                        

                            {/* { Errors ? <ErrorMessage error = {Errors} /> : "" }
                            {message? <div className='text-2xl text-green-400'><em className='ti ti-check bg-green-400 text-white flex items-center justify-center w-12 h-12 rounded mb-5'></em> {message} </div> : ''} */}

                            { Errors ? <ErrorMessage error = {Errors} /> : "" }
                            { message ? <SuccessMessage message = {message} /> : "" }
                            {/* { message ? <SuccessMessage message = {message} /> : "" } */}

                            {after ? 
                                <>
                                    <p className='mt-4 mb-3'>Your Password has been changed successfully! <br />Now Login with your new password.</p>

                                    <a href="/login" className='btn btn-small !leading-[46px] !text-white mt-3'>Log in here</a>

                                </>
                            :
                            <>

                        <LogoLeft />
                        

                        <h1>Reset Password</h1>
                        <p>The password shold have 6 characters</p>

                        <Form  className='mt-5' onSubmit={HandelRestPassword} ref={form}>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="new-pwd" className="hidden">New Password</label>
                                    
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        className="form-control"
                                        name="password"
                                        value={ResetPassword}
                                        onChange={onChangeResetPassword}
                                        validations={[required,vpassword]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="conf-pwd" className="hidden">Confirm Password</label>
                                    
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        className="form-control"
                                        name="repassword"
                                        value={ResetRePassword}
                                        onChange={onChangeverifyPassword}
                                        validations={[required,vpassword,confirmpassword]}
                                    />
                                </div>
                                
                            </div>
                            <div className="form-group">
                                <button className="btn btn-small">Rest Password</button>
                            </div>
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                        </>
                        }
                        </div>

                    </div>

                </div>
            </div>

        </div>

    </>
  )
}
