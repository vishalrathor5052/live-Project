import React from 'react'

export default function NoMatch() {
  return (
    <>
      <div className="error-main text-center py-16 md:py-32 h-screen flex justify-center items-center">
          <div className="container">
              <h1 className='uppercase text-8xl md:text-9xl font-extrabold text-green-400'>404</h1>
              <h3 className="my-4 leading-snug font-bold uppercase text-2xl md:text-3xl">Oops, We’re sorry!</h3>
              <p>The page you were loking for has either been moved or is no longer accessible.</p>
                                  
              <div className="error-btn mt-6">
                  <a href="#" className="btn flex justify-center items-center mx-auto !text-white max-w-[220px]">Back to homepage</a>
              </div>
          </div>
      </div>
    </>
  )
}
