import React from 'react'
import { pancardDetailForms } from '../../utility/Strings'

export default function DocNote() {
  return (
    <> 
    <p className="font-medium text-gray-400 text-base">
     {pancardDetailForms.labelnote}
    </p>
    <ul className="mt-5">
      <li>{pancardDetailForms.Rule1}</li>
      <li>{pancardDetailForms.Rule2}</li>
      <li>{pancardDetailForms.Rule3}</li>
    </ul>
  </>
  )
}
