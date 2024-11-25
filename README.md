# Tickets Management System with Role-Based Access and PDF Report Generation

This project is a **Tickets Management System** built with **ReactJS** and **Tailwind CSS** on the frontend, with a **JSON Server** as a fake backend for managing users, tickets, and role-based access. The system supports three roles: **Admin**, **Support Agent**, and **Employee**, each with different levels of access and functionality. It provides functionalities for viewing, adding, and updating users and tickets, along with the ability to generate PDF reports for individual tickets.

## Features

### 1. **Role-Based Authentication and Access**
   - **Admin Panel**: Admin has full access to all functionalities, including:
     - **View Users**: Admin can view all users.
     - **Add User**: Admin can add new users.
     - **Update User Role**: Admin can change the role of any user.
     - **View Tickets**: Admin can view all tickets.
     - **Add Ticket**: Admin can add new tickets.
     - **Update Ticket**: Admin can update the status and details of tickets.
     - **Generate Report**: Admin can generate PDF reports for tickets.
   
   - **Support Agent Panel**: Support agents can perform the following actions:
     - **View Tickets**: Support agents can view tickets.
     - **Add Ticket**: Support agents can add new tickets.
     - **Update Ticket**: Support agents can update the status and details of tickets.

   - **Employee Panel**: Employees have limited access:
     - **View Tickets**: Employees can only view tickets.
     - **Add Ticket**: Employees can add new tickets.

### 2. **User Management**
   - **View Users**: Admin can view all users and their roles.
   - **Add User**: Admin can add users with roles `admin`, `support agent`, or `employee`.
   - **Update User Role**: Admin can update the roles of users (e.g., changing a user from an employee to a support agent).

### 3. **Ticket Management**
   - **View Tickets**: Users based on their roles can view the list of tickets.
   - **Add Ticket**: Users can add new tickets with a title, description, priority, and status.
   - **Update Ticket**: Admins and support agents can update the status of tickets (e.g., Open, In Progress, Resolved, Closed).

### 4. **Generate PDF Report for Tickets**
   - Users can generate a PDF report for individual tickets with details like title, description, status, priority, and creation time.
   - The report can be downloaded by clicking the **Generate Report** button for any ticket.

---

## Technologies Used

- **Frontend**:
  - **ReactJS**: JavaScript library for building user interfaces.
  - **Tailwind CSS**: Utility-first CSS framework for styling the components.
  - **jsPDF**: Library to generate PDF files for downloading reports.

- **Backend**:
  - **JSON Server**: A fake backend API to simulate user and ticket management functionalities.

---


## Application Workflow

1. **Login**: 
   - Users log in using predefined credentials (username and password).
   - Based on the credentials, the user is redirected to their respective dashboards: **Admin Panel**, **Support Agent Panel**, or **Employee Panel**.

2. **User Dashboard**:
   - The dashboard displays a list of available functionalities depending on the user's role:
     - Admin can view and manage users and tickets.
     - Support agents can view and manage tickets.
     - Employees can only view and add tickets.

3. **View Users (Admin)**:
   - Admin can view all users with their roles.
   - Admin can update the role of any user (e.g., change a user from an employee to a support agent).

4. **View Tickets**:
   - All users can view tickets, but only admins and support agents can update the status of the tickets.
   
5. **Add Ticket**:
   - Any user can add a new ticket, but employees can only add tickets and cannot modify existing tickets.
   
6. **Generate PDF Report**:
   - Admins can generate and download a PDF report for any ticket.
   - The report includes ticket details such as title, description, priority, and creation time.

---


## Conclusion

This application provides a role-based access control system for managing tickets, allowing users to perform various functions depending on their role. The ability to generate PDF reports for individual tickets makes it suitable for generating detailed reports for team members or customers. The system is designed to be scalable and easy to manage, with a straightforward UI powered by React and styled with Tailwind CSS.
