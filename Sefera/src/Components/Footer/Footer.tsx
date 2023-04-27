import React from 'react'
import { imgData } from '../Common/Imges'
import "../../Screens/LandingPage/style.scss"

const Footer = () => {
    return (
        <>
            <div className='footer-main'>
                <div className="footer-container">
                    <div className="footer-sec">
                        <h3>Download Our App</h3>
                        <p>Discover and access some of the best-kept culinary talents - while directly supporting your local community, and economy.</p>
                        <div className='footer-imgs'>
                            <img src={imgData?.download1} alt=""/>
                            <img src={imgData?.download2} alt="" />
                        </div>
                    </div>
                    <div className='footer-mob-img1'>
                        <img src={imgData?.phoneImg} alt="" />
                    </div>

                </div>
                <div className='footer-details'>
                    <div className='footer-sub1'>
                        <h3>About</h3>
                        <ul className='footer-menu'>
                            <li>
                                Our Story
                            </li>
                            <li>
                                Our Chef
                            </li>
                            <li>Cook with us
                            </li>
                            <li>
                                Order meals
                            </li>
                            <li>
                                Support
                            </li>
                            <li>
                                EN
                            </li>

                        </ul>

                    </div>
                    <div className='footer-sub2'>
                        <h3>Address</h3>
                        <p>

                            Ven Nilsson, Roslagsgatan 10 (Street, and number) 113 51 Stockholm</p>
                    </div>
                    <div className='footer-sub3'>
                        <h3>Follow</h3>
                        <ul><li>Facebook</li>
                            <li>Instagram</li></ul>
                    </div>
                    <div className='footer-mob-img'>
                        <img src={imgData?.phoneImg} alt="" />
                    </div>
                </div>
                <div className='copyright'>
                    <p>{'\u00a9'} chefera 2023</p>
                    <p>All right reserved by chefera.</p>
                </div>
            </div>
        </>
    )
}

export default Footer