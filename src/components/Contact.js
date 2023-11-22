import React from 'react'
import Navbar from './Navbar'
import {useNavigate} from "react-router-dom";
import BannerBackground from '../assets/home-banner-background.png';
import Footer from './Footer';


const Contact = () => {
  const navigate = useNavigate();
  const Submit = () =>{
    alert("Review is submitted.");
    navigate("/contact");
  }

  return (
    <div>
        <Navbar/>
        <div className='home-bannerImage-container'>
          <img src={BannerBackground} alt=""/>
       </div>
       
{/* <!--------- About Details -------------> */}
	<div class="small_container">
		
		<div class="row">
			<p style={{padding: '10px', margin: '10px'}}>
				<h3>Elegance Help Center | 24x7 Customer Care Support</h3><br/><br/>
			
        The Elegance Help Centre page lists out various types of issues that you may have encountered so that there can be quick resolution and you can go back to shopping online. For example, you can get more information regarding order tracking, delivery date changes, help with returns (and refunds), and much more. The Elegance Help Centre also lists out more information that you may need regarding  payment, shopping, and more. The page has various filters listed out on the left-hand side so that you can get your queries solved quickly, efficiently, and without a hassle. You can get the Elegance Help Centre number or even access Elegance Help Centre support if you need professional help regarding various topics. The support executive will ensure speedy assistance so that your shopping experience is positive and enjoyable. You can even inform your loved ones of the support page so that they can properly get their grievances addressed as well. Once you have all your queries addressed, you can pull out your shopping list and shop for all your essentials in one place. You can shop during festive sales to get your hands on some unbelievable deals online. This information is updated on 02-Sep-21<br/>
        You can 24x7 Customer Care Support on the Elegance Help Centre. Any query or issue that you may possibly have while shopping on Elegance is taken care here. This page is easy to navigate, and you can get support almost immediately. Once you log onto your Elegance account, this page shows you your recent orders and let you report any issue. By clicking on the specific order, you can raise your query. It also has a chat option to ensure that your queries and issues are taken care of. Similarly, there are other options on this page that are created to assist you and to make your shopping experience hassle-free. You can get support any time and get a satisfactory solution to your queries and issues within minutes. 
        <h3>Types and Topics of Support in Elegance Help Centre</h3>
        Apart from helping you with your orders and/or your delivered product-related issues, you can find various other support at Elegance Help Centre. You can select from three types of issues here - help with your issues, help with your order, and help with other issues. You can track your orders here, manage your orders, get help with your returns and refunds issues, and even get help related to various other issues, such as offers, payment,etc. There are also details about specific help topics, such as cancellations and returns, wallet, insurance, Elegance Quick, SuperCoins, Gift Card, etc. available here. So, log on to your Elegance account and shop without hassles and with complete help and support. <br/>

        The Elegance Help Centre is available on the Elegance site to help every ELegance customer with any grievance that they may have. You can find solutions regarding the tracking of your order. It will also help edit your delivery date or address and more. All your issues will be addressed at any time of the day or night (24/7 service). This way, you can immediately get your grievances addressed. You can also get help regarding returns and refunds and many other issues through the Elegance Help Centre. In case you're not satisfied with the solution given, you can seek further assistance. You can get in touch with a support assistant via the Elegance Help Centre number. The next time you have any issue with your order or if you want more clarity regarding payment options, Elegance Plus, account-related queries, and more, you can access Elegance Help Centre support for further information. This way, you can shop without worry and have a satisfying shopping experience. The support centre will do all that it can to address your grievance until you’re completely satisfied. So, no matter the nature of your grievance, you must get in touch with the support forum. This way, you won’t have to compromise in any way.
     </p>
		</div>
	</div><hr/>

	<div class="contact_container">
		<h2>CONTACT US</h2>
		<div class="g_map">
			<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.486164627848!2d78.38670241390354!3d17.484290904607345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91ab9aec640f%3A0xa9a53f886647f4c0!2sForum%20Sujana%20Mall!5e0!3m2!1sen!2sin!4v1630583517921!5m2!1sen!2sin" width="100%" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy"></iframe>
		</div>
     <div class="contact_content">
     	<p><b>Address:Banglore,India</b></p>
     	<p><b>Call: +911234567890</b></p>
     	<p><b>Mail:Elegance@gmail.com</b></p>
     </div>		
	</div>



	<center>
    <div class="feedback">
       <h2 className='primary-subheading'>GIVE YOUR REVIEW</h2>
      <div class="feed_form" >
       <form name="feed-googlesheet" method="post">
          <input type="text" name="Name" placeholder="Name"/><br/>
          <input type="email" name="Email" placeholder="Email Id"/><br/>
          <input type="number" name="Number" placeholder="Contact Number"/><br/>
          <textarea rows="5" cols="7"name="Review" placeholder="Write your review"></textarea><br/>
           <button type="submit" onClick={() => Submit()}>SUBMIT</button>
      </form>
    </div>
  </div>
    </center>
      <Footer/>
    </div>
  )
}

export default Contact
