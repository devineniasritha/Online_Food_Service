import React, { useState } from 'react';
import Navbar from './Navbar'
import AboutBackground from "../assets/about-background.png";
import AboutBackgroundImage from "../assets/about-background-image.png";
import {BsFillPlayCircleFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import "../App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




import { AiFillStar } from "react-icons/ai";
import Footer from './Footer';


const Register = () => {
    const baseURL = "http://localhost:5267/api/UserDetails";
  const navigate = useNavigate();
  const [enteredUserName, setusername] = useState('');
  const [enteredPassword, setuserpassword] = useState('');
  const [enteredConfPassword, setuserconfpassword] = useState('');
  const [enteredEmailId, setemailid] = useState('');
  const [enteredusertype, setusertype] = useState('User');


  const [errors, setErrors] = useState({
    userName: '',
    emailId: '',
    password: '',
    confPassword: '',
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
});

const [passwordErrors, setPasswordErrors] = useState({
    length: '',
    uppercase: '',
    lowercase: '',
    number: '',
    specialChar: '',
});

const validatePassword = (password) => {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[!@#]/.test(password),
    };
    setPasswordRequirements(requirements);

    const errors = {
        length: requirements.length ? '' : 'Password must be at least 8 characters long.',
        uppercase: requirements.uppercase ? '' : 'Password must contain an uppercase letter.',
        lowercase: requirements.lowercase ? '' : 'Password must contain a lowercase letter.',
        number: requirements.number ? '' : 'Password must contain a number.',
        specialChar: requirements.specialChar ? '' : 'Password must contain a special character (!@#).',
    };
    setPasswordErrors(errors);
};

  
  const usernameChangeHandler = (event) => {
    setusername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setuserpassword(event.target.value);
    validatePassword(event.target.value);
  };

  const confpasswordChangeHandler = (event) => {
    setuserconfpassword(event.target.value);
  };

  const emailidChangeHandler = (event) => {
    setemailid(event.target.value);
  }

  const usertypeChangeHandler = (event) => {
    setusertype(event.target.value);
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

    if(enteredPassword !== enteredConfPassword){
        setErrors((prevErrors)=>({
            ...prevErrors,
            confPassword: 'Password and Confirmation Password must be match'
        }));
        valid = false;
    }

    if (!enteredEmailId){
        setErrors((prevErrors) => ({
            ...prevErrors,
            emailId: 'Email is required',
        }));
        valid = false;
    }

    return valid;
  };


  const submitActionHandler = async (event) => {
    event.preventDefault();
    if(validateForm()){
        try{
          const response = await axios.get(
            `http://localhost:5267/api/UserDetails/Check-Email&password?email=${enteredEmailId}`
          );
          const emailExists = response.data.emailExists;
          if (!emailExists) {
            const registrationResponse = await axios.post(baseURL, {
              userName: enteredUserName,
              emailId: enteredEmailId,
              password: enteredPassword,
              userType: enteredusertype,
            });
  
            toast.success(`User ${enteredUserName} is registered!`);
            setTimeout(() => {
              navigate("/read");
            }, 2000);
          }else {
            // If email exists, show an error message
            toast.error("User already registered with this email");
          }
        }catch (error) {
          console.error("Error during registration:", error);
          toast.error("Error during registration. Please try again.");
        }
    }
    
  };


  const cancelHandler = () =>{
    //reset the values of input fields
    setusername('');
    setuserpassword('');
    setuserconfpassword('');
    setemailid('')
    setusertype('');
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
        <p className="primary-subheading">Sign Up</p>
        <div className="primary-register">
        <Form onSubmit={submitActionHandler} style={{ width: '300px' }}>
        <Form.Group controlId="form.UserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={enteredUserName} onChange={usernameChangeHandler} placeholder="Enter Name" />
        </Form.Group>
        <span className="error">{errors.userName}</span>
        <Form.Group controlId="form.EmailId">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={enteredEmailId} onChange={emailidChangeHandler} placeholder="Enter Mail" />
        </Form.Group>
        <span className="error">{errors.emailId}</span>
        <Form.Group  controlId="form.Password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={enteredPassword} onChange={passwordChangeHandler} placeholder="Enter password" />
        </Form.Group>
            <div className="error-messages">
              
                {Object.values(passwordErrors).map((error, index) => (
                    error && <p key={index} className="error-message">{error}</p>
                ))}
              
            </div>
        <span className="error">{errors.password}</span>
        <Form.Group controlId="form.ConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" value={enteredConfPassword} onChange={confpasswordChangeHandler} placeholder="Enter password" />
        </Form.Group>
        <span className="error">{errors.confPassword}</span>
        <br></br>
        <Button type='submit'>Register</Button>
        &nbsp;&nbsp;&nbsp;
        <p>Already have account?<a href='/login'>Login</a></p>
        <Button type='submit' onClick={()=>cancelHandler()}>Cancel</Button>
      </Form>
        </div>
        
      </div>
    </div>
    <Footer/>

   
    </div>

  )
}

export default Register;
