import React from 'react'
import { DocUpload } from '../../utility/Strings';

export default function AdharForm(Props) {
    const {handel,errors} = Props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
    <div className="form-group col-span-2 md:col-span-1">
      <label>{DocUpload.DocUploadAdharlabelName}</label>
      <div>
        <input type="text" name="adharname" onChange={(e) => {Props.handel(e); }}  />
      </div>
      
      { errors?.adharname && (<p className="help is-danger">{errors.adharname}</p>)}
    </div>
    <div className="form-group col-span-2 md:col-span-1">
      <label>{DocUpload.DocUploadAdharlabelNumber}</label>
      <div>
        <input type="text" name="adharnumber" onChange={(e) => {Props.handel(e); }}  />
      </div>
      { errors?.adharnumber && (<p className="help is-danger">{errors.adharnumber}</p>)}
    </div>

    <div className="form-group col-span-2 kyc-checkbox-wrap">
      <div className="flex items-center">
        <input
          className="input-checkbox input-checkbox-md"
          id="term-condition2"
          name="adhartermAccept"
          
          type="checkbox"
          
          onChange={(e) => {handel(e); }}
        />
        <label
          htmlFor="term-condition2"
          className="tracking-normal"
        >
          I have read the{" "}
          <a href="#">Terms of Condition</a> and{" "}
          <a href="#">Privary Policy.</a>
        </label>
        
      </div>
      {errors?.adhartermAccept && (<p className="help is-danger">{errors.adhartermAccept}</p> )}
    </div>
    <div className="form-group col-span-2 kyc-checkbox-wrap">
      <div className="flex items-center">
        <input
          className="input-checkbox input-checkbox-md"
          id="correct-info2"
          name="adharcheckAccept"
          type="checkbox"
          onChange={(e) => {handel(e); }}
          
        />
        <label
          htmlFor="correct-info2"
          className="tracking-normal"
        >
          {DocUpload.DocUploadCorrectInfo}
        </label>
        
      </div>
      {errors?.adharcheckAccept && (<p className="help is-danger">{errors.adharcheckAccept}</p> )}
    </div>

    {/* <div className="flex relative">
      <em className="fas fa-info-circle text-[12px] text-red-400 absolute top-1"></em>
      <p className="pl-5 text-red-400 leading-tight text-sm">
        Please add proper Adhar Number.
      </p>
    </div> */}

    <div className="form-group col-span-2">
      <button name = "adharverification" className="btn btn-small">
        {DocUpload.DocUploadAdharButton}
      </button>
    </div>
  </div>
  )
}
