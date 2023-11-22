import React, { useState } from 'react';
import Navbar from './Navbar';
import { jwtDecode } from 'jwt-decode';
import BannerBackground from '../assets/home-banner-background.png';
import '../App.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import Delete from './DeleteAccount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Settings = () => {
  //const baseURL = "http://localhost:5267/api/Authentication/login";
  const navigate = useNavigate();
  const [enteredPassword, setPassword] = useState('');
  const [enteredNewPassword, setNewPassword] = useState('');
  const [enteredConfPassword, setuserconfpassword] = useState('');

  const [errors, setErrors] = useState({
    userName: '',
    password: '',
    confPassword: '',
  });
  
  
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const newpasswordChangeHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const confpasswordChangeHandler = (event) => {
    setuserconfpassword(event.target.value);
  };


  const validateForm = () => {
    let valid = true;


    if (!enteredPassword){
        setErrors((prevErrors) => ({
            ...prevErrors,
            userName: 'Name is required',
        }));
        valid = false;
    }


    if(!enteredNewPassword){
        setErrors((prevErrors)=>({
            ...prevErrors,
            password: 'Password is required',
        }));
        valid = false;
    }

    if(enteredNewPassword !== enteredConfPassword){
      setErrors((prevErrors)=>({
          ...prevErrors,
          confPassword: 'Password and Confirmation Password must be match'
      }));
      valid = false;
  }


    return valid;
  };


  const submitActionHandler = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
  
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.UserId;
  
        console.log(userId);
  
        // Fetch existing user details using axios.get and await the result
        const existingUserResponse = await axios.get(`http://localhost:5267/api/UserDetails/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Access the user details from the response
        const existingUser = existingUserResponse.data;
        console.log(existingUser);
  
        // Update only the password field
        const updatedUser = {
          ...existingUser,
          password: enteredNewPassword,
        };
  
        console.log(updatedUser);
  
        // Send a request to the server to update the password in UserDetails
        const updatedResponse = await axios.put(
          `http://localhost:5267/api/UserDetails/change-password/${userId}`,
          updatedUser,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log('Response:', updatedResponse);
  
        // Handle successful password change (update UI, redirect, etc.)
        toast.success('Password changed successfully:', updatedResponse.data);
        setTimeout(() => {
          navigate("/AdminHome");
        }, 2000);
      } catch (error) {
        toast.error("error===" + error.message);
      }
    }
  };

  const cancelHandler = () =>{
    //reset the values of input fields
    setPassword('');
    setNewPassword('');
    setuserconfpassword('');
    navigate("/AdminSettings");
  }
  return (
    <div>
      <Navbar/>
      <div className='home-bannerImage-container'>
          <img src={BannerBackground} alt=""/>
       </div>
       <div className="toast-container">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      </div>
      <div>
  <h2>Settings</h2>
  <div class="app">
    <div class="sidebar">
        <ul>
            <li><a href="/settings">Change Password</a></li>
            <li><Delete /></li>
        </ul>
    </div>

    <div class="main-content">
    <Form onSubmit={submitActionHandler} style={{ width: '300px' }}>
        <Form.Group controlId="form.UserName">
            <Form.Label>Current Password</Form.Label>
            <Form.Control type="password" value={enteredPassword} onChange={passwordChangeHandler} placeholder="Enter the Current Password" />
        </Form.Group>
        <span className="error">{errors.userName}</span>
        <Form.Group  controlId="form.Password">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" value={enteredNewPassword} onChange={newpasswordChangeHandler} placeholder="Enter password" />
        </Form.Group>
        <span className="error">{errors.password}</span>
        <Form.Group controlId="form.ConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" value={enteredConfPassword} onChange={confpasswordChangeHandler} placeholder="Enter password" />
        </Form.Group>
        <span className="error">{errors.confPassword}</span>
        <br></br>
        <Button type='submit'>Change Password</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>cancelHandler()}>Cancel</Button>
      </Form>
    </div>
</div>

</div>

    </div>
  )
}

export default  Settings