import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Cart.css'; // Import the CSS file
import deleteIcon from "./../assets/delete.jpg";
import BannerBackground from "../assets/home-banner-background.png";
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const Cart = () => {
    const navigate = useNavigate();
    const baseURL = "http://localhost:5267/api/Carts";
    const [CartItems, setcartitems] = useState([]);
    const [Quantity, setQuantity] = useState(1);
    const [orderTime, setOrderTime] = useState(new Date());
    const token = localStorage.getItem('token');
    console.log(token);
    const decodedToken = jwtDecode(token);
    const id = decodedToken.UserId;
    console.log(id);

  const handleIncrement = async (cartId)=> {
      try {
  
        // Fetch existing user details using axios.get and await the result
        const cartItemResponse = await axios.get(`http://localhost:5267/api/Carts/${cartId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Access the user details from the response
        const cartItem = cartItemResponse.data;
        console.log(cartItem);

      // Update only the quantity field
      const updatedCartItem = {
        ...cartItem,
        quantity: cartItem.quantity + 1,

      };
  
        console.log(updatedCartItem);
  
        // Send a request to the server to update the password in UserDetails
        const updatedResponse = await axios.put(
          `http://localhost:5267/api/Carts/${cartId}`,
          updatedCartItem,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log('Response:', updatedResponse.data);
        setcartitems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.cartId === cartId ? (updatedResponse.data || item) : item
        )
      );
        
  
        // Handle successful password change (update UI, redirect, etc.)
      } catch (error) {
        toast.error("error===" + error.message);
      }

  };

  const handleDecrement = async (cartId) => {
    try {
      // Fetch the specific cart item using axios.get and await the result
      const cartItemResponse = await axios.get(`http://localhost:5267/api/Carts/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Access the cart item details from the response
      const cartItem = cartItemResponse.data;

      console.log(cartItem.quantity);

      if (cartItem.quantity === 1) {
        await axios.delete(`http://localhost:5267/api/Carts/${cartId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Remove the cart item from the state if successfully deleted
        setcartitems((prevCartItems) =>
          prevCartItems.filter((item) => item.cartId !== cartId)
        );
      }

      else{
            // Ensure that the quantity doesn't go below 1

      // Update only the quantity field
      const updatedCartItem = {
        ...cartItem,
        quantity: cartItem.quantity - 1,
      };

      // Send a request to the server to update the quantity in the cart
      const updatedResponse = await axios.put(
        `http://localhost:5267/api/Carts/${cartId}`,
        updatedCartItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(updatedResponse.data)

      // Update the state with the updated cart items
      setcartitems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.cartId === cartId ? (updatedResponse.data || item) : item
        )
      );
      }

    } catch (error) {
      toast.error('Error updating quantity:', error);
    }
  };

  const Order = async (CartId) => {
    try {
      const userDetailsResponse = await axios.get(`http://localhost:5267/api/UserDetails/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
 
    // Access the user details from the response
    const userDetails = userDetailsResponse.data;
 
    // Check if mobile number and address are filled
    if (!userDetails.mobileno || !userDetails.address) {
      // If not filled, show alert and navigate to UserProfile
      toast.error("Please fill in your mobile number and address in the User Details before placing an order.");
      setTimeout(() => {
        navigate("/EditUser");
      }, 2000);
      
      return;
    }
 
    const currentTime = new Date();

    const orderData = {
      cartId: CartId,
    orderTime: currentTime.toISOString(), // Convert to ISO string format
    status: "Order Placed"
    };
      // Fetch the specific cart item using axios.get and await the result
      const OrderItem = await axios.post(`http://localhost:5267/api/OrderDetails`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orderId = OrderItem.data.orderId;

      const cartItemResponse = await axios.get(`http://localhost:5267/api/Carts/${CartId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Access the user details from the response
        const cartItem = cartItemResponse.data;
        console.log(cartItem);

      // Update only the quantity field
      const updatedCartItem = {
        ...cartItem,
        status: "Ordered",

      };
  
        console.log(updatedCartItem);
  
        // Send a request to the server to update the password in UserDetails
        const updatedResponse = await axios.put(
          `http://localhost:5267/api/Carts/${CartId}`,
          updatedCartItem,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log('Response:', updatedResponse.data);
        setcartitems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.cartId === CartId ? (updatedResponse.data || item) : item
        )
      );
      toast.success("Order is placed.")

 
      navigate(`/bill`);
 
    } catch (error) {
      toast.error('Error:', error);
    }
  };
  
    const setCart = async () => {
        try {
          // Retrieve the token from local storage
          const token = localStorage.getItem('token');

          if (!token) {
            toast.error('Token not found.');
            return;
          }
      
          const decodedToken = jwtDecode(token);
          const UserId = parseInt(decodedToken.UserId, 10);

          console.log(UserId);
      
          // Make an authorized API request to fetch user details
          const response = await axios.get(baseURL, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log('API Response:', response.data);
      
          // Set the user details in the state

          //const Cart = await response.data;

          const sortedCartItems = response.data.filter(item => item.userId === UserId);
          console.log(sortedCartItems);

        // Update the state with the sorted array
          setcartitems(sortedCartItems);
        } catch (error) {
          toast.error('Error fetching user details: ' + error.message);
        }
      };
  
    useEffect(() => {
      setCart();
    }, []);

    const filteredCartItems = CartItems.filter(item => item.status === "Cart");

  return (
    <div>
      <Navbar/>
      <div className='home-bannerImage-container'>
          <img src={BannerBackground} alt=""/>
       </div>
       <div className="toast-container">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      </div>
     <h1><strong>Cart</strong></h1>
      <div>
      <table class="table table-bordered border-2 table-striped" style={{Margin:"40px"}}>
             <thead>
               <tr>
                 
                 <th scope="col">Item Name</th>
                 <th scope="col">Image</th>
                 <th scope="col">Quantity</th>
                 <th scope="col">Cost</th>
                 <th scope="col">Action</th>
 
               </tr>
             </thead>
             {
                 filteredCartItems.map(cartItem => (
           
 
            // <div key={cartItem.cartId} className="cart-item">
              <tbody>
                  <tr>
                        
                        <td>{cartItem.item ? cartItem.item.itemName : 'N/A'}</td>
                        <td><img src={cartItem.item.image} alt="" style={{width:"50%"}}/></td>
                        <td>
                        <div className="quantity-button">
      <button className="quantity-button__action" onClick={() => handleDecrement(cartItem.cartId)}>-</button>
      <span className="quantity-button__quantity">{cartItem.quantity}</span>
      <button className="quantity-button__action" onClick={() => handleIncrement(cartItem.cartId)}>+</button>
    </div>
                          </td>
                        <td>{cartItem.item.itemCost*cartItem.quantity}</td>
                        <td><div className="quntity-button"><button onClick={() => Order(cartItem.cartId)}>Place Order</button></div></td>
                        
                  </tr>
             </tbody>
         
        //   </div>
           ))}
     </table>
     <a href='/UserOrders'>
      <button type="button" className="primary-button">My Orders</button>
      </a>
 
        </div>
        <Footer/>
     </div>
  );
};
 
export default Cart;