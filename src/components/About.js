import React from 'react';
import Navbar from './Navbar'
import AboutBackground from "../assets/about-background.png";
import AboutBackgroundImage from "../assets/about-background-image.png";
import {BsFillPlayCircleFill} from "react-icons/bs";
import BannerBackground from '../assets/home-banner-background.png';



import { AiFillStar } from "react-icons/ai";
import Footer from './Footer';


const About = () => {
  return (
    <div>
    <Navbar/>
    <div className='home-bannerImage-container'>
          <img src={BannerBackground} alt=""/>
       </div>
    <div className="about-section-container">
      
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" width="2000px"/>
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        From food delivery to your daily convenience companion.
        </h1>
        <p className="primary-text">
        A subsidiary of Delivery Hero, LAAVS launched in Singapore in 2023 as a food delivery platform.  Dedicated to helping customers get their tasty favourites fast, it quickly won the hearts and minds of customers in APAC.
        </p>
        <p className="primary-text">
        Thanks to dedicated partners, riders, and a team united by shared values,  LAAVS is now providing millions with a convenient way to get food and groceries in a few taps.
        </p>
        <div class="team">
  <h2>OUR KEYPOINTS</h2>
  <div class="team_container">
    <div class="team_video">
     
    <iframe width="560" height="315" src="https://www.youtube.com/embed/xPPLbEFbCAo?si=dRcsHvY9y-HVjiWd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
     
    </div>
    <div class="team_content">
      <li>We Deliver the FOOD Hot and in time following all safety measures</li>
        <li>Our Team Members are verified and give their 100% towards LAAVS</li>
        <li>Our Services are limited to Banglore</li>
        <li>If Food is not delivered in the alloted time, the order is free from our side.</li>
        <li>Recieved Best Debutant Online Food Service Provider for 2023</li>
        <li>Top Class Chef's with World Wide Recipes and Finger Licking Taste.</li>
        <li>For further queries visit our merch page or our customer service website.</li>
    </div>
  </div>
</div>
      </div>
    </div>
    <Footer/>

   
    </div>

  )
}

export default About
