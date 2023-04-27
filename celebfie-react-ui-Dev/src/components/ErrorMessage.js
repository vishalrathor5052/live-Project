import React from 'react'

export default function ErrorMessage(props) {


  return (
    <>

        <div className='mt-4 mb-3'>
            <div className='text-sm p-4 flex items-center bg-red-600 bg-opacity-20 rounded'> <em className='ti ti-check-box pr-2'></em> {props.error} </div>
        </div>

    </>
  )
}
