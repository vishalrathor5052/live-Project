import React from 'react'
import LogoImage from '../images/CelebfieMementoLogo.png'

export default function Logo() {
  return (
    <>
      <div className="site-branding relative mx-auto mb-3">
        <a href="/"><img src={LogoImage} className="mx-auto" /></a>
      </div>
    </>
  )
}
