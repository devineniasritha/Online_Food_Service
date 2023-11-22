import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import {BsCart3} from "react-icons/bs";
import { Person} from 'react-bootstrap-icons';
import { PersonAdd} from 'react-bootstrap-icons';
import { NavDropdown } from 'react-bootstrap';
import LogoutButton from './Logout';

 
const Navbar1 = () => {
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        // Define an asynchronous function to fetch and decode the token
        const fetchToken = async () => {
            // Retrieve the token from local storage
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    // Decode the JWT to get user information
                    const decodedToken = jwtDecode(token);

                    // Set the user information in the state
                    setUserInfo(decodedToken);

                    // You can also perform additional actions based on the user information
                    //console.log(decodedToken);
                } catch (error) {
                    console.error('Error decoding token:', error);
                }
            }
        };

        // Call the asynchronous function
        fetchToken();
    }, []);
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
<div className="container-fluid">
<a href="/" className="navbar-brand ms-4 ms-lg-0">
                <h1 className="fw-bold text-weight-bold m-0" style={{color:"DarkRed",fontSize:"2.5rem"}}>L<span className="text-weight-bold" style={{color:"orange"}}>AA</span>VS</h1>
       </a>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent" >
    <ul className="navbar-nav me-auto mb-2 mb-lg-0"  style={{marginRight: '3rem',textDecoration: 'none',color: 'black',fontSize: '1.1rem',fontWeight: '600'}}>
      <li className="nav-item">
        <a className="nav-link" aria-current="page" href="/AdminHome">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link " href="/AdminUsers">Users</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" aria-current="page" href="/AdminMenu">Menu</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" aria-current="page" href="/AdminOrders">Orders</a>
      </li>
      
    </ul>
    <div>
    <NavDropdown title={<div style={{fontSize:"1.3rem"}}><Person size={30} /> {userInfo.UserName}</div>} id="basic-nav-dropdown">
              <NavDropdown.Item href="/AdminProfile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/AdminSettings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <LogoutButton />
            </NavDropdown>
    </div>
  </div>
</div>
</nav>
    </div>
  )
}
 
export default Navbar1