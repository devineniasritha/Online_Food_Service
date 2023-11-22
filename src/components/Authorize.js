import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "../App.css";

const AuthorizedComponent = () => {
    const navigate = useNavigate();
    const baseURL = "http://localhost:5267/api/UserDetails";
    const [Users, setusers] = useState([]);
  
    const setUsersData = async () => {
        try {
          // Retrieve the token from local storage
          const token = localStorage.getItem('token');
      
          // Make an authorized API request to fetch user details
          const response = await axios.get(baseURL, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          // Set the user details in the state
          setusers(response.data);
        } catch (error) {
          alert('Error fetching user details: ' + error.message);
        }
      };
  
    useEffect(() => {
      setUsersData();
    }, []);
  
    return (
      <div class="card-body">
        <br>
        </br>

        <br></br>
        <div className="col-md-6">
          <h4>UserDetails List</h4>
  
          <div class="container">
            <div class="row">
              <div class="col-12">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>EmailId</th>
                    </tr>
                  </thead>
                  <tbody>
  
                    {
                      Users &&
                      Users.map((UserDetails, index) => (
  
                        <tr>
                          <th scope="row">{UserDetails.userId}</th>
                          <td>{UserDetails.userName}</td>
                          <td>{UserDetails.emailId}</td>
                        </tr>
  
                      ))
                    }
  
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>
  
      </div>

  );
};

export default AuthorizedComponent;