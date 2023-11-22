import React, { useState } from 'react';
import {BsCart2} from "react-icons/bs";
import { Person} from 'react-bootstrap-icons';
import { PersonAdd} from 'react-bootstrap-icons';


 
const Navbar1 = () => {



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
        <a className="nav-link" aria-current="page" href="/">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link " href="/Menu">Menu</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" aria-current="page" href="/about">About</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" aria-current="page" href="/contact">Contact Us</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/Cart"><BsCart2/>
        </a>
      </li>
    </ul>
    <div>
      <a href='/create'>
      <button type="button" className="primary-button"><PersonAdd size={30}/>SignUp</button>
      </a>
      <a href='/login'>
      <button type="button" className="primary-button"><Person size={30}/>SignIn</button>
      </a>
    </div>
  </div>
</div>
</nav>
    </div>
  )
}
 
export default Navbar1