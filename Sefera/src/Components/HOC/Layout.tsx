import React from 'react'
import Footer from '../Footer/Footer'
import Header from "../Headers/Index"

const Layout = (Component: any) => ({ ...props }) => (
  <>
    <Header />
    <Component {...props} />
    <Footer />
  </>
)


export default Layout
