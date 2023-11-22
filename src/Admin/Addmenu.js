import axios from 'axios';
import React, { useEffect, useState } from 'react';
 
import "./Adduser.css";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Additem = () => {
 
  const navigate= useNavigate();
  const [ItemName, setItemName] = useState("");
  const [ItemDescription, setItemDescription] = useState("");
  const [ItemCost, setItemCost] = useState("");
 
  const [Category, setCategory] = useState("");
  const [Image, setImage] = useState("");
 
 
 
  const handleSubmit = (e) => {
 
    e.preventDefault();
    const token=localStorage.getItem('token');
   
    const url = "http://localhost:5267/api/Menus";
    const data = {
      "ItemName": ItemName,
      "ItemDescription": ItemDescription,
      "ItemCost": ItemCost,
      "Category": Category,
      "Image": Image
     
    };
    axios.post(url, data,{
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`,
      }})
      .then((result) => {console.log("success");}).catch((error) => {console.log(error);})
      navigate("/AdminMenu");
 
  }
 
 
  return (
    <form onSubmit={handleSubmit}>
        <h2>Add Item:</h2>
       
      <label>
        ItemName:
        <input type="text" name="ItemName" value={ItemName}
                onChange={(e) => setItemName(e.target.value)} />
      </label>
      <label>
        ItemDescription:
        <input type="text" name="ItemDescription" value={ItemDescription}
                onChange={(e) => setItemDescription(e.target.value)} />
      </label>
      <label>
        Item Cost:
        <input type="text" name="ItemCost" value={ItemCost}
                onChange={(e)=>setItemCost(e.target.value)} />
      </label>
      <label>
        Category:
        {/* <input type="text" name="Category" value={Category}
                onChange={(e) => setCategory(e.target.value)} /> */}
        <select name="Category" id="userTypeDropdown" value={Category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Category">Select category</option>
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
      </label>
      <label>
        image:
        <input type="text" name="Image" value={Image}
                onChange={(e) => setImage(e.target.value)}/>
      </label>
     
     
     
      <button type="submit">Submit</button>
    </form>
  );
};
 
export default Additem