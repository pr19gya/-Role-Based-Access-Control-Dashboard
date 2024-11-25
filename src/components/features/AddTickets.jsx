import React, { useState } from 'react'
import { base_url } from '../../base_url';
import axios from 'axios';

const AddTickets = () => {
  const [ticketData, setTicketData]=useState({
    title : '',
    description : '',
    priority : ''
  });

  const user = localStorage.getItem("username");
  const now = new Date();

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const ticket = {
      title : ticketData.title,
      description : ticketData.description,
      status : "Open",
      priority : ticketData.priority,
      createdBy : user,
      createdAt : now
    }

    try {
      const response = await axios.post(`${base_url}tickets`, ticket);
      if(response.ok){
        console.log("User added successfully");
      }
      else{
        console.log("User not added");
      }
    } catch (error) {
        console.log(error);
        alert("Please refresh the page to see the changes.");
    }
  };

  const handleChange=(e)=>{
    const {name, value} = e.target;
    setTicketData({
      ...ticketData,
      [name]:value
    })
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        value={ticketData.title}
        placeholder='Title'
        onChange={handleChange}
        required
      />
      <textarea
        type='text'
        name='description'
        value={ticketData.description}
        placeholder='Description'
        onChange={handleChange}
        required
      />
      <select 
        name='priority'
        value={ticketData.priority}
        onChange={handleChange}>
          <option value=''>Select an option</option>
          <option value='Very High'>Very High</option>
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
      </select>
      <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default AddTickets