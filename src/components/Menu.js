import React, { useState, useEffect } from 'react';
import './Menu.css';
import Navbar from './Navbar';
import {BsCart2} from "react-icons/bs";
import BannerBackground from '../assets/home-banner-background.png';
import AboutBackground from '../assets/about-background.png';
import Footer from './Footer';
import {useNavigate} from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
 
 
import {HiOutlineBars3} from "react-icons/hi2";
import{
  Box,Drawer,ListItem,List,ListItemButton,ListItemIcon,ListItemText
} from "@mui/material";
 

 
const Menu = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const[OpenMenu,setOpenMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    // Fetch menu items from the API
    fetch('http://localhost:5267/api/Menus')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);
 
  // Filter menu items based on the selected category
    // Filter menu items based on the selected category and search term
    const filteredMenuItems = menuItems
    .filter(
      (item) =>
        item.category === selectedCategory ||
        selectedCategory === 'Select Category'
    )
    .filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
  // Function to add an item to the cart
  const addToCart = async (selectedItem) => {
    navigate("/login");
  }
 
 
  return (
  <div>
 <Navbar/>
      <div className='home-bannerImage-container'>
          <img src={BannerBackground} alt=""/>
       </div>
     <div className="menu-container">
        <h1 className="mt-3 mb-4"><strong>Menu</strong></h1>
        <div className="filter-container">
        <span className="filter-name"><strong>Filter:</strong></span>
        <div className="dropdown" style={{ width: '15%', marginBottom: '15px'  }}>
                  <select
                    id="categoryDropdown"
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="Select Category">Select Category</option>
                    <option value="Deserts&Beverages">Deserts and Beverages</option>
          <option value="Indian Breads">Indian Breads</option>
          <option value="Non veg Biriyani">Non veg Biriyani</option>
          <option value="Non veg Starter">Non veg Starter</option>
          <option value="Non veg Curries">Non veg Curries</option>
          <option value="Rice">Rice</option>
          <option value="Veg Biriyani">Veg Biriyani</option>
          <option value="Veg Curries">Veg Curries</option>
          <option value="Veg Starter">Veg Starter</option>
                  </select>
                </div>
                <div className='search-container'style={{ width: '15%', marginBottom: '15px' }}>
            <input
              type='text'
              placeholder='Search by item name'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
                </div>
 
        {/* Display filtered menu items */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredMenuItems.map(item => (
            <div className="col" key={item.itemId}>
              <div className="card h-100">
                <img src={item.image} className="card-img-top" alt={item.itemName} />
                <div className="card-body">
                  <h5 className="card-title"><strong>{item.itemName}</strong></h5>
                  <p className="card-text">{item.itemDescription}</p>
                  <h5 className="card-text"><strong>&#x20B9; {item.itemCost}</strong></h5>
                  <button
                    type="button"
                    className="add-to-cart-container"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};
 
export default Menu;