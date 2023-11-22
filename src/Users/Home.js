import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import BannerBackground from "../assets/home-banner-background.png";
import BannerImage from "../assets/home-banner-image.png";
import {FiArrowRight} from "react-icons/fi";
import {BsCart2} from "react-icons/bs";
// import './Menu.css'; 

import Profilepic from "../assets/Person1.jpg";
import Profilepic1 from "../assets/Person2.jpg";
import Profilepic2 from "../assets/Person3.jpg";

import Footer from './Footer';





const Home = () => {

  return (
    <div>
      <Navbar/>
    

    <div className='home-banner-container'>
        <div className='home-bannerImage-container'>
          <img src={BannerBackground} alt=""/>
       </div>
       <div className='home-text-section'>
        <h1 className='primary-heading'>
          Your Favourite Food Delivered Hot & Fresh

        </h1>
        <p className="primary-text">
          Healthy Switcher chefs do all the prep work,like peeding,
          chopping 
           & marinating,so you can cook afresh food.
        </p>
        <button className='secondary-button'>
          <a href='/UsersMenu' style={{color:"inherit",textDecoration:"none"}}>Order Now</a><FiArrowRight/>
        </button>
       </div>
       <div className='home-image-container'>
        <img src={BannerImage} alt=""/>
       </div>
    </div>
    <div className="work-section-wrapper">

    <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="text">
          We Provide a Great Varieties of Food, which are Delicious and Hygienic. We as a Family of LAAVS has Satisfied millions of Tummies with good food. Here are few Reviews of our Customers.
        </p>
      </div>
               
    <div className="work-section-wrapper">
    <div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <center><img src={Profilepic} width={'75%'} height={'50%'} alt="person1"/></center>
      <div class="carousel-caption d-none d-md-block">
        <h5>Susan Rose</h5>
        <p>LAAVS is the best customer service provider, I had a great experience ordering in  LAAVS.</p>
      </div>
    </div>
    <div class="carousel-item">
     <center> <img src={Profilepic1} width={'75%'} alt="person2"/></center>
      <div class="carousel-caption d-none d-md-block">
        <h5>John Tim</h5>
        <p>I have become a regular Customer to LAAVS, it has very good Food Services and world class taste in it's items.</p>
      </div>
    </div>
    <div class="carousel-item">
    <center>  <img src={Profilepic2} width={'80%'} height={'100px'}alt="person3"/></center>
      <div class="carousel-caption d-none d-md-block">
        <h5>Amaira Jenner</h5>
        <p>The Delivery Services and Magic in Chef's Hands of this restaurant are worth trying .</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    
    </div>
    </div>
   

   <Footer/>
    
</div>

  )
}

export default Home