import React, { useRef, useState } from 'react'
import ImagewithLogo from '../components/ImagewithLogo'
import Logo from '../components/Logo'
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { required ,validEmail ,vpassword,vrepassword,confirmpassword} from '../utility/validate';
import CheckButton from "react-validation/build/button";
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import RegisterBg from '../images/NFT_Images2.jpg'

export default function Register() {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const [Term, SetTerm] = useState(false);
  const [Termcheck, SetTermcheck] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [Errors, setErrorMessage] = useState("");
  const [ButtonLabel, setButtonLabel] = useState("Create New Account");
  const [phone, setphone] = useState("");
  
  
  const navigate = useNavigate();  


  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage(false)
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0 && Term ) {

      setButtonLabel('Create New Account...');

      AuthService.register(username,email, password,phone).then(
        (response) => {
          
          
          
          if(response?.status ==200) 
          {

            
            if(response?.data?.data?.signUp?.errors?.code)
            {
              setErrorMessage(response?.data?.data?.signUp?.errors?.message);
              setSuccessful(false)  
              setButtonLabel('Create New Account');
              
            }else
            {
              setSuccessful(true)
              setMessage('Please check your email account to varify your email address.  ');
              setButtonLabel('Create New Account');
              
            }
          }else
          {
            setErrorMessage(response.message);
            setSuccessful(false)
            setButtonLabel('Create New Account');
          }
        },
        (error) => {
          
          console.log(error);
        }
      );
    }
    else
    {
      setErrorMessage('Please Fillup  Check Team and Condition & All Required Fields');
      if(!Term)
      {
        SetTermcheck(true)
      }
    }
  };

  const onChangeUsername = (e)=>{
    setUsername(e.target.value)
  }

  const onChangeEmail = (e)=>{
    setEmail(e.target.value)
  }


  const onChangePassword = (e)=>{
    setPassword(e.target.value)
  }
  const onChangeRePassword = (e)=>{
    setRePassword(e.target.value)
  }

  const onChangeTerm =( e) => {
    
    SetTerm(e.target.checked)
    SetTermcheck(false)
    
  }

  const onChangePhone = (e) =>{
    setphone(e.target.value);
  }
  
  
  

  return (
    <>
      <div className='accountWrap' style={{ backgroundImage: `url(${RegisterBg})` }}>
        <div className='h-full min-h-screen py-9 flex items-center justify-center'>
          <div className="container">
            
            <div className="grid grid-cols-12 items-end">
                <div className="col-span-full dd:col-span-7 hidden dd:block">
                  <ImagewithLogo />
                </div>
                <div className="flex justify-center flex-col self-stretch col-span-full dd:col-span-5 bg-gray-50 rounded drop-shadow-md p-4 md:p-6">

                  <div className='form-row max-w-sm w-full mx-auto dd:ml-auto'>

                    <div className='text-center'>
                      <Logo />

                      <h1>Sign up</h1>
                      <p>Create New Celebfie Account</p>
                    </div>

                    { Errors ? <ErrorMessage error = {Errors} /> : "" }
                    { message ? <SuccessMessage message = {message} /> : "" }
                    

                    <Form  className='mt-5' onSubmit={handleRegister} ref={form} autoComplete="off">
                        <div>
                          <div className="form-group">
                            <label htmlFor="username" className="hidden">name</label>
                            <Input
                              type="text"
                              placeholder="Your Name"
                              className="form-control"
                              name="username"
                              value={username}
                              onChange={onChangeUsername}
                              autoComplete="off"
                              validations={[required]}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email" className="hidden">Email</label>
                            <Input
                              type="text"
                              placeholder="Your Email"
                              className="form-control"
                              name="email"
                              value={email}
                              onChange={onChangeEmail}
                              autoComplete="off"
                              validations={[required,validEmail]}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="phone" className="hidden">Phone</label>
                            <Input
                              type="text"
                              placeholder="Your Phone"
                              className="form-control"
                              name="text"
                              value={phone}
                              onChange={onChangePhone}
                              autoComplete="off"
                              validations={[required]}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="password" className="hidden">Password</label>
                            <Input
                              type="password"
                              placeholder="Password"
                              className="form-control"
                              name="password"
                              value={password}
                              onChange={onChangePassword}
                              autoComplete="off"
                              validations={[required, vpassword]}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="resetpassword" className="hidden">Confirm Password</label>
                            <Input
                              type="password"
                              placeholder="Confirm Password"
                              className="form-control"
                              name="repassword"
                              
                              value={RePassword}
                              onChange={onChangeRePassword}
                              autoComplete="off"
                              validations={[required, vrepassword,confirmpassword]}
                            />
                          </div>

          
                          <div className="form-group">
                            <div className="flex items-center">
                              <input 
                              className="input-checkbox input-checkbox-md" 
                              id="term-condition" 
                              name="termAccept"
                              value={Term}
                              onChange={ e => onChangeTerm(e)}
                              type="checkbox" 
                              /> 
                              <label htmlFor="term-condition" className='tracking-normal'>I agree to Celebfie <a href="#">Privacy Policy </a> & <a href="#">Terms.</a></label>
                            </div>
                            {Termcheck ? <div className="invalid-feedback d-block">This field is required!</div> : "" }
                          </div>


                          {Term}
              
                          <div className="form-group mt-5">
                            <button className="btn">{ButtonLabel}</button> <div className='loader hidden'></div>
                          </div>

                          
                          <div className="form-group">
                            <div className='mt-5'>
                              <p>Already have an account ? <a href="/login">Sign in instead</a></p>
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
      
       </div>
    </>
  )
}
