import React from 'react'
import Container from './Container'
import Nav from './Nav'
import KycBtn from './KycBtn'

export default function Menu() {
  return (
    <>
        <div className='header-menu bg-white drop-shadow-md hidden dd:block'>
            <Container>
                <div className='flex flex-wrap items-center justify-between'>
                    <Nav />
                    <KycBtn />
                </div>
            </Container>
        </div>
    </>
  )
}
