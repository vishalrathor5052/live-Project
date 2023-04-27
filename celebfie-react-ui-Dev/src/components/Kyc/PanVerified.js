import React from 'react'
import { DocUpload } from '../../utility/Strings'

export default function PanVerified() {
  return (
    <> <div className="verified-data mt-7">
    <div className="flex relative">
      <em className="fas fa-info-circle text-[12px] text-green-400 absolute top-1"></em>
      <p className="pl-5 text-green-400 leading-tight text-sm">
        {DocUpload.DocUploadPanVerified}
      </p>
    </div>
  </div></>
  )
}
