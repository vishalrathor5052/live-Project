import React, { useContext, useEffect, useRef, useState } from 'react'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import { required ,validEmail ,vpassword,vrepassword} from '../utility/validate';
import CheckButton from "react-validation/build/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear,months } from '../utility/date';
import { range } from '../utility/global';
import AuthService from '../services/auth.service';
import { UserContext } from '../utility/context';
import CreatableSelect from 'react-select/creatable';
import { isNumericCheck } from '../utility/global';




export default function PersonalData() {
  const form = useRef();
  const checkBtn = useRef();
  const {currentUserData,setCurrentUserData} = useContext(UserContext);
  

  const {dateOfBirth,email,fullName,contactNumber,nationality,investmentInterest} = currentUserData;
  
  const[defaultYear,SetdefaultYear] = useState(1970);
  const[Fname,SetFname] = useState(fullName);
  const[Email,SetEmail] = useState(email);
  const[Phonenumber,SetPhoneNumber] = useState(contactNumber);
  const[invest,Setinvest] = useState(investmentInterest);
  
    

  const[DOB,SetDOB] = useState(dateOfBirth ? new Date(dateOfBirth) : "");
  const[national,Setnationality] = useState(nationality);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [countiresList, setcountriesList] = useState('');

  const[DobErro,setDOBError] = useState('');

  /* datepicker settting  */
  const years = range(1945, getYear(new Date()) - 18, 1);
  
  const getcountrydataformDB =()=>{
    
      if(countiresList=='')
      {
        
        AuthService.getCountries().then((response) => {setcountriesList(response);},(error) => {console.log(error)});
      }
   } 

  const SetDOBDate = (date) =>
  {
    
    SetDOB(date)
    var Xmas = new Date(date);
    SetdefaultYear(getYear(Xmas))
    setDOBError(false);
    
  }

  useEffect(() => {
    getcountrydataformDB();
  }, []);

  
  const interestedInvestChagne  = (newValue, actionMeta) =>{
    
    Setinvest(newValue.value)
    return newValue;
  }
  
  const InvestOptions = [
    { value: 5000, label: '$5000' },
    { value: 10000, label: '$10000' },
    { value: 15000, label: '$15000' },
  ];

  const onMenuOpen =()=>
  {
    Setinvest(0)
  }
  const isValidNewOption =(a,v)=>
  {
    if(isNumericCheck(a))
    {
      return v;
    }else
    {
      
    return { value: 5000, label: '$5000' }
    }
    
  }

  const formatCreateLabel =(a)=>{
    return "Type Other Amount..."
  }

  const handleProfilesave = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    

    if(DOB == null)
    {
      setDOBError(1)
    }
    
 
  

    if (checkBtn.current.context._errors.length === 0 && DOB != null) {
      /* send request here */
        
        AuthService.updateUserProfile({...currentUserData,dateOfBirth:DOB,
                  contactNumber:Phonenumber,
                  email:Email,
                  fullName:Fname,
                  nationality:national,
                  investmentInterest:parseInt(invest)
                });
                setSuccessful(true);
                setCurrentUserData({...currentUserData,dateOfBirth:DOB,
                  contactNumber:Phonenumber,
                  email:Email,
                  fullName:Fname,
                  nationality:national,
                  investmentInterest:parseInt(invest)
                });

                
    }
  };
  


  return (
    <> 
    
     <Form  className='mt-5' onSubmit={handleProfilesave} ref={form}>
      <div  className='grid grid-col-1 md:grid-cols-2 gap-4'>
        <div className="form-group">
            <label htmlFor="fname">Full Name (as per your id proof)*</label>
            <Input
              type="text"
              className="form-control"
              name="fname"
              value={Fname}
              onChange={ e => { SetFname(e.target.value)}}
              validations={[required]}
            />
            
        </div>
      <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <Input
            type="text"
            className="form-control"
            name="email"
            value={Email}
            onChange={ e => { SetEmail(e.target.value) }}
            validations={[required,validEmail]}
          />
      </div>
      <div className="form-group">
          <label htmlFor="phonenumber">Mobile Number *</label>
          <Input
            type="text"
            className="form-control"
            name="phonenumber"
            value={Phonenumber}
            onChange={ e => { SetPhoneNumber(e.target.value) }}
            validations={[required]}
          />
      </div>
      <div className="form-group">
          <label htmlFor="dob">Date of Birth *</label>
          <DatePicker 

          renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div >
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}> {"<"} </button>
                    <select defaultValue={defaultYear} onChange={ (e) => {changeYear(e.target.value)}}> {years.map((option) => (<option key={option} value={option}>{option}</option>))}</select>
                    <select onChange={ (e) => {changeMonth(e.target.value)}}>{months.map((option,index) => ( <option key={option} value={index}>{option}</option> ))}</select>
                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}> {">"} </button>
                  </div>
                )}
                selected={DOB}  dateFormat="MM/dd/yyyy" placeholderText="MM/DD/YYYY" onChange={(date) => SetDOBDate(date)} validations={[required]} />
           {DobErro ? 
           <div className="invalid-feedback d-block">This field is required!</div>
           : "" }
      </div>
      <div className="form-group">
          <label htmlFor="nationality">Nationality *</label>
          
          
          <Select name="nationality"  value={national}  onChange={ e =>{Setnationality(e.target.value)} } validations={[required]}>
          <option value="" >Choose a Nationality ...</option>

                   {countiresList &&  countiresList.map((country,key) => {

                      return <option key={key} value={country.countryIso} >{country.countryName}</option>

                    })
                   
                   }
          
          </Select>
      </div>

      <div className="form-group">
          <label htmlFor="invest">Interested to Invest (USD)*</label>
          <CreatableSelect
            defaultValue={{'value':invest,'label':`$${invest}`}}
            onChange={interestedInvestChagne}
            //onInputChange={interestedInvestChagne}
            placeholder="select / type value"
            options={InvestOptions}
            //onMenuOpen={onMenuOpen}
            isValidNewOption={isValidNewOption}
            formatCreateLabel={formatCreateLabel}
      />


          
      </div>

    </div>

    <div className="sm:flex items-center justify-between mt-6">
      <button className="btn btn-small">Update Profile</button>
      <div className='h-3' />
      {successful ? 
      <span className="text-green-400 font-medium">
        <em className="ti ti-check-box"></em> All changes are saved</span>
        : "" }
    </div>
      
    <CheckButton style={{ display: "none" }} ref={checkBtn} />
  </Form>
  </>
  )
}
