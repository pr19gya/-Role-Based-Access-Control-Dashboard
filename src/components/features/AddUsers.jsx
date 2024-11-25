import axios from 'axios';
import React, { useState } from 'react'
import { base_url } from '../../base_url';

const AddUsers = () => {
    const [userDetail, setUserDetail]= useState({
      username:'',
      password : '',
      role : ''
    })

    const handleSubmit=async(e)=>{
      e.preventDefault();

      const userData={
        username : userDetail.username,
        password : userDetail.password,
        role : userDetail.role
      }

      try {
        const response = await axios.post(`${base_url}users`, userData);
        if(response.ok){
          console.log("User created successfully");
        }
        else{
          console.log("User not created");
        }
      } catch (error) {
          console.log(error);
          alert("Please refresh the page to see the changes.");
      }
    }

    const handleChange=(e)=>{
      const { name, value } = e.target;
      setUserDetail({
        ...userDetail,
        [name] : value
      });
    }
  return (
    <div>

      <form onSubmit={handleSubmit} >
        <input 
          type='text'
          name='username'
          placeholder='Username'
          value={userDetail.username}
          onChange={handleChange}
          required
        />
        <input 
          type='text'
          name='password'
          placeholder='Set Password'
          value={userDetail.password}
          onChange={handleChange}
          required
        />
        <select
          name='role'
          value={userDetail.role}
          onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="admin">Admin</option>
          <option value="supportAgent">Support Agent</option>
          <option value="employee">Employee</option>
        </select>
        <button type="submit">Create User</button>
      </form>
    </div>
  )
}

export default AddUsers