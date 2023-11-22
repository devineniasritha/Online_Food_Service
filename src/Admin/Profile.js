import Navbar1 from './Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import BannerBackground from '../assets/home-banner-background.png';
import {Link} from 'react-router-dom';

const UsersProfile = () => {
  const [userInfo, setUserInfo] = useState('');
  const [details,setDetails]=useState(''); 

  useEffect(() => {
      const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setUserInfo(decodedToken);
            console.log(decodedToken)
    
           // if (decodedToken && decodedToken.userId) {
            if (decodedToken) {
              const userId = decodedToken.UserId;
              console.log(userId)
              const response = await axios.get(`http://localhost:5267/api/UserDetails/${userId}`,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(response.data)
              setDetails(response.data)
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
      };
    
      fetchData();
    }, []);


   

  return (
    <div>
        <Navbar1/>
        <div className='home-bannerImage-container'>
          <img src={BannerBackground} alt=""/>
       </div>

        {userInfo && (
        <div>
          <h1>{userInfo.UserName}'s Profile</h1>
          {/* {cartItems.length === 0 ? (
            <p>No items in the cart</p>
          ) : ( */}
           <center>
           <table className='table'  style={{width:'65%'}}>
              {/* Table headers */}
              <th scope="col">Field</th>
              <th scope="col">Value</th>
             
              <tbody>
              <tr>
                 <td>User ID:</td>
                 <td><input type="text" name="UserId" value={details.userId} readOnly /></td>
              </tr>
              <tr>
                 <td>User Name:</td>
                 <td><input type="text" name="UserName" value={details.userName}  /></td>
                
              </tr>
              <tr>
                 <td>Email Id:</td>
                 <td><input type="text" name="Email" value={details.emailId}  /></td>
                 
              </tr>
              <tr>
                 <td>MobileNo:</td>
                 <td><input type="text" name="MobileNo" value={details.mobileno}  /></td>
                
              </tr>
              <tr>
                 <td>Address:</td>
                 <td><input type="text" name="Address" value={details.address} /></td>
               
              </tr>
             
             <center> <button className='Secondary-button'>
              <a href= "/EditAdmin" style={{textDecoration:"none"}}>Edit User
                        </a>
              </button>
                       </center>
               
              
          
              


              </tbody>
            </table>
           </center>
          
        </div>
      )}

 
      
        
    
      
    </div>
  );
};

export default UsersProfile;



