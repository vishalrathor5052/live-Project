import React,{Suspense} from 'react'
import Sidebar from '../component/sideBar/Sidebar'
import Header from '../component/header/Header'
import Loader from '../component/loader/Loader'

const Layout = (Component: any) => ({ ...props }) => (
    <div className="app-main App">
        <div className="left-section">
            <Sidebar />
        </div>
        <div className="right-section">
            <Header />
        <div className="data-container">
        <Suspense fallback={<Loader />}> 
            <Component {...props} />
            </Suspense>
        </div>
        </div>
    </div>
)


export default Layout
