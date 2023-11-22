import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Adduser.css";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const Adduser = () => {
 
  const navigate= useNavigate();
  const [UserName, setUserName] = useState("");
  const [EmailId, setEmailId] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Mobileno, setMobileno] = useState("");
  const [Address, setAddress] = useState("");
  const [UserType, setUserType] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
   
    if(Password !==ConfirmPassword){
        setPasswordMatchError("Password didnt matched");
        return;
    }
    setPasswordMatchError("");
    const url = "http://localhost:5267/api/UserDetails";
    const data = {
      "UserName": UserName,
      "EmailId": EmailId,
      "Password": Password,
      "Mobileno": Mobileno,
      "Address": Address,
      "UserType": UserType
    };
    const token= localStorage.getItem('token');
    axios.post(url, data,{
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`,
 
      }})
      .then((result) => {}).catch((error) => {console.log(error);})
      navigate("/AdminUsers");
   
 
  }
 
 
  return (
    <form onSubmit={handleSubmit}>
        <h2>Add User:</h2>
       
      <label>
        UserName:
        <input type="text" name="UserName" value={UserName}
                onChange={(e) => setUserName(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" name="Password" value={Password}
                onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        ConfirmPassword:
        <input type="password" name="ConfirmPassword" value={ConfirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)} />
      </label>
      <label>
        mobile no:
        <input type="text" name="Mobileno" value={Mobileno}
                onChange={(e) => setMobileno(e.target.value)} />
      </label>
      <label>
        emailid:
        <input type="email" name="EmailId" value={EmailId}
                onChange={(e) => setEmailId(e.target.value)}/>
      </label>
      <label>
        addess:
        <input type="text" name="Address" value={Address}
                onChange={(e) => setAddress(e.target.value)} />
      </label>
      <label>
        Usertype:
        {/* <input type="text" name="UserType" value={UserType}
                onChange={(e) => setUserType(e.target.value)}/> */}
        <select name="UserType" id="userTypeDropdown" value={UserType} onChange={(e) => setUserType(e.target.value)}>
          <option value="Customer">Select</option>
          <option value="Admin">Admin</option>
         
        </select>
      </label>
     
      {passwordMatchError && (
        <p style={{color:"red"}}>{passwordMatchError}</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};
 
export default Adduser;