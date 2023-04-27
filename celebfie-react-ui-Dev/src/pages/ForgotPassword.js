import React, { useRef, useState } from 'react'
import ImagewithLogo from '../components/ImagewithLogo'
import Logo from '../components/Logo'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { required ,validEmail ,vpassword,vrepassword} from '../utility/validate';
import CheckButton from "react-validation/build/button";
import AuthService from '../services/auth.service';

// import RegisterBg from '../images/login-register-bg.jpeg'
import RegisterBg from '../images/NFT_Images2.jpg'
import LogoLeft from '../components/LogoLeft';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';

export default function ForgotPassword() {

    const form = useRef();
    const checkBtn = useRef();
  
    const [username, setUsername] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [Errors, setErrorMessage] = useState("");


    const onChangeUsername = (e)=>{
        setUsername(e.target.value)
      }

      const handleforgetPassword     = (e) => {
        e.preventDefault();
    
        setMessage("");
        setSuccessful(false);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
                /* send request here */
                AuthService.ForgetPassword(username).then((response)=>{
                    if(response?.status ==200) 
                    {
          
                      
                      if(response?.data?.data?.sendEmailLink?.errors?.code)
                      {

                      }else
                      {
                        setMessage(response?.data?.data?.sendEmailLink?.data);
                        setSuccessful(true);
                      }
                    }     
                })
        }
      };

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

                    {/* {message ? <div className='border-2 border-solid border-green-400 p-2.5 mt-2 text-center text-green-400'>{message}</div> : '' }
                    {Errors ? <div className='border-2 border-solid border-red-400 p-2.5 mt-2 text-center text-red-400'>{Errors}</div> : '' } */}

                    

                    <LogoLeft />

                    { Errors ? <ErrorMessage error = {Errors} /> : "" }
                    { message ? <SuccessMessage message = {message} /> : "" }

                    <h1>Forget password</h1>
                    <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>

                    <Form className='mt-5' onSubmit={handleforgetPassword} ref={form}>
                        <div>
                            <div className="form-group">
                            <label htmlFor="email" className="hidden">Your Email</label>
                            <Input
                                type="text"
                                placeholder="Your Email"
                                className="form-control"
                                name="email"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required,validEmail]}
                            />
                            </div>
                            
                            <div className="form-group">
                                <div className='flex items-center justify-between'>
                                    <button className="btn btn-small">Send Reset Link</button>
                                    <div><a href="/login" className='tracking-normal font-medium'>Return to login</a></div>
                                </div>
                            </div>

                        </div>
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                  </div>
                 
              </div>

            </div>

          </div>

        </div>
      
    </>
  )
}
