import React from 'react'

export default function KycStepHeader(Props) {
  return (
    <div className="p-4 md:p-8 border-b border-solid border-green-200">
    <div className="flex items-center">
      <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center border border-solid border-green-200 text-green-200 text-xl font-medium">
       {Props.Step}
      </div>
      <div className="pl-2 md:pl-8">
        <h3 className="mb-2 leading-4">{Props.Heading}</h3>
        <p>
         {Props.description}
        </p>
      </div>
    </div>
  </div>
  )
}
