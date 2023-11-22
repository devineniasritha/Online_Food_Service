import {useNavigate} from "react-router-dom";
import React, { useEffect,useState } from "react";
import axios from "axios";
import Navbar from './Navbar';
 
function MenuAdmin(){
    const[data,setData]=useState([]);
    const navigate=useNavigate();
    const [deleteMessage, setDeleteMessage] = useState(null);
 
    useEffect(()=>{getData();},[]);
 
   
    const getData=()=>{
        const token=localStorage.getItem('token');
 
        axios.get(("http://localhost:5267/api/Menus"),{headers:{Authorization:`Bearer ${token}`,},})
        .then((result)=>{
            setData(result.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    const handleEdit=(itemId)=>{
        navigate(`/Editmenu/${itemId}`);
    }
 
    const handleDelete=(itemId)=>{
        if (window.confirm("Are you sure to delete this Item") === true) {
            const token=localStorage.getItem('token');
            
            axios.delete((`http://localhost:5267/api/Menus/${itemId}`),{headers:{Authorization:`Bearer ${token}`,},})
            .then((result) => {
                window.location.reload();
                console.log("del");      
            })
            .catch((error) => {
            console.log("not deleted");
            })
         
        };
       
    }
    const handleAdd=()=>{
        navigate("/Addmenu");
    }
    return(
        <div>
        <Navbar/>
        <div className="users-container"><h2>Menu table:</h2><div className="spacer"></div>
       
        <button onClick={()=>handleAdd()} className="add-button">Add</button>
       
        </div>{deleteMessage && <div style={{color:"red"}}>{deleteMessage}</div>}
        <table className="users-table">
            <thead>
                <tr>
                    <th>ItemId</th>
                    <th>Itemname</th>
                    <th>Description</th>
                    <th>cost</th>
                    <th>category</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
           
            <tbody>
                {data.map((item)=>(
                    <tr key={item.itemId}>
                        <td>{item.itemId}</td>
                        <td style={{ color: !item.itemName || item.itemName.trim() === "" ? "red" : "black" }}>{item.itemName === null || item.itemName.trim() === "" ? "null" : item.itemName}</td>
                        <td style={{color: !item.itemDescription || item.itemDescription.trim() ==="" ? "red":"black"}}>{item.itemDescription===null || item.itemDescription.trim() ===""?"null":item.itemDescription}</td>        
                        <td>{item.itemCost}</td>
                        <td style={{color:!item.category ||item.category.trim()==="" ? "red":"black"}}>{item.category===null ||item.category.trim()===""? "null":item.category}</td>
                        <td><img src={item.image} alt={item.itemName}/></td>
                        <td>
                            <button onClick={()=>handleEdit(item.itemId)}>Edit</button>
                           
                            <button onClick={()=>handleDelete(item.itemId)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
       
 
    );
}
export default MenuAdmin;