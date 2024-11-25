import { useState } from 'react'


import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  const logout=()=>{
    setRole("");
    localStorage.removeItem("role");
  }

  return (
    <>
      {!role ? <Login setRole={setRole}/>:<Dashboard role={role} logout={logout}/>}
    </>
  )
}

export default App
