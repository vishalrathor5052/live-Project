import React, { useState } from 'react'
import "./style.scss"
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { cardsDetails,cardsChefsDish } from "../../Components/Common/Dummy"
import { imgData } from '../../Components/Common/Imges'
const locationlogo = require("../../assets/images/location.png")
const LandingPage = () => {
  const [nav2, setNav2] = useState();

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className='main-landing'>
      <div className='landing-top'>
        <h3 className='heading-tag'>Earn money doing what you love</h3>
        <p className='head-pera'>
          Cook the food you love from the comfort of your home kitchen - and earn a real living! Are you a great cook in Spain? Start selling your home cooking!
        </p>
        <div className='find-button'>
          <img src={locationlogo} alt="location" />
          <input type="text" placeholder='Enter your delivery address' />
          <button>
            Find Cook
          </button>
        </div>
        <img src={imgData.chef1} alt="" className='landing-left-img' />
        <img src={imgData.chef2} alt="" className='landing-right-img' />
      </div>
      <div className='landing-mid'>
        <p>How it works</p>
        <div className='mid-card'>
          {cardsDetails?.map((elm: any) => (
            <div className='cards'>
              <img src={elm?.src} alt='orderimg' />
              <span className='card-value'>{elm?.id}</span>
              <h5>{elm.dish}</h5>
              <h6>{elm?.des}</h6>
            </div>
          ))}

        </div>

      </div>
      <div className='dish-category'>
        <p>Amazing dishes from our Chefs</p>
        <div className='dish-main'>
{/* <Slider  
{...settings}
        > */}
          {cardsChefsDish?.map((elm: any) => (
            <div className='dish-cards'>
              <img src={elm?.src} alt='orderimg' />
              <p>{elm?.dish}</p>
            </div>
          ))}
          {/* </Slider> */}
        </div>
      </div>

      <div className='chef-section'>
        <img src={imgData?.card5} alt='orderimg' />
        <div className='chef-right'>
          <h3>Become a chef</h3>
          <p>At Chefera, we are committed to helping ensure that your food will always be safe to eat. As part of our extensive onboarding process, all chefs are required to submit the necessary legal documents.</p>
          <button >Become a chef</button>
        </div>
      </div>
      <div className='chefera-details-sec'>
        <h3>
          Why Choosing Chefera?
        </h3>
        <div className='chefera-mid'>
          <div className='chefera-detail-left'>
            <div className='chf-des-sec'>
              <div className='emp-block'></div>
              <div className='chf-contain'><h5>Get approved to cook</h5>
                <p>Sign up and complete an accreditedcompany food safety series thatcomply with the local laws andregulations</p>
              </div>
            </div><div className='chf-des-sec'>
              <div className='emp-block'></div>
              <div className='chf-contain'><h5>Get approved to cook</h5>
                <p>Sign up and complete an accreditedcompany food safety series thatcomply with the local laws andregulations</p>
              </div>
            </div><div className='chf-des-sec'>
              <div className='emp-block'></div>
              <div className='chf-contain'><h5>Get approved to cook</h5>
                <p>Sign up and complete an accreditedcompany food safety series thatcomply with the local laws andregulations</p>
              </div>
            </div>
            <img src={imgData?.card5} alt='orderimg' />
          </div>
          <div className='chefera-detail-right'>
            <img src={imgData?.card5} alt='orderimg' />
            <div className='chf-des-sec'>
              <div className='emp-block'></div>
              <div className='chf-contain'><h5>Get approved to cook</h5>
                <p>Sign up and complete an accreditedcompany food safety series thatcomply with the local laws andregulations</p>
              </div>
            </div>
            <div className='chf-des-sec'>
              <div className='emp-block'></div>
              <div className='chf-contain'><h5>Get approved to cook</h5>
                <p>Sign up and complete an accreditedcompany food safety series thatcomply with the local laws andregulations</p>
              </div>
            </div>
            <div className='chf-des-sec'>
              <div className='emp-block'></div>
              <div className='chf-contain'><h5>Get approved to cook</h5>
                <p>Sign up and complete an accreditedcompany food safety series thatcomply with the local laws andregulations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='download-container'>
        <div className='download-cards'>
          <div className="download-sec">
            <h3>Download Our App</h3>
            <p>Discover and access some of the best-kept culinary talents - while directly supporting your local community, and economy.</p>
            <div className='download-imgs'>
              <img src={imgData?.download1} alt="" />
              <img src={imgData?.download2} alt="" />
            </div>
          </div>
          <div className='mob-img'>
            <img src={imgData?.phoneImg} alt="" />
          </div>
        </div>
      </div>
      <div className='download-container-mobile'>
        <h3>Download Our App</h3>
        <div className='download-cards'>
          <div className="download-sec">
            <p>Discover and access some of the best-kept culinary talents - while directly supporting your local community, and economy.</p>
            <div className='download-imgs'>
              <img src={imgData?.download1} alt="" />
              <img src={imgData?.download2} alt="" />
            </div>
          </div>
          <div className='mob-img'>
            <img src={imgData?.phoneImg} alt="" />
          </div>
        </div>
      </div>

      <div className='cust-review'>
        <h3>Small Talks</h3>
        <p>
          Meet all exciting personalities who create unforgettable experiences and daily greets you.Here we tell their stories.
        </p>
        <div className='cust-cards'>
          <div className='review-card'>
            <img src={imgData?.chefImg1} alt="" />
            <p>Erin Wilsone</p>
          </div>
          <div className='review-card'>
            <img src={imgData?.chefImg2} alt="" />
            <p>Erin Wilsone</p>
          </div>
          <div className='review-card'>
            <img src={imgData?.chefImg3} alt="" />
            <p>Erin Wilsone</p>
          </div>
          <div className='review-card'>
            <img src={imgData?.chefImg4} alt="" />
            <p>Erin Wilsone</p>
          </div>
        </div>
        <div className='food-cart'>
          <div className='food-left'>
            <h3>
              Food Safety
            </h3>
            <p>
              At Chefera, we are committed to helping ensure that your food will always be safe to eat. As part of our extensive onboarding process, all chefs are required to submit the necessary legal documents, including proof of instruction in accordance with Sections 42 and 43 of the Infection Protection Act (“Red Card”) and extensive training on the Food Hygiene Ordinance (LMHV). The chefs learn about all the relevant legal obligations and hygiene regulations in detail, and their kitchens are checked regularly by authorities – exactly like in restaurants.
            </p>
          </div>
          <div className='food-right'>
            <img src={imgData?.download3} alt="" />
          </div>
        </div>
        <div className='review-rate'>
          <h3>Review and Rating</h3>
          <p>Meet all exciting personalities who create unforgettable experiences and daily greets you.Here we tell their stories.</p>
          <div className='cust-feed'>
            <div className='feed-cards'>
              <h2>"</h2>
              <h4>Michella</h4>
              <p>At HomeMeal, we are committed to helping ensure that your food will always be safe to eat. As part of our extensive onboarding process, all chefs are required to submit the necessary legal documents, including proof of instruction in accordance with Sections 42 and 43 of the Infection Protection.</p>
            </div>
            <div className='feed-cards'>
              <h2>"</h2>
              <h4>Michella</h4>
              <p>At HomeMeal, we are committed to helping ensure that your food will always be safe to eat. As part of our extensive onboarding process, all chefs are required to submit the necessary legal documents, including proof of instruction in accordance with Sections 42 and 43 of the Infection Protection.</p>
            </div>

          </div>
          <p className='review-trust'>Based on reviews from  * Trustpilot</p>
        </div>
      </div>
      <hr></hr>
      <div className='footer-cook'>
        <h3>
          Ready to start cooking?
        </h3>
        <p>
          Join a community of chefs that are also on the same journey to turn their passion into a business.
        </p>
        <button>Get Started</button>
      </div>
    </div>
  )
}

export default LandingPage