import React, { useState } from 'react';
import { base_url } from '../../base_url';
import axios from 'axios';
import { motion } from 'framer-motion';

const AddTickets = () => {
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    priority: '',
  });

  const user = localStorage.getItem('username');
  const now = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticket = {
      title: ticketData.title,
      description: ticketData.description,
      status: 'Open',
      priority: ticketData.priority,
      createdBy: user,
      createdAt: now,
    };

    try {
      const response = await axios.post(`${base_url}tickets`, ticket);
      if (response.status === 201) {
        // console.log('Ticket created successfully');
        alert('Ticket created successfully!');
      } else {
        // console.log('Ticket not created');
        alert('Error creating ticket. Please try again.');
      }
    } catch (error) {
      console.log(error);
      // alert('Please refresh the page to see the changes.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData({
      ...ticketData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center text-white">
      <div className="w-full max-w-xl p-8 bg-gray-800 rounded-lg shadow-2xl transform hover:scale-105 transition duration-500">
        <motion.h2
          className="text-3xl font-semibold text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Create New Ticket
        </motion.h2>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-3">
            <label className="text-xl font-semibold text-gray-300" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={ticketData.title}
              placeholder="Enter ticket title"
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xl font-semibold text-gray-300" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={ticketData.description}
              placeholder="Enter ticket description"
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xl font-semibold text-gray-300" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={ticketData.priority}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select priority</option>
              <option value="Very High">Very High</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-black transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Ticket
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default AddTickets;
