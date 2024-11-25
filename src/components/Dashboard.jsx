import React from 'react'
import AdminPanel from './admin/AdminPanel'
import AgentPanel from './agent/AgentPanel'
import EmployeePanel from './employee/EmployeePanel'

const Dashboard = ({role, logout}) => {

  return (
    <div>
        <button onClick={logout}>LOGOUT</button>
        {role=== "admin" && <AdminPanel/> }
        {role=== "supportAgent" && <AgentPanel/>}
        {role==="employee" && <EmployeePanel/>}
    </div>
  )
}

export default Dashboard