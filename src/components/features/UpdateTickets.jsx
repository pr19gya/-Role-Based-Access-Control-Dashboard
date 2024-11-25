import React, { useEffect, useState } from 'react';
import { base_url } from '../../base_url';
import { motion } from 'framer-motion'; // Importing Framer Motion for animations

const UpdateTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${base_url}tickets`);
        if (response.ok) {
          const tickets = await response.json();
          setTickets(tickets);
        } else {
          console.error('Unable to fetch tickets');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const editStatus = async (ticketId) => {
    if (!newStatus) {
      alert('Please select a status to update!');
      return;
    }

    try {
      const response = await fetch(`${base_url}tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Server error:', errorResponse);
        alert(`Failed to update status: ${errorResponse.message || 'Unknown error'}`);
        return;
      }

      const updatedTickets = tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      );
      setTickets(updatedTickets);
      setEditingTicketId(null);
      setNewStatus('');
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error.message);
      alert('Please refresh the page to see the changes.');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">Tickets Management</h2>

        {tickets.length === 0 ? (
          <div className="text-center text-gray-400">No tickets available.</div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                className="bg-gray-700 p-6 rounded-lg shadow-xl"
                initial={{ opacity: 0, y: 20 }} // Initial animation state
                animate={{ opacity: 1, y: 0 }}   // Animation when component appears
                transition={{ duration: 0.5 }}    // Duration of animation
              >
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <h3 className="text-xl font-medium text-white">{ticket.title}</h3>
                  <div className="text-sm text-gray-400 mt-2 sm:mt-0">{ticket.createdAt}</div>
                </div>
                <p className="text-gray-300 mt-2">{ticket.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 items-center">
                  <div>
                    <span className="text-gray-400">Priority: </span>
                    <span>{ticket.priority}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div>
                      <span className="text-gray-400">Status: </span>
                      {editingTicketId === ticket.id ? (
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="bg-gray-700 text-white p-2 rounded-md w-full sm:w-auto"
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
                        <span className="text-gray-400">{ticket.status}</span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      {editingTicketId === ticket.id ? (
                        <>
                          <button
                            onClick={() => editStatus(ticket.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingTicketId(null)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditingTicketId(ticket.id)}
                          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateTickets;
