import React, { useEffect, useRef, useState } from 'react'
import ImagewithLogo from '../components/ImagewithLogo'
import { useNavigate  } from 'react-router-dom';
import AuthService from '../services/auth.service';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { required ,validEmail } from '../utility/validate';
import CheckButton from "react-validation/build/button";
import { SearchQueryString } from '../utility/global';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import RegisterBg from '../images/NFT_Images2.jpg'
import LogoLeft from '../components/LogoLeft';
import { StoreCookie } from '../utility/sessionStore';


export default function Login() {

  const form = useRef();
  const checkBtn = useRef();

  const [LoginEmail, setLoginEmail] = useState("");
  const [Password, SetLoginPassword] = useState("");
  const [Term, SetLoginTerm] = useState("");
  
  const [message, setMessage] = useState("");
  const [Errors, setErrorMessage] = useState("");
  const [varification, setVarification] = useState(false);

  const navigate = useNavigate();

  /* user varificatin email check */
  let query = SearchQueryString();
  const [VerifyEmail, setVerifyEmail] = useState(query.get("email"));
  const [VerifyCode, SetVerifyCode] = useState(query.get("code"));


  const varifyEmail = () =>
  {
    AuthService.varifyUser(VerifyEmail,VerifyCode).then((res)=>{
      if(res?.status ===200) 
      {
        (res?.data?.data?.verifyUser?.errors !=null && "code" in res?.data?.data?.verifyUser?.errors) ? setErrorMessage(res?.data?.data?.verifyUser?.errors?.message) : 
            setMessage(res?.data?.data?.verifyUser?.data)
            
            setVarification(true)
      }  
    })
  }  



  useEffect(() => {
  
    if(VerifyEmail&&VerifyCode && !varification )
    {
      
      varifyEmail();
    }

    
    
  })


  /**/
  
  
  




  const HandelLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("")
    

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      /* send request here */
      AuthService.login(LoginEmail, Password).then(
        (response) => {
          const{data,status} = response;
          
        if(status ===200 && data) 
          {
            if(data?.data?.login?.errors !=null && "code" in data?.data?.login?.errors)
            {
              setErrorMessage(data?.data?.login?.errors?.message);
            }
            else
            {
              
              /* after Login get User data */
               AuthService.getusersbyEmail(LoginEmail).then(function (res) {
                //AuthService.getusersbyEmail('johndoe@gmail.com').then(function (res) {
                const{status} = res;
                
                if(status ===200 && data ) 
                {
                  if(res?.data?.data?.getUser?.errors !=null && "code" in res?.data?.data?.login?.errors)
                    {
                      setErrorMessage(res?.data?.data?.login?.errors?.message);
                      
                    }else
                    {

                      setMessage(data?.data?.login?.data);

                      StoreCookie.setItem("userToken", JSON.stringify(data?.data?.login));
                      StoreCookie.setItem("userEmail", LoginEmail);
                      StoreCookie.setItem("userData", JSON.stringify(res?.data?.data?.getUser?.users?.users));
                      StoreCookie.setItem("user", JSON.stringify(res?.data?.data?.getUser?.users));

                      navigate("/profile");
                      window.location.reload();
                    }  
                } 
              });
            }
            

            

          
          }else
          {
            setErrorMessage(response.message)
          }
          
         
        },
        (error) => {
          setErrorMessage(error);
        }
      );
    }
  };

  const onChangeLoginEmail =( e) => {
    setLoginEmail(e.target.value)
  }

  const onChangeLoginPassword =( e) => {
    SetLoginPassword(e.target.value)
  }

  const onChangeLoginTerm =( e) => {
    
    SetLoginTerm(e.target.value)
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

                  <LogoLeft />

                  <h1>Sign in</h1>
                  <p>With your Celebfie Account</p>

                  { Errors ? <ErrorMessage error = {Errors} /> : "" }
                  { message ? <SuccessMessage message = {message} /> : "" }
                  

                  <Form  className='mt-5' onSubmit={HandelLogin} ref={form}>
                      <div>
                        <div className="form-group">
                          <label htmlFor="email" className="hidden">Your Email</label>
                          <Input
                            type="text"
                            placeholder="Your Email"
                            className="form-control"
                            name="email"
                            value={LoginEmail}
                          onChange={onChangeLoginEmail}
                          validations={[required,validEmail]}
                          />
                        

                        </div>
                        <div className="form-group">
                          <label htmlFor="password" className="hidden">Password</label>
                          <Input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            name="password"
                            value={Password}
                            onChange={onChangeLoginPassword}
                            validations={[required]}
                          />
                        </div>
                        <div className="form-group">
                          <div className='flex items-center justify-between w-full'>
                            <div className="flex items-center">                                        
                            
                              <input
                              className="input-checkbox input-checkbox-md" 
                              id="term-condition" 
                              type="checkbox"
                              value={Term ? Term : 1 }
                              onChange={onChangeLoginTerm}
                              /> 

                              <label htmlFor="term-condition" className='tracking-normal'>Remeber Me</label>
                            </div>
                            <div><a href="/forgotpassword" className='tracking-normal'>Forgot password?</a></div>
                          </div>
                        </div>

                        <div className="form-group mt-5">
                          <button className="btn">Sign In</button> <div className='loader hidden'></div>
                        </div>

                        <div className="form-group">
                          <div className='mt-7'>
                            <p>Don’t have an account? <a href="/register">Sign up here</a></p>
                          

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
