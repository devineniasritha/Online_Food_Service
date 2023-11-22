import React from "react";
import Logo from "../assets/Logo.svg";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaEnvelope } from 'react-icons/fa';
import { MdPhone } from 'react-icons/md';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
 
     <>
        
     <footer>
     <div class="footer_logo">
       <a href="/" style={{color:"inherit",textDecoration:"none"}}>  <h1 className="fw-bold text-weight-bold m-0" style={{color:"DarkRed", fontSize:"3rem"}}>L<span className="text-weight-bold" style={{color:"orange"}}>AA</span>VS</h1></a>
     </div>
     <div class="pages">
       <h3>Pages</h3>
       <a href="/">Home</a>|
       <a href="/menu">Menu</a>|
       <a href="/about">About Us</a>|
       <a href="/contact">Contact</a>|
         </div>
         <div class="doc">
           <h3>Documentations</h3>
           <a href="/privacypolicy">Privacy Policy</a>|
           <a href="/terms">Terms and Conditions</a>
         </div>
         <div class="social">
           <h3>Follow</h3>
           <a href="https://www.instagram.com/" target="_blank"><FaInstagram /></a>|
           <a href="https://www.linkedin.com/login" target="_blank"><SiLinkedin/></a>|
           <a href="https://twitter.com/login?lang=en" target="_blank"><BsTwitter /></a>|
           <a href="https://www.facebook.com/" target="_blank">< FaFacebookF /></a>|
           <a href="https://www.youtube.com/">< BsYoutube /></a>
         </div>
         <div class="contact">
           <h3>Contact Us</h3>
           <a href="https://api.WhatsApp.com/send?phone=+911234567890" target="_blank"><IoLogoWhatsapp/></a>|
           <a href="mailto: 611915@student.nitandhra.ac.in"><FaEnvelope/></a>|
           <a href="tel: +911234567890"><MdPhone/></a>
         </div>
         <hr/>
         <p>Copyright &copy; 2023 LAAVS. All rights reserved</p>	
           
         
   </footer>
   </>
  );
};

export default Footer;
