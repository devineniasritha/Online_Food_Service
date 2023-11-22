import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Navbar1 from './Navbar';
import UsersFooter from './Footer';
import BannerBackground from'../assets/home-banner-background.png';
 
const Orderstest = () => {
  const [Orders, setOrderHistory] = useState([]);
  const [userInfo, setUserInfo] = useState('');
  const [username, setUserName] = useState('');
 
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
 
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserInfo(decodedToken);
          setUserName(decodedToken.UserName);
 
          console.log('decoded userId:', decodedToken.UserName);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };
 
    fetchUserInfo();
  }, []);
 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5267/api/OrderDetails', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
 
        const filteredOrders = response.data
          .filter((Order) => Order.cart.user.userName === username)
          .sort((a, b) => b.orderId - a.orderId); // Sort orders by orderId in descending order
 
        const latestOrder = filteredOrders.length > 0 ? [filteredOrders[0]] : [];
        setOrderHistory(latestOrder);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
 
    fetchOrders();
  }, [username]);
 
  useEffect(() => {
    console.log('Username:', username);
    console.log('Orders:', Orders);
    console.log('userinfo:', userInfo);
  }, [username, Orders, userInfo]);
 
  return (
    <div>
         <Navbar1 />
      <div className='home-bannerImage-container'>
          <img src={BannerBackground} alt=""/>
       </div>

    
    
       <div style={{ padding: '20px', textAlign: 'center' }}>
     
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#333', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>My Bill</h1>
      </div>
 
      {Orders.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#555' }}>{userInfo.UserName}'s Ordcggers</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap',justifyContent:'center' }}>
          {Orders.map((Order) => (
            <div
              key={Order.orderId}
              style={{
                width: '30%',
                margin: '10px',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <div style={{padding:'5px'}}>
                <strong>User Name:</strong> {Order.cart.user.userName}
              </div>
              <div style={{padding:'5px'}}>
                <strong>Mobile Number:</strong> {Order.cart.user.mobileno}
              </div>
              <div style={{padding:'5px'}}>
                <strong>Address:</strong> {Order.cart.user.address}
              </div>
              <div style={{padding:'5px'}}>
                <strong>Item Name:</strong> {Order.cart.item.itemName}
              </div>
              <div style={{padding:'5px'}}>
                <strong>Item Cost:</strong> {Order.cart.item.itemCost}
              </div>
              <div style={{padding:'5px'}}>
                <strong>Quantity:</strong> {Order.cart.quantity}
              </div>
              <div style={{padding:'5px'}}>
                <strong>Total Cost:</strong> {Order.cart.item.itemCost*Order.cart.quantity}
              </div>
              <div style={{padding:'5px'}}>
                <strong>Order Date:</strong> {Order.orderTime}
              </div>
              <div style={{padding:'5px'}}>
                <strong>Payment:</strong> Cash on Delivery
              </div>
              <div style={{padding:'5px'}}>
                <strong>Status:</strong> {Order.status}
              </div>
            </div>
           
          ))}
        </div>
      )}

      <UsersFooter />
    </div>
    
    </div>
  );
};
 
export default Orderstest;