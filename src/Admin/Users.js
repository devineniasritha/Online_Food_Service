import {useNavigate} from "react-router-dom";
import React, { useEffect,useState } from "react";
import axios from "axios";
import Navbar from './Navbar';
import './Users.css';
 
function Users(){
 
    const[data,setData]=useState([]);
    const navigate=useNavigate();
    const [deleteMessage, setDeleteMessage] = useState(null);
 
    useEffect(()=>{getData();},[]);
 
    const getData=()=>{
        const token=localStorage.getItem('token');
 
        axios.get(("http://localhost:5267/api/UserDetails"),{headers:{Authorization:`Bearer ${token}`,},})
        .then((result)=>{
            setData(result.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    const handleEdit=(userId)=>{
        navigate(`/Admin/Edituser/${userId}`);
    }
    const handleDelete=(userId)=>{
        const token=localStorage.getItem('token');
        if (window.confirm("Are you sure to delete this Employee") === true) {
            axios.delete((`http://localhost:5267/api/UserDetails/${userId}`),{headers:{Authorization:`Bearer ${token}`,}})
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
        navigate("/AddUser");
    }
    return(
        <div>
        <Navbar />

        <div className="users-container"><h2>Users table:</h2><div className="spacer"></div>
       
        <button onClick={()=>handleAdd()} className="add-button">Add</button>
       
        </div>
 
        <table className="users-table">
            <thead>
                <tr>
                    <th>Userid</th>
                    <th>UserName</th>
                    <th>EmailId</th>
                    <th>MobileNo</th>
                    <th>Address</th>
                    <th>UserType</th>
                   
                </tr>
            </thead>
            <tbody>
                {data.map((user)=>(
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        {/* <td style={{ color:  user.userName===null || user.userName.trim()==="" ? "red":"black"}}>{user.userName===null || user.userName.trim()==="" ? "null":user.userName}</td> */}
                        <td style={{ color: !user.userName || user.userName.trim() === "" ? "red" : "black" }}>{user.userName === null || user.userName.trim() === "" ? "null" : user.userName}</td>
 
                        <td style={{color: !user.emailId || user.emailId.trim() ==="" ? "red":"black"}}>{user.emailId===null || user.emailId.trim() ===""?"null":user.emailId}</td>
                        <td>{user.mobileno}</td>
                        <td style={{color:!user.address ||user.address.trim()==="" ? "red":"black"}}>{user.address===null ||user.address.trim()===""? "null":user.address}</td>
                        <td style={{color:!user.userType ||user.userType.trim()==="" ? "red":"black"}}>{user.userType===null|| user.userType.trim()===""? "null":user.userType}</td>
                        <td>
                        <button onClick={() => handleDelete(user.userId)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                        </td>
                        
 
 
                    </tr>
 
                ))}
            </tbody>
        </table>
        </div>
       
 
    );
}
export default Users;