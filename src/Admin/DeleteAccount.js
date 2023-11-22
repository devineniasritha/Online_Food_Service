import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "../App.css";

const Delete = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the JWT to get user information
      const decodedToken = jwtDecode(token);

      // Set the user information in the state
      setUserInfo(decodedToken);
    }
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found.');
        return;
      }
  
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.UserId;
  
      const response = await fetch(`http://localhost:5267/api/UserDetails/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      localStorage.removeItem('token');
  
      if (response.ok) {
        alert('Account deleted successfully');
        navigate('/');
        // Optionally, you can redirect or perform other actions after deletion
      } else {
        alert('Error deleting account:', response.statusText);
      }
    } catch (error) {
      alert('Error deleting account:', error.message);
    }
  };


  return (
    <button type="button" className="btn btn-danger" onClick={handleDeleteAccount}>
      Delete Account
    </button>
  );
};

export default Delete;