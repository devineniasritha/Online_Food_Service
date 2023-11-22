import React from 'react';
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page or home page
    navigate("/"); // Change the path as needed
  };

  return (
    <button type="button" onClick={handleLogout} className="primary-button">
      Logout
    </button>
  );
};

export default LogoutButton;