import React, { useState } from 'react'
import { DateSeleter } from "../../utility/date";
import { getYear } from "../../utility/date";
import { range } from "../../utility/global";
import { DocUpload } from '../../utility/Strings';
const expyears = range(1945, getYear(new Date()) + 25, 1);

export default function Drive(Props) {
  const {handel,errors} = Props;
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
                  <label>{DocUpload.DocUploadLicenceLabelName}</label>
                  <div>
                    <input type="text" name="licensename" onChange={handel} />
                  </div>
                  {errors?.licenseName && (<p className="help is-danger">{errors.licenseName}</p> )}
                </div>
                <div className="form-group col-span-2 md:col-span-1">
                  <label>{DocUpload.DocUploadLicenceLabelNumber}</label>
                  <div>
                    <input
                      type="text"
                      name="licensenumber"
                      onChange={handel}
                    />
                  </div>
                  {errors?.licensenumber && (<p className="help is-danger">{errors.licensenumber}</p> )}
                </div>
                <div className="form-group col-span-2 md:col-span-1">
                  <label>{DocUpload.DocUploadLicenceLabelIssue}</label>
                  <div>
                    <DateSeleter
                      date={issuedate}
                      onChange={issueDateUpate}
                    />
                  </div>
                  {errors?.licenseissuedate && (<p className="help is-danger">{errors.licenseissuedate}</p> )}
                </div>
                <div className="form-group col-span-2 md:col-span-1">
                  <label>{DocUpload.DocUploadLicenceLabelExpiry}</label>
                  <div>
                    <DateSeleter
                      date={expairyDate}
                      Year={expyears}
                      onChange={expairyDateUpate}
                    />
                  </div>
                  {errors?.licenseexpirydate && (<p className="help is-danger">{errors.licenseexpirydate}</p> )}
                </div>

                <div className="form-group col-span-2">
                  <div className="flex items-center kyc-checkbox-wrap">
                    <input
                      className="input-checkbox input-checkbox-md"
                      id="term-condition1"
                      name="licenseTermAccept"
                      type="checkbox"
                      onChange={handel}
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
                  {errors?.licenseTermAccept && (<p className="help is-danger">{errors.licenseTermAccept}</p> )}
                </div>
                <div className="form-group col-span-2 kyc-checkbox-wrap">
                  <div className="flex items-center">
                    <input
                      className="input-checkbox input-checkbox-md"
                      id="correct-info1"
                      name="licenseCheckAccept"
                      type="checkbox"
                      onChange={handel}
                    />
                    <label
                      htmlFor="correct-info1"
                      className="tracking-normal"
                    >
                      {DocUpload.DocUploadCorrectInfo}
                    </label>
                    
                  </div>
                  {errors?.licenseCheckAccept && (<p className="help is-danger">{errors.licenseCheckAccept}</p> )}
                </div>
                

                <div className="form-group col-span-2">
                  <button className="btn btn-small" name="license" >
                    {DocUpload.DocUploadLicenceButton}
                  </button>
                </div>

          </div>
  )
}
