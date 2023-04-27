import React from 'react'
import LogoImage from '../images/CelebfieMementoLogo.png'

export default function LogoLeft() {
  return (
    <>
        <div className="site-branding relative mb-3">
            <a href="/"><img src={LogoImage} /></a>
        </div>
    </>
  )
}
