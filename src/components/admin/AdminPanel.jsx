import React from 'react'
import ViewUser from '../features/ViewUser'
import AddUsers from '../features/AddUsers'
import ViewTickets from '../features/ViewTickets'
import AddTickets from '../features/AddTickets'
import UpdateTickets from '../features/UpdateTickets'
import GenerateReport from '../features/GenerateReport'

const AdminPanel = () => {
  return (
    <div>
      <b>Admin Panel</b>
    <ViewUser/>
    <AddUsers/>
    <ViewTickets/>
    <AddTickets/>
    <UpdateTickets/>
    <GenerateReport/>
    </div>

  )
}

export default AdminPanel