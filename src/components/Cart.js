import React, { useState, useEffect } from 'react';
import './Cart.css'; // Import the CSS file
import deleteIcon from "./../assets/delete.jpg";
import {BsCart2} from "react-icons/bs";
import BannerBackground from "../assets/home-banner-background.png";
import Navbar from './Navbar';
import Footer from './Footer';

const Cart = () => {

  return (
    <div>
      <Navbar/>
      <div className='home-bannerImage-container'>
          <img src={BannerBackground} alt=""/>
       </div>
       <div className="centered-container">
      <h2>No items in cart</h2>
      <p>Please log in to add items to your cart.</p>
      <a href='login'><button>SignIn</button></a>
    </div>
        <Footer/>
     </div>
  );
};

export default Cart;
