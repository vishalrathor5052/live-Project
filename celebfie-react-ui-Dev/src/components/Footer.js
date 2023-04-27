import React from 'react'
import Container from './Container'

export default function Footer() {
  return (
    <>
        <div className='footerWrap text-[10px] sm:text-xs py-3'>
            <Container>
                <div className='md:flex items-center justify-between'>
                    <div>
                        <ul className='flex space-x-3 md:space-x-7 flex-wrap justify-start'>
                            <li><a href="/term" className='text-gray-400 hover:text-yellow-400'>Terms of Use</a></li>
                            <li><a href="privacy" className='text-gray-400 hover:text-yellow-400'>Privacy & Policy</a></li>
                            <li><a href="refund" className='text-gray-400 hover:text-yellow-400'>Refund And Cancellation</a></li>
                        </ul>
                    </div>
                    <div className='mt-3 md:mt-0'>
                        <p>© 2021 Celebfie. All Rights Reserved.</p>
                    </div>
                </div>
           </Container>
        </div>
    </>
  )
}
