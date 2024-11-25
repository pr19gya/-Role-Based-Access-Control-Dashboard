import React, { useEffect, useState } from 'react'
import { base_url } from '../../base_url';

const ViewTickets = () => {
  const [ticket, setTicket]= useState([]);

  useEffect(()=>{
    const fetchTickets=async()=>{
      try {
        const response = await fetch(`${base_url}tickets`);
        if(response.ok){
          const tickets = await response.json();
          setTicket(tickets);
        }
        else{
          console.log("Unable to fetch tickets");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTickets();
  },[]);


  return (
    <>
    {ticket.map((t)=>(
      <div key={t.id}>
        <div>Title : {t.title}</div>
        <div>Description : {t.description}</div>
        <div>Status : {t.status}</div>
        <div>Priority : {t.priority}</div>
        <div>Created By : {t.createdBy}</div>
        <div>Created At : {t.createdAt}</div>
        <hr/>
      </div>
    ))}
    </>
  )
}

export default ViewTickets