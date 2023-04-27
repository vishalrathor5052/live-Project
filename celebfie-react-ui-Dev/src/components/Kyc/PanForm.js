import React from 'react'
import { DocUpload } from '../../utility/Strings';

export default function PanForm(Props) {
    const {handel,errors,field} = Props;

    

  return (
    <> <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-7">
    <div className="form-group col-span-2 md:col-span-1">
      <label>{DocUpload.DocUploadPanLabelFName}</label>
      <div>
        <input type="text" name="fname" onChange={(e) => {Props.handel(e); }} />
      </div>
      { errors?.panname && (<p className="help is-danger">{errors.panname}</p>)}
    </div>
    <div className="form-group col-span-2 md:col-span-1">
      <label>{DocUpload.DocUploadPanLabelNumber}</label>
      <div>
        <input type="text" value={field.PanDetail.number} name="number" onChange={(e) => {Props.handel(e); }} />
      </div>
      {errors?.pannumber && (<p className="help is-danger">{errors.pannumber}</p> )}
    </div>

    <div className="form-group mb-3 col-span-2 kyc-checkbox-wrap">
      <div className="flex items-center">
        <input
          className="input-checkbox input-checkbox-md"
          id="termCondition"
          name="pantermAccept"
          type="checkbox"
          
          onChange={(e) => {handel(e); }}
          
        />
        <label
          htmlFor="termCondition"
          className="tracking-normal"
        >
          I have read the{" "}
          <a href="#">Terms of Condition</a> and{" "}
          <a href="#">Privary Policy.</a>
        </label>
      </div>
      {errors?.pancorrectinfo && (<p className="help is-danger">{errors.pancorrectinfo}</p> )}
    </div>
    <div className="form-group col-span-2 kyc-checkbox-wrap">
      <div className="flex items-center">
        <input
          className="input-checkbox input-checkbox-md"
          id="correctinfo"
          name="pancorrectinfo"
          type="checkbox"
          
          onChange={(e) => {handel(e); }}
        />
        <label
          htmlFor="correctinfo"
          className="tracking-normal"
        >
          {DocUpload.DocUploadPanSuccess}
        </label>
      </div>
      {errors?.pantermAccept && (<p className="help is-danger">{errors.pantermAccept}</p> )}
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

    <div className="form-group mt-5 col-span-2">
      <button name="panverification" type='pan'  className="btn btn-small">
        {DocUpload.DocUploadPanButton}
      </button>
    </div>
  </div></>
  )
}
