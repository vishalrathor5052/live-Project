import React from 'react'
import MenuIcon1 from '../images/icons/dashboard.png'
import MenuIcon2 from '../images/icons/tokens.png'
import MenuIcon3 from '../images/icons/ico-distribution.png'
import MenuIcon4 from '../images/icons/transaction.png'
import MenuIcon5 from '../images/icons/profile.png'
import AuthService from '../services/auth.service'
import { useNavigate } from 'react-router-dom';

export default function Nav() {

    const navigate = useNavigate();

const logoutsession = () => {

    AuthService.logout();
    navigate("/login");
            window.location.reload();
}

  return (
    <>
        <nav className="menu">
                        
            <div className="flex flex-wrap justify-between items-center mx-auto">

                <div className="w-full dd:w-auto" id="mobile-menu">
                    <ul className="flex flex-col mt-4 dd:flex-row dd:space-x-8 dd:mt-0 dd:text-sm dd:font-medium">
                        <li> 
                            <a href="/dashboard" className="flex items-center py-4 text-gray-400 border-b-2 border-solid border-transparent hover:border-yellow-400"><em className='ti ti-view-grid mr-[8px]'></em>Dashboard</a>
                        </li>
                        {/* {AuthService.ifCurrentUserAdmin() ?
                        <>
                        <li>
                            <a href="/users" className="flex items-center py-4 text-gray-400 border-b-2 border-solid border-transparent hover:border-yellow-400"><em className='ti ti-layout-list-thumb mr-[8px]'></em>Users</a>
                        </li>
                        <li>
                            <a href="/userdetails" className="flex items-center py-4 text-gray-400 border-b-2 border-solid border-transparent hover:border-yellow-400"><em className='ti ti-user mr-[8px]'></em>User Details</a>
                        </li></>

                        : '' } */}

                        

                        {/* <li>
                            <a href="/users" className="flex items-center py-4 text-gray-400 border-b-2 border-solid border-transparent hover:border-yellow-400"><em className='ti ti-layout-list-thumb mr-[8px]'></em>Users</a>
                        </li> */}

                        {/* <li>
                            <a href="/ioc" className="flex items-center py-4 text-gray-400 border-b-2 border-solid border-transparent hover:border-yellow-400"><em className='ti ti-server mr-[8px]'></em>ICO Distribution</a>
                        </li> */}
                        <li>
                            <a href="/transactions" className="flex items-center py-4 text-gray-400 border-b-2 border-solid border-transparent hover:border-yellow-400"><em className='ti ti-control-shuffle mr-[8px]'></em>Transactions</a>
                        </li>
                        
                        <li>
                            <a href="/profile" className="flex items-center py-4 text-gray-400 border-b-2 border-solid border-transparent hover:border-yellow-400"><em className='ti ti-user mr-[8px]'></em>Profile</a>
                        </li>

                        <li>
                            <a href="#" onClick={logoutsession} className="flex items-center py-4 text-gray-400 border-b-2 border-solid border-transparent hover:border-yellow-400"><em className='ti ti-power-off mr-[8px]'></em>Logout</a>
                        </li>

                    </ul>
                </div>
            </div>
        
        </nav>

    </>
  )
}
