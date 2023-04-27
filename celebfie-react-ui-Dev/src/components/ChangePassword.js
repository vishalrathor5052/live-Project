import React, { useContext, useRef, useState } from 'react'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import AuthService from '../services/auth.service';
import CheckButton from "react-validation/build/button";
import { required ,vpassword,vrepassword,confirmpassword} from '../utility/validate';
import { UserContext } from '../utility/context';


export default function ChangePassword() {
    const form = useRef();
  const checkBtn = useRef();
  const[OldPassword,setOldPassword] = useState('');
  const[NewPassword,setNewPassword] = useState('');
  const[ConfirmPassword,setConfimrPassword] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [Error, setError] = useState("");
  
  const {currentUserData} = useContext(UserContext);
  const {email} = currentUserData;

  
  const handlePasswordsave = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      /* send request here */
        
      AuthService.UpdatePassword(email,OldPassword,ConfirmPassword).then(function(response){
        
           (response?.data?.data?.passwordUpdate?.errors !=null && "code" in response?.data?.data?.passwordUpdate?.errors) ? setError(response?.data?.data?.passwordUpdate?.errors?.message) : 
                setMessage(response?.data?.data?.passwordUpdate?.data)
                    setSuccessful(true)
                       ;
      });
      
       
          
                
    }
    
  };
  

  return (
    <>


       <Form  className='mt-5' onSubmit={handlePasswordsave} ref={form}>
        <div  className='grid grid-col-1 md:grid-cols-2 gap-4'>
            <div className="form-group">
                <label htmlFor="old-pwd">Old Password</label>
                
                <Input
                    type="password"
                    className="form-control"
                    name="old-pwd"
                    value={OldPassword}
                    validations={[required]}
                    onChange ={ (e)=>setOldPassword(e.target.value)}
                />
            </div>
            <div className="form-group"></div>
            <div className="form-group">
                <label htmlFor="new-pwd">New Password</label>
                <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={NewPassword}
                    validations={[required,vpassword]}
                    onChange={(e)=>setNewPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="confim-new-pwd">Confirm New Password</label>
                <Input
                    type="password"
                    className="form-control"
                    name="confim-new-pwd"
                    value={ConfirmPassword}
                    validations={[required,vrepassword,confirmpassword]}
                    onChange={(e)=>setConfimrPassword(e.target.value)}
                />
            </div>
            
            
        </div>

        

        <div className='mt-4'>
        
                <p className='text-green-400'><i className="fas fa-info-circle mr-2"></i>Password should be minmum 8 letter and include lower and uppercase letter.</p>
                
            </div>

        <div className="sm:flex  items-center justify-between mt-6">
            <button className="btn btn-small">Update</button>
            <div className='h-3' />
            {successful ? <span className="text-green-400 font-medium"><em className="ti ti-check-box"></em> {message}</span> : "" }
            { Error ? <p className='text-red-400'>{Error}</p> :''}
            
        </div>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </>
  )
}
