import React, { useState } from "react";
import { motion } from "framer-motion";
import { base_url } from "../base_url";

const Login = ({ setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${base_url}users`);
      const users = await response.json();

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        setRole(user.role);
        localStorage.setItem("role", user.role);
        localStorage.setItem("username", user.username);
      } else {
        setError("Invalid credentials. Try again!");
      }
    } catch (err) {
      setError("Something went wrong. Try later.");
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/login-video.mp4" // Replace with your video file path
        autoPlay
        loop
        muted
      ></video>

      {/* Login Form */}
      <motion.div
        className="relative z-10 bg-opacity-50 p-8 rounded-md text-white w-11/12 max-w-sm mx-auto flex flex-col items-center justify-center h-screen md:max-w-md lg:max-w-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-extrabold text-center mb-6 lg:text-5xl">
          Welcome!
        </h2>
        <div className="space-y-6 w-full">
          <motion.input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-0 text-white border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-white focus:outline-none"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-0 text-white border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-white focus:outline-none"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            onClick={handleLogin}
            className="w-full py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-950 transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </div>
        {error && (
          <motion.p
            className="text-red-400 text-sm text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>

      {/* Credentials Info Box */}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 rounded-md shadow-lg p-4 w-11/12 max-w-xs md:max-w-sm lg:w-96">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Use these credentials to login
        </h3>
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="text-left">
              <th className="border-b border-gray-300 pb-2">Role</th>
              <th className="border-b border-gray-300 pb-2">Username</th>
              <th className="border-b border-gray-300 pb-2">Password</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            <tr>
              <td className="py-1">Admin</td>
              <td className="py-1">admin</td>
              <td className="py-1">admin123</td>
            </tr>
            <tr>
              <td className="py-1">Agent</td>
              <td className="py-1">agent</td>
              <td className="py-1">agent123</td>
            </tr>
            <tr>
              <td className="py-1">Employee</td>
              <td className="py-1">employee</td>
              <td className="py-1">employee123</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Login;