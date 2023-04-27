import React from 'react'

export default function SuccessMessage(props) {
  return (
    <>

        <div className='mt-4 mb-3'>
            <div className='text-sm p-4 flex items-center bg-green-400 bg-opacity-20 rounded'> <em className='ti ti-check-box pr-2'></em>{props.message} </div>
        </div>
      
    </>
  )
}
