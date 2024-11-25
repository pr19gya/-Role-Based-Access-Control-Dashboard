import axios from 'axios';
import React, { useState } from 'react';
import { base_url } from '../../base_url';
import { motion } from 'framer-motion';

const AddUsers = () => {
  const [userDetail, setUserDetail] = useState({
    username: '',
    password: '',
    role: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: userDetail.username,
      password: userDetail.password,
      role: userDetail.role
    };

    try {
      const response = await axios.post(`${base_url}users`, userData);
      if (response.status === 201) {
        console.log("User created successfully");
        alert('User created successfully!');
      } else {
        console.log("User not created");
        alert('Error creating user. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert("Please refresh the page to see the changes!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail({
      ...userDetail,
      [name]: value
    });
  };

  return (
    <motion.div
      className="min-h-screen w-full flex justify-center items-center bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-lg flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Create New User</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-6 flex flex-col">
          <motion.div
            className="transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <label className="block text-lg mb-2 text-white">Username</label>
            <motion.input 
              type="text"
              name="username"
              placeholder="Enter username"
              value={userDetail.username}
              onChange={handleChange}
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              whileFocus={{ scale: 1.05 }}
            />
          </motion.div>

          <motion.div
            className="transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <label className="block text-lg mb-2 text-white">Password</label>
            <motion.input 
              type="password"
              name="password"
              placeholder="Set password"
              value={userDetail.password}
              onChange={handleChange}
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </motion.div>

          <motion.div
            className="transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <label className="block text-lg mb-2 text-white">Role</label>
            <motion.select
              name="role"
              value={userDetail.role}
              onChange={handleChange}
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="supportAgent">Support Agent</option>
              <option value="employee">Employee</option>
            </motion.select>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-black transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create User
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddUsers;
