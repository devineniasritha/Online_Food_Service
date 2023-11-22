import React, { useState } from 'react';
import Navbar from './Navbar'
import AboutBackground from "../assets/about-background.png";
import AboutBackgroundImage from "../assets/about-background-image.png";
import {BsFillPlayCircleFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert, Toast } from 'react-bootstrap';
import "../App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import { AiFillStar } from "react-icons/ai";
import Footer from './Footer';


const Login = () => {
    const baseURL = "http://localhost:5267/api/Authentication/login";
  const navigate = useNavigate();
  const [enteredUserName, setUsername] = useState('');
  const [enteredPassword, setPassword] = useState('');
  
  const [errors, setErrors] = useState({
    userName: '',
    password: '',
  });
  
  
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    let valid = true;


    if (!enteredUserName){
        setErrors((prevErrors) => ({
            ...prevErrors,
            userName: 'Name is required',
        }));
        valid = false;
    }


    if(!enteredPassword){
        setErrors((prevErrors)=>({
            ...prevErrors,
            password: 'Password is required',
        }));
        valid = false;
    }

    return valid;
  };


  const submitActionHandler = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      try {
        axios
          .post(baseURL, {
            userName: enteredUserName,
            password: enteredPassword,
          })
          .then((response) => {
            const { token, role } = response.data;
            localStorage.setItem('token', token);
  
            if (role === 'admin' || role === 'Admin') {
              navigate("/AdminHome");
            } else {
              navigate("/unauthorize");
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              if (error.response.data && error.response.data === "Invalid credentials") {
                // Show a specific alert for invalid credentials
                toast.error("Invalid username or password");
              } else {
                // Show a generic alert for other 400 errors
                toast.error("Bad Request: " + error.message);
              }
            } else {
              toast.error("An unexpected error occurred");
            }
          });
      } catch (error) {
        // This block will only catch synchronous errors, not asynchronous ones
        toast.error("Synchronous error:", error);
      }
    }
  };


  const cancelHandler = () =>{
    //reset the values of input fields
    setUsername('');
    setPassword('');
    navigate("/read");
  }

  return (
    <div>
    <Navbar/>
    <div className="about-section-container">
      
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" width="500px"/>
      </div>
      <div className="toast-container">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">Login In</p>
        <div className="primary-register">
        <Form onSubmit={submitActionHandler} style={{ width: '300px' }}>
        <Form.Group controlId="form.UserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={enteredUserName} onChange={usernameChangeHandler} placeholder="Enter Name" />
        </Form.Group>
        <span className="error">{errors.userName}</span>
        <Form.Group  controlId="form.Password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={enteredPassword} onChange={passwordChangeHandler} placeholder="Enter password" />
        </Form.Group>
        <span className="error">{errors.password}</span>
        <br></br>
        <Button type='submit'>Login</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>cancelHandler()}>Cancel</Button>
      </Form>
        </div>
        
      </div>
    </div>
    <Footer/>

   
    </div>

  )
}

export default Login;
