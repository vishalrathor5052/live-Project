import React, { useState } from 'react'
import { DateSeleter } from '../../utility/date';

import { getYear } from "../../utility/date";
import { range } from "../../utility/global";
import { DocUpload } from '../../utility/Strings';
const expyears = range(1945, getYear(new Date()) + 25, 1);



export default function PassportForm(Props) {
  const {handel,errors,field} = Props;
  const [issuedate,SetissueDate] = useState(new Date())
  const [expairyDate, setexpairyDate] = useState(new Date());

  const issueDateUpate = (date)=>{
    handel({target:{checked:false,name:'passportissuedate',value:date,type:"date"}})
    SetissueDate(date)
  }

  const expairyDateUpate = (date)=>{
    handel({target:{checked:false,name:'passportexpirydate',value:date,type:"date"}})
    setexpairyDate(date);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
    <div className="form-group col-span-2 md:col-span-1">
      <label>{DocUpload.DocUploadPassportLabelName}</label>
      <div>
        <input type="text" name="passportName" value={field.PassportDetail.passportName}  onChange={(e) => {Props.handel(e); }} />
      </div>
      {errors?.passportName && (<p className="help is-danger">{errors.passportName}</p> )}
    </div>
    <div className="form-group col-span-2 md:col-span-1">
      <label>{DocUpload.DocUploadPassportLabelNumber}</label>
      <div>
        <input type="text" name="passportnumber" value={field.PassportDetail.passportnumber}  onChange={(e) => {Props.handel(e); }} />
      </div>
      {errors?.passportnumber && (<p className="help is-danger">{errors.passportnumber}</p> )}
    </div>



    <div className="form-group col-span-2 md:col-span-1">
      <label>{DocUpload.DocUploadPassportLabelIssue}</label>
      <div>
      <DateSeleter onChange={issueDateUpate}  date={issuedate} />
        
      </div>
      {errors?.passportissuedate && (<p className="help is-danger">{errors.passportissuedate}</p> )}
    </div>
    <div className="form-group col-span-2 md:col-span-1">
      <label>{DocUpload.DocUploadPassportLabelExpiry}</label>
      <div>
      <DateSeleter Year={expyears}  onChange={expairyDateUpate}  date={expairyDate} />
        
      </div>
      {errors?.passportexpirydate && (<p className="help is-danger">{errors.passportexpirydate}</p> )}
    </div>

    <div className="form-group col-span-2 kyc-checkbox-wrap">
      <div className="flex items-center">
        <input
          className="input-checkbox input-checkbox-md"
          id="term-condition1"
          name="PassporttermAccept"
          type="checkbox"
          onChange={(e) => {handel(e); }}
        />
        <label
          htmlFor="term-condition1"
          className="tracking-normal"
        >
          I have read the{" "}
          <a href="#">Terms of Condition</a> and{" "}
          <a href="#">Privary Policy.</a>
        </label>
        
      </div>
      {errors?.PassporttermAccept && (<p className="help is-danger">{errors.PassporttermAccept}</p> )}
    </div>
    <div className="form-group col-span-2 kyc-checkbox-wrap">
      <div className="flex items-center">
        <input
          className="input-checkbox input-checkbox-md"
          id="correct-info1"
          name="PassportcheckAccept"
          onChange={(e) => {handel(e); }}
          type="checkbox"
        />
        <label
          htmlFor="correct-info1"
          className="tracking-normal"
        >
          {DocUpload.DocUploadCorrectInfo}
        </label>
        
      </div>
      {errors?.PassportcheckAccept && (<p className="help is-danger">{errors.PassportcheckAccept}</p> )}
    </div>

    

    {/* {errorstatus ? (
      <div className="mt-2 col-span-2">
        <span className="text-red-400 font-medium">
          <em className="ti ti-check-box"></em>{" "}
          {error}
        </span>
      </div>
    ) : (
      ""
    )} */}

    {/* <div className="flex relative">
      <em className="fas fa-info-circle text-[12px] text-red-400 absolute top-1"></em>
      <p className="pl-5 text-red-400 leading-tight text-sm">
        Please add proper Passport Number.
      </p>
    </div> */}

    <div className="form-group col-span-2">
      <button className="btn btn-small" name='PassportsubmitButton' >
        {DocUpload.DocUploadPassportButton}
      </button>
    </div>
  </div>
  )
}
