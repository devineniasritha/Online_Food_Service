import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';
 
const Editmenu=()=>{
   
    const navigate= useNavigate();
   
    const [ItemName, setItemName] = useState("");
    const [ItemDescription, setItemDescription] = useState("");
    const [ItemCost, setItemCost] = useState("");
    const [Category, setCategory] = useState("");
    const [Image, setImage] = useState("");
   
    const params = useParams();
   
    const [data,setData]=useState("");
    const [edititemname,setedititemname]=useState("");
    const [edititemdescription,setedititemdescription]=useState("");
    const [edititemcost,setedititemcost]=useState("");
    const [editcategory,seteditcategory]=useState("");
    const [editimage,seteditimage]=useState("");
   
   
    useEffect(() => {
        // Fetch user data based on userId
        const token=localStorage.getItem('token');
        //console.log(`http://localhost:5267/api/Menus/${params.itemId}`);
        axios.get((`http://localhost:5267/api/Menus/${params.itemId}`),{headers:{Authorization:`Bearer ${token}`,},})
            .then((result) => {
                // Set the fetched data as the initial state
                const itemData = result.data;
                // setUserId(userData.userId);
                setItemName(itemData.itemName);
                setItemDescription(itemData.itemDescription);
                setItemCost(itemData.itemCost);
                setCategory(itemData.category);
                setImage(itemData.image);
               
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params.userId]);
 
    const getData=(itemId)=>{
        const token=localStorage.getItem('token');
        axios.get((`http://localhost:5267/api/Menus/${itemId}`),{headers:{Authorization:`Bearer ${token}`,},})
        .then((result)=>{
            setData(result.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }
   
    const handleUpdate = () => {
        const url = `http://localhost:5267/api/Menus/`;
        console.log(url+params.itemId);
        const data = {
            itemId : params.itemId,
            itemName:edititemname!== '' ? edititemname : ItemName,
            itemDescription:edititemdescription!== '' ? edititemdescription : ItemDescription,
            itemCost:edititemcost!== '' ? edititemcost : ItemCost,
            category:editcategory!== '' ? editcategory : Category,
            image:editimage!== '' ? editimage : Image
          };
          const token=localStorage.getItem('token');
          axios.put(url+params.itemId,data,{headers:{Authorization:`Bearer ${token}`,},})
          .then((result) => {
           
           
              getData(params.itemId);
              navigate("/AdminMenu");
             
           
             
          }).catch((error) => {
              console.log("not updated");
          })
          navigate("/AdminMenu");
      };
   
 
 
 
    return(
        <div>
         
        <form>
        <h2>Edit Item:</h2>
       
      <label>
        ItemName:
        <input type="text" name="edititemname" value={edititemname} placeholder={ItemName}
                onChange={(e) => setedititemname(e.target.value)} />
      </label>
      <label>
        ItemDescription
        <input type="text" name="edititemdescription" value={edititemdescription} placeholder={ItemDescription}
                onChange={(e) => setedititemdescription(e.target.value)} />
      </label>
      <label>
        ItemCost
        <input type="text" name="edititemcost" value={edititemcost} placeholder={ItemCost}
                onChange={(e) => setedititemcost(e.target.value)} />
 
        {/* <input type="tel" name="MobileNo" value={formData.Mobileno} onChange={handleChange} /> */}
      </label>
      <label>
        Category
        {/*<input type="text" name="editcategory" value={editcategory} placeholder={Category}
                onChange={(e) => seteditcategory(e.target.value)}/>*/}
        <select name="Category" id="userTypeDropdown" value={editcategory} onChange={(e) => seteditcategory(e.target.value)}>
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
        <input type="text" name="editimage" value={editimage}
                onChange={(e) => seteditimage(e.target.value)} />
      </label>
     
 
 
 
      {/* Add other form fields as needed */}
      <button onClick={() => handleUpdate()} type="submit">Submit</button>
    </form>
    </div>
 
 
    )
}
export default Editmenu;