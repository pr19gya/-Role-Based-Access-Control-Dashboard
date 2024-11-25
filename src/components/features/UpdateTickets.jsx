import React, { useEffect, useState } from 'react';
import { base_url } from '../../base_url';

const UpdateTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${base_url}tickets`);
        if (response.ok) {
          const tickets = await response.json();
          setTickets(tickets);
        } else {
          console.error("Unable to fetch tickets");
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const editStatus = async (ticketId) => {
    if (!newStatus) {
      alert("Please select a status to update!");
      return;
    }

    try {
      const response = await fetch(`${base_url}tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server error:", errorResponse);
        alert(`Failed to update status: ${errorResponse.message || "Unknown error"}`);
        return;
      }
    
      const updatedTickets = tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      );
      setTickets(updatedTickets);
      setEditingTicketId(null);
      setNewStatus("");
      console.log("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error.message);
      alert("Please refresh the page to see the changes.");
    }
    
  };

  return (
    <div>
      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <div>Title: {ticket.title}</div>
          <div>Description: {ticket.description}</div>
          <div>
            Status:{" "}
            {editingTicketId === ticket.id ? (
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
                <option value="Reopened">Reopened</option>
                <option value="On Hold">On Hold</option>
              </select>
            ) : (
              ticket.status
            )}
          </div>
          {editingTicketId === ticket.id ? (
            <>
              <button onClick={() => editStatus(ticket.id)}>Save</button>
              <button onClick={() => setEditingTicketId(null)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditingTicketId(ticket.id)}>Edit</button>
          )}
          <div>Priority: {ticket.priority}</div>
          <div>Created By: {ticket.createdBy}</div>
          <div>Created At: {ticket.createdAt}</div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default UpdateTickets;
