import React from 'react'
import Container from './Container'
import HeaderProfile from './HeaderProfile'
import LogoWhite from './LogoWhite'
import Menu from './Menu'
import MobileMenu from './MobileMenu'

export default function Header() {
  return (
    <>

        <header>
          <div className='bg-gray-400 py-2'>
              <Container>
                  <div className='flex items-center justify-between'>
                      <MobileMenu />
                      <LogoWhite />
                      <HeaderProfile />
                  </div>
              </Container>
          </div>

          <Menu />

        </header>

    </>
  )
}
