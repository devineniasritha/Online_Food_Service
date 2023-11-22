import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';
 
const Editorder=()=>{
    const navigate= useNavigate();
   
    const [CartId, setCartId] = useState("");
    const [OrderTime, setOrderTime] = useState("");
    const [Payment, setPayment] = useState("");
    const [Status, setStatus] = useState("");
   
   
    const params = useParams();
   
    const [data,setData]=useState("");
    const [editcartid,seteditcartid]=useState("");
    const [editordertime,seteditordertime]=useState("");
    const [editpayment,seteditpayment]=useState("");
    const [editstatus,seteditstatus]=useState("");
 
   
   
    useEffect(() => {
        // Fetch user data based on userId
        const token=localStorage.getItem('token');
        console.log(params.orderId);
        axios.get((`http://localhost:5267/api/OrderDetails/${params.orderId}`),{headers:{Authorization:`Bearer ${token}`,},})
            .then((result) => {
                // Set the fetched data as the initial state
                const orderData = result.data;
                // setUserId(userData.userId);
                setCartId(orderData.cartId);
                setOrderTime(orderData.orderTime);
                setPayment(orderData.payment);
                setStatus(orderData.status);
               
               
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params.orderId]);
 
    const getData=(orderId)=>{
      const token=localStorage.getItem('token');
        axios.get((`http://localhost:5267/api/OrderDetails/${orderId}`),{headers:{Authorization:`Bearer ${token}`,},})
        .then((result)=>{
            setData(result.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }
   
    const handleUpdate = () => {
        const url = `http://localhost:5267/api/OrderDetails/`;
        const data = {
          orderId : params.orderId,
          cartId:editcartid!== '' ? editcartid : CartId,
          orderTime:editordertime!== '' ? editordertime : OrderTime,
          payment:editpayment!== '' ? editpayment : Payment,
          status:editstatus!== '' ? editstatus : Status
        };
          const token=localStorage.getItem('token');
          axios.put(url+params.orderId,data,{headers:{Authorization:`Bearer ${token}`,},})
          .then((result) => {
           
           
              getData(params.orderId);
              navigate("/AdminOrders");
             
           
             
          }).catch((error) => {
              console.log("not updated");
          })
          navigate("/AdminOrders");
      };
   
 
 
 
    return(
        <div>
         
        <form>
        <h2>Edit Order:</h2>
       
      <label>
        cartId
        <input type="text" name="editcartid" value={editcartid} placeholder={CartId}
                onChange={(e) => seteditcartid(e.target.value)} />
      </label>
      <label>
        OrderTime
        <input type="datetime-local" name="editordertime" value={editordertime} placeholder={OrderTime}
                onChange={(e) => seteditordertime(e.target.value)} />
      </label>
      <label>
        payment
        <input type="text" name="editpayment" value={editpayment} placeholder={Payment}
                onChange={(e) => seteditpayment(e.target.value)} />
 
        {/* <input type="tel" name="MobileNo" value={formData.Mobileno} onChange={handleChange} /> */}
      </label>
      <label>
        status
        {/* <input type="text" name="editstatus" value={editstatus} placeholder={Status}
                onChange={(e) => seteditstatus(e.target.value)}/> */}
        <select name="editstatus"id="userTypeDropdown" value={editstatus} onChange={(e) => seteditstatus(e.target.value)}>
        <option value="Order Placed">status</option>
          <option value="Order Placed">Order Placed</option>
          <option value="Order Cancelled">Order Cancelled</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
       
        </select>
      </label>
     
     
 
 
 
      {/* Add other form fields as needed */}
      <button onClick={() => handleUpdate()} type="submit">Submit</button>
    </form>
    </div>
 
 
    )
}
export default Editorder;