import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
 
function Orders() {
    const [data, setData] = useState([]);
    const [cartdata, setCartData] = useState([]);
    const [menudata, setMenuData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [ordersAndCarts, setOrdersAndCarts] = useState([]);
 
    const navigate = useNavigate();
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
 
                // Fetching user details
                const usersResponse = await axios.get('http://localhost:5267/api/UserDetails', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const users = usersResponse.data;
                setUserData(users);
 
                // Fetching orders
                const ordersResponse = await axios.get('http://localhost:5267/api/OrderDetails', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const orders = ordersResponse.data;
 
                const ordersWithCarts = [];
 
                for (const order of orders) {
                    const cartResponse = await axios.get(`http://localhost:5267/api/Carts/${order.cartId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const cart = cartResponse.data;
 
                    const user = users.find((user) => user.userId === cart.userId);
 
                    if (cart && user) {
                        const itemId = cart.itemId;
                        const menuItems = await axios.get(`http://localhost:5267/api/Menus/${itemId}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
 
                        ordersWithCarts.push({
                            ...order,
                            cart: { ...cart, menu: [menuItems.data] },
                            user: { ...user },
                        });
                    } else {
                        console.error('Undefined cart or user');
                    }
                }
 
                setOrdersAndCarts(ordersWithCarts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
 
        fetchData();
    }, []);
 
    const handleEdit = (orderId) => {
        navigate(`/Editorder/${orderId}`);
    };
 
    return (
        <div>
            <Navbar />
            <div className="users-container">
                <h2>Orders table:</h2>
                <div className="spacer"></div>
            </div>
            {deleteMessage && <div style={{ color: 'red' }}>{deleteMessage}</div>}
            <table className="users-table">
                <thead>
                    <tr>
                        <th>OrderId</th>
                       
                        <th>Item Name</th>
                        <th>Cost</th>
                        <th>Quantity</th>
                        <th>UserName</th>
                        <th>OrderTime</th>
                        <th>Payment</th>
                        <th>Address</th>
                        <th>MobileNo</th>
                        <th>Status</th>
                        <th>total cost</th>
                       
                       
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersAndCarts.map((orderdata) => (
                        <tr key={orderdata.orderId}>
                            <td>{orderdata.orderId}</td>
                           
                            <td>
                                {orderdata.cart.menu?.map((menuItem, index) => (
                                    <div key={index}>{menuItem.itemName}</div>
                                ))}
                            </td>
                            <td>
                                {orderdata.cart.menu?.map((menuItem, index) => (
                                    <div key={index}>{menuItem.itemCost}</div>
                                ))}
                            </td>
                            <td>{orderdata.cart.quantity}</td><td>{orderdata.user.userName}</td>
                            <td>{orderdata.orderTime}</td>
                            <td>{orderdata.payment}</td>
                            <td>{orderdata.user.address}</td>
                            <td>{orderdata.user.mobileno}</td>
                            <td>{orderdata.status}</td>
                            <td>
                                {orderdata.cart.menu?.map((menuItem, index) => (
                                    <div key={index}>{menuItem.itemCost * orderdata.cart.quantity}</div>
                                ))}
                            </td>
                           
                           
                            <td>
                                <button onClick={() => handleEdit(orderdata.orderId)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default Orders;