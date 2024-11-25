import React from 'react'
import { useState } from 'react'
import { base_url } from '../base_url';

const Login = ({setRole}) => {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError]=useState("");

    const handleLogin = async()=>{
        try {
            const response = await fetch(`${base_url}users`);
            const users= await response.json();
            // console.log(users);

            const user = users.find(
                (u)=>u.username===username && u.password===password
            );

            if(user){
                setRole(user.role);
                localStorage.setItem("role", user.role);
                localStorage.setItem("username", user.username);
            }
            else{
                setError("Invalid credentials. Try again!")
            }
        } catch (err) {
            setError("Something went wrong. Try later.");
            console.log(err);
        }
    };
  return (
    <>
    <div>LOGIN</div>
    <input
        type="username"
        placeholder='Username'
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
    ></input>
    <input
        type="password"
        placeholder='Password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
    ></input>
    <button onClick={handleLogin}>LOGIN</button>
    {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  )
}

export default Login