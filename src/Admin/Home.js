import React, { useEffect, useState } from 'react';
import axios from 'axios'; // If using Axios
import './CountEntries.css';
import Navbar from './Navbar';
import BannerBackground from "../assets/home-banner-background.png";
import { Navigate, useNavigate } from 'react-router-dom';
 
const CountEntries = () => {
  const [userCount, setUserCount] = useState(0);
  const [menuCount, setMenuCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [orderplacedcount,setOrderplacedCount]=useState(0);
  const [totalcost,setTotalCost]=useState(0);
  const navigate=useNavigate();
  const handleRedirect = (path) => {
    navigate(path); // Navigate to the specified path
  };
 
 
 
 
 
  useEffect(() => {
    // Fetch user count
    axios.get('http://localhost:5267/api/UserDetails/totalUsercount')
      .then(response => {
        setUserCount(response.data);
      })
      .catch(error => {
        console.error('Error fetching user count:', error);
      });
 
    // Fetch menu count
    axios.get('http://localhost:5267/api/Menus/totalitemcount')
      .then(response => {
        setMenuCount(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu count:', error);
      });
 
    // Fetch order count
    axios.get('http://localhost:5267/api/OrderDetails/totalordercount')
      .then(response => {
        setOrderCount(response.data);
      })
      .catch(error => {
        console.error('Error fetching order count:', error);
      });
 
      axios.get(('http://localhost:5267/api/OrderDetails'),{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,},})
      .then(response => {
        const placedOrders = response.data.filter(order => order.status === 'Order Placed');
        setOrderplacedCount(placedOrders.length);
      })
      .catch(error => {
        console.error('Error fetching placed orders:', error);
      });
 
 
 
 
     
 
 
 
     
     
      axios.get(('http://localhost:5267/api/OrderDetails'), { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
  .then(response => {
    const orders = response.data.filter(order => order.status === 'Delivered');
 
    const cartPromises = orders.map(order => {
      const token = localStorage.getItem('token');
      return axios.get(`http://localhost:5267/api/Carts/${order.cartId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    });
 
    Promise.all(cartPromises)
      .then(cartResponses => {
        let sum = 0;
        cartResponses.forEach(cartResponse => {
          if (cartResponse && cartResponse.data) { // Ensure cartResponse and its data are valid
            const cart = cartResponse.data;
            const token = localStorage.getItem('token');
 
            axios.get(`http://localhost:5267/api/Menus/${cart.itemId}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(menuResponse => {
              if (menuResponse && menuResponse.data) { // Ensure menuResponse and its data are valid
                const itemCost = menuResponse.data.itemCost;
                const quantity = cart.quantity;
                sum += itemCost * quantity;
                setTotalCost(sum);
              } else {
                console.error('Invalid menu response or data');
              }
            })
            .catch(error => {
              console.error('Error fetching menu details:', error);
            });
          } else {
            console.error('Invalid cart response or data');
          }
        });
      })
      .catch(error => {
        console.error('Error fetching cart details:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching orders:', error);
  });
 
  }, []);
 
  return (
    <div>
      <Navbar/>
      <div className='home-bannerImage-container'>
          <img src={BannerBackground} alt=""/>
       </div>
    <div className="count-entries-container">
      <div className="count-box big-box" onClick={() => handleRedirect('/AdminUsers')}>
        <h3>User Entries:<br/><br/><h2>{userCount}</h2> </h3>
      </div>
      <div className="count-box big-box" onClick={() => handleRedirect('/AdminMenu')}>
        <h3>Menu Entries: <br/><br/><h2>{menuCount}</h2></h3>
      </div>
      <div className="count-box big-box" onClick={() => handleRedirect('/AdminOrders')}>
        <h3>Order Entries:<br/><br/><h2>{orderCount}</h2> </h3>
      </div>
      <div className='count-box big-box'>
        <h3>Order yet to be delivered:<br/><br/><h2>{orderplacedcount}</h2> </h3>
      </div>
      <div className='count-box big-box'>
        <h3>Total Revenue:<br/><br/> <h2>Rs.{totalcost}</h2></h3>
      </div>
     
 
    </div>
    </div>
  );
};
 
export default CountEntries;