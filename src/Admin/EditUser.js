import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeForm = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.UserId;

  const editURL = "http://localhost:5267/api/UserDetails/";
  const navigate = useNavigate();
  const param = useParams();
  const [personPassword, setPassword] = useState('');
  const [personId, setId] = useState('');
  const [personName, setName] = useState('');
  const [personEmail, setEmail] = useState('');
  const [personMobile, setMobile] = useState('');
  const [personAddress, setAddress] = useState('');
  const [Users, setusers] = useState([]);

useEffect(() => {

  axios.get(`http://localhost:5267/api/UserDetails/${userId}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    const empData = response.data;
    setusers(empData);
    console.log(response.data)
    setId(empData.userId);
    setName(empData.userName);
    setEmail(empData.emailId);
    setMobile(empData.mobileno);
    setAddress(empData.address); 
    setPassword(empData.password); 

  }).catch(error => { 
    toast.error("Error Ocurred getting User detail:"+ error);
  });
}, []);


  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const EmailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const MobileChangeHandler = (event) => {
    setMobile(event.target.value);
  };
  const AddressChangeHandler = (event) => {
    setAddress(event.target.value);
  };
  const PasswordChangeHandler=(event)=> {
    setPassword(event.target.value);
  };

  const updatedUser = {
    ...Users,
    userName: personName,
    emailId:personEmail,
    mobileno:personMobile,
    address:personAddress,
  };

  console.log(updatedUser);

  const submitActionHandler = (event) => {
    event.preventDefault();
    
    axios
      .put(`http://localhost:5267/api/UserDetails/${userId}`,updatedUser,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("User "+ personId +" updated!");
        setTimeout(() => {
          navigate("/AdminProfile");
        }, 2000);

      }).catch(error => { 
        toast.error("Error Ocurred updating User details:"+ error);
      });
      
  };

    return(  
      <Alert variant='primary'>
      <Container>
      <div className="toast-container">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      </div>
      <Form onSubmit={submitActionHandler} id="data">
      <Form.Group  controlId="form.id">
            <Form.Label>User Id</Form.Label>
            <Form.Control  value={personId} readonly='readonly'/>
        </Form.Group>
        <Form.Group controlId="form.Name">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={personName} onChange={nameChangeHandler} placeholder="Enter User Name" required/>
        </Form.Group>
        <Form.Group  controlId="form.Email">
            <Form.Label>Email Id</Form.Label>
            <Form.Control type="email" value={personEmail} onChange={EmailChangeHandler} placeholder="Enter User Email" required/>
        </Form.Group>
        {/* <Form.Group  controlId="form.Password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" value={personPassword} onChange={PasswordChangeHandler} placeholder="Enter User Password" required/>
        </Form.Group> */}
        <Form.Group  controlId="form.Mobile">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control type="text" value={personMobile} onChange={MobileChangeHandler} placeholder="Enter User Mobile No" required/>
        </Form.Group>
        <Form.Group  controlId="form.Address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" value={personAddress} onChange={AddressChangeHandler} placeholder="Enter User Address" required/>
        </Form.Group>
        <br></br>
        <Button type='submit'>Update User</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>navigate("/AdminProfile")}>Cancel</Button>
      </Form>
    </Container>     
    </Alert>      
    
    );
}
export default EmployeeForm;